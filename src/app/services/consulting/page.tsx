"use client";

import { motion } from "framer-motion";
import { ConsultingInquiryForm } from "@/components/consulting-inquiry-form";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { ProcessStep } from "@/components/sections/process-step";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Target,
  Zap,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Briefcase,
  Calendar,
  MessageSquare
} from "lucide-react";

const focusAreas = [
  {
    title: "Marketing Strategy",
    description: "Develop comprehensive AI-powered marketing strategies that align with your business goals and drive measurable results.",
    icon: <Target className="w-6 h-6 text-white" />
  },
  {
    title: "AI Implementation",
    description: "Navigate the complex landscape of AI tools and platforms with expert guidance on selection, integration, and optimization.",
    icon: <Zap className="w-6 h-6 text-white" />
  },
  {
    title: "Team Development",
    description: "Build AI-literate teams through training, workshops, and change management strategies that ensure successful adoption.",
    icon: <Users className="w-6 h-6 text-white" />
  },
  {
    title: "Technology Stack",
    description: "Optimize your marketing technology stack with AI-first solutions that integrate seamlessly and deliver exponential value.",
    icon: <BarChart3 className="w-6 h-6 text-white" />
  }
];

const engagementModels = [
  {
    title: "Project-Based",
    duration: "3-6 months",
    description: "Focused engagement for specific initiatives",
    features: [
      "Defined scope and deliverables",
      "Clear timeline and milestones",
      "Dedicated project team",
      "Knowledge transfer included"
    ],
    ideal: "Companies with specific AI initiatives or transformation projects"
  },
  {
    title: "Retainer",
    duration: "Ongoing",
    description: "Continuous strategic guidance and support",
    features: [
      "Monthly strategy sessions",
      "On-demand consultation",
      "Priority response times",
      "Quarterly business reviews"
    ],
    ideal: "Organizations seeking ongoing AI advisory and optimization"
  },
  {
    title: "Strategic Advisory",
    duration: "12+ months",
    description: "High-level guidance for executive teams",
    features: [
      "C-suite advisory",
      "Board presentations",
      "Strategic planning",
      "Industry insights"
    ],
    ideal: "Enterprise companies navigating digital transformation"
  }
];

const caseStudies = [
  {
    title: "AI-Powered Lead Generation",
    company: "Regional Mortgage Lender",
    description: "Implemented AI-driven lead scoring and nurturing system that transformed their marketing efficiency.",
    results: [
      { metric: "Lead Quality", value: "+312%", improvement: "Increase in qualified leads" },
      { metric: "Cost per Lead", value: "-67%", improvement: "Reduction in acquisition cost" },
      { metric: "Conversion Rate", value: "2.8x", improvement: "Improvement in close rate" }
    ],
    services: ["AI Strategy", "Technology Implementation", "Team Training"],
    testimonial: {
      quote: "Jarrett's guidance transformed our entire approach to marketing. The results speak for themselves.",
      author: "Sarah Chen",
      role: "CMO, Regional Mortgage Lender"
    }
  },
  {
    title: "Marketing Automation Transformation",
    company: "National Mortgage Company",
    description: "Redesigned marketing operations with AI-first approach, creating scalable systems for growth.",
    results: [
      { metric: "Efficiency", value: "70%", improvement: "Time saved on campaigns" },
      { metric: "Revenue", value: "+$2.3M", improvement: "Additional revenue in 6 months" },
      { metric: "ROI", value: "428%", improvement: "Return on consulting investment" }
    ],
    services: ["Process Optimization", "AI Integration", "Performance Analytics"],
    testimonial: {
      quote: "The ROI from our consulting engagement exceeded all expectations. This was game-changing.",
      author: "Michael Rodriguez",
      role: "CEO, National Mortgage Company"
    }
  }
];

