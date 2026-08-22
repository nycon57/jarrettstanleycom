/**
 * Content index and tool implementations behind the MCP server at /mcp.
 * Everything here reads the same Markdown documents the site serves at its
 * canonical URLs, so an agent gets exactly what a reader would.
 */

import { siteConfig } from '@/lib/seo'
import { getAllMarkdownPaths, getMarkdownDocument, normalizePath } from '@/lib/agent/markdown'

export type IndexedDocument = {
  path: string
  url: string
  title: string
  summary: string
  section: string
  body: string
}

let indexCache: IndexedDocument[] | null = null

function sectionFor(path: string): string {
  if (path.startsWith('/insights/blog')) return 'blog'
  if (path.startsWith('/insights/glossary')) return 'glossary'
  if (path.startsWith('/insights/tools')) return 'tools'
  if (path.startsWith('/insights/examples')) return 'examples'
  if (path.startsWith('/solutions')) return 'solutions'
  return 'site'
}

function titleOf(body: string, path: string): string {
  const match = body.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : path
}

function summaryOf(body: string): string {
  const lines = body.split('\n')
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim()
    if (!line || line.startsWith('#')) continue
    return line.replace(/^>\s*/, '').slice(0, 300)
  }
  return ''
}

export async function getContentIndex(): Promise<IndexedDocument[]> {
  if (indexCache) return indexCache

  const paths = await getAllMarkdownPaths()
  const documents = await Promise.all(paths.map((path) => getMarkdownDocument(path)))

  indexCache = documents.flatMap((document, position) => {
    if (!document) return []
    const path = paths[position]
    return [
      {
        path,
        url: `${siteConfig.url}${path}`,
        title: titleOf(document.body, path),
        summary: summaryOf(document.body),
        section: sectionFor(path),
        body: document.body,
      },
    ]
  })

  return indexCache
}

/** Strips Markdown syntax so a snippet reads as prose. */
function plain(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function snippetAround(body: string, terms: string[]): string {
  const haystack = body.toLowerCase()

  let position = -1
  for (const term of terms) {
    const found = haystack.indexOf(term)
    if (found >= 0 && (position === -1 || found < position)) position = found
  }

  if (position === -1) return plain(body).slice(0, 240)

  const start = Math.max(0, position - 120)
  return `${start > 0 ? '…' : ''}${plain(body.slice(start, start + 320))}…`
}

export type SearchHit = {
  title: string
  url: string
  path: string
  section: string
  snippet: string
  score: number
}

export async function searchContent(
  query: string,
  { limit = 8, section }: { limit?: number; section?: string } = {},
): Promise<SearchHit[]> {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9+#.-]+/)
    .filter((term) => term.length > 1)

  if (terms.length === 0) return []

  const index = await getContentIndex()
  const hits: SearchHit[] = []

  for (const document of index) {
    if (section && section !== 'all' && document.section !== section) continue

    const title = document.title.toLowerCase()
    const body = document.body.toLowerCase()
    const summary = document.summary.toLowerCase()

    let score = 0
    for (const term of terms) {
      if (title.includes(term)) score += 12
      if (summary.includes(term)) score += 5
      score += Math.min(body.split(term).length - 1, 10)
    }

    if (score === 0) continue

    hits.push({
      title: document.title,
      url: document.url,
      path: document.path,
      section: document.section,
      snippet: snippetAround(document.body, terms),
      score,
    })
  }

  hits.sort((a, b) => b.score - a.score)
  return hits.slice(0, Math.min(Math.max(limit, 1), 25))
}

export async function getPage(path: string): Promise<{ path: string; url: string; markdown: string } | null> {
  const normalized = normalizePath(path.startsWith('http') ? new URL(path).pathname : path)
  const document = await getMarkdownDocument(normalized)
  if (!document) return null

  return {
    path: normalized,
    url: `${siteConfig.url}${normalized}`,
    markdown: document.body,
  }
}

export async function listContent(section: string): Promise<Array<Omit<IndexedDocument, 'body'>>> {
  const index = await getContentIndex()

  return index.flatMap(({ body: _body, ...rest }) =>
    section === 'all' || rest.section === section ? [rest] : [],
  )
}
