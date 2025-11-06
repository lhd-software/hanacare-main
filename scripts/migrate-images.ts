#!/usr/bin/env bun
import dotenv from 'dotenv'
import { promises as fs } from 'fs'
import path from 'path'
import { createWriteStream } from 'fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { glob } from 'glob'

// Load environment variables
dotenv.config({ path: './scripts/.env' })

// Configuration types
interface ScanConfig {
  webAppDir: string
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

class ImageMigrator {
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

  // Initialize download directory
  async initDownloadDir(): Promise<void> {
    try {
      await fs.access(this.downloadDir)
    } catch {
      await fs.mkdir(this.downloadDir, { recursive: true })
      console.log(`Created download directory: ${this.downloadDir}`)
    }
  }

  // Scan local web files for image URLs
  async scanLocalFiles(): Promise<string[]> {
    console.log('Scanning local web files for image URLs...')

    const allImageUrls: Set<string> = new Set()

    for (const pattern of this.scanConfig.filePatterns) {
      const files = await glob(pattern, { cwd: this.scanConfig.webAppDir })

      for (const file of files) {
        const filePath = path.join(this.scanConfig.webAppDir, file)

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

          urls.forEach(url => allImageUrls.add(url))
          console.log(`📄 Scanned ${file}: found ${urls.length} images`)
        } catch (error) {
          console.warn(`⚠️  Could not read ${file}: ${error}`)
        }
      }
    }

    const uniqueUrls = Array.from(allImageUrls)
    console.log(`🔍 Found ${uniqueUrls.length} unique image URLs`)
    return uniqueUrls
  }

