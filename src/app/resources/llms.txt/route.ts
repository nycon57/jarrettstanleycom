import { buildInsightsIndex, textResponse } from '@/lib/agent/section-index'

/** /resources is the reader-facing alias for the insights library. */

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  return textResponse(await buildInsightsIndex())
}
