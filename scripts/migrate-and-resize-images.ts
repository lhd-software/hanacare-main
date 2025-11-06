#!/usr/bin/env bun
import dotenv from 'dotenv'
import { promises as fs } from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { glob } from 'glob'
import sharp from 'sharp'

// Load environment variables
dotenv.config({ path: './scripts/.env' })

// Image size configurations
const IMAGE_SIZES = {
  small: { width: 400, quality: 85, format: 'webp' },
  medium: { width: 800, quality: 90, format: 'webp' },
  large: { width: 1200, quality: 95, format: 'webp' }
} as const

type ImageSize = keyof typeof IMAGE_SIZES

interface ProcessedImage {
  originalUrl: string
  filename: string
  sizes: {
    [key in ImageSize]: {
      filename: string
      s3Key: string
      size: number
      url: string
    }
  }
}

class ImageResizerUploader {
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

  // Extract and resolve image URLs from codebase
  async findImagesInCodebase(): Promise<string[]> {
    console.log('🔍 Scanning codebase for image URLs...')

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
              const urls = this.extractImageUrls(content)

              urls.forEach(url => allImageUrls.add(url))
              if (urls.length > 0) {
                console.log(`📄 ${file}: found ${urls.length} images`)
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
    const filteredUrls = uniqueUrls.filter(url =>
      url.includes('uxpilot') || url.includes('hanacare')
    )

    console.log(`🎯 Found ${filteredUrls.length} relevant image URLs`)
    return filteredUrls
  }

  extractImageUrls(content: string): string[] {
    const patterns = [
      /https?:\/\/[^\s"']*\.(jpg|jpeg|png|gif|webp|svg|avif)(\?[^\s"']*)?/gi,
      /\/\/[^\s"']*\.(jpg|jpeg|png|gif|webp|svg|avif)(\?[^\s"']*)?/gi
    ]

    const urls: string[] = []

    patterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        urls.push(...matches)
      }
    })

    return urls
      .map(url => url.replace(/^\/\//, 'https://'))
      .map(url => url.split(/[?#]/)[0]) // Remove query params and fragments
      .filter(url => url.includes('uxpilot') || url.includes('hanacare'))
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

  async processImage(originalUrl: string, buffer: Buffer): Promise<ProcessedImage | null> {
    try {
      // Extract filename from URL
      const urlPath = new URL(originalUrl).pathname
      const originalName = path.basename(urlPath, path.extname(urlPath))
      const extension = path.extname(urlPath)

      // Generate new filename (preserve original extension if possible, otherwise use .jpg)
      const baseFilename = originalName || 'image'
      const targetFilename = baseFilename.replace(/[^a-zA-Z0-9-_]/g, '_')

      console.log(`🖼️  Processing: ${originalName} -> ${targetFilename}`)

      const processedImage: ProcessedImage = {
        originalUrl,
        filename: targetFilename,
        sizes: {} as any
      }

      // Process each size
      for (const [sizeName, config] of Object.entries(IMAGE_SIZES)) {
        const sizeConfig = config as typeof IMAGE_SIZES[ImageSize]

        try {
          // Resize and convert image
          let processedBuffer = await sharp(buffer)
            .resize(sizeConfig.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: sizeConfig.quality })
            .toBuffer()

          // Generate filename for this size
          const sizeFilename = `${targetFilename}.${sizeConfig.format}`
          const s3Key = `images/${sizeFilename}`

          // Upload to R2
          const uploadResult = await this.uploadToR2(s3Key, processedBuffer, `image/${sizeConfig.format}`)

          if (uploadResult) {
            processedImage.sizes[sizeName as ImageSize] = {
              filename: sizeFilename,
              s3Key,
              size: processedBuffer.length,
              url: `https://img.hanacare.vn/${sizeName}/${targetFilename}`
            }

            console.log(`   ✅ ${sizeName}: ${s3Key} (${Math.round(processedBuffer.length / 1024)}KB)`)
          }
        } catch (error) {
          console.error(`   ❌ Error processing ${sizeName}:`, error)
        }
      }

      // Check if we successfully processed at least one size
      const successfulSizes = Object.keys(processedImage.sizes).length
      if (successfulSizes > 0) {
        console.log(`   📊 Processed ${successfulSizes}/3 sizes for ${targetFilename}`)
        return processedImage
      } else {
        console.warn(`   ⚠️  No sizes processed successfully for ${targetFilename}`)
        return null
      }

    } catch (error) {
      console.error(`❌ Error processing image ${originalUrl}:`, error)
      return null
    }
  }

  async uploadToR2(key: string, buffer: Buffer, contentType: string): Promise<boolean> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.r2Config.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000', // 1 year cache
        Metadata: {
          processedAt: new Date().toISOString(),
          migrator: 'hanacare-image-resizer'
        }
      })

      await this.s3Client.send(command)
      return true
    } catch (error) {
      console.error(`❌ Error uploading ${key}:`, error)
      return false
    }
  }

  generateUrlMappings(processedImages: ProcessedImage[]): { [originalUrl: string]: ProcessedImage } {
    const mappings: { [originalUrl: string]: ProcessedImage } = {}

    processedImages.forEach(image => {
      // Map both HTTP and HTTPS versions, and protocol-relative versions
      const httpsUrl = image.originalUrl.replace('http://', 'https://')
      const protocolRelativeUrl = image.originalUrl.replace(/^https?:\/\//, '//')

      mappings[image.originalUrl] = image
      mappings[httpsUrl] = image
      mappings[protocolRelativeUrl] = image
    })

    return mappings
  }

  async generateReplacementReport(processedImages: ProcessedImage[]): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalImages: processedImages.length,
        totalSizes: processedImages.length * 3, // small, medium, large
        baseDomain: 'https://img.hanacare.vn'
      },
      imageMappings: this.generateUrlMappings(processedImages),
      urlPatterns: {
        small: 'https://img.hanacare.vn/small/{filename}',
        medium: 'https://img.hanacare.vn/medium/{filename}',
        large: 'https://img.hanacare.vn/large/{filename}'
      },
      examples: processedImages.slice(0, 3).map(img => ({
        original: img.originalUrl,
        small: img.sizes.small?.url,
        medium: img.sizes.medium?.url,
        large: img.sizes.large?.url
      }))
    }

