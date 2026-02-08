'use server'

import { client, urlFor } from '@/lib/sanity'
import {
  filteredPostsQuery,
  postBySlugQuery,
  relatedPostsQuery,
  recentPostsQuery,
  categoriesQuery,
} from '@/lib/sanity/queries'
import type { SanityPost, SanityCategory, TransformedPost, TransformedCategory } from '@/lib/sanity/types'

// Helper to transform Sanity post to the format expected by UI components
function transformPost(post: SanityPost): TransformedPost {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt,
    content: post.content,
    featured_image_url: post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined,
    published_at: post.publishedAt,
    read_time_minutes: post.readTimeMinutes || 5,
    is_featured: post.isFeatured || false,
    meta_title: post.metaTitle,
    meta_description: post.metaDescription,
    author_name: post.author?.name || 'Jarrett Stanley',
    author_image_url: post.author?.image
      ? urlFor(post.author.image).width(100).height(100).url()
      : undefined,
    categories: post.categories?.map(cat => ({
      id: cat._id,
      name: cat.name,
      slug: cat.slug.current,
      description: cat.description,
      color: cat.color || '#6B46C1',
    })) || [],
  }
}

// Helper to transform Sanity category
function transformCategory(category: SanityCategory): TransformedCategory {
  return {
    id: category._id,
    name: category.name,
    slug: category.slug.current,
    description: category.description,
    color: category.color || '#6B46C1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

// Blog post actions
export async function getBlogPosts(options: {
  page?: number
  limit?: number
  categoryIds?: string[]
  search?: string
  featured?: boolean
}): Promise<{ posts: TransformedPost[], totalCount: number, totalPages: number }> {
  const { page = 1, limit = 9 } = options

  // Debug: Log environment variables (redacted for security)
  console.log('=== getBlogPosts SERVER ACTION CALLED ===')
  console.log('Options received:', JSON.stringify(options))
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET')
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

  try {
    if (!client) return { posts: [], totalCount: 0, totalPages: 0 }

    // Simple direct query to debug
    const posts = await client.fetch<SanityPost[]>(
      `*[_type == "post"] | order(publishedAt desc) [0...${limit}] {
        _id,
        title,
        slug,
        excerpt,
        featuredImage,
        publishedAt,
        readTimeMinutes,
        isFeatured,
        "author": author->{
          _id,
          name,
          image,
          title,
          company
        },
        "categories": categories[]->{
          _id,
          name,
          slug,
          color
        }
      }`
    )

    const totalCount = await client.fetch<number>(`count(*[_type == "post"])`)

    console.log('Sanity fetch result:', { postsCount: posts?.length, totalCount, firstPost: posts?.[0]?.title })

    if (!posts) {
      console.log('No posts returned from Sanity')
      return { posts: [], totalCount: 0, totalPages: 0 }
    }

    console.log('Transforming posts...')
    const transformedPosts = posts.map((post, i) => {
      console.log(`Transforming post ${i}:`, post.title)
      return transformPost(post)
    })
    const totalPages = Math.ceil(totalCount / limit)

    console.log('Returning result:', { postsCount: transformedPosts.length, totalCount, totalPages })
    return {
      posts: transformedPosts,
      totalCount,
      totalPages,
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return { posts: [], totalCount: 0, totalPages: 0 }
  }
}

export async function getBlogPostBySlug(slug: string): Promise<TransformedPost | null> {
  try {
    if (!client) return null
    const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug })

    if (!post) {
      return null
    }

    return transformPost(post)
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}

export async function getRelatedPosts(postId: string, categories: string[], limit: number = 3): Promise<TransformedPost[]> {
  try {
    if (!client) return []

    // First try to get posts with matching categories
    if (categories && categories.length > 0) {
      const categoryPosts = await client.fetch<SanityPost[]>(
        relatedPostsQuery,
        {
          currentPostId: postId,
          categoryIds: categories,
          limit,
        }
      )

      if (categoryPosts && categoryPosts.length > 0) {
        return categoryPosts.map(transformPost)
      }
    }

    // Fallback to recent posts
    const recentPosts = await client.fetch<SanityPost[]>(
      recentPostsQuery,
      {
        currentPostId: postId,
        limit,
      }
    )

    return recentPosts.map(transformPost)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// Placeholder for view tracking (Sanity doesn't have this built-in)
// You could implement this with a separate analytics service or Supabase
export async function trackPostView(postId: string): Promise<void> {
  // View tracking would need to be implemented with an external service
  // For now, this is a no-op
  console.log('View tracked for post:', postId)
}

// Category actions
export async function getCategories(): Promise<TransformedCategory[]> {
  try {
    if (!client) return []
    const categories = await client.fetch<SanityCategory[]>(categoriesQuery)
    return categories.map(transformCategory)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// ===== RESOURCE ACTIONS (keeping Supabase for resources) =====
// Resources will continue using Supabase until migrated to Sanity

import { supabase, Resource, ResourceDownload } from '@/lib/supabase'
import { headers } from 'next/headers'

// Resource actions
export async function getResources(options: {
  page?: number
  limit?: number
  categoryIds?: string[]
  resourceType?: string
  featured?: boolean
}): Promise<{ resources: Resource[], totalCount: number, totalPages: number }> {
  const { page = 1, limit = 12, categoryIds = [], resourceType, featured } = options
  const offset = (page - 1) * limit

  let query = supabase
    .from('resources')
    .select(`*`)
    .or('is_active.eq.true,is_published.eq.true')
    .order('created_at', { ascending: false })

  // Apply featured filter
  if (featured !== undefined) {
    query = query.eq('is_featured', featured)
  }

  // Apply resource type filter
  if (resourceType) {
    query = query.eq('type', resourceType)
  }

  // Apply category filter
  if (categoryIds.length > 0) {
    query = query.in('category', categoryIds)
  }

  // Get total count
  const { count } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .or('is_active.eq.true,is_published.eq.true')

  // Get paginated results
  const { data: resources, error } = await query
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching resources:', error)
    return { resources: [], totalCount: 0, totalPages: 0 }
  }

  // Transform data to match the expected interface
  const transformedResources: Resource[] = resources?.map(resource => ({
    ...resource,
    is_published: resource.is_active || resource.is_published,
    resource_type: resource.type,
    file_size_mb: resource.file_size ? resource.file_size / 1024 / 1024 : undefined,
    categories: resource.category ? [{
      id: resource.category,
      name: resource.category,
      slug: resource.category.toLowerCase().replace(/\s+/g, '-'),
      color: '#6B46C1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }] : []
  })) || []

  const totalCount = count || 0
  const totalPages = Math.ceil(totalCount / limit)

  return { resources: transformedResources, totalCount, totalPages }
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const { data: resource, error } = await supabase
    .from('resources')
    .select(`*`)
    .eq('slug', slug)
    .or('is_active.eq.true,is_published.eq.true')
    .single()

  if (error || !resource) {
    return null
  }

  return {
    ...resource,
    is_published: resource.is_active || resource.is_published,
    resource_type: resource.type,
    file_size_mb: resource.file_size ? resource.file_size / 1024 / 1024 : undefined,
    categories: resource.category ? [{
      id: resource.category,
      name: resource.category,
      slug: resource.category.toLowerCase().replace(/\s+/g, '-'),
      color: '#6B46C1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }] : []
  }
}

export async function trackResourceDownload(
  resourceId: string,
  email: string,
  firstName?: string,
  lastName?: string,
  company?: string
): Promise<void> {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'

  try {
    // Insert download record
    await supabase
      .from('resource_downloads')
      .insert({
        resource_id: resourceId,
        email,
        first_name: firstName,
        last_name: lastName,
        company,
        ip_address: ip,
        user_agent: userAgent
      })

    // Increment download count
    const { data: resource } = await supabase
      .from('resources')
      .select('download_count')
      .eq('id', resourceId)
      .single()

    if (resource) {
      await supabase
        .from('resources')
        .update({ download_count: (resource.download_count || 0) + 1 })
        .eq('id', resourceId)
    }
  } catch (error) {
    console.error('Error tracking resource download:', error)
  }
}

// Search action
export async function searchContent(query: string, type: 'posts' | 'resources' | 'all' = 'all') {
  const results: { posts: TransformedPost[], resources: Resource[] } = {
    posts: [],
    resources: []
  }

  if (type === 'posts' || type === 'all') {
    const { posts } = await getBlogPosts({ search: query, limit: 10 })
    results.posts = posts
  }

  if (type === 'resources' || type === 'all') {
    const { data: resources } = await supabase
      .from('resources')
      .select(`*`)
      .or('is_active.eq.true,is_published.eq.true')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(10)

    results.resources = resources?.map(resource => ({
      ...resource,
      is_published: resource.is_active || resource.is_published,
      resource_type: resource.type,
      file_size_mb: resource.file_size ? resource.file_size / 1024 / 1024 : undefined,
      categories: resource.category ? [{
        id: resource.category,
        name: resource.category,
        slug: resource.category.toLowerCase().replace(/\s+/g, '-'),
        color: '#6B46C1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }] : []
    })) || []
  }

  return results
}
