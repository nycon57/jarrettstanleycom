import { SKILL_MARKDOWN } from '@/lib/agent/skill'

/** The published Agent Skill body (SKILL.md). */

export const dynamic = 'force-dynamic'

export function GET(): Response {
  return new Response(SKILL_MARKDOWN, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
