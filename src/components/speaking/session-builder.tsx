'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IconArrowRight, IconCheck } from '@/components/icons/iconmcp/icons'
import {
  AUDIENCES,
  FORMATS,
  TOPICS,
  sessionHref,
  type AudienceId,
  type FormatId,
  type TopicId,
} from '@/lib/speaking'

type Choice = { id: string; label: string }

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: readonly Choice[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-labelledby={`${name}-label`} className="grid min-w-0 gap-2 sm:grid-cols-[4.75rem_minmax(0,1fr)] sm:items-start">
      <span id={`${name}-label`} className="text-[0.8125rem] font-medium text-hp-soft sm:pt-2">
        {legend}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <label key={option.id} className="choice choice--sm">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id as T)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

/**
 * The home page's thesis: an organizer leaves with a session they can drop into a program.
 * Picking a topic, format and audience rewrites the listing in place; "Book this session"
 * carries the choice into the inquiry form on /speaking.
 */
export function SessionBuilder() {
  const id = 'session'
  const [topicId, setTopicId] = useState<TopicId>('ai')
  const [formatId, setFormatId] = useState<FormatId>('keynote')
  const [audienceId, setAudienceId] = useState<AudienceId>('executives')

  const topic = TOPICS.find((t) => t.id === topicId)!
  const format = FORMATS.find((f) => f.id === formatId)!
  const audience = AUDIENCES.find((a) => a.id === audienceId)!

  return (
    <div id={id} className="hp-card hp-card--frame scroll-mt-28">
      <div className="hp-chrome">
        <span className="hp-chrome-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="t-meta">session proposal</span>
        <span className="t-meta" aria-hidden="true">
          {format.label.toLowerCase()}
        </span>
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-7">
        {/* The listing, as it would read in an event program */}
        <div className="flex items-center gap-3.5">
          <Image
            src="/assets/images/jarrett-avatar.jpg"
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full ring-1 ring-hp-rule"
            priority
          />
          <div className="min-w-0">
            <p className="font-semibold text-hp-text">Jarrett Stanley</p>
            <p className="text-sm text-hp-muted">CMO, Nationwide Mortgage Bankers · CEO, TrueTone AI</p>
          </div>
        </div>

        <div key={`${topicId}-${formatId}-${audienceId}`} className="swap-in mt-5" aria-live="polite">
          <p className="t-meta uppercase tracking-[0.14em]">
            {format.detail} · {format.length}
          </p>
          <h2 className="mt-2.5 font-display text-[1.5rem] font-bold leading-[1.12] tracking-[-0.025em] text-hp-text sm:text-[1.75rem]">
            {topic.session}
          </h2>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-hp-muted">
            For {audience.line.toLowerCase()}. {topic.summary}
          </p>
          <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
            {topic.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-snug text-hp-text">
                <IconCheck className="mt-0.5 size-4 shrink-0 text-hp-lilac" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Shape it */}
      <div className="grid gap-3.5 border-t border-hp-rule px-5 py-5 sm:px-7">
        <ChoiceGroup legend="Topic" name={`${id}-topic`} options={TOPICS} value={topicId} onChange={setTopicId} />
        <ChoiceGroup legend="Format" name={`${id}-format`} options={FORMATS} value={formatId} onChange={setFormatId} />
        <ChoiceGroup
          legend="Audience"
          name={`${id}-audience`}
          options={AUDIENCES}
          value={audienceId}
          onChange={setAudienceId}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-hp-rule px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-sm text-hp-soft">Every session is tailored on a pre-event call.</p>
        <Link href={sessionHref(topicId, formatId, audienceId)} className="btn-primary btn-primary--sm">
          Book this session
          <IconArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
