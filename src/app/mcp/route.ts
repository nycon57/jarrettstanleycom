import { siteConfig } from '@/lib/seo'
import { getPage, listContent, searchContent } from '@/lib/agent/mcp'

/**
 * Model Context Protocol server (Streamable HTTP) for jarrettstanley.com.
 *
 * Read-only: it exposes the site's own content — articles, glossary terms, tool
 * roundups, campaign teardowns, role playbooks, and the marketing pages — as
 * MCP tools and resources. No authentication, no writes, no side effects.
 */

export const dynamic = 'force-dynamic'

const SUPPORTED_PROTOCOL_VERSIONS = ['2026-07-28', '2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05']
const DEFAULT_PROTOCOL_VERSION = '2025-06-18'

const SECTIONS = ['all', 'site', 'blog', 'glossary', 'tools', 'examples', 'solutions'] as const

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, MCP-Protocol-Version',
  'Access-Control-Max-Age': '86400',
}

const TOOLS = [
  {
    name: 'search_content',
    title: 'Search jarrettstanley.com',
    description:
      "Full-text search across everything published on jarrettstanley.com: long-form articles on AI in mortgage marketing, glossary definitions, AI tool roundups, campaign teardowns, role-based playbooks, and the speaking and consulting pages. Returns ranked matches with a snippet and the canonical URL. Use this first when a question is about Jarrett Stanley's work, published views, or services.",
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search terms, e.g. "AI lead scoring" or "speaking topics".',
          minLength: 2,
        },
        section: {
          type: 'string',
          description:
            'Restrict results to one section of the site. "site" covers the marketing and legal pages.',
          enum: [...SECTIONS],
          default: 'all',
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of results to return.',
          minimum: 1,
          maximum: 25,
          default: 8,
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
    annotations: {
      title: 'Search jarrettstanley.com',
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: 'get_page',
    title: 'Read a page as Markdown',
    description:
      'Fetch the full Markdown text of one page on jarrettstanley.com by its path (for example "/about", "/speaking", or "/insights/glossary/ai-lead-scoring"). Use after search_content when you need the complete text rather than a snippet.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description:
            'Site path beginning with "/", or a full https://jarrettstanley.com URL. A ".md" suffix is accepted and ignored.',
          minLength: 1,
        },
      },
      required: ['path'],
      additionalProperties: false,
    },
    annotations: {
      title: 'Read a page as Markdown',
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: 'list_content',
    title: 'List published content',
    description:
      'List every published page in one section of jarrettstanley.com with its title, summary, and canonical URL. Use this to enumerate what exists before searching, or to answer "what has he written about X".',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'Which section to list.',
          enum: [...SECTIONS],
          default: 'all',
        },
      },
      required: ['section'],
      additionalProperties: false,
    },
    annotations: {
      title: 'List published content',
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
] as const

const RESOURCES = [
  {
    uri: `${siteConfig.url}/llms.txt`,
    name: 'llms_txt',
    title: 'Agent index (llms.txt)',
    description:
      'What this site is, when an agent should reach for it, and where every section lives.',
    mimeType: 'text/plain',
  },
  {
    uri: `${siteConfig.url}/about.md`,
    name: 'about',
    title: 'About Jarrett Stanley',
    description: 'Biography, career timeline, awards, and areas of expertise.',
    mimeType: 'text/markdown',
  },
  {
    uri: `${siteConfig.url}/speaking.md`,
    name: 'speaking',
    title: 'Speaking topics and booking',
    description: 'Signature topics, formats, past engagements, and how to book.',
    mimeType: 'text/markdown',
  },
  {
    uri: `${siteConfig.url}/services/consulting.md`,
    name: 'consulting',
    title: 'Consulting engagements',
    description: 'Focus areas, engagement models, and the consulting process.',
    mimeType: 'text/markdown',
  },
] as const

const SERVER_INSTRUCTIONS = `This server exposes the published content of jarrettstanley.com, the site of Jarrett Stanley — Chief Marketing Officer at Nationwide Mortgage Bankers, CEO of TrueTone AI, and a keynote speaker and advisor on artificial intelligence in mortgage marketing.

Use search_content for any question about his published views, speaking topics, consulting services, AI tool recommendations, or mortgage marketing terminology. Follow up with get_page when the snippet is not enough. Use list_content to enumerate a section.

Everything here is read-only public content. Cite the canonical URL returned with each result. This site does not publish mortgage rates, loan products, or regulatory guidance.`

