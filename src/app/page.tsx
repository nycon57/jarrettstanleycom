import { Metadata } from 'next'
import { HomeHero, WritingAndShow } from '@/components/home/home-sections'
import { AboutStrip, ClosingCta, Colleagues, EngagementLedger, Faq, TalkTopics } from '@/components/speaking/sections'
import { homeFaqs } from '@/lib/home-faqs'
import {
  generateFAQSchema,
  generateLatestInsightsSchema,
  generateMetadata as generateSEOMetadata,
  generateProfilePageSchema,
  generateServiceSchemas,
  generateStructuredData,
} from '@/lib/seo'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = generateSEOMetadata({
  title: 'AI Mortgage Marketing Speaker & Strategic Advisor',
  description: 'CMO at Nationwide Mortgage Bankers and CEO of TrueTone AI. Keynote speaker and strategic advisor helping mortgage companies build AI-powered marketing that scales.',
  keywords: ['AI mortgage marketing expert', 'mortgage marketing consultant', 'mortgage marketing keynote speaker', 'AI lending strategies', 'Jarrett Stanley'],
  canonical: '/',
})

export default async function HomePage() {
  const allPosts = await getAllBlogPosts()
  const signal = [...allPosts]
    .filter((post) => post.series?.slug === 'the-signal')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3)

  const homeStructuredData = generateStructuredData([
    generateProfilePageSchema(),
    ...generateServiceSchemas(),
    generateFAQSchema(homeFaqs),
    generateLatestInsightsSchema(
      allPosts.slice(0, 6).map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
      })),
    ),
  ])

  return (
    <>
      <script type="application/ld+json">{homeStructuredData}</script>
      <HomeHero />
      <EngagementLedger />
      <TalkTopics />
      <WritingAndShow posts={signal} />
      <Colleagues />
      <AboutStrip />
      <Faq faqs={homeFaqs} />
      <ClosingCta />
    </>
  )
}
