import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description:
    'How jarrettstanley.com collects, uses, retains, and protects the information you submit through its contact, consulting, speaking, and newsletter forms.',
  canonical: '/privacy',
})

export default function PrivacyPage() {
  return <LegalPage path="/privacy" effectiveDate="August 21, 2026" />
}