type JsonRpcId = string | number | null

/**
 * Streamable HTTP allows either a JSON body or an SSE stream in response to a
 * POST. Clients that advertise text/event-stream get the SSE framing they
 * expect; everyone else gets plain JSON.
 */
function wantsEventStream(request: Request | null): boolean {
  const accept = request?.headers.get('accept') ?? ''
  return accept.includes('text/event-stream')
}

function rpcResponse(request: Request | null, payload: unknown, status = 200): Response {
  const body = JSON.stringify(payload)

  const headers: Record<string, string> = {
    'Cache-Control': 'no-store, no-transform',
    'MCP-Protocol-Version': DEFAULT_PROTOCOL_VERSION,
    // Stateless server: the session id is informational, and any value a client
    // echoes back is accepted.
    'Mcp-Session-Id': 'jarrettstanley-content',
    ...CORS_HEADERS,
  }

  if (wantsEventStream(request)) {
    return new Response(`event: message\ndata: ${body}\n\n`, {
      status,
      headers: {
        ...headers,
        'Content-Type': 'text/event-stream; charset=utf-8',
        'X-Accel-Buffering': 'no',
      },
    })
  }

  return new Response(body, {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  })
}

function rpcResult(request: Request | null, id: JsonRpcId, result: unknown): Response {
  return rpcResponse(request, { jsonrpc: '2.0', id, result })
}

function rpcError(
  request: Request | null,
  id: JsonRpcId,
  code: number,
  message: string,
  data?: unknown,
): Response {
  return rpcResponse(request, { jsonrpc: '2.0', id, error: { code, message, ...(data ? { data } : {}) } })
}

function toolResult(text: string, structuredContent?: unknown): unknown {
  return {
    content: [{ type: 'text', text }],
    ...(structuredContent === undefined ? {} : { structuredContent }),
    isError: false,
  }
}

function toolError(text: string): unknown {
  return { content: [{ type: 'text', text }], isError: true }
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_content': {
      const query = typeof args.query === 'string' ? args.query.trim() : ''
      if (query.length < 2) {
        return toolError('The "query" argument is required and must be at least 2 characters.')
      }

      const section = typeof args.section === 'string' ? args.section : 'all'
      if (!SECTIONS.includes(section as (typeof SECTIONS)[number])) {
        return toolError(`Unknown section "${section}". Valid sections: ${SECTIONS.join(', ')}.`)
      }

      const limit = typeof args.limit === 'number' ? Math.trunc(args.limit) : 8
      const hits = await searchContent(query, { limit, section })

      if (hits.length === 0) {
        return toolResult(
          `No pages on jarrettstanley.com match "${query}". Try broader terms, or call list_content to see what is published.`,
          { query, results: [] },
        )
      }

      const text = hits
        .map((hit, index) => `${index + 1}. ${hit.title} — ${hit.url}\n   ${hit.snippet}`)
        .join('\n\n')

      return toolResult(`${hits.length} result(s) for "${query}":\n\n${text}`, {
        query,
        results: hits.map(({ score: _score, ...rest }) => rest),
      })
    }

    case 'get_page': {
      const path = typeof args.path === 'string' ? args.path.trim() : ''
      if (path.length === 0) return toolError('The "path" argument is required.')

      const page = await getPage(path)
      if (!page) {
        return toolError(
          `No page at "${path}". Call list_content or search_content to find valid paths.`,
        )
      }

      return toolResult(page.markdown, page)
    }

    case 'list_content': {
      const section = typeof args.section === 'string' ? args.section : 'all'
      if (!SECTIONS.includes(section as (typeof SECTIONS)[number])) {
        return toolError(`Unknown section "${section}". Valid sections: ${SECTIONS.join(', ')}.`)
      }

      const entries = await listContent(section)
      const text = entries.map((entry) => `- ${entry.title} — ${entry.url}\n  ${entry.summary}`).join('\n')

      return toolResult(`${entries.length} page(s) in "${section}":\n\n${text}`, {
        section,
        count: entries.length,
        pages: entries,
      })
    }

    default:
      return toolError(`Unknown tool "${name}".`)
  }
}

