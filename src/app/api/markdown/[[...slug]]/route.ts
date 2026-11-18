import {
  agentInterfacesMarkdown,
  getMarkdownDocument,
  notFoundMarkdown,
  withFrontmatter,
} from '@/lib/agent/markdown'

/**
 * Markdown representation of any public page. Reached by internal rewrite from
 * src/proxy.ts when a client negotiates `Accept: text/markdown` or requests the
 * sibling `.md` URL — never linked directly.
 */

export const dynamic = 'force-dynamic'

function markdownResponse(body: string, status: number, lastModified?: string): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'text/markdown; charset=utf-8',
    Vary: 'Accept',
    'Cache-Control':
      status === 200
        ? 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
        : 'public, max-age=0, s-maxage=60',
    'X-Robots-Tag': 'index, follow',
  }

  if (lastModified) {
    const parsed = new Date(lastModified)
    if (!Number.isNaN(parsed.getTime())) headers['Last-Modified'] = parsed.toUTCString()
  }

  return new Response(body, { status, headers })
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<Response> {
  const { slug = [] } = await params
  const pathname = `/${slug.join('/')}`

  const document = await getMarkdownDocument(pathname)

  if (!document) {
    return markdownResponse(notFoundMarkdown(pathname), 404)
  }

  // `?mode=agent` asks for the same content plus the machine-readable summary of
  // every interface this site exposes.
  const isAgentView = new URL(request.url).searchParams.get('mode') === 'agent'
  const body = isAgentView
    ? `${document.body.trimEnd()}\n\n---\n\n${agentInterfacesMarkdown()}\n`
    : document.body

  return markdownResponse(
    withFrontmatter({ ...document, body }, pathname),
    200,
    document.lastModified,
  )
}
