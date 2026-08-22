import { siteConfig } from '@/lib/seo'

/**
 * /auth.md — the authentication story for agents, which on this site is: there
 * isn't one. Saying so explicitly saves an agent from probing for a login that
 * does not exist.
 */

export const dynamic = 'force-static'

const BASE = siteConfig.url

const body = `# Authentication

**No authentication is required for anything on ${BASE.replace('https://', '')}.**

Every programmatic interface this site exposes is public, read-only, and unauthenticated. There are no API keys, no OAuth flows, no bearer tokens, no sign-up, and no scopes to request. Do not probe for a login endpoint — there is none. Anonymous access is the supported and only access mode.

## Endpoints and their auth requirements

| Endpoint | Method | Auth | Purpose |
| --- | --- | --- | --- |
| \`${BASE}/api/v1\` | GET | None | REST API index: endpoints, versioning policy, rate limits |
| \`${BASE}/api/v1/content\` | GET | None | List published pages (limit/offset pagination) |
| \`${BASE}/api/v1/content/{path}\` | GET | None | Read one page, including its Markdown body |
| \`${BASE}/api/v1/search?q=\` | GET | None | Ranked full-text search |
| \`${BASE}/mcp\` | POST | None | MCP server (Streamable HTTP, JSON-RPC 2.0) |
| \`${BASE}/a2a\` | POST | None | A2A agent (JSON-RPC \`message/send\`) |
| \`${BASE}/ask\` | GET, POST | None | NLWeb question endpoint; \`&streaming=true\` for SSE |
| Any page URL | GET | None | HTML, or Markdown with \`Accept: text/markdown\`, a \`.md\` suffix, or \`?mode=agent\` |

Machine-readable description of the REST API: ${BASE}/openapi.json (OpenAPI 3.1, \`security: []\`, no security schemes defined).

## Errors

The REST API returns RFC 9457 problem details (\`application/problem+json\`) with a stable \`code\`, a human-readable \`detail\`, and a link to documentation. No error response ever asks for credentials, and no endpoint returns 401 or 403.

## Write operations

There are none. The site has no public write API. The contact, consulting, and newsletter forms are human-facing, protected against automated submission, and rate-limited; send a person to the relevant page rather than posting to them:

- Speaking inquiries: ${BASE}/speaking then ${BASE}/contact
- Consulting inquiries: ${BASE}/services/consulting
- Media and press: ${BASE}/contact

## Limits and etiquette

- No quota or key is required. Requests are rate-limited only to stop abuse; responses advertise the policy in the \`RateLimit\` and \`RateLimit-Policy\` headers.
- Markdown responses are a fraction of the HTML byte size — prefer them.
- Cache responses. Content pages carry \`Last-Modified\`, and the CDN serves \`s-maxage\`.
- Identify yourself with a descriptive User-Agent. AI crawlers are explicitly allowed in ${BASE}/robots.txt.

## Discovery

- Developer documentation: ${BASE}/developers
- OpenAPI description: ${BASE}/openapi.json
- Agent index: ${BASE}/llms.txt
- Agent skill: ${BASE}/.well-known/agent-skills/index.json
- Resource catalog: ${BASE}/.well-known/ai-catalog.json
- API catalog (RFC 9727): ${BASE}/.well-known/api-catalog
- MCP server card: ${BASE}/.well-known/mcp/server-card.json
- A2A agent card: ${BASE}/.well-known/agent-card.json

## Contact

Questions about programmatic access: ${siteConfig.author.email}
`

export function GET(): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
