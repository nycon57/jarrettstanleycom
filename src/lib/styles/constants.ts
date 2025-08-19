/**
 * Centralized style constants for the JarrettStanley.com design system
 * These constants ensure consistency across all components and pages
 */

// Brand Colors
export const COLORS = {
  shadow: "#131321",
  indigo: "#2C2A4A",
  orchid: "#4F518C",
  lilac: "#907AD6",
  lavender: "#DABFFF",
  skyward: "#7FDEFF",
} as const;

// Gradient Presets
export const GRADIENTS = {
  // Primary gradients
  primary: "bg-gradient-to-r from-lilac to-orchid",
  secondary: "bg-gradient-to-r from-orchid to-skyward",
  tertiary: "bg-gradient-to-r from-lilac via-orchid to-skyward",
  subtle: "bg-gradient-to-r from-lavender to-lilac",
  
  // Directional gradients
  primaryBr: "bg-gradient-to-br from-lilac to-orchid",
  secondaryBr: "bg-gradient-to-br from-orchid to-skyward",
  tertiaryBr: "bg-gradient-to-br from-lilac via-orchid to-skyward",
  
  // Text gradients
  textPrimary: "bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent",
  textSecondary: "bg-gradient-to-r from-orchid to-skyward bg-clip-text text-transparent",
  textTertiary: "bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent",
  
  // Background gradients (subtle)
  bgSubtle: "bg-gradient-to-br from-lilac/5 via-transparent to-orchid/5",
  bgLight: "bg-gradient-to-br from-lilac/10 via-transparent to-orchid/10",
  bgMedium: "bg-gradient-to-br from-lilac/20 via-transparent to-orchid/20",
} as const;

// Common Button Styles
export const BUTTON_STYLES = {
  primary: "bg-gradient-to-r from-lilac to-orchid text-white hover:from-lilac/90 hover:to-orchid/90",
  secondary: "bg-gradient-to-r from-orchid to-skyward text-white hover:from-orchid/90 hover:to-skyward/90",
  outline: "border border-lilac/30 text-lilac hover:bg-lilac/10 hover:border-lilac/50",
  ghost: "text-lilac hover:bg-lilac/10",
} as const;

// Card Styles
export const CARD_STYLES = {
  default: "bg-card border rounded-xl shadow-sm",
  elevated: "bg-card border rounded-xl shadow-lg hover:shadow-xl transition-shadow",
  interactive: "bg-card border rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer",
  gradient: "bg-gradient-to-br from-lilac/10 to-orchid/10 border border-lilac/30 rounded-xl",
  blur: "bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl",
} as const;

// Section Background Styles
export const SECTION_STYLES = {
  default: "py-24",
  hero: "py-32 pt-40",
  withBg: "py-24 bg-muted/30",
  withGradient: "py-24 bg-gradient-to-br from-lilac/5 via-transparent to-orchid/5",
  dark: "py-24 bg-shadow text-white",
} as const;

// Z-Index Scale
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  toast: 70,
  navigation: 100,
} as const;

// Spacing Scale (in rem)
export const SPACING = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// Border Radius Scale
export const RADIUS = {
  none: "0",
  sm: "0.125rem",
  default: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// Shadow Scale
export const SHADOWS = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",
  // Brand colored shadows
  lilac: "0 10px 15px -3px rgb(144 122 214 / 0.3), 0 4px 6px -4px rgb(144 122 214 / 0.2)",
  orchid: "0 10px 15px -3px rgb(79 81 140 / 0.3), 0 4px 6px -4px rgb(79 81 140 / 0.2)",
  skyward: "0 10px 15px -3px rgb(127 222 255 / 0.3), 0 4px 6px -4px rgb(127 222 255 / 0.2)",
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  // Font families
  fonts: {
    heading: "var(--font-signal)",
    body: "var(--font-hind)",
    mono: "ui-monospace, monospace",
  },
  // Font sizes
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  // Line heights
  lineHeights: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  // Font weights
  weights: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Container Widths
export const CONTAINERS = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  full: "100%",
} as const;

// Form Field Styles
export const FORM_STYLES = {
  input: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  textarea: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  select: "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  checkbox: "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-lilac data-[state=checked]:text-primary-foreground",
  radio: "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
} as const;

// Icon Sizes
export const ICON_SIZES = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-10 w-10",
} as const;

// Export all constants as a single object for convenience
export const STYLES = {
  colors: COLORS,
  gradients: GRADIENTS,
  buttons: BUTTON_STYLES,
  cards: CARD_STYLES,
  sections: SECTION_STYLES,
  zIndex: Z_INDEX,
  spacing: SPACING,
  radius: RADIUS,
  shadows: SHADOWS,
  typography: TYPOGRAPHY,
  breakpoints: BREAKPOINTS,
  containers: CONTAINERS,
  forms: FORM_STYLES,
  icons: ICON_SIZES,
} as const;