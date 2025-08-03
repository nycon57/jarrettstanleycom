'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PlayCircle, Calendar } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export function SpeakingHero() {
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 sm:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-signal font-bold tracking-tight text-white sm:text-6xl">
              Inspire Your Audience with AI-Powered Insights
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Keynote speaker and thought leader on artificial intelligence in mortgage marketing, 
              digital transformation, and building high-performance teams.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button
              size="lg"
              onClick={() => setShowVideoModal(true)}
              className="bg-white text-purple-900 hover:bg-gray-100"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Speaker Reel
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900"
              asChild
            >
              <a href="#book-jarrett">
                <Calendar className="mr-2 h-5 w-5" />
                Book Jarrett
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 text-center"
          >
            <div>
              <p className="text-4xl font-signal font-bold text-white">50+</p>
              <p className="mt-2 text-sm text-gray-300">Keynote Presentations</p>
            </div>
            <div>
              <p className="text-4xl font-signal font-bold text-white">10K+</p>
              <p className="mt-2 text-sm text-gray-300">Audience Members Inspired</p>
            </div>
            <div>
              <p className="text-4xl font-signal font-bold text-white">4.9/5</p>
              <p className="mt-2 text-sm text-gray-300">Average Speaker Rating</p>
            </div>
          </motion.div>
        </div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <div className="aspect-video relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                variant="ghost"
                onClick={() => setShowVideoModal(true)}
                className="text-white hover:bg-white/10"
              >
                <PlayCircle className="h-16 w-16" />
              </Button>
            </div>
            <Image
              src="/assets/images/Jarrett-Stock-7.jpg"
              alt="Jarrett Stanley speaking on stage"
              width={1200}
              height={675}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl p-0">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Jarrett Stanley Speaker Reel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}