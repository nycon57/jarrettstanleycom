import ReactMarkdown from 'react-markdown'
import { getMarkdownDocument, stripDocFooter } from '@/lib/agent/markdown'

/**
 * Renders a legal page from the same Markdown source that /privacy.md and
 * /terms.md serve, so the human and agent representations can never drift.
 */
export async function LegalPage({
  path,
  effectiveDate,
}: {
  path: string
  effectiveDate: string
}) {
  const document = await getMarkdownDocument(path)

  if (!document) return null

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="mb-6 text-sm uppercase tracking-widest text-lilac">
          Effective {effectiveDate}
        </p>
        <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-signal prose-h1:text-4xl prose-h2:mt-12 prose-h2:text-2xl prose-a:text-lilac prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown>{stripDocFooter(document.body)}</ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
