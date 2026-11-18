/** Cookie consent storage, read by the analytics providers and written by <CookieConsent />. */
export const CONSENT_STORAGE_KEY = 'jarrett-stanley-cookie-consent';

// Utility function to check if user has given consent
export function hasConsentFor(type: 'necessary' | 'analytics' | 'marketing'): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consent) return false;

    const consentData = JSON.parse(consent);
    return consentData[type] === true;
  } catch {
    return false;
  }
}

// Get all consent preferences
export function getConsentPreferences() {
  if (typeof window === 'undefined') {
    return { necessary: false, analytics: false, marketing: false };
  }

  try {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consent) {
      return { necessary: false, analytics: false, marketing: false };
    }

    const consentData = JSON.parse(consent);
    return {
      necessary: consentData.necessary || false,
      analytics: consentData.analytics || false,
      marketing: consentData.marketing || false
    };
  } catch {
    return { necessary: false, analytics: false, marketing: false };
  }
}
