import { siteConfig } from '@/lib/seo'
import { getContentIndex } from '@/lib/agent/mcp'

/**
 * Schema.org JSON-LD feed of every indexed page, advertised to NLWeb clients
 * through the `Schemamap:` directive in robots.txt.
 */

export const dynamic = 'force-dynamic'

const SCHEMA_TYPE_BY_SECTION: Record<string, string> = {
  blog: 'Article',
  glossary: 'DefinedTerm',
  tools: 'ItemList',
  examples: 'Article',
  solutions: 'WebPage',
  site: 'WebPage',
}

export async function GET(): Promise<Response> {
  const index = await getContentIndex()

  const feed = {
    '@context': 'https://schema.org',
    '@graph': index.map((document) => ({
      '@type': SCHEMA_TYPE_BY_SECTION[document.section] ?? 'WebPage',
      '@id': document.url,
      url: document.url,
      name: document.title,
      description: document.summary,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
      author: { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.url },
      encoding: {
        '@type': 'MediaObject',
        encodingFormat: 'text/markdown',
        contentUrl: `${document.url === siteConfig.url ? `${siteConfig.url}/index` : document.url}.md`,
      },
    })),
  }

  return new Response(JSON.stringify(feed), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
