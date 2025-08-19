"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Mic, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative h-[900px] max-h-[900px] overflow-hidden">
      {/* Theme-aware gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-lilac/5 dark:from-shadow dark:via-indigo dark:to-orchid">
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-transparent to-lilac/10 dark:from-shadow/80 dark:via-transparent dark:to-lilac/20"></div>
      </div>
      
      {/* Main Content Container - Add top padding for navigation */}
      <div className="relative z-10 h-full flex">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch h-[calc(900px-6rem)]">
            
            {/* Left Side - Cutout Image */}
            <div className="relative order-2 lg:order-1 flex items-end justify-center lg:justify-start">
              <div className="relative w-full max-w-md lg:max-w-lg mx-auto lg:mx-0 flex flex-col justify-end">
                <Image
                  src="/assets/images/Jarrett-Stock-17-cutout.png"
                  alt="Jarrett Stanley - Chief Marketing Officer"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain object-bottom block"
                  style={{ marginBottom: '0', display: 'block' }}
                  priority
                />
                {/* Subtle glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-t from-lilac/20 to-transparent blur-3xl -z-10 scale-110"></div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left flex items-center">
              <div className="w-full">
                {/* Main heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-signal font-bold mb-6 lg:mb-8 text-gray-900 dark:text-white leading-[1.1]">
                  <span className="block mb-2">WHERE MORTGAGE</span>
                  <span className="block mb-2">MARKETING MEETS</span>
                  <span className="block bg-gradient-to-r from-lilac via-lavender to-skyward bg-clip-text text-transparent">
                    ARTIFICIAL INTELLIGENCE
                  </span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200 mb-8 lg:mb-10 leading-relaxed font-hind max-w-2xl mx-auto lg:mx-0">
                  From CMO at Nationwide Mortgage Bankers to creator of TrueTone AI, I've pioneered the AI marketing strategies that generated $500M+ in loan originations. Ready to transform your results?
                </p>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8 py-4 h-auto"
                  >
                    <Link href="/speaking">
                      <Mic className="mr-2 h-5 w-5" />
                      Book a Keynote
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 dark:border-white/40 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/60 backdrop-blur-sm transition-all duration-300 text-base px-8 py-4 h-auto"
                  >
                    <Link href="/services">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Start Transformation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-lilac/5 to-skyward/5 dark:from-lilac/10 dark:to-skyward/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orchid/5 to-lavender/5 dark:from-orchid/10 dark:to-lavender/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
    </section>
  )
}