import { buildServicesIndex, textResponse } from '@/lib/agent/section-index'

export const dynamic = 'force-dynamic'

export function GET(): Response {
  return textResponse(buildServicesIndex())
}
