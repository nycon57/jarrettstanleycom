import type { PortableTextBlock, Image } from 'sanity'

export interface SanityAuthor {
  _id: string
  name: string
  slug: { current: string }
  image?: Image
  bio?: string
  title?: string
  company?: string
  linkedIn?: string
  twitter?: string
}

export interface SanityCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  color?: string
}

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content?: PortableTextBlock[]
  featuredImage?: Image & { alt?: string }
  publishedAt: string
  readTimeMinutes?: number
  isFeatured?: boolean
  metaTitle?: string
  metaDescription?: string
  author?: SanityAuthor
  categories?: SanityCategory[]
}

// Transformed types that match the existing UI components
export interface TransformedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: PortableTextBlock[]
  featured_image_url?: string
  published_at: string
  read_time_minutes: number
  is_featured: boolean
  meta_title?: string
  meta_description?: string
  author_name: string
  author_image_url?: string
  categories: TransformedCategory[]
  view_count?: number
}

export interface TransformedCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at?: string
  updated_at?: string
}

export interface TransformedAuthor {
  id: string
  name: string
  slug: string
  image_url?: string
  bio?: string
  title?: string
  company?: string
  linkedin?: string
  twitter?: string
}
