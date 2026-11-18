import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight } from '@/components/icons/iconmcp/icons'
import { SessionBuilder } from '@/components/speaking/session-builder'
import { SectionHead } from '@/components/speaking/sections'
import { formatDateLabel } from '@/lib/date-format'
import type { BlogPost } from '@/types/blog'

export function HomeHero() {
  return (
    <section className="page-hero">
      <div className="shell relative z-[2] grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16">
        <div className="stagger">
          <h1 className="t-hero max-w-[15ch]" style={{ '--i': 0 } as React.CSSProperties}>
            Most companies talk about AI. I build with it.
          </h1>
          <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
            Keynotes, workshops and firesides on AI, marketing and leadership for mortgage audiences, from the
            Chief Marketing Officer of Nationwide Mortgage Bankers and CEO of TrueTone AI.
          </p>
          <p className="t-lede mt-4 text-hp-muted" style={{ '--i': 2 } as React.CSSProperties}>
            Pick a topic, format and audience to see the session as it would read in your program.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ '--i': 3 } as React.CSSProperties}>
            <Link href="/speaking#book" className="btn-primary">
              Book Jarrett to speak
              <IconArrowRight className="size-4" />
            </Link>
            <Link href="/speaking" className="btn-ghost">
              See past stages and topics
            </Link>
          </div>
        </div>
        <div className="stagger">
          <div style={{ '--i': 2 } as React.CSSProperties}>
            <SessionBuilder />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Hear how he thinks before booking: The Signal and The TrueTone Show. */
export function WritingAndShow({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="hp-section" aria-labelledby="writing-title">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            id="writing-title"
            title="Hear how I think"
            step="before you book."
            lede="I write The Signal, a newsletter on AI and marketing leadership, and co-host The TrueTone Show with Corey Shelton."
          />
          <Link href="/insights/blog" className="btn-ghost shrink-0">
            All writing
            <IconArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[14px] border border-hp-rule bg-hp-rule lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.15fr)]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/blog/${post.slug}`}
              className="group flex flex-col bg-hp-bg p-6 transition-colors duration-200 hover:bg-hp-lift sm:p-7"
            >
              <p className="t-meta">
                {post.series ? `${post.series.name} #${post.series.issueNumber}` : 'Article'} ·{' '}
                {formatDateLabel(post.publishedAt, 'MMM d, yyyy')}
              </p>
              <h3 className="t-title mt-4 group-hover:text-hp-lavender">{post.title}</h3>
              <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-hp-muted">{post.excerpt}</p>
              <span className="mt-auto pt-6 text-sm text-hp-soft">{post.readTimeMinutes} min read</span>
            </Link>
          ))}
          <a
            href="https://www.truetone.ai/show"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between gap-10 bg-hp-lift p-6 transition-colors duration-200 hover:bg-hp-panel sm:p-7"
          >
            <div>
              <p className="t-meta">Video podcast · with Corey Shelton</p>
              <h3 className="mt-4 font-display text-[1.75rem] font-light uppercase leading-none text-hp-text">
                The TrueTone Show
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-hp-muted">
                Marketing, AI and leadership, argued out on camera. Episodes on YouTube and truetone.ai.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-hp-text">
              Watch the show
              <IconArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
