'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Core Web Vitals monitoring
    onCLS((metric) => {
      // Send to analytics service
      sendToAnalytics('CLS', metric)
    })

    onFID((metric) => {
      sendToAnalytics('FID', metric)
    })

    onFCP((metric) => {
      sendToAnalytics('FCP', metric)
    })

    onLCP((metric) => {
      sendToAnalytics('LCP', metric)
    })

    onTTFB((metric) => {
      sendToAnalytics('TTFB', metric)
    })

    // Navigation timing
    if (typeof window !== 'undefined' && window.performance) {
      const navigationTiming = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigationTiming) {
        const metrics = {
          dns: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
          connection: navigationTiming.connectEnd - navigationTiming.connectStart,
          request: navigationTiming.responseStart - navigationTiming.requestStart,
          response: navigationTiming.responseEnd - navigationTiming.responseStart,
          dom: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
          load: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
        }

        Object.entries(metrics).forEach(([name, value]) => {
          if (value > 0) {
            sendToAnalytics(`timing_${name}`, { value, name })
          }
        })
      }
    }

    // Resource timing for critical resources
    if (typeof window !== 'undefined' && window.performance) {
      const resourceEntries = window.performance.getEntriesByType('resource')
      
      resourceEntries.forEach((entry) => {
        const resource = entry as PerformanceResourceTiming
        
        // Monitor critical resources
        if (
          resource.name.includes('font') ||
          resource.name.includes('css') ||
          resource.name.includes('js')
        ) {
          sendToAnalytics('resource_timing', {
            name: resource.name,
            duration: resource.duration,
            size: resource.transferSize,
            type: resource.initiatorType,
          })
        }
      })
    }
  }, [])

  return null
}

function sendToAnalytics(metricName: string, data: any) {
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metricName, {
      event_category: 'Web Vitals',
      event_label: metricName,
      value: Math.round(data.value || data),
      custom_map: {
        metric_id: data.id,
        metric_value: data.value,
        metric_delta: data.delta,
      },
    })
  }

  // Send to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metricName,
        data,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }),
    }).catch(() => {
      // Silently fail - don't block the main thread
    })
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance Metric: ${metricName}`, data)
  }
}