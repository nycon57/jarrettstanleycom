'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import {
  trackPageView,
  storeUTMParameters,
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  GOOGLE_ADS_ID,
} from '@/lib/analytics';
import { hasConsentFor } from '@/components/analytics/cookie-consent';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

function AnalyticsProviderContent({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageUrl = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Check consent on mount
  useEffect(() => {
    setAnalyticsConsent(hasConsentFor('analytics'));
    setMarketingConsent(hasConsentFor('marketing'));
  }, []);

  // Track page views on route changes
  useEffect(() => {
    trackPageView(pageUrl);
  }, [pageUrl]);

  // Store UTM parameters on initial load
  useEffect(() => {
    storeUTMParameters();
  }, []);

  return (
    <>
      {/* Google Analytics 4 — requires analytics consent */}
      {analyticsConsent && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  custom_map: {
                    'custom_parameter_1': 'site_name',
                    'custom_parameter_2': 'content_group'
                  },
                  custom_parameters: {
                    site_name: 'JarrettStanley.com',
                    content_group: 'Main Site'
                  }
                });
              `}
          </Script>
        </>
      )}

      {/* Google Ads — requires marketing consent and gtag to be loaded */}
      {marketingConsent && GOOGLE_ADS_ID && analyticsConsent && (
        <Script
          id="google-ads-config"
          strategy="afterInteractive"
        >
          {`
              window.gtag && gtag('config', '${GOOGLE_ADS_ID}');
            `}
        </Script>
      )}

      {/* Microsoft Clarity — requires analytics consent */}
      {analyticsConsent && CLARITY_PROJECT_ID && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
          {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}
        </Script>
      )}

      {children}
    </>
  );
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <AnalyticsProviderContent>{children}</AnalyticsProviderContent>
    </Suspense>
  );
}
