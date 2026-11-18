'use client'

import { useState } from 'react'
import { format, parse } from 'date-fns'
import { IconCalendar } from '@/components/icons/iconmcp/icons'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const ISO = 'yyyy-MM-dd'

/**
 * A date field: a button styled like the site's inputs that opens shadcn's Calendar in a popover.
 * The value is an ISO date string (yyyy-MM-dd), the same shape the native date input sent.
 */
export function DatePicker({
  id,
  ref,
  value,
  onChange,
  invalid,
  placeholder = 'Pick a date',
  allowPast = false,
}: {
  id?: string
  ref?: React.Ref<HTMLButtonElement>
  value?: string
  onChange: (value: string) => void
  invalid?: boolean
  placeholder?: string
  allowPast?: boolean
}) {
  const [open, setOpen] = useState(false)
  const selected = value ? parse(value, ISO, new Date()) : undefined
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          ref={ref}
          type="button"
          data-invalid={invalid || undefined}
          aria-haspopup="dialog"
          className={cn(
            'flex h-11 w-full items-center justify-between gap-3 rounded-lg border border-[oklch(0.97_0.008_295/0.14)] bg-hp-lift px-3.5 text-left text-[0.9375rem] transition-colors duration-200 hover:border-[oklch(0.97_0.008_295/0.24)] focus-visible:border-[oklch(0.72_0.155_298/0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[oklch(0.85_0.12_298)] data-[state=open]:border-[oklch(0.72_0.155_298/0.7)] data-[invalid]:border-destructive/70',
            selected ? 'text-hp-text' : 'text-hp-soft',
          )}
        >
          {selected ? format(selected, 'EEE, MMM d, yyyy') : placeholder}
          <IconCalendar className="size-[1.125rem] shrink-0 text-hp-muted" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? today}
          disabled={allowPast ? undefined : { before: today }}
          onSelect={(day) => {
            if (!day) return
            onChange(format(day, ISO))
            setOpen(false)
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
