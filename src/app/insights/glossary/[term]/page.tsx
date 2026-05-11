import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllGlossaryTerms,
  getGlossaryTerm,
  getRelatedGlossaryTerms,
  buildGlossaryBreadcrumbs,
} from '@/lib/pseo'
import {
  generateMetadata as generateSEOMetadata,
  generateDefinedTermSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { GlossaryTermPage } from '@/components/pseo/glossary-term-page'
import { CtaSection } from '@/components/sections/cta-section'

interface PageProps {
  params: Promise<{ term: string }>
}

export async function generateStaticParams() {
  const terms = await getAllGlossaryTerms()
  return terms.map((t) => ({ term: t.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { term: slug } = await params
  const term = await getGlossaryTerm(slug)
  if (!term) return {}

  return generateSEOMetadata({
    title: term.seo.title,
    description: term.seo.description,
    keywords: term.seo.keywords,
    canonical: `/insights/glossary/${term.slug}`,
  })
}

export default async function GlossaryTermDetailPage({ params }: PageProps) {
  const { term: slug } = await params
  const term = await getGlossaryTerm(slug)

  if (!term) {
    notFound()
  }

  const relatedTerms = await getRelatedGlossaryTerms(term.relatedTerms)
  const breadcrumbs = buildGlossaryBreadcrumbs(term)

  const structuredData = generateStructuredData([
    generateDefinedTermSchema({
      term: term.term,
      definition: term.shortDefinition,
      url: `${siteConfig.url}/insights/glossary/${term.slug}`,
      category: term.category,
    }),
    generateFAQSchema(term.faqs),
    generateBreadcrumbSchema(
      breadcrumbs.map((item) => ({
        name: item.name,
        url: `${siteConfig.url}${item.href}`,
      }))
    ),
  ])

  return (
    <article className="min-h-screen bg-background">
      <script
        type="application/ld+json"
      >
        {structuredData}
      </script>
      <GlossaryTermPage
        term={term}
        relatedTerms={relatedTerms}
        breadcrumbs={breadcrumbs}
      />
      {/* Newsletter CTA */}
      <div className="mt-8">
        <CtaSection variant="compact" />
      </div>
    </article>
  )
}
