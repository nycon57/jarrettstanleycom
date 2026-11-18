import { siteConfig } from '@/lib/seo'
import { API_BASE, API_VERSION, apiJson, corsPreflight } from '@/lib/agent/api'

/** API index: what exists, where it is described, and how it is versioned. */

export const dynamic = 'force-dynamic'

export async function OPTIONS(): Promise<Response> {
  return corsPreflight()
}

export async function GET(): Promise<Response> {
  return apiJson({
    name: 'Jarrett Stanley content API',
    version: API_VERSION,
    description:
      'Read-only access to everything published on jarrettstanley.com: articles on AI in mortgage marketing, glossary definitions, AI tool roundups, campaign teardowns, role playbooks, and the speaking and consulting pages.',
    authentication: {
      required: false,
      schemes: [],
      note: 'Public and unauthenticated. There are no API keys, tokens, scopes, or write operations.',
    },
    versioning: {
      policy:
        'The major version is in the path. Additive, backward-compatible fields may appear within v1; a breaking change ships as /api/v2. Removal of a stable version is announced with RFC 9745 Deprecation and Sunset headers at least 90 days ahead.',
      current: API_VERSION,
      supported: [API_VERSION],
      deprecated: [],
      deprecationHeaders: ['Deprecation', 'Sunset', 'Link'],
      sunsetNoticePeriodDays: 90,
      sunset: null,
    },
    pagination: {
      styles: ['limit/offset', 'cursor'],
      parameters: ['limit', 'offset', 'cursor'],
      defaultLimit: 20,
      maxLimit: 100,
      note: 'Every list response carries absolute next/previous URLs and opaque cursors for the same positions.',
    },
    idempotency: {
      required: false,
      note: 'Every operation is a safe, idempotent GET. There is nothing to retry-protect, so the Idempotency-Key header is neither required nor honored.',
    },
    asyncJobs: {
      supported: false,
      note: 'Every response is synchronous and complete; no operation is long-running, so there are no job resources to poll.',
    },
    batch: {
      supported: true,
      note: 'Pass a comma-separated "paths" list to /content to read several pages in one request.',
      example: `${API_BASE}/content?paths=/about,/speaking`,
    },
    rateLimit: {
      policy: '600 requests per 60 seconds per client IP',
      headers: ['RateLimit', 'RateLimit-Policy'],
    },
    endpoints: [
      {
        method: 'GET',
        path: `${API_BASE}/content`,
        description: 'List published pages. Supports section filtering and limit/offset pagination.',
      },
      {
        method: 'GET',
        path: `${API_BASE}/content/{path}`,
        description: 'Fetch one page, including its full Markdown body.',
      },
      {
        method: 'GET',
        path: `${API_BASE}/search`,
        description: 'Ranked full-text search across all published pages.',
      },
    ],
    otherInterfaces: {
      mcp: `${siteConfig.url}/mcp`,
      a2a: `${siteConfig.url}/a2a`,
      nlweb: `${siteConfig.url}/ask`,
      markdown: 'Send Accept: text/markdown to any page URL, or append .md',
    },
    documentation: `${siteConfig.url}/developers`,
    openapi: `${siteConfig.url}/openapi.json`,
  })
}
