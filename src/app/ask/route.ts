import { siteConfig } from '@/lib/seo'
import { searchContent } from '@/lib/agent/mcp'

/**
 * NLWeb-style natural-language question endpoint.
 *
 * GET or POST a `query`, get back schema.org-shaped results drawn from this
 * site's own content. `streaming=true` returns the same results as Server-Sent
 * Events. Read-only and unauthenticated.
 *
 * https://github.com/nlweb-ai/NLWeb
 */

export const dynamic = 'force-dynamic'

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

type AskResult = {
  url: string
  name: string
  site: string
  score: number
  description: string
  schema_object: Record<string, unknown>
}

const SCHEMA_TYPE_BY_SECTION: Record<string, string> = {
  blog: 'Article',
  glossary: 'DefinedTerm',
  tools: 'ItemList',
  examples: 'Article',
  solutions: 'WebPage',
  site: 'WebPage',
}

async function buildResults(query: string, limit: number): Promise<AskResult[]> {
  const hits = await searchContent(query, { limit })

  return hits.map((hit) => ({
    url: hit.url,
    name: hit.title,
    site: 'jarrettstanley.com',
    score: Math.min(100, hit.score),
    description: hit.snippet,
    schema_object: {
      '@context': 'https://schema.org',
      '@type': SCHEMA_TYPE_BY_SECTION[hit.section] ?? 'WebPage',
      name: hit.title,
      url: hit.url,
      description: hit.snippet,
      isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
      author: { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.url },
    },
  }))
}

function queryId(query: string): string {
  let hash = 0
  for (let index = 0; index < query.length; index++) {
    hash = (hash * 31 + query.charCodeAt(index)) | 0
  }
  return `ask-${Math.abs(hash).toString(36)}`
}

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...CORS_HEADERS,
    },
  })
}

function streamResponse(query: string, results: AskResult[]): Response {
  const encoder = new TextEncoder()
  const id = queryId(query)

  const frames = [
    { message_type: 'query_analysis', query_id: id, query, site: 'jarrettstanley.com' },
    { message_type: 'result_batch', query_id: id, results },
    {
      message_type: 'summary',
      query_id: id,
      message:
        results.length > 0
          ? `${results.length} page(s) on jarrettstanley.com match "${query}". Each result links to a page that also serves Markdown from the same URL.`
          : `No pages on jarrettstanley.com match "${query}".`,
    },
    { message_type: 'complete', query_id: id },
  ]

  const stream = new ReadableStream({
    start(controller) {
      for (const frame of frames) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(frame)}\n\n`))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
      ...CORS_HEADERS,
    },
  })
}

function isTruthy(value: string | null): boolean {
  return value === 'true' || value === '1' || value === 'yes'
}

async function answer(query: string, streaming: boolean, limit: number): Promise<Response> {
  if (query.trim().length === 0) {
    return jsonResponse(
      {
        error: 'missing_query',
        detail: 'Pass a natural-language question in the "query" parameter.',
        example: `${siteConfig.url}/ask?query=how%20do%20I%20book%20Jarrett%20to%20speak`,
      },
      400,
    )
  }

  const results = await buildResults(query, limit)

  if (streaming) return streamResponse(query, results)

  return jsonResponse({
    query_id: queryId(query),
    query,
    site: 'jarrettstanley.com',
    results,
  })
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams
  const accept = request.headers.get('accept') ?? ''
  const streaming = isTruthy(params.get('streaming')) || accept.includes('text/event-stream')
  const limit = Number(params.get('limit')) || 10

  return answer(params.get('query') ?? params.get('q') ?? '', streaming, limit)
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown> = {}

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    body = {}
  }

  const params = new URL(request.url).searchParams
  const query = String(body.query ?? body.q ?? params.get('query') ?? params.get('q') ?? '')
  const accept = request.headers.get('accept') ?? ''
  const streaming =
    body.streaming === true ||
    body.streaming === 'true' ||
    isTruthy(params.get('streaming')) ||
    accept.includes('text/event-stream')
  const limit = Number(body.limit ?? params.get('limit')) || 10

  return answer(query, streaming, limit)
}
