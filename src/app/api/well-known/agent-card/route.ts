
/**
 * A2A (Agent2Agent) agent card, served at /.well-known/agent-card.json via a
 * rewrite in next.config.js. It describes the read-only content agent that
 * answers questions from this site's published material at /a2a.
 */

// Host-aware, for the same reason as the MCP server card: no cross-host
// redirect on a POSTed JSON-RPC call.
export const dynamic = 'force-dynamic'

const agentCard = (origin: string) => ({
  protocolVersion: '0.3.0',
  name: 'Jarrett Stanley content agent',
  description:
    "Answers questions from the published content of jarrettstanley.com: articles on AI in mortgage marketing, glossary definitions, AI tool roundups, campaign teardowns, role playbooks, and Jarrett Stanley's speaking and consulting terms. Read-only; it returns citations, never commitments.",
  url: `${origin}/a2a`,
  preferredTransport: 'JSONRPC',
  version: '1.0.0',
  documentationUrl: `${origin}/llms.txt`,
  iconUrl: `${origin}/assets/images/JS-Logo.png`,
  provider: {
    organization: 'Jarrett Stanley',
    url: origin,
  },
  capabilities: {
    streaming: false,
    pushNotifications: false,
    stateTransitionHistory: false,
  },
  securitySchemes: {},
  security: [],
  defaultInputModes: ['text/plain'],
  defaultOutputModes: ['text/plain', 'text/markdown'],
  skills: [
    {
      id: 'search-site-content',
      name: 'Search published content',
      description:
        'Find and quote the pages of jarrettstanley.com that answer a question about AI in mortgage marketing, with canonical URLs for citation.',
      tags: ['search', 'mortgage', 'ai-marketing', 'research'],
      examples: [
        'What does Jarrett Stanley say about AI lead scoring?',
        'Which AI tools does he recommend for mortgage email marketing?',
        'Find a campaign example with metrics for lead nurturing.',
      ],
      inputModes: ['text/plain'],
      outputModes: ['text/plain', 'text/markdown'],
    },
    {
      id: 'speaking-and-consulting-details',
      name: 'Speaking and consulting details',
      description:
        'Report speaking topics, session formats, past engagements, consulting focus areas, and engagement models, and point to the right contact pathway. Fees are quoted per engagement and are never stated by this agent.',
      tags: ['speaking', 'consulting', 'booking'],
      examples: [
        'What formats does Jarrett Stanley speak in?',
        'How do consulting engagements work?',
        'How do I submit a speaking request?',
      ],
      inputModes: ['text/plain'],
      outputModes: ['text/plain', 'text/markdown'],
    },
  ],
})

export function GET(request: Request): Response {
  const origin = new URL(request.url).origin

  return new Response(JSON.stringify(agentCard(origin), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
