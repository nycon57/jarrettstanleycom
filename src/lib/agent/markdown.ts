/**
 * Markdown representations of every public page, served from the canonical URL
 * when an agent sends `Accept: text/markdown` (see src/proxy.ts) and from the
 * sibling `.md` URL. Content-bearing pages are rendered from the same JSON data
 * the React pages use; the hand-written marketing pages are summarised here.
 */

import { siteConfig } from '@/lib/seo'
import { getAllBlogPosts, getBlogPost, blogCategories } from '@/lib/blog'
import {
  getAllCampaignExamples,
  getAllGlossaryTerms,
  getAllPersonas,
  getAllToolRoundups,
  getCampaignExample,
  getGlossaryTerm,
  getPersona,
  getToolRoundup,
} from '@/lib/pseo'
import {
  exampleTypeLabels,
  glossaryCategoryLabels,
  pricingTierLabels,
  toolCategoryLabels,
  type FAQ,
} from '@/types/pseo'
import type { ContentBlock } from '@/types/blog'
import { homeFaqs } from '@/lib/home-faqs'

export type MarkdownDocument = {
  /** Markdown body, already including the H1 and the shared footer. */
  body: string
  /** ISO date the underlying content last changed, when known. */
  lastModified?: string
}

const BASE_URL = siteConfig.url

function url(path: string): string {
  return `${BASE_URL}${path}`
}

function section(heading: string, lines: string[]): string {
  if (lines.length === 0) return ''
  return `## ${heading}\n\n${lines.join('\n')}\n`
}

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n')
}

function faqSection(faqs: FAQ[]): string {
  if (!faqs || faqs.length === 0) return ''
  const body = faqs
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join('\n\n')
  return `## Frequently asked questions\n\n${body}\n`
}

function docFooter(path: string): string {
  return [
    '---',
    '',
    `Canonical URL: ${url(path)}`,
    `Site: Jarrett Stanley — AI mortgage marketing speaker, strategic advisor, and CMO.`,
    `Agent index: ${url('/llms.txt')} · Sitemap: ${url('/sitemap.xml')} · Contact: ${url('/contact')}`,
  ].join('\n')
}

/** Strips the shared agent footer so the same Markdown can render as a page. */
export function stripDocFooter(body: string): string {
  const marker = '\n---\n\nCanonical URL:'
  const index = body.lastIndexOf(marker)
  return (index === -1 ? body : body.slice(0, index)).trim()
}

function assemble(path: string, parts: Array<string | undefined | null>): string {
  const body = parts
    .filter((part): part is string => Boolean(part && part.trim().length > 0))
    .map((part) => part.trim())
    .join('\n\n')

  return `${body}\n\n${docFooter(path)}\n`
}

// --- Blog content blocks -> Markdown ---------------------------------------

function renderContentBlocks(blocks: ContentBlock[]): string {
  return blocks
    .flatMap((block) => {
      switch (block.type) {
        case 'paragraph':
          return block.text
        case 'heading':
          return `${'#'.repeat(block.level)} ${block.text}`
        case 'list':
          return block.style === 'numbered'
            ? block.items.map((item, index) => `${index + 1}. ${item}`).join('\n')
            : bullets(block.items)
        case 'callout':
          return `> **${(block.variant ?? 'insight').toUpperCase()}:** ${block.text}`
        case 'divider':
          return '---'
        default:
          return []
      }
    })
    .join('\n\n')
}

// --- Static marketing pages -------------------------------------------------

const homeDoc = () =>
  assemble('/', [
    '# Jarrett Stanley — Where mortgage marketing meets artificial intelligence',
    'Most companies talk about AI. Jarrett Stanley builds with it. He is Chief Marketing Officer at Nationwide Mortgage Bankers and CEO of TrueTone AI, a keynote speaker, and a strategic advisor helping mortgage companies ship AI-powered marketing that actually scales.',
    section('What he does', [
      bullets([
        '**Speaking** — keynotes, workshops, and panels on AI in mortgage marketing, digital transformation, and building modern marketing teams. See ' + url('/speaking') + '.',
        '**Strategic consulting** — AI implementation strategy, marketing transformation, martech stack design, and team enablement for mortgage lenders. See ' + url('/services/consulting') + '.',
        '**The Signal newsletter** — a weekly briefing on AI and mortgage marketing written by an operator, not an observer. See ' + url('/insights/blog') + '.',
      ]),
    ]),
    section('Credentials', [
      bullets([
        'Chief Marketing Officer, Nationwide Mortgage Bankers (2023–present)',
        'CEO, TrueTone AI',
        '15+ years in mortgage marketing across Nationwide Mortgage Bankers, Southern Trust Mortgage, Atlantic Bay Mortgage Group, and Movement Mortgage',
        'HousingWire Marketing Leader (2023), National Mortgage Professional Top 40 Under 40 (2022), MBA Digital Innovation Award (2020)',
      ]),
    ]),
    faqSection(homeFaqs),
    section('Start here', [
      bullets([
        `Book a speaking engagement: ${url('/speaking')}`,
        `Explore consulting engagements: ${url('/services/consulting')}`,
        `Read the latest thinking: ${url('/insights/blog')}`,
        `AI + mortgage marketing glossary: ${url('/insights/glossary')}`,
        `Contact: ${url('/contact')}`,
      ]),
    ]),
  ])

