import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Developer & Agent Documentation',
  description:
    'Public, unauthenticated interfaces to the content of jarrettstanley.com: a REST API with an OpenAPI 3.1 description, an MCP server, an A2A agent, an NLWeb question endpoint, and Markdown from every page URL.',
  canonical: '/developers',
})

const BASE = siteConfig.url

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
      {children}
    </code>
  )
}

function Block({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  )
}

const endpoints = [
  {
    method: 'GET',
    path: '/api/v1',
    description: 'API index: endpoints, versioning policy, rate limits, and the other agent interfaces.',
  },
  {
    method: 'GET',
    path: '/api/v1/content?section=&limit=&offset=',
    description: 'List published pages. Sections: site, blog, glossary, tools, examples, solutions.',
  },
  {
    method: 'GET',
    path: '/api/v1/content/{path}',
    description: 'Read one page, including its full Markdown body.',
  },
  {
    method: 'GET',
    path: '/api/v1/search?q=',
    description: 'Ranked full-text search with snippets and canonical URLs.',
  },
  {
    method: 'POST',
    path: '/mcp',
    description: 'MCP server (Streamable HTTP, JSON-RPC 2.0): search_content, get_page, list_content.',
  },
  {
    method: 'POST',
    path: '/a2a',
    description: 'A2A agent (JSON-RPC message/send) that answers questions from published content.',
  },
  {
    method: 'GET',
    path: '/ask?query=',
    description: 'NLWeb question endpoint returning schema.org results. Add &streaming=true for SSE.',
  },
]

const discovery = [
  ['/llms.txt', 'Index of the site and guidance on when to use it'],
  ['/llms-full.txt', 'Full Markdown text of every page in one response'],
  ['/openapi.json', 'OpenAPI 3.1 description of the REST API'],
  ['/auth.md', 'Authentication statement (there is none)'],
  ['/.well-known/api-catalog', 'RFC 9727 API catalog'],
  ['/.well-known/ai-catalog.json', 'Agentic Resource Discovery catalog'],
  ['/.well-known/agent-skills/index.json', 'Agent Skills index'],
  ['/.well-known/mcp/server-card.json', 'MCP server card'],
  ['/.well-known/agent-card.json', 'A2A agent card'],
  ['/schema-feed.jsonld', 'Schema.org feed of all indexed content'],
  ['/sitemap.xml', 'Every indexable URL'],
  ['/feed.xml', 'RSS feed of new articles'],
]

export default function DevelopersPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-sm uppercase tracking-widest text-lilac">For developers and agents</p>
        <h1 className="font-signal text-4xl font-semibold text-foreground">
          Read this site programmatically
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Everything published on this site is available over a public, read-only API — plus an MCP
          server, an A2A agent, an NLWeb question endpoint, and a Markdown representation of every
          page. No API key, no OAuth, no sign-up, and no write operations.
        </p>

        <h2 className="mt-14 font-signal text-2xl font-semibold text-foreground">Quick start</h2>
        <p className="mt-4 text-muted-foreground">
          Search the site, then read a page. Both are plain <Code>GET</Code> requests.
        </p>
        <Block>{`curl "${BASE}/api/v1/search?q=ai%20lead%20scoring&limit=3"
curl "${BASE}/api/v1/content/insights/glossary/ai-lead-scoring"`}</Block>
        <p className="mt-4 text-muted-foreground">
          Or skip the API entirely and ask any page for Markdown:
        </p>
        <Block>{`curl -H "Accept: text/markdown" ${BASE}/speaking
curl ${BASE}/speaking.md
curl "${BASE}/speaking?mode=agent"`}</Block>

        <h2 className="mt-14 font-signal text-2xl font-semibold text-foreground">Endpoints</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 pr-4 font-semibold text-foreground">Method</th>
                <th className="py-3 pr-4 font-semibold text-foreground">Path</th>
                <th className="py-3 font-semibold text-foreground">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((endpoint) => (
                <tr key={endpoint.path} className="border-b border-border/60 align-top">
                  <td className="py-3 pr-4 font-mono text-xs text-lilac">{endpoint.method}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-foreground">{endpoint.path}</td>
                  <td className="py-3 text-muted-foreground">{endpoint.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-14 font-signal text-2xl font-semibold text-foreground">Authentication</h2>
        <p className="mt-4 text-muted-foreground">
          None, anywhere. Every interface is public, unauthenticated, and read-only. There are no
          keys, tokens, or scopes, and no endpoint returns <Code>401</Code> or <Code>403</Code>. The
          full statement is at{' '}
          <Link href="/auth.md" className="text-lilac hover:underline">
            /auth.md
          </Link>
          .
        </p>

        <h2 className="mt-14 font-signal text-2xl font-semibold text-foreground">
          Errors, pagination, and limits
        </h2>
        <ul className="mt-4 space-y-3 text-muted-foreground">
          <li>
            <span className="font-semibold text-foreground">Errors</span> use RFC 9457 problem
            details (<Code>application/problem+json</Code>) with a stable <Code>code</Code>, a
            human-readable <Code>detail</Code>, and a documentation link.
          </li>
          <li>
            <span className="font-semibold text-foreground">Pagination</span> is{' '}
            <Code>limit</Code> (1–100, default 20) and <Code>offset</Code>. Every list response
            carries <Code>total</Code>, <Code>count</Code>, and absolute <Code>next</Code> and{' '}
            <Code>previous</Code> URLs.
          </li>
          <li>
            <span className="font-semibold text-foreground">Rate limits</span> are advertised in the{' '}
            <Code>RateLimit</Code> and <Code>RateLimit-Policy</Code> response headers. A
            well-behaved client will never hit one.
          </li>
          <li>
            <span className="font-semibold text-foreground">Versioning</span>: the major version is
            in the path. Additive changes ship within <Code>v1</Code>; breaking changes ship as{' '}
            <Code>v2</Code>, with RFC 9745 <Code>Deprecation</Code> and <Code>Sunset</Code> headers
            at least 90 days before any removal.
          </li>
        </ul>

        <h2 className="mt-14 font-signal text-2xl font-semibold text-foreground">MCP server</h2>
        <p className="mt-4 text-muted-foreground">
          Streamable HTTP, no authentication. Tools: <Code>search_content</Code>,{' '}
          <Code>get_page</Code>, <Code>list_content</Code>.
        </p>
        <Block>{`curl -X POST ${BASE}/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
       "params":{"name":"search_content","arguments":{"query":"speaking topics"}}}'`}</Block>

        <h2 className="mt-14 font-signal text-2xl font-semibold text-foreground">Discovery</h2>
        <ul className="mt-6 space-y-2 text-sm">
          {discovery.map(([path, description]) => (
            <li key={path} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <Link href={path} className="min-w-[19rem] font-mono text-xs text-lilac hover:underline">
                {path}
              </Link>
              <span className="text-muted-foreground">{description}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-signal text-2xl font-semibold text-foreground">Using the content</h2>
        <p className="mt-4 text-muted-foreground">
          Quote and summarise with attribution to Jarrett Stanley and a link to the canonical page.
          The site publishes marketing strategy and AI practice — not mortgage rates, loan products,
          or regulatory guidance. Questions about programmatic access:{' '}
          <a href={`mailto:${siteConfig.author.email}`} className="text-lilac hover:underline">
            {siteConfig.author.email}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
