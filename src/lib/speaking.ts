/**
 * Speaking content, in one place for the home page, /speaking and the inquiry form.
 * Facts come from the site's existing copy (PRODUCT.md "Evidence on Hand"); nothing here
 * adds a fee, a result or an audience claim.
 */

export const TOPICS = [
  {
    id: 'ai',
    label: 'AI in mortgage marketing',
    formValue: 'AI in Mortgage Marketing',
    session: 'Automate to elevate: AI, no-code and workflow hacks for mortgage marketing',
    summary:
      'How AI is changing mortgage marketing and customer engagement, from the CMO chair, with the workflows behind it.',
    points: [
      'Implementing AI-powered personalization at scale',
      'Automating compliance-friendly content creation',
      'Building data-driven marketing campaigns',
      'Measuring ROI on AI investments',
    ],
  },
  {
    id: 'transformation',
    label: 'Digital transformation',
    formValue: 'Digital Transformation',
    session: 'Leading digital transformation in a mortgage company',
    summary:
      'How to lead digital transformation that drives real business results in the mortgage industry.',
    points: [
      'Creating a digital-first culture',
      'Modernizing legacy systems and processes',
      'Enhancing customer experience through technology',
      'Building competitive advantages with digital tools',
    ],
  },
  {
    id: 'teams',
    label: 'Building marketing teams',
    formValue: 'Building Marketing Teams',
    session: 'Experts with power tools: building a marketing team for the AI era',
    summary: 'Strategies for building and leading high-performance marketing teams in the digital age.',
    points: [
      'Recruiting and retaining top talent',
      'Fostering innovation and creativity',
      'Implementing agile marketing methodologies',
      'Developing data-driven team cultures',
    ],
  },
] as const

export const FORMATS = [
  { id: 'keynote', label: 'Keynote', formValue: 'Keynote', length: '45 to 60 minutes', detail: 'Keynote presentation' },
  { id: 'workshop', label: 'Workshop', formValue: 'Workshop', length: 'Half day or full day', detail: 'Hands-on workshop session' },
  { id: 'panel', label: 'Panel or fireside', formValue: 'Panel or fireside chat', length: 'Moderated conversation', detail: 'Panel discussion or fireside chat' },
  { id: 'virtual', label: 'Virtual', formValue: 'Webinar or virtual', length: 'Live, with Q&A', detail: 'Virtual presentation or webinar' },
] as const

export const AUDIENCES = [
  { id: 'executives', label: 'Executives', line: 'Mortgage executives and leadership teams' },
  { id: 'sales', label: 'Loan officers and sales', line: 'Loan officers and sales teams' },
  { id: 'marketing', label: 'Marketing teams', line: 'Marketing and brand teams' },
] as const

export type TopicId = (typeof TOPICS)[number]['id']
export type FormatId = (typeof FORMATS)[number]['id']
export type AudienceId = (typeof AUDIENCES)[number]['id']

export const INCLUDED = [
  'A pre-event call to shape the session around your audience',
  'A presentation customized for your event',
  'Q&A with attendees',
  'Post-event resources and takeaways',
] as const

/** Past stages, newest first. */
export const ENGAGEMENTS = [
  {
    year: '2025',
    date: 'Aug 20, 2025',
    event: 'NAMMBA Connect 2025, Mortgage Marketing Executive Summit',
    organization: 'National Association of Minority Mortgage Bankers of America',
    role: 'Featured speaker',
    topic: 'Automate to Elevate: AI, No-Code, and Workflow Hacks that 5x Your Marketing Output',
    place: 'Orlando, FL',
    audience: 'Invite-only summit for top marketing executives (50 seats)',
  },
  {
    year: '2024',
    date: '2024',
    event: 'Nationwide Mortgage Bankers Sales Summit',
    organization: 'Nationwide Mortgage Bankers',
    role: 'Keynote',
    topic: 'AI-Powered Sales & Marketing Excellence',
    place: 'Company-wide',
    audience: 'Sales teams and loan officers',
  },
  {
    year: '2024',
    date: '2024',
    event: 'NAIFA-Tidewater Chapter Quarterly Meeting',
    organization: 'National Association of Insurance and Financial Advisors',
    role: 'Chapter speaker',
    topic: 'AI Revolution in Business & Marketing',
    place: 'Tidewater, VA',
    audience: 'Financial advisors and insurance professionals',
  },
  {
    year: '2023',
    date: '2023',
    event: 'Southern Trust Mortgage Sales Summit',
    organization: 'Southern Trust Mortgage',
    role: 'Guest expert',
    topic: 'Building High-Performance Marketing Teams',
    place: 'Regional',
    audience: 'Mortgage professionals and leadership',
  },
  {
    year: '2019',
    date: '2019',
    event: 'Total Expert Accelerate Conference',
    organization: 'Total Expert',
    role: 'Marketing experts panelist',
    topic: 'Marketing Strategy for the Industry and Teams',
    place: 'National conference',
    audience: 'Mortgage and banking professionals',
  },
] as const

export const RECOGNITION = [
  { year: '2023', title: 'HousingWire Marketing Leader' },
  { year: '2022', title: 'National Mortgage Professional Top 40 Under 40' },
] as const

/** Verbatim sentences from colleague recommendations (full text lived in testimonials-carousel.tsx, removed 2026-11-18; see git history). */
export const COLLEAGUES = [
  {
    quote:
      'In the simplest terms, Jarrett is a leader who builds brands and grows companies into market leaders.',
    name: 'Corey Shelton',
    role: 'CMO, driving digital transformation',
    year: '2016',
  },
  {
    quote:
      'Because of his vision, he was able to change the position of our company from a small local lender with an "ok" image to a national mortgage lender that is now competing with the best of the best.',
    name: 'Stacey Sifuentes, CPC',
    role: 'Entrepreneur, growth hacker, speaker',
    year: '2016',
  },
  {
    quote: 'To put it simply, Jarrett is built to lead people and have creative control over a brand or project.',
    name: 'Travis Harger',
    role: 'Creative director of video and photography',
    year: '2018',
  },
] as const

export function sessionHref(topic: TopicId, format: FormatId, audience: AudienceId) {
  return `/speaking?topic=${topic}&format=${format}&audience=${audience}#book`
}
