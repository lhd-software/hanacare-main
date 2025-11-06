#!/usr/bin/env bun
import dotenv from 'dotenv'
import { promises as fs } from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { glob } from 'glob'

// Load environment variables
dotenv.config({ path: './scripts/.env' })

// Configuration types
interface ScanConfig {
  directories: string[]
  filePatterns: string[]
  excludePatterns: string[]
}

interface CloudflareR2Config {
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  region: string
  endpoint: string
}

interface DownloadedImage {
  url: string
  filename: string
  localPath: string
  size: number
  contentType: string
}

class UIUXImageMigrator {
  private scanConfig: ScanConfig
  private r2Config: CloudflareR2Config
  private downloadDir: string
  private s3Client: S3Client

  constructor(
    scanConfig: ScanConfig,
    r2Config: CloudflareR2Config,
    downloadDir: string = './downloads'
  ) {
    this.scanConfig = scanConfig
    this.r2Config = r2Config
    this.downloadDir = downloadDir

    // Initialize S3 client for R2
    this.s3Client = new S3Client({
      region: this.r2Config.region,
      endpoint: this.r2Config.endpoint,
      credentials: {
        accessKeyId: this.r2Config.accessKeyId,
        secretAccessKey: this.r2Config.secretAccessKey
      }
    })
  }

  // Check what's already in R2
  async getExistingR2Images(): Promise<Set<string>> {
    console.log('🔍 Checking existing images in R2...')

    try {
      // This would need ListObjectsCommand, but for simplicity we'll track locally
      // In production, you'd want to list existing objects to avoid duplicates
      console.log('ℹ️  Note: R2 deduplication will be handled by checking existing uploads')
      return new Set<string>()
    } catch (error) {
      console.warn('Could not check existing R2 images:', error)
      return new Set<string>()
    }
  }

  // Scan all directories for image URLs
  async scanAllDirectories(): Promise<string[]> {
    console.log('🔍 Scanning directories for image URLs...')

    const allImageUrls: Set<string> = new Set()

    for (const directory of this.scanConfig.directories) {
      console.log(`\n📁 Scanning directory: ${directory}`)

      // Check if directory exists
      try {
        await fs.access(directory, fs.constants.R_OK)
        console.log(`✅ Directory accessible: ${directory}`)
      } catch (error) {
        console.warn(`❌ Directory not accessible: ${directory} - ${error}`)
        continue
      }

      for (const pattern of this.scanConfig.filePatterns) {
        const files = await glob(pattern, { cwd: directory })

        console.log(`📄 Found ${files.length} files matching ${pattern}`)

        for (const file of files) {
          const filePath = path.join(directory, file)

          // Skip if file matches exclude patterns
          const shouldExclude = this.scanConfig.excludePatterns.some(excludePattern =>
            file.includes(excludePattern)
          )

          if (shouldExclude) {
            continue
          }

          try {
            const content = await fs.readFile(filePath, 'utf-8')
            const urls = this.extractImageUrlsFromContent(content)

            if (urls.length > 0) {
              console.log(`   📸 ${file}: found ${urls.length} images`)
              urls.forEach(url => allImageUrls.add(url))
            }
          } catch (error) {
            console.warn(`   ⚠️  Could not read ${file}: ${error}`)
          }
        }
      }
    }

    const uniqueUrls = Array.from(allImageUrls)
    console.log(`\n🎯 Found ${uniqueUrls.length} unique image URLs across all directories`)

    // Categorize URLs by source
    const localUrls = uniqueUrls.filter(url => url.startsWith('./') || url.startsWith('/'))
    const httpUrls = uniqueUrls.filter(url => url.startsWith('http'))
    const dataUrls = uniqueUrls.filter(url => url.startsWith('data:'))

    console.log(`   HTTP URLs: ${httpUrls.length}`)
    console.log(`   Local URLs: ${localUrls.length}`)
    console.log(`   Data URLs: ${dataUrls.length} (will be skipped)`)

    return uniqueUrls
  }

