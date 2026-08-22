/**
 * Analytics utility for JarrettStanley.com
 * Provides comprehensive tracking for Google Analytics 4, Microsoft Clarity,
 * Google Ads conversions, and GTM dataLayer integration.
 */

import { hasConsentFor } from '@/components/analytics/cookie-consent';
import { pushFormConversion, pushConversion } from '@/lib/gtm';

// Google Analytics 4 types
declare global {
  interface Window {
    dataLayer: any[];
    clarity: any;
  }
}

// Analytics configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '';
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';

// Event categories for organized tracking
const EVENT_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  LEAD_GENERATION: 'lead_generation',
  CONTENT: 'content',
  NAVIGATION: 'navigation',
  CONVERSION: 'conversion',
  SOCIAL: 'social'
} as const;

// Custom event types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// UTM parameters interface
export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Conversion value mapping for Google Ads
const CONVERSION_VALUES: Record<string, {value: number;currency: string;}> = {
  speaking_inquiry: { value: 500, currency: 'USD' },
  consulting_inquiry: { value: 2000, currency: 'USD' },
  newsletter_signup: { value: 10, currency: 'USD' },
  form_submit: { value: 100, currency: 'USD' },
  resource_download: { value: 25, currency: 'USD' }
};

/**
 * gtag.js, Microsoft Clarity, and Google Ads are loaded by AnalyticsProvider
 * (src/components/analytics/analytics-provider.tsx), behind the cookie-consent
 * gate. Everything below assumes that has already run and no-ops when it has
 * not — never bootstrap a tag from here.
 */

/**
 * Track page views (gated by analytics consent)
 */
export const trackPageView = (url: string, title?: string) => {
  if (!hasConsentFor('analytics')) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: title || document.title,
    page_location: url
  });
};

/**
 * Track custom events (gated by analytics consent)
 */
export const trackEvent = ({ action, category, label, value, custom_parameters }: AnalyticsEvent) => {
  if (!hasConsentFor('analytics')) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters
  });

  // Also send to Clarity for additional context
  if (typeof window.clarity === 'function') {
    window.clarity('event', action, {
      category,
      label,
      value,
      ...custom_parameters
    });
  }
};

/**
 * Track Google Ads conversion (only fires when GOOGLE_ADS_ID is set)
 */
const trackGoogleAdsConversion = (
conversionLabel: string,
value?: number,
currency: string = 'USD') =>
{
  if (!GOOGLE_ADS_ID) return;
  if (!hasConsentFor('marketing')) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    value: value,
    currency: currency
  });
};

/**
 * Form submission tracking
 */
export const trackFormSubmission = (formName: string, formType: 'contact' | 'newsletter' | 'consulting' | 'resource_download', additionalData?: Record<string, any>) => {
  trackEvent({
    action: 'form_submit',
    category: EVENT_CATEGORIES.LEAD_GENERATION,
    label: `${formType}_${formName}`,
    custom_parameters: {
      form_name: formName,
      form_type: formType,
      conversion_type: formType === 'newsletter' ? 'email_signup' : 'lead_generation',
      ...additionalData
    }
  });

  // Push to GTM dataLayer for ad pixel triggers
  if (hasConsentFor('marketing')) {
    pushFormConversion(formType, formName);
  }

  // Fire Google Ads conversion if configured
  const conversionInfo = CONVERSION_VALUES.form_submit;
  if (conversionInfo) {
    trackGoogleAdsConversion('form_submit', conversionInfo.value, conversionInfo.currency);
  }
};

/**
 * CTA click tracking
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string, ctaType: 'speaking' | 'consulting' | 'truetone' | 'newsletter' | 'resource') => {
  trackEvent({
    action: 'cta_click',
    category: EVENT_CATEGORIES.ENGAGEMENT,
    label: ctaName,
    custom_parameters: {
      cta_name: ctaName,
      cta_location: ctaLocation,
      cta_type: ctaType,
      button_text: ctaName
    }
  });
};

/**
 * External link click tracking
 */
