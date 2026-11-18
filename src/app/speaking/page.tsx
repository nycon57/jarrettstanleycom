import { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowRight } from '@/components/icons/iconmcp/icons'
import { BookingCard } from '@/components/speaking/booking-card'
import { BookingDetails, EngagementLedger, TalkTopics } from '@/components/speaking/sections'
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
              services audiences. Pick the talk, the format and the room, then tell me about your event.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ '--i': 2 } as React.CSSProperties}>
              <Link href="#book" className="btn-primary lg:hidden">
                Start booking
                <IconArrowRight className="size-4" />
              </Link>
              <Link href="#talks-title" className="btn-ghost">
                The three talks
              </Link>
            </div>
          </div>
          <div className="stagger">
            <div style={{ '--i': 2 } as React.CSSProperties}>
              <BookingCard />
            </div>
          </div>
        </div>
      </section>

      <TalkTopics />
      <EngagementLedger />
      <BookingDetails />

    </>
  )
}
