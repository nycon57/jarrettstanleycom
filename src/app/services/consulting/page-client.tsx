"use client";

import { ConsultingInquiryForm } from "@/components/consulting-inquiry-form";
import { CtaSection } from "@/components/sections/cta-section";
import Link from "next/link";
import { SectionHead } from "@/components/speaking/sections";
import { IconTarget as Target, IconBolt as Zap, IconUsers as Users, IconBarChart as BarChart3, IconCheck as CheckCircle, IconArrowRight as ArrowRight } from '@/components/icons/iconmcp/icons'

const focusAreas = [
  {
    title: "Marketing Strategy",
    description: "Develop comprehensive AI-powered marketing strategies that align with your business goals and drive measurable results.",
    icon: <Target className="size-6 text-white" />
  },
  {
    title: "AI Implementation",
    description: "Navigate the complex landscape of AI tools and platforms with expert guidance on selection, integration, and optimization.",
    icon: <Zap className="size-6 text-white" />
  },
  {
    title: "Team Development",
    description: "Build AI-literate teams through training, workshops, and change management strategies that ensure successful adoption.",
    icon: <Users className="size-6 text-white" />
  },
  {
    title: "Technology Stack",
    description: "Optimize your marketing technology stack with AI-first solutions that integrate seamlessly and deliver exponential value.",
    icon: <BarChart3 className="size-6 text-white" />
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

// The Case Studies section is commented out in the JSX below; the content is
// kept here so it can be switched back on without rewriting it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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


export default function ConsultingPageClient() {
  return (
    <>
      <section className="page-hero">
        <div className="shell relative z-[2] stagger">
          <h1 className="t-hero max-w-[16ch]" style={{ '--i': 0 } as React.CSSProperties}>
            Transform your marketing with AI-powered strategies.
          </h1>
          <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
            Get hands-on guidance from an industry leader who&apos;s built and scaled AI solutions that have transformed
            mortgage marketing for hundreds of companies.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ '--i': 2 } as React.CSSProperties}>
            <Link href="#inquiry-form" className="btn-primary">
              Schedule a consultation
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <section className="hp-section hp-section--lift" aria-labelledby="focus-title">
        <div className="shell">
          <SectionHead
            id="focus-title"
            title="Consulting focus areas."
            step="Everything AI touches in mortgage marketing."
          />
          <dl className="mt-14 border-t border-hp-rule">
            {focusAreas.map((area) => (
              <div key={area.title} className="grid gap-3 border-b border-hp-rule py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-12">
                <dt className="t-title">{area.title}</dt>
                <dd className="t-body">{area.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hp-section" aria-labelledby="models-title">
        <div className="shell">
          <SectionHead id="models-title" title="Engagement models." lede="Choose the consulting approach that best fits your needs and timeline." />
          <div className="mt-14 border-t border-hp-rule">
            {engagementModels.map((model) => (
              <article
                key={model.title}
                className="grid gap-5 border-b border-hp-rule py-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
              >
                <div>
                  <h3 className="t-title">{model.title}</h3>
                  <p className="mt-1.5 text-sm text-hp-soft">{model.duration}</p>
                  <p className="mt-3 text-[0.9375rem] text-hp-muted">{model.description}</p>
                </div>
                <ul className="grid content-start gap-2.5">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-[0.9375rem] text-hp-text">
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-hp-lilac" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-[0.9375rem] leading-relaxed text-hp-muted">
                  <span className="text-hp-text">Ideal for:</span> {model.ideal}
                </p>
              </article>
            ))}
          </div>
          <p className="t-lede mt-10">
            Every engagement follows the same arc: discovery, strategy, implementation, optimization.
          </p>
        </div>
      </section>

      <section id="inquiry-form" className="hp-section scroll-mt-20" aria-labelledby="inquiry-title">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="inquiry-title"
              title="Start the conversation."
              lede="Tell us about your challenges and goals. We'll respond as soon as possible with insights and next steps for your AI journey."
            />
            <dl className="mt-8 grid gap-4 text-[0.9375rem]">
              <div><dt className="font-semibold text-hp-text">Custom solutions</dt><dd className="text-hp-muted">Every engagement is tailored to your specific needs</dd></div>
              <div><dt className="font-semibold text-hp-text">Flexible timeline</dt><dd className="text-hp-muted">From quick wins to long-term transformation</dd></div>
            </dl>
          </div>
          <div className="hp-card p-6 sm:p-9">
            <ConsultingInquiryForm />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