const aboutDoc = () =>
  assemble('/about', [
    '# About Jarrett Stanley',
    'Jarrett Stanley is Chief Marketing Officer at Nationwide Mortgage Bankers and CEO of TrueTone AI. He has spent more than 15 years in mortgage marketing and now works at the intersection of lending and artificial intelligence — building AI systems that make marketing teams faster without giving up compliance or the human relationship at the center of a mortgage.',
    section('Bridging innovation and tradition', [
      "Jarrett has watched mortgage marketing move from traditional channels to digital-first strategy, and his work in AI comes from a conviction that technology should make mortgage professionals more capable rather than replace them. As CMO at Nationwide Mortgage Bankers he leads a marketing organization that builds campaigns to generate loans and lasting borrower relationships alike.",
    ]),
    section('Professional journey', [
      bullets([
        '**Chief Marketing Officer, Nationwide Mortgage Bankers** (May 2023 – present) — leads enterprise marketing transformation and AI strategy; digital initiatives credited with a 300% increase in qualified leads.',
        '**EVP & CMO, Nationwide Mortgage Bankers / Southern Trust Mortgage** (Jun 2021 – May 2023) — ran the marketing integration through the merger and pioneered AI-powered marketing automation for lead generation and compliance.',
        '**VP to SVP of Marketing, Southern Trust Mortgage** (Sep 2016 – Jun 2021) — owned brand, recruiting, and marketing support across all channels with multi-million-dollar budgets.',
        '**Creative Director, Atlantic Bay Mortgage Group** (Jul 2011 – Sep 2016) — led the 2013 rebrand that tripled market share and supported expansion to 40+ locations and $3B+ in annual production.',
        '**Senior Graphic Designer, Movement Mortgage** (Jun 2007 – Jul 2011) — helped scale marketing operations from 8 to 500+ employees.',
      ]),
    ]),
    section('Recognition', [
      bullets([
        'HousingWire Marketing Leader (2023)',
        'Top 40 Under 40, National Mortgage Professional (2022)',
        'Digital Innovation Award, Mortgage Bankers Association (2020)',
      ]),
    ]),
    section('Areas of expertise', [
      bullets([
        '**Mortgage marketing** — compliance-driven lead generation, brand strategy, campaign management',
        '**AI & technology** — AI implementation, martech stack design, automation, data analytics',
        '**Digital innovation** — digital transformation, innovation strategy, process optimization',
        '**Team leadership** — team building, talent development, strategic planning',
      ]),
    ]),
  ])

const speakingDoc = () =>
  assemble('/speaking', [
    '# Speaking — Jarrett Stanley',
    'Jarrett Stanley delivers keynotes, workshops, and panels on AI-powered mortgage marketing, digital transformation, and marketing leadership. Sessions are built around what he has actually shipped as a sitting CMO, so audiences leave with frameworks they can run the next week.',
    section('Signature topics', [
      bullets([
        '**AI in Mortgage Marketing** — AI-powered personalization at scale, compliance-friendly content automation, data-driven campaigns, and measuring ROI on AI investments.',
        '**Digital Transformation** — building a digital-first culture, modernizing legacy systems, improving borrower experience with technology.',
        '**Building Marketing Teams** — recruiting and retaining talent, agile marketing operations, and data-driven team culture.',
      ]),
      '',
      'Custom presentations are available and tailored to the audience and event goals.',
    ]),
    section('Speaking formats', [
      bullets([
        'Keynote presentations (45–60 minutes)',
        'Workshop sessions (half-day or full-day)',
        'Panel discussions and fireside chats',
        'Virtual presentations and webinars',
      ]),
    ]),
    section('What every engagement includes', [
      bullets([
        'Pre-event consultation call',
        'Presentation customized for your audience',
        'Q&A session with attendees',
        'Post-event resources and takeaways',
      ]),
    ]),
    section('Selected engagements', [
      bullets([
        '**NAMMBA Connect 2025 — Mortgage Marketing Executive Summit** (Orlando, FL, August 2025), featured speaker: "Automate to Elevate: AI, No-Code, and Workflow Hacks that 5× Your Marketing Output."',
        '**NAIFA Tidewater Chapter Quarterly Meeting** (2024): "AI Revolution in Business & Marketing."',
        '**Nationwide Mortgage Bankers Sales Summit** (2024), keynote: "AI-Powered Sales & Marketing Excellence."',
        '**Southern Trust Mortgage Sales Summit** (2023), guest expert: "Building High-Performance Marketing Teams."',
        '**Total Expert Accelerate Conference** (2019), marketing-expert panelist.',
      ]),
    ]),
    section('Booking', [
      `Speaking fees vary with event type, location, and customization; virtual events are priced differently. Send event details through ${url('/contact')} to start the conversation.`,
    ]),
  ])

