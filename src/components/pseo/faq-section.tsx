"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQ } from '@/types/pseo'

interface FAQSectionProps {
  faqs: FAQ[]
  heading?: string
}

export function FAQSection({ faqs, heading = 'Frequently Asked Questions' }: FAQSectionProps) {
  if (faqs.length === 0) return null

  return (
    <section className="py-12">
      <h2 className="font-signal text-2xl md:text-3xl font-semibold mb-8">{heading}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={`faq-${faq.question}`} className="border-b border-border">
            <AccordionTrigger className="text-left text-base font-medium py-5 hover:no-underline hover:text-lilac">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
