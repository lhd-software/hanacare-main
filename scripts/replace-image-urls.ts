#!/usr/bin/env bun
import dotenv from 'dotenv'
import { promises as fs } from 'fs'
import path from 'path'
import { glob } from 'glob'

// Load environment variables
dotenv.config({ path: './scripts/.env' })

interface URLMapping {
  original: string
  small: string
  medium: string
  large: string
  filename: string
}

class URLReplacer {
  private mappings: Map<string, URLMapping> = new Map()

  async loadMappings(): Promise<void> {
    try {
      const reportContent = await fs.readFile('./cdn-migration-report.json', 'utf-8')
      const report = JSON.parse(reportContent)

      report.mappings.forEach((mapping: any) => {
        const urlMapping: URLMapping = {
          original: mapping.original,
          small: mapping.cdnUrls.small,
          medium: mapping.cdnUrls.medium,
          large: mapping.cdnUrls.large,
          filename: mapping.filename
        }

        // Add all variations of the original URL
        const httpsUrl = urlMapping.original.replace('http://', 'https://')
        const protocolRelativeUrl = urlMapping.original.replace(/^https?:\/\//, '//')

        this.mappings.set(urlMapping.original, urlMapping)
        this.mappings.set(httpsUrl, urlMapping)
        this.mappings.set(protocolRelativeUrl, urlMapping)
      })

      console.log(`📋 Loaded ${report.mappings.length} URL mappings`)
    } catch (error) {
      console.error('❌ Error loading mappings:', error)
      process.exit(1)
    }
  }

  suggestReplacementSize(originalUrl: string, context: string): 'small' | 'medium' | 'large' {
    // Logic to suggest appropriate size based on context
    const filename = this.mappings.get(originalUrl)?.filename || ''

    // Check context clues
    if (context.includes('avatar') || context.includes('thumbnail') || context.includes('icon')) {
      return 'small'
    }

    if (context.includes('hero') || context.includes('banner') || context.includes('background')) {
      return 'large'
    }

    if (context.includes('card') || context.includes('preview') || context.includes('medium')) {
      return 'medium'
    }

    // Default to medium for most cases
    return 'medium'
  }

  async replaceInFiles(dryRun: boolean = true): Promise<void> {
    const directories = [
      './docs/uiux',
      './apps/web',
      './apps/mobile'
    ]

    const filePatterns = ['**/*.{html,htm,tsx,jsx,ts,js,md,mdx}']
    let totalReplacements = 0

    for (const directory of directories) {
      try {
        await fs.access(directory)

        for (const pattern of filePatterns) {
          const files = await glob(pattern, { cwd: directory })

          for (const file of files) {
            const filePath = path.join(directory, file)
            const fileReplacements = await this.replaceInFile(filePath, dryRun)

            if (fileReplacements > 0) {
              console.log(`📄 ${file}: ${fileReplacements} replacements`)
              totalReplacements += fileReplacements
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️  Could not access ${directory}: ${error}`)
      }
    }

    console.log(`\n📊 ${dryRun ? 'Dry Run: ' : ''}Total replacements: ${totalReplacements}`)

    if (dryRun) {
      console.log('\n💡 This was a dry run. To apply changes, run:')
      console.log('   bun run replace-image-urls --apply')
    }
  }

  async replaceInFile(filePath: string, dryRun: boolean): Promise<number> {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      let modifiedContent = content
      let replacementCount = 0

      // Sort URLs by length (longest first) to avoid partial replacements
      const urls = Array.from(this.mappings.keys()).sort((a, b) => b.length - a.length)

      for (const originalUrl of urls) {
        const mapping = this.mappings.get(originalUrl)
        if (!mapping) continue

        // Find all occurrences of the URL in the file
        const regex = new RegExp(this.escapeRegex(originalUrl), 'g')
        const matches = content.match(regex)

        if (matches && matches.length > 0) {
          // Suggest replacement size based on context
          const suggestedSize = this.suggestReplacementSize(originalUrl, content)
          const newUrl = mapping[suggestedSize]

          console.log(`   🔄 ${originalUrl} -> ${newUrl} (${suggestedSize})`)

          if (!dryRun) {
            modifiedContent = modifiedContent.replace(regex, newUrl)
          }

          replacementCount += matches.length
        }
      }

      // Apply changes if not dry run
      if (!dryRun && modifiedContent !== content) {
        await fs.writeFile(filePath, modifiedContent, 'utf-8')
      }

      return replacementCount
    } catch (error) {
      console.warn(`⚠️  Error processing ${filePath}: ${error}`)
      return 0
    }
  }

  escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  generateReplacementGuide(): void {
    console.log('\n📝 URL Replacement Guide:')
    console.log('========================\n')

    console.log('🎯 CDN URL Patterns (Cloudflare Auto-Transform):')
    console.log('   • Small  (400px, 85% WebP):  https://img.hanacare.vn/small/{filename}')
    console.log('   • Medium (800px, 90% WebP):  https://img.hanacare.vn/medium/{filename}')
    console.log('   • Large  (1200px, 95% WebP): https://img.hanacare.vn/large/{filename}')
    console.log('   • Original (no transform):  https://img.hanacare.vn/{filename}\n')

    console.log('📋 Size Usage Guidelines:')
    console.log('   • Use "small" for: avatars, thumbnails, icons (< 400px needed)')
    console.log('   • Use "medium" for: cards, previews, content images (400-800px needed)')
    console.log('   • Use "large" for: hero images, banners, backgrounds (> 800px needed)\n')

    console.log('🔄 Example Replacements:')
    Array.from(this.mappings.values()).slice(0, 3).forEach(mapping => {
      console.log(`\n   📸 ${mapping.filename}:`)
      console.log(`      OLD: ${mapping.original}`)
      console.log(`      NEW (small):  ${mapping.small}`)
      console.log(`      NEW (medium): ${mapping.medium}`)
      console.log(`      NEW (large):  ${mapping.large}`)
    })

    console.log('\n💡 Next Steps:')
    console.log('   1. Review the suggested replacements above')
    console.log('   2. Run: bun run replace-image-urls --apply to make changes')
    console.log('   3. Test your application with new URLs')
    console.log('   4. Commit the changes to your repository')
  }
}

async function main() {
  const dryRun = !process.argv.includes('--apply')

  console.log(`🔄 Image URL Replacement (${dryRun ? 'Dry Run' : 'Apply Mode'})`)
  console.log('==========================================\n')

  const replacer = new URLReplacer()

  // Load mappings from migration report
  await replacer.loadMappings()

  if (dryRun) {
    console.log('🔍 Analyzing files for URL replacements...\n')
  }

  // Perform replacements
  await replacer.replaceInFiles(dryRun)

  // Show replacement guide
  replacer.generateReplacementGuide()
}

if (import.meta.main) {
  main().catch(console.error)
}

export { URLReplacer, type URLMapping }