export const trackExternalLink = (url: string, linkText: string, linkType: 'social' | 'external' | 'truetone' | 'calendly') => {
  trackEvent({
    action: 'external_link_click',
    category: linkType === 'social' ? EVENT_CATEGORIES.SOCIAL : EVENT_CATEGORIES.NAVIGATION,
    label: url,
    custom_parameters: {
      link_url: url,
      link_text: linkText,
      link_type: linkType,
      outbound: true
    }
  });
};

/**
 * Content engagement tracking
 */
export const trackContentEngagement = (contentType: 'blog_post' | 'resource' | 'case_study', contentTitle: string, engagementType: 'view' | 'read_progress' | 'download' | 'share', progress?: number) => {
  trackEvent({
    action: `content_${engagementType}`,
    category: EVENT_CATEGORIES.CONTENT,
    label: contentTitle,
    value: progress,
    custom_parameters: {
      content_type: contentType,
      content_title: contentTitle,
      engagement_type: engagementType,
      read_progress: progress
    }
  });
};

/**
 * Reading progress tracking for blog posts
 */
export const trackReadingProgress = (postTitle: string, progress: number) => {
  // Track at 25%, 50%, 75%, and 100% milestones
  const milestones = [25, 50, 75, 100];
  const milestone = milestones.find((m) => progress >= m && progress < m + 5);

  if (milestone) {
    trackContentEngagement('blog_post', postTitle, 'read_progress', milestone);
  }
};

/**
 * Resource download tracking
 */
export const trackResourceDownload = (resourceName: string, resourceType: string, resourceCategory?: string) => {
  trackEvent({
    action: 'resource_download',
    category: EVENT_CATEGORIES.CONVERSION,
    label: resourceName,
    custom_parameters: {
      resource_name: resourceName,
      resource_type: resourceType,
      resource_category: resourceCategory,
      conversion_type: 'resource_download'
    }
  });

  // Push to GTM dataLayer
  if (hasConsentFor('marketing')) {
    pushConversion('resource_download', {
      resource_name: resourceName,
      resource_type: resourceType
    });
  }

  // Fire Google Ads conversion
  const conversionInfo = CONVERSION_VALUES.resource_download;
  if (conversionInfo) {
    trackGoogleAdsConversion('resource_download', conversionInfo.value, conversionInfo.currency);
  }
};

/**
 * Speaking inquiry tracking
 */
export const trackSpeakingInquiry = (inquiryType: 'calendly_click' | 'form_submit' | 'email_click', topic?: string) => {
  trackEvent({
    action: 'speaking_inquiry',
    category: EVENT_CATEGORIES.LEAD_GENERATION,
    label: inquiryType,
    custom_parameters: {
      inquiry_type: inquiryType,
      speaking_topic: topic,
      conversion_type: 'speaking_inquiry',
      high_value_conversion: true
    }
  });

  // Push to GTM dataLayer
  if (hasConsentFor('marketing')) {
    pushConversion('speaking', {
      inquiry_type: inquiryType,
      speaking_topic: topic
    });
  }

  // Fire Google Ads conversion
  const conversionInfo = CONVERSION_VALUES.speaking_inquiry;
  if (conversionInfo) {
    trackGoogleAdsConversion('speaking_inquiry', conversionInfo.value, conversionInfo.currency);
  }
};

/**
 * Consulting inquiry tracking
 */
export const trackConsultingInquiry = (inquiryType: 'form_submit' | 'email_click', serviceType?: string) => {
  trackEvent({
    action: 'consulting_inquiry',
    category: EVENT_CATEGORIES.LEAD_GENERATION,
    label: inquiryType,
    custom_parameters: {
      inquiry_type: inquiryType,
      service_type: serviceType,
      conversion_type: 'consulting_inquiry',
      high_value_conversion: true
    }
  });

  // Push to GTM dataLayer
  if (hasConsentFor('marketing')) {
    pushConversion('consulting', {
      inquiry_type: inquiryType,
      service_type: serviceType
    });
  }

  // Fire Google Ads conversion
  const conversionInfo = CONVERSION_VALUES.consulting_inquiry;
  if (conversionInfo) {
    trackGoogleAdsConversion('consulting_inquiry', conversionInfo.value, conversionInfo.currency);
  }
};

/**
 * Get UTM parameters from URL
 */
const getUTMParameters = (): UTMParameters => {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined
  };
};

/**
 * Store UTM parameters in sessionStorage for attribution
 */
