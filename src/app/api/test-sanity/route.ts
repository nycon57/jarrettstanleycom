import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    console.log('=== API Test - Sanity Config ===')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

    const posts = await client.fetch(`*[_type == "post"] { _id, title }`)
    const count = await client.fetch(`count(*[_type == "post"])`)

    console.log('Posts fetched:', posts?.length)

    return NextResponse.json({
      success: true,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      postsCount: posts?.length || 0,
      totalCount: count,
      posts: posts
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}