const servicesDoc = () =>
  assemble('/services', [
    '# Services — Jarrett Stanley',
    'Three ways to work with Jarrett Stanley: speaking engagements, strategic consulting, and ongoing advisory for mortgage industry leaders.',
    section('Speaking engagements', [
      bullets([
        'Keynote presentations',
        'Industry conferences',
        'Executive workshops',
        'Webinars and virtual events',
      ]),
      '',
      `Details: ${url('/speaking')}`,
    ]),
    section('Strategic consulting', [
      bullets([
        'AI implementation strategy',
        'Marketing transformation',
        'Team development',
        'Technology stack optimization',
      ]),
      '',
      `Details: ${url('/services/consulting')}`,
    ]),
    section('Advisory services', [
      bullets([
        'Executive advisory',
        'Board advisory positions',
        'Strategic planning',
        'Industry insights',
      ]),
    ]),
    section('Why work with Jarrett', [
      bullets([
        '**Industry leadership** — a sitting CMO transforming mortgage marketing at scale, not a consultant describing it from outside.',
        '**AI practitioner** — has built and deployed AI systems in production mortgage marketing.',
        '**Proven results** — 300%+ ROI improvements and significant cost reduction across organizations.',
        '**Actionable insights** — every engagement ends with strategies your team can implement.',
      ]),
    ]),
  ])

const consultingDoc = () =>
  assemble('/services/consulting', [
    '# Strategic consulting — Jarrett Stanley',
    'Hands-on consulting for mortgage lenders adopting AI in marketing: strategy, tooling, implementation, and the team change management that makes it stick.',
    section('Focus areas', [
      bullets([
        '**Marketing strategy** — AI-powered marketing strategy aligned to business goals and measurable outcomes.',
        '**AI implementation** — selecting, integrating, and optimizing AI tools and platforms.',
        '**Team development** — training, workshops, and change management that build AI-literate marketing teams.',
        '**Technology stack** — AI-first martech that integrates cleanly with mortgage systems of record.',
      ]),
    ]),
    section('Engagement models', [
      bullets([
        '**Project-based (3–6 months)** — defined scope, deliverables, milestones, and knowledge transfer. Best for a specific AI initiative or transformation project.',
        '**Retainer (ongoing)** — monthly strategy sessions, on-demand consultation, priority response, quarterly business reviews. Best for continuous AI advisory.',
        '**Strategic advisory (12+ months)** — C-suite advisory, board presentations, strategic planning. Best for enterprises navigating digital transformation.',
      ]),
    ]),
    section('Consulting process', [
      bullets([
        '1. **Discovery** — deep dive into current challenges, goals, and opportunities.',
        '2. **Strategy** — a customized AI roadmap aligned with business objectives.',
        '3. **Implementation** — hands-on guidance while your team executes.',
        '4. **Optimization** — continuous improvement and scaling of what works.',
      ]),
    ]),
    section('Starting an engagement', [
      `Submit challenges, goals, company size, budget range, and timeline through the consulting inquiry form at ${url('/services/consulting')}, or use the general contact form at ${url('/contact')}.`,
    ]),
  ])

const contactDoc = () =>
  assemble('/contact', [
    '# Contact Jarrett Stanley',
    'Three pathways, depending on what you need.',
    section('Choose a pathway', [
      bullets([
        `**Speaking engagements** — keynotes, panels, and workshops on AI-powered marketing: ${url('/speaking')}`,
        `**Consulting services** — AI implementation, marketing automation, team training, strategic planning: ${url('/services/consulting')}`,
        `**Media requests** — expert commentary, industry analysis, press interviews, and thought leadership.`,
      ]),
    ]),
    section('Direct contact', [
      bullets([
        `Email: ${siteConfig.author.email}`,
        `LinkedIn: ${siteConfig.author.linkedin}`,
        `Contact form: ${url('/contact')}`,
      ]),
      '',
      'Inquiries are answered personally. Expect an expert read on the problem rather than a sales pitch.',
    ]),
  ])

const insightsDoc = async () => {
  const [posts, terms, tools, examples] = await Promise.all([
    getAllBlogPosts(),
    getAllGlossaryTerms(),
    getAllToolRoundups(),
    getAllCampaignExamples(),
  ])

  return assemble('/insights', [
    '# Insights — AI and mortgage marketing',
    'Research, definitions, tool reviews, and campaign teardowns for mortgage marketing leaders adopting AI.',
    section('Sections', [
      bullets([
        `[Blog & articles](${url('/insights/blog')}) — ${posts.length} long-form pieces from The Signal newsletter.`,
        `[Glossary](${url('/insights/glossary')}) — ${terms.length} AI and mortgage marketing terms defined in industry context.`,
        `[Tools & resources](${url('/insights/tools')}) — ${tools.length} curated tool roundups by category.`,
        `[Campaign examples](${url('/insights/examples')}) — ${examples.length} teardowns of AI marketing campaigns that worked.`,
      ]),
    ]),
  ])
}

