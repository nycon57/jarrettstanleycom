'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const CONSENT_STORAGE_KEY = 'jarrett-stanley-cookie-consent';
const CONSENT_VERSION = '1.0';

interface CookieConsentProps {
  className?: string;
}

export function CookieConsent({ className }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already given consent
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (consent) {
          const consentData = JSON.parse(consent);
          // Show banner if no consent or version mismatch
          if (!consentData.version || consentData.version !== CONSENT_VERSION) {
            setShowBanner(true);
          }
        } else {
          setShowBanner(true);
        }
      } catch {
        setShowBanner(true);
      }
      setIsLoading(false);
    };

    // Delay to avoid flash on initial load
    const timer = setTimeout(checkConsent, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    setShowBanner(false);

    // Reload page to initialize tracking scripts
    window.location.reload();
  };

  const handleAcceptNecessary = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    setShowBanner(false);
  };

  const handleDismiss = () => {
    // Set a temporary consent for this session only
    sessionStorage.setItem(`${CONSENT_STORAGE_KEY}-dismissed`, 'true');
    setShowBanner(false);
  };

  if (isLoading || !showBanner) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${className}`}>
      <Card className="max-w-4xl mx-auto border-2 shadow-lg bg-background/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Cookie Preferences</h3>
                <Badge variant="secondary" className="text-xs">
                  Privacy First
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  We use cookies to enhance your experience on JarrettStanley.com. This includes:
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      🔧 Necessary Cookies
                    </p>
                    <p className="text-xs">
                      Required for site functionality, security, and basic features.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      📊 Analytics Cookies
                    </p>
                    <p className="text-xs">
                      Help us understand how visitors interact with our site to improve content and user experience.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      🎯 Marketing Cookies
                    </p>
                    <p className="text-xs">
                      Used to deliver relevant content and track the effectiveness of our marketing campaigns.
                    </p>
                  </div>
                </div>
                <p className="text-xs pt-2">
                  By clicking "Accept All", you consent to our use of cookies. You can manage your preferences at any time.
                  <a 
                    href="/privacy" 
                    className="text-primary hover:underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more about our privacy practices
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  onClick={handleAcceptAll}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  Accept All Cookies
                </Button>
                <Button 
                  onClick={handleAcceptNecessary}
                  variant="outline"
                  size="sm"
                >
                  Necessary Only
                </Button>
                <Button 
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Ask Me Later
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="flex-shrink-0 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
      marketing: consentData.marketing || false,
    };
  } catch {
    return { necessary: false, analytics: false, marketing: false };
  }
}