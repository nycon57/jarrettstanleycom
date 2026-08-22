import { siteConfig } from '@/lib/seo'
import { getAllMarkdownPaths, getMarkdownDocument } from '@/lib/agent/markdown'

/**
 * /llms-full.txt — every public page of jarrettstanley.com concatenated as
 * Markdown, so an agent can ingest the whole site in one request.
 */

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const paths = await getAllMarkdownPaths()
  const documents = await Promise.all(paths.map((path) => getMarkdownDocument(path)))

  const sections = documents
    .map((document, index) =>
      document ? `<!-- ${siteConfig.url}${paths[index]} -->\n\n${document.body.trim()}` : null,
    )
    .filter((section): section is string => section !== null)

  const header = `# Jarrett Stanley — full site text

> Complete Markdown text of jarrettstanley.com (${sections.length} pages), concatenated for ingestion.
> Index and usage guidance: ${siteConfig.url}/llms.txt
> Each page is also available individually at its canonical URL with \`Accept: text/markdown\`, or with a \`.md\` suffix.

---
`

  return new Response(`${header}\n${sections.join('\n\n---\n\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'index, follow',
    },
  })
}
