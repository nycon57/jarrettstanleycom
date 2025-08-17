import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/sections/hero-section'
import { BridgingGapSection } from '@/components/sections/bridging-gap-section'
import { ServicesShowcase } from '@/components/sections/services-showcase'
import { LatestInsights } from '@/components/sections/latest-insights'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
import { CtaSection } from '@/components/sections/cta-section'
import { ArrowRight, Mic, Brain, Users, Award } from 'lucide-react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Jarrett Stanley | AI Mortgage Marketing Expert & TrueTone AI Creator',
  description: 'Proven AI marketing strategies that generated $500M+ in loan originations. CMO at Nationwide Mortgage Bankers, creator of TrueTone AI, and keynote speaker transforming the mortgage industry.',
  keywords: ['AI mortgage marketing expert', 'TrueTone AI creator', 'mortgage digital transformation', 'AI lending strategies', 'mortgage technology keynote speaker', 'Jarrett Stanley'],
  canonical: '/',
  ogImage: '/assets/images/jarrett-stanley-homepage-og.jpg'
})

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section with Animated Background */}
      <HeroSection />
      
      {/* Credibility Bar - Redesigned */}
      <section className="relative z-10 py-16 bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 via-transparent to-skyward/5 dark:from-lilac/10 dark:via-transparent dark:to-skyward/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Chief Marketing Officer", subtitle: "Leading Digital Transformation at Nationwide Mortgage Bankers" },
              { icon: Brain, title: "AI Visionary & Creator", subtitle: "Founded TrueTone AI - The Industry's Premier Marketing Platform" },
              { icon: Mic, title: "Keynote Authority", subtitle: "Delivering Results-Driven Insights at 50+ Major Industry Events" },
              { icon: Users, title: "Strategic Partner", subtitle: "Transforming Marketing ROI for Top-Tier Mortgage Leaders" }
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className="relative mx-auto w-16 h-16 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-lilac to-orchid rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-1 bg-background/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridging the Gap Section */}
      <BridgingGapSection />

      {/* Services Showcase */}
      <ServicesShowcase />


      {/* Latest Insights Section */}
      <LatestInsights />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <CtaSection />
    </main>
  )
}