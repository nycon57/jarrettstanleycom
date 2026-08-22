/**
 * RFC 9110 Accept-header negotiation between the HTML and Markdown
 * representations of a page. Used by the proxy (src/proxy.ts) so agents that
 * send `Accept: text/markdown` get clean Markdown from the canonical URL.
 *
 * See https://acceptmarkdown.com for the convention this implements.
 */

export const HTML_TYPE = 'text/html'
export const MARKDOWN_TYPE = 'text/markdown'

/** Representations this site can produce, in server-preference order. */
export const PRODUCES = [HTML_TYPE, MARKDOWN_TYPE] as const

type AcceptEntry = { type: string; q: number; specificity: number }

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((raw) => {
      const parts = raw.trim().split(';').map((part) => part.trim())
      const type = parts[0].toLowerCase()
      let q = 1

      for (const param of parts.slice(1)) {
        const [name, value] = param.split('=').map((piece) => piece.trim())
        if (name?.toLowerCase() === 'q') {
          const parsed = Number(value)
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed))
        }
      }

      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2
      return { type, q, specificity }
    })
    .filter((entry) => entry.type.length > 0)
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === '*/*') return true
  if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1))
  return entry.type === candidate
}

/**
 * Returns the media type to serve, or null when the client explicitly rejects
 * everything this site produces (the only case that warrants a 406).
 */
export function preferredType(header: string | null): string | null {
  if (!header || header.trim().length === 0) return HTML_TYPE

  const entries = parseAccept(header)
  if (entries.length === 0) return HTML_TYPE

  let bestType: string | null = null
  let bestQ = -1
  let bestPosition = Number.POSITIVE_INFINITY

  for (const candidate of PRODUCES) {
    // RFC 9110 §12.5.1: the most specific matching range wins regardless of q,
    // so `text/html;q=0, */*` still rejects HTML.
    let matched: AcceptEntry | null = null
    let matchedPosition = Number.POSITIVE_INFINITY

    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index]
      if (!matches(entry, candidate)) continue
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && index < matchedPosition)
      ) {
        matched = entry
        matchedPosition = index
      }
    }

    if (matched === null || matched.q <= 0) continue

    // Highest q wins across candidates; ties break on client order so
    // `Accept: text/markdown, text/html` picks Markdown.
    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q
      bestPosition = matchedPosition
      bestType = candidate
    }
  }

  return bestType
}

/** Adds `Accept` to an existing Vary header without dropping what is there. */
export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get('Vary')

  if (!existing) {
    headers.set('Vary', 'Accept')
    return
  }

  const tokens = existing.split(',').map((token) => token.trim().toLowerCase())
  if (tokens.includes('*') || tokens.includes('accept')) return

  headers.set('Vary', `${existing}, Accept`)
}