const resourcesDoc = () =>
  assemble('/resources', [
    '# Resources',
    'Downloadable guides, frameworks, and reference material on AI in mortgage marketing, plus The Signal newsletter archive.',
    section('Where to look', [
      bullets([
        `[Blog & articles](${url('/insights/blog')})`,
        `[AI & mortgage marketing glossary](${url('/insights/glossary')})`,
        `[Tool roundups](${url('/insights/tools')})`,
        `[Campaign examples](${url('/insights/examples')})`,
        `[Solutions by role](${url('/solutions')})`,
      ]),
    ]),
  ])

// --- Generated index pages --------------------------------------------------

const blogIndexDoc = async () => {
  const posts = await getAllBlogPosts()
  const entries = posts.map(
    (post) =>
      `- [${post.title}](${url(`/insights/blog/${post.slug}`)}) — ${post.excerpt} _(${post.publishedAt}, ${post.readTimeMinutes} min read)_`,
  )

  return {
    body: assemble('/insights/blog', [
      '# Blog & articles',
      'Long-form thinking on AI, data, and marketing operations in mortgage lending — the archive of The Signal newsletter.',
      section(`All articles (${posts.length})`, [entries.join('\n')]),
      section('Categories', [
        bullets(blogCategories.map((category) => `**${category.name}** — ${category.description}`)),
      ]),
    ]),
    lastModified: posts[0]?.lastUpdated,
  }
}

const glossaryIndexDoc = async () => {
  const terms = await getAllGlossaryTerms()
  const entries = terms.map(
    (term) => `- [${term.term}](${url(`/insights/glossary/${term.slug}`)}) — ${term.shortDefinition}`,
  )

  return assemble('/insights/glossary', [
    '# AI & mortgage marketing glossary',
    `Plain-language definitions of ${terms.length} terms an AI-era mortgage marketer runs into, each written in mortgage industry context.`,
    section(`Terms (${terms.length})`, [entries.join('\n')]),
  ])
}

const solutionsIndexDoc = async () => {
  const personas = await getAllPersonas()
  const entries = personas.map(
    (persona) => `- [${persona.title}](${url(`/solutions/${persona.slug}`)}) — ${persona.personaDescription}`,
  )

  return assemble('/solutions', [
    '# Solutions by role',
    'AI marketing strategies mapped to the role you actually hold — what to fix first, which tools matter, and what the outcome looks like.',
    section(`Roles (${personas.length})`, [entries.join('\n')]),
  ])
}

const toolsIndexDoc = async () => {
  const roundups = await getAllToolRoundups()
  const entries = roundups.map(
    (roundup) => `- [${roundup.title}](${url(`/insights/tools/${roundup.slug}`)}) — ${roundup.introduction.slice(0, 200)}`,
  )

  return assemble('/insights/tools', [
    '# AI tools for mortgage marketing',
    'Curated, opinionated roundups of the AI tools mortgage marketing teams actually use, organized by job to be done.',
    section(`Roundups (${roundups.length})`, [entries.join('\n')]),
  ])
}

const examplesIndexDoc = async () => {
  const examples = await getAllCampaignExamples()
  const entries = examples.map(
    (example) => `- [${example.title}](${url(`/insights/examples/${example.slug}`)}) — ${example.introduction.slice(0, 200)}`,
  )

  return assemble('/insights/examples', [
    '# AI marketing campaign examples',
    'Teardowns of real and representative AI-powered mortgage marketing campaigns: what ran, why it worked, and how to replicate it.',
    section(`Examples (${examples.length})`, [entries.join('\n')]),
  ])
}

// --- Generated detail pages -------------------------------------------------

async function blogPostDoc(slug: string): Promise<MarkdownDocument | null> {
  const post = await getBlogPost(slug)
  if (!post) return null

  const path = `/insights/blog/${slug}`
  const meta = [
    `**Published:** ${post.publishedAt}`,
    `**Author:** ${post.author.name}, ${post.author.title}${post.author.company ? `, ${post.author.company}` : ''}`,
    `**Read time:** ${post.readTimeMinutes} min`,
    post.series ? `**Series:** ${post.series.name} #${post.series.issueNumber}` : '',
    post.categories.length ? `**Categories:** ${post.categories.join(', ')}` : '',
  ].filter(Boolean)

  return {
    body: assemble(path, [
      `# ${post.title}`,
      `> ${post.excerpt}`,
      meta.join('  \n'),
      renderContentBlocks(post.content),
      faqSection(post.faqs),
    ]),
    lastModified: post.lastUpdated ?? post.publishedAt,
  }
}

async function glossaryTermDoc(slug: string): Promise<MarkdownDocument | null> {
  const term = await getGlossaryTerm(slug)
  if (!term) return null

  const path = `/insights/glossary/${slug}`

  return {
    body: assemble(path, [
      `# ${term.term}`,
      `> ${term.shortDefinition}`,
      `**Category:** ${glossaryCategoryLabels[term.category] ?? term.category}`,
      section('Detailed explanation', [term.detailedExplanation]),
      section('Why it matters in mortgage marketing', [term.industryContext]),
      term.examples.length
        ? section(
            'Examples',
            term.examples.map((example) => `- **${example.title}** — ${example.description}`),
          )
        : '',
      faqSection(term.faqs),
      term.relatedTerms.length
        ? section(
            'Related terms',
            [bullets(term.relatedTerms.map((related) => `[${related}](${url(`/insights/glossary/${related}`)})`))],
          )
        : '',
    ]),
    lastModified: term.lastUpdated,
  }
}

