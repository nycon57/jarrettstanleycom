
/**
 * MCP server card. Served at /.well-known/mcp/server-card.json and
 * /mcp/server-card via rewrites in next.config.js.
 */

// Host-aware: the card advertises the origin it was fetched from, so an MCP
// client never has to follow a cross-host redirect on POST.
export const dynamic = 'force-dynamic'

const serverCard = (origin: string) => ({
  $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
  name: 'io.jarrettstanley/jarrettstanley-content',
  title: 'Jarrett Stanley — site content',
  description:
    "Read-only access to everything published on jarrettstanley.com: articles on AI in mortgage marketing, glossary definitions, AI tool roundups, campaign teardowns, role playbooks, and Jarrett Stanley's speaking and consulting pages.",
  version: '1.0.0',
  websiteUrl: `${origin}/`,
  iconUrl: `${origin}/assets/images/JS-Logo.png`,
  icons: [
    { src: `${origin}/assets/images/JS-Logo.png`, mimeType: 'image/png', theme: 'light' },
    { src: `${origin}/assets/images/JS-Logo-white.png`, mimeType: 'image/png', theme: 'dark' },
    { src: `${origin}/favicon.ico`, mimeType: 'image/x-icon', sizes: ['32x32'] },
  ],
  serverUrl: `${origin}/mcp`,
  documentationUrl: `${origin}/llms.txt`,
  tools: [
    {
      name: 'search_content',
      description:
        'Ranked full-text search across every page on jarrettstanley.com, returning snippets and canonical URLs. Optional section filter and result limit.',
    },
    {
      name: 'get_page',
      description:
        'Full Markdown text of one page, addressed by its site path (for example "/speaking" or "/insights/glossary/ai-lead-scoring").',
    },
    {
      name: 'list_content',
      description:
        'Enumerate every published page in one section (site, blog, glossary, tools, examples, solutions) with title, summary, and URL.',
    },
  ],
  capabilities: { tools: true, resources: true, prompts: false },
  authentication: { type: 'none' },
  // Endpoint aliases: manifest consumers disagree on the field name.
  url: `${origin}/mcp`,
  endpoint: `${origin}/mcp`,
  transport: { type: 'streamable-http', url: `${origin}/mcp` },
  mcpServers: {
    'jarrettstanley-content': { type: 'streamable-http', url: `${origin}/mcp` },
  },
  remotes: [
    {
      type: 'streamable-http',
      url: `${origin}/mcp`,
      supportedProtocolVersions: ['2025-06-18', '2025-03-26', '2024-11-05'],
    },
  ],
})

/**
 * Some clients treat the manifest URL as the transport endpoint and open the
 * JSON-RPC handshake against it. Accept that: a POST here is handled by the
 * same MCP server that /mcp exposes.
 */
export { POST, OPTIONS } from '@/app/mcp/route'

export function GET(request: Request): Response {
  const origin = new URL(request.url).origin

  return new Response(JSON.stringify(serverCard(origin), null, 2), {
    headers: {
      'Content-Type': 'application/mcp-server-card+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
