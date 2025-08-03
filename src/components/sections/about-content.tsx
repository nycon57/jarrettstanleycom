'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Briefcase, Brain, Lightbulb, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Timeline } from './timeline'
import { ExpertiseCard } from './expertise-card'
import { AwardsRecognition } from './awards-recognition'

const timelineItems = [
  {
    id: '1',
    date: '2022 - Present',
    title: 'Chief Marketing Officer',
    company: 'Nationwide Mortgage Bankers',
    description: 'Leading digital transformation and AI adoption across all marketing channels. Spearheading innovative campaigns that have increased lead generation by 300% while maintaining compliance standards.',
    type: 'position' as const,
  },
  {
    id: '2',
    date: '2023',
    title: 'Creator & Founder',
    company: 'TrueTone AI',
    description: 'Developed the industry\'s first AI-powered content generation platform specifically designed for mortgage professionals. The platform now serves over 1,000 loan officers nationwide.',
    type: 'milestone' as const,
  },
  {
    id: '3',
    date: '2019 - 2022',
    title: 'VP of Digital Marketing',
    company: 'Premier Mortgage Group',
    description: 'Transformed traditional marketing operations into a data-driven powerhouse. Implemented marketing automation that reduced cost per lead by 45%.',
    type: 'position' as const,
  },
  {
    id: '4',
    date: '2020',
    title: 'Digital Innovation Award',
    company: 'Mortgage Bankers Association',
    description: 'Recognized for pioneering use of AI and machine learning in mortgage marketing compliance and content generation.',
    type: 'achievement' as const,
  },
  {
    id: '5',
    date: '2015 - 2019',
    title: 'Marketing Director',
    company: 'Regional Mortgage Solutions',
    description: 'Built and scaled the marketing department from 3 to 25 team members. Launched the company\'s first digital marketing initiatives.',
    type: 'position' as const,
  },
]

const expertiseAreas = [
  {
    title: 'Mortgage Marketing',
    description: 'Deep expertise in compliance-driven marketing strategies that generate results while adhering to industry regulations.',
    icon: Briefcase,
    skills: ['Lead Generation', 'Compliance Marketing', 'Brand Strategy', 'Campaign Management'],
  },
  {
    title: 'AI & Technology',
    description: 'Pioneer in applying artificial intelligence to solve real-world mortgage marketing challenges.',
    icon: Brain,
    skills: ['AI Implementation', 'MarTech Stack', 'Automation', 'Data Analytics'],
  },
  {
    title: 'Digital Innovation',
    description: 'Transforming traditional mortgage marketing through cutting-edge digital strategies and tools.',
    icon: Lightbulb,
    skills: ['Digital Transformation', 'Innovation Strategy', 'Process Optimization', 'Tech Integration'],
  },
  {
    title: 'Team Leadership',
    description: 'Building and mentoring high-performance marketing teams that deliver exceptional results.',
    icon: Users,
    skills: ['Team Building', 'Talent Development', 'Strategic Planning', 'Culture Development'],
  },
]

const awards = [
  {
    id: '1',
    title: 'Digital Innovation Award',
    organization: 'Mortgage Bankers Association',
    year: '2020',
    description: 'Recognized for pioneering AI applications in mortgage marketing',
    type: 'award' as const,
  },
  {
    id: '2',
    title: 'Marketing Excellence Award',
    organization: 'National Mortgage Professional',
    year: '2021',
    description: 'Outstanding achievement in digital marketing transformation',
    type: 'recognition' as const,
  },
  {
    id: '3',
    title: 'Top 40 Under 40',
    organization: 'Mortgage Executive Magazine',
    year: '2019',
    description: 'Recognized as one of the industry\'s rising leaders',
    type: 'achievement' as const,
  },
  {
    id: '4',
    title: 'AI Implementation Excellence',
    organization: 'FinTech Breakthrough Awards',
    year: '2023',
    description: 'Best use of AI in financial services marketing',
    type: 'award' as const,
  },
]

export function AboutContent() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5" />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                  Jarrett Stanley
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Chief Marketing Officer at Nationwide Mortgage Bankers and creator of TrueTone AI. 
                I'm on a mission to revolutionize mortgage marketing through the power of artificial intelligence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/speaking">
                    Invite to Speak
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/30" />
                    <p>Professional Photo</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Professional Summary */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Bridging Innovation and Tradition
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                With over 15 years in mortgage marketing, I've witnessed the industry's evolution from 
                traditional methods to digital-first strategies. My journey has been defined by a constant 
                pursuit of innovation while respecting the fundamental principles that make mortgage 
                lending a cornerstone of the American dream.
              </p>
              <p>
                As CMO at Nationwide Mortgage Bankers, I lead a team of talented marketers in crafting 
                campaigns that not only generate leads but build lasting relationships. My creation of 
                TrueTone AI stems from a belief that technology should empower mortgage professionals, 
                not replace the human touch that defines our industry.
              </p>
              <p>
                I'm passionate about sharing knowledge and helping others navigate the intersection of 
                mortgage lending and artificial intelligence. Whether through speaking engagements, 
                consulting, or mentorship, I'm committed to elevating our industry's marketing standards.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Career Timeline */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Professional Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A timeline of key positions and achievements that shaped my career
            </p>
          </motion.div>
          
          <Timeline items={timelineItems} className="max-w-4xl mx-auto" />
        </div>
      </section>
      
      {/* Expertise Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Areas of Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining deep industry knowledge with cutting-edge technology
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard key={area.title} {...area} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Honored to be recognized by industry leaders and peers
            </p>
          </motion.div>
          
          <AwardsRecognition items={awards} className="max-w-4xl mx-auto" />
        </div>
      </section>
      
      {/* Personal Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                My Mission
              </h2>
            </div>
            
            <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 rounded-2xl" />
              <div className="relative">
                <p className="text-xl leading-relaxed mb-6">
                  "I believe the future of mortgage marketing lies at the intersection of human 
                  creativity and artificial intelligence. My mission is to empower mortgage professionals 
                  with the tools and knowledge they need to thrive in this new era."
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every day, I work to bridge the gap between cutting-edge technology and practical 
                  application. Whether it's through TrueTone AI, speaking at industry events, or 
                  consulting with forward-thinking companies, I'm committed to elevating our industry's 
                  marketing capabilities while maintaining the trust and integrity that borrowers deserve.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-700" />
            <div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='white' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
              }} 
            />
            
            <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Let's Shape the Future Together
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Whether you're looking to transform your marketing, learn about AI implementation, 
                or book a speaking engagement, I'm here to help.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <Link href="/speaking">
                    Invite to Speak
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}