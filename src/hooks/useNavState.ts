"use client";

import { useScrollDirection } from './useScrollDirection';

type NavState = 'transparent' | 'blurred' | 'solid' | 'hidden';

interface NavStateConfig {
  navState: NavState;
  isCompact: boolean;
  shouldUseLightText: boolean;
  isVisible: boolean;
}

export function useNavState(): NavStateConfig {
  const { scrollDirection, scrollY, isScrolled } = useScrollDirection(10);
  const isVisible = !(scrollY >= 100 && scrollDirection === 'down');

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

  const navState = getNavState();
  const isCompact = isScrolled && scrollY > 50;
  const shouldUseLightText = navState === 'transparent' && isDarkHeroPage || navState === 'blurred' && isDarkHeroPage && scrollY < 100;

  return {
    navState,
    isCompact,
    shouldUseLightText,
    isVisible
  };
}
