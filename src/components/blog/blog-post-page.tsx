import Link from 'next/link'
import Image from 'next/image'
import { formatDateLabel } from '@/lib/date-format'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/pseo/faq-section'
import { RelatedContent } from '@/components/pseo/related-content'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { BlogContentRenderer } from '@/components/blog/blog-content-renderer'
import { ShareButtons } from '@/components/ui/share-buttons'
import type { BlogPost } from '@/types/blog'
import type { BreadcrumbItem } from '@/lib/pseo'
import { blogCategories } from '@/lib/blog'
import { IconArrowLeft as ArrowLeft, IconClock as Clock } from '@/components/icons/iconmcp/icons'

interface BlogPostPageProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  breadcrumbs: BreadcrumbItem[]
}

export function BlogPostPage({ post, relatedPosts, breadcrumbs }: BlogPostPageProps) {
  const shareUrl = `https://jarrettstanley.com/insights/blog/${post.slug}`
  const publishedLabel = formatDateLabel(post.publishedAt, 'MMMM d, yyyy')

  return (
    <div>
      {/* Breadcrumbs */}
      <section className="pt-32 pb-4">
        <div className="container max-w-4xl">
          <PseoBreadcrumbs items={breadcrumbs} />
        </div>
      </section>

      {/* Back button */}
      <section className="pb-4">
        <div className="container max-w-4xl">
          <Button asChild variant="ghost" className="group">
            <Link href="/insights/blog">
              <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="pb-6">
          <div className="container max-w-4xl">
            <div className="relative aspect-[1.91/1] rounded-xl overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Hero */}
      <section className="pb-8">
        <div className="container max-w-4xl">
          <h1 className="mb-6 font-display text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-hp-text text-balance">
            {post.title}
          </h1>

          <p className="t-lede mb-8 max-w-[62ch]">
            {post.excerpt}
          </p>

          {/* Author + meta */}
          <div className="mb-6 flex flex-col gap-3 text-sm text-hp-muted sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/images/jarrett-avatar-v2.jpg"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-full ring-1 ring-hp-rule"
              />
              <p>
                <Link href="/about" className="font-semibold text-hp-text transition-colors hover:text-hp-lavender">
                  {post.author.name}
                </Link>
                <span className="mx-1">&middot;</span>
                {post.author.title}, {post.author.company}
              </p>
            </div>
            <p className="flex items-center gap-3 text-hp-soft">
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {post.readTimeMinutes} min read
              </span>
              <span>{publishedLabel}</span>
            </p>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            {post.series && (
              <Badge variant="lilac">
                {post.series.name} #{post.series.issueNumber}
              </Badge>
            )}
            {post.categories.map((catSlug) => {
              const cat = blogCategories.find((c) => c.slug === catSlug)
              return (
                <Badge key={catSlug} variant="outline">
                  {cat?.name || catSlug}
                </Badge>
              )
            })}
          </div>

          {/* Share */}
          <ShareButtons shareUrl={shareUrl} title={post.title} />
        </div>
      </section>

      {/* Content */}
      <section className="pb-12">
        <div className="container max-w-4xl">
          <BlogContentRenderer content={post.content} />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-12">
          <div className="container max-w-4xl">
            <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-6">
              More from {post.series ? post.series.name : 'the Blog'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/blog/${related.slug}`}
                  className="group block rounded-xl border border-border/50 overflow-hidden transition-all hover:border-lilac/30 hover:bg-lilac/5"
                >
                  {related.featuredImage && (
                    <div className="relative aspect-[1.91/1]">
                      <Image
                        src={related.featuredImage}
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                  {related.series && (
                    <Badge variant="lilac" className="mb-2 text-xs">
                      {related.series.name} #{related.series.issueNumber}
                    </Badge>
                  )}
                  <h3 className="font-signal text-lg font-semibold mb-2 group-hover:text-lilac transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {related.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {related.readTimeMinutes} min read
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {post.faqs.length > 0 && (
        <div className="container max-w-4xl">
          <FAQSection faqs={post.faqs} />
        </div>
      )}

      {/* Related Content */}
      {post.relatedContent.length > 0 && (
        <div className="container max-w-4xl">
          <RelatedContent links={post.relatedContent} />
        </div>
      )}
    </div>
  )
}
