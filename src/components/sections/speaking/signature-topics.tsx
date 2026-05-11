'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, TrendingUp, Users } from 'lucide-react'

const topics = [
  {
    icon: Brain,
    title: 'AI in Mortgage Marketing',
    description: 'Discover how artificial intelligence is revolutionizing mortgage marketing strategies and customer engagement.',
    keyPoints: [
      'Implementing AI-powered personalization at scale',
      'Automating compliance-friendly content creation',
      'Building data-driven marketing campaigns',
      'Measuring ROI on AI investments'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation',
    description: 'Learn how to lead digital transformation initiatives that drive real business results in the mortgage industry.',
    keyPoints: [
      'Creating a digital-first culture',
      'Modernizing legacy systems and processes',
      'Enhancing customer experience through technology',
      'Building competitive advantages with digital tools'
    ]
  },
  {
    icon: Users,
    title: 'Building Marketing Teams',
    description: 'Strategies for building and leading high-performance marketing teams in the digital age.',
    keyPoints: [
      'Recruiting and retaining top talent',
      'Fostering innovation and creativity',
      'Implementing agile marketing methodologies',
      'Developing data-driven team cultures'
    ]
  }
]

export function SignatureTopics() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Speaking Image */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 -mt-56 relative z-20"
        >
          <div className="max-w-4xl mx-auto">
            <Image
              src="/assets/images/Jarrett-Stock-7.jpg"
              alt="Jarrett Stanley delivering keynote presentation on AI marketing"
              width={1200}
              height={675}
              className="w-full h-[400px] md:h-[500px] rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-signal font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Signature Speaking Topics
          </h2>
          <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
            Engaging presentations that combine real-world experience with actionable insights
          </p>
        </m.div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {topics.map((topic, index) => {
            const Icon = topic.icon
            return (
              <m.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-lilac/10 dark:bg-lilac/20 p-3">
                        <Icon className="size-6 text-lilac" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-signal">{topic.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="mt-4 text-base">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-neutral-900 dark:text-white mb-3">Key Takeaways:</p>
                    <ul className="gap-y-2">
                      {topic.keyPoints.map((point) => (
                        <li key={point} className="flex items-start">
                          <span className="text-lilac mr-2">•</span>
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </m.div>
            )
          })}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            Need a custom presentation? Jarrett can tailor content to your specific audience and event goals.
          </p>
        </m.div>
      </div>
    </section>
  )
}