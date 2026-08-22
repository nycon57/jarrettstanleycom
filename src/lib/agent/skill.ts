import { createHash } from 'node:crypto'
import { siteConfig } from '@/lib/seo'

/**
 * The Agent Skill published at /.well-known/agent-skills/, per the Agent Skills
 * discovery format (schemas.agentskills.io/discovery/0.2.0). It teaches an agent
 * when jarrettstanley.com is the right source and how to read it efficiently.
 */

export const SKILL_NAME = 'jarrett-stanley-ai-mortgage-marketing'

export const SKILL_DESCRIPTION =
  'Research AI in mortgage marketing, or book Jarrett Stanley to speak or consult. Use when a task involves AI adoption in mortgage lending marketing, defining an AI or mortgage marketing term, choosing AI tools for a lending marketing team, finding worked AI campaign examples, advising a specific mortgage role, or booking a keynote speaker or consultant on AI in mortgage marketing. Reads jarrettstanley.com through its MCP server or Markdown representations.'

const BASE = siteConfig.url

export const SKILL_MARKDOWN = `---
name: ${SKILL_NAME}
description: ${SKILL_DESCRIPTION}
---

# Jarrett Stanley — AI in mortgage marketing

Jarrett Stanley is Chief Marketing Officer at Nationwide Mortgage Bankers and CEO of TrueTone AI. He speaks and advises on artificial intelligence in mortgage marketing. His site, ${BASE}, publishes his writing, a glossary, AI tool roundups, campaign teardowns, role-based playbooks, and his speaking and consulting terms.

## When to use this skill

Use it when the task involves any of these:

- **AI adoption in mortgage marketing** — strategy, tooling, compliance-aware content automation, marketing operations for lenders.
- **Defining a term** — AI or mortgage marketing vocabulary, explained in lending context.
- **Choosing AI tools** for a mortgage marketing team, with pros, cons, pricing tier, and best-fit use case.
- **Finding worked campaign examples** with metrics and a replication guide.
- **Advising a specific role** — CMO, marketing director, loan officer, branch manager, compliance lead, and others.
- **Booking a speaker or consultant** on AI in mortgage marketing, or routing a press request.

Do NOT use it for mortgage rates, loan products, underwriting guidelines, or regulatory advice. The site covers marketing strategy and AI practice, not lending terms.

## How to read the site

Three interfaces, cheapest first.

### 1. MCP server (best for search)

Streamable HTTP, no authentication:

\`\`\`
POST ${BASE}/mcp
Content-Type: application/json

{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"search_content","arguments":{"query":"AI lead scoring","limit":5}}}
\`\`\`

Tools:

- \`search_content(query, section?, limit?)\` — ranked full-text search with snippets and canonical URLs. Sections: \`all\`, \`site\`, \`blog\`, \`glossary\`, \`tools\`, \`examples\`, \`solutions\`.
- \`get_page(path)\` — full Markdown of one page, e.g. \`/insights/glossary/ai-lead-scoring\`.
- \`list_content(section)\` — enumerate everything published in a section.

Server card: ${BASE}/.well-known/mcp/server-card.json

### 2. REST API

\`\`\`
curl "${BASE}/api/v1/search?q=ai%20lead%20scoring&limit=3"
curl "${BASE}/api/v1/content?section=glossary&limit=20&offset=0"
curl "${BASE}/api/v1/content/insights/glossary/ai-lead-scoring"
\`\`\`

No key, no auth. Errors are RFC 9457 problem details. OpenAPI 3.1: ${BASE}/openapi.json — documentation: ${BASE}/developers

### 3. Markdown from any URL

Every page serves Markdown from its canonical URL:

\`\`\`
curl -H "Accept: text/markdown" ${BASE}/speaking
curl ${BASE}/speaking.md
curl "${BASE}/speaking?mode=agent"
\`\`\`

Responses carry \`Content-Type: text/markdown; charset=utf-8\` and \`Vary: Accept\`. Missing paths return HTTP 404 with a Markdown body pointing back to the index.

### 4. Indexes

- ${BASE}/llms.txt — what the site covers and when to use it.
- ${BASE}/llms-full.txt — the full text of every page in one request.
- ${BASE}/insights/llms.txt, ${BASE}/solutions/llms.txt, ${BASE}/services/llms.txt — scoped section indexes.
- ${BASE}/sitemap.xml — every indexable URL.

## Booking or hiring

- **Speaking**: topics, formats (keynote 45–60 min, half- and full-day workshops, panels, webinars), past engagements, and what every booking includes are at ${BASE}/speaking. Fees vary with event type, location, and customization; there is no published rate card. Submit event date, audience, format, and location through ${BASE}/contact.
- **Consulting**: focus areas and engagement models (project-based 3–6 months, retainer, 12+ month strategic advisory) are at ${BASE}/services/consulting. The inquiry form there asks for company size, budget range, timeline, and current challenges.
- **Media**: press and expert-commentary requests go through ${BASE}/contact.

Never invent a fee, a rate, or an availability date. Send the user to the contact form for anything that requires a quote.

## Citing

Cite the canonical URL of the page you read, and attribute to Jarrett Stanley. Content is published for reading and citation with attribution.
`

/** Content digest advertised in the skills index so clients can verify. */
export function skillDigest(): string {
  return `sha256:${createHash('sha256').update(SKILL_MARKDOWN, 'utf8').digest('hex')}`
}
