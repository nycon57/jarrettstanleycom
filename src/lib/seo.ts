import { Metadata } from 'next'

// Site configuration
export const siteConfig = {
  name: 'Jarrett Stanley',
  title: 'Where Mortgage Marketing Meets Artificial Intelligence',
  description: 'Strategic advisor and AI marketing pioneer who has generated $500M+ in loan originations. Thought leader in AI-powered mortgage marketing, available for speaking engagements and consulting.',
  url: 'https://jarrettstanley.com',
  ogImage: '/assets/images/og-image.jpg',
  keywords: [
    'AI mortgage marketing',
    'mortgage marketing consultant', 
    'AI mortgage technology',
    'mortgage marketing speaker',
    'mortgage marketing strategist',
    'Jarrett Stanley',
    'mortgage digital transformation',
    'mortgage industry AI',
    'strategic advisor',
    'mortgage marketing automation',
    'AI in lending',
    'mortgage technology speaker'
  ],
  author: {
    name: 'Jarrett Stanley',
    url: 'https://jarrettstanley.com',
    email: 'hello@jarrettstanley.com',
    twitter: '@jarrettstanley',
    linkedin: 'https://linkedin.com/in/jarrettstanley'
  },
  organization: {
    name: 'Jarrett Stanley Strategic Advising',
    url: 'https://jarrettstanley.com'
  }
}

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
  noindex?: boolean
  nofollow?: boolean
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  keywords = [],
  canonical,
  ogImage = siteConfig.ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  noindex = false,
  nofollow = false
}: SEOProps = {}): Metadata {
  const pageTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : `${siteConfig.name} - ${siteConfig.title}`
  
  const pageUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url
  const allKeywords = [...siteConfig.keywords, ...keywords]

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: allKeywords,
    authors: authors?.map(name => ({ name })) || [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    robots: {
      index: !noindex,
      follow: !nofollow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: pageUrl,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
      creator: siteConfig.author.twitter,
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  }

  // Add article-specific metadata
  if (ogType === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph!,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      section,
      tags,
    }
  }

  return metadata
}

// Generate structured data for person
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}#person`,
    name: siteConfig.author.name,
    url: siteConfig.author.url,
    email: siteConfig.author.email,
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.twitter,
    ],
    jobTitle: 'Chief Marketing Officer',
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
    },
    knowsAbout: [
      'AI Marketing',
      'Mortgage Marketing',
      'Digital Transformation',
      'Marketing Technology',
      'Artificial Intelligence',
      'Lead Generation',
      'Marketing Automation'
    ],
    description: siteConfig.description,
    image: `${siteConfig.url}/assets/images/jarrett-stanley-headshot.jpg`,
  }
}

// Generate structured data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/images/TrueToneAI-Icon-Logo-Full-Color.png`,
    description: siteConfig.description,
    founder: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.twitter,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'customer service',
      availableLanguage: 'English'
    }
  }
}

// Generate structured data for website
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}#person`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

// Generate structured data for articles/blog posts
export function generateArticleSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  authors = [siteConfig.author.name],
  url,
  image,
  keywords = []
}: {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
  url: string
  image?: string
  keywords?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image || siteConfig.ogImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: authors.map(name => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/assets/images/TrueToneAI-Icon-Logo-Full-Color.png`,
      },
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: keywords.join(', '),
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Generate FAQ structured data
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Helper to inject structured data
export function generateStructuredData(schemas: object[]) {
  return {
    __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
  }
}

// Generate canonical URL
export function generateCanonicalUrl(path: string = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${cleanPath}`
}

// Generate breadcrumb items for navigation
export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const paths = path.split('/').filter(Boolean)
  const breadcrumbs = [{ name: 'Home', url: '/' }]
  
  let currentPath = ''
  paths.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      name,
      url: currentPath,
    })
  })
  
  return breadcrumbs
}

// SEO-friendly URL slug generator
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Generate page-specific keywords
export function generatePageKeywords(baseKeywords: string[], pageSpecific: string[] = []): string[] {
  return [...Array.from(new Set([...siteConfig.keywords, ...baseKeywords, ...pageSpecific]))]
}