"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type Option = {
  value: string
  label: string
  disabled?: boolean
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  emptyMessage = "No options found.",
  className,
}: MultiSelectProps) {
  console.log('MultiSelect render:', { options, selected })

  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (option: string) => {
    console.log('handleUnselect called with:', option)
    onChange(selected.filter((s) => s !== option))
  }

  const handleSelect = (value: string) => {
    console.log('handleSelect called with:', value)
    onChange([...selected, value])
    setInputValue("")
  }

  const selectables = options.filter((option) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  })

  console.log('Filtered selectables:', selectables)

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between hover:bg-transparent active:scale-100 h-10",
              className
            )}
          >
            <span className="text-muted-foreground">
              {selected.length === 0
                ? placeholder
                : `${selected.length} state${selected.length === 1 ? '' : 's'} selected`}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <div className="flex items-center border-b px-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search..."
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto overflow-x-hidden">
            {selectables.length === 0 ? (
              <div className="py-6 text-center text-sm">{emptyMessage}</div>
            ) : (
              <div className="p-1">
                {selectables.map((option) => {
                  const isSelected = selected.includes(option.value)
                  return (
                    <div
                      key={option.value}
                      onClick={() => isSelected ? handleUnselect(option.value) : handleSelect(option.value)}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      <div className="mr-2 h-4 w-4 border rounded flex items-center justify-center">
                        <Check
                          className={cn(
                            "h-3 w-3",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                      <span>{option.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {selected.map((option) => {
            const selectedOption = options.find((o) => o.value === option)
            if (!selectedOption) return null
            return (
              <Badge
                key={option}
                variant="secondary"
                className="pr-1 bg-slate-100 text-slate-900"
              >
                <span className="mr-1">{selectedOption.label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleUnselect(option)
                    }
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleUnselect(option)
                  }}
                >
                  <X className="h-3 w-3 text-slate-500 hover:text-slate-900" />
                </span>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