    await fs.writeFile('./image-migration-report.json', JSON.stringify(report, null, 2))
    console.log('\n📄 Detailed report saved to: image-migration-report.json')
  }

  async migrate(): Promise<void> {
    console.log('🚀 Starting image migration and resizing...\n')

    await this.initDownloadDir()

    try {
      // Find all images in codebase
      const imageUrls = await this.findImagesInCodebase()

      if (imageUrls.length === 0) {
        console.log('ℹ️  No images found to process')
        return
      }

      console.log(`\n📊 Processing ${imageUrls.length} images...`)

      const processedImages: ProcessedImage[] = []
      let successCount = 0
      let failureCount = 0

      // Process each image
      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i]
        console.log(`\n🖼️  [${i + 1}/${imageUrls.length}] ${url}`)

        // Download original image
        const buffer = await this.downloadImage(url)

        if (!buffer) {
          failureCount++
          continue
        }

        // Process image (resize and upload)
        const processedImage = await this.processImage(url, buffer)

        if (processedImage) {
          processedImages.push(processedImage)
          successCount++
        } else {
          failureCount++
        }
      }

      console.log(`\n📊 Migration Summary:`)
      console.log(`   Total images: ${imageUrls.length}`)
      console.log(`   Successfully processed: ${successCount}`)
      console.log(`   Failed: ${failureCount}`)
      console.log(`   Total uploaded sizes: ${processedImages.length * 3}`)

      if (processedImages.length > 0) {
        // Generate replacement report
        await this.generateReplacementReport(processedImages)

        console.log(`\n🎯 New URL Structure:`)
        console.log(`   Base domain: https://img.hanacare.vn`)
        console.log(`   Small:  https://img.hanacare.vn/small/{filename}`)
        console.log(`   Medium: https://img.hanacare.vn/medium/{filename}`)
        console.log(`   Large:  https://img.hanacare.vn/large/{filename}`)

        console.log(`\n📝 Next Steps:`)
        console.log(`   1. Check image-migration-report.json for URL mappings`)
        console.log(`   2. Replace old URLs in your codebase with new ones`)
        console.log(`   3. Set up DNS/routing for img.hanacare.vn`)
        console.log(`   4. Test the new image URLs`)
      }

      console.log(`\n✅ Migration completed!`)

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

  const processor = new ImageResizerUploader(r2Config)
  await processor.migrate()
}

if (import.meta.main) {
  main().catch(console.error)
}

export { ImageResizerUploader, IMAGE_SIZES, type ProcessedImage }