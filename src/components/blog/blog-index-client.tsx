'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Clock, Newspaper, X } from 'lucide-react'
import type { BlogPost, BlogCategory } from '@/types/blog'

interface BlogIndexClientProps {
  posts: BlogPost[]
  categories: BlogCategory[]
}

export function BlogIndexClient({ posts, categories }: BlogIndexClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    let result = posts

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
      )
    }

    if (selectedCategory) {
      result = result.filter((p) => p.categories.includes(selectedCategory))
    }

    if (selectedSeries) {
      result = result.filter((p) => p.series?.slug === selectedSeries)
    }

    return result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }, [posts, searchQuery, selectedCategory, selectedSeries])

  const seriesList = useMemo(() => {
    const seen = new Map<string, { name: string; slug: string; count: number }>()
    for (const post of posts) {
      if (post.series && !seen.has(post.series.slug)) {
        const count = posts.filter((p) => p.series?.slug === post.series?.slug).length
        seen.set(post.series.slug, { name: post.series.name, slug: post.series.slug, count })
      }
    }
    return Array.from(seen.values())
  }, [posts])

  const hasFilters = searchQuery || selectedCategory || selectedSeries

  return (
    <div>
      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          id="blog-search"
          type="text"
          placeholder="Search articles..."
          aria-label="Search articles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:border-lilac/50 focus:outline-none focus:ring-1 focus:ring-lilac/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* Series filter */}
        {seriesList.map((series) => (
          <button
            key={series.slug}
            onClick={() =>
              setSelectedSeries(selectedSeries === series.slug ? null : series.slug)
            }
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-all ${
              selectedSeries === series.slug
                ? 'border-lilac bg-lilac/10 text-lilac'
                : 'border-border hover:border-lilac/30 hover:bg-lilac/5'
            }`}
          >
            <Newspaper className="w-3 h-3" />
            {series.name}
            <span className="text-xs text-muted-foreground">({series.count})</span>
          </button>
        ))}

        {/* Category filters */}
        {categories.map((cat) => {
          const count = posts.filter((p) => p.categories.includes(cat.slug)).length
          if (count === 0) return null
          const active = selectedCategory === cat.slug
          const colorMap = {
            lilac: active ? 'border-lilac bg-lilac/10 text-lilac' : 'border-border hover:border-lilac/30 hover:bg-lilac/5',
            orchid: active ? 'border-orchid bg-orchid/10 text-orchid' : 'border-border hover:border-orchid/30 hover:bg-orchid/5',
            skyward: active ? 'border-skyward bg-skyward/10 text-skyward' : 'border-border hover:border-skyward/30 hover:bg-skyward/5',
            lavender: active ? 'border-lavender bg-lavender/10 text-orchid' : 'border-border hover:border-lavender/30 hover:bg-lavender/5',
          } as const
          return (
            <button
              key={cat.slug}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-all ${colorMap[cat.badgeVariant]}`}
            >
              {cat.name}
              <span className="text-xs text-muted-foreground">({count})</span>
            </button>
          )
        })}

        {hasFilters && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory(null)
              setSelectedSeries(null)
            }}
            className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
        {hasFilters ? ' found' : ''}
      </p>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No articles found matching your criteria.
          </p>
          {hasFilters && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedSeries(null)
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/blog/${post.slug}`}
              className="group block"
            >
              <Card variant="elevated" className="h-full transition-all group-hover:border-lilac/30 group-hover:shadow-lg group-hover:shadow-lilac/5 overflow-hidden">
                {post.featuredImage && (
                  <div className="relative aspect-[1.91/1]">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardContent className="pt-6">
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {post.series && (
                      <Badge variant="lilac" className="text-xs">
                        {post.series.name} #{post.series.issueNumber}
                      </Badge>
                    )}
                    {post.categories.slice(0, 2).map((catSlug) => {
                      const cat = categories.find((c) => c.slug === catSlug)
                      return (
                        <Badge key={catSlug} variant={cat?.badgeVariant ?? 'outline'} className="text-xs">
                          {cat?.name || catSlug}
                        </Badge>
                      )
                    })}
                  </div>
                  <h3 className="font-signal text-lg font-semibold mb-2 group-hover:text-lilac transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTimeMinutes} min read
                    </span>
                    <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
