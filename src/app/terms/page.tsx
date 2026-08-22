import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description:
    'The terms that govern use of jarrettstanley.com, including permitted use of its content, the limits of the information published here, and how engagements are agreed.',
  canonical: '/terms',
})

export default function TermsPage() {
  return <LegalPage path="/terms" effectiveDate="August 21, 2026" />
}