async function readResource(uri: string): Promise<{ uri: string; mimeType: string; text: string } | null> {
  const known = RESOURCES.find((resource) => resource.uri === uri)
  if (!known) return null

  if (known.mimeType === 'text/plain') {
    const response = await fetch(uri, { headers: { Accept: 'text/plain' }, cache: 'no-store' })
    if (!response.ok) return null
    return { uri, mimeType: 'text/plain', text: await response.text() }
  }

  const page = await getPage(uri)
  if (!page) return null
  return { uri, mimeType: 'text/markdown', text: page.markdown }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(): Promise<Response> {
  // No server-initiated stream: clients POST JSON-RPC and read the response.
  return new Response(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message:
          'This MCP server does not offer a server-initiated SSE stream. POST JSON-RPC requests to this endpoint instead.',
      },
      id: null,
    }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST, OPTIONS', ...CORS_HEADERS },
    },
  )
}

export async function POST(request: Request): Promise<Response> {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return rpcError(request, null, -32700, 'Parse error: request body is not valid JSON.')
  }

  if (Array.isArray(payload)) {
    return rpcError(request, null, -32600, 'Batched JSON-RPC requests are not supported by this server.')
  }

  if (typeof payload !== 'object' || payload === null) {
    return rpcError(request, null, -32600, 'Invalid Request: expected a JSON-RPC 2.0 object.')
  }

  const message = payload as { method?: string; id?: JsonRpcId; params?: Record<string, unknown> }
  const id = message.id ?? null
  const method = message.method
  const params = message.params ?? {}

  if (typeof method !== 'string') {
    return rpcError(request, id, -32600, 'Invalid Request: "method" is required.')
  }

  // Notifications carry no id and expect no body.
  if (method.startsWith('notifications/')) {
    return new Response(null, { status: 202, headers: CORS_HEADERS })
  }

  switch (method) {
    case 'initialize': {
      const requested = typeof params.protocolVersion === 'string' ? params.protocolVersion : ''
      const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
        ? requested
        : DEFAULT_PROTOCOL_VERSION

      return rpcResult(request, id, {
        protocolVersion,
        capabilities: {
          tools: { listChanged: true },
          resources: { listChanged: true, subscribe: false },
        },
        serverInfo: {
          name: 'io.jarrettstanley/jarrettstanley-content',
          title: 'Jarrett Stanley — site content',
          version: '1.0.0',
          websiteUrl: siteConfig.url,
        },
        instructions: SERVER_INSTRUCTIONS,
      })
    }

    case 'ping':
      return rpcResult(request, id, {})

    case 'tools/list':
      return rpcResult(request, id, { tools: TOOLS })

    case 'tools/call': {
      const name = typeof params.name === 'string' ? params.name : ''
      const args = (params.arguments ?? {}) as Record<string, unknown>

      if (!TOOLS.some((tool) => tool.name === name)) {
        return rpcError(request, id, -32602, `Unknown tool "${name}". Call tools/list for available tools.`, {
          availableTools: TOOLS.map((tool) => tool.name),
        })
      }

      return rpcResult(request, id, await callTool(name, args))
    }

    case 'resources/list':
      return rpcResult(request, id, { resources: RESOURCES })

    case 'resources/templates/list':
      return rpcResult(request, id, {
        resourceTemplates: [
          {
            uriTemplate: `${siteConfig.url}/{+path}.md`,
            name: 'page_markdown',
            title: 'Any page as Markdown',
            description:
              'Markdown text of any page on jarrettstanley.com. Paths are listed by the list_content tool and in /llms.txt.',
            mimeType: 'text/markdown',
          },
        ],
      })

    case 'resources/read': {
      const uri = typeof params.uri === 'string' ? params.uri : ''
      const contents = await readResource(uri)

      if (!contents) {
        return rpcError(request, id, -32002, `Resource not found: "${uri}".`, {
          availableResources: RESOURCES.map((resource) => resource.uri),
        })
      }

      return rpcResult(request, id, { contents: [contents] })
    }

    case 'prompts/list':
      return rpcResult(request, id, { prompts: [] })

    case 'completion/complete':
      return rpcResult(request, id, { completion: { values: [], hasMore: false, total: 0 } })

    default:
      return rpcError(request, id, -32601, `Method not found: "${method}".`)
  }
}
