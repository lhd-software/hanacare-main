#!/usr/bin/env bun
import dotenv from 'dotenv'
import { promises as fs } from 'fs'

// Load environment variables
dotenv.config({ path: './scripts/.env' })

// Validate required environment variables
const requiredVars = [
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET',
  'R2_ENDPOINT'
]

console.log('🔍 Validating configuration...\n')

const missingVars: string[] = []
const presentVars: string[] = []

requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (!value) {
    missingVars.push(varName)
  } else {
    presentVars.push(varName)
    // Mask sensitive values
    const maskedValue = varName.includes('KEY') || varName.includes('SECRET')
      ? `${value.substring(0, 4)}...`
      : value
    console.log(`✅ ${varName}: ${maskedValue}`)
  }
})

if (missingVars.length > 0) {
  console.log('\n❌ Missing environment variables:')
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`)
  })

  console.log('\n💡 Solution:')
  console.log('1. Copy scripts/.env.example to scripts/.env')
  console.log('2. Fill in the missing values in scripts/.env')
  console.log('3. Run this test again')

  process.exit(1)
}

console.log('\n🎉 All required environment variables are set!')

// Test local file scanning
console.log('\n📁 Testing local file scanning...')
async function testLocalFileScanning() {
  try {
    const { glob } = await import('glob')
    const webAppDir = './apps/web'

    // Test if web directory exists
    try {
      await fs.access(webAppDir, fs.constants.R_OK)
      console.log(`✅ Web app directory found: ${webAppDir}`)
    } catch (error) {
      console.log(`❌ Web app directory not found: ${webAppDir}`)
      console.log(`   Error: ${error}`)
      console.log(`   Current working directory: ${process.cwd()}`)
      return false
    }

    // Test file patterns
    const patterns = ['**/*.{tsx,jsx,ts,js,html,md}']
    let totalFiles = 0

    for (const pattern of patterns) {
      const files = await glob(pattern, { cwd: webAppDir })
      totalFiles += files.length
      console.log(`📄 Found ${files.length} files matching ${pattern}`)
    }

    console.log(`✅ Total files to scan: ${totalFiles}`)
    return totalFiles > 0
  } catch (error) {
    console.log(`❌ Local file scanning error: ${error}`)
    return false
  }
}

// Test R2 connection
console.log('\n📦 Testing Cloudflare R2 connection...')
async function testR2Connection() {
  try {
    const { S3Client, ListBucketsCommand } = await import('@aws-sdk/client-s3')

    const s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
      }
    })

    const command = new ListBucketsCommand({})
    const result = await s3Client.send(command)

    console.log('✅ R2 connection successful')
    console.log(`📋 Available buckets: ${result.Buckets?.map(b => b.Name).join(', ') || 'None'}`)

    const bucketExists = result.Buckets?.some(b => b.Name === process.env.R2_BUCKET)
    if (bucketExists) {
      console.log(`✅ Bucket "${process.env.R2_BUCKET}" exists`)
    } else {
      console.log(`⚠️  Bucket "${process.env.R2_BUCKET}" not found (will be created automatically)`)
    }

    return true
  } catch (error) {
    console.log(`❌ R2 connection error: ${error}`)
    return false
  }
}

async function main() {
  const localScanOk = await testLocalFileScanning()
  const r2Ok = await testR2Connection()

  if (localScanOk && r2Ok) {
    console.log('\n🚀 Configuration is ready! You can run:')
    console.log('   bun run migrate-images')
  } else {
    console.log('\n⚠️  Some tests failed. Please check your configuration.')
    if (!localScanOk) {
      console.log('   - Make sure ./apps/web directory exists and contains web files')
    }
    if (!r2Ok) {
      console.log('   - Check your Cloudflare R2 credentials')
    }
    process.exit(1)
  }
}

main().catch(console.error)