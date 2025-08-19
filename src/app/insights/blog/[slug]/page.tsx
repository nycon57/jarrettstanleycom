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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CtaSection } from "@/components/sections/cta-section"
import { RecommendedArticles } from "@/components/sections/recommended-articles"
import { getBlogPostBySlug, getRelatedPosts, trackPostView } from '@/app/actions/blog'
import { 
  Clock, 
  Eye, 
  Calendar,
  ArrowLeft,
  Lightbulb
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

  // Get related posts for carousel (more posts for carousel)
  // Handle both category formats (string array or object array)
  const categoryIds = post.categories?.map(cat => 
    typeof cat === 'string' ? cat : cat.id
  ) || []
  
  const relatedPosts = await getRelatedPosts(
    post.id, 
    categoryIds,
    8
  )

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jarrettstanley.com'}/insights/blog/${post.slug}`

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          {/* Back button */}
          <div className="max-w-5xl mx-auto mb-8">
            <Button asChild variant="ghost" className="group">
              <Link href="/insights/blog">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Articles
              </Link>
            </Button>
          </div>
          
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
            <h1 className="max-w-3xl text-pretty text-5xl font-semibold md:text-6xl">
              {post.title}
            </h1>
            <h3 className="text-muted-foreground max-w-3xl text-lg md:text-xl">
              {post.excerpt}
            </h3>
            <div className="flex items-center gap-3 text-sm md:text-base">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={post.author_image_url || undefined} />
                <AvatarFallback>{post.author_name?.charAt(0) || 'J'}</AvatarFallback>
              </Avatar>
              <span>
                <a href="/about" className="font-semibold">
                  {post.author_name || 'Jarrett Stanley'}
                </a>
                <span className="ml-1">on {format(new Date(post.published_at), "MMMM d, yyyy")}</span>
              </span>
            </div>
            
            {/* Share buttons */}
            <div className="mt-6">
              <h3 className="font-signal font-semibold text-lg mb-4">Share this article</h3>
              <ShareButtons shareUrl={shareUrl} title={post.title} />
            </div>
            {post.featured_image_url && (
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="mb-8 mt-4 aspect-video w-full rounded-lg border object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <ReadingProgress contentTitle={post.title}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </ReadingProgress>
        </div>
      </div>



      {/* Recommended Articles Carousel */}
      {relatedPosts.length > 0 && (
        <RecommendedArticles posts={relatedPosts} currentPostId={post.id} />
      )}

      {/* Newsletter Signup Section */}
      <CtaSection />
    </article>
  )
}