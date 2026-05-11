import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Target,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Shield,
  AlertTriangle,
} from 'lucide-react'
import { getAllPersonas, getPersona, buildPersonaBreadcrumbs } from '@/lib/pseo'
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { FAQSection } from '@/components/pseo/faq-section'
import { RelatedContent } from '@/components/pseo/related-content'
import { PseoCtaBanner } from '@/components/pseo/pseo-cta-banner'
import { Heading, Text } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { CtaSection } from '@/components/sections/cta-section'

const painPointIcons = [AlertTriangle, Target, Shield, Zap, BarChart3]
const solutionIcons = [Zap, Lightbulb, TrendingUp, Target, BarChart3]

interface PageProps {
  params: Promise<{ 'persona-slug': string }>
}

export async function generateStaticParams() {
  const personas = await getAllPersonas()
  return personas.map((p) => ({ 'persona-slug': p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'persona-slug': slug } = await params
  const persona = await getPersona(slug)
  if (!persona) return {}

  return genMeta({
    title: persona.seo.title,
    description: persona.seo.description,
    keywords: persona.seo.keywords,
    canonical: `/solutions/${persona.slug}`,
  })
}

export default async function PersonaDetailPage({ params }: PageProps) {
  const { 'persona-slug': slug } = await params
  const persona = await getPersona(slug)

  if (!persona) {
    notFound()
  }

  const breadcrumbs = buildPersonaBreadcrumbs(persona)

  const schemas = [
    generateFAQSchema(persona.faqs),
    generateBreadcrumbSchema(
      breadcrumbs.map((b) => ({ name: b.name, url: `${siteConfig.url}${b.href}` }))
    ),
  ]

  return (
    <>
      <script
        type="application/ld+json"
      >
        {generateStructuredData(schemas)}
      </script>

      <div className="container max-w-5xl pt-24 md:pt-28 pb-12 md:pb-16">
        <PseoBreadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section className="mb-16">
          <Badge variant="gradient-subtle" size="md" className="mb-4">
            AI Solutions for {persona.personaName}
          </Badge>
          <Heading variant="h1" color="gradient" className="mb-5">
            {persona.title}
          </Heading>
          <Text variant="large" color="muted" className="max-w-3xl mb-8">
            {persona.personaDescription}
          </Text>
          <Button
            asChild
            className="bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90 text-white px-8 py-3 h-auto text-base font-medium rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/services/consulting">
              Discuss Your Strategy
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </section>

        {/* Pain Points Section */}
        <section className="mb-16">
          <Heading variant="h2" as="h2" className="mb-2">
            The Challenges You Face
          </Heading>
          <Text color="muted" className="mb-8 max-w-2xl">
            These are the obstacles that keep {persona.personaName.toLowerCase()}{' '}
            from reaching their full potential in today&apos;s market.
          </Text>
          <div className="grid gap-5 sm:grid-cols-2">
            {persona.painPoints.map((point, index) => {
              const Icon = painPointIcons[index % painPointIcons.length]
              return (
                <Card key={point.title} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 size-9 shrink-0 rounded-lg bg-orchid/10 border border-orchid/20 flex items-center justify-center">
                        <Icon className="size-[1.125rem] text-orchid" />
                      </div>
                      <h3 className="font-signal text-base font-semibold leading-snug">
                        {point.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* AI Solutions Section */}
        <section className="mb-16">
          <Heading variant="h2" as="h2" className="mb-2">
            How AI Solves This
          </Heading>
          <Text color="muted" className="mb-8 max-w-2xl">
            Proven AI-powered strategies that address these challenges head-on,
            with measurable results.
          </Text>
          <div className="grid gap-5 sm:grid-cols-2">
            {persona.aiSolutions.map((solution, index) => {
              const Icon = solutionIcons[index % solutionIcons.length]
              return (
                <Card key={solution.title} className="h-full border-lilac/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 size-9 shrink-0 rounded-lg bg-gradient-to-br from-lilac/10 to-orchid/10 border border-lilac/20 flex items-center justify-center">
                        <Icon className="size-[1.125rem] text-lilac" />
                      </div>
                      <h3 className="font-signal text-base font-semibold leading-snug">
                        {solution.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {solution.description}
                    </p>
                    <Badge variant="skyward" size="sm">
                      {solution.impactMetric}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <Heading variant="h2" as="h2" className="mb-2">
            Real-World Use Cases
          </Heading>
          <Text color="muted" className="mb-8 max-w-2xl">
            How these strategies play out in practice, drawn from real
            implementations.
          </Text>
          <div className="gap-y-6">
            {persona.useCases.map((useCase) => (
              <Card key={useCase.title} className="overflow-hidden">
                <div className="md:flex">
                  <div className="flex-1 p-6">
                    <h3 className="font-signal text-lg font-semibold mb-3">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                  <div className="md:w-72 shrink-0 bg-gradient-to-br from-lilac/5 to-orchid/5 border-t md:border-t-0 md:border-l border-border p-6 flex flex-col justify-center">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Outcome
                    </span>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {useCase.outcome}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <Heading variant="h2" as="h2" className="mb-2">
            The Benefits
          </Heading>
          <Text color="muted" className="mb-8 max-w-2xl">
            Measurable advantages that AI marketing delivers for{' '}
            {persona.personaName.toLowerCase()}.
          </Text>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {persona.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-5 rounded-xl border border-border hover:border-lilac/20 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="size-5 text-lilac shrink-0" />
                  <h3 className="font-signal text-base font-semibold">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {benefit.description}
                </p>
                {benefit.metric && (
                  <Badge variant="lilac" size="sm">
                    {benefit.metric}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={persona.faqs} />

        {/* Persona-Specific CTA */}
        <PseoCtaBanner
          heading={persona.ctaHeading}
          description={persona.ctaDescription}
          buttonText="Get Started"
          buttonHref="/services/consulting"
        />

        {/* Related Content */}
        <RelatedContent links={persona.relatedContent} />

        {/* Newsletter CTA */}
        <CtaSection variant="compact" />
      </div>
    </>
  )
}
