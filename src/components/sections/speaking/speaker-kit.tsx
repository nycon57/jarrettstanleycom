'use client'

import { motion } from 'framer-motion'
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
    <section className="py-24 sm:py-32 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-bold tracking-tight text-gray-900 sm:text-4xl">
            Download Speaker Kit
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to promote Jarrett at your event
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
              <h3 className="text-2xl font-signal font-bold mb-2">
                Complete Speaker Kit
              </h3>
              <p className="text-purple-100">
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
                        <div className="rounded-lg bg-purple-100 p-3">
                          <Icon className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.size}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-600">
                      Total download size: <span className="font-semibold">13.1 MB</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ZIP file containing all materials
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleDownload}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Full Kit
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Usage Guidelines:</strong> These materials are provided for event promotion purposes only. 
                  Please do not modify photos or bio content without permission. For custom requirements or 
                  additional materials, please contact us.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 mx-auto max-w-3xl"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-signal font-semibold text-gray-900 mb-4">
                Technical Requirements
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Wireless lapel microphone preferred (handheld as backup)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Confidence monitor for presentations</span>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>HDMI connection for laptop (adapter provided if needed)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Stage lighting suitable for video recording</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}