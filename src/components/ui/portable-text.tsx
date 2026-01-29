'use client'

import { PortableText as PortableTextReact, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => {
      return (
        <div className="my-6">
          {value.filename && (
            <div className="bg-muted px-4 py-2 text-sm font-mono rounded-t-lg border-b">
              {value.filename}
            </div>
          )}
          <pre className={`bg-muted p-4 rounded-${value.filename ? 'b' : ''}lg overflow-x-auto`}>
            <code className={`language-${value.language || 'text'}`}>
              {value.code}
            </code>
          </pre>
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-12 mb-4 scroll-mt-20">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-10 mb-3 scroll-mt-20">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-8 mb-2 scroll-mt-20">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-lilac pl-6 my-8 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => <del className="line-through">{children}</del>,
    link: ({ value, children }) => {
      const target = value?.openInNewTab ? '_blank' : undefined
      const rel = value?.openInNewTab ? 'noopener noreferrer' : undefined
      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={rel}
          className="text-lilac hover:text-orchid underline transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}

interface PortableTextProps {
  content: PortableTextBlock[] | undefined
  className?: string
}

export function PortableTextContent({ content, className }: PortableTextProps) {
  if (!content) {
    return null
  }

  return (
    <div className={className}>
      <PortableTextReact value={content} components={components} />
    </div>
  )
}
