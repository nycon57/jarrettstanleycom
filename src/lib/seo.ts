import { Metadata } from 'next';

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
  'mortgage technology speaker'],

  author: {
    name: 'Jarrett Stanley',
    url: 'https://jarrettstanley.com',
    email: 'hello@jarrettstanley.com',
    twitter: '@jarrettstanley',
    linkedin: 'https://linkedin.com/in/jarrettstanley'
  },
  organization: {
    name: 'Jarrett Stanley Strategic Advising',
    url: 'https://jarrettstanley.com',
    address: {
      locality: 'Virginia Beach',
      region: 'VA',
      country: 'US'
    }
  }
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
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
  const pageTitle = title ?
  `${title} | ${siteConfig.name}` :
  `${siteConfig.name} - ${siteConfig.title}`;

  const pageUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: allKeywords,
    authors: authors?.map((name) => ({ name })) || [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),
    robots: {
      index: !noindex,
      follow: !nofollow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },
    alternates: {
      canonical: pageUrl,
      // Markdown representation of this page, for agents that would rather not
      // parse HTML. Also served from the canonical URL via Accept negotiation.
      types: {
        'text/markdown': canonical === '/' || !canonical ? `${siteConfig.url}/index.md` : `${pageUrl}.md`,
        'application/rss+xml': `${siteConfig.url}/feed.xml`
      }
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
        alt: title || siteConfig.title
      }]

    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
      creator: siteConfig.author.twitter
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION
    }
  };

  // Add article-specific metadata
  if (ogType === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph!,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      section,
      tags
    };
  }

  return metadata;
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
    `https://x.com/${siteConfig.author.twitter.replace('@', '')}`],

    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.organization.address.locality,
      addressRegion: siteConfig.organization.address.region,
      addressCountry: siteConfig.organization.address.country
    },
    jobTitle: 'Chief Marketing Officer',
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url
    },
    knowsAbout: [
    'AI Marketing',
    'Mortgage Marketing',
    'Digital Transformation',
    'Marketing Technology',
    'Artificial Intelligence',
    'Lead Generation',
    'Marketing Automation'],

    description: siteConfig.description,
    image: `${siteConfig.url}/assets/images/jarrett-stanley-headshot.jpg`
  };
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
      name: siteConfig.author.name
    },
    sameAs: [
    siteConfig.author.linkedin,
    `https://x.com/${siteConfig.author.twitter.replace('@', '')}`],

    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.organization.address.locality,
      addressRegion: siteConfig.organization.address.region,
      addressCountry: siteConfig.organization.address.country
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    contactPoint: [
    {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'customer service',
      url: `${siteConfig.url}/contact`,
      availableLanguage: 'English'
    },
    {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'booking',
      url: `${siteConfig.url}/speaking`,
      availableLanguage: 'English'
    },
    {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'media relations',
      url: `${siteConfig.url}/contact`,
      availableLanguage: 'English'
    }]

  };
}

/**
 * ProfilePage schema for the homepage: this site is one person's public record.
 * `speakable` marks the passages a voice agent should read aloud.
 */
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}#profilepage`,
    url: siteConfig.url,
    name: `${siteConfig.name} — ${siteConfig.title}`,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${siteConfig.url}#website` },
    mainEntity: { '@id': `${siteConfig.url}#person` },
    about: { '@id': `${siteConfig.url}#person` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'main p']
    }
  };
}

/** The three ways to work with Jarrett, as schema.org Services. */
export function generateServiceSchemas() {
  const provider = { '@id': `${siteConfig.url}#person` };
  const areaServed = { '@type': 'Country', name: 'United States' };

  return [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/speaking#service`,
    name: 'Keynote speaking on AI in mortgage marketing',
    serviceType: 'Keynote speaking',
    url: `${siteConfig.url}/speaking`,
    description:
    'Keynotes, workshops, panels, and webinars on AI in mortgage marketing, digital transformation, and building modern marketing teams.',
    provider,
    areaServed,
    audience: {
      '@type': 'BusinessAudience',
      name: 'Mortgage lenders, industry conferences, and marketing organizations'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/services/consulting#service`,
    name: 'AI marketing consulting for mortgage lenders',
    serviceType: 'Marketing consulting',
    url: `${siteConfig.url}/services/consulting`,
    description:
    'Project-based, retainer, and strategic advisory engagements covering AI implementation strategy, marketing transformation, martech stack design, and team enablement.',
    provider,
    areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Consulting engagement models',
      itemListElement: [
      { '@type': 'Offer', name: 'Project-based engagement (3–6 months)' },
      { '@type': 'Offer', name: 'Retainer (ongoing advisory)' },
      { '@type': 'Offer', name: 'Strategic advisory (12+ months)' }]

    }
  }];

}

/**
 * Past speaking engagements as schema.org Events. Only engagements already
 * listed on /speaking — nothing here is speculative or upcoming.
 */
