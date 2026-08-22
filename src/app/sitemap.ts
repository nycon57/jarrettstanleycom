import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'
import {
  getAllGlossaryTerms,
  getAllPersonas,
  getAllToolRoundups,
  getAllCampaignExamples,
} from '@/lib/pseo'
import { getAllBlogPosts } from '@/lib/blog'

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
  {
    url: '/developers',
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  },
  {
    url: '/privacy',
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
  {
    url: '/terms',
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
]

// pSEO index pages
const pseoIndexRoutes = [
  {
    url: '/insights/glossary',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: '/insights/tools',
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    url: '/insights/examples',
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    url: '/solutions',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
]

// Blog posts are now loaded from local JSON data

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

  // pSEO index pages
  const pseoIndexSitemap: MetadataRoute.Sitemap = pseoIndexRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Get blog posts from JSON data
  const blogPosts = await getAllBlogPosts()
  const blogSitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // pSEO detail pages
  const [glossaryTerms, personas, toolRoundups, campaignExamples] = await Promise.all([
    getAllGlossaryTerms(),
    getAllPersonas(),
    getAllToolRoundups(),
    getAllCampaignExamples(),
  ])

  const glossarySitemap: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${baseUrl}/insights/glossary/${term.slug}`,
    lastModified: new Date(term.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const personaSitemap: MetadataRoute.Sitemap = personas.map((persona) => ({
    url: `${baseUrl}/solutions/${persona.slug}`,
    lastModified: new Date(persona.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const toolsSitemap: MetadataRoute.Sitemap = toolRoundups.map((roundup) => ({
    url: `${baseUrl}/insights/tools/${roundup.slug}`,
    lastModified: new Date(roundup.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const examplesSitemap: MetadataRoute.Sitemap = campaignExamples.map((example) => ({
    url: `${baseUrl}/insights/examples/${example.slug}`,
    lastModified: new Date(example.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticSitemap,
    ...pseoIndexSitemap,
    ...blogSitemap,
    ...glossarySitemap,
    ...personaSitemap,
    ...toolsSitemap,
    ...examplesSitemap,
  ]
}
