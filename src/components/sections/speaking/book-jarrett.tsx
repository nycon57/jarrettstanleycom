'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Phone, Mail, MessageCircle } from 'lucide-react'
import { CalendlyWidget } from '@/components/calendly-widget'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { useAnalytics } from '@/hooks/use-analytics'
import { useState } from 'react'

export function BookJarrett() {
  const [showCalendly, setShowCalendly] = useState(false)
  const { trackSpeakingCalendlyClick } = useAnalytics()

  const handleCalendlyOpen = (source: string) => {
    setShowCalendly(true);
    trackSpeakingCalendlyClick('booking_section');
  }

  return (
    <section id="book-jarrett" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book Jarrett for Your Event
          </h2>
          <p className="mt-4 text-lg text-gray-600">
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
              <h3 className="text-xl font-signal font-semibold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Schedule a Call</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Book a 30-minute discovery call to discuss your event needs
                        </p>
                        <Button 
                          variant="link" 
                          className="mt-2 p-0 h-auto text-purple-600"
                          onClick={() => handleCalendlyOpen('schedule_call_card')}
                        >
                          Open Calendar →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Email Directly</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Send speaking inquiries and event details
                        </p>
                        <TrackedLink
                          href="mailto:speaking@jarrettstanley.com"
                          trackingData={{
                            linkText: 'speaking@jarrettstanley.com',
                            linkType: 'external'
                          }}
                          className="text-purple-600 hover:text-purple-700 text-sm mt-2 inline-block"
                          external
                        >
                          speaking@jarrettstanley.com
                        </TrackedLink>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Call Our Team</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Speak with our booking coordinator
                        </p>
                        <TrackedLink
                          href="tel:+1-555-123-4567"
                          trackingData={{
                            linkText: '+1 (555) 123-4567',
                            linkType: 'external'
                          }}
                          className="text-purple-600 hover:text-purple-700 text-sm mt-2 inline-block"
                          external
                        >
                          +1 (555) 123-4567
                        </TrackedLink>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Booking Information */}
            <div>
              <h3 className="text-xl font-signal font-semibold text-gray-900 mb-6">
                Booking Information
              </h3>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Speaking Formats</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Keynote Presentations (45-60 minutes)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Workshop Sessions (Half-day or full-day)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Panel Discussions & Fireside Chats</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Virtual Presentations & Webinars</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Pre-event consultation call</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Customized presentation for your audience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Q&A session with attendees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Post-event resources and takeaways</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
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
            onClick={() => handleCalendlyOpen('main_cta')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start the Conversation
          </Button>
        </motion.div>
      </div>

      {/* Calendly Widget */}
      {showCalendly && (
        <CalendlyWidget 
          url="https://calendly.com/jarrettstanley/speaking-inquiry"
          onClose={() => setShowCalendly(false)}
        />
      )}
    </section>
  )
}