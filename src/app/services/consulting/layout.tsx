import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Strategic Consulting - AI-Powered Marketing Transformation',
  description: 'Get hands-on guidance from an industry leader who has built and scaled AI solutions that have transformed mortgage marketing for hundreds of companies.',
  keywords: ['AI consulting', 'mortgage marketing consulting', 'AI implementation strategy', 'marketing transformation', 'mortgage technology consulting'],
  canonical: '/services/consulting',
})

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
