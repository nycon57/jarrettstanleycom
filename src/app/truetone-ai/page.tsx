
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Brain, 
  Globe, 
  Award,
  BarChart3,
  Clock,
  Target,
  Lightbulb,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Mic,
  Video,
  Mail,
  Share2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'TrueTone AI | Revolutionary AI-Powered Marketing Platform',
  description: 'Discover TrueTone AI - the mortgage industry\'s first AI-powered marketing platform. Created by Jarrett Stanley, CMO at Nationwide Mortgage Bankers.',
  openGraph: {
    title: 'TrueTone AI | Revolutionary AI Marketing Platform',
    description: 'The mortgage industry\'s first compliance-ready AI marketing platform',
    type: 'website',
  },
}

// Product Hero Section
function ProductHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(19, 19, 33)"
        gradientBackgroundEnd="rgb(44, 42, 74)"
        firstColor="79, 81, 140"
        secondColor="157, 122, 214"
        thirdColor="218, 191, 255"
        fourthColor="127, 237, 255"
        fifthColor="79, 81, 140"
        pointerColor="157, 122, 214"
        size="80%"
        blendingValue="overlay"
        className="absolute inset-0"
        containerClassName="absolute inset-0"
        interactive={true}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#DABFFF]" />
              <span className="text-sm text-gray-300">Industry-First AI Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-signal font-bold mb-6 text-white">
              Meet
              <span className="block bg-gradient-to-r from-[#9D7AD6] via-[#DABFFF] to-[#7FEDFF] bg-clip-text text-transparent">
                TrueTone AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl">
              The mortgage industry's first AI-powered marketing platform that captures your unique voice and creates authentic, compliant content at scale.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl">
              Built by mortgage professionals, for mortgage professionals. Experience the future of financial services marketing with AI that truly understands your industry.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="xl"
                className="bg-gradient-to-r from-[#9D7AD6] to-[#4F518C] hover:from-[#9D7AD6]/90 hover:to-[#4F518C]/90 text-white"
              >
                <Link href="https://truetone.ai" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visit TrueTone.ai
                </Link>
              </Button>
              <Button 
                asChild
                size="xl"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Link href="/contact">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Product Demo */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-[#9D7AD6]/20 to-[#4F518C]/20 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="h-16 w-16 text-white/80 mx-auto mb-4" />
                  <p className="text-white/80 text-lg">Product Demo</p>
                  <p className="text-white/60 text-sm">See TrueTone AI in Action</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-gray-300">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm text-gray-300">Content Pieces</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-300">Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Innovation Story Section
function InnovationStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-signal font-bold mb-6 text-gray-900">
            The Innovation Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From problem identification to market-changing solution - the journey of creating the mortgage industry's first AI marketing platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Problem */}
          <Card className="border-red-100 bg-red-50/50">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl font-signal">The Problem</CardTitle>
              <CardDescription>
                Mortgage professionals spending 70% of their time on repetitive marketing tasks instead of serving clients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  Generic, non-personal content
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  Complex compliance requirements
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  Time-intensive content creation
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  Inconsistent brand messaging
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Solution Development */}
          <Card className="border-blue-100 bg-blue-50/50">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-signal">The Solution</CardTitle>
              <CardDescription>
                AI that captures individual communication styles and creates authentic, compliant content at scale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  TrueTone voice modeling technology
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Built-in compliance engine
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Multi-format content generation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Industry-specific intelligence
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Market Impact */}
          <Card className="border-green-100 bg-green-50/50">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl font-signal">Market Impact</CardTitle>
              <CardDescription>
                Transforming how mortgage professionals approach marketing and client communication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  95% reduction in content creation time
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  300% increase in content consistency
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  100% compliance adherence
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  Industry-wide adoption growing
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Technology Stack Section
function TechnologyStack() {
  const techCategories = [
    {
      title: "AI & Machine Learning",
      icon: Brain,
      color: "purple",
      technologies: [
        { name: "OpenAI GPT-4", description: "Advanced language processing" },
        { name: "ElevenLabs", description: "Voice synthesis & modeling" },
        { name: "Custom NLP", description: "Industry-specific understanding" },
        { name: "Sentiment Analysis", description: "Emotional intelligence" }
      ]
    },
    {
      title: "Platform Architecture",
      icon: Zap,
      color: "blue",
      technologies: [
        { name: "Next.js 15", description: "Modern web framework" },
        { name: "Supabase", description: "Real-time database" },
        { name: "Vercel Edge", description: "Global deployment" },
        { name: "TypeScript", description: "Type-safe development" }
      ]
    },
    {
      title: "Compliance & Security",
      icon: Shield,
      color: "green",
      technologies: [
        { name: "CFPB Engine", description: "Regulatory compliance" },
        { name: "NMLS Integration", description: "License verification" },
        { name: "Data Encryption", description: "Enterprise security" },
        { name: "Audit Trails", description: "Complete tracking" }
      ]
    }
  ]
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-signal font-bold mb-6 text-gray-900">
            Technology Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on cutting-edge technology with mortgage industry expertise at its core.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {techCategories.map((category, index) => (
            <Card key={index} className="border-gray-200">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  category.color === 'purple' ? 'bg-purple-100' :
                  category.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <category.icon className={`h-6 w-6 ${
                    category.color === 'purple' ? 'text-purple-600' :
                    category.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <CardTitle className="text-xl font-signal">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="border-l-2 border-gray-200 pl-4">
                      <div className="font-medium text-gray-900">{tech.name}</div>
                      <div className="text-sm text-gray-600">{tech.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Architecture Visualization */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-signal font-bold text-center mb-8">Platform Architecture</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Mic className="h-8 w-8 text-purple-600" />
              </div>
              <div className="font-medium">Voice Capture</div>
              <div className="text-sm text-gray-600">TrueTone Modeling</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <div className="font-medium">AI Processing</div>
              <div className="text-sm text-gray-600">Content Generation</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="font-medium">Compliance</div>
              <div className="text-sm text-gray-600">Regulatory Check</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Share2 className="h-8 w-8 text-orange-600" />
              </div>
              <div className="font-medium">Distribution</div>
              <div className="text-sm text-gray-600">Multi-Channel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Results & Impact Section
function ResultsImpact() {
  const metrics = [
    {
      value: "10,000+",
      label: "Content Pieces Generated",
      description: "Authentic marketing materials created across all formats",
      icon: BarChart3
    },
    {
      value: "95%",
      label: "Time Reduction",
      description: "Less time spent on content creation, more on clients",
      icon: Clock
    },
    {
      value: "500+",
      label: "Active Users",
      description: "Mortgage professionals using TrueTone AI daily",
      icon: Users
    },
    {
      value: "100%",
      label: "Compliance Rate",
      description: "Perfect regulatory adherence across all content",
      icon: Shield
    }
  ]
  
  const recognition = [
    "Featured in Mortgage Technology Innovation Awards",
    "Recognized by National Mortgage News",
    "Industry-leading Net Promoter Score of 89",
    "Partnership with major mortgage companies"
  ]
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-signal font-bold mb-6 text-gray-900">
            Results & Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable transformation in how mortgage professionals approach marketing and client communication.
          </p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <Card key={index} className="text-center border-gray-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#9D7AD6] to-[#4F518C] rounded-lg flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold font-signal text-gray-900 mb-2">
                  {metric.value}
                </div>
                <div className="font-medium text-gray-900 mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Industry Recognition */}
        <div className="bg-gradient-to-r from-[#9D7AD6]/10 to-[#4F518C]/10 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-[#9D7AD6]" />
                <h3 className="text-2xl font-signal font-bold">Industry Recognition</h3>
              </div>
              <p className="text-gray-600 mb-6">
                TrueTone AI has gained recognition across the mortgage industry for its innovative approach to AI-powered marketing.
              </p>
              <ul className="space-y-3">
                {recognition.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#9D7AD6]/20 to-[#4F518C]/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-[#9D7AD6] mx-auto mb-4" />
                  <div className="text-lg font-medium text-gray-900">Nationwide Impact</div>
                  <div className="text-sm text-gray-600">Transforming mortgage marketing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Lessons Learned Section
function LessonsLearned() {
  const insights = [
    {
      category: "Technical Insights",
      icon: Brain,
      color: "purple",
      lessons: [
        "Voice modeling requires 10x more data than initially anticipated",
        "Compliance automation is the most valuable feature for users",
        "Real-time processing is critical for user adoption",
        "Industry-specific training data dramatically improves output quality"
      ]
    },
    {
      category: "Market Feedback",
      icon: Users,
      color: "blue", 
      lessons: [
        "Users prioritize authenticity over perfect grammar",
        "Batch processing capabilities are essential for enterprise",
        "Mobile experience drives daily usage patterns",
        "Integration with existing tools is more important than features"
      ]
    },
    {
      category: "Future Roadmap",
      icon: Lightbulb,
      color: "green",
      lessons: [
        "Video generation is the next frontier for mortgage marketing",
        "Multi-language support opens international opportunities",
        "Real-time collaboration features drive team adoption",
        "Predictive analytics will define the next generation platform"
      ]
    }
  ]
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-signal font-bold mb-6 text-gray-900">
            Lessons Learned
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key insights from building the mortgage industry's first AI marketing platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Card key={index} className="border-gray-200">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  insight.color === 'purple' ? 'bg-purple-100' :
                  insight.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <insight.icon className={`h-6 w-6 ${
                    insight.color === 'purple' ? 'text-purple-600' :
                    insight.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <CardTitle className="text-xl font-signal">{insight.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {insight.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        insight.color === 'purple' ? 'bg-purple-400' :
                        insight.color === 'blue' ? 'bg-blue-400' : 'bg-green-400'
                      }`} />
                      <span className="text-gray-700 text-sm leading-relaxed">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Call to Action Section
function CallToAction() {
  return (
    <section className="relative py-20 overflow-hidden">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(19, 19, 33)"
        gradientBackgroundEnd="rgb(44, 42, 74)"
        firstColor="79, 81, 140"
        secondColor="157, 122, 214"
        thirdColor="218, 191, 255"
        fourthColor="127, 237, 255"
        fifthColor="79, 81, 140"
        pointerColor="157, 122, 214"
        size="80%"
        blendingValue="overlay"
        className="absolute inset-0"
        containerClassName="absolute inset-0"
        interactive={false}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-signal font-bold mb-6 text-white">
          Ready to Transform Your
          <span className="block bg-gradient-to-r from-[#9D7AD6] via-[#DABFFF] to-[#7FEDFF] bg-clip-text text-transparent">
            Marketing Strategy?
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience the power of AI-driven marketing with TrueTone AI, or book a consultation to discuss how this technology can transform your mortgage business.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            asChild
            size="xl"
            className="bg-gradient-to-r from-[#9D7AD6] to-[#4F518C] hover:from-[#9D7AD6]/90 hover:to-[#4F518C]/90 text-white"
          >
            <Link href="https://truetone.ai" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Explore TrueTone.ai
            </Link>
          </Button>
          <Button 
            asChild
            size="xl"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Link href="/contact">
              <MessageSquare className="mr-2 h-5 w-5" />
              Book Consultation
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-[#DABFFF]" />
            </div>
            <div className="text-white font-medium">See TrueTone AI</div>
            <div className="text-gray-300 text-sm">Experience the platform</div>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-[#DABFFF]" />
            </div>
            <div className="text-white font-medium">Discuss Implementation</div>
            <div className="text-gray-300 text-sm">Custom AI strategy</div>
          </div>
          <div>
            <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-[#DABFFF]" />
            </div>
            <div className="text-white font-medium">Transform Results</div>
            <div className="text-gray-300 text-sm">Scale your marketing</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TrueToneAIPage() {
  return (
    <main className="min-h-screen">
      <ProductHero />
      <InnovationStory />
      <TechnologyStack />
      <ResultsImpact />
      <LessonsLearned />
      <CallToAction />
    </main>
  )
}