'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MessageCircle } from 'lucide-react'
export function BookJarrett() {

  return (
    <section id="book-jarrett" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Book Jarrett for Your Event
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Ready to inspire your audience with cutting-edge insights on AI and mortgage marketing?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Options */}
            <div>
              <h3 className="text-xl font-signal font-semibold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-lilac flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Email Me</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          Send speaking inquiries and event details
                        </p>
                        <button
                          onClick={() => {
                            const user = 'jarrett';
                            const domain = 'jarrettstanley.com';
                            window.location.href = `mailto:${user}@${domain}`;
                          }}
                          className="text-lilac hover:text-orchid text-sm mt-2 inline-block transition-colors"
                        >
                          Click to reveal email
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-lilac flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Call Me</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          Speak directly about your event needs
                        </p>
                        <button
                          onClick={() => {
                            const areaCode = '757';
                            const prefix = '646';
                            const lineNumber = '7613';
                            window.location.href = `tel:+1${areaCode}${prefix}${lineNumber}`;
                          }}
                          className="text-lilac hover:text-orchid text-sm mt-2 inline-block transition-colors"
                        >
                          Click to call
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Booking Information */}
            <div>
              <h3 className="text-xl font-signal font-semibold text-gray-900 dark:text-white mb-6">
                Booking Information
              </h3>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Speaking Formats</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">•</span>
                        <span>Keynote Presentations (45-60 minutes)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">•</span>
                        <span>Workshop Sessions (Half-day or full-day)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">•</span>
                        <span>Panel Discussions & Fireside Chats</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">•</span>
                        <span>Virtual Presentations & Webinars</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">✓</span>
                        <span>Pre-event consultation call</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">✓</span>
                        <span>Customized presentation for your audience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">✓</span>
                        <span>Q&A session with attendees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-lilac mr-2">✓</span>
                        <span>Post-event resources and takeaways</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t dark:border-gray-600">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Note:</strong> Speaking fees vary based on event type, location, 
                      and customization requirements. Virtual events may have different pricing.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button 
            size="lg" 
            onClick={() => {
              const user = 'jarrett';
              const domain = 'jarrettstanley.com';
              window.location.href = `mailto:${user}@${domain}?subject=Speaking%20Inquiry`;
            }}
            className="bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start the Conversation
          </Button>
        </motion.div>
      </div>

    </section>
  )
}