import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllBlogPosts,
  getBlogPost,
  getRelatedBlogPosts,
  buildBlogBreadcrumbs,
} from '@/lib/blog'
import {
  generateMetadata as generateSEOMetadata,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateStructuredData,
  siteConfig,
} from '@/lib/seo'
import { BlogPostPage } from '@/components/blog/blog-post-page'
import { PseoCtaBanner } from '@/components/pseo/pseo-cta-banner'
import { CtaSection } from '@/components/sections/cta-section'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  return generateSEOMetadata({
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    canonical: `/insights/blog/${post.slug}`,
    ogImage: post.featuredImage,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.lastUpdated,
    authors: [post.author.name],
    section: post.categories[0],
    tags: post.seo.keywords,
  })
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedBlogPosts(post.slug, 3)
  const breadcrumbs = buildBlogBreadcrumbs(post)

  // Structured data generated from static JSON content only (safe from injection)
  // This follows the standard Next.js JSON-LD pattern used across the site
  const structuredData = generateStructuredData([
    {
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.title,
        worksFor: {
          '@type': 'Organization',
          name: post.author.company,
        },
      },
      datePublished: post.publishedAt,
      dateModified: post.lastUpdated,
      url: `${siteConfig.url}/insights/blog/${post.slug}`,
      publisher: {
        '@type': 'Person',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    ...(post.faqs.length > 0 ? [generateFAQSchema(post.faqs)] : []),
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
      <BlogPostPage
        post={post}
        relatedPosts={relatedPosts}
        breadcrumbs={breadcrumbs}
      />
      {/* CTA Banner */}
      <div className="container max-w-4xl mt-8">
        <PseoCtaBanner
          heading="Want to Build Systems Like These?"
          description="Book a strategy session to discuss how operational clarity and AI-driven marketing can transform your results."
          buttonText="Book a Strategy Session"
          buttonHref="/services/consulting"
        />
      </div>
      {/* Newsletter CTA */}
      <div className="mt-8">
        <CtaSection variant="compact" />
      </div>
    </article>
  )
}
