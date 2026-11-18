'use client'

import { useEffect, useRef, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { IconArrowLeft, IconArrowRight, IconCheck, IconLoaderCircle } from '@/components/icons/iconmcp/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AUDIENCE_SIZES, BUDGET_RANGES, EVENT_FORMATS, TOPICS } from '@/lib/speaking'
import { SPEAKING_TOPICS } from '@/lib/validations/speaking'
import { cn } from '@/lib/utils'
import type { FieldErrors } from 'react-hook-form'
import type { SpeakingFormData } from '@/lib/validations/speaking'
import { useSpeakingInquiry, type InquiryField } from './use-speaking-inquiry'
import { FieldError } from './field-error'

const STEPS = [
  { id: 'event', rail: 'The event', question: "What's the event?", fields: ['event_name', 'event_date'] },
  { id: 'room', rail: 'The room', question: "Who's in the room?", fields: ['audience_size', 'event_format'] },
  { id: 'talk', rail: 'The talk', question: 'What should they walk out with?', fields: ['message'] },
  { id: 'budget', rail: 'Budget', question: "What's the budget?", fields: ['budget_range'] },
  { id: 'you', rail: 'You', question: 'How do I reach you?', fields: ['first_name', 'last_name', 'email', 'company'] },
  { id: 'review', rail: 'Review', question: 'Does this look right?', fields: [] },
] as const satisfies readonly { id: string; rail: string; question: string; fields: readonly InquiryField[] }[]

type StepId = (typeof STEPS)[number]['id']

const dateLabel = (value?: string) =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

const topicLabel = (value: string) => TOPICS.find((t) => t.formValue === value)?.label ?? value.charAt(0) + value.slice(1).toLowerCase()

/** A full-width list of choices, one per row: the contact page's answer control. */
function OptionRows({ name, options, type = 'radio', field }: { name: InquiryField; options: readonly string[]; type?: 'radio' | 'checkbox'; field: ReturnType<typeof useSpeakingInquiry>['field'] }) {
  return (
    <div className="border-t border-hp-rule">
      {options.map((option) => (
        <label key={option} className="option-row">
          <input type={type} value={option} {...field(name)} />
          <span>{name === 'topic_preferences' ? topicLabel(option) : option}</span>
          <span className={cn('option-mark', type === 'checkbox' && 'option-mark--square')} aria-hidden="true">
            <IconCheck className="size-3.5" />
          </span>
        </label>
      ))}
    </div>
  )
}

/** The rail: where you are, and what you've said so far. Finished steps jump back. */
function Rail({ index, current, answers, onJump }: { index: number; current: StepId; answers: Record<StepId, string>; onJump: (to: StepId) => void }) {
  return (
      <ol className="hidden border-t border-hp-rule lg:block" aria-label="Steps">
        {STEPS.map((s, i) => {
          const done = i < index
          return (
            <li key={s.id} className="border-b border-hp-rule">
              <button
                type="button"
                disabled={!done}
                onClick={() => onJump(s.id)}
                aria-current={s.id === current ? 'step' : undefined}
                className="flex w-full items-start gap-3 py-3.5 text-left disabled:cursor-default"
              >
                <span
                  className={cn(
                    'mt-1.5 size-2 shrink-0 rounded-full',
                    s.id === current ? 'bg-hp-lilac shadow-[0_0_0_4px_oklch(0.72_0.16_298/0.22)]' : done ? 'bg-hp-muted' : 'bg-hp-rule-strong',
                  )}
                />
                <span className="min-w-0">
                  <span className={cn('block text-[0.9375rem]', s.id === current ? 'font-semibold text-hp-text' : done ? 'text-hp-text' : 'text-hp-soft')}>
                    {s.rail}
                  </span>
                  {done && answers[s.id] ? <span className="block truncate text-sm text-hp-soft">{answers[s.id]}</span> : null}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
  )
}

type StepBodyProps = {
  current: StepId
  field: ReturnType<typeof useSpeakingInquiry>['field']
  errors: FieldErrors<SpeakingFormData>
  answers: Record<StepId, string>
  onJump: (to: StepId) => void
}

/** The controls for one question. */
function StepBody({ current, field, errors, answers, onJump }: StepBodyProps) {
  return (
    <>
            {current === 'event' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="cv-event-name">Event name</Label>
                  <Input id="cv-event-name" aria-invalid={!!errors.event_name} {...field('event_name')} />
                  <FieldError message={errors.event_name?.message} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="cv-event-date">Date</Label>
                    <Input id="cv-event-date" type="date" aria-invalid={!!errors.event_date} {...field('event_date')} />
                    <FieldError message={errors.event_date?.message} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cv-location">
                      Location <span className="font-normal text-hp-soft">(optional)</span>
                    </Label>
                    <Input id="cv-location" placeholder="City and venue, or virtual" {...field('event_location')} />
                  </div>
                </div>
              </>
            )}

            {current === 'room' && (
              <>
                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-hp-text">How many people?</legend>
                  <OptionRows name="audience_size" options={AUDIENCE_SIZES} field={field} />
                  <FieldError message={errors.audience_size?.message} />
                </fieldset>
                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-hp-text">What format?</legend>
                  <OptionRows name="event_format" options={EVENT_FORMATS} field={field} />
                  <FieldError message={errors.event_format?.message} />
                </fieldset>
              </>
            )}

            {current === 'talk' && (
              <>
                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-hp-text">Topics that fit (pick any)</legend>
                  <OptionRows name="topic_preferences" type="checkbox" options={SPEAKING_TOPICS} field={field} />
                </fieldset>
                <div className="grid gap-2">
                  <Label htmlFor="cv-message">Who&apos;s in the room, and what should they leave with?</Label>
                  <Textarea id="cv-message" rows={5} aria-invalid={!!errors.message} {...field('message')} />
                  <FieldError message={errors.message?.message} />
                </div>
              </>
            )}

            {current === 'budget' && (
              <fieldset>
                <legend className="mb-3 max-w-[56ch] text-[0.9375rem] leading-relaxed text-hp-muted">
                  There&apos;s no rate card. Fees depend on the event type, the location and how much the session is
                  customized.
                </legend>
                <OptionRows name="budget_range" options={BUDGET_RANGES} field={field} />
                <FieldError message={errors.budget_range?.message} />
              </fieldset>
            )}

            {current === 'you' && (
              <div className="grid gap-5 sm:grid-cols-2">
                {(
                  [
                    ['first_name', 'First name', 'given-name', 'text'],
                    ['last_name', 'Last name', 'family-name', 'text'],
                    ['email', 'Email', 'email', 'email'],
                    ['company', 'Organization', 'organization', 'text'],
                    ['role', 'Your role (optional)', 'organization-title', 'text'],
                    ['phone', 'Phone (optional)', 'tel', 'tel'],
                  ] as const
                ).map(([name, label, autoComplete, type]) => (
                  <div key={name} className="grid gap-2">
                    <Label htmlFor={`cv-${name}`}>{label}</Label>
                    <Input id={`cv-${name}`} type={type} autoComplete={autoComplete} aria-invalid={!!errors[name]} {...field(name)} />
                    <FieldError message={errors[name]?.message} />
                  </div>
                ))}
              </div>
            )}

            {current === 'review' && (
              <dl className="border-t border-hp-rule">
                {STEPS.filter((s) => s.id !== 'review').map((s) => (
                  <div key={s.id} className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-hp-rule py-3.5">
                    <dt className="text-sm text-hp-soft">{s.rail}</dt>
                    <dd className="min-w-0 truncate text-[0.9375rem] text-hp-text">{answers[s.id] || 'Not set'}</dd>
                    <dd>
                      <button type="button" onClick={() => onJump(s.id)} className="text-sm text-hp-muted underline decoration-hp-rule-strong underline-offset-4 hover:text-hp-text">
                        Edit
                      </button>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
    </>
  )
}

/**
 * Booking, the contact page way: a conversation. One question per screen in the display face, a rail of
 * answered steps on the left, and a review before it sends.
 */
export function SpeakingConversation() {
  const [current, setCurrent] = useState<StepId>('event')
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  const { form, field, send, status, checkStep, honeypot, setHoneypot } = useSpeakingInquiry('contact_conversation')
  const { formState, control } = form
  const errors = formState.errors
  const index = STEPS.findIndex((s) => s.id === current)
  const step = STEPS[index]
  const values = useWatch({ control })

  useEffect(() => {
    if (moved.current) headingRef.current?.focus()
  }, [current, status])

  const go = (to: StepId) => {
    moved.current = true
    setDirection(STEPS.findIndex((s) => s.id === to) > index ? 'next' : 'prev')
    setCurrent(to)
  }

  const answers: Record<StepId, string> = {
    event: [values.event_name, dateLabel(values.event_date)].filter(Boolean).join(' · '),
    room: [values.audience_size, values.event_format].filter(Boolean).join(' · '),
    talk: (values.topic_preferences ?? []).map(topicLabel).join(', '),
    budget: values.budget_range ?? '',
    you: [values.first_name, values.last_name].filter(Boolean).join(' '),
    review: '',
  }

  if (status === 'sent') {
    return (
      <div className="step-next max-w-2xl py-6">
        <IconCheck className="size-7 text-hp-lilac" />
        <h3 ref={headingRef} tabIndex={-1} className="t-hero mt-6 !text-[clamp(2rem,1.4rem+2vw,3rem)] outline-none">
          Sent. Thanks, {values.first_name}.
        </h3>
        <p className="t-lede mt-5">I&apos;ll follow up personally about {values.event_name || 'your event'}.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <Rail index={index} current={current} answers={answers} onJump={go} />

      <form
        noValidate
        onSubmit={async (e) => {
          // Stays in the page: steps advance client-side. A function `action` would make React reset the
          // uncontrolled inputs after every step and wipe the answers.
          e.preventDefault()
          if (current === 'review') return send()
          if (await checkStep([...step.fields])) go(STEPS[index + 1].id)
        }}
        className="min-w-0"
      >
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
          <label htmlFor="website-conversation">Website</label>
          <input id="website-conversation" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <p className="text-sm text-hp-soft lg:hidden">
          {index + 1} of {STEPS.length} · {step.rail}
        </p>

        <div key={current} className={direction === 'next' ? 'step-next' : 'step-prev'}>
          <h3 ref={headingRef} tabIndex={-1} className="mt-2 font-display text-[clamp(1.875rem,1.3rem+1.8vw,2.75rem)] font-light leading-[1.08] tracking-[-0.02em] text-hp-text outline-none lg:mt-0">
            {step.question}
          </h3>

          <div className="mt-8 grid gap-5">
            <StepBody current={current} field={field} errors={errors} answers={answers} onJump={go} />

            {status === 'error' ? (
              <p role="alert" className="text-sm text-destructive">
                That didn&apos;t send. Try again, or email jarrett@jarrettstanley.com.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
            {current === 'review' ? (status === 'sending' ? 'Sending…' : 'Send inquiry') : 'Continue'}
            {status === 'sending' ? <IconLoaderCircle className="size-4 animate-spin" /> : <IconArrowRight className="size-4" />}
          </button>
          {index > 0 ? (
            <button type="button" onClick={() => go(STEPS[index - 1].id)} className="btn-ghost">
              <IconArrowLeft className="size-4" />
              Back
            </button>
          ) : null}
          <span className="hidden text-sm text-hp-soft sm:inline">or press Enter</span>
        </div>
      </form>
    </div>
  )
}
