import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type { BreadcrumbItem as BreadcrumbData } from '@/lib/pseo'

interface PseoBreadcrumbsProps {
  items: BreadcrumbData[]
}

export function PseoBreadcrumbs({ items }: PseoBreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <BreadcrumbItem key={item.href}>
              {isLast ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
