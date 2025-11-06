#!/usr/bin/env bun
import dotenv from 'dotenv'
import { promises as fs } from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { glob } from 'glob'

// Load environment variables
dotenv.config({ path: './scripts/.env' })

interface ImageMapping {
  originalUrl: string
  filename: string
  s3Key: string
  cdnUrl: string
  size: number
}

class CDNMigrator {
  private s3Client: S3Client
  private r2Config: any
  private downloadDir: string

  constructor(r2Config: any, downloadDir: string = './downloads') {
    this.r2Config = r2Config
    this.downloadDir = downloadDir

    this.s3Client = new S3Client({
      region: r2Config.region,
      endpoint: r2Config.endpoint,
      credentials: {
        accessKeyId: r2Config.accessKeyId,
        secretAccessKey: r2Config.secretAccessKey
      }
    })
  }

  async initDownloadDir(): Promise<void> {
    await fs.mkdir(this.downloadDir, { recursive: true })
  }

  // Find all uxpilot images in codebase
  async findUxpilotImages(): Promise<string[]> {
    console.log('🔍 Scanning for uxpilot images...')

    const directories = [
      './docs/uiux',
      './apps/web',
      './apps/mobile'
    ]

    const filePatterns = ['**/*.{html,htm,tsx,jsx,ts,js,md,mdx}']
    const allImageUrls: Set<string> = new Set()

    for (const directory of directories) {
      try {
        await fs.access(directory)

        for (const pattern of filePatterns) {
          const files = await glob(pattern, { cwd: directory })

          for (const file of files) {
            const filePath = path.join(directory, file)

            try {
              const content = await fs.readFile(filePath, 'utf-8')
              const urls = this.extractUxpilotImageUrls(content)

              urls.forEach(url => allImageUrls.add(url))
              if (urls.length > 0) {
                console.log(`📄 ${file}: found ${urls.length} uxpilot images`)
              }
            } catch (error) {
              console.warn(`⚠️  Could not read ${file}: ${error}`)
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️  Could not access ${directory}: ${error}`)
      }
    }

    const uniqueUrls = Array.from(allImageUrls)
    console.log(`🎯 Found ${uniqueUrls.length} unique uxpilot image URLs`)
    return uniqueUrls
  }

  extractUxpilotImageUrls(content: string): string[] {
    // Extract URLs containing uxpilot or hanacare assets
    const patterns = [
      // Uxpilot URLs
      /https?:\/\/storage\.googleapis\.com\/uxpilot[^\s"']+/gi,
      // Hanacare assets
      /https?:\/\/assets\.hanacare\.vn[^\s"']+/gi,
      // Protocol-relative versions
      /\/\/storage\.googleapis\.com\/uxpilot[^\s"']+/gi,
      /\/\/assets\.hanacare\.vn[^\s"']+/gi
    ]

    const urls: string[] = []

    patterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        urls.push(...matches)
      }
    })

    return urls
      .map(url => url.replace(/^\/\//, 'https://')) // Convert protocol-relative to HTTPS
      .map(url => url.split(/[?#]/)[0]) // Remove query params and fragments
      .filter((url, index, arr) => arr.indexOf(url) === index) // Remove duplicates
  }

  async downloadImage(url: string): Promise<Buffer | null> {
    try {
      console.log(`⬇️  Downloading: ${url}`)

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ImageMigrator/1.0)',
          'Accept': 'image/*,*/*;q=0.8'
        }
      })

      if (!response.ok) {
        console.warn(`❌ Failed to download ${url}: ${response.status} ${response.statusText}`)
        return null
      }

      const contentType = response.headers.get('content-type') || ''

      if (!contentType.startsWith('image/')) {
        console.warn(`⚠️  Not an image: ${url} (${contentType})`)
        return null
      }

      return Buffer.from(await response.arrayBuffer())
    } catch (error) {
      console.error(`❌ Error downloading ${url}:`, error)
      return null
    }
  }

  generateCDNFilename(url: string): string {
    // Extract filename from URL
    const urlPath = new URL(url).pathname
    let filename = path.basename(urlPath)

    // If filename doesn't have extension or is too generic, create a better one
    const ext = path.extname(filename)
    const name = path.basename(filename, ext)

    if (!name || name.length < 3) {
      // Generate filename from URL hash
      const hash = Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 8)
      filename = `${hash}${ext || '.jpg'}`
    }

    // Clean up filename - remove special characters, keep web-safe
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')

    return filename
  }

  async uploadToR2(filename: string, buffer: Buffer, originalUrl: string): Promise<ImageMapping | null> {
    try {
      const s3Key = `images/${filename}`

      // Determine content type from original URL or buffer
      let contentType = 'image/jpeg' // default
      const urlPath = new URL(originalUrl).pathname
      const ext = path.extname(urlPath).toLowerCase()

      const contentTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml'
      }

      contentType = contentTypes[ext] || contentType

      const command = new PutObjectCommand({
        Bucket: this.r2Config.bucket,
        Key: s3Key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000', // 1 year cache
        Metadata: {
          originalUrl,
          uploadedAt: new Date().toISOString(),
          migrator: 'hanacare-cdn-migrator'
        }
      })

      await this.s3Client.send(command)

      // Generate CDN URL
      const cdnUrl = `https://img.hanacare.vn/${filename}`

      return {
        originalUrl,
        filename,
        s3Key,
        cdnUrl,
        size: buffer.length
      }
    } catch (error) {
      console.error(`❌ Error uploading ${filename}:`, error)
      return null
    }
  }

  generateReplacementReport(imageMappings: ImageMapping[]): void {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalImages: imageMappings.length,
        totalSize: imageMappings.reduce((sum, img) => sum + img.size, 0),
        baseDomain: 'https://img.hanacare.vn'
      },
      urlPatterns: {
        original: 'https://storage.googleapis.com/uxpilot-.../image.jpg',
        small: 'https://img.hanacare.vn/small/image.jpg',
        medium: 'https://img.hanacare.vn/medium/image.jpg',
        large: 'https://img.hanacare.vn/large/image.jpg'
      },
      mappings: imageMappings.map(img => ({
        original: img.originalUrl,
        filename: img.filename,
        size: `${Math.round(img.size / 1024)}KB`,
        cdnUrls: {
          original: img.cdnUrl,
          small: `https://img.hanacare.vn/small/${img.filename}`,
          medium: `https://img.hanacare.vn/medium/${img.filename}`,
          large: `https://img.hanacare.vn/large/${img.filename}`
        }
      })),
      examples: imageMappings.slice(0, 3).map(img => ({
        old: img.originalUrl,
        newSmall: `https://img.hanacare.vn/small/${img.filename}`,
        newMedium: `https://img.hanacare.vn/medium/${img.filename}`,
        newLarge: `https://img.hanacare.vn/large/${img.filename}`
      }))
    }

    console.log('\n📄 Detailed report saved to: cdn-migration-report.json')
    fs.writeFile('./cdn-migration-report.json', JSON.stringify(report, null, 2))
  }

  async migrate(): Promise<void> {
    console.log('🚀 Starting CDN migration...')

    await this.initDownloadDir()

    try {
      // Find all uxpilot images
      const imageUrls = await this.findUxpilotImages()

      if (imageUrls.length === 0) {
        console.log('ℹ️  No uxpilot images found to migrate')
        return
      }

      console.log(`\n📊 Migrating ${imageUrls.length} images to CDN...`)

      const imageMappings: ImageMapping[] = []
      let successCount = 0
      let failureCount = 0

      // Process each image
      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i]
        console.log(`\n🖼️  [${i + 1}/${imageUrls.length}] ${url}`)

        // Download image
        const buffer = await this.downloadImage(url)

        if (!buffer) {
          failureCount++
          continue
        }

        // Generate CDN filename
        const filename = this.generateCDNFilename(url)
        console.log(`📝 Filename: ${filename}`)

        // Upload to R2
        const mapping = await this.uploadToR2(filename, buffer, url)

        if (mapping) {
          imageMappings.push(mapping)
          successCount++
          console.log(`✅ Uploaded: ${mapping.s3Key} (${Math.round(mapping.size / 1024)}KB)`)
          console.log(`🌐 CDN URL: ${mapping.cdnUrl}`)
        } else {
          failureCount++
        }
      }

      console.log(`\n📊 Migration Summary:`)
      console.log(`   Total images: ${imageUrls.length}`)
      console.log(`   Successfully migrated: ${successCount}`)
      console.log(`   Failed: ${failureCount}`)
      console.log(`   Total size: ${Math.round(imageMappings.reduce((sum, img) => sum + img.size, 0) / 1024)}KB`)

      if (imageMappings.length > 0) {
        // Generate replacement report
        this.generateReplacementReport(imageMappings)

        console.log(`\n🎯 CDN URL Structure (Cloudflare auto-transform):`)
        console.log(`   Original: https://img.hanacare.vn/{filename}`)
        console.log(`   Small:   https://img.hanacare.vn/small/{filename} (400px, 85%, WebP)`)
        console.log(`   Medium:  https://img.hanacare.vn/medium/{filename} (800px, 90%, WebP)`)
        console.log(`   Large:   https://img.hanacare.vn/large/{filename} (1200px, 95%, WebP)`)

        console.log(`\n📝 Next Steps:`)
        console.log(`   1. Check cdn-migration-report.json for URL mappings`)
        console.log(`   2. Replace old uxpilot URLs with new CDN URLs in your codebase`)
        console.log(`   3. Test the new image URLs`)
        console.log(`   4. Update any hardcoded image references`)

        console.log(`\n🔄 Example Replacements:`)
        imageMappings.slice(0, 3).forEach(img => {
          console.log(`   OLD: ${img.originalUrl}`)
          console.log(`   NEW: https://img.hanacare.vn/small/${img.filename}`)
          console.log(`   NEW: https://img.hanacare.vn/medium/${img.filename}`)
          console.log('')
        })
      }

      console.log(`\n✅ CDN migration completed!`)

    } catch (error) {
      console.error('\n❌ Migration failed:', error)
      throw error
    }
  }
}

async function main() {
  const r2Config = {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucket: process.env.R2_BUCKET || 'hanacare-web',
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT || 'https://your-account-id.r2.cloudflarestorage.com'
  }

  if (!r2Config.accessKeyId || !r2Config.secretAccessKey) {
    console.error('❌ Missing required environment variables:')
    console.error('- R2_ACCESS_KEY_ID')
    console.error('- R2_SECRET_ACCESS_KEY')
    console.error('- R2_BUCKET')
    console.error('- R2_ENDPOINT')
    process.exit(1)
  }

  const migrator = new CDNMigrator(r2Config)
  await migrator.migrate()
}

if (import.meta.main) {
  main().catch(console.error)
}

export { CDNMigrator, type ImageMapping }