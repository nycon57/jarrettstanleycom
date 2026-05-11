import { Metadata } from 'next'
import { getAllGlossaryTerms, getGlossaryAlphabetMap, buildGlossaryBreadcrumbs } from '@/lib/pseo'
import {
  generateMetadata as generateSEOMetadata,
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { GlossaryIndexClient } from '@/components/pseo/glossary-index-page'
import { CtaSection } from '@/components/sections/cta-section'

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: 'AI Mortgage Marketing Glossary',
    description:
      'Comprehensive glossary of AI and mortgage marketing terms. Learn about machine learning, lead scoring, marketing automation, and more in the context of mortgage lending.',
    keywords: [
      'AI mortgage glossary',
      'mortgage marketing terms',
      'AI marketing definitions',
      'mortgage technology glossary',
    ],
    canonical: '/insights/glossary',
  })
}

export default async function GlossaryIndexPage() {
  const terms = await getAllGlossaryTerms()
  const alphabetMap = getGlossaryAlphabetMap(terms)
  const breadcrumbs = buildGlossaryBreadcrumbs()

  // Structured data is generated from our own static content (not user input)
  const structuredData = generateStructuredData([
    generateCollectionPageSchema({
      name: 'AI Mortgage Marketing Glossary',
      description:
        'Comprehensive glossary of AI and mortgage marketing terms with detailed definitions, examples, and industry context.',
      url: `${siteConfig.url}/insights/glossary`,
    }),
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

      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container max-w-6xl">
          <PseoBreadcrumbs items={breadcrumbs} />

          <h1 className="font-signal text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
            AI Mortgage Marketing{' '}
            <span className="text-lilac">
              Glossary
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Your comprehensive guide to AI, marketing automation, and data-driven
            strategies in mortgage lending. Each term includes practical examples
            and industry context from real mortgage marketing experience.
          </p>
        </div>
      </section>

      {/* Glossary Content */}
      <section className="pb-16">
        <div className="container max-w-6xl">
          <GlossaryIndexClient terms={terms} alphabetMap={alphabetMap} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <CtaSection variant="compact" />
    </article>
  )
}
