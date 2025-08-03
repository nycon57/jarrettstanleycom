'use client';

import { useCallback } from 'react';
import {
  trackEvent,
  trackFormSubmission,
  trackCTAClick,
  trackExternalLink,
  trackContentEngagement,
  trackResourceDownload,
  trackSpeakingInquiry,
  trackConsultingInquiry,
  trackNewsletterSignup,
  trackError,
  trackConversionFunnel,
  trackVideoInteraction,
  trackSearch,
  trackFileDownload,
  getStoredUTMParameters,
  type AnalyticsEvent,
} from '@/lib/analytics';

export function useAnalytics() {
  const trackCustomEvent = useCallback((event: AnalyticsEvent) => {
    trackEvent(event);
  }, []);

  const trackForm = useCallback((
    formName: string, 
    formType: 'contact' | 'newsletter' | 'consulting' | 'resource_download',
    additionalData?: Record<string, any>
  ) => {
    const utmParams = getStoredUTMParameters();
    trackFormSubmission(formName, formType, {
      ...additionalData,
      ...utmParams,
    });
  }, []);

  const trackCTA = useCallback((
    ctaName: string, 
    ctaLocation: string, 
    ctaType: 'speaking' | 'consulting' | 'truetone' | 'newsletter' | 'resource'
  ) => {
    trackCTAClick(ctaName, ctaLocation, ctaType);
  }, []);

  const trackLink = useCallback((
    url: string, 
    linkText: string, 
    linkType: 'social' | 'external' | 'truetone' | 'calendly'
  ) => {
    trackExternalLink(url, linkText, linkType);
  }, []);

  const trackContent = useCallback((
    contentType: 'blog_post' | 'resource' | 'case_study',
    contentTitle: string,
    engagementType: 'view' | 'read_progress' | 'download' | 'share',
    progress?: number
  ) => {
    trackContentEngagement(contentType, contentTitle, engagementType, progress);
  }, []);

  const trackDownload = useCallback((
    resourceName: string,
    resourceType: string,
    resourceCategory?: string
  ) => {
    trackResourceDownload(resourceName, resourceType, resourceCategory);
  }, []);

  const trackSpeaking = useCallback((
    inquiryType: 'calendly_click' | 'form_submit' | 'email_click',
    topic?: string
  ) => {
    trackSpeakingInquiry(inquiryType, topic);
  }, []);

  const trackConsulting = useCallback((
    inquiryType: 'form_submit' | 'email_click',
    serviceType?: string
  ) => {
    trackConsultingInquiry(inquiryType, serviceType);
  }, []);

  const trackNewsletter = useCallback((
    signupLocation: string,
    leadMagnet?: string
  ) => {
    const utmParams = getStoredUTMParameters();
    trackNewsletterSignup(signupLocation, leadMagnet);
    trackForm('newsletter', 'newsletter', {
      signup_location: signupLocation,
      lead_magnet: leadMagnet,
      ...utmParams,
    });
  }, [trackForm]);

  const trackConversionStep = useCallback((
    funnelStep: string,
    funnelName: string,
    stepNumber: number
  ) => {
    trackConversionFunnel(funnelStep, funnelName, stepNumber);
  }, []);

  const trackVideo = useCallback((
    videoTitle: string,
    action: 'play' | 'pause' | 'complete' | 'progress',
    progress?: number
  ) => {
    trackVideoInteraction(videoTitle, action, progress);
  }, []);

  const trackSiteSearch = useCallback((
    searchTerm: string,
    resultCount: number,
    searchLocation: string
  ) => {
    trackSearch(searchTerm, resultCount, searchLocation);
  }, []);

  const trackFile = useCallback((
    fileName: string,
    fileType: string,
    downloadSource: string
  ) => {
    trackFileDownload(fileName, fileType, downloadSource);
  }, []);

  const trackApplicationError = useCallback((
    errorType: string,
    errorMessage: string,
    location: string,
    fatal = false
  ) => {
    trackError(errorType, errorMessage, location, fatal);
  }, []);

  // Convenience methods for common tracking scenarios
  const trackPageLoad = useCallback((pageName: string) => {
    trackCustomEvent({
      action: 'page_load',
      category: 'navigation',
      label: pageName,
      custom_parameters: {
        page_name: pageName,
        ...getStoredUTMParameters(),
      },
    });
  }, [trackCustomEvent]);

  const trackContactFormStart = useCallback(() => {
    trackConversionStep('form_start', 'contact_conversion', 1);
  }, [trackConversionStep]);

  const trackContactFormSubmit = useCallback((formData?: Record<string, any>) => {
    trackConversionStep('form_submit', 'contact_conversion', 2);
    trackForm('contact_form', 'contact', formData);
  }, [trackConversionStep, trackForm]);

  const trackSpeakingFormStart = useCallback(() => {
    trackConversionStep('form_start', 'speaking_conversion', 1);
  }, [trackConversionStep]);

  const trackSpeakingCalendlyClick = useCallback((topic?: string) => {
    trackConversionStep('calendly_click', 'speaking_conversion', 2);
    trackSpeaking('calendly_click', topic);
  }, [trackConversionStep, trackSpeaking]);

  const trackConsultingFormStart = useCallback(() => {
    trackConversionStep('form_start', 'consulting_conversion', 1);
  }, [trackConversionStep]);

  const trackConsultingFormSubmit = useCallback((serviceType?: string, formData?: Record<string, any>) => {
    trackConversionStep('form_submit', 'consulting_conversion', 2);
    trackConsulting('form_submit', serviceType);
    trackForm('consulting_form', 'consulting', formData);
  }, [trackConversionStep, trackConsulting, trackForm]);

  const trackNewsletterStart = useCallback((location: string) => {
    trackConversionStep('signup_start', 'newsletter_conversion', 1);
  }, [trackConversionStep]);

  const trackNewsletterSubmit = useCallback((location: string, leadMagnet?: string) => {
    trackConversionStep('signup_submit', 'newsletter_conversion', 2);
    trackNewsletter(location, leadMagnet);
  }, [trackConversionStep, trackNewsletter]);

  const trackResourceRequestStart = useCallback((resourceName: string) => {
    trackConversionStep('request_start', 'resource_conversion', 1);
  }, [trackConversionStep]);

  const trackResourceRequestSubmit = useCallback((resourceName: string, resourceType: string) => {
    trackConversionStep('request_submit', 'resource_conversion', 2);
    trackDownload(resourceName, resourceType, 'gated_content');
    trackForm('resource_download', 'resource_download', {
      resource_name: resourceName,
      resource_type: resourceType,
    });
  }, [trackConversionStep, trackDownload, trackForm]);

  return {
    // Core tracking functions
    trackCustomEvent,
    trackForm,
    trackCTA,
    trackLink,
    trackContent,
    trackDownload,
    trackSpeaking,
    trackConsulting,
    trackNewsletter,
    trackConversionStep,
    trackVideo,
    trackSiteSearch,
    trackFile,
    trackApplicationError,
    
    // Convenience methods
    trackPageLoad,
    trackContactFormStart,
    trackContactFormSubmit,
    trackSpeakingFormStart,
    trackSpeakingCalendlyClick,
    trackConsultingFormStart,
    trackConsultingFormSubmit,
    trackNewsletterStart,
    trackNewsletterSubmit,
    trackResourceRequestStart,
    trackResourceRequestSubmit,
  };
}