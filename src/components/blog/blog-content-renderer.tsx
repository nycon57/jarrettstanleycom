import type { ContentBlock } from '@/types/blog'
import { Lightbulb, AlertTriangle, Sparkles } from 'lucide-react'

function InlineText({ text }: { text: string }) {
  const segments: Array<{ key: string; text: string; strong: boolean }> = []
  const boldPattern = /\*\*(.*?)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        key: `text-${lastIndex}`,
        text: text.slice(lastIndex, match.index),
        strong: false,
      })
    }

    segments.push({
      key: `strong-${match.index}`,
      text: match[1],
      strong: true,
    })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({
      key: `text-${lastIndex}`,
      text: text.slice(lastIndex),
      strong: false,
    })
  }

  return (
    <>
      {segments.map((segment) =>
        segment.strong ? (
          <strong key={segment.key} className="font-semibold text-foreground">
            {segment.text}
          </strong>
        ) : (
          <span key={segment.key}>{segment.text}</span>
        )
      )}
    </>
  )
}

function ParagraphBlock({ text }: { text: string }) {
  return (
    <p className="text-base text-muted-foreground leading-relaxed mb-6">
      <InlineText text={text} />
    </p>
  )
}

function HeadingBlock({ text, level }: { text: string; level: 2 | 3 }) {
  if (level === 2) {
    return (
      <h2 className="font-signal text-2xl md:text-3xl font-semibold mt-12 mb-6 scroll-mt-20">
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
      className={`mb-6 gap-y-2 pl-6 ${
        style === 'numbered' ? 'list-decimal' : 'list-disc'
      } text-muted-foreground`}
    >
      {items.map((item) => (
        <li key={item} className="text-base leading-relaxed pl-1">
          <InlineText text={item} />
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
        <Icon className="size-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
        <p className="text-base text-muted-foreground leading-relaxed">
          <InlineText text={text} />
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
      {content.map((block) => {
        const blockKey = getContentBlockKey(block)

        switch (block.type) {
          case 'paragraph':
            return <ParagraphBlock key={blockKey} text={block.text} />
          case 'heading':
            return <HeadingBlock key={blockKey} text={block.text} level={block.level} />
          case 'list':
            return <ListBlock key={blockKey} style={block.style} items={block.items} />
          case 'callout':
            return <CalloutBlock key={blockKey} text={block.text} variant={block.variant} />
          case 'divider':
            return <DividerBlock key={blockKey} />
          default:
            return null
        }
      })}
    </div>
  )
}

function getContentBlockKey(block: ContentBlock) {
  switch (block.type) {
    case 'paragraph':
    case 'heading':
    case 'callout':
      return `${block.type}-${block.text}`
    case 'list':
      return `${block.type}-${block.style}-${block.items.join('|')}`
    case 'divider':
      return 'divider'
  }
}
