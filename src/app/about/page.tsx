import { Metadata } from 'next'
import { AboutContent } from '@/components/sections/about-content'

export const metadata: Metadata = {
  title: 'About Jarrett Stanley | CMO & AI Pioneer in Mortgage Marketing',
  description: 'Learn about Jarrett Stanley, Chief Marketing Officer at Nationwide Mortgage Bankers and creator of TrueTone AI. Pioneer in AI-powered mortgage marketing innovation.',
  openGraph: {
    title: 'About Jarrett Stanley | CMO & AI Pioneer',
    description: 'Chief Marketing Officer at Nationwide Mortgage Bankers and creator of TrueTone AI.',
    type: 'profile',
  },
}

export default function AboutPage() {
  return <AboutContent />
}