import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight, IconCheck, IconPlus } from '@/components/icons/iconmcp/icons'
import { COLLEAGUES, ENGAGEMENTS, FORMATS, INCLUDED, RECOGNITION, TOPICS } from '@/lib/speaking'
import type { FAQ } from '@/types/pseo'

/** Section heading in the bold, tight register; an optional second line steps back to muted. */
export function SectionHead({
  title,
  step,
  lede,
  id,
}: {
  title: string
  step?: string
  lede?: string
  id?: string
}) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="t-headline">
        {title}
        {step ? (
          <>
            {' '}
            <span className="t-step">{step}</span>
          </>
        ) : null}
      </h2>
      {lede ? <p className="t-lede mt-5">{lede}</p> : null}
    </div>
  )
}

/** Past stages as a dated record, the proof a program committee checks first. */
export function EngagementLedger({ withPhoto = true }: { withPhoto?: boolean }) {
  return (
    <section className="hp-section" aria-labelledby="stages-title">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="stages-title"
              title="Where I've spoken."
              step="Summits, sales events and panels."
              lede="From an invite-only executive summit to company-wide sales events, each talk came out of work I was doing at the time."
            />
            {withPhoto ? (
              <div className="duotone mt-10 hidden aspect-[4/3] rounded-[14px] lg:block">
                <Image
                  src="/assets/images/Jarrett-Stock-13.jpg"
                  alt="Jarrett Stanley speaking from a stage chair, microphone in hand"
                  fill
                  sizes="(min-width: 1024px) 34vw, 0px"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>

          <ol className="border-t border-hp-rule">
            {ENGAGEMENTS.map((e) => (
              <li
                key={e.event}
                className="grid gap-x-8 gap-y-2 border-b border-hp-rule py-7 sm:grid-cols-[5.5rem_minmax(0,1fr)]"
              >
                <p className="t-meta pt-1 text-[0.8125rem] text-hp-lavender">{e.year}</p>
                <div>
                  <h3 className="t-title">{e.event}</h3>
                  <p className="mt-1.5 text-[0.9375rem] text-hp-muted">
                    {e.role} · {e.organization}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-hp-text">&ldquo;{e.topic}&rdquo;</p>
                  <p className="mt-2 text-sm text-hp-soft">
                    {e.date === e.year ? '' : `${e.date} · `}
                    {e.place} · {e.audience}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/** The three talks in depth: editorial rows, not a card grid. */
export function TalkTopics({ buildHref = '#session' }: { buildHref?: string }) {
  return (
    <section className="hp-section hp-section--lift" aria-labelledby="talks-title">
      <div className="shell">
        <SectionHead
          id="talks-title"
          title="Three talks,"
          step="tuned to your room."
          lede="Each one is built on what I've shipped as a sitting CMO, then shaped around your audience on a call before the event."
        />
        <div className="mt-14 border-t border-hp-rule">
          {TOPICS.map((topic) => (
            <article
              key={topic.id}
              className="grid gap-6 border-b border-hp-rule py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16"
            >
              <div>
                <h3 className="font-display text-[1.5rem] font-bold leading-[1.1] tracking-[-0.025em] text-hp-text sm:text-[2rem]">
                  {topic.label}
                </h3>
                <p className="mt-3 text-[0.9375rem] italic text-hp-muted">{topic.session}</p>
              </div>
              <div>
                <p className="t-body">{topic.summary}</p>
                <ul className="mt-5 grid gap-2.5">
                  {topic.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9375rem] text-hp-text">
                      <IconCheck className="mt-0.5 size-4 shrink-0 text-hp-lilac" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href={buildHref} className="btn-ghost">
            Build a session from these
            <IconArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Formats and what every booking includes. */
export function BookingDetails() {
  return (
    <section className="hp-section" aria-labelledby="booking-title">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <SectionHead
          id="booking-title"
          title="How booking works."
          lede="Tell me about the event and the audience. I come back with a session plan and a quote, usually within two business days. There's no published rate card: fees depend on the event type, location and how much customization the session needs."
        />
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h3 className="t-title">Formats</h3>
            <dl className="mt-5 border-t border-hp-rule">
              {FORMATS.map((f) => (
                <div key={f.id} className="flex items-baseline justify-between gap-4 border-b border-hp-rule py-3.5">
                  <dt className="text-hp-text">{f.label}</dt>
                  <dd className="t-meta text-right text-[0.8125rem]">{f.length}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="t-title">Every booking includes</h3>
            <ul className="mt-5 border-t border-hp-rule">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-3 border-b border-hp-rule py-3.5 text-[0.9375rem] text-hp-text">
                  <IconCheck className="mt-0.5 size-4 shrink-0 text-hp-lilac" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Colleague recommendations: verbatim sentences, attributed and dated. */
export function Colleagues() {
  const [lead, ...rest] = COLLEAGUES
  return (
    <section className="hp-section hp-section--lift" aria-labelledby="colleagues-title">
      <div className="shell">
        <h2 id="colleagues-title" className="sr-only">
          What colleagues say
        </h2>
        <figure className="max-w-5xl">
          <blockquote className="font-display text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] font-light leading-[1.14] tracking-[-0.02em] text-hp-text text-balance">
            &ldquo;{lead.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-7 text-[0.9375rem] text-hp-muted">
            <span className="font-semibold text-hp-text">{lead.name}</span> · {lead.role} · {lead.year}
          </figcaption>
        </figure>
        <div className="mt-16 grid gap-10 border-t border-hp-rule pt-10 md:grid-cols-2 md:gap-16">
          {rest.map((c) => (
            <figure key={c.name}>
              <blockquote className="text-[1.0625rem] leading-relaxed text-hp-text">&ldquo;{c.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-hp-muted">
                <span className="font-semibold text-hp-text">{c.name}</span> · {c.role} · {c.year}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Who he is, in one band: roles, years, recognition. */
export function AboutStrip() {
  return (
    <section className="hp-section" aria-labelledby="about-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="duotone aspect-[4/5] max-w-md rounded-[24px]">
          <Image
            src="/assets/images/Jarrett-Stock-17.jpg"
            alt="Portrait of Jarrett Stanley, arms crossed"
            fill
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-cover object-top"
          />
        </div>
        <div>
          <SectionHead
            id="about-title"
            title="A CMO who still builds."
            lede="I've spent more than 15 years in mortgage marketing, at Movement Mortgage, Atlantic Bay Mortgage Group, Southern Trust Mortgage and now Nationwide Mortgage Bankers, where I'm Chief Marketing Officer. I'm also CEO of TrueTone AI, so the AI I talk about on stage is AI I ship."
          />
          <ul className="mt-10 grid gap-0 border-t border-hp-rule">
            {RECOGNITION.map((r) => (
              <li key={r.title} className="flex items-baseline gap-6 border-b border-hp-rule py-4">
                <span className="t-meta text-[0.8125rem] text-hp-lavender">{r.year}</span>
                <span className="text-hp-text">{r.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href="/about" className="btn-ghost">
              More about me
              <IconArrowRight className="size-4" />
            </Link>
            <a href="https://www.truetone.ai" className="btn-ghost" target="_blank" rel="noopener noreferrer">
              TrueTone AI
              <IconArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Native disclosure FAQ: no JS, keyboard and screen-reader correct by default. */
export function Faq({ faqs, title = 'Questions organizers ask.' }: { faqs: FAQ[]; title?: string }) {
  return (
    <section className="hp-section hp-section--lift" aria-labelledby="faq-title">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
        <SectionHead id="faq-title" title={title} />
        <div className="border-t border-hp-rule">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group border-b border-hp-rule">
              <summary className="flex items-start justify-between gap-6 py-6 text-left">
                <h3 className="t-title">{faq.question}</h3>
                <IconPlus className="faq-plus mt-0.5 size-5 shrink-0 text-hp-muted" />
              </summary>
              <p className="t-body -mt-1 pb-7">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/** The closer: one action. */
export function ClosingCta() {
  return (
    <section className="hp-section relative overflow-hidden" aria-labelledby="closing-title">
      <div className="js-field opacity-70" aria-hidden="true" />
      <div className="shell relative z-[2]">
        <div className="pip-rule mb-14 max-w-xs" aria-hidden="true" />
        <h2 id="closing-title" className="t-hero max-w-[16ch]">
          Bring it to your stage.
        </h2>
        <p className="t-lede mt-7">
          Send the event, the date and who&apos;s in the room. You&apos;ll hear back within two business days.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/speaking#book" className="btn-primary">
            Book Jarrett to speak
            <IconArrowRight className="size-4" />
          </Link>
          <a href="mailto:jarrett@jarrettstanley.com" className="btn-ghost">
            jarrett@jarrettstanley.com
          </a>
        </div>
      </div>
    </section>
  )
}
