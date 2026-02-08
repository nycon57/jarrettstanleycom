import type {
  GlossaryTerm,
  Persona,
  ToolRoundup,
  CampaignExample,
  RelatedLink,
} from '@/types/pseo'
import { siteConfig } from '@/lib/seo'

// --- Data imports (barrel exports from data directories) ---

// These will be populated as content is created.
// Each barrel export provides a typed array of all entries.

let glossaryTermsCache: GlossaryTerm[] | null = null
let personasCache: Persona[] | null = null
let toolRoundupsCache: ToolRoundup[] | null = null
let campaignExamplesCache: CampaignExample[] | null = null

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  if (glossaryTermsCache) return glossaryTermsCache
  try {
    const mod = await import('@/data/pseo/glossary')
    glossaryTermsCache = mod.glossaryTerms
    return glossaryTermsCache
  } catch {
    return []
  }
}

export async function getAllPersonas(): Promise<Persona[]> {
  if (personasCache) return personasCache
  try {
    const mod = await import('@/data/pseo/personas')
    personasCache = mod.personas
    return personasCache
  } catch {
    return []
  }
}

export async function getAllToolRoundups(): Promise<ToolRoundup[]> {
  if (toolRoundupsCache) return toolRoundupsCache
  try {
    const mod = await import('@/data/pseo/tools')
    toolRoundupsCache = mod.toolRoundups
    return toolRoundupsCache
  } catch {
    return []
  }
}

export async function getAllCampaignExamples(): Promise<CampaignExample[]> {
  if (campaignExamplesCache) return campaignExamplesCache
  try {
    const mod = await import('@/data/pseo/examples')
    campaignExamplesCache = mod.campaignExamples
    return campaignExamplesCache
  } catch {
    return []
  }
}

// --- Single-item lookups ---

export async function getGlossaryTerm(slug: string): Promise<GlossaryTerm | undefined> {
  const terms = await getAllGlossaryTerms()
  return terms.find((t) => t.slug === slug)
}

export async function getPersona(slug: string): Promise<Persona | undefined> {
  const personas = await getAllPersonas()
  return personas.find((p) => p.slug === slug)
}

export async function getToolRoundup(slug: string): Promise<ToolRoundup | undefined> {
  const roundups = await getAllToolRoundups()
  return roundups.find((r) => r.slug === slug)
}

export async function getCampaignExample(slug: string): Promise<CampaignExample | undefined> {
  const examples = await getAllCampaignExamples()
  return examples.find((e) => e.slug === slug)
}

// --- Cross-linking utilities ---

const ROUTE_MAP: Record<RelatedLink['type'], string> = {
  glossary: '/insights/glossary',
  persona: '/solutions',
  tool: '/insights/tools',
  example: '/insights/examples',
  blog: '/insights/blog',
  service: '/services',
}

export function resolveRelatedLinkUrl(link: RelatedLink): string {
  const base = ROUTE_MAP[link.type]
  return `${base}/${link.slug}`
}

export function resolveRelatedLinkFullUrl(link: RelatedLink): string {
  return `${siteConfig.url}${resolveRelatedLinkUrl(link)}`
}

// --- Glossary helpers ---

export async function getRelatedGlossaryTerms(slugs: string[]): Promise<GlossaryTerm[]> {
  const allTerms = await getAllGlossaryTerms()
  return slugs
    .map((slug) => allTerms.find((t) => t.slug === slug))
    .filter((t): t is GlossaryTerm => t !== undefined)
}

export async function getGlossaryTermsByCategory(category: string): Promise<GlossaryTerm[]> {
  const allTerms = await getAllGlossaryTerms()
  return allTerms.filter((t) => t.category === category)
}

export function getGlossaryAlphabetMap(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const map: Record<string, GlossaryTerm[]> = {}
  for (const term of terms) {
    const letter = term.term.charAt(0).toUpperCase()
    if (!map[letter]) map[letter] = []
    map[letter].push(term)
  }
  // Sort terms within each letter
  for (const letter of Object.keys(map)) {
    map[letter].sort((a, b) => a.term.localeCompare(b.term))
  }
  return map
}

// --- Breadcrumb helpers ---

export interface BreadcrumbItem {
  name: string
  href: string
}

export function buildGlossaryBreadcrumbs(term?: GlossaryTerm): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights' },
    { name: 'Glossary', href: '/insights/glossary' },
  ]
  if (term) {
    crumbs.push({ name: term.term, href: `/insights/glossary/${term.slug}` })
  }
  return crumbs
}

export function buildPersonaBreadcrumbs(persona?: Persona): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions' },
  ]
  if (persona) {
    crumbs.push({ name: persona.personaName, href: `/solutions/${persona.slug}` })
  }
  return crumbs
}

export function buildToolBreadcrumbs(roundup?: ToolRoundup): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights' },
    { name: 'Tools', href: '/insights/tools' },
  ]
  if (roundup) {
    crumbs.push({ name: roundup.title, href: `/insights/tools/${roundup.slug}` })
  }
  return crumbs
}

export function buildExampleBreadcrumbs(example?: CampaignExample): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights' },
    { name: 'Examples', href: '/insights/examples' },
  ]
  if (example) {
    crumbs.push({ name: example.title, href: `/insights/examples/${example.slug}` })
  }
  return crumbs
}