async function personaDoc(slug: string): Promise<MarkdownDocument | null> {
  const persona = await getPersona(slug)
  if (!persona) return null

  const path = `/solutions/${slug}`

  return {
    body: assemble(path, [
      `# ${persona.title}`,
      `> ${persona.personaDescription}`,
      section(
        'Pain points',
        persona.painPoints.map((point) => `- **${point.title}** — ${point.description}`),
      ),
      section(
        'AI solutions',
        persona.aiSolutions.map(
          (solution) => `- **${solution.title}** — ${solution.description} _(${solution.impactMetric})_`,
        ),
      ),
      section(
        'Use cases',
        persona.useCases.map((useCase) => `- **${useCase.title}** — ${useCase.description} Outcome: ${useCase.outcome}`),
      ),
      section(
        'Benefits',
        persona.benefits.map(
          (benefit) => `- **${benefit.title}** — ${benefit.description}${benefit.metric ? ` _(${benefit.metric})_` : ''}`,
        ),
      ),
      faqSection(persona.faqs),
      section('Next step', [`${persona.ctaHeading} — ${persona.ctaDescription} Start at ${url('/contact')}.`]),
    ]),
    lastModified: persona.lastUpdated,
  }
}

async function toolRoundupDoc(slug: string): Promise<MarkdownDocument | null> {
  const roundup = await getToolRoundup(slug)
  if (!roundup) return null

  const path = `/insights/tools/${slug}`
  const tools = roundup.tools
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .map((tool) =>
      [
        `### ${tool.rank}. ${tool.name}`,
        '',
        tool.description,
        '',
        `- **Best for:** ${tool.bestFor}`,
        `- **Pricing:** ${pricingTierLabels[tool.pricingTier] ?? tool.pricingTier}`,
        `- **Website:** ${tool.websiteUrl}`,
        tool.pros.length ? `- **Pros:** ${tool.pros.join('; ')}` : '',
        tool.cons.length ? `- **Cons:** ${tool.cons.join('; ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n\n')

  return {
    body: assemble(path, [
      `# ${roundup.title}`,
      roundup.introduction,
      `**Category:** ${toolCategoryLabels[roundup.category] ?? roundup.category}`,
      roundup.comparisonCriteria.length
        ? section('How these were compared', [bullets(roundup.comparisonCriteria)])
        : '',
      `## Tools\n\n${tools}`,
      roundup.recommendations.length
        ? section(
            'Recommendations by use case',
            roundup.recommendations.map((rec) => `- **${rec.useCase}:** ${rec.toolName} — ${rec.reason}`),
          )
        : '',
      faqSection(roundup.faqs),
    ]),
    lastModified: roundup.lastUpdated,
  }
}

async function campaignExampleDoc(slug: string): Promise<MarkdownDocument | null> {
  const example = await getCampaignExample(slug)
  if (!example) return null

  const path = `/insights/examples/${slug}`
  const entries = example.examples
    .map((entry) =>
      [
        `### ${entry.title}${entry.company ? ` — ${entry.company}` : ''}`,
        '',
        `_${entry.isReal ? 'Real campaign' : 'Representative example'}_`,
        '',
        entry.description,
        '',
        `**Why it works:** ${entry.whyItWorks}`,
        entry.metrics
          ? `\n**Metrics:** ${Object.entries(entry.metrics)
              .map(([key, value]) => `${key}: ${value}`)
              .join(' · ')}`
          : '',
        entry.keyTakeaways.length ? `\n**Key takeaways:**\n${bullets(entry.keyTakeaways)}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n\n')

  return {
    body: assemble(path, [
      `# ${example.title}`,
      example.introduction,
      `**Campaign type:** ${exampleTypeLabels[example.exampleType] ?? example.exampleType}`,
      `## Examples\n\n${entries}`,
      section('Analysis', [example.analysis]),
      example.howToReplicate.length
        ? section(
            'How to replicate this',
            example.howToReplicate
              .slice()
              .sort((a, b) => a.step - b.step)
              .map((step) => `${step.step}. **${step.title}** — ${step.description}`),
          )
        : '',
      faqSection(example.faqs),
    ]),
    lastModified: example.lastUpdated,
  }
}

// --- Legal pages ------------------------------------------------------------

