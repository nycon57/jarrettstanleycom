// ============================================================
// Blog - TypeScript Data Schemas
// ============================================================

import type { FAQ, RelatedLink, MetaSEO } from '@/types/pseo'
export type { FAQ, RelatedLink, MetaSEO }

// --- Content Block Types ---

export interface ParagraphBlock {
  type: 'paragraph'
  text: string // Supports **bold** and *italic* inline markers
}

export interface HeadingBlock {
  type: 'heading'
  text: string
  level: 2 | 3
}

export interface ListBlock {
  type: 'list'
  style: 'bullet' | 'numbered'
  items: string[]
}

export interface CalloutBlock {
  type: 'callout'
  text: string
  variant?: 'tip' | 'warning' | 'insight'
}

export interface DividerBlock {
  type: 'divider'
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | CalloutBlock
  | DividerBlock

// --- Blog Author ---

export interface BlogAuthor {
  name: string
  title: string
  company: string
}

// --- Blog Category ---

export interface BlogCategory {
  slug: string
  name: string
  description: string
  color: string
  badgeVariant: 'lilac' | 'orchid' | 'skyward' | 'lavender'
}

// --- Blog Post ---

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: ContentBlock[]
  publishedAt: string
  readTimeMinutes: number
  isFeatured: boolean
  author: BlogAuthor
  categories: string[]
  series?: {
    name: string
    slug: string
    issueNumber: number
  }
  featuredImage?: string
  seo: MetaSEO
  relatedContent: RelatedLink[]
  faqs: FAQ[]
  lastUpdated: string
}

// --- Display Labels ---

export const blogCategoryLabels: Record<string, string> = {
  'leadership': 'Leadership & Strategy',
  'data-analytics': 'Data & Analytics',
  'operations': 'Marketing Operations',
  'ai-automation': 'AI & Automation',
}
