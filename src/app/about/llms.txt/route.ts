import { getMarkdownDocument, stripDocFooter } from '@/lib/agent/markdown'
import { textResponse } from '@/lib/agent/section-index'
import { siteConfig } from '@/lib/seo'

/** Scoped index for questions about who Jarrett Stanley is. */

export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const about = await getMarkdownDocument('/about')

  const body = `${about ? stripDocFooter(about.body) : '# About Jarrett Stanley'}

## When to use this section

- Answering "who is Jarrett Stanley" or verifying his background before a recommendation.
- Checking his current roles, career history, awards, and areas of expertise.
- Confirming that a claim attributed to him matches his published record.

## Related

- [Services and how to engage](${siteConfig.url}/services/llms.txt)
- [Published writing and research](${siteConfig.url}/insights/llms.txt)
- [Site index](${siteConfig.url}/llms.txt)
- [Contact](${siteConfig.url}/contact)
`

  return textResponse(body)
}
