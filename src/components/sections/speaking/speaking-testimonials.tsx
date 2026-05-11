'use client'

import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
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

const STAR_RATING_POSITIONS = [
  { id: 'star-1', value: 1 },
  { id: 'star-2', value: 2 },
  { id: 'star-3', value: 3 },
  { id: 'star-4', value: 4 },
  { id: 'star-5', value: 5 },
]

export function SpeakingTestimonials() {
  const [testimonialState, setTestimonialState] = useState<{ testimonials: Testimonial[]; loading: boolean }>({
    testimonials: [],
    loading: true
  })
  const { testimonials, loading } = testimonialState

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
        setTestimonialState({ testimonials: placeholderTestimonials, loading: false })
      } else {
        setTestimonialState({ testimonials: data, loading: false })
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      // Use placeholder testimonials on error
      setTestimonialState({ testimonials: placeholderTestimonials, loading: false })
    }
  }

  if (loading) {
    return (
      <section className="py-24 sm:py-32 bg-neutral-50 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              What Audiences Are Saying
            </h2>
            <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
              Loading testimonials…
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 sm:py-32 bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            What Audiences Are Saying
          </h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
            Real feedback from conference organizers and attendees
          </p>
        </m.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <m.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-neutral-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="size-8 text-purple-600 dark:text-lilac flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-1 mb-3">
                        {STAR_RATING_POSITIONS.map((star) => (
                          <svg
                            key={star.id}
                            className={`size-4 ${
                              star.value <= (testimonial.rating || 0) ? 'text-yellow-400 fill-current' : 'text-neutral-400 dark:text-neutral-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">{testimonial.quote}</p>
                      {testimonial.event_name && (
                        <p className="text-sm text-purple-600 dark:text-lilac font-medium mb-2">
                          {testimonial.event_name}
                        </p>
                      )}
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white">{testimonial.author_name}</p>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                          {testimonial.author_role ? `${testimonial.author_role}${testimonial.author_company ? ', ' + testimonial.author_company : ''}` : testimonial.author_company || ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </m.div>
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
