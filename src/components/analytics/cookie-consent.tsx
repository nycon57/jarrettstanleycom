'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconClose as X } from '@/components/icons/iconmcp/icons'

import { CONSENT_STORAGE_KEY } from '@/lib/consent';
const CONSENT_VERSION = '2.0';

interface CookieConsentProps {
  className?: string;
}

export function CookieConsent({ className }: CookieConsentProps) {
  const [bannerState, setBannerState] = useState({ showBanner: false, isLoading: true });
  const { showBanner, isLoading } = bannerState;

  useEffect(() => {
    // Check if user has already given consent
    const checkConsent = () => {
      let shouldShowBanner = false;
      try {
        const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (consent) {
          const consentData = JSON.parse(consent);
          // Show banner if no consent or version mismatch
          shouldShowBanner = !consentData.version || consentData.version !== CONSENT_VERSION;
        } else {
          shouldShowBanner = true;
        }
      } catch {
        shouldShowBanner = true;
      }
      setBannerState({ showBanner: shouldShowBanner, isLoading: false });
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
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    setBannerState((current) => ({ ...current, showBanner: false }));

    // Reload page to initialize tracking scripts
    window.location.reload();
  };

  const handleAcceptNecessary = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    setBannerState((current) => ({ ...current, showBanner: false }));
  };

  const handleDismiss = () => {
    // Set a temporary consent for this session only
    sessionStorage.setItem(`${CONSENT_STORAGE_KEY}-dismissed`, 'true');
    setBannerState((current) => ({ ...current, showBanner: false }));
  };

  if (isLoading || !showBanner) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className={`fixed inset-x-4 bottom-4 z-50 lg:inset-x-auto lg:left-1/2 lg:w-[min(52rem,calc(100%-3rem))] lg:-translate-x-1/2 ${className}`}
    >
      <div className="hp-card flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:gap-6 lg:py-3.5 lg:pl-6 lg:pr-3.5">
        <p className="text-sm leading-relaxed text-hp-muted lg:flex-1">
          <span className="font-semibold text-hp-text">Cookies.</span> Necessary ones keep the site working. With your OK,
          analytics and marketing cookies show what people read and how campaigns perform.{' '}
          <Link href="/privacy" className="text-hp-text underline decoration-hp-rule-strong underline-offset-4 hover:decoration-current">
            Privacy
          </Link>
        </p>
        <div className="flex items-center gap-x-4">
          <button type="button" onClick={handleAcceptAll} className="btn-primary btn-primary--sm">
            Accept all
          </button>
          <button type="button" onClick={handleAcceptNecessary} className="btn-ghost text-sm">
            Necessary only
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="ml-auto inline-flex size-9 items-center justify-center rounded-md text-hp-soft transition-colors hover:text-hp-text lg:ml-0"
          >
            <X className="size-4" />
            <span className="sr-only">Ask me later</span>
          </button>
        </div>
      </div>
    </div>
  )
}
