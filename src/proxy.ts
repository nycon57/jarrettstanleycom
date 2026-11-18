import { NextResponse, type NextRequest } from 'next/server'
import { MARKDOWN_TYPE, preferredType } from '@/lib/agent/accept'

/**
 * Content negotiation between the HTML and Markdown representations of a page.
 *
 * Agents get Markdown when they ask for it — through `Accept: text/markdown`,
 * the sibling `.md` URL, or `?mode=agent`. Everyone else gets HTML. The
 * representation is never swapped on a User-Agent guess.
 */

const MARKDOWN_ROUTE_PREFIX = '/api/markdown'

/**
 * Paths that are already machine-readable or must never be rewritten. These
 * negotiate their own content types (JSON, SSE), so the HTML/Markdown
 * negotiation below — including its 406 — must not run for them.
 */
const PASSTHROUGH_PREFIXES = [
  '/api/',
  '/_next/',
  '/_vercel/',
  '/studio',
  '/mcp',
  '/ask',
  '/auth.md',
  '/a2a',
  '/.well-known/',
]

function isAssetRequest(pathname: string): boolean {
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1)
  return lastSegment.includes('.') && !lastSegment.endsWith('.md')
}

function markdownRewrite(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone()
  url.pathname = `${MARKDOWN_ROUTE_PREFIX}${pathname === '/' ? '' : pathname}`

  // Only `mode` survives the rewrite; it selects the agent view of the page.
  const mode = url.searchParams.get('mode')
  url.search = mode === 'agent' ? '?mode=agent' : ''

  const response = NextResponse.rewrite(url)
  response.headers.append('Vary', 'Accept')
  return response
}

export default function proxy(request: NextRequest): NextResponse | Response {
  const { pathname, searchParams } = request.nextUrl

  if (PASSTHROUGH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  // Explicit `.md` URL: always Markdown, whatever the Accept header says.
  // This is what `Link: rel="alternate"` points at, and crawlers that follow it
  // often send no Accept header at all.
  if (pathname.endsWith('.md')) {
    return markdownRewrite(request, pathname.slice(0, -3) || '/')
  }

  if (isAssetRequest(pathname)) {
    return NextResponse.next()
  }

  const acceptHeader = request.headers.get('accept')
  const chosen = preferredType(acceptHeader)

  if (chosen === null) {
    return new Response('Not Acceptable\n\nAvailable representations: text/html, text/markdown\n', {
      status: 406,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        Vary: 'Accept',
      },
    })
  }

  const wantsAgentView = searchParams.get('mode') === 'agent'

  if (chosen === MARKDOWN_TYPE || wantsAgentView) {
    return markdownRewrite(request, pathname)
  }

  const response = NextResponse.next()
  // Appended rather than set: Next.js writes its own Vary (rsc,
  // next-router-state-tree, ...) onto page responses and a `set` here is lost.
  response.headers.append('Vary', 'Accept')
  response.headers.append(
    'Link',
    `<${pathname === '/' ? '/index.md' : `${pathname}.md`}>; rel="alternate"; type="text/markdown"`,
  )
  response.headers.append('Link', `</llms.txt>; rel="describedby"; type="text/plain"`)
  response.headers.append('Link', `</sitemap.xml>; rel="sitemap"; type="application/xml"`)
  return response
}

export const config = {
  matcher: ['/((?!api/|_next/|_vercel/).*)'],
}
