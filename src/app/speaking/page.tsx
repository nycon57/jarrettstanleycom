import { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowRight } from '@/components/icons/iconmcp/icons'
import { SessionBuilder } from '@/components/speaking/session-builder'
import { BookingDetails, EngagementLedger, SectionHead, TalkTopics } from '@/components/speaking/sections'
import { SpeakingInquiryForm } from '@/components/sections/speaking/speaking-inquiry-form'
import {
  generateMetadata as generateSEOMetadata,
  generateServiceSchemas,
  generateSpeakingEventSchemas,
  generateStructuredData,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Speaking Engagements - Mortgage Marketing & AI Expert',
  description: 'Book Jarrett Stanley for your next conference or event. Expert keynote speaker on AI in mortgage marketing, digital transformation, and building high-performance marketing teams.',
  keywords: ['mortgage marketing speaker', 'AI mortgage technology', 'keynote speaker', 'mortgage conference speaker', 'digital transformation speaker', 'AI speaker', 'marketing automation speaker'],
  canonical: '/speaking',
})

const speakingStructuredData = generateStructuredData([
  generateServiceSchemas()[0],
  ...generateSpeakingEventSchemas(),
])

export default function SpeakingPage() {
  return (
    <>
      <script type="application/ld+json">{speakingStructuredData}</script>

      <section className="page-hero">
        <div className="shell relative z-[2] grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16">
          <div className="stagger lg:pt-10">
            <h1 className="t-hero max-w-[14ch]" style={{ '--i': 0 } as React.CSSProperties}>
              Book Jarrett to speak.
            </h1>
            <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
              Keynotes, workshops, panels and firesides on AI, marketing and leadership for mortgage and financial
              services audiences. Shape the session here, then send it over with your event details.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ '--i': 2 } as React.CSSProperties}>
              <Link href="#book" className="btn-primary">
                Send an inquiry
                <IconArrowRight className="size-4" />
              </Link>
              <Link href="#talks-title" className="btn-ghost">
                The three talks
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

      <TalkTopics />
      <EngagementLedger />
      <BookingDetails />

      <section id="book" className="hp-section hp-section--lift scroll-mt-20" aria-labelledby="book-title">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="book-title"
              title="Tell me about your event."
              lede="The more I know about the room, the better the session. You'll hear back within two business days."
            />
            <p className="mt-8 text-[0.9375rem] text-hp-muted">
              Rather email?{' '}
              <a href="mailto:jarrett@jarrettstanley.com" className="font-medium text-hp-text underline decoration-hp-rule-strong underline-offset-4 transition-colors hover:decoration-current">
                jarrett@jarrettstanley.com
              </a>
            </p>
          </div>
          <div className="hp-card p-6 sm:p-9">
            <SpeakingInquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}
