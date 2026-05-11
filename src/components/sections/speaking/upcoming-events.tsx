'use client'

import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase-client'
import { formatDateLabel } from '@/lib/date-format'

interface SpeakingEvent {
  id: string
  name: string
  event_date: string
  location: string | null
  organization: string
  topics?: string[]
  event_type: 'keynote' | 'panel' | 'workshop' | 'webinar' | 'conference' | 'podcast'
  event_url?: string | null
  description?: string | null
  is_featured: boolean | null
  is_virtual?: boolean | null
}

export function UpcomingEvents() {
  const [eventState, setEventState] = useState<{ events: SpeakingEvent[]; loading: boolean }>({
    events: [],
    loading: true
  })
  const { events, loading } = eventState

  useEffect(() => {
    fetchUpcomingEvents()
  }, [])

  async function fetchUpcomingEvents() {
    try {
      const supabase = createBrowserClient()
      const { data, error } = await supabase
        .from('speaking_events')
        .select('*')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(6)

      if (error) throw error

      // If no data, use placeholder events
      if (!data || data.length === 0) {
        setEventState({ events: placeholderEvents, loading: false })
      } else {
        // Transform data to handle null values
        const transformedData = data.map(event => ({
          ...event,
          topics: event.topics || undefined,
          event_type: event.event_type as "keynote" | "panel" | "workshop" | "webinar" | "podcast" | "conference" || "keynote"
        }))
        setEventState({ events: transformedData, loading: false })
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      // Use placeholder events on error
      setEventState({ events: placeholderEvents, loading: false })
    }
  }

  const getEventTypeLabel = (type: string) => {
    const labels = {
      keynote: 'Keynote',
      panel: 'Panel Discussion',
      workshop: 'Workshop',
      webinar: 'Webinar'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      keynote: 'bg-purple-100 text-purple-700',
      panel: 'bg-blue-100 text-blue-700',
      workshop: 'bg-green-100 text-green-700',
      webinar: 'bg-orange-100 text-orange-700'
    }
    return colors[type as keyof typeof colors] || 'bg-neutral-100 text-neutral-700'
  }

  if (loading) {
    return (
      <section className="py-24 sm:py-32 bg-white dark:bg-neutral-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Upcoming Speaking Events
            </h2>
            <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
              Loading events…
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return (
      <section className="py-24 sm:py-32 bg-white dark:bg-neutral-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Upcoming Speaking Events
            </h2>
            <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
              Check back soon for upcoming speaking engagements
            </p>
            <div className="mt-8">
              <Button asChild>
                <a href="#book-jarrett">Book Jarrett for Your Event</a>
              </Button>
            </div>
          </m.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-neutral-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Upcoming Speaking Events
          </h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
            Join Jarrett at these upcoming conferences and events
          </p>
        </m.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {events.map((event, index) => {
            const eventDateLabel = formatDateLabel(event.event_date, 'MMMM d, yyyy')

            return (
            <m.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${event.is_featured ? 'ring-2 ring-purple-600 dark:ring-lilac' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getEventTypeColor(event.event_type)}`}>
                      {getEventTypeLabel(event.event_type)}
                    </span>
                    {event.is_featured && (
                      <span className="text-xs font-medium text-purple-600 dark:text-lilac">Featured</span>
                    )}
                  </div>
                  <CardTitle className="text-xl font-signal">{event.name}</CardTitle>
                  <p className="mt-2 text-base font-semibold text-purple-600 dark:text-lilac">{event.topics?.join(', ') || event.organization}</p>
                </CardHeader>
                <CardContent>
                  <div className="gap-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4" />
                      <span>{eventDateLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <span>{event.location}</span>
                    </div>
                    {event.organization && (
                      <div className="flex items-center gap-2">
                        <Clock className="size-4" />
                        <span>{event.organization}</span>
                      </div>
                    )}
                  </div>
                  {event.description && (
                    <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-300">{event.description}</p>
                  )}
                  {event.event_url && (
                    <div className="mt-6">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a href={event.event_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 size-4" />
                          {event.is_virtual ? 'Join Virtual Event' : 'Register for Event'}
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </m.div>
          )})}
        </div>
      </div>
    </section>
  )
}

// Placeholder events for development/demo
const placeholderEvents: SpeakingEvent[] = [
  {
    id: '1',
    name: 'MBA Annual Conference 2024',
    event_date: '2025-10-15',
    location: 'San Diego, CA',
    organization: 'Mortgage Bankers Association',
    topics: ['The Future of AI in Mortgage Marketing', 'Digital Transformation'],
    event_type: 'keynote',
    event_url: 'https://mba.org/annual',
    description: 'Join Jarrett for a keynote presentation on how AI is reshaping mortgage marketing strategies.',
    is_featured: true,
    is_virtual: false
  },
  {
    id: '2',
    name: 'Digital Mortgage Conference',
    event_date: '2025-09-20',
    location: 'Las Vegas, NV',
    organization: 'Digital Mortgage Conference',
    topics: ['Building Compliant AI Systems', 'Regulatory Technology'],
    event_type: 'panel',
    event_url: 'https://digitalmortgage.com',
    description: 'Panel discussion on implementing AI while maintaining regulatory compliance.',
    is_featured: false,
    is_virtual: false
  },
  {
    id: '3',
    name: 'Marketing Leadership Summit',
    event_date: '2025-11-05',
    location: 'Virtual',
    organization: 'Marketing Leadership Institute',
    topics: ['Leading High-Performance Marketing Teams', 'AI-Powered Marketing'],
    event_type: 'webinar',
    event_url: 'https://marketingleadership.com',
    description: 'Virtual workshop on building and leading innovative marketing teams in the digital age.',
    is_featured: false,
    is_virtual: true
  },
]
