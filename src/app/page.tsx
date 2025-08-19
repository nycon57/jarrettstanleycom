import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heading, Text } from '@/components/ui/typography'
import { HeroSection } from '@/components/sections/hero-section'
import { CredibilityBar } from '@/components/sections/credibility-bar'
import { BridgingGapSection } from '@/components/sections/bridging-gap-section'
import { ServicesShowcase } from '@/components/sections/services-showcase'
import { LatestInsights } from '@/components/sections/latest-insights'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
import { CtaSection } from '@/components/sections/cta-section'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { getBlogPosts } from '@/app/actions/blog'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Jarrett Stanley | AI Mortgage Marketing Expert & Strategic Advisor',
  description: 'Proven AI marketing strategies that generated $500M+ in loan originations. Strategic advisor and keynote speaker transforming the mortgage industry through artificial intelligence.',
  keywords: ['AI mortgage marketing expert', 'mortgage marketing consultant', 'mortgage digital transformation', 'AI lending strategies', 'mortgage technology keynote speaker', 'Jarrett Stanley'],
  canonical: '/',
  ogImage: '/assets/images/jarrett-stanley-homepage-og.jpg'
})

export default function HomePage() {
  // TODO: Fetch blog posts client-side or through props
  const posts: any[] = []

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section with Animated Background */}
      <HeroSection />
      
      {/* Credibility Bar */}
      <CredibilityBar />

      {/* Bridging the Gap Section */}
      <BridgingGapSection />

      {/* Services Showcase */}
      <ServicesShowcase />


      {/* Latest Insights Section */}
      <LatestInsights posts={posts} />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <CtaSection />
    </main>
  )
}