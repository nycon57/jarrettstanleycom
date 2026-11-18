import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight, IconCheck } from '@/components/icons/iconmcp/icons'
import { BookingCard } from '@/components/speaking/booking-card'
import { HeroOrb } from '@/components/home/hero-orb'
import { INCLUDED } from '@/lib/speaking'
import { SectionHead } from '@/components/speaking/sections'
import { formatDateLabel } from '@/lib/date-format'
import type { BlogPost } from '@/types/blog'

export function HomeHero() {
  return (
    <section className="page-hero !pb-0" aria-labelledby="home-title">
      <div className="shell relative z-[2] grid items-end gap-6 lg:min-h-[min(calc(100svh-4.5rem),56rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div className="stagger self-center pb-4 lg:pb-[clamp(4rem,10vh,7rem)]">
          <h1 id="home-title" className="t-hero max-w-[15ch]" style={{ '--i': 0 } as React.CSSProperties}>
            Most companies talk about AI. I build with it.
          </h1>
          <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
            Keynotes, workshops and firesides on AI, marketing and leadership for mortgage audiences, from the Chief
            Marketing Officer of Nationwide Mortgage Bankers and CEO of TrueTone AI.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ '--i': 2 } as React.CSSProperties}>
            <Link href="#book" className="btn-primary">
              Book Jarrett to speak
              <IconArrowRight className="size-4" />
            </Link>
            <Link href="#stages-title" className="btn-ghost">
              Where I&apos;ve spoken
            </Link>
          </div>
        </div>

        {/* The portrait, with the voice field behind it */}
        <div className="relative mx-auto h-[min(68vh,30rem)] w-full max-w-[34rem] self-end sm:h-[34rem] lg:h-[min(84svh,50rem)] lg:max-w-none">
          <div className="hero-portrait-glow" aria-hidden="true" />
          <HeroOrb className="absolute left-1/2 top-[-6%] aspect-square w-[150%] max-w-[64rem] -translate-x-1/2 lg:top-[-10%] lg:w-[135%]" />
          <Image
            src="/assets/images/Jarrett-Stock-17-cutout.png"
            alt="Jarrett Stanley, arms crossed, smiling"
            width={1158}
            height={1712}
            priority
            sizes="(min-width: 1024px) 34rem, 80vw"
            className="hero-portrait relative mx-auto h-full w-auto object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  )
}

/** Booking, right under the hero: the session card that becomes the inquiry. */
export function HomeBooking() {
  return (
    <section className="hp-section hp-section--lift" aria-labelledby="booking-title">
      <div className="shell grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHead
            id="booking-title"
            title="Shape the session."
            step="Then send it to me."
            lede="Pick a topic, format and audience to see the session as it would read in your program. The same card takes your event details and sends them straight to me."
          />
          <ul className="mt-8 grid gap-3 text-[0.9375rem] text-hp-text">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3">
                <IconCheck className="mt-0.5 size-4 shrink-0 text-hp-lilac" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <BookingCard />
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
              <h3 className="t-title group-hover:text-hp-lavender">{post.title}</h3>
              <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-hp-muted">{post.excerpt}</p>
              <p className="mt-auto pt-6 text-sm text-hp-soft">
                {post.series ? `${post.series.name} #${post.series.issueNumber}` : 'Article'} ·{' '}
                {formatDateLabel(post.publishedAt, 'MMM d, yyyy')} · {post.readTimeMinutes} min
              </p>
            </Link>
          ))}
          <a
            href="https://www.truetone.ai/show"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-5 bg-hp-lift p-6 transition-colors duration-200 hover:bg-hp-panel sm:p-7"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg ring-1 ring-hp-rule">
              <Image
                src="/images/blog/the-signal-og-image-experts-with-power-tools.jpg"
                alt="The TrueTone Show, Episode 2 thumbnail: Jarrett holding a cymbal monkey, 'Experts only. No monkeys.'"
                fill
                sizes="(min-width: 1024px) 22rem, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div>
              <h3 className="t-title">The TrueTone Show</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-hp-muted">
                A video podcast with Corey Shelton on marketing, AI and leadership. Episodes on YouTube and truetone.ai.
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
