"use client";

import Link from "next/link";
import { IconArrowRight as ArrowRight } from '@/components/icons/iconmcp/icons'

const services = [
  {
    title: "Speaking Engagements",
    description: "Inspire your audience with cutting-edge insights on AI in mortgage marketing. From keynotes to workshops, bring transformative ideas to your event.",
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


export default function ServicesPageClient() {
  return (
    <>
      <section className="page-hero page-hero--tight">
        <div className="shell relative z-[2] stagger">
          <h1 className="t-hero max-w-[14ch]" style={{ '--i': 0 } as React.CSSProperties}>
            Work with me.
          </h1>
          <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
            From keynotes to hands-on consulting, three ways to bring AI into your mortgage marketing.
          </p>
        </div>
      </section>

      <section className="hp-section !pt-4" aria-label="Services">
        <div className="shell border-t border-hp-rule">
          {services.map((service) => (
            <article
              key={service.title}
              className="grid gap-6 border-b border-hp-rule py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] lg:items-start lg:gap-14"
            >
              <h2 className="font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.025em] text-hp-text sm:text-[2rem]">
                {service.title}
              </h2>
              <div>
                <p className="t-body">{service.description}</p>
                <p className="t-meta mt-4 text-[0.8125rem]">{service.features.join(' · ')}</p>
              </div>
              <Link href={service.href} className={service.href === '/speaking' ? 'btn-primary btn-primary--sm' : 'btn-ghost'}>
                {service.cta}
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
