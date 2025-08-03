'use server'

import { supabase, BlogPost, Category, Resource, PostView, ResourceDownload } from '@/lib/supabase'
import { headers } from 'next/headers'

// Blog post actions
export async function getBlogPosts(options: {
  page?: number
  limit?: number
  categoryIds?: string[]
  search?: string
  featured?: boolean
}): Promise<{ posts: BlogPost[], totalCount: number, totalPages: number }> {
  const { page = 1, limit = 9, categoryIds = [], search = '', featured } = options
  const offset = (page - 1) * limit

  let query = supabase
    .from('posts')
    .select(`*`)
    .or('status.eq.published,is_published.eq.true')
    .order('published_at', { ascending: false })

  // Apply featured filter
  if (featured !== undefined) {
    query = query.eq('is_featured', featured)
  }

  // Apply category filter - since categories is an array field
  if (categoryIds.length > 0) {
    // Filter posts that have any of the specified categories
    query = query.contains('categories', categoryIds)
  }

  // Apply search filter
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
  }

  // Get total count
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .or('status.eq.published,is_published.eq.true')

  // Get paginated results
  const { data: posts, error } = await query
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching blog posts:', error)
    return { posts: [], totalCount: 0, totalPages: 0 }
  }

  // Transform data to match the expected interface
  const transformedPosts: BlogPost[] = posts?.map(post => ({
    ...post,
    is_published: post.status === 'published' || post.is_published,
    featured_image_url: post.featured_image,
    // Map categories array to Category objects if needed
    categories: post.categories?.map((cat: string) => ({
      id: cat,
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
      color: '#6B46C1' // Default purple color
    })) || []
  })) || []

  // Get view counts for posts
  const postsWithViews = await Promise.all(
    transformedPosts.map(async (post) => {
      const { count: viewCount } = await supabase
        .from('post_views')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id)
      
      return {
        ...post,
        view_count: viewCount || 0
      }
    })
  )

  const totalCount = count || 0
  const totalPages = Math.ceil(totalCount / limit)

  return { posts: postsWithViews, totalCount, totalPages }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data: post, error } = await supabase
    .from('posts')
    .select(`*`)
    .eq('slug', slug)
    .or('status.eq.published,is_published.eq.true')
    .single()

  if (error || !post) {
    return null
  }

  // Get view count
  const { count: viewCount } = await supabase
    .from('post_views')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post.id)

  return {
    ...post,
    is_published: post.status === 'published' || post.is_published,
    featured_image_url: post.featured_image,
    categories: post.categories?.map((cat: string) => ({
      id: cat,
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
      color: '#6B46C1'
    })) || [],
    view_count: viewCount || 0
  }
}

export async function getRelatedPosts(postId: string, categories: string[], limit: number = 3): Promise<BlogPost[]> {
  if (!categories || categories.length === 0) {
    return []
  }

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`*`)
    .or('status.eq.published,is_published.eq.true')
    .neq('id', postId)
    .contains('categories', categories)
    .limit(limit)

  if (error) {
    return []
  }

  return posts?.map(post => ({
    ...post,
    is_published: post.status === 'published' || post.is_published,
    featured_image_url: post.featured_image,
    categories: post.categories?.map((cat: string) => ({
      id: cat,
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
      color: '#6B46C1'
    })) || []
  })) || []
}

export async function trackPostView(postId: string): Promise<void> {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'
  const referrer = headersList.get('referer') || null

  try {
    await supabase
      .from('post_views')
      .insert({
        post_id: postId,
        ip_address: ip,
        user_agent: userAgent,
        referrer: referrer
      })
  } catch (error) {
    console.error('Error tracking post view:', error)
  }
}

// Category actions - return unique categories from posts and resources
export async function getCategories(): Promise<Category[]> {
  try {
    // Get all unique categories from posts
    const { data: posts } = await supabase
      .from('posts')
      .select('categories')
      .or('status.eq.published,is_published.eq.true')

    // Get all unique categories from resources
    const { data: resources } = await supabase
      .from('resources')
      .select('category')
      .or('is_active.eq.true,is_published.eq.true')

    // Extract and deduplicate categories
    const allCategories = new Set<string>()
    
    posts?.forEach(post => {
      post.categories?.forEach((cat: string) => allCategories.add(cat))
    })
    
    resources?.forEach(resource => {
      if (resource.category) {
        allCategories.add(resource.category)
      }
    })

    // Convert to Category objects
    const categories: Category[] = Array.from(allCategories).map(cat => ({
      id: cat,
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
      color: '#6B46C1', // Default purple color
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    return categories.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

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
  const headersList = headers()
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
  const results: { posts: BlogPost[], resources: Resource[] } = {
    posts: [],
    resources: []
  }

  if (type === 'posts' || type === 'all') {
    const { data: posts } = await supabase
      .from('posts')
      .select(`*`)
      .or('status.eq.published,is_published.eq.true')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .limit(10)

    results.posts = posts?.map(post => ({
      ...post,
      is_published: post.status === 'published' || post.is_published,
      featured_image_url: post.featured_image,
      categories: post.categories?.map((cat: string) => ({
        id: cat,
        name: cat,
        slug: cat.toLowerCase().replace(/\s+/g, '-'),
        color: '#6B46C1'
      })) || []
    })) || []
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