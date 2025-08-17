'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// Placeholder logos - replace with actual conference/company logos
const logos = [
  { name: 'Mortgage Bankers Association', src: '/logos/mba-logo.png' },
  { name: 'National Association of Mortgage Brokers', src: '/logos/namb-logo.png' },
  { name: 'Digital Mortgage Conference', src: '/logos/dmc-logo.png' },
  { name: 'HousingWire Annual', src: '/logos/housingwire-logo.png' },
  { name: 'Ellie Mae Experience', src: '/logos/elliemae-logo.png' },
  { name: 'Progress in Lending', src: '/logos/progress-logo.png' },
]

// Gallery images - replace with actual event photos
const galleryImages = [
  {
    src: '/images/speaking/event-1.jpg',
    alt: 'Jarrett speaking at MBA Annual Conference',
    event: 'MBA Annual Conference 2023'
  },
  {
    src: '/images/speaking/event-2.jpg',
    alt: 'Panel discussion at Digital Mortgage Conference',
    event: 'Digital Mortgage Conference 2023'
  },
  {
    src: '/images/speaking/event-3.jpg',
    alt: 'Keynote presentation at HousingWire Annual',
    event: 'HousingWire Annual 2023'
  },
  {
    src: '/images/speaking/event-4.jpg',
    alt: 'Workshop at Ellie Mae Experience',
    event: 'Ellie Mae Experience 2023'
  },
  {
    src: '/images/speaking/event-5.jpg',
    alt: 'Fireside chat at NAMB National',
    event: 'NAMB National Convention 2023'
  },
  {
    src: '/images/speaking/event-6.jpg',
    alt: 'AI in Mortgage panel discussion',
    event: 'Progress in Lending Think Tank 2023'
  },
]

export function PastEngagements() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Past Speaking Engagements
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Trusted by leading conferences and organizations in the mortgage industry
          </p>
        </motion.div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6"
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Fallback for missing logos
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="text-center text-sm text-gray-400 font-medium">${logo.name}</div>
                    `
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Event Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-xl font-signal font-semibold text-center text-gray-900 dark:text-white mb-8">
            Event Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium z-20">
                  {image.event}
                </p>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback for missing images
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="text-center p-4">
                        <p class="text-gray-500 text-sm">${image.event}</p>
                      </div>
                    `
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notable Speaking Engagements List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 mx-auto max-w-3xl"
        >
          <h3 className="text-xl font-signal font-semibold text-center text-gray-900 dark:text-white mb-8">
            Notable Recent Engagements
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-600 dark:border-lilac pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">MBA Annual Conference 2023</h4>
              <p className="text-gray-600 dark:text-gray-300">Keynote: "The AI Revolution in Mortgage Marketing"</p>
            </div>
            <div className="border-l-4 border-purple-600 dark:border-lilac pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Digital Mortgage Conference 2023</h4>
              <p className="text-gray-600 dark:text-gray-300">Panel Moderator: "Building Compliant Digital Experiences"</p>
            </div>
            <div className="border-l-4 border-purple-600 dark:border-lilac pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">HousingWire Annual 2023</h4>
              <p className="text-gray-600 dark:text-gray-300">Workshop: "Implementing AI Tools in Your Marketing Stack"</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative aspect-video">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}