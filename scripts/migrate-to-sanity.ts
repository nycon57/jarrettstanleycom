/**
 * Migration script: Supabase → Sanity
 *
 * Run with: npx tsx scripts/migrate-to-sanity.ts
 *
 * Prerequisites:
 * 1. Install tsx: npm install -D tsx
 * 2. Set up a Sanity API token with write access:
 *    - Go to sanity.io/manage → Your Project → API → Tokens
 *    - Create a token with "Editor" permissions
 *    - Add SANITY_API_TOKEN to your .env.local
 */

import { createClient as createSanityClient } from '@sanity/client'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

// Supabase client
const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Sanity client with write access
const sanity = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Need write token
  useCdn: false,
})

interface SupabasePost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: string
  published_at: string
  read_time_minutes?: number
  is_featured?: boolean
  is_published?: boolean
  status?: string
  meta_title?: string
  meta_description?: string
  author_name?: string
  categories?: string[]
}

// Convert markdown to Sanity's Portable Text format (basic conversion)
function markdownToPortableText(markdown: string) {
  if (!markdown) return []

  const blocks: any[] = []
  const lines = markdown.split('\n')
  let currentParagraph: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join('\n').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: generateKey(),
              text: text,
              marks: [],
            },
          ],
        })
      }
      currentParagraph = []
    }
  }

  for (const line of lines) {
    // Headers
    if (line.startsWith('### ')) {
      flushParagraph()
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: line.replace('### ', ''),
            marks: [],
          },
        ],
      })
    } else if (line.startsWith('## ')) {
      flushParagraph()
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: line.replace('## ', ''),
            marks: [],
          },
        ],
      })
    } else if (line.startsWith('# ')) {
      flushParagraph()
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2', // Map h1 to h2 for blog content
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: line.replace('# ', ''),
            marks: [],
          },
        ],
      })
    } else if (line.startsWith('> ')) {
      flushParagraph()
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: line.replace('> ', ''),
            marks: [],
          },
        ],
      })
    } else if (line.trim() === '') {
      flushParagraph()
    } else {
      currentParagraph.push(line)
    }
  }

  flushParagraph()
  return blocks
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 12)
}

async function migrateCategories(categoryNames: string[]): Promise<Map<string, string>> {
  const categoryMap = new Map<string, string>()

  for (const name of categoryNames) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')

    // Check if category already exists
    const existing = await sanity.fetch(
      `*[_type == "category" && slug.current == $slug][0]._id`,
      { slug }
    )

    if (existing) {
      categoryMap.set(name, existing)
      console.log(`  Category "${name}" already exists`)
    } else {
      // Create new category
      const result = await sanity.create({
        _type: 'category',
        name,
        slug: { current: slug },
        color: '#6B46C1',
      })
      categoryMap.set(name, result._id)
      console.log(`  Created category: ${name}`)
    }
  }

  return categoryMap
}

async function migrateAuthor(authorName: string): Promise<string> {
  const slug = authorName.toLowerCase().replace(/\s+/g, '-')

  // Check if author already exists
  const existing = await sanity.fetch(
    `*[_type == "author" && slug.current == $slug][0]._id`,
    { slug }
  )

  if (existing) {
    console.log(`  Author "${authorName}" already exists`)
    return existing
  }

  // Create new author
  const result = await sanity.create({
    _type: 'author',
    name: authorName,
    slug: { current: slug },
    title: 'CMO',
    company: 'Nationwide Mortgage Bankers',
  })

  console.log(`  Created author: ${authorName}`)
  return result._id
}

async function migratePosts() {
  console.log('🚀 Starting migration from Supabase to Sanity...\n')

  // Fetch all posts from Supabase
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts from Supabase:', error)
    return
  }

  if (!posts || posts.length === 0) {
    console.log('No posts found in Supabase.')
    return
  }

  console.log(`Found ${posts.length} posts to migrate.\n`)

  // Collect all unique categories
  const allCategories = new Set<string>()
  posts.forEach((post: SupabasePost) => {
    post.categories?.forEach(cat => allCategories.add(cat))
  })

  // Migrate categories first
  console.log('📁 Migrating categories...')
  const categoryMap = await migrateCategories(Array.from(allCategories))
  console.log('')

  // Migrate author
  console.log('👤 Migrating author...')
  const defaultAuthorName = 'Jarrett Stanley'
  const authorId = await migrateAuthor(defaultAuthorName)
  console.log('')

  // Migrate posts
  console.log('📝 Migrating posts...')
  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  for (const post of posts as SupabasePost[]) {
    try {
      // Check if post already exists
      const existing = await sanity.fetch(
        `*[_type == "post" && slug.current == $slug][0]._id`,
        { slug: post.slug }
      )

      if (existing) {
        console.log(`  ⏭️  Skipping "${post.title}" (already exists)`)
        skipCount++
        continue
      }

      // Convert markdown content to Portable Text
      const portableTextContent = markdownToPortableText(post.content)

      // Build category references
      const categoryRefs = post.categories?.map(cat => ({
        _type: 'reference',
        _ref: categoryMap.get(cat),
        _key: generateKey(),
      })) || []

      // Create the post in Sanity
      const sanityPost = {
        _type: 'post',
        title: post.title,
        slug: { current: post.slug },
        excerpt: post.excerpt,
        content: portableTextContent,
        publishedAt: post.published_at,
        readTimeMinutes: post.read_time_minutes || 5,
        isFeatured: post.is_featured || false,
        metaTitle: post.meta_title,
        metaDescription: post.meta_description,
        author: {
          _type: 'reference',
          _ref: authorId,
        },
        categories: categoryRefs,
      }

      await sanity.create(sanityPost)
      console.log(`  ✅ Migrated: "${post.title}"`)
      successCount++
    } catch (err) {
      console.error(`  ❌ Error migrating "${post.title}":`, err)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('Migration complete!')
  console.log(`  ✅ Success: ${successCount}`)
  console.log(`  ⏭️  Skipped: ${skipCount}`)
  console.log(`  ❌ Errors: ${errorCount}`)
  console.log('='.repeat(50))
}

// Run migration
migratePosts().catch(console.error)
