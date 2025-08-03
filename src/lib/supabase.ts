import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role for server-side operations to bypass RLS
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types for our waitlist table
export interface WaitlistSignup {
  id?: string
  email: string
  first_name: string
  last_name?: string
  company?: string
  marketing_consent: boolean
  ip_address?: string
  user_agent?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  created_at?: string
  updated_at?: string
}

// Types for testimonials table
export interface Testimonial {
  id: string
  author_name: string
  author_title: string
  company: string
  content: string
  rating: number
  service_type: 'speaking' | 'consulting' | 'general'
  event_name?: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

// Types for speaking events table
export interface SpeakingEvent {
  id: string
  event_name: string
  event_date: string
  location: string
  venue?: string
  topic: string
  event_type: 'keynote' | 'panel' | 'workshop' | 'webinar'
  registration_url?: string
  description?: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

// Types for blog CMS
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url?: string
  meta_title?: string
  meta_description?: string
  author_name: string
  author_image_url?: string
  read_time_minutes: number
  is_featured: boolean
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
  categories?: Category[]
  view_count?: number
}

export interface PostView {
  id: string
  post_id: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  viewed_at: string
}

export interface Resource {
  id: string
  title: string
  slug: string
  description: string
  resource_type: 'whitepaper' | 'ebook' | 'template' | 'guide' | 'checklist' | 'video' | 'podcast'
  file_url: string
  file_size_mb?: number
  thumbnail_url?: string
  preview_url?: string
  requires_email: boolean
  download_count: number
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  categories?: Category[]
}

export interface ResourceDownload {
  id: string
  resource_id: string
  email: string
  first_name?: string
  last_name?: string
  company?: string
  ip_address?: string
  user_agent?: string
  downloaded_at: string
} 