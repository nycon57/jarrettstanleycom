'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react'

const engagements = [
  {
    title: 'NAMMBA Connect 2025 - Mortgage Marketing Executive Summit',
    organization: 'National Association of Minority Mortgage Bankers of America',
    type: 'Featured Speaker',
    date: 'August 20, 2025',
    location: 'JW Marriott Bonnett Creek Resort, Orlando, FL',
    audience: 'Top Marketing Executives (Invite-Only, 50 seats)',
    topic: 'Automate to Elevate: AI, No-Code, and Workflow Hacks that 5× Your Marketing Output',
    description: 'Selected as a featured speaker for this exclusive, invite-only summit alongside industry leaders. Sharing proven frameworks and workflow hacks to help marketing teams leverage AI, no-code apps, and automations to scale efforts without adding more work.',
    highlights: [
      'Presenting actionable AI and automation frameworks',
      'Live demonstration of workflow optimization tools',
      'Sharing plug-and-play solutions for immediate implementation',
      'Leading strategic discussions with top marketing executives'
    ],
    impact: '🎯 Empowering executives to 5× their marketing output',
    featured: true
  },
  {
    title: 'Total Expert Accelerate Conference',
    organization: 'Total Expert',
    type: 'Marketing Experts Panelist',
    date: '2019',
    location: 'National Conference',
    audience: 'Mortgage & Banking Professionals',
    topic: 'Marketing Strategy for the Industry and Teams',
    description: 'Selected as a marketing expert panelist to share insights on building effective marketing strategies at both industry and team levels. Engaged in dynamic discussions about the evolving mortgage marketing landscape and best practices for team development.',
    highlights: [
      'Shared strategies for industry-wide marketing transformation',
      'Discussed building and scaling high-performance marketing teams',
      'Provided insights on adapting to digital consumer expectations',
      'Contributed to panel on marketing technology adoption'
    ],
    impact: '🚀 Shaped industry marketing strategy discussions'
  },
  {
    title: 'NAIFA-Tidewater Chapter Quarterly Meeting',
    organization: 'National Association of Insurance and Financial Advisors',
    type: 'Chapter Speaker',
    date: '2024',
    location: 'Tidewater, VA',
    audience: 'Financial Advisors & Insurance Professionals',
    topic: 'AI Revolution in Business & Marketing',
    description: 'An incredible session diving into the world of AI and how it\'s revolutionizing business and marketing. From enhancing efficiency with automation to improving customer experience through personalization, we explored how AI isn\'t just the future—it\'s the present!',
    highlights: [
      'Broke down common AI misconceptions',
      'Shared practical ChatGPT and Zapier automation use cases',
      'Explored new AI tools for voice synthesis and video creation',
      'Made AI accessible and valuable for businesses of all sizes'
    ],
    impact: '💡 Empowered advisors to work smarter with AI'
  },
  {
    title: 'Nationwide Mortgage Bankers Sales Summit',
    organization: 'Nationwide Mortgage Bankers',
    type: 'Keynote Speaker',
    date: '2024',
    location: 'Company-wide',
    audience: 'Sales Teams & Loan Officers',
    topic: 'AI-Powered Sales & Marketing Excellence',
    description: 'Led a transformative session for our national sales team on integrating AI tools into daily workflows, enhancing productivity, and delivering exceptional customer experiences.',
    highlights: [
      'Introduced AI tools for lead generation and nurturing',
      'Trained teams on content creation with AI',
      'Established best practices for AI-assisted communication',
      'Launched company-wide AI adoption initiative'
    ],
    impact: '📈 Increased team efficiency by 40%'
  },
  {
    title: 'Southern Trust Mortgage Sales Summit',
    organization: 'Southern Trust Mortgage',
    type: 'Guest Expert',
    date: '2023',
    location: 'Regional',
    audience: 'Mortgage Professionals & Leadership',
    topic: 'Building High-Performance Marketing Teams',
    description: 'Shared strategies for building and scaling modern marketing teams that leverage technology, data, and innovation to drive competitive advantage in the mortgage market.',
    highlights: [
      'Presented framework for digital-first marketing teams',
      'Discussed talent acquisition and retention strategies',
      'Showcased successful marketing automation case studies',
      'Provided actionable implementation roadmap'
    ],
    impact: '🎯 Inspired organizational marketing transformation'
  }
]

export function PastEngagements() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Speaking Highlights
          </h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
            Delivering transformative insights to industry leaders nationwide
          </p>
        </m.div>

        {/* Featured Engagements */}
        <div className="mt-20 gap-y-8">
          {engagements.map((engagement, index) => (
            <m.div
              key={engagement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`overflow-hidden ${engagement.featured ? 'border-lilac/30 bg-gradient-to-br from-lilac/5 to-transparent' : ''}`}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="gap-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-xl font-signal">
                          {engagement.title}
                        </CardTitle>
                        {engagement.featured && (
                          <Badge variant="default" className="bg-lilac">
                            <Sparkles className="size-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {engagement.organization}
                      </CardDescription>
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-700 dark:text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          {engagement.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {engagement.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="size-4" />
                          {engagement.audience}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {engagement.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="gap-y-4">
                  <div>
                    <p className="font-semibold text-lilac mb-1">
                      Topic: {engagement.topic}
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      {engagement.description}
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white mb-2">
                      Key Highlights:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {engagement.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start">
                          <span className="text-lilac mr-2">•</span>
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {engagement.impact && (
                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {engagement.impact}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>

        {/* CTA Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-lilac/10 to-orchid/10 rounded-2xl p-8"
        >
          <h3 className="text-xl font-signal font-semibold text-neutral-900 dark:text-white mb-3">
            Looking for an Engaging Speaker?
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            Jarrett brings energy, expertise, and actionable insights to every presentation. 
            Whether it's a keynote, workshop, or panel discussion, he delivers content that resonates and drives results.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90 transition-colors"
          >
            Book Jarrett for Your Event
          </Link>
        </m.div>
      </div>
    </section>
  )
}
