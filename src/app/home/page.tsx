import { Metadata } from 'next'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { WaitlistSignup } from '@/components/sections/waitlist'
// import { PricingWithSwitch } from '@/components/sections/pricing' // Temporarily hidden until launch

export const metadata: Metadata = {
  title: 'TrueTone AI - Your Voice. Amplified by Intelligence.',
  description: 'Capture your unique voice and create authentic marketing content that scales. From professional websites to AI-powered content creation, TrueTone AI transforms how you connect with your audience while maintaining compliance and your personal brand.',
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <WaitlistSignup />
      {/* <PricingWithSwitch /> */} {/* Temporarily hidden until launch */}
    </main>
  )
} 