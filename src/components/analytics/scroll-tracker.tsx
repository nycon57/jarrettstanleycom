'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth, debounce } from '@/lib/analytics';

interface ScrollTrackerProps {
  children: React.ReactNode;
}

export function ScrollTracker({ children }: ScrollTrackerProps) {
  const pathname = usePathname();
  const trackedDepths = useRef<Set<number>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset tracked depths when pathname changes
    trackedDepths.current = new Set();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (!contentRef.current) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      const scrollPercent = Math.round((scrollTop + windowHeight) / docHeight * 100);
      
      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackScrollDepth(milestone, pathname);
          trackedDepths.current.add(milestone);
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  );
}
