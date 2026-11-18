'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { TransformedCategory } from '@/lib/sanity/types'
import { cn } from '@/lib/utils'
import { IconClose as X } from '@/components/icons/iconmcp/icons'

interface CategoryFilterProps {
  categories: TransformedCategory[]
  selectedCategories: string[]
  onCategoryChange: (categoryIds: string[]) => void
  className?: string
  showClearAll?: boolean
}

export function CategoryFilter({ 
  categories, 
  selectedCategories, 
  onCategoryChange, 
  className,
  showClearAll = true
}: CategoryFilterProps) {
  const handleCategoryToggle = (categoryId: string) => {
    const isSelected = selectedCategories.includes(categoryId)
    if (isSelected) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const handleClearAll = () => {
    onCategoryChange([])
  }

  return (
    <div className={cn("gap-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Categories
        </h3>
        {showClearAll && selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs h-8 px-2"
          >
            <X className="size-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id)
          return (
            <Badge
              key={category.id}
              variant={isSelected ? "default" : "secondary"}
              className={cn(
                "cursor-pointer transition-colors duration-200",
                isSelected 
                  ? "bg-[oklch(0.42_0.13_298/0.24)] border-[oklch(0.72_0.155_298/0.65)] text-hp-text" 
                  : "hover:text-hp-text hover:border-[oklch(0.97_0.008_295/0.3)]"
              )}
              style={
                isSelected 
                  ? {} 
                  : { 
                      backgroundColor: `${category.color}20`, 
                      color: category.color,
                      borderColor: `${category.color}40`
                    }
              }
              onClick={() => handleCategoryToggle(category.id)}
            >
              {category.name}
              {isSelected && (
                <X className="size-3 ml-1" />
              )}
            </Badge>
          )
        })}
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'} selected
        </div>
      )}
    </div>
  )
}