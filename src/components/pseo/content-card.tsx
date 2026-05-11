import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

interface ContentCardProps {
  title: string
  description: string
  href: string
  badge?: string
  badgeVariant?: 'lilac' | 'orchid' | 'skyward' | 'lavender' | 'gradient-subtle'
  meta?: string
}

export function ContentCard({
  title,
  description,
  href,
  badge,
  badgeVariant = 'lilac',
  meta,
}: ContentCardProps) {
  return (
    <Link href={href} className="group block">
      <Card variant="interactive" className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            {badge && (
              <Badge variant={badgeVariant} size="sm">
                {badge}
              </Badge>
            )}
            {meta && (
              <span className="text-xs text-muted-foreground">{meta}</span>
            )}
          </div>
          <h3 className="font-signal text-lg font-semibold group-hover:text-lilac transition-colors leading-snug">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
          <div className="flex items-center gap-1 mt-4 text-sm font-medium text-lilac">
            Read more
            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
