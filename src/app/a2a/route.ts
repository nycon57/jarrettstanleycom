import { siteConfig } from '@/lib/seo'
import { searchContent } from '@/lib/agent/mcp'

/**
 * A2A (Agent2Agent) JSON-RPC endpoint. One skill, read-only: answer a question
 * from this site's published content and cite the pages it came from.
 *
 * Agent card: /.well-known/agent-card.json
 */

export const dynamic = 'force-dynamic'

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}

type JsonRpcId = string | number | null

function jsonRpc(id: JsonRpcId, result: unknown, status = 200): Response {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id, result }), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS_HEADERS },
  })
}

function jsonRpcError(id: JsonRpcId, code: number, message: string): Response {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS_HEADERS },
  })
}

function textFromParts(parts: unknown): string {
  if (!Array.isArray(parts)) return ''

  return parts
    .flatMap((part) => {
      if (typeof part !== 'object' || part === null) return []
      const record = part as Record<string, unknown>
      return typeof record.text === 'string' ? [record.text] : []
    })
    .join(' ')
    .trim()
}

async function answer(question: string): Promise<string> {
  const hits = await searchContent(question, { limit: 5 })

  if (hits.length === 0) {
    return [
      `Nothing on jarrettstanley.com matches "${question}".`,
      '',
      `Browse the index at ${siteConfig.url}/llms.txt, or ask about AI in mortgage marketing, speaking topics and formats, or consulting engagement models.`,
    ].join('\n')
  }

  const body = hits
    .map((hit, index) => `${index + 1}. **${hit.title}** — ${hit.url}\n   ${hit.snippet}`)
    .join('\n\n')

  return [
    `From jarrettstanley.com, ${hits.length} page(s) answer "${question}":`,
    '',
    body,
    '',
    'Each URL above also serves Markdown: send `Accept: text/markdown`, or append `.md`.',
  ].join('\n')
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      message:
        'A2A JSON-RPC endpoint. POST a message/send request here; the agent card is at /.well-known/agent-card.json.',
      agentCard: `${siteConfig.url}/.well-known/agent-card.json`,
    }),
    { status: 405, headers: { 'Content-Type': 'application/json', Allow: 'POST, OPTIONS', ...CORS_HEADERS } },
  )
}

export async function POST(request: Request): Promise<Response> {
  let payload: Record<string, unknown>

  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return jsonRpcError(null, -32700, 'Parse error: request body is not valid JSON.')
  }

  const id = (payload.id as JsonRpcId) ?? null
  const method = payload.method
  const params = (payload.params ?? {}) as Record<string, unknown>

  if (method !== 'message/send') {
    return jsonRpcError(
      id,
      -32601,
      `Method not found: "${String(method)}". This agent supports message/send only.`,
    )
  }

  const message = (params.message ?? {}) as Record<string, unknown>
  const question = textFromParts(message.parts)

  if (question.length === 0) {
    return jsonRpcError(id, -32602, 'Invalid params: message.parts must contain a text part.')
  }

  return jsonRpc(id, {
    kind: 'message',
    messageId: `msg-${Math.abs(question.length * 2654435761).toString(36)}`,
    role: 'agent',
    parts: [{ kind: 'text', text: await answer(question) }],
  })
}