const processSteps = [
  {
    number: 1,
    title: "Discovery",
    description: "Deep dive into your current challenges, goals, and opportunities",
    icon: <MessageSquare className="w-8 h-8 text-white" />
  },
  {
    number: 2,
    title: "Strategy",
    description: "Develop customized AI roadmap aligned with your business objectives",
    icon: <Target className="w-8 h-8 text-white" />
  },
  {
    number: 3,
    title: "Implementation",
    description: "Hands-on guidance through execution with your team",
    icon: <Zap className="w-8 h-8 text-white" />
  },
  {
    number: 4,
    title: "Optimization",
    description: "Continuous improvement and scaling of successful initiatives",
    icon: <Sparkles className="w-8 h-8 text-white" />
  }
];

export default function ConsultingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-32 pt-40 overflow-hidden bg-gradient-to-br from-[#9D7AD6]/10 via-background to-[#4F518C]/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 w-fit rounded-full border border-[#9D7AD6]/20 bg-[#9D7AD6]/5 px-6 py-3 text-sm text-foreground backdrop-blur">
              Strategic Consulting
            </div>
            
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold text-foreground lg:text-6xl mb-6">
              Transform Your Marketing with{" "}
              <span className="text-[#9D7AD6]">AI-Powered Strategies</span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground mb-12">
              Get hands-on guidance from an industry leader who's built and scaled AI solutions 
              that have transformed mortgage marketing for hundreds of companies.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#9D7AD6] hover:bg-[#9D7AD6]/90"
                onClick={() => {
                  document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#9D7AD6]/50 hover:bg-[#9D7AD6]/10"
                asChild
              >
                <Link href="/contact">
                  Ask a Question
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Consulting <span className="text-[#9D7AD6]">Focus Areas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive expertise across all aspects of AI-powered mortgage marketing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#9D7AD6] to-[#4F518C] w-fit">
                  {area.icon}
                </div>
                <h3 className="text-xl font-signal mb-3">{area.title}</h3>
                <p className="text-gray-300">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Flexible <span className="text-[#9D7AD6]">Engagement Models</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the consulting approach that best fits your needs and timeline
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {engagementModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-background rounded-2xl p-8 border border-white/10 hover:border-[#9D7AD6]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-signal">{model.title}</h3>
                  <span className="text-sm text-[#9D7AD6] font-medium">{model.duration}</span>
                </div>
                
                <p className="text-gray-300 mb-6">{model.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {model.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#9D7AD6] mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Ideal for:</span> {model.ideal}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Proven <span className="text-[#9D7AD6]">Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real transformations from mortgage companies that embraced AI-powered marketing
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <CaseStudyCard {...study} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Consulting <span className="text-[#9D7AD6]">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology for driving transformational results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProcessStep 
                  {...step} 
                  isLast={index === processSteps.length - 1}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Start Your <span className="text-[#9D7AD6]">Transformation</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your challenges and goals. We'll respond within 24 hours with 
                  insights and next steps for your AI journey.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-[#9D7AD6]/10">
                      <Briefcase className="w-5 h-5 text-[#9D7AD6]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Custom Solutions</h4>
                      <p className="text-sm text-muted-foreground">
                        Every engagement is tailored to your specific needs
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-[#9D7AD6]/10">
                      <Calendar className="w-5 h-5 text-[#9D7AD6]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Flexible Timeline</h4>
                      <p className="text-sm text-muted-foreground">
                        From quick wins to long-term transformation
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-[#9D7AD6]/10">
                      <CheckCircle className="w-5 h-5 text-[#9D7AD6]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Proven Results</h4>
                      <p className="text-sm text-muted-foreground">
                        Track record of 300%+ ROI for clients
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-2xl p-8 border border-white/10"
              >
                <ConsultingInquiryForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#9D7AD6]/10 via-background to-[#4F518C]/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Lead the AI Revolution?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the mortgage industry leaders who are transforming their marketing with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#9D7AD6] hover:bg-[#9D7AD6]/90"
                onClick={() => {
                  document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#9D7AD6]/50 hover:bg-[#9D7AD6]/10"
                asChild
              >
                <Link href="/resources">
                  Explore Resources
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}