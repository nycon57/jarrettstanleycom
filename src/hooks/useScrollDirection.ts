"use client";

import { useState, useEffect } from 'react';

interface ScrollDirection {
  scrollDirection: 'up' | 'down' | null;
  scrollY: number;
  isScrolled: boolean;
}

export function useScrollDirection(threshold: number = 10): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    updateScrollDirection(); // Initial call

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollDirection, scrollY, isScrolled };
}