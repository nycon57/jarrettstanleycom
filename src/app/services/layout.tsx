import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Services - Speaking, Consulting & Advisory',
  description: 'Transform your mortgage marketing with AI expertise. Speaking engagements, strategic consulting, and advisory services from Jarrett Stanley.',
  keywords: ['mortgage marketing services', 'AI consulting', 'mortgage marketing speaker', 'strategic advisory', 'AI implementation'],
  canonical: '/services',
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
