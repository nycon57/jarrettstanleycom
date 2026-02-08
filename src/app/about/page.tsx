import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { AboutContent } from '@/components/sections/about-content'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Jarrett Stanley | Strategic Advisor & AI Pioneer in Mortgage Marketing',
  description: 'Learn about Jarrett Stanley, strategic advisor and AI marketing pioneer who has generated $500M+ in loan originations through innovative mortgage marketing strategies.',
  keywords: ['about Jarrett Stanley', 'AI marketing pioneer', 'mortgage marketing leader', 'strategic advisor'],
  canonical: '/about',
  ogType: 'profile',
})

export default function AboutPage() {
  return <AboutContent />
}