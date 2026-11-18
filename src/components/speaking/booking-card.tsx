'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { IconArrowLeft, IconArrowRight, IconCheck, IconLoaderCircle } from '@/components/icons/iconmcp/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  AUDIENCES,
  AUDIENCE_SIZES,
  BUDGET_RANGES,
  FORMATS,
  TOPICS,
  type AudienceId,
  type FormatId,
  type TopicId,
} from '@/lib/speaking'
import { useSpeakingInquiry, type InquiryField } from './use-speaking-inquiry'
import { FieldError } from './field-error'

type Step = 'session' | 'event' | 'you'
const STEPS: Step[] = ['session', 'event', 'you']
const STEP_FIELDS: Record<Step, InquiryField[]> = {
  session: [],
  event: ['event_name', 'event_date', 'audience_size', 'budget_range'],
  you: ['first_name', 'last_name', 'email', 'company', 'message'],
}

// The URL can preselect the session (?topic=&format=&audience=), e.g. from "Build a session from these".
const noopSubscribe = () => () => {}
const useSearch = () => useSyncExternalStore(noopSubscribe, () => window.location.search, () => '')

function Choices<T extends string>({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string
  name: string
  options: readonly { id: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-labelledby={`${name}-label`} className="grid min-w-0 gap-2 sm:grid-cols-[4.75rem_minmax(0,1fr)] sm:items-start">
      <span id={`${name}-label`} className="text-[0.8125rem] font-medium text-hp-soft sm:pt-2">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <label key={option.id} className="choice choice--sm">
            <input type="radio" name={name} value={option.id} checked={value === option.id} onChange={() => onChange(option.id)} />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

/**
 * Booking, the home page way: the session proposal card is step one of the inquiry. The organizer shapes the
 * session, then the same card asks about the event and who to reply to, and sends without leaving the page.
 */
export function BookingCard() {
  const search = useSearch()
  const params = new URLSearchParams(search)
  const [picked, setPicked] = useState<{ topic?: TopicId; format?: FormatId; audience?: AudienceId }>({})
  const topicId = picked.topic ?? TOPICS.find((t) => t.id === params.get('topic'))?.id ?? 'ai'
  const formatId = picked.format ?? FORMATS.find((f) => f.id === params.get('format'))?.id ?? 'keynote'
  const audienceId = picked.audience ?? AUDIENCES.find((a) => a.id === params.get('audience'))?.id ?? 'executives'
  const topic = TOPICS.find((t) => t.id === topicId)!
  const format = FORMATS.find((f) => f.id === formatId)!
  const audience = AUDIENCES.find((a) => a.id === audienceId)!

  const [step, setStep] = useState<Step>('session')
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  const { form, field, send, status, checkStep, honeypot, setHoneypot } = useSpeakingInquiry('booking_card')
  const { setValue, getValues, formState } = form
  const errors = formState.errors
  const index = STEPS.indexOf(step)

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (moved.current) headingRef.current?.focus()
  }, [step, status])

  const go = (to: Step) => {
    moved.current = true
    setDirection(STEPS.indexOf(to) > index ? 'next' : 'prev')
    setStep(to)
  }

  const next = async () => {
    if (step === 'session') {
      setValue('topic_preferences', [topic.formValue])
      setValue('event_format', format.formValue)
      if (!getValues('message')) {
        setValue('message', `Session: "${topic.session}" as a ${format.label.toLowerCase()}, for ${audience.line.toLowerCase()}.\n\n`)
      }
      go('event')
    } else if (await checkStep(STEP_FIELDS[step])) {
      go(STEPS[index + 1])
    }
  }

  const sent = status === 'sent'

  return (
    <div id="book" className="hp-card hp-card--frame scroll-mt-28">
      <div className="hp-chrome">
        <span className="hp-chrome-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="t-meta">session proposal</span>
        <span className="t-meta">{sent ? 'sent' : `${index + 1} of ${STEPS.length}`}</span>
      </div>
      <div className="h-px bg-hp-rule" aria-hidden="true">
        <div
          className="h-px origin-left bg-hp-lilac transition-transform duration-500 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `scaleX(${sent ? 1 : (index + 1) / STEPS.length})` }}
        />
      </div>

      {sent ? (
        <div className="step-next px-5 py-12 sm:px-7">
          <IconCheck className="size-6 text-hp-lilac" />
          <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-hp-text outline-none">
            Sent. Thanks, {getValues('first_name')}.
          </h2>
          <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-hp-muted">
            I&apos;ll follow up personally to talk through &ldquo;{topic.session}&rdquo; and your event.
          </p>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            if (step === 'you') send()
            else next()
          }}
        >
          {/* Honeypot: hidden from people, filled by bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
            <label htmlFor="website-booking">Website</label>
            <input id="website-booking" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <div key={step} className={direction === 'next' ? 'step-next' : 'step-prev'}>
            {step === 'session' ? (
              <>
                <div className="px-5 pb-6 pt-5 sm:px-7">
                  <div className="flex items-center gap-3.5">
                    <Image src="/assets/images/jarrett-avatar-v2.jpg" alt="" width={48} height={48} className="size-12 shrink-0 rounded-full ring-1 ring-hp-rule" />
                    <div className="min-w-0">
                      <p className="font-semibold text-hp-text">Jarrett Stanley</p>
                      <p className="text-sm text-hp-muted">CMO, Nationwide Mortgage Bankers · CEO, TrueTone AI</p>
                    </div>
                  </div>
                  <div key={`${topicId}-${formatId}-${audienceId}`} className="swap-in mt-5" aria-live="polite">
                    <p className="text-sm text-hp-soft">
                      {format.detail} · {format.length}
                    </p>
                    <h2 ref={headingRef} tabIndex={-1} className="mt-1.5 font-display text-[1.5rem] font-bold leading-[1.12] tracking-[-0.025em] text-hp-text outline-none sm:text-[1.75rem]">
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
                <div className="grid gap-3.5 border-t border-hp-rule px-5 py-5 sm:px-7">
                  <Choices label="Topic" name="booking-topic" options={TOPICS} value={topicId} onChange={(v) => setPicked((p) => ({ ...p, topic: v }))} />
                  <Choices label="Format" name="booking-format" options={FORMATS} value={formatId} onChange={(v) => setPicked((p) => ({ ...p, format: v }))} />
                  <Choices label="Audience" name="booking-audience" options={AUDIENCES} value={audienceId} onChange={(v) => setPicked((p) => ({ ...p, audience: v }))} />
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => go('session')}
                  className="group flex w-full items-center justify-between gap-4 border-b border-hp-rule px-5 py-4 text-left transition-colors hover:bg-[oklch(0.97_0.008_295/0.03)] sm:px-7"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[0.9375rem] font-semibold text-hp-text">{topic.session}</span>
                    <span className="block text-sm text-hp-soft">
                      {format.label} · {audience.label}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-hp-muted group-hover:text-hp-text">Change</span>
                </button>

                {step === 'event' ? (
                  <div className="grid gap-5 px-5 py-6 sm:px-7">
                    <h2 ref={headingRef} tabIndex={-1} className="t-title outline-none">
                      Tell me about the event.
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="bk-event-name">Event name</Label>
                        <Input id="bk-event-name" autoComplete="off" aria-invalid={!!errors.event_name} {...field('event_name')} />
                        <FieldError message={errors.event_name?.message} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bk-event-date">Date</Label>
                        <Input id="bk-event-date" type="date" aria-invalid={!!errors.event_date} {...field('event_date')} />
                        <FieldError message={errors.event_date?.message} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bk-location">
                        Location <span className="font-normal text-hp-soft">(optional)</span>
                      </Label>
                      <Input id="bk-location" placeholder="City and venue, or virtual" {...field('event_location')} />
                    </div>
                    <fieldset className="grid gap-2.5">
                      <legend className="mb-2.5 text-sm font-medium text-hp-text">How many people?</legend>
                      <div className="flex flex-wrap gap-1.5">
                        {AUDIENCE_SIZES.map((size) => (
                          <label key={size} className="choice choice--sm">
                            <input type="radio" value={size} {...field('audience_size')} />
                            {size}
                          </label>
                        ))}
                      </div>
                      <FieldError message={errors.audience_size?.message} />
                    </fieldset>
                    <fieldset className="grid gap-2.5">
                      <legend className="mb-2.5 text-sm font-medium text-hp-text">Budget</legend>
                      <div className="flex flex-wrap gap-1.5">
                        {BUDGET_RANGES.map((range) => (
                          <label key={range} className="choice choice--sm">
                            <input type="radio" value={range} {...field('budget_range')} />
                            {range}
                          </label>
                        ))}
                      </div>
                      <FieldError message={errors.budget_range?.message} />
                    </fieldset>
                  </div>
                ) : (
                  <div className="grid gap-5 px-5 py-6 sm:px-7">
                    <h2 ref={headingRef} tabIndex={-1} className="t-title outline-none">
                      Where should I send the plan?
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="bk-first">First name</Label>
                        <Input id="bk-first" autoComplete="given-name" aria-invalid={!!errors.first_name} {...field('first_name')} />
                        <FieldError message={errors.first_name?.message} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bk-last">Last name</Label>
                        <Input id="bk-last" autoComplete="family-name" aria-invalid={!!errors.last_name} {...field('last_name')} />
                        <FieldError message={errors.last_name?.message} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bk-email">Email</Label>
                        <Input id="bk-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...field('email')} />
                        <FieldError message={errors.email?.message} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bk-company">Organization</Label>
                        <Input id="bk-company" autoComplete="organization" aria-invalid={!!errors.company} {...field('company')} />
                        <FieldError message={errors.company?.message} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bk-role">
                          Your role <span className="font-normal text-hp-soft">(optional)</span>
                        </Label>
                        <Input id="bk-role" autoComplete="organization-title" {...field('role')} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bk-phone">
                          Phone <span className="font-normal text-hp-soft">(optional)</span>
                        </Label>
                        <Input id="bk-phone" type="tel" autoComplete="tel" {...field('phone')} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bk-message">What should I know about the room?</Label>
                      <Textarea id="bk-message" rows={4} aria-invalid={!!errors.message} {...field('message')} />
                      <FieldError message={errors.message?.message} />
                    </div>
                    {status === 'error' ? (
                      <p role="alert" className="text-sm text-destructive">
                        That didn&apos;t send. Try again, or email jarrett@jarrettstanley.com.
                      </p>
                    ) : null}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-hp-rule px-5 py-4 sm:px-7">
            {step === 'session' ? (
              <p className="text-sm text-hp-soft">Every session is tailored on a pre-event call.</p>
            ) : (
              <button type="button" onClick={() => go(STEPS[index - 1])} className="btn-ghost text-sm">
                <IconArrowLeft className="size-4" />
                Back
              </button>
            )}
            <button type="submit" disabled={status === 'sending'} className="btn-primary btn-primary--sm shrink-0 disabled:opacity-60">
              {step === 'session' ? 'Book this session' : step === 'event' ? 'Next' : status === 'sending' ? 'Sending…' : 'Send inquiry'}
              {status === 'sending' ? <IconLoaderCircle className="size-4 animate-spin" /> : <IconArrowRight className="size-4" />}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
