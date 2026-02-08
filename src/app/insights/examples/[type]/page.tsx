import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CheckCircle, BarChart3 } from 'lucide-react'
import {
  getAllCampaignExamples,
  getCampaignExample,
  buildExampleBreadcrumbs,
} from '@/lib/pseo'
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { FAQSection } from '@/components/pseo/faq-section'
import { RelatedContent } from '@/components/pseo/related-content'
import { PseoCtaBanner } from '@/components/pseo/pseo-cta-banner'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { exampleTypeLabels } from '@/types/pseo'
import type { ExampleType } from '@/types/pseo'
import { CtaSection } from '@/components/sections/cta-section'

interface PageProps {
  params: Promise<{ type: string }>
}

export async function generateStaticParams() {
  const examples = await getAllCampaignExamples()
  return examples.map((example) => ({ type: example.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params
  const example = await getCampaignExample(type)
  if (!example) return {}

  return genMeta({
    title: example.seo.title,
    description: example.seo.description,
    keywords: example.seo.keywords,
    canonical: `/insights/examples/${example.slug}`,
  })
}

const typeBadgeVariant: Record<ExampleType, 'lilac' | 'orchid' | 'skyward' | 'lavender'> = {
  'email-campaigns': 'lilac',
  'social-media': 'orchid',
  'content-marketing': 'skyward',
  'lead-nurturing': 'lavender',
  'retargeting': 'lilac',
  'personalization': 'orchid',
  'video-marketing': 'skyward',
  'seo-content': 'lavender',
}

export default async function ExampleDetailPage({ params }: PageProps) {
  const { type } = await params
  const example = await getCampaignExample(type)

  if (!example) {
    notFound()
  }

  const breadcrumbs = buildExampleBreadcrumbs(example)

  const faqSchema = generateFAQSchema(example.faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((b) => ({ name: b.name, url: `${siteConfig.url}${b.href}` }))
  )

  // Safe: generateStructuredData only serializes our own schema objects, not user input
  const structuredData = generateStructuredData([faqSchema, breadcrumbSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <div className="container max-w-4xl pt-24 md:pt-28 pb-12 md:pb-16">
        <PseoBreadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="mb-12">
          <div className="mb-4">
            <Badge variant={typeBadgeVariant[example.exampleType]} size="sm">
              {exampleTypeLabels[example.exampleType]}
            </Badge>
          </div>
          <h1 className="font-signal text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {example.title}
          </h1>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {example.introduction.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Campaign Examples */}
        <section className="mb-16">
          <h2 className="font-signal text-2xl md:text-3xl font-bold mb-8">
            Campaign Examples
          </h2>
          <div className="space-y-8">
            {example.examples.filter((entry) => !entry.isReal).map((entry, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <h3 className="font-signal text-xl font-semibold leading-snug">
                    {entry.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    {entry.description.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {/* Metrics */}
                  {entry.metrics && Object.keys(entry.metrics).length > 0 && (
                    <div className="rounded-xl bg-gradient-to-br from-lilac/5 via-orchid/5 to-skyward/5 border border-lilac/10 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="h-4 w-4 text-lilac" />
                        <span className="text-sm font-semibold">Key Metrics</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(entry.metrics).map(([label, value]) => (
                          <div key={label}>
                            <div className="text-lg font-bold text-lilac">{value}</div>
                            <div className="text-xs text-muted-foreground">{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why It Works */}
                  <div>
                    <h4 className="font-signal text-base font-semibold mb-2">Why It Works</h4>
                    <div className="text-muted-foreground leading-relaxed space-y-3">
                      {entry.whyItWorks.split('\n\n').map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div>
                    <h4 className="font-signal text-base font-semibold mb-2">Key Takeaways</h4>
                    <ul className="space-y-2">
                      {entry.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-lilac mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Analysis */}
        <section className="mb-16">
          <h2 className="font-signal text-2xl md:text-3xl font-bold mb-6">
            What Makes These Work
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {example.analysis.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* How to Replicate */}
        <section className="mb-16">
          <h2 className="font-signal text-2xl md:text-3xl font-bold mb-8">
            How to Replicate These Results
          </h2>
          <div className="space-y-6">
            {example.howToReplicate.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-lilac to-orchid flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-signal text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={example.faqs} />

        {/* Related Content */}
        <RelatedContent links={example.relatedContent} />

        {/* CTA Banner */}
        <PseoCtaBanner
          heading="Want Campaign Results Like These?"
          description="Book a strategy session to learn how AI-powered marketing can transform your mortgage company's lead generation and conversion."
          buttonText="Book a Strategy Session"
          buttonHref="/services/consulting"
        />
      </div>

      {/* Newsletter CTA */}
      <CtaSection variant="compact" />
    </>
  )
}
