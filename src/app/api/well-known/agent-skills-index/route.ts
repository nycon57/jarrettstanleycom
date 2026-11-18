import { SKILL_DESCRIPTION, SKILL_NAME, skillDigest } from '@/lib/agent/skill'

/** Agent Skills discovery index, served at /.well-known/agent-skills/index.json. */

export const dynamic = 'force-dynamic'

const index = {
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  skills: [
    {
      name: SKILL_NAME,
      type: 'skill-md',
      description: SKILL_DESCRIPTION,
      url: `/.well-known/agent-skills/${SKILL_NAME}/SKILL.md`,
      digest: skillDigest(),
    },
  ],
}

export function GET(): Response {
  return new Response(JSON.stringify(index, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
