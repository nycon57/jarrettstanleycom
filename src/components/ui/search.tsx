'use client'

import { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  className?: string
  debounceMs?: number
}

export function Search({ 
  placeholder = "Search...", 
  value = "", 
  onChange, 
  onSearch,
  className,
  debounceMs = 300
}: SearchProps) {
  const [searchValue, setSearchValue] = useState(value)
  const [debouncedValue, setDebouncedValue] = useState(value)

  // Debounce the search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchValue, debounceMs])

  // Call onChange when debounced value changes
  useEffect(() => {
    if (onChange) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange])

  // Update local state when value prop changes
  useEffect(() => {
    setSearchValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setSearchValue('')
    if (onChange) {
      onChange('')
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Button
          onClick={handleSearch}
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
        >
          Search
        </Button>
      </div>
    </div>
  )
}