const privacyDoc = () =>
  assemble('/privacy', [
    '# Privacy policy',
    `How jarrettstanley.com collects, uses, and protects information. Questions: ${siteConfig.author.email}.`,
    section('Information collected', [
      bullets([
        '**Information you submit** — name, email address, phone number, company, role, and message content submitted through the contact, consulting, speaking, media, or newsletter forms.',
        '**Analytics data** — pages viewed, referring URL, approximate location derived from IP address, device and browser type, collected through privacy-respecting analytics.',
        '**Technical data** — server logs and error reports used to keep the site running correctly.',
      ]),
    ]),
    section('How information is used', [
      bullets([
        'To respond to speaking, consulting, and media inquiries.',
        'To send The Signal newsletter to people who ask for it.',
        'To understand which content is useful and improve the site.',
        'To protect the site against spam and abuse.',
      ]),
      '',
      'Information submitted through this site is never sold, and it is not shared with advertisers.',
    ]),
    section('Service providers', [
      'Form submissions and newsletter subscriptions are stored with our database provider and delivered by our transactional email provider. Site analytics and error monitoring are provided by our hosting platform. Each provider processes data only to deliver its service.',
    ]),
    section('Your choices', [
      bullets([
        'Unsubscribe from the newsletter using the link in any email.',
        `Request a copy or deletion of your information by emailing ${siteConfig.author.email}.`,
        'Use browser controls to limit cookies and analytics.',
      ]),
    ]),
    section('Data retention and security', [
      'Inquiry records are retained only as long as needed to respond and maintain a business relationship. Data is transmitted over HTTPS and stored with access controls, though no method of transmission over the internet is completely secure.',
    ]),
    section("Children's privacy", [
      'This site is intended for mortgage and marketing professionals and is not directed to children under 13. No information is knowingly collected from children.',
    ]),
    section('Changes', [
      'This policy may be updated as the site changes. Material changes will be reflected on this page with a new effective date.',
    ]),
  ])

const termsDoc = () =>
  assemble('/terms', [
    '# Terms of service',
    'The terms that govern use of jarrettstanley.com.',
    section('Use of this site', [
      'This site is provided for informational purposes. You may read, quote with attribution, and link to its content. You may not scrape it in a way that degrades service for others, republish it wholesale, or present it as your own work.',
    ]),
    section('No professional advice', [
      'Content here is general information about marketing, technology, and the mortgage industry. It is not legal, compliance, financial, or lending advice, and it does not create a consulting relationship. Mortgage marketing is a regulated activity — validate anything you read here against your own compliance requirements and counsel before acting on it.',
    ]),
    section('Engagements', [
      `Speaking and consulting engagements are governed by a separate written agreement. Nothing on this site is an offer or a binding commitment to provide services. Start a conversation at ${url('/contact')}.`,
    ]),
    section('Intellectual property', [
      'Written content, frameworks, and presentation materials on this site belong to Jarrett Stanley unless credited otherwise. Third-party trademarks belong to their owners and are referenced descriptively.',
    ]),
    section('Disclaimer and liability', [
      'This site is provided "as is" without warranties of any kind. To the extent permitted by law, Jarrett Stanley is not liable for any loss arising from use of, or reliance on, this site or its content.',
    ]),
    section('Changes', [
      'These terms may be updated as the site changes. Continued use after an update constitutes acceptance of the revised terms.',
    ]),
  ])

const developersDoc = () =>
  assemble('/developers', [
    '# Developer and agent documentation',
    'Everything published on jarrettstanley.com is available over a public, read-only API, plus an MCP server, an A2A agent, an NLWeb question endpoint, and a Markdown representation of every page. No API key, no OAuth, no sign-up, and no write operations.',
    section('Quick start', [
      '```',
      `curl "${url('/api/v1/search')}?q=ai%20lead%20scoring&limit=3"`,
      `curl "${url('/api/v1/content/insights/glossary/ai-lead-scoring')}"`,
      `curl -H "Accept: text/markdown" ${url('/speaking')}`,
      '```',
    ]),
    section('Endpoints', [
      bullets([
        `\`GET ${url('/api/v1')}\` — API index: endpoints, versioning policy, rate limits, pagination, and the other agent interfaces.`,
        `\`GET ${url('/api/v1/content')}\` — list published pages; \`section\`, \`limit\`, \`offset\`, \`cursor\`, and a \`paths\` batch parameter.`,
        `\`GET ${url('/api/v1/content/{path}')}\` — read one page, including its full Markdown body.`,
        `\`GET ${url('/api/v1/search')}?q=\` — ranked full-text search with snippets and canonical URLs.`,
        `\`POST ${url('/mcp')}\` — MCP server (Streamable HTTP, JSON-RPC 2.0): \`search_content\`, \`get_page\`, \`list_content\`.`,
        `\`POST ${url('/a2a')}\` — A2A agent, JSON-RPC \`message/send\`.`,
        `\`GET ${url('/ask')}?query=\` — NLWeb question endpoint; \`&streaming=true\` for Server-Sent Events.`,
      ]),
    ]),
    section('Authentication', [
      `None, anywhere. Every interface is public, unauthenticated, and read-only; no endpoint returns 401 or 403. Full statement: ${url('/auth.md')}`,
    ]),
    section('Errors, pagination, and limits', [
      bullets([
        '**Errors** use RFC 9457 problem details (`application/problem+json`) with a stable `code`, a human-readable `detail`, and a documentation link.',
        '**Pagination** is `limit` (1–100, default 20) with `offset` or an opaque `cursor`. Responses carry `total`, `count`, and absolute `next` and `previous` URLs.',
        '**Rate limits** are advertised in the `RateLimit` and `RateLimit-Policy` response headers.',
        '**Versioning**: the major version is in the path. Breaking changes ship as `/api/v2`, with RFC 9745 `Deprecation` and `Sunset` headers at least 90 days before any removal.',
        '**Idempotency**: every operation is a safe, idempotent GET, so no `Idempotency-Key` is required.',
      ]),
    ]),
    section('Discovery', [
      bullets([
        `OpenAPI 3.1 description: ${url('/openapi.json')}`,
        `API catalog (RFC 9727): ${url('/.well-known/api-catalog')}`,
        `Agent index: ${url('/llms.txt')} · full text: ${url('/llms-full.txt')}`,
        `Agent skill: ${url('/.well-known/agent-skills/index.json')}`,
        `Resource catalog: ${url('/.well-known/ai-catalog.json')}`,
        `MCP server card: ${url('/.well-known/mcp/server-card.json')}`,
        `A2A agent card: ${url('/.well-known/agent-card.json')}`,
        `Schema.org feed: ${url('/schema-feed.jsonld')}`,
      ]),
    ]),
    section('Using the content', [
      `Quote and summarise with attribution to Jarrett Stanley and a link to the canonical page. This site publishes marketing strategy and AI practice — not mortgage rates, loan products, or regulatory guidance. Questions: ${siteConfig.author.email}`,
    ]),
  ])

