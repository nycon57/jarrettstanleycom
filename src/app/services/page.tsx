"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/sections/service-card";
import { Button } from "@/components/ui/button";
import { 
  Mic2, 
  Lightbulb, 
  Users, 
  ArrowRight,
  Target,
  Rocket,
  Brain
} from "lucide-react";

const services = [
  {
    title: "Speaking Engagements",
    description: "Inspire your audience with cutting-edge insights on AI in mortgage marketing. From keynotes to workshops, bring transformative ideas to your event.",
    icon: <Mic2 className="w-6 h-6 text-white" />,
    href: "/speaking",
    features: [
      "Keynote presentations",
      "Industry conferences", 
      "Executive workshops",
      "Webinars & virtual events"
    ],
    cta: "Book Speaking Event"
  },
  {
    title: "Strategic Consulting",
    description: "Transform your mortgage marketing with customized AI strategies. Get hands-on guidance to implement cutting-edge solutions that drive real results.",
    icon: <Lightbulb className="w-6 h-6 text-white" />,
    href: "/services/consulting",
    features: [
      "AI implementation strategy",
      "Marketing transformation",
      "Team development",
      "Technology stack optimization"
    ],
    cta: "Explore Consulting"
  },
  {
    title: "Advisory Services",
    description: "Ongoing strategic guidance for mortgage industry leaders. Navigate the AI revolution with an experienced advisor who understands your challenges.",
    icon: <Users className="w-6 h-6 text-white" />,
    href: "/contact",
    features: [
      "Executive advisory",
      "Board advisory positions",
      "Strategic planning",
      "Industry insights"
    ],
    cta: "Learn More"
  }
];

const stats = [
  {
    icon: <Target className="w-8 h-8" />,
    value: "100+",
    label: "Companies Transformed"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    value: "50+",
    label: "Speaking Events"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    value: "15+",
    label: "Years of Experience"
  }
];

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-32 pt-40 overflow-hidden bg-gradient-to-br from-lilac/10 via-background to-orchid/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 w-fit rounded-full border border-lilac/20 bg-lilac/5 px-6 py-3 text-sm text-foreground backdrop-blur">
              Services & Solutions
            </div>
            
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold text-foreground lg:text-6xl mb-6">
              Transform Your Mortgage Marketing with{" "}
              <span className="text-lilac">AI Expertise</span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground mb-12">
              From inspiring keynotes to hands-on consulting, leverage proven strategies that have helped 
              hundreds of mortgage companies embrace the AI revolution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-lilac to-orchid w-fit text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-lilac mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="h-full bg-card backdrop-blur-sm border border-border rounded-2xl p-8 hover:bg-card/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-lilac to-orchid w-fit">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-signal mb-4 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-lilac" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    className="w-full bg-lilac hover:bg-lilac/90 group"
                  >
                    <Link href={service.href}>
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Jarrett Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Why Work with <span className="text-lilac">Jarrett Stanley</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Bring unparalleled expertise and real-world experience to your organization
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-signal mb-3 text-lilac">Industry Leadership</h3>
                <p className="text-muted-foreground">
                  As CMO at Nationwide Mortgage Bankers, Jarrett brings 
                  hands-on experience transforming mortgage marketing at scale through AI innovation.
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-signal mb-3 text-lilac">AI Pioneer</h3>
                <p className="text-muted-foreground">
                  Built and deployed AI solutions that have generated millions in revenue and 
                  transformed how mortgage companies approach marketing.
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-signal mb-3 text-lilac">Proven Results</h3>
                <p className="text-muted-foreground">
                  Track record of 300%+ ROI improvements, 70% cost reductions, and 
                  industry-leading conversion rates across multiple organizations.
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-signal mb-3 text-lilac">Actionable Insights</h3>
                <p className="text-muted-foreground">
                  Every engagement delivers practical, implementable strategies tailored to 
                  your specific challenges and opportunities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-lilac/10 via-background to-orchid/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how AI can revolutionize your mortgage marketing strategy.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-lilac hover:bg-lilac/90"
                asChild
              >
                <Link href="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-lilac/50 hover:bg-lilac/10"
                asChild
              >
                <Link href="/resources">
                  View Resources
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}