'use client'

import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function SpeakingHero() {
  return (
    <section className="py-32 bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 dark:from-purple-900 dark:via-purple-800 dark:to-indigo-900 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
          <a
            href="#book-jarrett"
            className="flex items-center gap-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm py-1 pr-4 pl-1 border border-purple-200 dark:border-white/20 hover:bg-white/70 dark:hover:bg-white/20 transition-colors"
          >
            <Badge variant="outline" className="bg-purple-600 text-white border-purple-600 hover:bg-purple-700 dark:bg-white dark:text-purple-900 dark:border-white dark:hover:bg-gray-100">
              Available for Speaking
            </Badge>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-purple-900 dark:text-white">Book Jarrett Now</p>
              <ChevronRight className="h-4 w-4 text-purple-900 dark:text-white" />
            </div>
          </a>
          <h1 className="text-center text-5xl font-signal font-semibold text-purple-900 dark:text-white md:text-6xl">
            Transform Your Event with AI Marketing Expertise
          </h1>
          <p className="text-center text-lg text-muted-foreground md:text-xl max-w-3xl">
            Captivate your audience with cutting-edge insights on AI-powered mortgage marketing, 
            digital transformation, and leadership strategies that drive measurable results.
          </p>
          <div className="flex gap-3 pb-8">
            <Button 
              size="lg" 
              className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-white dark:text-purple-900 dark:hover:bg-gray-100"
              asChild
            >
              <a href="#book-jarrett">Book Speaking Engagement</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-purple-900"
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

