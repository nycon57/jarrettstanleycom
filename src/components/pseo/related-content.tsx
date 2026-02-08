import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { RelatedLink } from '@/types/pseo'
import { resolveRelatedLinkUrl } from '@/lib/pseo'

interface RelatedContentProps {
  links: RelatedLink[]
  heading?: string
}

const typeBadgeVariant: Record<RelatedLink['type'], 'lilac' | 'orchid' | 'skyward' | 'lavender'> = {
  glossary: 'lilac',
  persona: 'orchid',
  tool: 'skyward',
  example: 'lavender',
  blog: 'lilac',
  service: 'orchid',
}

export function RelatedContent({ links, heading = 'Related Content' }: RelatedContentProps) {
  if (links.length === 0) return null

  return (
    <section className="py-12">
      <h2 className="font-signal text-2xl md:text-3xl font-bold mb-6">{heading}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={`${link.type}-${link.slug}`}
            href={resolveRelatedLinkUrl(link)}
            className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-lilac/30 hover:bg-lilac/5 transition-all duration-300"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Badge variant={typeBadgeVariant[link.type]} size="sm">
                {link.type}
              </Badge>
              <span className="text-sm font-medium truncate group-hover:text-lilac transition-colors">
                {link.title}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-lilac group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  )
}
