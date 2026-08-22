import { searchContent } from '@/lib/agent/mcp'
import { API_BASE, apiJson, apiProblem, corsPreflight, paginationEnvelope, readPaging } from '@/lib/agent/api'

/** Ranked full-text search across every published page. */

export const dynamic = 'force-dynamic'

const SECTIONS = ['all', 'site', 'blog', 'glossary', 'tools', 'examples', 'solutions']

export async function OPTIONS(): Promise<Response> {
  return corsPreflight()
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const instance = `${API_BASE}/search${url.search}`

  const query = (url.searchParams.get('q') ?? url.searchParams.get('query') ?? '').trim()

  if (query.length < 2) {
    return apiProblem({
      status: 400,
      code: 'missing_query',
      title: 'Missing query',
      detail: 'Pass at least two characters in the "q" parameter.',
      instance,
      extra: { parameter: 'q', example: `${API_BASE}/search?q=ai%20lead%20scoring` },
    })
  }

  const section = url.searchParams.get('section') ?? 'all'
  if (!SECTIONS.includes(section)) {
    return apiProblem({
      status: 400,
      code: 'invalid_section',
      title: 'Invalid section',
      detail: `"${section}" is not a known section.`,
      instance,
      extra: { parameter: 'section', allowedValues: SECTIONS },
    })
  }

  const paging = readPaging(url, instance)
  if ('problem' in paging) return paging.problem

  const hits = await searchContent(query, { limit: 100, section })
  const page = hits.slice(paging.paging.offset, paging.paging.offset + paging.paging.limit)

  return apiJson({
    query,
    data: page.map((hit) => ({
      path: hit.path,
      url: hit.url,
      markdownUrl: `${hit.url}.md`,
      title: hit.title,
      section: hit.section,
      snippet: hit.snippet,
      score: hit.score,
    })),
    pagination: paginationEnvelope('/search', { q: query, section }, paging.paging, hits.length),
  })
}

/** Read-only API: anything other than GET is a problem response, not an HTML 405. */
function methodNotAllowed(request: Request): Response {
  const url = new URL(request.url)

  return apiProblem({
    status: 405,
    code: 'method_not_allowed',
    title: 'Method not allowed',
    detail: 'This API is read-only. Use GET.',
    instance: `${url.origin}${url.pathname}${url.search}`,
    extra: { allowed: ['GET', 'OPTIONS'] },
  })
}

export async function POST(request: Request): Promise<Response> {
  return methodNotAllowed(request)
}

export async function PUT(request: Request): Promise<Response> {
  return methodNotAllowed(request)
}

export async function DELETE(request: Request): Promise<Response> {
  return methodNotAllowed(request)
}
