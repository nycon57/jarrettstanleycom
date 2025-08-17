import { Metadata } from 'next'
import { SpeakingHero } from '@/components/sections/speaking/speaking-hero'
import { SignatureTopics } from '@/components/sections/speaking/signature-topics'
import { PastEngagements } from '@/components/sections/speaking/past-engagements'
import { SpeakingTestimonials } from '@/components/sections/speaking/speaking-testimonials'
import { UpcomingEvents } from '@/components/sections/speaking/upcoming-events'
import { SpeakerKit } from '@/components/sections/speaking/speaker-kit'
import { BookJarrett } from '@/components/sections/speaking/book-jarrett'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Speaking Engagements - Mortgage Marketing & AI Expert',
  description: 'Book Jarrett Stanley for your next conference or event. Expert keynote speaker on AI in mortgage marketing, digital transformation, and building high-performance marketing teams. 50+ industry events nationwide.',
  keywords: ['mortgage marketing speaker', 'AI mortgage technology', 'keynote speaker', 'mortgage conference speaker', 'digital transformation speaker', 'AI speaker', 'marketing automation speaker'],
  canonical: '/speaking',
  ogImage: '/assets/images/jarrett-stanley-speaking-og.jpg'
})

export default function SpeakingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SpeakingHero />
      <SignatureTopics />
      <PastEngagements />
      <SpeakingTestimonials />
      <UpcomingEvents />
      <SpeakerKit />
      <BookJarrett />
    </main>
  )
}