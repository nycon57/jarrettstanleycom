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
    description: 'I lead marketing and AI strategy across the company. The digital programs my team runs have driven a 300% increase in qualified leads.',
    type: 'position' as const,
  },
  {
    id: '2',
    date: 'Jun 2021 - May 2023',
    title: 'EVP & CMO',
    company: 'Nationwide Mortgage Bankers / Southern Trust Mortgage',
    description: 'I ran the marketing side of the merger, bringing two brands and their operations together across several states. I went from EVP to CMO in that stretch and built AI-powered marketing automation for lead generation and compliance.',
    type: 'position' as const,
  },
  {
    id: '3',
    date: '2023',
    title: 'HousingWire Marketing Leader',
    company: 'HousingWire',
    description: 'Recognized for data-driven marketing, predictive analytics and a team culture that moves quickly when the market shifts.',
    type: 'achievement' as const,
  },
  {
    id: '4',
    date: '2022',
    title: 'Top 40 Under 40',
    company: 'National Mortgage Professional',
    description: 'Recognized for using technology to build better borrower experiences, and for first-time buyer programs that expand homeownership in underserved communities.',
    type: 'achievement' as const,
  },
  {
    id: '5',
    date: '2020',
    title: 'Digital Innovation Award',
    company: 'Mortgage Bankers Association',
    description: 'Recognized for early use of AI and machine learning in mortgage marketing compliance and content.',
    type: 'achievement' as const,
  },
  {
    id: '6',
    date: 'Sep 2016 - Jun 2021',
    title: 'VP to SVP of Marketing',
    company: 'Southern Trust Mortgage',
    description: 'I set the direction for the brand, recruiting and marketing support across every channel. I moved the department to agile, managed multi-million dollar budgets and built a team that delivered steady quarterly growth.',
    type: 'position' as const,
  },
  {
    id: '7',
    date: 'Jul 2011 - Sep 2016',
    title: 'Creative Director',
    company: 'Atlantic Bay Mortgage Group',
    description: 'I led the 2013 rebrand that tripled market share and helped the company expand to 40+ new locations. I ran creative across every medium as the company reached a record $3B+ in annual production and was named a top 100 mortgage company nationally.',
    type: 'position' as const,
  },
  {
    id: '8',
    date: 'Jun 2007 - Jul 2011',
    title: 'Senior Graphic Designer',
    company: 'Movement Mortgage',
    description: 'I helped build the marketing operation while the company grew from 8 to 500+ employees, including the brand identity and marketing systems behind its multi-state expansion.',
    type: 'position' as const,
  },
]

const expertiseAreas = [
  {
    title: 'Mortgage Marketing',
    description: 'Marketing that brings in business and stays inside the rules lenders work under.',
    skills: ['Lead Generation', 'Compliance Marketing', 'Brand Strategy', 'Campaign Management'],
  },
  {
    title: 'AI & Technology',
    description: 'Putting AI to work on the marketing problems lenders actually have.',
    skills: ['AI Implementation', 'MarTech Stack', 'Automation', 'Data Analytics'],
  },
  {
    title: 'Digital Innovation',
    description: 'Moving traditional mortgage marketing onto digital channels and tools.',
    skills: ['Digital Transformation', 'Innovation Strategy', 'Process Optimization', 'Tech Integration'],
  },
  {
    title: 'Team Leadership',
    description: 'Building and coaching marketing teams that do strong work.',
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
              I&apos;m Chief Marketing Officer at Nationwide Mortgage Bankers and CEO of TrueTone AI. I build marketing
              with AI every day, and I talk about what works and what doesn&apos;t.
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
          <SectionHead id="summary-title" title="Fifteen years in, still building." />
          <div className="grid gap-6 text-[1.0625rem] leading-[1.7] text-hp-muted">
            <p>
              I&apos;ve spent more than 15 years in mortgage marketing, at Movement Mortgage, Atlantic Bay Mortgage Group,
              Southern Trust Mortgage and Nationwide Mortgage Bankers. I started as a designer, and I still care how the
              work looks and reads.
            </p>
            <p>
              As CMO at Nationwide, I lead a team that brings in leads and builds relationships for our loan officers. I
              use AI because it lets people who know the work do more of it. It does not replace the person who knows
              what good looks like.
            </p>
            <p>
              I share what I learn on stage, in my newsletter The Signal, on The TrueTone Show with Corey Shelton, and
              with the companies I advise.
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
              lede="Where I've worked and what came of it."
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
            step="What I bring to the work."
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
            What I believe
          </h2>
          <figure className="max-w-5xl">
            <blockquote className="font-display text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] font-light leading-[1.14] tracking-[-0.02em] text-hp-text text-balance">
              &ldquo;You want experts with power tools. What you don&apos;t want is a monkey with a machine gun.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-[0.9375rem] text-hp-muted">Me, on The TrueTone Show, Episode 2</figcaption>
          </figure>
          <p className="t-lede mt-10 max-w-3xl">
            That&apos;s the idea behind the talks, the newsletter, the show and TrueTone AI. Give people who know the work
            better tools, and keep the judgment with them.
          </p>
        </div>
      </section>

      <Colleagues />
      <ClosingCta />
    </>
  )
}
