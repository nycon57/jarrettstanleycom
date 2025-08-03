'use client';

import { useAnalytics } from '@/hooks/use-analytics';
import { Button, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';

interface TrackedButtonProps extends ButtonProps {
  trackingData: {
    ctaName: string;
    ctaLocation: string;
    ctaType: 'speaking' | 'consulting' | 'truetone' | 'newsletter' | 'resource';
    additionalData?: Record<string, any>;
  };
}

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ trackingData, onClick, children, ...props }, ref) => {
    const { trackCTA } = useAnalytics();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Track the CTA click
      trackCTA(
        trackingData.ctaName,
        trackingData.ctaLocation,
        trackingData.ctaType
      );

      // Call the original onClick handler if provided
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Button ref={ref} onClick={handleClick} {...props}>
        {children}
      </Button>
    );
  }
);

TrackedButton.displayName = 'TrackedButton';