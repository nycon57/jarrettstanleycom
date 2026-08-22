import type { FAQ } from '@/types/pseo'

/**
 * The questions people actually ask before booking or hiring. Answered from
 * what the rest of the site already says — no fees, dates, or claims that are
 * not published elsewhere. Also rendered as FAQPage JSON-LD on the homepage.
 */
export const homeFaqs: FAQ[] = [
  {
    question: 'Who is Jarrett Stanley?',
    answer:
      'Chief Marketing Officer at Nationwide Mortgage Bankers and CEO of TrueTone AI. He has spent more than 15 years in mortgage marketing — at Nationwide Mortgage Bankers, Southern Trust Mortgage, Atlantic Bay Mortgage Group, and Movement Mortgage — and now works at the intersection of lending and artificial intelligence. He was named a HousingWire Marketing Leader in 2023 and a National Mortgage Professional Top 40 Under 40 in 2022.',
  },
  {
    question: 'What does he speak about?',
    answer:
      'Three signature topics: AI in mortgage marketing (personalization at scale, compliance-friendly content automation, measuring ROI on AI), digital transformation for lenders, and building high-performance marketing teams. Every talk is built on what he has shipped as a sitting CMO, and presentations are customized to the audience and event goals.',
  },
  {
    question: 'What speaking formats are available?',
    answer:
      'Keynote presentations of 45 to 60 minutes, half-day and full-day workshops, panel discussions and fireside chats, and virtual presentations or webinars. Every booking includes a pre-event consultation call, a presentation customized for your audience, a Q&A session, and post-event resources.',
  },
  {
    question: 'What does it cost to book him?',
    answer:
      'There is no published rate card. Speaking fees vary with event type, location, and how much customization the session needs, and virtual events are priced differently. Send your event date, audience, format, and location through the contact form and you will get a specific quote.',
  },
  {
    question: 'How does consulting work?',
    answer:
      'Three engagement models. Project-based work runs three to six months with a defined scope, milestones, and knowledge transfer. A retainer covers monthly strategy sessions, on-demand consultation, and quarterly business reviews. Strategic advisory runs twelve months or longer for executive teams and boards. Every engagement follows the same arc: discovery, strategy, implementation, optimization.',
  },
  {
    question: 'Who does he work with?',
    answer:
      'Mortgage lenders and the organizations around them — marketing teams adopting AI, executive teams planning digital transformation, and conference organizers programming for mortgage and financial services audiences. The work is marketing strategy and AI practice; it is not lending, underwriting, or regulatory advice.',
  },
  {
    question: 'What is The Signal?',
    answer:
      'A weekly newsletter on AI and mortgage marketing, written by a CMO who builds with it every day: unbiased AI tool reviews, strategy frameworks from twenty years in the industry, and case studies of real AI use in mortgage. The full archive is published on this site.',
  },
]
