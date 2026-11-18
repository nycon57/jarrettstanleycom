import { siteConfig } from '@/lib/seo'

/**
 * OpenAPI 3.1 description of the public content API. Linked from
 * /.well-known/api-catalog, /developers, /llms.txt, and the API's own
 * `Link: rel="service-desc"` header.
 */

export const dynamic = 'force-static'

const SECTIONS = ['all', 'site', 'blog', 'glossary', 'tools', 'examples', 'solutions']

const problemSchema = {
  type: 'object',
  description: 'RFC 9457 problem details. Every error from this API uses this shape.',
  required: ['type', 'title', 'status', 'detail'],
  properties: {
    type: { type: 'string', format: 'uri', description: 'Link to the documentation for this error.' },
    title: { type: 'string', description: 'Short, human-readable summary of the problem type.' },
    status: { type: 'integer', description: 'HTTP status code.' },
    detail: { type: 'string', description: 'Explanation specific to this occurrence.' },
    instance: { type: 'string', format: 'uri', description: 'The request URI that produced the problem.' },
    code: { type: 'string', description: 'Stable machine-readable error code.' },
    documentation: { type: 'string', format: 'uri' },
  },
} as const

const paginationSchema = {
  type: 'object',
  required: ['limit', 'offset', 'total', 'count'],
  properties: {
    limit: { type: 'integer', minimum: 1, maximum: 100 },
    offset: { type: 'integer', minimum: 0 },
    total: { type: 'integer', minimum: 0, description: 'Total items matching the request.' },
    count: { type: 'integer', minimum: 0, description: 'Items in this response.' },
    next: { type: ['string', 'null'], format: 'uri', description: 'URL of the next page, or null.' },
    previous: { type: ['string', 'null'], format: 'uri', description: 'URL of the previous page, or null.' },
    cursor: { type: 'string', description: 'Opaque cursor for this position.' },
    nextCursor: { type: ['string', 'null'], description: 'Opaque cursor for the next page, or null.' },
    previousCursor: { type: ['string', 'null'], description: 'Opaque cursor for the previous page, or null.' },
  },
} as const

const contentSummarySchema = {
  type: 'object',
  required: ['path', 'url', 'title', 'section'],
  properties: {
    path: { type: 'string', example: '/insights/glossary/ai-lead-scoring' },
    url: { type: 'string', format: 'uri' },
    markdownUrl: { type: 'string', format: 'uri', description: 'Same page as Markdown.' },
    title: { type: 'string' },
    summary: { type: 'string' },
    section: { type: 'string', enum: SECTIONS.filter((section) => section !== 'all') },
  },
} as const

