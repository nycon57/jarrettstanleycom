import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact - Speaking, Consulting & Media Inquiries',
  description: 'Get in touch with Jarrett Stanley for speaking engagements, strategic consulting, or media inquiries on AI-powered mortgage marketing.',
  keywords: ['contact Jarrett Stanley', 'speaking inquiry', 'consulting inquiry', 'media inquiry', 'mortgage marketing expert'],
  canonical: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
