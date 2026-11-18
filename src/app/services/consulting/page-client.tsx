"use client";

import { ConsultingInquiryForm } from "@/components/consulting-inquiry-form";
import { CtaSection } from "@/components/sections/cta-section";
import Link from "next/link";
import { SectionHead } from "@/components/speaking/sections";
import { IconTarget as Target, IconBolt as Zap, IconUsers as Users, IconBarChart as BarChart3, IconCheck as CheckCircle, IconArrowRight as ArrowRight } from '@/components/icons/iconmcp/icons'

const focusAreas = [
  {
    title: "Marketing Strategy",
    description: "A marketing plan built around your business goals, with AI where it helps and numbers you can measure.",
    icon: <Target className="size-6 text-white" />
  },
  {
    title: "AI Implementation",
    description: "Choosing the right AI tools, connecting them to what you already run, and getting them to work.",
    icon: <Zap className="size-6 text-white" />
  },
  {
    title: "Team Development",
    description: "Training, workshops and change management so your team uses the tools well.",
    icon: <Users className="size-6 text-white" />
  },
  {
    title: "Technology Stack",
    description: "A cleaner marketing stack, with AI where it earns its place.",
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

export default function ConsultingPageClient() {
  return (
    <>
      <section className="page-hero">
        <div className="shell relative z-[2] stagger">
          <h1 className="t-hero max-w-[16ch]" style={{ '--i': 0 } as React.CSSProperties}>
            Put AI to work in your marketing.
          </h1>
          <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
            I help mortgage companies use AI well in their marketing: the plan, the tools and the team habits. I&apos;ve
            built and scaled AI marketing work that changed how hundreds of companies market.
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
            step="Where AI changes the work."
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
          <SectionHead id="models-title" title="Engagement models." lede="Three ways to work together, depending on how much help you want." />
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
              lede="Tell me what you're working on and where it's stuck. I read every inquiry myself."
            />
            <dl className="mt-8 grid gap-4 text-[0.9375rem]">
              <div><dt className="font-semibold text-hp-text">Built around you</dt><dd className="text-hp-muted">Every engagement starts from your goals and your team.</dd></div>
              <div><dt className="font-semibold text-hp-text">Any size</dt><dd className="text-hp-muted">From a focused project to ongoing advisory.</dd></div>
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