const problemResponse = (description: string) => ({
  description,
  content: { 'application/problem+json': { schema: { $ref: '#/components/schemas/Problem' } } },
})

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'Jarrett Stanley content API',
    version: '1.0.0',
    summary: 'Read-only access to everything published on jarrettstanley.com.',
    description:
      'Search, list, and read the published content of jarrettstanley.com — articles on AI in mortgage marketing, glossary definitions, AI tool roundups, campaign teardowns, role playbooks, and the speaking and consulting pages.\n\nPublic and unauthenticated: no API keys, no OAuth, no scopes, and no write operations. Errors use RFC 9457 problem details. Rate limits are advertised with the RateLimit and RateLimit-Policy headers.\n\nThe same content is available over MCP at /mcp, over A2A at /a2a, as NLWeb answers at /ask, and as Markdown from any page URL with `Accept: text/markdown`.',
    contact: { name: 'Jarrett Stanley', email: siteConfig.author.email, url: `${siteConfig.url}/contact` },
    license: { name: 'Content available for citation with attribution', url: `${siteConfig.url}/terms` },
    termsOfService: `${siteConfig.url}/terms`,
  },
  servers: [{ url: `${siteConfig.url}/api/v1`, description: 'Production' }],
  'x-api-lifecycle': {
    versioning: 'URL path major version. Additive changes within v1; breaking changes ship as /api/v2.',
    deprecationPolicy:
      'A deprecated version is announced with RFC 9745 Deprecation and Sunset response headers, plus a Link header to the migration guide, at least 90 days before removal.',
    deprecationHeaders: ['Deprecation', 'Sunset', 'Link'],
    sunsetNoticePeriodDays: 90,
    currentVersion: 'v1',
    deprecatedVersions: [],
    sunset: null,
  },
  'x-idempotency': {
    required: false,
    header: null,
    rationale: 'Every operation is a safe, idempotent GET; there is nothing to retry-protect.',
  },
  'x-async-jobs': {
    supported: false,
    rationale: 'Every response is synchronous and complete; no operation is long-running.',
  },
  'x-rate-limit': {
    policy: '600 requests per 60 seconds per client IP',
    headers: ['RateLimit', 'RateLimit-Policy'],
  },
  externalDocs: { description: 'Developer documentation', url: `${siteConfig.url}/developers` },
  security: [],
  tags: [
    { name: 'content', description: 'List and read published pages.' },
    { name: 'search', description: 'Full-text search across published pages.' },
    { name: 'meta', description: 'API index, versioning, and capabilities.' },
  ],
  paths: {
    '/': {
      get: {
        operationId: 'getApiIndex',
        tags: ['meta'],
        summary: 'API index',
        description: 'Endpoints, versioning policy, rate limits, and the other agent interfaces this site exposes.',
        responses: {
          '200': {
            description: 'API index.',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
        },
      },
    },
    '/content': {
      get: {
        operationId: 'listContent',
        tags: ['content'],
        summary: 'List published pages',
        description: 'Every published page, optionally filtered to one section, with limit/offset pagination.',
        parameters: [
          {
            name: 'section',
            in: 'query',
            required: false,
            description: 'Restrict to one section. "site" covers the marketing and legal pages.',
            schema: { type: 'string', enum: SECTIONS, default: 'all' },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          },
          { name: 'offset', in: 'query', required: false, schema: { type: 'integer', minimum: 0, default: 0 } },
          {
            name: 'cursor',
            in: 'query',
            required: false,
            description: 'Opaque cursor from a previous response, used instead of offset.',
            schema: { type: 'string' },
          },
          {
            name: 'paths',
            in: 'query',
            required: false,
            description:
              'Batch read: comma-separated list of 1–25 site paths. Returns their Markdown bodies and a per-path errors array instead of a paginated list.',
            schema: { type: 'string' },
            example: '/about,/speaking',
          },
        ],
        responses: {
          '200': {
            description: 'A page of results.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['data', 'pagination'],
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/ContentSummary' } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
          '400': problemResponse('Invalid section, limit, offset, cursor, or paths.'),
          '405': problemResponse('This API is read-only; use GET.'),
        },
      },
    },
    '/content/{path}': {
      get: {
        operationId: 'getContent',
        tags: ['content'],
        summary: 'Read one page',
        description: 'The full Markdown body of a single published page.',
        parameters: [
          {
            name: 'path',
            in: 'path',
            required: true,
            description: 'Site path without the leading slash, for example "insights/glossary/ai-lead-scoring".',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'The page.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['data'],
                  properties: { data: { $ref: '#/components/schemas/ContentDetail' } },
                },
              },
            },
          },
          '404': problemResponse('No published page at that path.'),
          '405': problemResponse('This API is read-only; use GET.'),
        },
      },
    },
    '/batch': {
      get: {
        operationId: 'batchGetContent',
        tags: ['content'],
        summary: 'Batch read pages',
        description: 'Read up to 25 pages in one request, addressed by a comma-separated list of site paths.',
        parameters: [
          {
            name: 'paths',
            in: 'query',
            required: true,
            description: 'Comma-separated list of 1–25 site paths.',
            schema: { type: 'string' },
            example: '/about,/speaking',
          },
        ],
        responses: {
          '200': {
            description: 'The requested pages, plus a per-path errors array for any that do not exist.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['data', 'errors'],
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/ContentDetail' } },
                    errors: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          path: { type: 'string' },
                          code: { type: 'string' },
                          detail: { type: 'string' },
                        },
                      },
                    },
                    requested: { type: 'integer' },
                  },
                },
              },
            },
          },
          '400': problemResponse('Empty batch, or more than 25 paths.'),
        },
      },
      post: {
        operationId: 'batchGetContentByBody',
        tags: ['content'],
        summary: 'Batch read pages (JSON body)',
        description: 'Same as the GET form, with the path list in a JSON body. Safe and idempotent despite the method.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['paths'],
                properties: {
                  paths: { type: 'array', maxItems: 25, items: { type: 'string' } },
                },
              },
              example: { paths: ['/about', '/speaking'] },
            },
          },
        },
        responses: {
          '200': { description: 'The requested pages.', content: { 'application/json': { schema: { type: 'object' } } } },
          '400': problemResponse('Invalid JSON body or batch size.'),
        },
      },
    },
    '/search': {
      get: {
        operationId: 'searchContent',
        tags: ['search'],
        summary: 'Search published pages',
        description: 'Ranked full-text search with snippets and canonical URLs.',
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: true,
            description: 'Search terms, at least two characters.',
            schema: { type: 'string', minLength: 2 },
            example: 'ai lead scoring',
          },
          {
            name: 'section',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: SECTIONS, default: 'all' },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          },
          { name: 'offset', in: 'query', required: false, schema: { type: 'integer', minimum: 0, default: 0 } },
        ],
        responses: {
          '200': {
            description: 'Ranked matches.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['query', 'data', 'pagination'],
                  properties: {
                    query: { type: 'string' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/SearchHit' } },
                    pagination: { $ref: '#/components/schemas/Pagination' },
                  },
                },
              },
            },
          },
          '400': problemResponse('Missing or invalid query, section, limit, offset, or cursor.'),
          '405': problemResponse('This API is read-only; use GET.'),
        },
      },
    },
  },
  components: {
    securitySchemes: {},
    schemas: {
      Problem: problemSchema,
      Pagination: paginationSchema,
      ContentSummary: contentSummarySchema,
      ContentDetail: {
        type: 'object',
        required: ['path', 'url', 'markdown'],
        properties: {
          path: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          markdownUrl: { type: 'string', format: 'uri' },
          markdown: { type: 'string', description: 'Full Markdown body of the page.' },
        },
      },
      SearchHit: {
        type: 'object',
        required: ['path', 'url', 'title', 'snippet', 'score'],
        properties: {
          path: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          markdownUrl: { type: 'string', format: 'uri' },
          title: { type: 'string' },
          section: { type: 'string' },
          snippet: { type: 'string' },
          score: { type: 'number', description: 'Relevance score; higher is better.' },
        },
      },
    },
  },
}

export function GET(): Response {
  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      'Content-Type': 'application/vnd.oai.openapi+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
