"use client";

import { useState, useEffect } from 'react';

interface ScrollDirection {
  scrollDirection: 'up' | 'down' | null;
  scrollY: number;
  isScrolled: boolean;
}

export function useScrollDirection(threshold: number = 10): ScrollDirection {
  const [scrollState, setScrollState] = useState<ScrollDirection>({
    scrollDirection: null,
    scrollY: 0,
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        setScrollState((current) => ({
          ...current,
          scrollY: currentScrollY,
          isScrolled: currentScrollY > threshold,
        }));
        ticking = false;
        return;
      }

      setScrollState({
        scrollDirection: currentScrollY > lastScrollY ? 'down' : 'up',
        scrollY: currentScrollY,
        isScrolled: currentScrollY > threshold,
      });
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollDirection(); // Initial call

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrollState;
}
