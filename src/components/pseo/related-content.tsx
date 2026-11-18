import Link from 'next/link'
import { IconArrowRight as ArrowRight } from '@/components/icons/iconmcp/icons'
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
      <h2 className="t-title mb-5 !text-xl">{heading}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={`${link.type}-${link.slug}`}
            href={resolveRelatedLinkUrl(link)}
            className="group flex min-w-0 items-center justify-between gap-3 rounded-[14px] border border-hp-rule p-4 transition-colors duration-200 hover:border-hp-rule-strong hover:bg-hp-lift"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Badge variant={typeBadgeVariant[link.type]} size="sm">
                {link.type}
              </Badge>
              <span className="truncate text-sm font-medium text-hp-text">
                {link.title}
              </span>
            </div>
            <ArrowRight className="size-4 shrink-0 text-hp-soft transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  )
}
