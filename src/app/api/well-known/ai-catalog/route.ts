import { siteConfig } from '@/lib/seo'

/**
 * Agentic Resource Discovery catalog, served at /.well-known/ai-catalog.json
 * via a rewrite in next.config.js. Lists the agentic resources this domain
 * actually publishes: an MCP server and the Markdown/llms.txt content surface.
 *
 * https://agenticresourcediscovery.org
 */

export const dynamic = 'force-static'

const catalog = {
  specVersion: '1.0',
  host: {
    displayName: 'Jarrett Stanley',
    identifier: 'jarrettstanley.com',
    description:
      'Personal site of Jarrett Stanley — Chief Marketing Officer at Nationwide Mortgage Bankers, CEO of TrueTone AI, keynote speaker and advisor on artificial intelligence in mortgage marketing.',
    url: siteConfig.url,
  },
  entries: [
    {
      identifier: 'urn:air:jarrettstanley.com:mcp:site-content',
      displayName: 'Jarrett Stanley — site content (MCP)',
      type: 'application/mcp-server-card+json',
      url: `${siteConfig.url}/.well-known/mcp/server-card.json`,
      description:
        'Read-only MCP server for searching and reading everything published on jarrettstanley.com: articles, glossary definitions, AI tool roundups, campaign teardowns, role playbooks, speaking topics, and consulting services.',
      trustManifest: {
        identity: { type: 'https-domain', value: 'jarrettstanley.com' },
        provenance: { publishedFrom: siteConfig.url },
        authentication: { required: false },
        dataHandling: { readOnly: true, sideEffects: 'none' },
      },
    },
    {
      identifier: 'urn:air:jarrettstanley.com:doc:llms-txt',
      displayName: 'Agent index (llms.txt)',
      type: 'text/plain',
      url: `${siteConfig.url}/llms.txt`,
      description:
        'What this site covers, when an agent should reach for it, and where every section lives. Includes a full page index.',
      trustManifest: {
        identity: { type: 'https-domain', value: 'jarrettstanley.com' },
        provenance: { publishedFrom: siteConfig.url },
        authentication: { required: false },
        dataHandling: { readOnly: true, sideEffects: 'none' },
      },
    },
    {
      identifier: 'urn:air:jarrettstanley.com:doc:llms-full-txt',
      displayName: 'Full site text (llms-full.txt)',
      type: 'text/plain',
      url: `${siteConfig.url}/llms-full.txt`,
      description: 'Complete Markdown text of every public page, concatenated for ingestion.',
      trustManifest: {
        identity: { type: 'https-domain', value: 'jarrettstanley.com' },
        provenance: { publishedFrom: siteConfig.url },
        authentication: { required: false },
        dataHandling: { readOnly: true, sideEffects: 'none' },
      },
    },
    {
      identifier: 'urn:air:jarrettstanley.com:skill:ai-mortgage-marketing',
      displayName: 'Agent skill: AI in mortgage marketing',
      type: 'text/markdown',
      url: `${siteConfig.url}/.well-known/agent-skills/jarrett-stanley-ai-mortgage-marketing/SKILL.md`,
      description:
        'When to use jarrettstanley.com as a source, and how to read it through the MCP server, Markdown negotiation, or the section indexes.',
      trustManifest: {
        identity: { type: 'https-domain', value: 'jarrettstanley.com' },
        provenance: { publishedFrom: siteConfig.url },
        authentication: { required: false },
        dataHandling: { readOnly: true, sideEffects: 'none' },
      },
    },
  ],
  collections: [
    {
      identifier: 'urn:air:jarrettstanley.com:collection:sitemap',
      displayName: 'Sitemap',
      type: 'application/xml',
      url: `${siteConfig.url}/sitemap.xml`,
      description: 'Every indexable URL on the site. Each page also serves Markdown from the same URL.',
    },
  ],
}

export function GET(): Response {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/ai-catalog+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
