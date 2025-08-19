import { Metadata } from 'next'
import { AboutContent } from '@/components/sections/about-content'

export const metadata: Metadata = {
  title: 'About Jarrett Stanley | Strategic Advisor & AI Pioneer in Mortgage Marketing',
  description: 'Learn about Jarrett Stanley, strategic advisor and AI marketing pioneer who has generated $500M+ in loan originations through innovative mortgage marketing strategies.',
  openGraph: {
    title: 'About Jarrett Stanley | Strategic Advisor & AI Pioneer',
    description: 'Strategic advisor and AI marketing pioneer transforming the mortgage industry.',
    type: 'profile',
  },
}

export default function AboutPage() {
  return <AboutContent />
}