import { getPage, listContent } from '@/lib/agent/mcp'
import { siteConfig } from '@/lib/seo'
import { API_BASE, apiJson, apiProblem, corsPreflight, paginationEnvelope, readPaging } from '@/lib/agent/api'

/** List published pages, filtered by section, with limit/offset pagination. */

export const dynamic = 'force-dynamic'

const SECTIONS = ['all', 'site', 'blog', 'glossary', 'tools', 'examples', 'solutions']

export async function OPTIONS(): Promise<Response> {
  return corsPreflight()
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const instance = `${API_BASE}/content${url.search}`

  // Batch read: several pages in one request.
  const rawPaths = url.searchParams.get('paths')
  if (rawPaths !== null) {
    const requested = rawPaths
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)

    if (requested.length === 0 || requested.length > 25) {
      return apiProblem({
        status: 400,
        code: 'invalid_paths',
        title: 'Invalid paths',
        detail: '"paths" must be a comma-separated list of 1 to 25 site paths.',
        instance,
        extra: { parameter: 'paths', received: rawPaths },
      })
    }

    const pages = await Promise.all(requested.map((path) => getPage(path)))

    return apiJson({
      data: pages.flatMap((page) =>
        page
          ? [{ path: page.path, url: page.url, markdownUrl: `${page.url}.md`, markdown: page.markdown }]
          : [],
      ),
      errors: pages.flatMap((page, index) =>
        page ? [] : [{ path: requested[index], code: 'page_not_found', detail: 'No published page at this path.' }],
      ),
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

  const all = await listContent(section)
  const page = all.slice(paging.paging.offset, paging.paging.offset + paging.paging.limit)

  return apiJson({
    data: page.map((entry) => ({
      path: entry.path,
      url: entry.url,
      markdownUrl: entry.path === '/' ? `${siteConfig.url}/index.md` : `${entry.url}.md`,
      title: entry.title,
      summary: entry.summary,
      section: entry.section,
    })),
    pagination: paginationEnvelope('/content', { section }, paging.paging, all.length),
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
