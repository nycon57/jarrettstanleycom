/**
 * Google Tag Manager dataLayer utilities for JarrettStanley.com
 * Provides typed helpers for pushing events to the GTM dataLayer.
 * GTM is used as a lightweight container for ad pixels only — GA4 stays on direct gtag.js.
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

/**
 * Push an event to the GTM dataLayer
 */
function pushToDataLayer(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...data
  });
}

/**
 * Push a form conversion event to GTM dataLayer
 */
export function pushFormConversion(formType: string, formName: string) {
  pushToDataLayer('form_conversion', {
    form_type: formType,
    form_name: formName
  });
}

/**
 * Push a typed conversion event to GTM dataLayer
 * Creates events like `speaking_conversion`, `consulting_conversion`, etc.
 */
export function pushConversion(conversionType: string, data?: Record<string, unknown>) {
  pushToDataLayer(`${conversionType}_conversion`, {
    conversion_type: conversionType,
    ...data
  });
}
