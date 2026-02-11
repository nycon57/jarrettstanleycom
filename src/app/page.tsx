import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'

import { BridgingGapSection } from '@/components/sections/bridging-gap-section'
import { ServicesShowcase } from '@/components/sections/services-showcase'
import { LatestInsights } from '@/components/sections/latest-insights'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
import { CtaSection } from '@/components/sections/cta-section'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { getAllBlogPosts, toTransformedPost } from '@/lib/blog'
import type { BlogPost } from '@/lib/supabase'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Jarrett Stanley | AI Mortgage Marketing Speaker & Strategic Advisor',
  description: 'CMO at Nationwide Mortgage Bankers and CEO of TrueTone AI. Keynote speaker and strategic advisor helping mortgage companies build AI-powered marketing that scales.',
  keywords: ['AI mortgage marketing expert', 'mortgage marketing consultant', 'mortgage marketing keynote speaker', 'AI lending strategies', 'Jarrett Stanley'],
  canonical: '/',
})

export default async function HomePage() {
  const allPosts = await getAllBlogPosts()
  const posts: BlogPost[] = allPosts.slice(0, 6).map((post) => {
    const transformed = toTransformedPost(post)
    return {
      ...transformed,
      content: '',
      is_published: true,
      created_at: post.publishedAt,
      updated_at: post.publishedAt,
    } as BlogPost
  })

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section with Animated Background */}
      <HeroSection />

      {/* What You Get When You Work With Me */}
      <BridgingGapSection />

      {/* Three Ways to Work With Me */}
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