  // Extract image URLs from text content
  extractImageUrlsFromContent(content: string): string[] {
    const imageUrls: string[] = []

    // Enhanced image patterns for HTML files
    const imagePatterns = [
      // Standard image URLs with extensions
      /https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|webp|svg|avif|ico|bmp|tiff)(\?[^\s"']*)?/gi,

      // Protocol-relative URLs
      /\/\/[^\s"']*\.(jpg|jpeg|png|gif|webp|svg|avif|ico|bmp|tiff)(\?[^\s"']*)?/gi,

      // Local absolute paths
      /\/[^\s"']*\.(jpg|jpeg|png|gif|webp|svg|avif|ico|bmp|tiff)(\?[^\s"']*)?/gi,

      // Local relative paths
      /\.\/[^\s"']*\.(jpg|jpeg|png|gif|webp|svg|avif|ico|bmp|tiff)(\?[^\s"']*)?/gi,

      // Relative paths without ./
      /[^\s"']*\/[^\s"']*\.(jpg|jpeg|png|gif|webp|svg|avif|ico|bmp|tiff)(\?[^\s"']*)?/gi,

      // Cloudinary URLs
      /https?:\/\/[^\s"']*cloudinary[^\s"']*/gi,

      // Image CDN services
      /https?:\/\/[^\s"']*(imgur|unsplash|pexels|pixabay|istockphoto|shutterstock)[^\s"']*/gi,

      // Google Storage / Firebase
      /https?:\/\/[^\s"']*googleapis[^\s"']*/gi,
      /https?:\/\/[^\s"']*firebase[^\s"']*/gi,

      // Common image hosting patterns
      /https?:\/\/[^\s"']*(i\.imgur\.com|images\.unsplash\.com|images\.pexels\.com)[^\s"']*/gi,

      // Base64 images (skip these as they're already embedded)
      // /data:image\/[^;]+;base64,[^\s"']+/gi,
    ]

    imagePatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        imageUrls.push(...matches)
      }
    })

    // Filter and clean up URLs
    const filteredUrls = imageUrls.filter(url => {
      // Skip data URLs
      if (url.startsWith('data:')) return false

      // Skip very short matches that are likely false positives
      if (url.length < 5) return false

      // Skip URLs that look like CSS properties or other false positives
      if (url.includes('gradient') || url.includes('rgba') || url.includes('color(')) return false

      return true
    })

    // Clean up URLs - remove trailing punctuation and quotes
    const cleanedUrls = filteredUrls.map(url =>
      url.replace(/[,\.;\)\]"']+$/g, '').replace(/^["'\(\[]+/, '').trim()
    )

    return [...new Set(cleanedUrls)]
  }

  // Resolve image URL to downloadable format
  resolveImageUrl(url: string): string | null {
    // Skip data URLs and invalid URLs
    if (!url || typeof url !== 'string') {
      return null
    }

    // Remove any surrounding quotes or brackets
    url = url.replace(/^["'\(\[]+/, '').replace(/["'\)\]]+$/, '')

    // Skip data URLs
    if (url.startsWith('data:')) {
      return null
    }

    // Handle protocol-relative URLs (//domain.com/image.jpg)
    if (url.startsWith('//')) {
      return `https:${url}`
    }

    // If it's already absolute HTTPS, return as is
    if (url.startsWith('https://')) {
      return url
    }

    // Convert HTTP to HTTPS
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://')
    }

    // Handle local files - try to read from filesystem
    if (url.startsWith('./') || url.startsWith('/') || !url.includes('://')) {
      // For now, skip local files since they should already be in the project
      console.warn(`⚠️  Skipping local file: ${url}`)
      return null
    }

    return null
  }

  // Download single image
  async downloadImage(imageUrl: string): Promise<DownloadedImage | null> {
    try {
      const absoluteUrl = this.resolveImageUrl(imageUrl)
      if (!absoluteUrl) {
        console.warn(`⚠️  Could not resolve URL: ${imageUrl}`)
        return null
      }

      console.log(`⬇️  Downloading: ${absoluteUrl}`)

      const response = await fetch(absoluteUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ImageMigrator/1.0)',
          'Accept': 'image/*,*/*;q=0.8'
        }
      })

      if (!response.ok) {
        console.warn(`❌ Failed to download ${absoluteUrl}: ${response.status} ${response.statusText}`)
        return null
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg'

      // Check if it's actually an image
      if (!contentType.startsWith('image/')) {
        console.warn(`⚠️  Not an image: ${absoluteUrl} (${contentType})`)
        return null
      }

      const buffer = await response.arrayBuffer()
      const size = buffer.byteLength

      // Skip very small images (likely icons/empty)
      if (size < 100) {
        console.warn(`⚠️  Image too small: ${absoluteUrl} (${size} bytes)`)
        return null
      }

      // Generate filename with better naming
      const urlPath = new URL(absoluteUrl).pathname
      const originalName = path.basename(urlPath)
      const nameWithoutExt = path.parse(originalName).name
      const extension = this.getExtensionFromContentType(contentType) ||
                       path.extname(originalName) || '.jpg'

      const timestamp = Date.now()
      const random = Math.random().toString(36).substring(7)
      const filename = nameWithoutExt ? `${nameWithoutExt}-${timestamp}-${random}${extension}` : `${timestamp}-${random}${extension}`
      const localPath = path.join(this.downloadDir, filename)

      // Save to disk
      await fs.writeFile(localPath, new Uint8Array(buffer))

      return {
        url: absoluteUrl,
        filename,
        localPath,
        size,
        contentType
      }
    } catch (error) {
      console.error(`❌ Error downloading ${imageUrl}:`, error)
      return null
    }
  }

  // Get file extension from content type
  getExtensionFromContentType(contentType: string): string {
    const extensions: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg',
      'image/ico': '.ico',
      'image/x-icon': '.ico',
      'image/bmp': '.bmp',
      'image/tiff': '.tiff',
      'image/avif': '.avif'
    }
    return extensions[contentType] || ''
  }

  // Upload single image to R2
  async uploadToR2(image: DownloadedImage): Promise<boolean> {
    console.log(`⬆️  Uploading ${image.filename} to R2...`)

    try {
      const fileContent = await fs.readFile(image.localPath)

      // Create folder structure by date
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')

      const key = `hanacare-uiux/${year}/${month}/${image.filename}`

      const command = new PutObjectCommand({
        Bucket: this.r2Config.bucket,
        Key: key,
        Body: fileContent,
        ContentType: image.contentType,
        Metadata: {
          originalUrl: image.url,
          downloadedAt: new Date().toISOString(),
          source: 'uiux-migration'
        }
      })

      const result = await this.s3Client.send(command)

      console.log(`✅ Uploaded: ${image.filename}`)
      console.log(`   📂 Path: ${key}`)
      console.log(`   🌐 URL: https://pub-${this.r2Config.bucket.replace('hanacare-', '')}.r2.dev/${key}`)

      return true
    } catch (error) {
      console.error(`❌ Error uploading ${image.filename}:`, error)
      return false
    }
  }

  // Main migration process
  async migrate(): Promise<void> {
    console.log('🚀 Starting UI/UX image migration to Cloudflare R2...')

    await fs.mkdir(this.downloadDir, { recursive: true })

    try {
      // Scan all directories for image URLs
      const imageUrls = await this.scanAllDirectories()

      if (imageUrls.length === 0) {
        console.log('ℹ️  No image URLs found in UI/UX files')
        return
      }

      console.log(`\n📊 Migration Summary:`)
      console.log(`   Found images: ${imageUrls.length}`)
      console.log(`   Download dir: ${this.downloadDir}`)
      console.log(`   R2 bucket: ${this.r2Config.bucket}`)

      // Download images
      const downloadedImages: DownloadedImage[] = []
      let downloadErrors = 0

      console.log('\n⬇️  Downloading images...')
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i]
        console.log(`\n📸 [${i + 1}/${imageUrls.length}] ${imageUrl}`)

        const image = await this.downloadImage(imageUrl)
        if (image) {
          downloadedImages.push(image)
        } else {
          downloadErrors++
        }
      }

      console.log(`\n📥 Download Summary:`)
      console.log(`   Successful: ${downloadedImages.length}`)
      console.log(`   Failed: ${downloadErrors}`)

      if (downloadedImages.length === 0) {
        console.log('ℹ️  No images were successfully downloaded')
        return
      }

      // Upload to R2
      let uploadSuccess = 0
      let uploadErrors = 0

      console.log('\n⬆️  Uploading to R2...')
      for (let i = 0; i < downloadedImages.length; i++) {
        const image = downloadedImages[i]
        console.log(`\n📦 [${i + 1}/${downloadedImages.length}] ${image.filename}`)

        const success = await this.uploadToR2(image)
        if (success) {
          uploadSuccess++

          // Clean up local file
          try {
            await fs.unlink(image.localPath)
            console.log(`   🗑️  Cleaned up local file`)
          } catch (error) {
            console.warn(`   ⚠️  Could not delete local file: ${error}`)
          }
        } else {
          uploadErrors++
        }
      }

      console.log(`\n✅ UI/UX Migration Completed!`)
      console.log(`   Images found: ${imageUrls.length}`)
      console.log(`   Downloaded: ${downloadedImages.length}`)
      console.log(`   Uploaded to R2: ${uploadSuccess}`)
      console.log(`   Upload failed: ${uploadErrors}`)

      if (uploadSuccess > 0) {
        console.log(`\n🎯 R2 bucket structure: hanacare-uiux/YYYY/MM/`)
        console.log(`🔗 Check your R2 bucket: ${this.r2Config.bucket}`)
        console.log(`🌐 Access images via: https://pub-{bucket-id}.r2.dev/hanacare-uiux/...`)
      }

    } catch (error) {
      console.error('\n❌ Migration failed:', error)
      throw error
    }
  }
}

// Main execution
async function main() {
  const scanConfig: ScanConfig = {
    directories: [
      './docs/uiux',
      './apps/web',
      './apps/mobile'
    ],
    filePatterns: [
      '**/*.{html,htm,tsx,jsx,ts,js,md,mdx}'
    ],
    excludePatterns: [
      'node_modules',
      '.git',
      '.next',
      'dist',
      '.vercel'
    ]
  }

  const r2Config: CloudflareR2Config = {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucket: process.env.R2_BUCKET || 'hanacare-images',
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT || 'https://your-account-id.r2.cloudflarestorage.com'
  }

  if (!r2Config.accessKeyId || !r2Config.secretAccessKey) {
    console.error('❌ Missing required environment variables:')
    console.error('- R2_ACCESS_KEY_ID')
    console.error('- R2_SECRET_ACCESS_KEY')
    console.error('- R2_BUCKET')
    console.error('- R2_ENDPOINT')
    console.log('\n💡 Solution:')
    console.log('1. Copy scripts/.env.example to scripts/.env')
    console.log('2. Fill in your Cloudflare R2 credentials')
    console.log('3. Run: bun run test-migration-config')
    process.exit(1)
  }

  const migrator = new UIUXImageMigrator(scanConfig, r2Config)
  await migrator.migrate()
}

if (import.meta.main) {
  main().catch(console.error)
}

export { UIUXImageMigrator, type ScanConfig, type CloudflareR2Config, type DownloadedImage }