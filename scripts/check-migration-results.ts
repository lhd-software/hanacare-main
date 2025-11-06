#!/usr/bin/env bun
import dotenv from 'dotenv'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { promises as fs } from 'fs'

// Load environment variables
dotenv.config({ path: './scripts/.env' })

interface CloudflareR2Config {
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  region: string
  endpoint: string
}

class MigrationChecker {
  private s3Client: S3Client
  private r2Config: CloudflareR2Config

  constructor(r2Config: CloudflareR2Config) {
    this.r2Config = r2Config
    this.s3Client = new S3Client({
      region: this.r2Config.region,
      endpoint: this.r2Config.endpoint,
      credentials: {
        accessKeyId: this.r2Config.accessKeyId,
        secretAccessKey: this.r2Config.secretAccessKey
      }
    })
  }

  async listR2Objects(prefix: string = ''): Promise<any[]> {
    console.log(`🔍 Listing objects in R2 with prefix: ${prefix}`)

    try {
      let continuationToken: string | undefined
      const objects: any[] = []

      do {
        const command = new ListObjectsV2Command({
          Bucket: this.r2Config.bucket,
          Prefix: prefix,
          MaxKeys: 1000
        })

        const result = await this.s3Client.send(command)

        if (result.Contents) {
          objects.push(...result.Contents)
        }

        continuationToken = result.NextContinuationToken
      } while (continuationToken)

      return objects
    } catch (error) {
      console.error(`❌ Error listing R2 objects: ${error}`)
      return []
    }
  }

  async checkMigrationResults() {
    console.log('🚀 Checking migration results...\n')

    // Check hanacare-images (from first migration)
    const hanacareImages = await this.listR2Objects('hanacare-images/')
    console.log(`📸 hanacare-images/:`)
    console.log(`   Found ${hanacareImages.length} objects`)

    // Group by year/month
    const byDate = new Map<string, any[]>()
    hanacareImages.forEach(obj => {
      const key = obj.Key
      const match = key.match(/hanacare-images\/(\d{4})\/(\d{2})\//)
      if (match) {
        const date = `${match[1]}/${match[2]}`
        if (!byDate.has(date)) byDate.set(date, [])
        byDate.get(date)!.push(obj)
      }
    })

    byDate.forEach((objects, date) => {
      console.log(`   📂 ${date}/: ${objects.length} files`)
      objects.forEach(obj => {
        const fileName = obj.Key.split('/').pop()
        console.log(`      📄 ${fileName} (${Math.round(obj.Size / 1024)}KB)`)
      })
    })

    // Check hanacare-uiux (from UI/UX migration)
    const uiuxImages = await this.listR2Objects('hanacare-uiux/')
    console.log(`\n🎨 hanacare-uiux/:`)
    console.log(`   Found ${uiuxImages.length} objects`)

    // Group UI/UX by date
    const uiuxByDate = new Map<string, any[]>()
    uiuxImages.forEach(obj => {
      const key = obj.Key
      const match = key.match(/hanacare-uiux\/(\d{4})\/(\d{2})\//)
      if (match) {
        const date = `${match[1]}/${match[2]}`
        if (!uiuxByDate.has(date)) uiuxByDate.set(date, [])
        uiuxByDate.get(date)!.push(obj)
      }
    })

    uiuxByDate.forEach((objects, date) => {
      console.log(`   📂 ${date}/: ${objects.length} files`)

      // Group by filename type
      const avatars = objects.filter(obj => obj.Key.includes('avatar-'))
      const logos = objects.filter(obj => obj.Key.includes('hanacare-logo'))
      const others = objects.filter(obj => !obj.Key.includes('avatar-') && !obj.Key.includes('hanacare-logo'))

      if (avatars.length > 0) {
        console.log(`      👥 Avatar images: ${avatars.length}`)
        avatars.forEach(obj => {
          const fileName = obj.Key.split('/').pop()
          console.log(`         📄 ${fileName}`)
        })
      }

      if (logos.length > 0) {
        console.log(`      🏢 Logo images: ${logos.length}`)
        logos.forEach(obj => {
          const fileName = obj.Key.split('/').pop()
          console.log(`         📄 ${fileName}`)
        })
      }

      if (others.length > 0) {
        console.log(`      🖼️ Other images: ${others.length}`)
        others.forEach(obj => {
          const fileName = obj.Key.split('/').pop()
          console.log(`         📄 ${fileName}`)
        })
      }
    })

    // Calculate totals
    const totalImages = hanacareImages.length + uiuxImages.length
    const totalSize = [...hanacareImages, ...uiuxImages].reduce((sum, obj) => sum + (obj.Size || 0), 0)

    console.log(`\n📊 Migration Summary:`)
    console.log(`   Total images: ${totalImages}`)
    console.log(`   Total size: ${Math.round(totalSize / 1024)}KB (${Math.round(totalSize / 1024 / 1024)}MB)`)
    console.log(`   Average size: ${Math.round(totalSize / totalImages / 1024)}KB per image`)

    // Generate public URLs
    console.log(`\n🌐 Public Access URLs:`)
    console.log(`   R2 Public URL: https://pub-web.r2.dev/`)
    console.log(`   hanacare-images: https://pub-web.r2.dev/hanacare-images/`)
    console.log(`   hanacare-uiux: https://pub-web.r2.dev/hanacare-uiux/`)

    // Write results to file
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalImages,
        totalSize,
        hanacareImages: hanacareImages.length,
        uiuxImages: uiuxImages.length
      },
      hanacareImages: hanacareImages.map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
        url: `https://pub-web.r2.dev/${obj.Key}`
      })),
      uiuxImages: uiuxImages.map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
        url: `https://pub-web.r2.dev/${obj.Key}`
      }))
    }

    await fs.writeFile('./migration-report.json', JSON.stringify(report, null, 2))
    console.log(`\n📄 Detailed report saved to: migration-report.json`)

    console.log(`\n✅ Migration check completed!`)
  }
}

async function main() {
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
    process.exit(1)
  }

  const checker = new MigrationChecker(r2Config)
  await checker.checkMigrationResults()
}

if (import.meta.main) {
  main().catch(console.error)
}

export { MigrationChecker, type CloudflareR2Config }