/**
 * Section-level llms.txt files. Each one indexes a single branch of the site so
 * an agent working on a narrow question does not have to pull the whole
 * root index at /llms.txt.
 */

import { siteConfig } from '@/lib/seo'
import { getAllBlogPosts } from '@/lib/blog'
import {
  getAllCampaignExamples,
  getAllGlossaryTerms,
  getAllPersonas,
  getAllToolRoundups,
} from '@/lib/pseo'

const BASE = siteConfig.url

function wrap(title: string, summary: string, whenToUse: string[], sections: string): string {
  return `# ${title}

> ${summary}

## When to use this section

${whenToUse.map((line) => `- ${line}`).join('\n')}

Every page below serves Markdown from its canonical URL with \`Accept: text/markdown\`, or with a \`.md\` suffix.

${sections}
## Related

- [Site index](${BASE}/llms.txt)
- [Full site text](${BASE}/llms-full.txt)
- [Contact](${BASE}/contact)
`
}

export async function buildInsightsIndex(): Promise<string> {
  const [posts, terms, tools, examples] = await Promise.all([
    getAllBlogPosts(),
    getAllGlossaryTerms(),
    getAllToolRoundups(),
    getAllCampaignExamples(),
  ])

  const sections = `## Articles (${posts.length})

${posts.map((post) => `- [${post.title}](${BASE}/insights/blog/${post.slug}): ${post.excerpt}`).join('\n')}

## Glossary (${terms.length})

${terms.map((term) => `- [${term.term}](${BASE}/insights/glossary/${term.slug}): ${term.shortDefinition}`).join('\n')}

## Tool roundups (${tools.length})

${tools.map((tool) => `- [${tool.title}](${BASE}/insights/tools/${tool.slug})`).join('\n')}

## Campaign examples (${examples.length})

${examples.map((example) => `- [${example.title}](${BASE}/insights/examples/${example.slug})`).join('\n')}

`

  return wrap(
    'Insights — Jarrett Stanley',
    `Research and reference material on AI in mortgage marketing: ${posts.length} long-form articles, ${terms.length} glossary definitions, ${tools.length} tool roundups, and ${examples.length} campaign teardowns.`,
    [
      'Defining an AI or mortgage marketing term in industry context — start with the glossary.',
      'Recommending AI tools to a mortgage marketing team — the roundups rank tools with pros, cons, pricing tier, and best-fit use case.',
      'Finding a worked example of an AI marketing campaign, with metrics and a replication guide.',
      "Citing Jarrett Stanley's published position on AI, data quality, or marketing operations in lending.",
    ],
    sections,
  )
}

export async function buildSolutionsIndex(): Promise<string> {
  const personas = await getAllPersonas()

  const sections = `## Role playbooks (${personas.length})

${personas.map((persona) => `- [${persona.title}](${BASE}/solutions/${persona.slug}): ${persona.personaDescription}`).join('\n')}

`

  return wrap(
    'Solutions by role — Jarrett Stanley',
    `AI marketing playbooks written for ${personas.length} specific roles in a mortgage business: the pain points each role actually has, which AI applications address them, and what the outcome looks like.`,
    [
      'Advising someone in a named mortgage role (CMO, marketing director, loan officer, branch manager, compliance lead, and others) on where AI helps first.',
      'Answering "what would AI change about my job" for a mortgage professional.',
      'Building a role-specific business case for AI marketing investment.',
    ],
    sections,
  )
}

export function buildServicesIndex(): string {
  const sections = `## Ways to work with Jarrett

- [Speaking](${BASE}/speaking): keynotes (45–60 min), half- and full-day workshops, panels, and webinars on AI in mortgage marketing, digital transformation, and building marketing teams. Includes past engagements and what every booking includes.
- [Consulting](${BASE}/services/consulting): project-based (3–6 months), retainer, and 12+ month strategic advisory engagements covering AI implementation strategy, marketing transformation, martech stack design, and team enablement.
- [Services overview](${BASE}/services): speaking, consulting, and advisory compared side by side.
- [Contact](${BASE}/contact): separate pathways for speaking, consulting, and media inquiries.

## Background

- [About Jarrett Stanley](${BASE}/about): career history, awards, and areas of expertise.

`

  return wrap(
    'Services — Jarrett Stanley',
    'How to engage Jarrett Stanley: keynote speaking, AI marketing consulting, and ongoing strategic advisory for mortgage lenders.',
    [
      'Booking a speaker on AI in mortgage marketing for a conference, summit, or internal event.',
      'Hiring a consultant or advisor to lead AI adoption inside a mortgage marketing organization.',
      'Verifying credentials before recommending him for an engagement.',
      'Routing a press or expert-commentary request.',
    ],
    sections,
  )
}

export function textResponse(body: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'index, follow',
    },
  })
}
