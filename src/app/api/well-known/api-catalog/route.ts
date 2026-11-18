import { siteConfig } from '@/lib/seo'

/**
 * RFC 9727 API catalog, served at /.well-known/api-catalog. Anchors the public
 * REST API and points at its OpenAPI description and human documentation.
 */

export const dynamic = 'force-static'

const catalog = {
  linkset: [
    {
      anchor: `${siteConfig.url}/api/v1`,
      'service-desc': [
        {
          href: `${siteConfig.url}/openapi.json`,
          type: 'application/vnd.oai.openapi+json',
          title: 'OpenAPI 3.1 description of the content API',
        },
      ],
      'service-doc': [
        {
          href: `${siteConfig.url}/developers`,
          type: 'text/html',
          title: 'Developer documentation',
        },
        {
          href: `${siteConfig.url}/auth.md`,
          type: 'text/markdown',
          title: 'Authentication (none required)',
        },
      ],
      item: [
        {
          href: `${siteConfig.url}/api/v1/content`,
          type: 'application/json',
          title: 'List published pages',
        },
        {
          href: `${siteConfig.url}/api/v1/search`,
          type: 'application/json',
          title: 'Search published pages',
        },
      ],
      status: [{ href: `${siteConfig.url}/api/v1`, type: 'application/json' }],
    },
    {
      anchor: `${siteConfig.url}/mcp`,
      'service-desc': [
        {
          href: `${siteConfig.url}/.well-known/mcp/server-card.json`,
          type: 'application/mcp-server-card+json',
          title: 'MCP server card',
        },
      ],
      'service-doc': [
        {
          href: `${siteConfig.url}/llms.txt`,
          type: 'text/plain',
          title: 'Agent index and usage guidance',
        },
      ],
      item: [
        {
          href: `${siteConfig.url}/mcp`,
          type: 'application/json',
          title: 'MCP endpoint (Streamable HTTP, JSON-RPC 2.0)',
        },
        {
          href: `${siteConfig.url}/a2a`,
          type: 'application/json',
          title: 'A2A agent endpoint (JSON-RPC message/send)',
        },
        {
          href: `${siteConfig.url}/ask`,
          type: 'application/json',
          title: 'NLWeb question endpoint',
        },
      ],
    },
  ],
}

export function GET(): Response {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type':
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
