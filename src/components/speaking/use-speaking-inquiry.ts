'use client'

import { useState } from 'react'
import { useForm, type FieldPath } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { speakingFormSchema, type SpeakingFormData } from '@/lib/validations/speaking'
import { useAnalytics } from '@/hooks/use-analytics'

export type InquiryStatus = 'idle' | 'sending' | 'sent' | 'error'
export type InquiryField = FieldPath<SpeakingFormData>

/**
 * The one speaking inquiry, shared by both multistep forms (the booking card on home and /speaking,
 * and the conversation on /contact). Same schema, same /api/speaking payload, same spam guards.
 */
export function useSpeakingInquiry(source: string) {
  const [status, setStatus] = useState<InquiryStatus>('idle')
  const [honeypot, setHoneypot] = useState('')
  const [startedAt] = useState(() => Date.now())
  const { trackSpeaking, trackApplicationError } = useAnalytics()

  const form = useForm<SpeakingFormData>({
    resolver: zodResolver(speakingFormSchema),
    defaultValues: { topic_preferences: [], message: '' },
  })

  /**
   * register() for these forms. Errors appear when a step is checked and clear as soon as the field changes.
   * Nothing re-validates on blur: a message vanishing on blur shifts the layout under the pointer and eats
   * the click on the next choice.
   */
  const field = (name: InquiryField) =>
    form.register(name, {
      onChange: () => {
        if (form.getFieldState(name).error) form.clearErrors(name)
      },
    })

  const send = form.handleSubmit(async (data) => {
    setStatus('sending')
    try {
      const response = await fetch('/api/speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          referrer: document.referrer || null,
          userAgent: navigator.userAgent,
          urlParams: { ...Object.fromEntries(new URLSearchParams(window.location.search)), form: source },
          website: honeypot,
          _formStartTime: startedAt.toString(),
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error('Speaking inquiry submission failed')
      trackSpeaking('form_submit', data.topic_preferences[0])
      setStatus('sent')
    } catch (error) {
      trackApplicationError('speaking_form_exception', String(error), source, true)
      setStatus('error')
    }
  })

  /** Validate just this step's fields; true when they all pass. */
  const checkStep = (fields: InquiryField[]) => form.trigger(fields, { shouldFocus: true })

  return { form, field, send, status, setStatus, checkStep, honeypot, setHoneypot }
}
