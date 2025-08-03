import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BlogPostCard } from '@/components/ui/blog-post-card'
import { ReadingProgress } from '@/components/analytics/reading-progress'
import { ShareButtons } from '@/components/ui/share-buttons'
import { getBlogPostBySlug, getRelatedPosts, trackPostView } from '@/app/actions/blog'
import { 
  Clock, 
  Eye, 
  Calendar,
  ArrowLeft
} from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.categories?.map(cat => cat.name).join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author_name],
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // Track the view
  await trackPostView(post.id)

  // Get related posts
  const relatedPosts = await getRelatedPosts(
    post.id, 
    post.categories?.map(cat => cat.id) || [],
    3
  )

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jarrettstanley.com'}/insights/blog/${post.slug}`

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        {post.featured_image_url && (
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        
        <div className="container mx-auto px-4 py-12">
          {/* Back button */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="group">
              <Link href="/insights/blog">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Articles
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories?.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-signal font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                {post.author_image_url && (
                  <Image
                    src={post.author_image_url}
                    alt={post.author_name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium">{post.author_name}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.published_at}>
                  {format(new Date(post.published_at), 'MMMM d, yyyy')}
                </time>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.read_time_minutes} min read</span>
              </div>
              
              {post.view_count !== undefined && (
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.view_count} views</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main content */}
              <div className="flex-1">
                <ReadingProgress contentTitle={post.title}>
                  <div className="prose prose-lg max-w-none prose-headings:font-signal prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-lg prose-a:text-purple-600 hover:prose-a:text-purple-700 prose-blockquote:border-purple-200 prose-blockquote:bg-purple-50 prose-blockquote:pl-6 prose-blockquote:py-4">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  </div>
                </ReadingProgress>

                {/* Share buttons */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="font-signal font-semibold text-lg mb-4">Share this article</h3>
                  <ShareButtons shareUrl={shareUrl} title={post.title} />
                </div>
              </div>

              {/* Sidebar */}
              <aside className="w-full lg:w-80 lg:sticky lg:top-32 lg:self-start">
                <div className="space-y-8">
                  {/* Author info */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {post.author_image_url && (
                        <Image
                          src={post.author_image_url}
                          alt={post.author_name}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <h3 className="font-signal font-semibold text-lg">{post.author_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          CMO at Nationwide Mortgage Bankers<br />
                          Creator of TrueTone AI
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Expert in AI-powered mortgage marketing with over a decade of experience 
                      helping financial institutions leverage technology for growth.
                    </p>
                    <div className="flex space-x-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/about">Learn More</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href="/contact">Get in Touch</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Related posts */}
                  {relatedPosts.length > 0 && (
                    <div>
                      <h3 className="font-signal font-semibold text-lg mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <div key={relatedPost.id}>
                            <Link
                              href={`/insights/blog/${relatedPost.slug}`}
                              className="group block p-4 rounded-lg border hover:shadow-md transition-all duration-300"
                            >
                              <h4 className="font-signal font-semibold text-sm group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {relatedPost.excerpt}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{relatedPost.read_time_minutes} min</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Newsletter CTA */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                    <h3 className="font-signal font-semibold text-lg mb-3">Stay Updated</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest insights on AI in mortgage marketing delivered to your inbox.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/contact">Subscribe Now</Link>
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts section (mobile) */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30 lg:hidden">
          <div className="container mx-auto px-4">
            <h2 className="font-signal font-bold text-3xl mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-signal font-bold text-3xl md:text-4xl text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how AI can revolutionize your mortgage marketing strategy. 
            Book a consultation or speaking engagement today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Link href="/speaking">Book Speaking Engagement</Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}