'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showPageNumbers?: boolean
  maxVisiblePages?: number
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className,
  showPageNumbers = true,
  maxVisiblePages = 5
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(maxVisiblePages / 2)
    let start = Math.max(currentPage - half, 1)
    let end = Math.min(start + maxVisiblePages - 1, totalPages)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getVisiblePages()
  const showStartEllipsis = visiblePages[0] > 2
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center space-x-1"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {showPageNumbers && (
        <>
          {/* First page */}
          {visiblePages[0] > 1 && (
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(1)}
              className="w-10"
            >
              1
            </Button>
          )}

          {/* Start ellipsis */}
          {showStartEllipsis && (
            <div className="flex items-center justify-center w-10 h-8">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={cn(
                "w-10",
                currentPage === page && "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              )}
            >
              {page}
            </Button>
          ))}

          {/* End ellipsis */}
          {showEndEllipsis && (
            <div className="flex items-center justify-center w-10 h-8">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
          )}

          {/* Last page */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className="w-10"
            >
              {totalPages}
            </Button>
          )}
        </>
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center space-x-1"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Page info for mobile */}
      {!showPageNumbers && (
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
      )}
    </div>
  )
}