'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Metadata } from 'next'
import { ResourceCard } from '@/components/ui/resource-card'
import { CategoryFilter } from '@/components/ui/category-filter'
import { Pagination } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Resource, Category } from '@/lib/supabase'
import { getResources, getCategories, trackResourceDownload } from '@/app/actions/blog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Download, 
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

const downloadFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  company: z.string().optional(),
})

type DownloadFormData = z.infer<typeof downloadFormSchema>

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

export default function ResourcesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // State
  const [resources, setResources] = useState<Resource[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [downloadLoading, setDownloadLoading] = useState(false)

  // URL parameters
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedResourceType, setSelectedResourceType] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadFormSchema)
  })

  // Initialize state from URL parameters
  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1
    const type = searchParams.get('type') || ''
    const category = searchParams.get('category')
    const sort = searchParams.get('sort') as 'desc' | 'asc' || 'desc'
    const view = searchParams.get('view') as 'grid' | 'list' || 'grid'
    const featured = searchParams.get('featured') === 'true'

    setCurrentPage(page)
    setSelectedResourceType(type)
    setSortOrder(sort)
    setViewMode(view)
    setFeaturedOnly(featured)

    if (category) {
      getCategories().then(cats => {
        const foundCategory = cats.find(cat => cat.slug === category)
        if (foundCategory) {
          setSelectedCategories([foundCategory.id])
        }
      })
    }
  }, [searchParams])

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories()
      setCategories(cats)
    }
    fetchCategories()
  }, [])

  // Fetch resources when parameters change
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      try {
        const result = await getResources({
          page: currentPage,
          limit: RESOURCES_PER_PAGE,
          categoryIds: selectedCategories,
          resourceType: selectedResourceType || undefined,
          featured: featuredOnly || undefined
        })
        setResources(result.resources)
        setTotalPages(result.totalPages)
        setTotalCount(result.totalCount)
      } catch (error) {
        console.error('Error fetching resources:', error)
        setResources([])
        setTotalPages(0)
        setTotalCount(0)
      } finally {
        setLoading(false)
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

    router.push(`/insights/resources?${url.toString()}`, { scroll: false })
  }

  // Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds)
    setCurrentPage(1)
    updateURL({ page: undefined })
  }

  const handleResourceTypeChange = (type: string) => {
    setSelectedResourceType(type)
    setCurrentPage(1)
    updateURL({ type, page: undefined })
  }

  const handleSortChange = (sort: 'desc' | 'asc') => {
    setSortOrder(sort)
    updateURL({ sort })
  }

  const handleViewModeChange = (view: 'grid' | 'list') => {
    setViewMode(view)
    updateURL({ view })
  }

  const handleFeaturedToggle = () => {
    const newFeatured = !featuredOnly
    setFeaturedOnly(newFeatured)
    setCurrentPage(1)
    updateURL({ featured: newFeatured, page: undefined })
  }

  const handleResourceDownload = (resource: Resource) => {
    if (resource.requires_email) {
      setSelectedResource(resource)
      setDownloadModalOpen(true)
    } else {
      // Direct download
      window.open(resource.file_url, '_blank')
    }
  }

  const onDownloadSubmit = async (data: DownloadFormData) => {
    if (!selectedResource) return

    setDownloadLoading(true)
    try {
      await trackResourceDownload(
        selectedResource.id,
        data.email,
        data.firstName,
        data.lastName,
        data.company
      )
      
      // Open download link
      window.open(selectedResource.file_url, '_blank')
      
      // Close modal and reset form
      setDownloadModalOpen(false)
      setSelectedResource(null)
      reset()
    } catch (error) {
      console.error('Error tracking download:', error)
    } finally {
      setDownloadLoading(false)
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedResourceType('')
    setFeaturedOnly(false)
    setCurrentPage(1)
    router.push('/insights/resources')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedResourceType || featuredOnly

  const resourceTypes = Object.keys(resourceTypeLabels) as Array<keyof typeof resourceTypeLabels>

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-signal font-bold text-4xl md:text-5xl mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
                className="flex items-center space-x-2"
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
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{resourceTypeLabels[type]}</span>
                  </Button>
                )
              })}
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
                    `${totalCount} resource${totalCount !== 1 ? 's' : ''} found`
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

                <Button
                  variant={featuredOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleFeaturedToggle}
                  className="flex items-center space-x-2"
                >
                  <Star className="w-4 h-4" />
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
                    : "space-y-6 mb-12"
                  }>
                    {resources.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        onDownload={handleResourceDownload}
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
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-signal font-bold text-3xl md:text-4xl text-white mb-6">
              Need Custom Solutions?
            </h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Looking for personalized guidance or custom AI marketing solutions? 
              Let's discuss how we can help transform your mortgage marketing strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <a href="/contact">Schedule Consultation</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <a href="/speaking">Book Speaking Engagement</a>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Download Modal */}
      <Dialog open={downloadModalOpen} onOpenChange={setDownloadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Resource</DialogTitle>
            <DialogDescription>
              Please provide your information to download{' '}
              <strong>{selectedResource?.title}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onDownloadSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  placeholder="Your first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Your last name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your.email@company.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                {...register('company')}
                placeholder="Your company name"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDownloadModalOpen(false)}
                disabled={downloadLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={downloadLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {downloadLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}