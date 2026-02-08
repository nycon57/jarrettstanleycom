'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { TransformedPost as BlogPost, TransformedCategory as Category } from '@/lib/sanity/types'
import { getBlogPosts, getCategories } from '@/app/actions/blog'

const POSTS_PER_PAGE = 9

export interface BlogFiltersState {
  posts: BlogPost[]
  categories: Category[]
  loading: boolean
  totalPages: number
  totalCount: number
  currentPage: number
  searchQuery: string
  selectedCategories: string[]
  sortOrder: 'desc' | 'asc'
  viewMode: 'grid' | 'list'
  showFilters: boolean
  hasActiveFilters: boolean
}

export interface BlogFiltersActions {
  handleSearch: (query: string) => void
  handlePageChange: (page: number) => void
  handleCategoryChange: (categoryIds: string[]) => void
  handleSortChange: (sort: 'desc' | 'asc') => void
  handleViewModeChange: (view: 'grid' | 'list') => void
  setShowFilters: (show: boolean) => void
  clearFilters: () => void
}

export function useBlogFilters(): BlogFiltersState & BlogFiltersActions {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Data state
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  // Filter state
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize state from URL parameters only once
  useEffect(() => {
    if (!isInitialized) {
      const page = Number(searchParams.get('page')) || 1
      const search = searchParams.get('search') || ''
      const sort = searchParams.get('sort') as 'desc' | 'asc' || 'desc'
      const view = searchParams.get('view') as 'grid' | 'list' || 'grid'

      setCurrentPage(page)
      setSearchQuery(search)
      setSortOrder(sort)
      setViewMode(view)
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories()
      setCategories(cats)
    }
    fetchCategories()
  }, [])

  // Handle category from URL after categories are loaded and component is initialized
  useEffect(() => {
    if (categories.length > 0 && isInitialized) {
      const category = searchParams.get('category')
      if (category) {
        const foundCategory = categories.find(cat => cat.slug === category)
        if (foundCategory) {
          setSelectedCategories([foundCategory.id])
        }
      }
    }
  }, [categories, isInitialized, searchParams])

  // Fetch posts when parameters change
  useEffect(() => {
    if (!isInitialized) return

    const fetchPosts = async () => {
      setLoading(true)
      try {
        const result = await getBlogPosts({
          page: currentPage,
          limit: POSTS_PER_PAGE,
          categoryIds: selectedCategories,
          search: searchQuery,
        })
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

  // URL update helper
  const updateURL = useCallback((params: Record<string, string | number | undefined>) => {
    if (!isInitialized) return

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

    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false })
    }
  }, [isInitialized, searchParams, router])

  // Action handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    if (isInitialized) {
      updateURL({ search: query, page: undefined })
    }
  }, [isInitialized, updateURL])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    if (isInitialized) {
      updateURL({ page })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [isInitialized, updateURL])

  const handleCategoryChange = useCallback((categoryIds: string[]) => {
    setSelectedCategories(categoryIds)
    setCurrentPage(1)
    if (isInitialized) {
      const categorySlug = categoryIds.length === 1
        ? categories.find(c => c.id === categoryIds[0])?.slug
        : undefined
      updateURL({ category: categorySlug, page: undefined })
    }
  }, [isInitialized, updateURL, categories])

  const handleSortChange = useCallback((sort: 'desc' | 'asc') => {
    setSortOrder(sort)
    if (isInitialized) {
      updateURL({ sort })
    }
  }, [isInitialized, updateURL])

  const handleViewModeChange = useCallback((view: 'grid' | 'list') => {
    setViewMode(view)
    if (isInitialized) {
      updateURL({ view })
    }
  }, [isInitialized, updateURL])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategories([])
    setCurrentPage(1)
    router.push('/insights/blog')
  }, [router])

  const hasActiveFilters = searchQuery.length > 0 || selectedCategories.length > 0

  return {
    // State
    posts,
    categories,
    loading,
    totalPages,
    totalCount,
    currentPage,
    searchQuery,
    selectedCategories,
    sortOrder,
    viewMode,
    showFilters,
    hasActiveFilters,
    // Actions
    handleSearch,
    handlePageChange,
    handleCategoryChange,
    handleSortChange,
    handleViewModeChange,
    setShowFilters,
    clearFilters,
  }
}
