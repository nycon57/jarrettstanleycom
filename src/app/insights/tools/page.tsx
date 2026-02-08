import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Wrench } from 'lucide-react'
import { getAllToolRoundups, buildToolBreadcrumbs } from '@/lib/pseo'
import { generateMetadata as genMeta, generateCollectionPageSchema, generateBreadcrumbSchema, generateStructuredData, siteConfig } from '@/lib/seo'
import { toolCategoryLabels } from '@/types/pseo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { CtaSection } from '@/components/sections/cta-section'

export async function generateMetadata(): Promise<Metadata> {
  return genMeta({
    title: 'AI Tools for Mortgage Marketing',
    description: 'Expert-reviewed tools and platforms for mortgage marketing. Compare AI-powered solutions for email, lead generation, CRM, analytics, automation, and more.',
    keywords: ['mortgage marketing tools', 'AI tools mortgage', 'mortgage technology', 'marketing platforms mortgage'],
    canonical: '/insights/tools',
  })
}

export default async function ToolsIndexPage() {
  const roundups = await getAllToolRoundups()
  const breadcrumbs = buildToolBreadcrumbs()

  const structuredData = generateStructuredData([
    generateCollectionPageSchema({
      name: 'AI Tools for Mortgage Marketing',
      description: 'Expert-reviewed tools and platforms for mortgage marketing. Compare AI-powered solutions for email, lead generation, CRM, analytics, automation, and more.',
      url: `${siteConfig.url}/insights/tools`,
    }),
    generateBreadcrumbSchema(
      breadcrumbs.map((b) => ({ name: b.name, url: `${siteConfig.url}${b.href}` }))
    ),
  ])

  // Group roundups by category
  const categories = Array.from(new Set(roundups.map((r) => r.category)))

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 via-transparent to-orchid/5" />
        <div className="container relative mx-auto px-4">
          <PseoBreadcrumbs items={breadcrumbs} />
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-lilac/10 to-orchid/10 border border-lilac/20">
                <Wrench className="h-6 w-6 text-lilac" />
              </div>
              <Badge variant="gradient-subtle" size="md">
                {roundups.length} Tool Roundups
              </Badge>
            </div>
            <h1 className="font-signal text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              AI Tools for{' '}
              <span className="bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent">
                Mortgage Marketing
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Expert-reviewed tools and platforms for every aspect of mortgage marketing.
              Each roundup includes hands-on evaluation, honest pros and cons, and
              specific recommendations for mortgage industry use cases.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium border border-border hover:border-lilac/30 hover:bg-lilac/5 transition-all duration-200"
              >
                {toolCategoryLabels[cat]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Roundup Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roundups.map((roundup) => (
              <Link
                key={roundup.slug}
                href={`/insights/tools/${roundup.slug}`}
                className="group block"
                id={`${roundup.category}-${roundup.slug}`}
              >
                <Card variant="interactive" className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="skyward" size="sm">
                        {toolCategoryLabels[roundup.category]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {roundup.tools.length} tools reviewed
                      </span>
                    </div>
                    <h2 className="font-signal text-lg font-semibold group-hover:text-lilac transition-colors leading-snug">
                      {roundup.title}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {roundup.introduction.split('\n')[0]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {roundup.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool.name}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {tool.name}
                        </span>
                      ))}
                      {roundup.tools.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          +{roundup.tools.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-sm font-medium text-lilac">
                      View comparison
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection variant="compact" />
    </div>
  )
}
