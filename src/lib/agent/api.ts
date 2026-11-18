/**
 * Shared plumbing for the public read-only content API under /api/v1:
 * consistent envelopes, RFC 9457 problem responses, rate-limit advertisement,
 * and CORS. Described by /openapi.json.
 */

import { siteConfig } from '@/lib/seo'

export const API_VERSION = 'v1'
export const API_BASE = `${siteConfig.url}/api/${API_VERSION}`

/** Advertised limit. Enforcement lives in the Vercel firewall, not here. */
const RATE_LIMIT_POLICY = '"content";q=600;w=60'
const RATE_LIMIT_WINDOW = 60

export const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Expose-Headers': 'RateLimit, RateLimit-Policy, Link, Deprecation, Sunset',
  'Access-Control-Max-Age': '86400',
}

function baseHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    'RateLimit-Policy': RATE_LIMIT_POLICY,
    RateLimit: `"content";r=600;t=${RATE_LIMIT_WINDOW}`,
    'X-API-Version': API_VERSION,
    Link: `<${siteConfig.url}/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json", <${siteConfig.url}/developers>; rel="service-doc"; type="text/html"`,
    ...CORS_HEADERS,
  }
}

export function apiJson(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...baseHeaders() },
  })
}

/** RFC 9457 problem details. Every error from this API uses this shape. */
export function apiProblem({
  status,
  code,
  title,
  detail,
  instance,
  extra,
}: {
  status: number
  code: string
  title: string
  detail: string
  instance: string
  extra?: Record<string, unknown>
}): Response {
  const problem = {
    type: `${siteConfig.url}/developers#${code}`,
    title,
    status,
    detail,
    instance,
    code,
    documentation: `${siteConfig.url}/developers`,
    ...extra,
  }

  return new Response(JSON.stringify(problem, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/problem+json; charset=utf-8',
      ...baseHeaders(),
      'Cache-Control': 'no-store',
    },
  })
}

export type PageParams = { limit: number; offset: number }

/**
 * Opaque cursors. They encode an offset today; treat them as opaque so the
 * encoding can change without breaking clients.
 */
export function encodeCursor(offset: number): string {
  return Buffer.from(`o:${offset}`, 'utf8').toString('base64url')
}

export function decodeCursor(cursor: string): number | null {
  try {
    const decoded = Buffer.from(cursor, 'base64url').toString('utf8')
    const match = decoded.match(/^o:(\d+)$/)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

/** Parses and validates `limit`/`offset`, or returns a problem response. */
export function readPaging(
  url: URL,
  instance: string,
): { paging: PageParams } | { problem: Response } {
  const rawLimit = url.searchParams.get('limit')
  const rawOffset = url.searchParams.get('offset')
  const rawCursor = url.searchParams.get('cursor')

  const limit = rawLimit === null ? 20 : Number(rawLimit)

  let offset = rawOffset === null ? 0 : Number(rawOffset)

  if (rawCursor !== null) {
    const decoded = decodeCursor(rawCursor)
    if (decoded === null) {
      return {
        problem: apiProblem({
          status: 400,
          code: 'invalid_cursor',
          title: 'Invalid cursor',
          detail: 'The "cursor" value is not a cursor this API issued. Start without one.',
          instance,
          extra: { parameter: 'cursor', received: rawCursor },
        }),
      }
    }
    offset = decoded
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return {
      problem: apiProblem({
        status: 400,
        code: 'invalid_limit',
        title: 'Invalid limit',
        detail: '"limit" must be an integer between 1 and 100.',
        instance,
        extra: { parameter: 'limit', received: rawLimit },
      }),
    }
  }

  if (!Number.isInteger(offset) || offset < 0) {
    return {
      problem: apiProblem({
        status: 400,
        code: 'invalid_offset',
        title: 'Invalid offset',
        detail: '"offset" must be an integer of 0 or greater.',
        instance,
        extra: { parameter: 'offset', received: rawOffset },
      }),
    }
  }

  return { paging: { limit, offset } }
}

export function paginationEnvelope(
  path: string,
  query: Record<string, string | undefined>,
  { limit, offset }: PageParams,
  total: number,
): Record<string, unknown> {
  const build = (nextOffset: number) => {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') params.set(key, value)
    }
    params.set('limit', String(limit))
    params.set('offset', String(nextOffset))
    return `${API_BASE}${path}?${params.toString()}`
  }

  const hasNext = offset + limit < total

  return {
    limit,
    offset,
    total,
    count: Math.max(0, Math.min(limit, total - offset)),
    next: hasNext ? build(offset + limit) : null,
    previous: offset > 0 ? build(Math.max(0, offset - limit)) : null,
    // Cursor form of the same position, for clients that prefer opaque paging.
    cursor: encodeCursor(offset),
    nextCursor: hasNext ? encodeCursor(offset + limit) : null,
    previousCursor: offset > 0 ? encodeCursor(Math.max(0, offset - limit)) : null,
  }
}

export function corsPreflight(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}
