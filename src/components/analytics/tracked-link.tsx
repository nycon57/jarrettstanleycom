'use client';

import { useAnalytics } from '@/hooks/use-analytics';
import Link from 'next/link';
import { forwardRef } from 'react';

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  trackingData: {
    linkText: string;
    linkType: 'social' | 'external' | 'truetone' | 'calendly';
    additionalData?: Record<string, any>;
  };
  external?: boolean;
}

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ trackingData, onClick, children, external = false, href, ...props }, ref) => {
    const { trackLink } = useAnalytics();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Track the link click
      trackLink(
        String(href),
        trackingData.linkText,
        trackingData.linkType
      );

      // Call the original onClick handler if provided
      if (onClick) {
        onClick(event);
      }
    };

    // For external links, use regular anchor tag
    if (external || (typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')))) {
      return (
        <a
          ref={ref}
          href={String(href)}
          onClick={handleClick}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }

    // For internal links, use Next.js Link
    return (
      <Link ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
);

TrackedLink.displayName = 'TrackedLink';