import { siteConfig } from '@/lib/seo'
import { getAllBlogPosts } from '@/lib/blog'

/** RSS 2.0 feed for The Signal — the blog archive at /insights/blog. */

export const dynamic = 'force-dynamic'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(): Promise<Response> {
  const posts = await getAllBlogPosts()
  const updated = posts[0]?.publishedAt ?? new Date().toISOString()

  const items = posts
    .map((post) => {
      const link = `${siteConfig.url}/insights/blog/${post.slug}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${escapeXml(siteConfig.author.email)} (${escapeXml(post.author.name)})</author>
${post.categories.map((category) => `      <category>${escapeXml(category)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Signal — Jarrett Stanley</title>
    <link>${siteConfig.url}/insights/blog</link>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Weekly writing on artificial intelligence, data, and marketing operations in mortgage lending, by Jarrett Stanley.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
