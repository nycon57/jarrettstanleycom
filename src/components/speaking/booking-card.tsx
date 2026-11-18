'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { IconArrowLeft, IconArrowRight, IconCheck, IconLoaderCircle } from '@/components/icons/iconmcp/icons'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AUDIENCES, AUDIENCE_SIZES, BUDGET_RANGES, FORMATS, TOPICS, type AudienceId, type FormatId, type TopicId } from '@/lib/speaking'
import { cn } from '@/lib/utils'
import { Controller, type Control, type FieldErrors, type UseFormClearErrors } from 'react-hook-form'
import type { SpeakingFormData } from '@/lib/validations/speaking'
import { useSpeakingInquiry, type InquiryField } from './use-speaking-inquiry'
import { FieldError } from './field-error'

const STEPS = [
  { id: 'topic', label: 'Topic', question: 'What should I talk about?' },
  { id: 'format', label: 'Format', question: 'What format fits your event?' },
  { id: 'audience', label: 'Audience', question: "Who's in the room?" },
  { id: 'event', label: 'Event', question: 'Tell me about the event.' },
  { id: 'you', label: 'You', question: 'Where should I reply?' },
] as const
type StepId = (typeof STEPS)[number]['id']

const FIELDS: Partial<Record<StepId, InquiryField[]>> = {
  event: ['event_name', 'event_date', 'audience_size', 'budget_range'],
  you: ['first_name', 'last_name', 'email', 'company', 'message'],
}

// The URL can preselect choices (?topic=&format=&audience=), e.g. from "Build a session from these".
const noopSubscribe = () => () => {}
const useSearch = () => useSyncExternalStore(noopSubscribe, () => window.location.search, () => '')

/** A large, obvious single choice: radio mark, title, one line of detail. */
function Tile({ name, value, checked, onPick, title, detail }: { name: string; value: string; checked: boolean; onPick: () => void; title: string; detail: string }) {
  return (
    <label className="option-tile">
      <input type="radio" name={name} value={value} checked={checked} onChange={onPick} />
      <span className="option-tile-mark" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block font-semibold text-hp-text">{title}</span>
        <span className="mt-0.5 block text-sm leading-snug text-hp-muted">{detail}</span>
      </span>
    </label>
  )
}