// --- Routing ----------------------------------------------------------------

type DocResolver = () => Promise<MarkdownDocument | string> | MarkdownDocument | string

const staticDocs: Record<string, DocResolver> = {
  '/': homeDoc,
  '/about': aboutDoc,
  '/speaking': speakingDoc,
  '/services': servicesDoc,
  '/services/consulting': consultingDoc,
  '/contact': contactDoc,
  '/insights': insightsDoc,
  '/insights/blog': blogIndexDoc,
  '/insights/glossary': glossaryIndexDoc,
  '/insights/tools': toolsIndexDoc,
  '/insights/examples': examplesIndexDoc,
  '/insights/resources': resourcesDoc,
  '/solutions': solutionsIndexDoc,
  '/resources': resourcesDoc,
  '/developers': developersDoc,
  '/privacy': privacyDoc,
  '/terms': termsDoc,
}

const dynamicDocs: Array<{
  pattern: RegExp
  resolve: (slug: string) => Promise<MarkdownDocument | null>
}> = [
  { pattern: /^\/insights\/blog\/([^/]+)$/, resolve: blogPostDoc },
  { pattern: /^\/insights\/glossary\/([^/]+)$/, resolve: glossaryTermDoc },
  { pattern: /^\/insights\/tools\/([^/]+)$/, resolve: toolRoundupDoc },
  { pattern: /^\/insights\/examples\/([^/]+)$/, resolve: campaignExampleDoc },
  { pattern: /^\/solutions\/([^/]+)$/, resolve: personaDoc },
]

export function normalizePath(pathname: string): string {
  let path = pathname.trim()
  if (!path.startsWith('/')) path = `/${path}`
  if (path.endsWith('.md')) path = path.slice(0, -3)
  if (path.length > 1 && path.endsWith('/')) path = path.replace(/\/+$/, '')
  if (path === '/index') path = '/'
  return path.length === 0 ? '/' : path.toLowerCase()
}

/** Returns the Markdown representation of a page, or null when there is none. */
export async function getMarkdownDocument(pathname: string): Promise<MarkdownDocument | null> {
  const path = normalizePath(pathname)

  const staticResolver = staticDocs[path]
  if (staticResolver) {
    const result = await staticResolver()
    return typeof result === 'string' ? { body: result } : result
  }

  for (const { pattern, resolve } of dynamicDocs) {
    const match = path.match(pattern)
    if (match) return resolve(match[1])
  }

  return null
}

/** Markdown body returned with a 404, so agents can recover from a bad URL. */
export function notFoundMarkdown(pathname: string): string {
  return [
    '# 404 — Page not found',
    '',
    `No page exists at \`${pathname}\` on jarrettstanley.com.`,
    '',
    '## Where to go instead',
    '',
    bullets([
      `[Home](${url('/')}) — who Jarrett Stanley is and how to work with him`,
      `[About](${url('/about')}) — background, career history, and expertise`,
      `[Speaking](${url('/speaking')}) — keynote topics, formats, and booking`,
      `[Consulting](${url('/services/consulting')}) — engagement models and process`,
      `[Insights](${url('/insights')}) — blog, glossary, tool roundups, campaign examples`,
      `[Contact](${url('/contact')}) — speaking, consulting, and media inquiries`,
    ]),
    '',
    '## Machine-readable indexes',
    '',
    bullets([
      `Agent guide: ${url('/llms.txt')}`,
      `Full text index: ${url('/llms-full.txt')}`,
      `Sitemap: ${url('/sitemap.xml')}`,
    ]),
    '',
    'Every page on this site also serves Markdown from its canonical URL with `Accept: text/markdown`, or from the same URL with a `.md` suffix.',
    '',
  ].join('\n')
}

