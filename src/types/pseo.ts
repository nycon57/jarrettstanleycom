// ============================================================
// Programmatic SEO - TypeScript Data Schemas
// ============================================================

// --- Shared Types ---

export interface FAQ {
  question: string
  answer: string
}

export interface RelatedLink {
  title: string
  slug: string
  type: 'glossary' | 'persona' | 'tool' | 'example' | 'blog' | 'service'
}

export interface MetaSEO {
  title: string
  description: string
  keywords: string[]
}

// --- Glossary Term ---

export type GlossaryCategory =
  | 'ai-fundamentals'
  | 'mortgage-marketing'
  | 'marketing-automation'
  | 'data-analytics'
  | 'customer-experience'
  | 'compliance-regulation'

export interface GlossaryExample {
  title: string
  description: string
}

export interface GlossaryTerm {
  slug: string
  term: string
  shortDefinition: string
  detailedExplanation: string
  industryContext: string
  examples: GlossaryExample[]
  relatedTerms: string[]
  relatedContent: RelatedLink[]
  faqs: FAQ[]
  category: GlossaryCategory
  seo: MetaSEO
  lastUpdated: string
}

// --- Persona ---

export interface PainPoint {
  title: string
  description: string
}

export interface AISolution {
  title: string
  description: string
  impactMetric: string
}

export interface UseCase {
  title: string
  description: string
  outcome: string
}

export interface Benefit {
  title: string
  description: string
  metric?: string
}

export interface Persona {
  slug: string
  title: string
  personaName: string
  personaDescription: string
  painPoints: PainPoint[]
  aiSolutions: AISolution[]
  useCases: UseCase[]
  benefits: Benefit[]
  ctaHeading: string
  ctaDescription: string
  relatedContent: RelatedLink[]
  faqs: FAQ[]
  seo: MetaSEO
  lastUpdated: string
}

// --- Tool Roundup (Curation) ---

export type ToolCategory =
  | 'email-marketing'
  | 'lead-generation'
  | 'content-creation'
  | 'analytics'
  | 'crm'
  | 'social-media'
  | 'automation'
  | 'compliance'

export type PricingTier = 'free' | 'freemium' | 'paid' | 'enterprise' | 'custom'

export interface Tool {
  rank: number
  name: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string
  pricingTier: PricingTier
  websiteUrl: string
}

export interface ToolRecommendation {
  useCase: string
  toolName: string
  reason: string
}

export interface ToolRoundup {
  slug: string
  title: string
  introduction: string
  comparisonCriteria: string[]
  tools: Tool[]
  recommendations: ToolRecommendation[]
  category: ToolCategory
  relatedContent: RelatedLink[]
  faqs: FAQ[]
  seo: MetaSEO
  lastUpdated: string
}

// --- Campaign Example ---

export type ExampleType =
  | 'email-campaigns'
  | 'social-media'
  | 'content-marketing'
  | 'lead-nurturing'
  | 'retargeting'
  | 'personalization'
  | 'video-marketing'
  | 'seo-content'

export interface ExampleMetrics {
  [key: string]: string
}

export interface CampaignExampleEntry {
  title: string
  isReal: boolean
  company?: string
  description: string
  whyItWorks: string
  keyTakeaways: string[]
  metrics?: ExampleMetrics
}

export interface ReplicationStep {
  step: number
  title: string
  description: string
}

export interface CampaignExample {
  slug: string
  title: string
  introduction: string
  examples: CampaignExampleEntry[]
  analysis: string
  howToReplicate: ReplicationStep[]
  exampleType: ExampleType
  relatedContent: RelatedLink[]
  faqs: FAQ[]
  seo: MetaSEO
  lastUpdated: string
}

// --- Display Labels ---

export const glossaryCategoryLabels: Record<GlossaryCategory, string> = {
  'ai-fundamentals': 'AI Fundamentals',
  'mortgage-marketing': 'Mortgage Marketing',
  'marketing-automation': 'Marketing Automation',
  'data-analytics': 'Data & Analytics',
  'customer-experience': 'Customer Experience',
  'compliance-regulation': 'Compliance & Regulation',
}

export const toolCategoryLabels: Record<ToolCategory, string> = {
  'email-marketing': 'Email Marketing',
  'lead-generation': 'Lead Generation',
  'content-creation': 'Content Creation',
  'analytics': 'Analytics',
  'crm': 'CRM',
  'social-media': 'Social Media',
  'automation': 'Automation',
  'compliance': 'Compliance',
}

export const exampleTypeLabels: Record<ExampleType, string> = {
  'email-campaigns': 'Email Campaigns',
  'social-media': 'Social Media',
  'content-marketing': 'Content Marketing',
  'lead-nurturing': 'Lead Nurturing',
  'retargeting': 'Retargeting',
  'personalization': 'Personalization',
  'video-marketing': 'Video Marketing',
  'seo-content': 'SEO Content',
}

export const pricingTierLabels: Record<PricingTier, string> = {
  'free': 'Free',
  'freemium': 'Freemium',
  'paid': 'Paid',
  'enterprise': 'Enterprise',
  'custom': 'Custom Pricing',
}
