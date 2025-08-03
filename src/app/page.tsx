import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/sections/hero-section'
import { ServiceCard } from '@/components/sections/service-card'
import { StatsBlock } from '@/components/sections/stats-block'
import { TestimonialCard } from '@/components/sections/testimonial-card'
import { NewsletterSignup } from '@/components/sections/newsletter-signup'
import { ArrowRight, Mic, Brain, Users, Award, BookOpen, Calendar } from 'lucide-react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Where Mortgage Marketing Meets Artificial Intelligence',
  description: 'Transform your mortgage business with AI-driven strategies from Jarrett Stanley, CMO at Nationwide Mortgage Bankers and creator of TrueTone AI. Expert speaking and consulting services.',
  keywords: ['AI mortgage marketing', 'mortgage marketing consultant', 'TrueTone AI', 'mortgage digital transformation', 'AI in lending', 'mortgage technology speaker'],
  canonical: '/',
  ogImage: '/assets/images/jarrett-stanley-homepage-og.jpg'
})

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section with Animated Background */}
      <HeroSection />
      
      {/* Credibility Bar */}
      <section className="relative z-10 py-12 bg-[#131321]/80 backdrop-blur-lg border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-[#9D7AD6] mb-2" />
              <p className="text-white font-semibold">Chief Marketing Officer</p>
              <p className="text-gray-400 text-sm">at Nationwide Mortgage Bankers</p>
            </div>
            <div className="flex flex-col items-center">
              <Brain className="w-8 h-8 text-[#9D7AD6] mb-2" />
              <p className="text-white font-semibold">Creator of TrueTone AI</p>
              <p className="text-gray-400 text-sm">The Industry's First AI-Powered Marketing Platform</p>
            </div>
            <div className="flex flex-col items-center">
              <Mic className="w-8 h-8 text-[#9D7AD6] mb-2" />
              <p className="text-white font-semibold">Featured Speaker</p>
              <p className="text-gray-400 text-sm">at 50+ Industry Events Nationwide</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-[#9D7AD6] mb-2" />
              <p className="text-white font-semibold">Trusted Advisor</p>
              <p className="text-gray-400 text-sm">to Fortune 500 Mortgage Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="relative py-20 bg-[#131321]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-signal font-bold mb-6 text-white">
                Bridging the Gap Between
                <span className="block text-[#9D7AD6]">Technology and Trust</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                As Chief Marketing Officer at Nationwide Mortgage Bankers and creator of TrueTone AI, 
                I'm on a mission to revolutionize how mortgage companies connect with borrowers in the digital age.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                With over a decade of experience in mortgage marketing and a passion for AI innovation, 
                I help industry leaders leverage cutting-edge technology while maintaining the personal touch 
                that builds lasting relationships.
              </p>
              <Button asChild variant="outline" className="border-[#9D7AD6] text-[#9D7AD6] hover:bg-[#9D7AD6]/10">
                <Link href="/about">
                  Learn My Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#9D7AD6] to-[#4F518C] p-1">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/images/Jarrett-Stock-3.png"
                    alt="Jarrett Stanley, Chief Marketing Officer"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative py-20 bg-gradient-to-b from-[#131321] to-[#2C2A4A]/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-signal font-bold mb-4 text-white">
              How I Can Help Your Business
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you need an inspiring keynote, strategic consulting, or AI implementation guidance, 
              I bring proven expertise to transform your mortgage marketing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Mic className="w-8 h-8 text-white" />}
              title="Speaking Engagements"
              description="Inspire your audience with actionable insights on AI adoption, digital transformation, and the future of mortgage marketing."
              href="/speaking"
            />
            <ServiceCard
              icon={<Brain className="w-8 h-8 text-white" />}
              title="AI Consulting"
              description="Get personalized guidance on implementing AI solutions that enhance customer experience while maintaining compliance."
              href="/services/consulting"
            />
            <ServiceCard
              icon={<Users className="w-8 h-8 text-white" />}
              title="Executive Advisory"
              description="Strategic counsel for C-suite leaders navigating the intersection of technology, marketing, and mortgage lending."
              href="/services/consulting"
            />
          </div>
        </div>
      </section>

      {/* TrueTone AI Showcase */}
      <section id="truetone" className="relative py-20 bg-[#2C2A4A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-signal font-bold mb-4 text-white">
              Introducing TrueTone AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The mortgage industry's first AI-powered marketing platform that creates authentic, 
              compliant content in your brand's unique voice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <StatsBlock value="10000" label="Content Pieces Generated" suffix="+" />
            <StatsBlock value="85" label="Time Saved on Content Creation" suffix="%" />
            <StatsBlock value="3" label="Faster Campaign Launch" suffix="x" />
            <StatsBlock value="100" label="Compliance Confidence" suffix="%" />
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-[#9D7AD6] to-[#7FEDFF] hover:from-[#9D7AD6]/90 hover:to-[#7FEDFF]/90">
              <Link href="https://truetoneai.com" target="_blank" rel="noopener noreferrer">
                Discover TrueTone AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="relative py-20 bg-gradient-to-b from-[#2C2A4A] to-[#131321]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-signal font-bold mb-4 text-white">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Thoughts on AI, mortgage marketing, and the future of our industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Placeholder for blog posts */}
            {[1, 2, 3].map((i) => (
              <article key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-sm text-[#9D7AD6] mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>Coming Soon</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Article Title Placeholder {i}
                </h3>
                <p className="text-gray-400 mb-4">
                  Insightful content about AI and mortgage marketing coming soon...
                </p>
                <Link href="#" className="text-[#9D7AD6] hover:text-[#DABFFF] inline-flex items-center">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/resources">
                <BookOpen className="mr-2 h-4 w-4" />
                View All Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Speaking Highlights */}
      <section className="relative py-20 bg-[#131321]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-signal font-bold mb-4 text-white">
              What People Are Saying
            </h2>
          </div>
          
          <TestimonialCard
            quote="Jarrett's presentation on AI in mortgage marketing was the highlight of our conference. His insights were not only visionary but immediately actionable. Our team left inspired and equipped with practical strategies we implemented right away."
            author="Sarah Johnson"
            title="VP of Marketing"
            company="National Mortgage Corporation"
            className="max-w-4xl mx-auto"
          />
          
          <div className="flex justify-center mt-8 gap-4">
            <Button asChild className="bg-gradient-to-r from-[#9D7AD6] to-[#4F518C] hover:from-[#9D7AD6]/90 hover:to-[#4F518C]/90">
              <Link href="/speaking">
                Book Me to Speak
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-20 bg-gradient-to-b from-[#131321] to-[#2C2A4A]">
        <div className="max-w-7xl mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </main>
  )
}