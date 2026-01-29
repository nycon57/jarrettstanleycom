/**
 * Test script for Sanity connection
 * Run with: npx tsx scripts/test-sanity.ts
 */

import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

console.log('=== Sanity Connection Test ===')
console.log('Project ID:', projectId)
console.log('Dataset:', dataset)
console.log('API Version:', apiVersion)
console.log('Token:', token ? 'SET' : 'NOT SET')
console.log('')

if (!projectId) {
  console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set!')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

async function testConnection() {
  try {
    console.log('Testing query: *[_type == "post"]')
    const posts = await client.fetch(`*[_type == "post"] { _id, title, slug }`)

    console.log('\nResults:')
    console.log('Number of posts:', posts?.length || 0)

    if (posts && posts.length > 0) {
      console.log('\nPosts found:')
      posts.forEach((post: any, i: number) => {
        console.log(`  ${i + 1}. ${post.title} (slug: ${post.slug?.current})`)
      })
    } else {
      console.log('\nNo posts found.')
    }

    // Also test count
    const count = await client.fetch(`count(*[_type == "post"])`)
    console.log('\nTotal count:', count)

  } catch (error) {
    console.error('Error:', error)
  }
}

testConnection()
