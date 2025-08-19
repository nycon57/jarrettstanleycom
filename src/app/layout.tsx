import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import HeaderV2 from '@/components/layout/header-v2'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { ConditionalLayout } from '@/components/layout/conditional-layout'
import { AnalyticsProvider } from '@/components/analytics/analytics-provider'
import { ScrollTracker } from '@/components/analytics/scroll-tracker'
import { CookieConsent } from '@/components/analytics/cookie-consent'
import { PerformanceMonitor } from '@/components/analytics/performance-monitor'
import { cn } from '@/lib/utils'
import { generateMetadata as generateSEOMetadata, generatePersonSchema, generateOrganizationSchema, generateWebsiteSchema, generateStructuredData } from '@/lib/seo'
import './globals.css'

const signal = localFont({
  src: [
    {
      path: '../../public/fonts/Signal-Normal.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Signal-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-signal',
})

const hind = localFont({
  src: [
    {
      path: '../../public/fonts/Hind-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hind-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hind-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hind-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Hind-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hind',
})

export const metadata: Metadata = generateSEOMetadata({
  title: 'Where Mortgage Marketing Meets Artificial Intelligence',
  description: 'Strategic advisor and AI marketing pioneer who has generated $500M+ in loan originations. Thought leader in AI-powered mortgage marketing, available for speaking engagements and consulting.',
  keywords: ['AI mortgage marketing', 'mortgage marketing consultant', 'AI mortgage technology', 'mortgage marketing speaker', 'mortgage marketing strategist', 'Jarrett Stanley', 'mortgage digital transformation'],
  canonical: '/',
  ogImage: '/assets/images/og-image.jpg'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/images/TrueToneAI-Icon-Logo-Full-Color.png" />
        <meta name="theme-color" content="#8B5FBF" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredData(structuredData)}
        />
      </head>
      <body 
        className={cn(
          "min-h-screen bg-background font-hind antialiased",
          hind.variable,
          signal.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <ScrollTracker>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
              <CookieConsent />
              <PerformanceMonitor />
            </ScrollTracker>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
