import { cn } from "@/lib/utils";

// Animation duration constants
export const DURATION = {
  instant: "duration-0",
  fast: "duration-150",
  normal: "duration-300",
  slow: "duration-500",
  slower: "duration-700",
  slowest: "duration-1000",
} as const;

// Animation timing functions
export const EASING = {
  linear: "ease-linear",
  in: "ease-in",
  out: "ease-out",
  inOut: "ease-in-out",
  bounce: "ease-bounce",
  elastic: "ease-elastic",
} as const;

// Common transition classes
export const TRANSITIONS = {
  all: "transition-all",
  colors: "transition-colors",
  opacity: "transition-opacity",
  shadow: "transition-shadow",
  transform: "transition-transform",
} as const;

// Hover effect classes
export const HOVER_EFFECTS = {
  scale: "hover:scale-105",
  scaleSmall: "hover:scale-[1.02]",
  scaleLarge: "hover:scale-110",
  lift: "hover:-translate-y-1",
  liftSmall: "hover:-translate-y-0.5",
  liftLarge: "hover:-translate-y-2",
  glow: "hover:shadow-lg hover:shadow-lilac/20",
  glowLarge: "hover:shadow-xl hover:shadow-lilac/30",
  brighten: "hover:brightness-110",
  darken: "hover:brightness-90",
} as const;

// Focus effect classes
export const FOCUS_EFFECTS = {
  ring: "focus:ring-2 focus:ring-lilac focus:ring-offset-2",
  ringSubtle: "focus:ring-1 focus:ring-lilac/50 focus:ring-offset-1",
  ringLarge: "focus:ring-4 focus:ring-lilac focus:ring-offset-2",
  outline: "focus:outline-none focus:ring-2 focus:ring-lilac",
  glow: "focus:shadow-lg focus:shadow-lilac/20",
} as const;

// Active effect classes
export const ACTIVE_EFFECTS = {
  scale: "active:scale-95",
  scaleSmall: "active:scale-[0.98]",
  scaleLarge: "active:scale-90",
  darken: "active:brightness-90",
  brighten: "active:brightness-110",
} as const;

// Animation keyframe classes (custom animations)
export const ANIMATIONS = {
  fadeIn: "animate-fadeIn",
  fadeOut: "animate-fadeOut",
  slideInUp: "animate-slideInUp",
  slideInDown: "animate-slideInDown",
  slideInLeft: "animate-slideInLeft",
  slideInRight: "animate-slideInRight",
  scaleIn: "animate-scaleIn",
  scaleOut: "animate-scaleOut",
  spin: "animate-spin",
  ping: "animate-ping",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  shimmer: "animate-shimmer",
  gradient: "animate-gradient",
  wave: "animate-wave",
} as const;

// Scroll reveal animation classes
export const SCROLL_ANIMATIONS = {
  fadeUp: "opacity-0 translate-y-4 animate-fadeUp",
  fadeDown: "opacity-0 -translate-y-4 animate-fadeDown",
  fadeLeft: "opacity-0 translate-x-4 animate-fadeLeft",
  fadeRight: "opacity-0 -translate-x-4 animate-fadeRight",
  zoomIn: "opacity-0 scale-95 animate-zoomIn",
  zoomOut: "opacity-0 scale-105 animate-zoomOut",
} as const;

// Helper functions for creating animation classes
export const createTransition = (
  properties: keyof typeof TRANSITIONS | Array<keyof typeof TRANSITIONS> = "all",
  duration: keyof typeof DURATION = "normal",
  easing: keyof typeof EASING = "inOut"
) => {
  const transitionClasses = Array.isArray(properties)
    ? properties.map(p => TRANSITIONS[p]).join(" ")
    : TRANSITIONS[properties];
  
  return cn(transitionClasses, DURATION[duration], EASING[easing]);
};

export const createHoverEffect = (
  effects: keyof typeof HOVER_EFFECTS | Array<keyof typeof HOVER_EFFECTS>,
  transition = true
) => {
  const hoverClasses = Array.isArray(effects)
    ? effects.map(e => HOVER_EFFECTS[e]).join(" ")
    : HOVER_EFFECTS[effects];
  
  return cn(
    hoverClasses,
    transition && createTransition()
  );
};

export const createFocusEffect = (
  effect: keyof typeof FOCUS_EFFECTS = "ring",
  transition = true
) => {
  return cn(
    FOCUS_EFFECTS[effect],
    transition && createTransition("all", "fast")
  );
};

export const createInteractiveElement = (
  hover: keyof typeof HOVER_EFFECTS | Array<keyof typeof HOVER_EFFECTS> = "scale",
  active: keyof typeof ACTIVE_EFFECTS = "scale",
  focus: keyof typeof FOCUS_EFFECTS = "ring"
) => {
  return cn(
    createHoverEffect(hover),
    ACTIVE_EFFECTS[active],
    createFocusEffect(focus)
  );
};

// Stagger animation helper for lists
export const createStaggerAnimation = (
  index: number,
  baseDelay = 0,
  increment = 100
) => {
  return {
    style: {
      animationDelay: `${baseDelay + index * increment}ms`,
    },
  };
};

// Parallax effect helper
export const createParallaxEffect = (speed = 0.5) => {
  return {
    style: {
      transform: `translateY(calc(var(--scroll-y, 0) * ${speed}px))`,
    },
  };
};

// Gradient animation helper
export const createGradientAnimation = (
  colors: string[] = ["lilac", "orchid", "skyward"],
  direction = "to-r"
) => {
  const gradientColors = colors.join(" ");
  return cn(
    `bg-gradient-${direction}`,
    `from-${colors[0]}`,
    `via-${colors[1]}`,
    `to-${colors[2]}`,
    "bg-300% animate-gradient"
  );
};

// Micro-interaction presets
export const MICRO_INTERACTIONS = {
  button: createInteractiveElement("scale", "scale", "ring"),
  card: createInteractiveElement(["lift", "glow"], "scaleSmall", "ringSubtle"),
  link: createInteractiveElement("brighten", "darken", "outline"),
  input: cn(
    createTransition("all", "normal"),
    FOCUS_EFFECTS.ring,
    "hover:border-lilac/50"
  ),
  badge: createInteractiveElement("scaleSmall", "scaleSmall", "ringSubtle"),
} as const;

// Page transition presets
export const PAGE_TRANSITIONS = {
  fadeIn: "animate-in fade-in duration-500",
  fadeOut: "animate-out fade-out duration-500",
  slideIn: "animate-in slide-in-from-bottom duration-500",
  slideOut: "animate-out slide-out-to-top duration-500",
  zoomIn: "animate-in zoom-in duration-500",
  zoomOut: "animate-out zoom-out duration-500",
} as const;

// Export all animation utilities
export const animations = {
  duration: DURATION,
  easing: EASING,
  transitions: TRANSITIONS,
  hover: HOVER_EFFECTS,
  focus: FOCUS_EFFECTS,
  active: ACTIVE_EFFECTS,
  animations: ANIMATIONS,
  scroll: SCROLL_ANIMATIONS,
  micro: MICRO_INTERACTIONS,
  page: PAGE_TRANSITIONS,
  // Helper functions
  createTransition,
  createHoverEffect,
  createFocusEffect,
  createInteractiveElement,
  createStaggerAnimation,
  createParallaxEffect,
  createGradientAnimation,
};