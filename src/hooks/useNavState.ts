"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from './useScrollDirection';

export type NavState = 'transparent' | 'blurred' | 'solid' | 'hidden';

interface NavStateConfig {
  navState: NavState;
  isCompact: boolean;
  shouldUseLightText: boolean;
  isVisible: boolean;
}

export function useNavState(): NavStateConfig {
  const pathname = usePathname();
  const { scrollDirection, scrollY, isScrolled } = useScrollDirection(10);
  const [isVisible, setIsVisible] = useState(true);

  // All hero sections now have proper light/dark variants, so no special handling needed
  const isDarkHeroPage = false;

  // Determine nav state based on scroll position - ALL pages start transparent
  const getNavState = (): NavState => {
    if (!isVisible) return 'hidden';
    
    if (!isScrolled) {
      return 'transparent';
    } else if (isScrolled && scrollY < 200) {
      return 'blurred';
    } else {
      return 'solid';
    }
  };

  // Handle hide/show behavior
  useEffect(() => {
    if (scrollY < 100) {
      setIsVisible(true);
    } else if (scrollDirection === 'down' && scrollY > 100) {
      setIsVisible(false);
    } else if (scrollDirection === 'up') {
      setIsVisible(true);
    }
  }, [scrollDirection, scrollY]);

  const navState = getNavState();
  const isCompact = isScrolled && scrollY > 50;
  const shouldUseLightText = (navState === 'transparent' && isDarkHeroPage) || (navState === 'blurred' && isDarkHeroPage && scrollY < 100);

  return {
    navState,
    isCompact,
    shouldUseLightText,
    isVisible,
  };
}