/** Every path that has a Markdown representation, in reading order. */
export async function getAllMarkdownPaths(): Promise<string[]> {
  const [posts, terms, personas, tools, examples] = await Promise.all([
    getAllBlogPosts(),
    getAllGlossaryTerms(),
    getAllPersonas(),
    getAllToolRoundups(),
    getAllCampaignExamples(),
  ])

  return [
    '/',
    '/about',
    '/speaking',
    '/services',
    '/services/consulting',
    '/contact',
    '/insights',
    '/insights/blog',
    ...posts.map((post) => `/insights/blog/${post.slug}`),
    '/insights/glossary',
    ...terms.map((term) => `/insights/glossary/${term.slug}`),
    '/insights/tools',
    ...tools.map((tool) => `/insights/tools/${tool.slug}`),
    '/insights/examples',
    ...examples.map((example) => `/insights/examples/${example.slug}`),
    '/solutions',
    ...personas.map((persona) => `/solutions/${persona.slug}`),
    '/resources',
    '/developers',
    '/privacy',
    '/terms',
  ]
}

/**
 * Prepends YAML frontmatter to a served Markdown document. Metadata lives here
 * rather than in the document body so the same body can render as an HTML page.
 */
export function withFrontmatter(document: MarkdownDocument, pathname: string): string {
  const path = normalizePath(pathname)
  const body = document.body
  const title = body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? 'Jarrett Stanley'

  const description = body
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith('#'))
    ?.replace(/^>\s*/, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .slice(0, 200)

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    description ? `description: ${JSON.stringify(description)}` : '',
    `canonical_url: ${url(path)}`,
    `source: jarrettstanley.com`,
    document.lastModified ? `last_modified: ${document.lastModified}` : '',
    '---',
  ]
    .filter(Boolean)
    .join('\n')

  return `${frontmatter}\n\n${body}`
}

/**
 * Machine-readable summary of every programmatic interface this site exposes.
 * Appended to any page requested with `?mode=agent`.
 */
export function agentInterfacesMarkdown(): string {
  return [
    '## Agent interfaces',
    '',
    `**Authentication:** none. Every interface below is public, read-only, unauthenticated, and rate-limited only against abuse. There are no API keys, no OAuth flows, and no write endpoints. Full statement: ${url('/auth.md')}`,
    '',
    '### Endpoints',
    '',
    bullets([
      `\`GET ${url('/api/v1')}\` — REST content API: \`/content\` (list, paginated), \`/content/{path}\` (read), \`/search?q=\` (ranked search). OpenAPI 3.1: ${url('/openapi.json')}. Docs: ${url('/developers')}`,
      `\`POST ${url('/mcp')}\` — Model Context Protocol server (Streamable HTTP, JSON-RPC 2.0). Tools: \`search_content(query, section?, limit?)\`, \`get_page(path)\`, \`list_content(section)\`. Server card: ${url('/.well-known/mcp/server-card.json')}`,
      `\`POST ${url('/a2a')}\` — A2A (Agent2Agent) endpoint, JSON-RPC \`message/send\`. Agent card: ${url('/.well-known/agent-card.json')}`,
      `\`GET ${url('/ask')}?query=…\` — NLWeb question endpoint. Returns schema.org JSON results; add \`&streaming=true\` for Server-Sent Events.`,
      `\`GET <any page>\` with \`Accept: text/markdown\` — Markdown representation of that page. Equivalent: append \`.md\` to the path, or \`?mode=agent\`.`,
      `\`GET ${url('/llms.txt')}\` — index of the site and guidance on when to use it.`,
      `\`GET ${url('/llms-full.txt')}\` — full text of every page in one response.`,
      `\`GET ${url('/schema-feed.jsonld')}\` — schema.org JSON-LD feed of all indexed content.`,
      `\`GET ${url('/sitemap.xml')}\` — every indexable URL.`,
      `\`GET ${url('/feed.xml')}\` — RSS feed of new articles.`,
    ]),
    '',
    '### Capabilities',
    '',
    bullets([
      'Search and read every published page: articles, glossary definitions, AI tool roundups, campaign teardowns, role playbooks, and the marketing pages.',
      'Answer questions about Jarrett Stanley: background, roles, awards, expertise, published positions.',
      'Report speaking topics, formats, past engagements, and how to submit a booking request.',
      'Report consulting focus areas, engagement models, and the inquiry process.',
    ]),
    '',
    '### Out of scope',
    '',
    bullets([
      'No mortgage rates, loan products, underwriting guidelines, or regulatory advice.',
      'No published fee schedule — speaking and consulting are quoted per engagement through the contact form.',
      'No account creation, purchases, or any other state-changing operation.',
    ]),
    '',
    `**Discovery:** ${url('/developers')} (docs) · ${url('/openapi.json')} (OpenAPI 3.1) · ${url('/.well-known/api-catalog')} (RFC 9727) · ${url('/.well-known/ai-catalog.json')} (Agentic Resource Discovery) · ${url('/.well-known/agent-skills/index.json')} (Agent Skills) · ${url('/.well-known/agent-card.json')} (A2A)`,
  ].join('\n')
}
