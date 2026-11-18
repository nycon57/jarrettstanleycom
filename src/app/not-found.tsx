import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to the homepage or explore other sections of Jarrett Stanley\'s website.',
  noindex: true,
  canonical: '/404'
})

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-md w-full mx-auto text-center px-6">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl font-semibold dark:from-purple-400 dark:to-pink-400 font-signal text-lilac">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 font-signal">
            Page Not Found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-6">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="gap-y-4 mb-8">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              Return Home
            </Link>
          </Button>

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/speaking">
                Speaking
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/services/consulting">
                Consulting
              </Link>
            </Button>
          </div>
        </div>

        {/* Popular Links */}
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          <p className="mb-3">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/about"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              About
            </Link>
            <span>•</span>
            <Link
              href="/services"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Services
            </Link>
            <span>•</span>
            <Link
              href="/insights/blog"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Blog
            </Link>
            <span>•</span>
            <Link
              href="/contact"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Markdown recovery block: lets an agent that lands on a dead URL
            find the sitemap, the agent index, and the main sections without
            parsing this page's markup. */}
        <pre className="sr-only">{`# 404 — Page not found

No page exists at this URL on jarrettstanley.com.

## Where to go instead

- [Home](https://jarrettstanley.com/) — who Jarrett Stanley is and how to work with him
- [About](https://jarrettstanley.com/about) — background, career history, expertise
- [Speaking](https://jarrettstanley.com/speaking) — keynote topics, formats, booking
- [Consulting](https://jarrettstanley.com/services/consulting) — engagement models and process
- [Insights](https://jarrettstanley.com/insights) — blog, glossary, tool roundups, campaign examples
- [Contact](https://jarrettstanley.com/contact) — speaking, consulting, and media inquiries

## Machine-readable indexes

- Agent guide: https://jarrettstanley.com/llms.txt
- Full text index: https://jarrettstanley.com/llms-full.txt
- Sitemap: https://jarrettstanley.com/sitemap.xml

Every page also serves Markdown from its canonical URL with \`Accept: text/markdown\`, or with a \`.md\` suffix.`}</pre>

        {/* Decorative Element */}
        <div className="mt-12">
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  )
}