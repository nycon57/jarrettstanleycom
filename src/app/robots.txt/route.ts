import { siteConfig } from '@/lib/seo'

/**
 * robots.txt, hand-rolled rather than generated from metadata so it can carry
 * the non-standard directives agents look for (`Schemamap:` for NLWeb schema
 * feeds, plus pointers at the agent indexes).
 */

export const dynamic = 'force-static'

const sensitiveDisallows = ['/api/', '/admin/', '/private/', '/_next/', '/test/', '/studio']

/** The public read-only content API is documented and meant to be reachable. */
const publicApiAllows = ['/api/v1/']

/**
 * AI agents and crawlers are welcome here: this is a thought-leadership site,
 * and being read, cited, and recommended by agents is the point. Named groups
 * do not inherit the wildcard group, so each repeats the protected paths.
 */
const agentCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'ora-agent',
  'DeepSeekBot',
  'MistralAI-User',
  'Meta-ExternalAgent',
  'Amazonbot',
  'Bingbot',
  'CCBot',
]

function group(userAgent: string): string {
  return [
    `User-agent: ${userAgent}`,
    'Allow: /',
    ...publicApiAllows.map((path) => `Allow: ${path}`),
    ...sensitiveDisallows.map((path) => `Disallow: ${path}`),
  ].join('\n')
}

export function GET(): Response {
  const body = [
    '# Every page on this site also serves Markdown from its canonical URL:',
    '#   curl -H "Accept: text/markdown" https://jarrettstanley.com/about',
    '# Start here for agent guidance: /llms.txt',
    '',
    group('*'),
    '',
    ...agentCrawlers.flatMap((userAgent) => [group(userAgent), '']),
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    `Schemamap: ${siteConfig.url}/schema-feed.jsonld`,
    `Host: ${siteConfig.url}`,
  ].join('\n')

  return new Response(`${body}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
