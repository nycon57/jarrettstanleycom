'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ResourceCard } from '@/components/ui/resource-card'
import { CategoryFilter } from '@/components/ui/category-filter'
import { Pagination } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Resource } from '@/lib/supabase'
import type { TransformedCategory } from '@/lib/sanity/types'
import { getResources, getCategories } from '@/app/actions/blog'
import { DownloadModal, useDownloadModal } from '@/components/resources/download-modal'
import {
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
  FileText,
  BookOpen,
  Video,
  Headphones,
  CheckSquare,
  FileCheck,
  Star
} from 'lucide-react'

const RESOURCES_PER_PAGE = 12

const resourceTypeIcons = {
  whitepaper: FileText,
  ebook: BookOpen,
  template: FileCheck,
  guide: BookOpen,
  checklist: CheckSquare,
  video: Video,
  podcast: Headphones,
}

const resourceTypeLabels = {
  whitepaper: 'Whitepapers',
  ebook: 'eBooks',
  template: 'Templates',
  guide: 'Guides',
  checklist: 'Checklists',
  video: 'Videos',
  podcast: 'Podcasts',
}

function useResourcesPageContentView() {
  const searchParams = useSearchParams()
  const { get } = searchParams
  const { push } = useRouter()
  const { isOpen, resource, requestDownload, close } = useDownloadModal()

  const [pageState, setPageState] = useState({
    resources: [] as Resource[],
    categories: [] as TransformedCategory[],
    loading: true,
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
    selectedCategories: [] as string[],
    selectedResourceType: '',
    sortOrder: 'desc' as 'desc' | 'asc',
    viewMode: 'grid' as 'grid' | 'list',
    showFilters: false,
    featuredOnly: false,
  })
  const {
    resources,
    categories,
    loading,
    totalPages,
    totalCount,
    currentPage,
    selectedCategories,
    selectedResourceType,
    sortOrder,
    viewMode,
    showFilters,
    featuredOnly,
  } = pageState
  const updatePageState = (updates: Partial<typeof pageState>) => {
    setPageState((current) => ({ ...current, ...updates }))
  }

  // Initialize state from URL parameters
  useEffect(() => {
    const page = Number(get('page')) || 1
    const type = get('type') || ''
    const category = get('category')
    const sort = get('sort') as 'desc' | 'asc' || 'desc'
    const view = get('view') as 'grid' | 'list' || 'grid'
    const featured = get('featured') === 'true'

    updatePageState({
      currentPage: page,
      selectedResourceType: type,
      sortOrder: sort,
      viewMode: view,
      featuredOnly: featured,
    })

    if (category) {
      getCategories().then(cats => {
        const foundCategory = cats.find(cat => cat.slug === category)
        if (foundCategory) {
          updatePageState({ selectedCategories: [foundCategory.id] })
        }
      })
    }
  }, [get])

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories()
      updatePageState({ categories: cats })
    }
    fetchCategories()
  }, [])

  // Fetch resources when parameters change
  useEffect(() => {
    const fetchResources = async () => {
      updatePageState({ loading: true })
      try {
        const result = await getResources({
          page: currentPage,
          limit: RESOURCES_PER_PAGE,
          categoryIds: selectedCategories,
          resourceType: selectedResourceType || undefined,
          featured: featuredOnly || undefined
        })
        updatePageState({
          resources: result.resources,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          loading: false,
        })
      } catch (error) {
        console.error('Error fetching resources:', error)
        updatePageState({
          resources: [],
          totalPages: 0,
          totalCount: 0,
          loading: false,
        })
      }
    }

    fetchResources()
  }, [currentPage, selectedCategories, selectedResourceType, featuredOnly])

  // Update URL when parameters change
  const updateURL = (params: Record<string, string | number | boolean | undefined>) => {
    const url = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== 1 && value !== false) {
        url.set(key, String(value))
      } else {
        url.delete(key)
      }
    })

    push(`/insights/resources?${url.toString()}`, { scroll: false })
  }

  // Handlers
  const handlePageChange = (page: number) => {
    updatePageState({ currentPage: page })
    updateURL({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (categoryIds: string[]) => {
    updatePageState({ selectedCategories: categoryIds, currentPage: 1 })
    updateURL({ page: undefined })
  }

  const handleResourceTypeChange = (type: string) => {
    updatePageState({ selectedResourceType: type, currentPage: 1 })
    updateURL({ type, page: undefined })
  }

  const handleSortChange = (sort: 'desc' | 'asc') => {
    updatePageState({ sortOrder: sort })
    updateURL({ sort })
  }

  const handleViewModeChange = (view: 'grid' | 'list') => {
    updatePageState({ viewMode: view })
    updateURL({ view })
  }

  const handleFeaturedToggle = () => {
    const newFeatured = !featuredOnly
    updatePageState({ featuredOnly: newFeatured, currentPage: 1 })
    updateURL({ featured: newFeatured, page: undefined })
  }

  const clearFilters = () => {
    updatePageState({
      selectedCategories: [],
      selectedResourceType: '',
      featuredOnly: false,
      currentPage: 1,
    })
    push('/insights/resources')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedResourceType || featuredOnly

  const resourceTypes = Object.keys(resourceTypeLabels) as Array<keyof typeof resourceTypeLabels>

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-signal font-semibold text-4xl md:text-5xl mb-6 text-lilac">
                Resources Library
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Downloadable guides, templates, and tools to accelerate your AI marketing journey
              </p>
            </div>
          </div>
        </section>

        {/* Resource type filters */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant={!selectedResourceType ? 'default' : 'outline'}
                onClick={() => handleResourceTypeChange('')}
                className="flex items-center gap-x-2"
              >
                <span>All Resources</span>
              </Button>
              {resourceTypes.map((type) => {
                const IconComponent = resourceTypeIcons[type]
                return (
                  <Button
                    key={type}
                    variant={selectedResourceType === type ? 'default' : 'outline'}
                    onClick={() => handleResourceTypeChange(type)}
                    className="flex items-center gap-x-2"
                  >
                    <IconComponent className="size-4" />
                    <span>{resourceTypeLabels[type]}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Controls and Filters */}
        <section className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Results count and filters toggle */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  {loading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    `${totalCount} resource${totalCount !== 1 ? 's' : ''} found`
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePageState({ showFilters: !showFilters })}
                  className="lg:hidden"
                >
                  <Filter className="size-4 mr-2" />
                  Filters
                </Button>

                <Button
                  variant={featuredOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleFeaturedToggle}
                  className="flex items-center gap-x-2"
                >
                  <Star className="size-4" />
                  <span>Featured</span>
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
                        <SortDesc className="size-4 mr-2" />
                        Newest First
                      </div>
                    </SelectItem>
                    <SelectItem value="asc">
                      <div className="flex items-center">
                        <SortAsc className="size-4 mr-2" />
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
                    className="size-8 p-0"
                  >
                    <Grid className="size-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleViewModeChange('list')}
                    className="size-8 p-0"
                  >
                    <List className="size-4" />
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
              <div className="sticky top-32 gap-y-6">
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
                  : "gap-y-6"
                }>
                  {['one', 'two', 'three', 'four', 'five', 'six'].map((placeholder) => (
                    <div key={placeholder} className="gap-y-3">
                      <Skeleton className="aspect-video w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : resources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    No resources found matching your criteria.
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
                    : "gap-y-6 mb-12"
                  }>
                    {resources.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        onDownload={requestDownload}
                        className={viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-lilac to-orchid">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-signal font-semibold text-3xl md:text-4xl text-white mb-6">
              Need Custom Solutions?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Looking for personalized guidance or custom AI marketing solutions?
              Let's discuss how we can help transform your mortgage marketing strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-lilac">
                <Link href="/speaking">Book Speaking Engagement</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <DownloadModal
        isOpen={isOpen}
        resource={resource}
        onClose={close}
      />
    </>
  )
}

export default function ResourcesInsightsPageClient() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ResourcesPageContent />
    </Suspense>
  )
}

function ResourcesPageContent() {
  return useResourcesPageContentView();
}