/** Numbered progress across the top; finished steps are buttons back. */
function Progress({ index, sent, onJump }: { index: number; sent: boolean; onJump: (to: StepId) => void }) {
  return (
      <div className="border-b border-hp-rule px-5 py-4 sm:px-7">
        <ol className="flex items-center gap-1.5 sm:gap-2" aria-label="Booking steps">
          {STEPS.map((s, i) => {
            const done = sent || i < index
            const isCurrent = !sent && i === index
            return (
              <li key={s.id} className={cn('flex min-w-0 items-center gap-1.5 sm:gap-2', i < STEPS.length - 1 && 'flex-1')}>
                <button
                  type="button"
                  disabled={!done || sent}
                  onClick={() => onJump(s.id)}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Step ${i + 1}: ${s.label}${done ? ' (done)' : ''}`}
                  className="flex min-w-0 items-center gap-2 disabled:cursor-default"
                >
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold transition-colors duration-200',
                      isCurrent && 'bg-hp-deep text-[oklch(0.99_0.005_295)]',
                      done && 'bg-[oklch(0.42_0.13_298/0.3)] text-hp-lavender',
                      !done && !isCurrent && 'border border-hp-rule-strong text-hp-soft',
                    )}
                  >
                    {done ? <IconCheck className="size-3.5" /> : i + 1}
                  </span>
                  <span className={cn('hidden truncate text-sm lg:inline', isCurrent ? 'font-semibold text-hp-text' : done ? 'text-hp-muted' : 'text-hp-soft')}>
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 ? (
                  <span className={cn('h-px min-w-3 flex-1', i < index || sent ? 'bg-hp-lilac' : 'bg-hp-rule-strong')} aria-hidden="true" />
                ) : null}
              </li>
            )
          })}
        </ol>
        <p className="mt-3 text-sm text-hp-soft lg:hidden">{sent ? 'Sent' : `Step ${index + 1} of ${STEPS.length}: ${STEPS[index].label}`}</p>
      </div>
  )
}

type FieldProps = { field: ReturnType<typeof useSpeakingInquiry>['field']; errors: FieldErrors<SpeakingFormData> }
type DateProps = { control: Control<SpeakingFormData>; clearErrors: UseFormClearErrors<SpeakingFormData> }

function EventFields({ field, errors, control, clearErrors }: FieldProps & DateProps) {
  return (
                <div className="grid gap-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="bk-event-name">Event name</Label>
                      <Input id="bk-event-name" autoComplete="off" aria-invalid={!!errors.event_name} {...field('event_name')} />
                      <FieldError message={errors.event_name?.message} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bk-event-date">Date</Label>
                      <Controller
                        control={control}
                        name="event_date"
                        render={({ field: f }) => (
                          <DatePicker
                            id="bk-event-date"
                            ref={f.ref}
                            value={f.value}
                            invalid={!!errors.event_date}
                            onChange={(v) => {
                              f.onChange(v)
                              clearErrors('event_date')
                            }}
                          />
                        )}
                      />
                      <FieldError message={errors.event_date?.message} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bk-location">
                      Location <span className="font-normal text-hp-soft">(optional)</span>
                    </Label>
                    <Input id="bk-location" placeholder="City and venue, or virtual" {...field('event_location')} />
                  </div>
                  <fieldset>
                    <legend className="mb-2.5 text-sm font-medium text-hp-text">How many people?</legend>
                    <div className="flex flex-wrap gap-2">
                      {AUDIENCE_SIZES.map((size) => (
                        <label key={size} className="choice">
                          <input type="radio" value={size} {...field('audience_size')} />
                          {size}
                        </label>
                      ))}
                    </div>
                    <div className="mt-2">
                      <FieldError message={errors.audience_size?.message} />
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="mb-2.5 text-sm font-medium text-hp-text">Budget</legend>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_RANGES.map((range) => (
                        <label key={range} className="choice">
                          <input type="radio" value={range} {...field('budget_range')} />
                          {range}
                        </label>
                      ))}
                    </div>
                    <div className="mt-2">
                      <FieldError message={errors.budget_range?.message} />
                    </div>
                  </fieldset>
                </div>
  )
}

function ContactFields({ field, errors, failed }: FieldProps & { failed: boolean }) {
  return (
                <div className="grid gap-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(
                      [
                        ['first_name', 'First name', 'given-name', 'text'],
                        ['last_name', 'Last name', 'family-name', 'text'],
                        ['email', 'Email', 'email', 'email'],
                        ['company', 'Organization', 'organization', 'text'],
                      ] as const
                    ).map(([name, label, autoComplete, type]) => (
                      <div key={name} className="grid gap-2">
                        <Label htmlFor={`bk-${name}`}>{label}</Label>
                        <Input id={`bk-${name}`} type={type} autoComplete={autoComplete} aria-invalid={!!errors[name]} {...field(name)} />
                        <FieldError message={errors[name]?.message} />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bk-message">Anything I should know about the room?</Label>
                    <Textarea id="bk-message" rows={4} aria-invalid={!!errors.message} {...field('message')} />
                    <FieldError message={errors.message?.message} />
                  </div>
                  {failed ? (
                    <p role="alert" className="text-sm text-destructive">
                      That didn&apos;t send. Try again, or email jarrett@truetone.ai.
                    </p>
                  ) : null}
                </div>
  )
}

const CHOICES = {
  topic: TOPICS.map((t) => ({ id: t.id, title: t.label, detail: `Talk: ${t.session}` })),
  format: FORMATS.map((f) => ({ id: f.id, title: f.label, detail: f.length })),
  audience: AUDIENCES.map((a) => ({ id: a.id, title: a.label, detail: a.line })),
}
type ChoiceStepId = keyof typeof CHOICES
const isChoice = (step: StepId): step is ChoiceStepId => step in CHOICES

/** One of the three quick picks, as large tiles. Formats sit two across; the others stack. */
function ChoiceStep({ step, value, onPick }: { step: ChoiceStepId; value?: string; onPick: (id: string) => void }) {
  return (
    <div role="radiogroup" aria-label={step} className={cn('grid gap-2.5', step === 'format' && 'sm:grid-cols-2')}>
      {CHOICES[step].map((o) => (
        <Tile key={o.id} name={`booking-${step}`} value={o.id} checked={value === o.id} onPick={() => onPick(o.id)} title={o.title} detail={o.detail} />
      ))}
    </div>
  )
}

function SentNote({ headingRef, name, session }: { headingRef: React.Ref<HTMLHeadingElement>; name: string; session?: string }) {
  return (
    <div className="step-next px-5 py-12 sm:px-7">
      <IconCheck className="size-7 text-hp-lilac" />
      <h3 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-hp-text outline-none">
        Sent. Thanks, {name}.
      </h3>
      <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-hp-muted">
        I&apos;ll follow up personally about {session ? <>&ldquo;{session}&rdquo;</> : 'the session'} and your event.
      </p>
    </div>
  )
}

/** Back (or a time hint on step 1) and the primary action, which names what it does. */
function StepFooter({ first, last, sending, blocked, onBack }: { first: boolean; last: boolean; sending: boolean; blocked: boolean; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-hp-rule px-5 py-4 sm:px-7">
      {first ? (
        <span className="text-sm text-hp-soft">Takes about a minute</span>
      ) : (
        <button type="button" onClick={onBack} className="btn-ghost text-sm">
          <IconArrowLeft className="size-4" />
          Back
        </button>
      )}
      <button type="submit" disabled={sending || blocked} className="btn-primary btn-primary--sm shrink-0 disabled:cursor-not-allowed disabled:opacity-45">
        {last ? (sending ? 'Sending…' : 'Send inquiry') : 'Continue'}
        {sending ? <IconLoaderCircle className="size-4 animate-spin" /> : <IconArrowRight className="size-4" />}
      </button>
    </div>
  )
}

/**
 * Booking, the home page way: a five-step form in one card. Three quick picks (topic, format, audience),
 * then the event, then where to reply. Picking a choice moves on; Back always works.
 */
export function BookingCard() {
  const params = new URLSearchParams(useSearch())
  const [picked, setPicked] = useState<{ topic?: TopicId; format?: FormatId; audience?: AudienceId }>({})
  const topicId = picked.topic ?? TOPICS.find((t) => t.id === params.get('topic'))?.id
  const formatId = picked.format ?? FORMATS.find((f) => f.id === params.get('format'))?.id
  const audienceId = picked.audience ?? AUDIENCES.find((a) => a.id === params.get('audience'))?.id
  const topic = TOPICS.find((t) => t.id === topicId)
  const format = FORMATS.find((f) => f.id === formatId)
  const audience = AUDIENCES.find((a) => a.id === audienceId)

  const [step, setStep] = useState<StepId>('topic')
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  const advanceTimer = useRef<number | undefined>(undefined)
  const { form, field, send, status, checkStep, honeypot, setHoneypot } = useSpeakingInquiry('booking_card')
  const { setValue, getValues, formState } = form
  const errors = formState.errors
  const index = STEPS.findIndex((s) => s.id === step)
  const current = STEPS[index]
  const sent = status === 'sent'

  useEffect(() => {
    if (moved.current) headingRef.current?.focus()
  }, [step, status])
  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  const go = (to: StepId) => {
    window.clearTimeout(advanceTimer.current)
    moved.current = true
    setDirection(STEPS.findIndex((s) => s.id === to) > index ? 'next' : 'prev')
    setStep(to)
  }

  const chosen: Partial<Record<StepId, boolean>> = { topic: !!topic, format: !!format, audience: !!audience }

  /** Carry the three picks into the form before the event step. */
  const commitPicks = (t = topic, f = format, a = audience) => {
    if (!t || !f || !a) return
    setValue('topic_preferences', [t.formValue])
    setValue('event_format', f.formValue)
    if (!getValues('message')) {
      setValue('message', `I'd like "${t.session}" as a ${f.label.toLowerCase()} for ${a.line.toLowerCase()}.\n\n`)
    }
  }

  const next = async () => {
    if (step === 'audience') commitPicks()
    if (step in chosen ? chosen[step] : await checkStep(FIELDS[step] ?? [])) go(STEPS[index + 1].id)
  }

  /** Single-choice steps move on by themselves after a beat, so the pick is seen before the screen changes. */
  const pick = (patch: typeof picked) => {
    setPicked((p) => ({ ...p, ...patch }))
    if (patch.audience) {
      commitPicks(topic, format, AUDIENCES.find((a) => a.id === patch.audience))
    }
    window.clearTimeout(advanceTimer.current)
    advanceTimer.current = window.setTimeout(() => go(STEPS[index + 1].id), 280)
  }

  return (
    <div id="book" className="hp-card hp-card--frame scroll-mt-28">
      <Progress index={index} sent={sent} onJump={go} />

      {sent ? (
        <SentNote headingRef={headingRef} name={getValues('first_name')} session={topic?.session} />
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            // Stays in the page: steps advance client-side. A function `action` would make React reset the
            // uncontrolled inputs after every step and wipe the answers.
            e.preventDefault()
            if (step === 'you') send()
            else next()
          }}
        >
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
            <label htmlFor="website-booking">Website</label>
            <input id="website-booking" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <div key={step} className={cn('px-5 py-6 sm:px-7 sm:py-7', direction === 'next' ? 'step-next' : 'step-prev')}>
            <h3 ref={headingRef} tabIndex={-1} className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.025em] text-hp-text outline-none sm:text-[1.75rem]">
              {current.question}
            </h3>

            <div className="mt-5">
              {isChoice(step) && (
                <ChoiceStep
                  step={step}
                  value={{ topic: topicId, format: formatId, audience: audienceId }[step]}
                  onPick={(id) => pick({ [step]: id })}
                />
              )}

              {step === 'event' && <EventFields field={field} errors={errors} control={form.control} clearErrors={form.clearErrors} />}

              {step === 'you' && <ContactFields field={field} errors={errors} failed={status === 'error'} />}
            </div>
          </div>

          <StepFooter
            first={index === 0}
            last={step === 'you'}
            sending={status === 'sending'}
            blocked={isChoice(step) && !chosen[step]}
            onBack={() => go(STEPS[index - 1].id)}
          />
        </form>
      )}
    </div>
  )
}
