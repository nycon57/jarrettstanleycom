import { ThemeProvider } from '@/components/theme-provider'
import { AnalyticsProvider } from '@/components/analytics/analytics-provider'
import { GTMProvider } from '@/components/analytics/gtm-provider'
import { ScrollTracker } from '@/components/analytics/scroll-tracker'
import { CookieConsent } from '@/components/analytics/cookie-consent'
import { PerformanceMonitor } from '@/components/analytics/performance-monitor'
import { ConditionalLayout } from '@/components/layout/conditional-layout'
import { Agentation } from 'agentation'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AnalyticsProvider>
        <GTMProvider />
        <ScrollTracker>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <CookieConsent />
          <PerformanceMonitor />
        </ScrollTracker>
      </AnalyticsProvider>
      {process.env.NODE_ENV === 'development' && <Agentation endpoint="http://localhost:4747" />}
    </ThemeProvider>
  )
}
