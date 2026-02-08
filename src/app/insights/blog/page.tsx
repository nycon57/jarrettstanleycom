import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import { blogCategories } from '@/lib/blog'
import {
  generateMetadata as generateSEOMetadata,
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { BlogIndexClient } from '@/components/blog/blog-index-client'
import { buildBlogBreadcrumbs } from '@/lib/blog'
import { CtaSection } from '@/components/sections/cta-section'

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: 'Blog & Articles',
    description:
      'Expert insights on AI in mortgage marketing, operational leadership, and building systems that hold up under real pressure. Featuring The Signal newsletter series.',
    keywords: [
      'AI mortgage marketing blog',
      'marketing leadership insights',
      'The Signal newsletter',
      'mortgage marketing strategy',
    ],
    canonical: '/insights/blog',
  })
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()
  const breadcrumbs = buildBlogBreadcrumbs()

  // Structured data is generated from our own static content (not user input)
  // and is safe to use with dangerouslySetInnerHTML per Next.js JSON-LD pattern
  const structuredData = generateStructuredData([
    generateCollectionPageSchema({
      name: 'Blog & Articles',
      description:
        'Expert insights on AI in mortgage marketing, operational leadership, and building systems that hold up under real pressure.',
      url: `${siteConfig.url}/insights/blog`,
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
        dangerouslySetInnerHTML={structuredData}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container max-w-6xl">
          <PseoBreadcrumbs items={breadcrumbs} />

          <h1 className="font-signal text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Blog &{' '}
            <span className="bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent">
              Articles
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Expert insights on AI in mortgage marketing, operational leadership,
            and building systems that hold up under real pressure. Featuring The
            Signal newsletter series.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-16">
        <div className="container max-w-6xl">
          <BlogIndexClient posts={posts} categories={blogCategories} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <CtaSection variant="compact" />
    </article>
  )
}
