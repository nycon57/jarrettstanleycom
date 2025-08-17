'use client';

import { useEffect, useRef, useState } from 'react';
import { trackReadingProgress, debounce } from '@/lib/analytics';

interface ReadingProgressProps {
  contentTitle: string;
  children: React.ReactNode;
}

export function ReadingProgress({ contentTitle, children }: ReadingProgressProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [trackedMilestones, setTrackedMilestones] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.pageYOffset;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      // Calculate how much of the content is visible
      const visibleStart = Math.max(scrollTop, elementTop);
      const visibleEnd = Math.min(scrollTop + windowHeight, elementTop + elementHeight);
      const visibleHeight = Math.max(0, visibleEnd - visibleStart);
      
      const readingProgress = Math.round((visibleHeight / elementHeight) * 100);
      const scrollProgress = Math.round(((scrollTop - elementTop + windowHeight) / elementHeight) * 100);
      
      // Use the higher of the two progress calculations
      const progress = Math.max(readingProgress, scrollProgress);
      const clampedProgress = Math.min(100, Math.max(0, progress));

      // Track at 25%, 50%, 75%, and 100% milestones
      const milestones = [25, 50, 75, 100];
      
      for (const milestone of milestones) {
        if (clampedProgress >= milestone && !trackedMilestones.has(milestone)) {
          trackReadingProgress(contentTitle, milestone);
          setTrackedMilestones(prev => new Set([...Array.from(prev), milestone]));
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentTitle, trackedMilestones]);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  );
}