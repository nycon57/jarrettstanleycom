import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@/components/icons/iconmcp/icons'
import { ClosingCta, Colleagues, SectionHead } from '@/components/speaking/sections'

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
    skills: ['Lead Generation', 'Compliance Marketing', 'Brand Strategy', 'Campaign Management'],
  },
  {
    title: 'AI & Technology',
    description: 'Pioneer in applying artificial intelligence to solve real-world mortgage marketing challenges.',
    skills: ['AI Implementation', 'MarTech Stack', 'Automation', 'Data Analytics'],
  },
  {
    title: 'Digital Innovation',
    description: 'Transforming traditional mortgage marketing through cutting-edge digital strategies and tools.',
    skills: ['Digital Transformation', 'Innovation Strategy', 'Process Optimization', 'Tech Integration'],
  },
  {
    title: 'Team Leadership',
    description: 'Building and mentoring high-performance marketing teams that deliver exceptional results.',
    skills: ['Team Building', 'Talent Development', 'Strategic Planning', 'Culture Development'],
  },
]

export function AboutContent() {
  return (
    <>
      <section className="page-hero">
        <div className="shell relative z-[2] grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div className="stagger">
            <h1 className="t-hero max-w-[13ch]" style={{ '--i': 0 } as React.CSSProperties}>
              Hi, I&apos;m Jarrett Stanley.
            </h1>
            <p className="t-lede mt-7" style={{ '--i': 1 } as React.CSSProperties}>
              Chief Marketing Officer at Nationwide Mortgage Bankers and CEO of TrueTone AI. I&apos;m on a mission to
              revolutionize mortgage marketing through the power of artificial intelligence.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ '--i': 2 } as React.CSSProperties}>
              <Link href="/speaking#book" className="btn-primary">
                Invite me to speak
                <IconArrowRight className="size-4" />
              </Link>
              <Link href="/services/consulting" className="btn-ghost">
                Consulting
              </Link>
            </div>
          </div>
          <div className="stagger">
            <div className="duotone relative aspect-[4/5] w-full max-w-md justify-self-end rounded-[24px] lg:ml-auto" style={{ '--i': 2 } as React.CSSProperties}>
              <Image
                src="/assets/images/Jarrett-Stock-3.png"
                alt="Jarrett Stanley, standing, hands in pockets"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hp-section hp-section--lift" aria-labelledby="summary-title">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          <SectionHead id="summary-title" title="Bridging innovation and tradition." />
          <div className="grid gap-6 text-[1.0625rem] leading-[1.7] text-hp-muted">
            <p>
              With over 15 years in mortgage marketing, I&apos;ve witnessed the industry&apos;s evolution from traditional
              methods to digital-first strategies. My journey has been defined by a constant pursuit of innovation while
              respecting the fundamental principles that make mortgage lending a cornerstone of the American dream.
            </p>
            <p>
              As CMO at Nationwide Mortgage Bankers, I lead a team of talented marketers in crafting campaigns that not
              only generate leads but build lasting relationships. My work in AI innovation stems from a belief that
              technology should empower mortgage professionals, not replace the human touch that defines our industry.
            </p>
            <p>
              I&apos;m passionate about sharing knowledge and helping others navigate the intersection of mortgage lending
              and artificial intelligence. Whether through speaking engagements, consulting, or mentorship, I&apos;m
              committed to elevating our industry&apos;s marketing standards.
            </p>
          </div>
        </div>
      </section>

      <section className="hp-section" aria-labelledby="journey-title">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="journey-title"
              title="Professional journey."
              lede="The positions and recognition that shaped how I work."
            />
          </div>
          <ol className="border-t border-hp-rule">
            {timelineItems.map((item) => (
              <li key={item.id} className="grid gap-x-8 gap-y-2 border-b border-hp-rule py-7 sm:grid-cols-[9.5rem_minmax(0,1fr)]">
                <p className="t-meta pt-1 text-[0.8125rem] text-hp-lavender">{item.date}</p>
                <div>
                  <h3 className="t-title">{item.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] text-hp-muted">{item.company}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-hp-text">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hp-section hp-section--lift" aria-labelledby="expertise-title">
        <div className="shell">
          <SectionHead
            id="expertise-title"
            title="Areas of expertise."
            step="Industry depth, current tools."
          />
          <dl className="mt-14 grid gap-x-16 border-t border-hp-rule md:grid-cols-2">
            {expertiseAreas.map((area) => (
              <div key={area.title} className="border-b border-hp-rule py-8">
                <dt className="t-title">{area.title}</dt>
                <dd className="mt-3">
                  <p className="t-body">{area.description}</p>
                  <p className="mt-4 text-sm text-hp-soft">{area.skills.join(' · ')}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="hp-section" aria-labelledby="mission-title">
        <div className="shell">
          <h2 id="mission-title" className="sr-only">
            My mission
          </h2>
          <p className="max-w-5xl font-display text-[clamp(1.5rem,1rem+1.9vw,2.5rem)] font-light leading-[1.25] tracking-[-0.015em] text-hp-muted text-balance">
            I believe the future of mortgage marketing lies at the intersection of human creativity and artificial
            intelligence.{' '}
            <span className="text-hp-text">
              My mission is to empower mortgage professionals with the tools and knowledge they need to thrive in this
              new era.
            </span>
          </p>
          <p className="t-lede mt-8 max-w-3xl">
            Every day, I work to bridge the gap between cutting-edge technology and practical application. Whether
            it&apos;s through AI innovation, speaking at industry events, or consulting with forward-thinking companies,
            I&apos;m committed to elevating our industry&apos;s marketing capabilities while maintaining the trust and
            integrity that borrowers deserve.
          </p>
        </div>
      </section>

      <Colleagues />
      <ClosingCta />
    </>
  )
}
