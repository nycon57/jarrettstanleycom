import Link from 'next/link'
import Image from 'next/image'
import { formatDateLabel } from '@/lib/date-format'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { FAQSection } from '@/components/pseo/faq-section'
import { RelatedContent } from '@/components/pseo/related-content'
import { PseoBreadcrumbs } from '@/components/pseo/pseo-breadcrumbs'
import { BlogContentRenderer } from '@/components/blog/blog-content-renderer'
import { ShareButtons } from '@/components/ui/share-buttons'
import type { BlogPost } from '@/types/blog'
import type { BreadcrumbItem } from '@/lib/pseo'
import { blogCategories } from '@/lib/blog'
import { ArrowLeft, Clock, Newspaper } from 'lucide-react'

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
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.series && (
              <Badge variant="lilac">
                <Newspaper className="size-3 mr-1" />
                {post.series.name} #{post.series.issueNumber}
              </Badge>
            )}
            {post.categories.map((catSlug) => {
              const cat = blogCategories.find((c) => c.slug === catSlug)
              return (
                <Badge key={catSlug} variant={cat?.badgeVariant ?? 'outline'}>
                  {cat?.name || catSlug}
                </Badge>
              )
            })}
          </div>

          <h1 className="font-signal text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            <span className="text-lilac">
              {post.title}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Author + Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Avatar className="size-8 border">
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link href="/about" className="font-semibold text-foreground hover:text-lilac transition-colors">
                  {post.author.name}
                </Link>
                <span className="mx-1">&middot;</span>
                <span>{post.author.title}, {post.author.company}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {post.readTimeMinutes} min read
              </span>
              <span>{publishedLabel}</span>
            </div>
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
