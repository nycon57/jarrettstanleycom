'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, FileText, Camera, Mic, Award } from 'lucide-react'

const kitItems = [
  {
    icon: FileText,
    title: 'Speaker Bio',
    description: 'Professional biography in multiple lengths (50, 100, 200 words)',
    size: '125 KB'
  },
  {
    icon: Camera,
    title: 'Professional Photos',
    description: 'High-resolution headshots and speaking photos',
    size: '12.5 MB'
  },
  {
    icon: Mic,
    title: 'Introduction Scripts',
    description: 'Pre-written introductions for event hosts',
    size: '85 KB'
  },
  {
    icon: Award,
    title: 'Achievements & Media',
    description: 'Awards, media features, and press mentions',
    size: '245 KB'
  }
]

export function SpeakerKit() {
  const handleDownload = () => {
    // In production, this would trigger a download of the actual speaker kit
    // For now, we'll simulate it
    const link = document.createElement('a')
    link.href = '/downloads/jarrett-stanley-speaker-kit.zip'
    link.download = 'jarrett-stanley-speaker-kit.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <LazyMotion features={domAnimation}>
    <section className="py-24 sm:py-32 bg-gradient-to-br from-lilac/10 to-lavender/20 dark:from-neutral-900 dark:to-neutral-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Download Speaker Kit
          </h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
            Everything you need to promote Jarrett at your event
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-lilac to-orchid dark:from-lilac dark:to-orchid p-8 text-white">
              <h3 className="text-2xl font-signal font-semibold mb-2">
                Complete Speaker Kit
              </h3>
              <p className="text-white/80 dark:text-white/80">
                Professional materials for event promotion and introduction
              </p>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {kitItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-lg bg-lilac/10 dark:bg-lilac/20 p-3">
                          <Icon className="size-6 text-lilac dark:text-lilac" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">{item.description}</p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{item.size}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t dark:border-neutral-600 pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      Total download size: <span className="font-semibold">13.1 MB</span>
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                      ZIP file containing all materials
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleDownload}
                    className="bg-lilac hover:bg-lilac/90"
                  >
                    <Download className="mr-2 size-5" />
                    Download Full Kit
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  <strong>Usage Guidelines:</strong> These materials are provided for event promotion purposes only. 
                  Please do not modify photos or bio content without permission. For custom requirements or 
                  additional materials, please contact us.
                </p>
              </div>
            </CardContent>
          </Card>
        </m.div>

        {/* Technical Requirements */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 mx-auto max-w-3xl"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-signal font-semibold text-neutral-900 dark:text-white mb-4">
                Technical Requirements
              </h3>
              <div className="gap-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                <div className="flex items-start">
                  <span className="text-lilac dark:text-lilac mr-2">•</span>
                  <span>Wireless lapel microphone preferred (handheld as backup)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lilac dark:text-lilac mr-2">•</span>
                  <span>Confidence monitor for presentations</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lilac dark:text-lilac mr-2">•</span>
                  <span>HDMI connection for laptop (adapter provided if needed)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-lilac dark:text-lilac mr-2">•</span>
                  <span>Stage lighting suitable for video recording</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </div>
    </section>
    </LazyMotion>
  )
}
