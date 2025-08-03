import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { BlogPostCard } from '@/components/ui/blog-post-card'
import { ResourceCard } from '@/components/ui/resource-card'
import { Badge } from '@/components/ui/badge'
import { getBlogPosts, getResources, getCategories } from '@/app/actions/blog'
import { ArrowRight, BookOpen, Download, Lightbulb, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Insights Hub - Expert Knowledge on AI & Mortgage Marketing',
  description: 'Discover cutting-edge insights on AI in mortgage marketing, industry trends, and leadership strategies from Jarrett Stanley. Access exclusive resources and thought leadership content.',
  keywords: ['AI marketing insights', 'mortgage industry trends', 'marketing strategy', 'artificial intelligence', 'leadership', 'TrueTone AI'],
}

export default async function InsightsHub() {
  // Fetch featured content and categories
  const [
    { posts: featuredPosts },
    { posts: recentPosts },
    { resources: featuredResources },
    categories
  ] = await Promise.all([
    getBlogPosts({ featured: true, limit: 2 }),
    getBlogPosts({ limit: 6 }),
    getResources({ featured: true, limit: 4 }),
    getCategories()
  ])

  const categoryIcons = {
    'ai-innovation': Lightbulb,
    'marketing-strategy': TrendingUp,
    'industry-trends': BookOpen,
    'leadership': ArrowRight,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-signal font-bold text-4xl md:text-6xl mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Insights Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover cutting-edge insights on AI in mortgage marketing, industry trends, and leadership strategies. 
              Access exclusive resources and thought leadership content to stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link href="/insights/blog">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse All Articles
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/insights/resources">
                  <Download className="w-5 h-5 mr-2" />
                  Explore Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-signal font-bold text-3xl mb-4">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Navigate our content by topic to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || BookOpen
              return (
                <Link
                  key={category.id}
                  href={`/insights/blog?category=${category.slug}`}
                  className="group p-6 rounded-lg border border-border hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: `${category.color}05` }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-signal font-semibold text-lg group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm" style={{ color: category.color }}>
                    <span>Explore articles</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-signal font-bold text-3xl mb-4">Featured Articles</h2>
                <p className="text-muted-foreground">
                  Don't miss these highlighted insights and analysis
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/insights/blog">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-signal font-bold text-3xl mb-4">Latest Insights</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest trends and strategies
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/insights/blog">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.slice(0, 6).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      {featuredResources.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-signal font-bold text-3xl mb-4">Featured Resources</h2>
                <p className="text-muted-foreground">
                  Downloadable guides, templates, and tools to accelerate your success
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/insights/resources">
                  Browse All Resources
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-signal font-bold text-3xl md:text-4xl text-white mb-6">
            Stay Ahead of the Curve
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest insights on AI in mortgage marketing delivered directly to your inbox. 
            Join thousands of industry professionals who trust our expertise.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Subscribe to Newsletter
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}