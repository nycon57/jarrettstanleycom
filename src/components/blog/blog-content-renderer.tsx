import { Fragment } from 'react'
import type { ContentBlock } from '@/types/blog'
import { Lightbulb, AlertTriangle, Sparkles } from 'lucide-react'

function renderInlineText(text: string): React.ReactNode {
  // Split on **bold** markers, preserving the delimiters
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

function ParagraphBlock({ text }: { text: string }) {
  return (
    <p className="text-base text-muted-foreground leading-relaxed mb-6">
      {renderInlineText(text)}
    </p>
  )
}

function HeadingBlock({ text, level }: { text: string; level: 2 | 3 }) {
  if (level === 2) {
    return (
      <h2 className="font-signal text-2xl md:text-3xl font-bold mt-12 mb-6 scroll-mt-20">
        {text}
      </h2>
    )
  }
  return (
    <h3 className="font-signal text-xl md:text-2xl font-semibold mt-8 mb-4 scroll-mt-20">
      {text}
    </h3>
  )
}

function ListBlock({ style, items }: { style: 'bullet' | 'numbered'; items: string[] }) {
  const Tag = style === 'numbered' ? 'ol' : 'ul'
  return (
    <Tag
      className={`mb-6 space-y-2 pl-6 ${
        style === 'numbered' ? 'list-decimal' : 'list-disc'
      } text-muted-foreground`}
    >
      {items.map((item, i) => (
        <li key={i} className="text-base leading-relaxed pl-1">
          {renderInlineText(item)}
        </li>
      ))}
    </Tag>
  )
}

const calloutIcons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  insight: Sparkles,
}

const calloutColors = {
  tip: 'border-skyward/30 bg-skyward/5',
  warning: 'border-amber-500/30 bg-amber-500/5',
  insight: 'border-lilac/30 bg-lilac/5',
}

function CalloutBlock({ text, variant = 'insight' }: { text: string; variant?: 'tip' | 'warning' | 'insight' }) {
  const Icon = calloutIcons[variant]
  return (
    <div className={`rounded-xl border p-5 mb-6 ${calloutColors[variant]}`}>
      <div className="flex gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
        <p className="text-base text-muted-foreground leading-relaxed">
          {renderInlineText(text)}
        </p>
      </div>
    </div>
  )
}

function DividerBlock() {
  return <hr className="my-10 border-border/50" />
}

interface BlogContentRendererProps {
  content: ContentBlock[]
  className?: string
}

export function BlogContentRenderer({ content, className }: BlogContentRendererProps) {
  return (
    <div className={className}>
      {content.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <ParagraphBlock key={i} text={block.text} />
          case 'heading':
            return <HeadingBlock key={i} text={block.text} level={block.level} />
          case 'list':
            return <ListBlock key={i} style={block.style} items={block.items} />
          case 'callout':
            return <CalloutBlock key={i} text={block.text} variant={block.variant} />
          case 'divider':
            return <DividerBlock key={i} />
          default:
            return null
        }
      })}
    </div>
  )
}
