'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Briefcase, Brain, Lightbulb, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Timeline } from './timeline'
import { ExpertiseCard } from './expertise-card'
import { CtaSection } from './cta-section'

const timelineItems = [
  {
    id: '1',
    date: 'May 2023 - Present',
    title: 'Chief Marketing Officer',
    company: 'Nationwide Mortgage Bankers',
    description: 'Leading comprehensive marketing transformation and AI innovation strategy. Managing enterprise-wide digital initiatives that have driven 300% increase in qualified leads and established NMB as an industry innovation leader.',
    type: 'position' as const,
  },
  {
    id: '2',
    date: 'Jun 2021 - May 2023',
    title: 'EVP & CMO',
    company: 'Nationwide Mortgage Bankers / Southern Trust Mortgage',
    description: 'Orchestrated the successful marketing integration during merger, unifying brand strategies and scaling operations across multiple states. Elevated from EVP to CMO while pioneering AI-powered marketing automation that revolutionized lead generation and compliance processes.',
    type: 'position' as const,
  },
  {
    id: '3',
    date: '2023',
    title: 'HousingWire Marketing Leader',
    company: 'HousingWire',
    description: 'Recognized for revolutionizing the mortgage industry\'s marketing landscape through data-driven strategies, predictive analytics, and fostering a culture of innovation that allows rapid response to market shifts and emerging trends.',
    type: 'achievement' as const,
  },
  {
    id: '4',
    date: '2022',
    title: 'Top 40 Under 40',
    company: 'National Mortgage Professional',
    description: 'Honored for leveraging technology to create premium user experiences and championing expanded homeownership opportunities for underserved communities through innovative first-time buyer programs.',
    type: 'achievement' as const,
  },
  {
    id: '5',
    date: '2020',
    title: 'Digital Innovation Award',
    company: 'Mortgage Bankers Association',
    description: 'Recognized for pioneering use of AI and machine learning in mortgage marketing compliance and content generation.',
    type: 'achievement' as const,
  },
  {
    id: '6',
    date: 'Sep 2016 - Jun 2021',
    title: 'VP to SVP of Marketing',
    company: 'Southern Trust Mortgage',
    description: 'Set the vision for brand representation, recruiting, and marketing support across all channels. Led agile transformation of marketing operations, managing multi-million dollar budgets and building a high-performance team that delivered consistent quarterly growth through data-driven strategies.',
    type: 'position' as const,
  },
  {
    id: '7',
    date: 'Jul 2011 - Sep 2016',
    title: 'Creative Director',
    company: 'Atlantic Bay Mortgage Group',
    description: 'Orchestrated complete company rebrand in 2013 that tripled market share and catalyzed expansion to 40+ new locations nationwide. Led creative vision across all mediums, contributing to record $3B+ in annual production and recognition as a top 100 mortgage company nationally.',
    type: 'position' as const,
  },
  {
    id: '8',
    date: 'Jun 2007 - Jul 2011',
    title: 'Senior Graphic Designer',
    company: 'Movement Mortgage',
    description: 'Instrumental in scaling marketing operations during explosive growth from 8 to 500+ employees. Established foundational brand identity and marketing systems that supported multi-state expansion while maintaining consistent brand excellence.',
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

export function AboutContent() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 via-transparent to-orchid/5" />
        
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
                <span className="bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent">
                  Jarrett Stanley
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Chief Marketing Officer at Nationwide Mortgage Bankers. 
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
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-lilac/10 to-orchid/10">
                <Image
                  src="/assets/images/Jarrett-Stock-3.png"
                  alt="Jarrett Stanley"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
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
                campaigns that not only generate leads but build lasting relationships. My work in AI innovation 
                stems from a belief that technology should empower mortgage professionals, 
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
      
      
      {/* Personal Mission */}
      <section className="bg-muted/30 py-20">
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
              <div className="absolute inset-0 bg-gradient-to-br from-lilac/5 to-orchid/5 rounded-2xl" />
              <div className="relative text-center">
                <p className="text-xl lg:text-2xl leading-relaxed mb-6">
                  I believe the future of mortgage marketing lies at the intersection of human 
                  creativity and artificial intelligence. <span className="bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent font-bold">My mission is to empower mortgage professionals 
                  with the tools and knowledge they need to thrive in this new era.</span> Every day, I work to bridge the gap between cutting-edge technology and practical 
                  application. Whether it's through AI innovation, speaking at industry events, or 
                  consulting with forward-thinking companies, I'm committed to elevating our industry's 
                  marketing capabilities while maintaining the trust and integrity that borrowers deserve.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter CTA Section */}
      <CtaSection />
    </main>
  )
}