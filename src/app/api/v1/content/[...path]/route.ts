import { getPage } from '@/lib/agent/mcp'
import { API_BASE, apiJson, apiProblem, corsPreflight } from '@/lib/agent/api'

/** Fetch one published page, including its full Markdown body. */

export const dynamic = 'force-dynamic'

export async function OPTIONS(): Promise<Response> {
  return corsPreflight()
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> },
): Promise<Response> {
  const { path = [] } = await params
  const requested = `/${path.join('/')}`
  const instance = `${API_BASE}/content${requested}`

  const page = await getPage(requested)

  if (!page) {
    return apiProblem({
      status: 404,
      code: 'page_not_found',
      title: 'Page not found',
      detail: `No published page at "${requested}".`,
      instance,
      extra: { listEndpoint: `${API_BASE}/content`, searchEndpoint: `${API_BASE}/search` },
    })
  }

  return apiJson({
    data: {
      path: page.path,
      url: page.url,
      markdownUrl: `${page.url}.md`,
      markdown: page.markdown,
    },
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
