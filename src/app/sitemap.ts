import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

// Static routes configuration
const staticRoutes = [
  {
    url: '',
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  },
  {
    url: '/about',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/speaking',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: '/services',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/services/consulting',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/contact',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: '/truetone-ai',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: '/insights',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: '/insights/blog',
    changeFrequency: 'daily' as const,
    priority: 0.8,
  },
  {
    url: '/insights/resources',
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    url: '/resources',
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
]

// Function to get blog posts (you can expand this to fetch from your CMS/database)
async function getBlogPosts() {
  // This is a placeholder - replace with actual blog post fetching logic
  // For now, return empty array since we don't have blog posts yet
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  const currentDate = new Date()

  // Generate static routes
  const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Get dynamic blog posts
  const blogPosts = await getBlogPosts()
  const blogSitemap: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
    url: `${baseUrl}/insights/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticSitemap, ...blogSitemap]
}