import { buildSolutionsIndex, textResponse } from '@/lib/agent/section-index'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  return textResponse(await buildSolutionsIndex())
}
