import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FAQSection } from '@/components/pseo/faq-section'
import { RelatedContent } from '@/components/pseo/related-content'
import { PseoCtaBanner } from '@/components/pseo/pseo-cta-banner'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import type { GlossaryTerm } from '@/types/pseo'
import { glossaryCategoryLabels } from '@/types/pseo'
import type { BreadcrumbItem } from '@/lib/pseo'

interface GlossaryTermPageProps {
  term: GlossaryTerm
  relatedTerms: GlossaryTerm[]
  breadcrumbs: BreadcrumbItem[]
}

export function GlossaryTermPage({ term, relatedTerms, breadcrumbs }: GlossaryTermPageProps) {
  return (
    <div>
      {/* Breadcrumbs */}
      <section className="pt-32 pb-4">
        <div className="container max-w-4xl">
          <PseoBreadcrumbs items={breadcrumbs} />
        </div>
      </section>

      {/* Hero */}
      <section className="pb-12">
        <div className="container max-w-4xl">
          <Badge variant="lilac" className="mb-4">
            {glossaryCategoryLabels[term.category]}
          </Badge>
          <h1 className="font-signal text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            <span className="text-lilac">
              {term.term}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {term.shortDefinition}
          </p>
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="pb-12">
        <div className="container max-w-4xl">
          <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-6">
            What Is {term.term}?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {term.detailedExplanation.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="text-base text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Context */}
      <section className="pb-12">
        <div className="container max-w-4xl">
          <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-6">
            Why This Matters in Mortgage Marketing
          </h2>
          <div className="relative rounded-2xl bg-gradient-to-br from-lilac/5 via-orchid/5 to-skyward/5 border border-lilac/10 p-6 md:p-8">
            {term.industryContext.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="text-base text-muted-foreground leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="pb-12">
        <div className="container max-w-4xl">
          <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-6">
            {term.term} in Action
          </h2>
          <div className="grid gap-4 md:grid-cols-1">
            {term.examples.map((example) => (
              <Card key={example.title} variant="elevated">
                <CardContent className="pt-6">
                  <h3 className="font-signal text-lg font-semibold mb-3">
                    {example.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {example.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <section className="pb-12">
          <div className="container max-w-4xl">
            <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-6">
              Related Terms
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/glossary/${related.slug}`}
                  className="group"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer px-4 py-2 text-sm transition-all hover:border-lilac/50 hover:bg-lilac/5 hover:text-lilac"
                  >
                    {related.term}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <div className="container max-w-4xl">
        <FAQSection faqs={term.faqs} />
      </div>

      {/* Related Content */}
      <div className="container max-w-4xl">
        <RelatedContent links={term.relatedContent} />
      </div>

      {/* CTA Banner */}
      <div className="container max-w-4xl">
        <PseoCtaBanner
          heading={`Want Help Implementing ${term.term}?`}
          description={`Book a strategy session to discuss how ${term.term.toLowerCase()} can transform your mortgage marketing results.`}
          buttonText="Book a Strategy Session"
          buttonHref="/services/consulting"
        />
      </div>
    </div>
  )
}