const UTM_STORAGE_KEY = 'utm_parameters:v1';

export const storeUTMParameters = () => {
  if (typeof window === 'undefined') return;

  const utmParams = getUTMParameters();
  const hasUTMParams = Object.values(utmParams).some((value) => value !== undefined);

  if (hasUTMParams) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));

    // Track campaign attribution
    trackEvent({
      action: 'campaign_attribution',
      category: EVENT_CATEGORIES.ENGAGEMENT,
      label: utmParams.utm_campaign || 'unknown',
      custom_parameters: utmParams
    });
  }
};

/**
 * Get stored UTM parameters for attribution
 */
export const getStoredUTMParameters = (): UTMParameters => {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

/**
 * Track user journey and conversion funnels
 */
export const trackConversionFunnel = (funnelStep: string, funnelName: string, stepNumber: number) => {
  trackEvent({
    action: 'funnel_step',
    category: EVENT_CATEGORIES.CONVERSION,
    label: `${funnelName}_${funnelStep}`,
    value: stepNumber,
    custom_parameters: {
      funnel_name: funnelName,
      funnel_step: funnelStep,
      step_number: stepNumber
    }
  });
};

/**
 * Track video interactions
 */
export const trackVideoInteraction = (videoTitle: string, action: 'play' | 'pause' | 'complete' | 'progress', progress?: number) => {
  trackEvent({
    action: `video_${action}`,
    category: EVENT_CATEGORIES.CONTENT,
    label: videoTitle,
    value: progress,
    custom_parameters: {
      video_title: videoTitle,
      video_action: action,
      video_progress: progress
    }
  });
};

/**
 * Track search interactions
 */
export const trackSearch = (searchTerm: string, resultCount: number, searchLocation: string) => {
  trackEvent({
    action: 'site_search',
    category: EVENT_CATEGORIES.ENGAGEMENT,
    label: searchTerm,
    value: resultCount,
    custom_parameters: {
      search_term: searchTerm,
      result_count: resultCount,
      search_location: searchLocation
    }
  });
};

/**
 * Track file downloads
 */
export const trackFileDownload = (fileName: string, fileType: string, downloadSource: string) => {
  trackEvent({
    action: 'file_download',
    category: EVENT_CATEGORIES.CONVERSION,
    label: fileName,
    custom_parameters: {
      file_name: fileName,
      file_type: fileType,
      download_source: downloadSource
    }
  });
};

/**
 * Track newsletter signup with additional context
 */
export const trackNewsletterSignup = (signupLocation: string, leadMagnet?: string) => {
  trackEvent({
    action: 'newsletter_signup',
    category: EVENT_CATEGORIES.LEAD_GENERATION,
    label: signupLocation,
    custom_parameters: {
      signup_location: signupLocation,
      lead_magnet: leadMagnet,
      conversion_type: 'newsletter_signup'
    }
  });

  // Push to GTM dataLayer
  if (hasConsentFor('marketing')) {
    pushConversion('newsletter', {
      signup_location: signupLocation,
      lead_magnet: leadMagnet
    });
  }

  // Fire Google Ads conversion
  const conversionInfo = CONVERSION_VALUES.newsletter_signup;
  if (conversionInfo) {
    trackGoogleAdsConversion('newsletter_signup', conversionInfo.value, conversionInfo.currency);
  }
};

/**
 * Enhanced error tracking
 */
export const trackError = (errorType: string, errorMessage: string, location: string, fatal = false) => {
  trackEvent({
    action: 'error',
    category: 'errors',
    label: errorType,
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      error_location: location,
      fatal: fatal
    }
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number, page: string) => {
  // Only track at 25%, 50%, 75%, 100% milestones
  const milestones = [25, 50, 75, 100];
  if (milestones.includes(depth)) {
    trackEvent({
      action: 'scroll_depth',
      category: EVENT_CATEGORIES.ENGAGEMENT,
      label: page,
      value: depth,
      custom_parameters: {
        scroll_depth: depth,
        page_url: page
      }
    });
  }
};

// Helper function to debounce events
export const debounce = <TArgs extends unknown[]>(
func: (...args: TArgs) => void,
wait: number) =>
{
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: TArgs) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
