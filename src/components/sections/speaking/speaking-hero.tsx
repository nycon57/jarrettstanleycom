'use client'

import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function SpeakingHero() {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-lilac/10 dark:from-shadow dark:via-indigo dark:to-orchid relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
          <a
            href="#book-jarrett"
            className="flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm py-1 pr-4 pl-1 border border-lilac/30 dark:border-lilac/20 hover:bg-white dark:hover:bg-white/20 transition-colors"
          >
            <Badge variant="outline" className="bg-lilac text-white border-lilac hover:bg-orchid dark:bg-lilac dark:text-white dark:border-lilac dark:hover:bg-orchid">
              Available for Speaking
            </Badge>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-lilac dark:text-white">Book Jarrett Now</p>
              <ChevronRight className="h-4 w-4 text-lilac dark:text-white" />
            </div>
          </a>
          <h1 className="text-center text-5xl font-signal font-semibold text-gray-900 dark:text-white md:text-6xl">
            Transform Your Event with AI Marketing Expertise
          </h1>
          <p className="text-center text-lg text-muted-foreground md:text-xl max-w-3xl">
            Captivate your audience with cutting-edge insights on AI-powered mortgage marketing, 
            digital transformation, and leadership strategies that drive measurable results.
          </p>
          <div className="flex gap-3 pb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-lilac to-orchid text-white hover:from-lilac/90 hover:to-orchid/90"
              asChild
            >
              <a href="#book-jarrett">Book Speaking Engagement</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-lilac text-lilac hover:bg-gradient-to-r hover:from-lilac hover:to-orchid hover:text-white dark:border-lilac dark:text-lilac dark:hover:bg-gradient-to-r dark:hover:from-lilac dark:hover:to-orchid dark:hover:text-white"
              asChild
            >
              <a href="#signature-topics">View Topics</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

