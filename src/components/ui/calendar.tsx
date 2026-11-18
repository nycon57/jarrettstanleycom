'use client'

import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import { IconChevronLeft, IconChevronRight } from '@/components/icons/iconmcp/icons'
import { cn } from '@/lib/utils'

/**
 * shadcn's Calendar (react-day-picker v9), set in the site's tokens: Inter, 36px day cells, deep-lilac
 * selected day, a hairline ring on today, IconMCP chevrons (no lucide).
 */
function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
  const d = getDefaultClassNames()
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-1 text-hp-text', className)}
      classNames={{
        root: cn('w-fit', d.root),
        months: cn('relative flex flex-col gap-4', d.months),
        month: cn('flex w-full flex-col gap-3', d.month),
        nav: cn('absolute inset-x-0 top-0 flex items-center justify-between', d.nav),
        button_previous: cn(
          'inline-flex size-9 items-center justify-center rounded-lg text-hp-muted transition-colors hover:bg-[oklch(0.97_0.008_295/0.06)] hover:text-hp-text disabled:opacity-40',
          d.button_previous,
        ),
        button_next: cn(
          'inline-flex size-9 items-center justify-center rounded-lg text-hp-muted transition-colors hover:bg-[oklch(0.97_0.008_295/0.06)] hover:text-hp-text disabled:opacity-40',
          d.button_next,
        ),
        month_caption: cn('flex h-9 items-center justify-center', d.month_caption),
        caption_label: cn('text-[0.9375rem] font-semibold', d.caption_label),
        month_grid: cn('w-full border-collapse', d.month_grid),
        weekdays: cn('flex', d.weekdays),
        weekday: cn('w-9 pb-1 text-center text-xs font-medium text-hp-soft', d.weekday),
        week: cn('mt-1 flex w-full', d.week),
        day: cn('relative size-9 p-0 text-center', d.day),
        day_button: cn(
          'inline-flex size-9 items-center justify-center rounded-lg text-sm transition-colors hover:bg-[oklch(0.97_0.008_295/0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[oklch(0.85_0.12_298)]',
          d.day_button,
        ),
        selected: cn(
          '[&>button]:bg-hp-deep [&>button]:font-semibold [&>button]:text-[oklch(0.99_0.005_295)] [&>button]:hover:bg-[oklch(0.66_0.165_298)]',
          d.selected,
        ),
        today: cn('[&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-hp-rule-strong', d.today),
        outside: cn('text-hp-soft opacity-60', d.outside),
        disabled: cn('pointer-events-none text-hp-soft opacity-35', d.disabled),
        hidden: cn('invisible', d.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClass }) =>
          orientation === 'left' ? <IconChevronLeft className={cn('size-4', chevronClass)} /> : <IconChevronRight className={cn('size-4', chevronClass)} />,
      }}
      {...props}
    />
  )
}

export { Calendar }
