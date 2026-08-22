import { Metadata } from 'next'
import { SpeakingHero } from '@/components/sections/speaking/speaking-hero'
import { SignatureTopics } from '@/components/sections/speaking/signature-topics'
import { PastEngagements } from '@/components/sections/speaking/past-engagements'
import { BookJarrett } from '@/components/sections/speaking/book-jarrett'
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
    <main className="flex min-h-screen flex-col">
      <script type="application/ld+json">{speakingStructuredData}</script>
      <SpeakingHero />
      <SignatureTopics />
      <PastEngagements />
      {/* <SpeakingTestimonials /> */}
      {/* <UpcomingEvents /> */}
      {/* <SpeakerKit /> */}
      <BookJarrett />
    </main>
  )
}