  // Extract image URLs from text content
  extractImageUrlsFromContent(content: string): string[] {
    const imageUrls: string[] = []

    // Enhanced image patterns for various sources
    const imagePatterns = [
      // Standard image URLs with extensions
      /https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|webp|svg|avif|ico)(\?[^\s"']*)?/gi,

      // Cloudinary URLs
      /https?:\/\/[^\s"']*cloudinary[^\s"']*/gi,

      // Image CDN services
      /https?:\/\/[^\s"']*(imgur|unsplash|pexels|pixabay)[^\s"']*/gi,

      // Common image hosting patterns
      /https?:\/\/[^\s"']*(i\.imgur\.com|images\.unsplash\.com|images\.pexels\.com)[^\s"']*/gi,

      // Base64 images (skip these as they're already embedded)
      // /data:image\/[^;]+;base64,[^\s"']+/gi,

      // Relative URLs that look like images
      /\/[^\s"']*\.(jpg|jpeg|png|gif|webp|svg|avif|ico)(\?[^\s"']*)?/gi,

      // Next.js Image optimization patterns
      /\/_next\/image[^\s"']*/gi,

      // Vercel/Netlify image optimization
      /https?:\/\/[^\s"']*vercel[^\s"']*image[^\s"']*/gi,
      /https?:\/\/[^\s"']*netlify[^\s"']*image[^\s"']*/gi
    ]

    imagePatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        imageUrls.push(...matches)
      }
    })

    // Filter out non-image URLs and data URLs
    const filteredUrls = imageUrls.filter(url => {
      // Skip data URLs
      if (url.startsWith('data:')) return false

      // Skip very short matches that are likely false positives
      if (url.length < 10) return false

      return true
    })

    // Clean up URLs - remove trailing punctuation
    const cleanedUrls = filteredUrls.map(url =>
      url.replace(/[,\.;\)]+$/, '').trim()
    )

    return [...new Set(cleanedUrls)]
  }

  // Download single image
  async downloadImage(imageUrl: string): Promise<DownloadedImage | null> {
    try {
      // Convert relative URLs to absolute if needed
      const absoluteUrl = this.resolveImageUrl(imageUrl)
      if (!absoluteUrl) {
        console.warn(`⚠️  Could not resolve URL: ${imageUrl}`)
        return null
      }

      console.log(`⬇️  Downloading: ${absoluteUrl}`)

      const response = await fetch(absoluteUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ImageMigrator/1.0)'
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

      // Generate filename
      const urlPath = new URL(absoluteUrl).pathname
      const originalName = path.basename(urlPath)
      const extension = this.getExtensionFromContentType(contentType) ||
                       path.extname(originalName) || '.jpg'

      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${extension}`
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

  // Resolve relative URLs to absolute URLs
  resolveImageUrl(url: string): string | null {
    // Skip data URLs and invalid URLs
    if (url.startsWith('data:') || !url || typeof url !== 'string') {
      return null
    }

    // If it's already absolute, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }

    // Skip relative URLs that are hard to resolve
    if (url.startsWith('/_next/') || url.startsWith('//')) {
      return null
    }

    console.warn(`⚠️  Skipping relative URL: ${url}`)
    return null
  }

  // Get file extension from content type
  getExtensionFromContentType(contentType: string): string {
    const extensions: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg'
    }
    return extensions[contentType] || ''
  }

  // Upload single image to R2
  async uploadToR2(image: DownloadedImage): Promise<boolean> {
    console.log(`Uploading ${image.filename} to R2...`)

    try {
      // Read file for upload
      const fileContent = await fs.readFile(image.localPath)

      // Create folder structure by date
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      const key = `hanacare-images/${year}/${month}/${image.filename}`

      const command = new PutObjectCommand({
        Bucket: this.r2Config.bucket,
        Key: key,
        Body: fileContent,
        ContentType: image.contentType,
        Metadata: {
          originalUrl: image.url,
          downloadedAt: new Date().toISOString()
        }
      })

      const result = await this.s3Client.send(command)

      console.log(`✅ Uploaded: ${image.filename} -> ${key}`)
      console.log(`   Location: ${result.Location || `${this.r2Config.bucket}/${key}`}`)

      return true
    } catch (error) {
      console.error(`❌ Error uploading ${image.filename}:`, error)
      return false
    }
  }

  // Main migration process
  async migrate(): Promise<void> {
    console.log('🚀 Starting image migration from local web files to Cloudflare R2...')

    await this.initDownloadDir()

    try {
      // Scan local files for image URLs
      const imageUrls = await this.scanLocalFiles()

      if (imageUrls.length === 0) {
        console.log('ℹ️  No image URLs found in local files')
        return
      }

      console.log(`\n📊 Migration Summary:`)
      console.log(`   Found images: ${imageUrls.length}`)
      console.log(`   Download dir: ${this.downloadDir}`)
      console.log(`   R2 bucket: ${this.r2Config.bucket}`)

      // Download images with progress tracking
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

      // Upload to R2 with progress tracking
      let uploadSuccess = 0
      let uploadErrors = 0

      console.log('\n⬆️  Uploading to R2...')
      for (let i = 0; i < downloadedImages.length; i++) {
        const image = downloadedImages[i]
        console.log(`\n📦 [${i + 1}/${downloadedImages.length}] ${image.filename}`)

        const success = await this.uploadToR2(image)
        if (success) {
          uploadSuccess++

          // Optional: Delete local file after successful upload
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

      console.log(`\n✅ Migration Completed!`)
      console.log(`   Images found: ${imageUrls.length}`)
      console.log(`   Downloaded: ${downloadedImages.length}`)
      console.log(`   Uploaded to R2: ${uploadSuccess}`)
      console.log(`   Upload failed: ${uploadErrors}`)

      if (uploadSuccess > 0) {
        console.log(`\n🎯 R2 bucket structure: hanacare-images/YYYY/MM/`)
        console.log(`🔗 Check your R2 bucket: ${this.r2Config.bucket}`)
      }

    } catch (error) {
      console.error('\n❌ Migration failed:', error)
      throw error
    }
  }
}

// Example usage
async function main() {
  const scanConfig: ScanConfig = {
    webAppDir: './apps/web',
    filePatterns: [
      '**/*.{tsx,jsx,ts,js,html,md,mdx}',
      '**/*.json'
    ],
    excludePatterns: [
      'node_modules',
      '.next',
      'dist',
      '.git',
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

  const migrator = new ImageMigrator(scanConfig, r2Config)
  await migrator.migrate()
}

if (import.meta.main) {
  main().catch(console.error)
}

export { ImageMigrator, type ScanConfig, type CloudflareR2Config, type DownloadedImage }