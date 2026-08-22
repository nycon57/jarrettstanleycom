import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, CheckCircle, XCircle, Trophy, ExternalLink, Star } from 'lucide-react'
import { getAllToolRoundups, getToolRoundup, buildToolBreadcrumbs } from '@/lib/pseo'
import {
  generateMetadata as genMeta,
  generateItemListSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { toolCategoryLabels, pricingTierLabels } from '@/types/pseo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { FAQSection } from '@/components/pseo/faq-section'
import { RelatedContent } from '@/components/pseo/related-content'
import { PseoCtaBanner } from '@/components/pseo/pseo-cta-banner'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CtaSection } from '@/components/sections/cta-section'
import { formatDateLabel } from '@/lib/date-format'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const roundups = await getAllToolRoundups()
  return roundups.map((r) => ({ category: r.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const roundup = await getToolRoundup(category)
  if (!roundup) return {}

  return genMeta({
    title: roundup.seo.title,
    description: roundup.seo.description,
    keywords: roundup.seo.keywords,
    canonical: `/insights/tools/${roundup.slug}`,
    modifiedTime: roundup.lastUpdated,
  })
}

export default async function ToolRoundupPage({ params }: PageProps) {
  const { category } = await params
  const roundup = await getToolRoundup(category)

  if (!roundup) {
    notFound()
  }

  const breadcrumbs = buildToolBreadcrumbs(roundup)
  const lastUpdatedLabel = formatDateLabel(roundup.lastUpdated, 'MMMM d, yyyy')

  const structuredData = generateStructuredData([
    generateItemListSchema({
      name: roundup.title,
      description: roundup.seo.description,
      url: `${siteConfig.url}/insights/tools/${roundup.slug}`,
      items: roundup.tools.map((tool) => ({
        name: tool.name,
        position: tool.rank,
        url: tool.websiteUrl,
      })),
    }),
    generateFAQSchema(roundup.faqs),
    generateBreadcrumbSchema(
      breadcrumbs.map((b) => ({ name: b.name, url: `${siteConfig.url}${b.href}` }))
    ),
  ])

  const introductionParagraphs = roundup.introduction.split('\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
      >
        {structuredData}
      </script>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 via-transparent to-skyward/5" />
        <div className="container relative mx-auto px-4">
          <PseoBreadcrumbs items={breadcrumbs} />
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="skyward" size="md">
                {toolCategoryLabels[roundup.category]}
              </Badge>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="size-3.5" />
                <span>Updated {lastUpdatedLabel}</span>
              </div>
            </div>
            <h1 className="font-signal text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              {roundup.title}
            </h1>
            <div className="mt-6 gap-y-4 text-muted-foreground leading-relaxed">
              {introductionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Criteria */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <h2 className="font-signal text-xl font-semibold mb-4">How We Evaluated</h2>
          <div className="flex flex-wrap gap-2">
            {roundup.comparisonCriteria.map((criteria) => (
              <Badge
                key={criteria}
                variant="lilac"
                size="sm"
                className="font-normal"
              >
                {criteria}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Ranked Tool List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-10">
            Top {roundup.tools.length} Tools Ranked
          </h2>
          <div className="gap-y-8">
            {roundup.tools.map((tool) => (
              <Card key={tool.name} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lilac/10 to-orchid/10 border border-lilac/20">
                        <span className="font-signal text-xl font-semibold text-lilac">
                          {tool.rank}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-signal text-xl font-semibold">
                          {tool.name}
                        </h3>
                        <p className="mt-1 text-muted-foreground leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={tool.pricingTier === 'free' ? 'success' : tool.pricingTier === 'freemium' ? 'skyward' : tool.pricingTier === 'enterprise' ? 'orchid' : 'lilac'}
                      size="sm"
                      className="shrink-0"
                    >
                      {pricingTierLabels[tool.pricingTier]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Pros */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                        <CheckCircle className="size-4 text-skyward" />
                        Pros
                      </h4>
                      <ul className="gap-y-2">
                        {tool.pros.map((pro) => (
                          <li
                            key={pro}
                            className="text-sm text-muted-foreground leading-relaxed pl-5 relative before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-skyward/50"
                          >
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Cons */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                        <XCircle className="size-4 text-orchid" />
                        Cons
                      </h4>
                      <ul className="gap-y-2">
                        {tool.cons.map((con) => (
                          <li
                            key={con}
                            className="text-sm text-muted-foreground leading-relaxed pl-5 relative before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-orchid/50"
                          >
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Best For + Link */}
                  <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <Star className="size-4 text-lilac shrink-0 mt-0.5" />
                      <p className="text-sm">
                        <span className="font-semibold">Best for:</span>{' '}
                        <span className="text-muted-foreground">{tool.bestFor}</span>
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        Visit Website
                        <ExternalLink className="ml-1.5 size-3.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-8">
            Our Recommendations
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {roundup.recommendations.map((rec) => (
              <Card key={rec.useCase} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-lilac to-orchid">
                      <Trophy className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-lilac mb-1">
                        {rec.useCase}
                      </p>
                      <h3 className="font-signal text-lg font-semibold">
                        {rec.toolName}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="container mx-auto px-4">
        <FAQSection faqs={roundup.faqs} />
      </div>

      {/* Related Content */}
      <div className="container mx-auto px-4">
        <RelatedContent links={roundup.relatedContent} />
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-4">
        <PseoCtaBanner
          heading="Need Help Choosing the Right Tools?"
          description="Book a strategy session to get personalized recommendations for your mortgage marketing tech stack."
          buttonText="Book a Strategy Session"
          buttonHref="/services/consulting"
        />
      </div>

      {/* Newsletter CTA */}
      <CtaSection variant="compact" />
    </div>
  )
}
