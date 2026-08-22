'use client'

import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { SpeakingInquiryForm } from '@/components/sections/speaking/speaking-inquiry-form'
export function BookJarrett() {

  return (
    <section id="book-jarrett" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Book Jarrett for Your Event
          </h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
            Ready to inspire your audience with cutting-edge insights on AI and mortgage marketing?
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Options */}
            <div>
              <h3 className="text-xl font-signal font-semibold text-neutral-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              <div className="gap-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="size-6 text-lilac flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">Email Me</h4>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
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
                      <Phone className="size-6 text-lilac flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">Call Me</h4>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
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
              <h3 className="text-xl font-signal font-semibold text-neutral-900 dark:text-white mb-6">
                Booking Information
              </h3>
              <Card>
                <CardContent className="p-6 gap-y-6">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Speaking Formats</h4>
                    <ul className="gap-y-2 text-sm text-neutral-700 dark:text-neutral-300">
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
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">What's Included</h4>
                    <ul className="gap-y-2 text-sm text-neutral-700 dark:text-neutral-300">
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

                  <div className="pt-4 border-t dark:border-neutral-600">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      <strong>Note:</strong> Speaking fees vary based on event type, location, 
                      and customization requirements. Virtual events may have different pricing.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </m.div>

        {/* Inquiry form */}
        <m.div
          id="speaking-inquiry"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-10">
            <h3 className="text-xl font-signal font-semibold text-neutral-900 dark:text-white">
              Tell me about your event
            </h3>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">
              The more you share about the date, audience, and format, the more specific the
              first reply will be.
            </p>
            <div className="mt-8">
              <SpeakingInquiryForm />
            </div>
          </div>
        </m.div>

        {/* Prefer email */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const user = 'jarrett';
              const domain = 'jarrettstanley.com';
              window.location.href = `mailto:${user}@${domain}?subject=Speaking%20Inquiry`;
            }}
          >
            <MessageCircle className="mr-2 size-5" />
            Prefer email? Start the conversation
          </Button>
        </m.div>
      </div>

    </section>
  )
}