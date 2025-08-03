'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Category } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface CategoryFilterProps {
  categories: Category[]
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
    <div className={cn("space-y-4", className)}>
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
            <X className="w-3 h-3 mr-1" />
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
                "cursor-pointer transition-all duration-200 hover:scale-105",
                isSelected 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" 
                  : "hover:bg-muted-foreground/10"
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
                <X className="w-3 h-3 ml-1" />
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