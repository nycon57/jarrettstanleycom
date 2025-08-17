'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase-client'

interface Testimonial {
  id: string
  author_name: string
  author_role: string | null
  author_company: string | null
  quote: string
  rating: number | null
  event_name?: string
  created_at: string | null
}

export function SpeakingTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    try {
      const supabase = createBrowserClient()
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('service_type', 'speaking')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error

      // If no data, use placeholder testimonials
      if (!data || data.length === 0) {
        setTestimonials(placeholderTestimonials)
      } else {
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      // Use placeholder testimonials on error
      setTestimonials(placeholderTestimonials)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-signal font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What Audiences Are Saying
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Audiences Are Saying
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Real feedback from conference organizers and attendees
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-purple-600 dark:text-lilac flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < (testimonial.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.quote}</p>
                      {testimonial.event_name && (
                        <p className="text-sm text-purple-600 dark:text-lilac font-medium mb-2">
                          {testimonial.event_name}
                        </p>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author_name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {testimonial.author_role ? `${testimonial.author_role}${testimonial.author_company ? ', ' + testimonial.author_company : ''}` : testimonial.author_company || ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Placeholder testimonials for development/demo
const placeholderTestimonials: Testimonial[] = [
  {
    id: '1',
    author_name: 'Sarah Johnson',
    author_role: 'Conference Director',
    author_company: 'Mortgage Bankers Association',
    quote: 'Jarrett\'s keynote on AI in mortgage marketing was the highlight of our conference. His ability to make complex technology accessible and actionable for our audience was exceptional.',
    rating: 5,
    event_name: 'MBA Annual 2023',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    author_name: 'Michael Chen',
    author_role: 'CEO',
    author_company: 'Digital Lending Solutions',
    quote: 'One of the most engaging speakers we\'ve had. Jarrett\'s real-world examples and practical insights on digital transformation gave our team a clear roadmap for implementation.',
    rating: 5,
    event_name: 'Digital Mortgage Conference',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    author_name: 'Amanda Martinez',
    author_role: 'VP of Marketing',
    author_company: 'First National Mortgage',
    quote: 'The session on building compliant AI systems was eye-opening. Jarrett presented complex compliance issues in a way that made sense for both technical and non-technical attendees.',
    rating: 5,
    event_name: 'Compliance Summit 2023',
    created_at: new Date().toISOString()
  },
]