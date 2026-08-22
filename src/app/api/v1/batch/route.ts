import { getPage } from '@/lib/agent/mcp'
import { API_BASE, apiJson, apiProblem, corsPreflight } from '@/lib/agent/api'

/**
 * Batch read: several pages in one round trip. Same content as
 * /content/{path}, addressed by a list instead of one path at a time.
 */

export const dynamic = 'force-dynamic'

const MAX_BATCH = 25

export async function OPTIONS(): Promise<Response> {
  return corsPreflight()
}

async function batch(requested: string[], instance: string): Promise<Response> {
  if (requested.length === 0 || requested.length > MAX_BATCH) {
    return apiProblem({
      status: 400,
      code: 'invalid_batch',
      title: 'Invalid batch',
      detail: `Request between 1 and ${MAX_BATCH} paths.`,
      instance,
      extra: { parameter: 'paths', maxItems: MAX_BATCH },
    })
  }

  const pages = await Promise.all(requested.map((path) => getPage(path)))

  return apiJson({
    data: pages.flatMap((page) =>
      page ? [{ path: page.path, url: page.url, markdownUrl: `${page.url}.md`, markdown: page.markdown }] : [],
    ),
    errors: pages.flatMap((page, index) =>
      page
        ? []
        : [{ path: requested[index], code: 'page_not_found', detail: 'No published page at this path.' }],
    ),
    requested: requested.length,
  })
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const raw = url.searchParams.get('paths') ?? ''

  return batch(
    raw.split(',').map((value) => value.trim()).filter(Boolean),
    `${API_BASE}/batch${url.search}`,
  )
}

export async function POST(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const instance = `${API_BASE}/batch`

  let body: Record<string, unknown> = {}
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return apiProblem({
      status: 400,
      code: 'invalid_json',
      title: 'Invalid JSON',
      detail: 'The request body must be JSON of the form {"paths": ["/about", "/speaking"]}.',
      instance,
    })
  }

  const paths = Array.isArray(body.paths)
    ? body.paths.filter((value): value is string => typeof value === 'string')
    : (url.searchParams.get('paths') ?? '').split(',').map((value) => value.trim()).filter(Boolean)

  return batch(paths, instance)
}
