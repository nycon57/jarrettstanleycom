import Link from 'next/link'
import { homeFaqs } from '@/lib/home-faqs'

/**
 * Homepage FAQ. Answers are rendered in full rather than behind a disclosure so
 * that readers, search engines, and agents all see the same text in the HTML.
 */
export function HomeFaq() {
  return (
    <section className="relative py-24" aria-labelledby="home-faq-heading">
      <div className="container relative">
        <div className="mx-auto max-w-3xl">
          <h2
            id="home-faq-heading"
            className="text-3xl font-semibold text-foreground lg:text-4xl font-signal"
          >
            Questions people ask
          </h2>
          <p className="mt-4 text-muted-foreground lg:text-lg">
            Everything below is what you would hear on a first call.{' '}
            <Link href="/contact" className="text-lilac hover:underline">
              Ask something else
            </Link>
            .
          </p>

          <dl className="mt-12 divide-y divide-border border-t border-border">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="py-8">
                <dt className="text-lg font-semibold text-foreground font-signal">{faq.question}</dt>
                <dd className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