export function generateSpeakingEventSchemas() {
  const performer = { '@id': `${siteConfig.url}#person` };

  const engagements = [
  {
    name: 'NAMMBA Connect 2025 — Mortgage Marketing Executive Summit',
    startDate: '2025-08-20',
    organizer: 'National Association of Minority Mortgage Bankers of America',
    location: 'JW Marriott Bonnet Creek Resort, Orlando, FL',
    description:
    'Featured speaker: "Automate to Elevate: AI, No-Code, and Workflow Hacks that 5× Your Marketing Output."'
  },
  {
    name: 'NAIFA Tidewater Chapter Quarterly Meeting',
    startDate: '2024',
    organizer: 'National Association of Insurance and Financial Advisors',
    location: 'Tidewater, VA',
    description: 'Chapter speaker: "AI Revolution in Business & Marketing."'
  },
  {
    name: 'Nationwide Mortgage Bankers Sales Summit',
    startDate: '2024',
    organizer: 'Nationwide Mortgage Bankers',
    location: 'Company-wide',
    description: 'Keynote: "AI-Powered Sales & Marketing Excellence."'
  },
  {
    name: 'Southern Trust Mortgage Sales Summit',
    startDate: '2023',
    organizer: 'Southern Trust Mortgage',
    location: 'Regional',
    description: 'Guest expert: "Building High-Performance Marketing Teams."'
  },
  {
    name: 'Total Expert Accelerate Conference',
    startDate: '2019',
    organizer: 'Total Expert',
    location: 'National Conference',
    description: 'Marketing expert panelist: "Marketing Strategy for the Industry and Teams."'
  }];


  return engagements.map((engagement) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: engagement.name,
    startDate: engagement.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: engagement.description,
    url: `${siteConfig.url}/speaking`,
    performer,
    organizer: { '@type': 'Organization', name: engagement.organizer },
    location: { '@type': 'Place', name: engagement.location },
    about: { '@id': `${siteConfig.url}/speaking#service` }
  }));
}

/** The posts rendered in the homepage "Latest Insights" section, as an ItemList. */
export function generateLatestInsightsSchema(
posts: Array<{title: string;slug: string;excerpt: string;publishedAt: string;}>)
{
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}#latest-insights`,
    name: 'Latest insights on AI in mortgage marketing',
    numberOfItems: posts.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        url: `${siteConfig.url}/insights/blog/${post.slug}`,
        author: { '@id': `${siteConfig.url}#person` },
        publisher: { '@id': `${siteConfig.url}#organization` }
      }
    }))
  };
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
    inLanguage: 'en-US'
  };
}

// Generate structured data for articles/blog posts
function generateArticleSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  authors = [siteConfig.author.name],
  url,
  image,
  keywords = []









}: {title: string;description: string;publishedTime: string;modifiedTime?: string;authors?: string[];url: string;image?: string;keywords?: string[];}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image || siteConfig.ogImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: authors.map((name) => ({
      '@type': 'Person',
      name
    })),
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/assets/images/TrueToneAI-Icon-Logo-Full-Color.png`
      }
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: keywords.join(', ')
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(items: Array<{name: string;url: string;}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Generate FAQ structured data
export function generateFAQSchema(faqs: Array<{question: string;answer: string;}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Helper to inject structured data
export function generateStructuredData(schemas: object[]) {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}

// Generate canonical URL
function generateCanonicalUrl(path: string = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}

// Generate breadcrumb items for navigation
function generateBreadcrumbs(path: string): Array<{name: string;url: string;}> {
  const paths = path.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', url: '/' }];

  let currentPath = '';
  paths.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.
    split('-').
    map((word) => word.charAt(0).toUpperCase() + word.slice(1)).
    join(' ');

    breadcrumbs.push({
      name,
      url: currentPath
    });
  });

  return breadcrumbs;
}

// SEO-friendly URL slug generator
function generateSlug(title: string): string {
  return title.
  toLowerCase().
  replace(/[^\w\s-]/g, '') // Remove special characters
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/-+/g, '-') // Replace multiple hyphens with single
  .trim();
}

// Generate page-specific keywords
function generatePageKeywords(baseKeywords: string[], pageSpecific: string[] = []): string[] {
  return [...Array.from(new Set([...siteConfig.keywords, ...baseKeywords, ...pageSpecific]))];
}

// --- pSEO Schema Generators ---

// Generate DefinedTerm structured data for glossary terms
export function generateDefinedTermSchema({
  term,
  definition,
  url,
  category





}: {term: string;definition: string;url: string;category?: string;}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'AI Mortgage Marketing Glossary',
      url: `${siteConfig.url}/insights/glossary`
    },
    ...(category && {
      termCode: category
    })
  };
}

// Generate ItemList structured data for tool roundups
export function generateItemListSchema({
  name,
  description,
  url,
  items





}: {name: string;description: string;url: string;items: Array<{name: string;position: number;url?: string;}>;}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      ...(item.url && { url: item.url })
    }))
  };
}

// Generate CollectionPage structured data for example/index pages
export function generateCollectionPageSchema({
  name,
  description,
  url




}: {name: string;description: string;url: string;}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}#website`
    },
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url
    }
  };
}
