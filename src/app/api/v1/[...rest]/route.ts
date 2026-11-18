import { API_BASE, apiProblem, corsPreflight } from '@/lib/agent/api'

/**
 * Catch-all for unknown /api/v1 paths, so an agent that guesses a route gets
 * RFC 9457 problem details instead of the site's HTML 404 page.
 */

export const dynamic = 'force-dynamic'

export async function OPTIONS(): Promise<Response> {
  return corsPreflight()
}

function unknownRoute(request: Request): Response {
  const url = new URL(request.url)

  return apiProblem({
    status: 404,
    code: 'endpoint_not_found',
    title: 'Endpoint not found',
    detail: `No endpoint at "${url.pathname}". See the API index for the routes this version exposes.`,
    instance: `${url.origin}${url.pathname}${url.search}`,
    extra: {
      index: API_BASE,
      openapi: `${API_BASE.replace('/api/v1', '')}/openapi.json`,
      endpoints: [`${API_BASE}/content`, `${API_BASE}/content/{path}`, `${API_BASE}/search`],
    },
  })
}

export async function GET(request: Request): Promise<Response> {
  return unknownRoute(request)
}

export async function POST(request: Request): Promise<Response> {
  return unknownRoute(request)
}

export async function PUT(request: Request): Promise<Response> {
  return unknownRoute(request)
}

export async function PATCH(request: Request): Promise<Response> {
  return unknownRoute(request)
}

export async function DELETE(request: Request): Promise<Response> {
  return unknownRoute(request)
}
