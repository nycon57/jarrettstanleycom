import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'
import { getAllPersonas } from '@/lib/pseo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { PseoCtaBanner } from '@/components/pseo/pseo-cta-banner'
import { buildPersonaBreadcrumbs } from '@/lib/pseo'
import {
  generateMetadata as genMeta,
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { Heading, Text } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export const metadata: Metadata = genMeta({
  title: 'AI Marketing Solutions by Role',
  description:
    'Discover how AI-powered mortgage marketing strategies apply to your specific role. Solutions tailored for CMOs, loan officers, branch managers, and more.',
  keywords: [
    'AI mortgage marketing solutions',
    'mortgage marketing by role',
    'AI marketing personas',
    'mortgage industry AI solutions',
  ],
  canonical: '/solutions',
})

export default async function SolutionsIndexPage() {
  const personas = await getAllPersonas()
  const breadcrumbs = buildPersonaBreadcrumbs()

  const schemas = [
    generateCollectionPageSchema({
      name: 'AI Marketing Solutions by Role',
      description:
        'AI-powered mortgage marketing strategies tailored to your specific role and challenges.',
      url: `${siteConfig.url}/solutions`,
    }),
    generateBreadcrumbSchema(
      breadcrumbs.map((b) => ({ name: b.name, url: `${siteConfig.url}${b.href}` }))
    ),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData(schemas)}
      />

      <div className="container max-w-6xl pt-24 md:pt-28 pb-12 md:pb-16">
        <PseoBreadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <Heading variant="h1" color="gradient" className="mb-4">
            AI Marketing Solutions by Role
          </Heading>
          <Text variant="large" color="muted" className="max-w-2xl">
            Every role in the mortgage industry faces unique challenges. Discover
            how AI-powered marketing strategies address the specific pain points,
            opportunities, and goals for your position.
          </Text>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {personas.map((persona) => (
            <Link
              key={persona.slug}
              href={`/solutions/${persona.slug}`}
              className="group block"
            >
              <Card variant="interactive" className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-lilac/10 to-orchid/10 border border-lilac/20 flex items-center justify-center">
                      <Users className="h-4.5 w-4.5 text-lilac" />
                    </div>
                    <Badge variant="orchid" size="sm">
                      {persona.painPoints.length} Pain Points
                    </Badge>
                  </div>
                  <h2 className="font-signal text-lg font-semibold group-hover:text-lilac transition-colors leading-snug">
                    {persona.personaName}
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {persona.personaDescription}
                  </p>
                  <div className="text-xs text-muted-foreground mb-4 p-3 rounded-lg bg-muted/50">
                    <span className="font-medium text-foreground">
                      Top challenge:
                    </span>{' '}
                    {persona.painPoints[0]?.title}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-lilac">
                    View solutions
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <PseoCtaBanner
          heading="Not Sure Where to Start?"
          description="Every AI marketing strategy starts with understanding your specific role, challenges, and goals. Let's have a conversation about where AI can make the biggest impact for you."
          buttonText="Schedule a Consultation"
          buttonHref="/services/consulting"
        />
      </div>
    </>
  )
}
