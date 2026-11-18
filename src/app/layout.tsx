import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Providers } from '@/components/providers'
import { MotionProvider } from '@/components/providers/motion-provider'
import { cn } from '@/lib/utils'
import { generateMetadata as generateSEOMetadata, generatePersonSchema, generateOrganizationSchema, generateWebsiteSchema, generateStructuredData } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/next'
import { WebMcpTools } from '@/components/agent/web-mcp'
import './globals.css'

// Same faces as truetone.ai: Montserrat (display) and Inter (body), both variable.
// The font-signal / font-hind Tailwind names still used by older templates resolve to these.
const display = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = generateSEOMetadata({
  title: 'Where Mortgage Marketing Meets Artificial Intelligence',
  description: 'Strategic advisor and AI marketing pioneer who has generated $500M+ in loan originations. Thought leader in AI-powered mortgage marketing, available for speaking engagements and consulting.',
  keywords: ['AI mortgage marketing', 'mortgage marketing consultant', 'AI mortgage technology', 'mortgage marketing speaker', 'mortgage marketing strategist', 'Jarrett Stanley', 'mortgage digital transformation'],
  canonical: '/',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0b0c18',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = [
    generatePersonSchema(),
    generateOrganizationSchema(),
    generateWebsiteSchema()
  ]

  return (
    <html lang="en" className={cn("dark", display.variable, body.variable)} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/images/TrueToneAI-Icon-Logo-Full-Color.png" />
                <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
        >
          {generateStructuredData(structuredData)}
        </script>
      </head>
      <body 
        className={cn(
          "min-h-screen bg-background font-body antialiased"
        )}
        suppressHydrationWarning
      >
        <Providers>
          <MotionProvider>{children}</MotionProvider>
        </Providers>
        <WebMcpTools />
        <Analytics />
      </body>
    </html>
  )
}
