'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { BlogPostCard } from '@/components/ui/blog-post-card'
import { Search } from '@/components/ui/search'
import { CategoryFilter } from '@/components/ui/category-filter'
import { Pagination } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BlogPost, Category } from '@/lib/supabase'
import { getBlogPosts, getCategories } from '@/app/actions/blog'
import { Filter, Grid, List, SortAsc, SortDesc } from 'lucide-react'

const POSTS_PER_PAGE = 9

export default function BlogIndex() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // State
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  // URL parameters
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize state from URL parameters only once
  useEffect(() => {
    console.log('URL Effect triggered:', { isInitialized, searchParams: searchParams.toString() })
    if (!isInitialized) {
      const page = Number(searchParams.get('page')) || 1
      const search = searchParams.get('search') || ''
      const sort = searchParams.get('sort') as 'desc' | 'asc' || 'desc'
      const view = searchParams.get('view') as 'grid' | 'list' || 'grid'

      console.log('Setting initial state:', { page, search, sort, view })
      
      // Set all state first
      setCurrentPage(page)
      setSearchQuery(search)
      setSortOrder(sort)
      setViewMode(view)
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Fetch categories on mount
  useEffect(() => {
    console.log('Categories Effect triggered')
    const fetchCategories = async () => {
      const cats = await getCategories()
      console.log('Categories loaded:', cats.length)
      setCategories(cats)
    }
    fetchCategories()
  }, [])

  // Handle category from URL after categories are loaded and component is initialized
  useEffect(() => {
    if (categories.length > 0 && isInitialized) {
      const category = searchParams.get('category')
      if (category) {
        console.log('Looking for category:', category)
        const foundCategory = categories.find(cat => cat.slug === category)
        if (foundCategory) {
          console.log('Found category, setting:', foundCategory.id)
          setSelectedCategories([foundCategory.id])
        }
      }
    }
  }, [categories, isInitialized, searchParams])

  // Fetch posts when parameters change
  useEffect(() => {
    if (!isInitialized) {
      console.log('Posts Effect blocked - not initialized yet')
      return
    }
    
    console.log('Posts Effect triggered:', { currentPage, selectedCategories, searchQuery })
    const fetchPosts = async () => {
      setLoading(true)
      try {
        console.log('Fetching posts with params:', { currentPage, selectedCategories, searchQuery })
        const result = await getBlogPosts({
          page: currentPage,
          limit: POSTS_PER_PAGE,
          categoryIds: selectedCategories,
          search: searchQuery
        })
        console.log('Posts fetched:', result.posts.length)
        setPosts(result.posts)
        setTotalPages(result.totalPages)
        setTotalCount(result.totalCount)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts([])
        setTotalPages(0)
        setTotalCount(0)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [isInitialized, currentPage, selectedCategories, searchQuery])

  // Update URL when parameters change
  const updateURL = (params: Record<string, string | number | undefined>) => {
    console.log('updateURL called:', { params, isInitialized })
    if (!isInitialized) {
      console.log('updateURL blocked - not initialized')
      return // Prevent URL updates during initialization
    }
    
    const url = new URLSearchParams(searchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== 1) {
        url.set(key, String(value))
      } else {
        url.delete(key)
      }
    })

    const newUrl = `/insights/blog${url.toString() ? `?${url.toString()}` : ''}`
    const currentUrl = `/insights/blog${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    // Only push if URL actually changed
    if (newUrl !== currentUrl) {
      console.log('Pushing new URL:', newUrl)
      router.push(newUrl, { scroll: false })
    } else {
      console.log('URL unchanged, skipping push:', newUrl)
    }
  }

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    if (isInitialized) {
      updateURL({ search: query, page: undefined })
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (isInitialized) {
      updateURL({ page })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds)
    setCurrentPage(1)
    if (isInitialized) {
      updateURL({ page: undefined })
    }
  }

  const handleSortChange = (sort: 'desc' | 'asc') => {
    console.log('handleSortChange called:', sort, 'isInitialized:', isInitialized)
    setSortOrder(sort)
    if (isInitialized) {
      updateURL({ sort })
    }
  }

  const handleViewModeChange = (view: 'grid' | 'list') => {
    console.log('handleViewModeChange called:', view, 'isInitialized:', isInitialized)
    setViewMode(view)
    if (isInitialized) {
      updateURL({ view })
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setCurrentPage(1)
    router.push('/insights/blog')
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-lilac/10 to-orchid/10 py-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-signal font-bold text-4xl md:text-5xl mb-6 bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent">
              Blog & Articles
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Expert insights on AI in mortgage marketing, industry trends, and leadership strategies
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Search
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Controls and Filters */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Results count and filters toggle */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  `${totalCount} article${totalCount !== 1 ? 's' : ''} found`
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* View controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortOrder} onValueChange={handleSortChange}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">
                    <div className="flex items-center">
                      <SortDesc className="w-4 h-4 mr-2" />
                      Newest First
                    </div>
                  </SelectItem>
                  <SelectItem value="asc">
                    <div className="flex items-center">
                      <SortAsc className="w-4 h-4 mr-2" />
                      Oldest First
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* View mode */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleViewModeChange('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="mt-4 lg:hidden">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              <div className="hidden lg:block">
                <CategoryFilter
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                />
              </div>

              {hasActiveFilters && (
                <div className="hidden lg:block">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {loading ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
              }>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No articles found matching your criteria.
                </div>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                  : "space-y-6 mb-12"
                }>
                  {posts.map((post) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="justify-center"
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}