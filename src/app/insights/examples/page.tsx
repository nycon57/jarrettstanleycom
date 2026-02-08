import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllCampaignExamples, buildExampleBreadcrumbs } from '@/lib/pseo'
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { exampleTypeLabels } from '@/types/pseo'
import type { ExampleType } from '@/types/pseo'

export async function generateMetadata(): Promise<Metadata> {
  return genMeta({
    title: 'AI Marketing Campaign Examples for Mortgage Companies',
    description:
      'Browse real-world and scenario-based AI marketing campaign examples for the mortgage industry. Email, social media, content, retargeting, and more.',
    keywords: [
      'AI marketing examples mortgage',
      'mortgage marketing campaign examples',
      'AI campaign examples',
    ],
    canonical: '/insights/examples',
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

export default async function ExamplesIndexPage() {
  const examples = await getAllCampaignExamples()
  const breadcrumbs = buildExampleBreadcrumbs()

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((b) => ({ name: b.name, url: `${siteConfig.url}${b.href}` }))
  )
  const collectionSchema = generateCollectionPageSchema({
    name: 'AI Marketing Campaign Examples for Mortgage Companies',
    description:
      'Browse real-world and scenario-based AI marketing campaign examples for the mortgage industry.',
    url: `${siteConfig.url}/insights/examples`,
  })

  const structuredData = generateStructuredData([collectionSchema, breadcrumbSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <div className="container max-w-6xl pt-24 md:pt-28 pb-12 md:pb-16">
        <PseoBreadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <h1 className="font-signal text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            AI Marketing Campaign{' '}
            <span className="bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent">
              Examples
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore real-world and scenario-based examples of AI-powered marketing campaigns in the
            mortgage industry. Each page includes detailed analysis, specific metrics, and
            step-by-step guides to replicate the results.
          </p>
        </div>

        {/* Example Type Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Object.entries(exampleTypeLabels).map(([type, label]) => {
            const count = examples.filter((e) => e.exampleType === type).length
            if (count === 0) return null
            return (
              <Badge key={type} variant={typeBadgeVariant[type as ExampleType]} size="sm">
                {label} ({count})
              </Badge>
            )
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Link
              key={example.slug}
              href={`/insights/examples/${example.slug}`}
              className="group block"
            >
              <Card variant="interactive" className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge
                      variant={typeBadgeVariant[example.exampleType]}
                      size="sm"
                    >
                      {exampleTypeLabels[example.exampleType]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {example.examples.length} examples
                    </span>
                  </div>
                  <h2 className="font-signal text-lg font-semibold group-hover:text-lilac transition-colors leading-snug">
                    {example.title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {example.introduction.slice(0, 200)}...
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-lilac">
                    View examples
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
