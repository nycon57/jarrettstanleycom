# JarrettStanley.com - Design System & Brand Guidelines

## Brand Overview

### Brand Personality
- **Professional:** Executive-level expertise and credibility
- **Innovative:** Forward-thinking AI and technology leader
- **Approachable:** Making complex technology accessible
- **Authentic:** Genuine voice and transparent communication
- **Dynamic:** Active in the industry and constantly evolving

### Visual Identity
Building upon TrueTone AI's sophisticated aesthetic while establishing Jarrett's unique personal brand presence.

## Color Palette

### Primary Colors (TrueTone Heritage)
```css
/* Core Purple Gradient */
--shadow: #131321;        /* Deep shadow */
--indigo: #2C2A4A;        /* Dark indigo */
--orchid: #4F518C;        /* Rich orchid */
--lilac: #9D7AD6;         /* Vibrant lilac */
--lavender: #DABFFF;      /* Soft lavender */
--skyward: #7FEDFF;       /* Accent sky blue */
```

### Extended Palette
```css
/* Professional Neutrals */
--slate-900: #0F172A;     /* Primary text */
--slate-700: #334155;     /* Secondary text */
--slate-500: #64748B;     /* Muted text */
--slate-300: #CBD5E1;     /* Borders */
--slate-100: #F1F5F9;     /* Backgrounds */
--white: #FFFFFF;         /* Pure white */

/* Accent Colors */
--success: #10B981;       /* Success green */
--warning: #F59E0B;       /* Warning amber */
--error: #EF4444;         /* Error red */
--info: #3B82F6;          /* Info blue */
```

### Color Usage Guidelines

#### Backgrounds
- **Hero sections:** Animated gradient using core purple palette
- **Content sections:** White or slate-100
- **Cards:** White with subtle shadow
- **Footer:** Indigo or slate-900

#### Text
- **Headings:** Slate-900 on light, white on dark
- **Body text:** Slate-700 on light, slate-100 on dark
- **Muted text:** Slate-500
- **Links:** Orchid (hover: Lilac)

#### Interactive Elements
- **Primary buttons:** Lilac background, white text
- **Secondary buttons:** White background, orchid border/text
- **Hover states:** 10% darker/lighter
- **Focus states:** Skyward outline

## Typography

### Font Families
```css
/* Headings */
--font-signal: 'Signal', sans-serif;

/* Body Text */
--font-hind: 'Hind', sans-serif;

/* Code/Monospace */
--font-mono: 'Fira Code', monospace;
```

### Type Scale
```css
/* Desktop Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */

/* Mobile Adjustments */
@media (max-width: 768px) {
  /* Reduce by ~20% on mobile */
}
```

### Typography Guidelines

#### Headings
- **H1:** Signal Bold, text-5xl, slate-900
- **H2:** Signal Bold, text-4xl, slate-900
- **H3:** Signal Medium, text-3xl, slate-900
- **H4:** Signal Medium, text-2xl, slate-800
- **H5:** Hind SemiBold, text-xl, slate-800
- **H6:** Hind SemiBold, text-lg, slate-700

#### Body Text
- **Large:** Hind Regular, text-lg, slate-700, line-height 1.7
- **Regular:** Hind Regular, text-base, slate-700, line-height 1.6
- **Small:** Hind Regular, text-sm, slate-600, line-height 1.5

#### Special Text
- **Lead text:** Hind Light, text-xl, slate-600
- **Captions:** Hind Regular, text-sm, slate-500
- **Labels:** Hind Medium, text-sm, uppercase, letter-spacing 0.05em

## Spacing System

### Base Unit
8px grid system for consistent spacing

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Spacing Applications
- **Component padding:** space-4 to space-6
- **Section padding:** space-16 to space-24
- **Element margins:** space-2 to space-8
- **Grid gaps:** space-4 to space-8

## Component Styles

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--lilac);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: 0.5rem;
  font-family: var(--font-hind);
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--orchid);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(157, 122, 214, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: white;
  color: var(--orchid);
  border: 2px solid var(--orchid);
  /* Same padding and typography as primary */
}
```

### Cards
```css
.card {
  background: white;
  border-radius: 1rem;
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

### Forms
```css
.input {
  border: 1px solid var(--slate-300);
  border-radius: 0.375rem;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-hind);
  transition: all 0.2s;
}

.input:focus {
  border-color: var(--lilac);
  outline: 2px solid rgba(157, 122, 214, 0.2);
}
```

## Animation & Motion

### Transition Timing
```css
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;
--transition-slower: 500ms;
```

### Easing Functions
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animation Guidelines
- **Hover effects:** Use translateY for lift effect
- **Page transitions:** Fade and slide combinations
- **Loading states:** Subtle pulse or skeleton screens
- **Gradient animation:** Slow, smooth color transitions
- **Micro-interactions:** Quick, responsive feedback

## Layout Principles

### Grid System
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.grid {
  display: grid;
  gap: var(--space-6);
}

/* Common grid patterns */
.grid-cols-1 { grid-template-columns: 1fr; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
```

### Breakpoints
```css
--screen-sm: 640px;   /* Mobile landscape */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
--screen-2xl: 1536px; /* Extra large */
```

### Responsive Design
- **Mobile-first approach**
- **Fluid typography scaling**
- **Flexible grid layouts**
- **Touch-friendly tap targets (min 44px)**
- **Simplified navigation on mobile**

## Visual Elements

### Icons
- **Style:** Tabler Icons or Lucide Icons
- **Size:** 20px (small), 24px (default), 32px (large)
- **Color:** Inherit from text color
- **Stroke width:** 2px

### Images
- **Hero images:** 16:9 aspect ratio
- **Profile photos:** Square with rounded corners
- **Thumbnails:** 3:2 aspect ratio
- **Optimization:** WebP format with fallbacks
- **Loading:** Blur-up placeholder technique

### Gradient Backgrounds
```css
/* Hero gradient */
.gradient-hero {
  background: linear-gradient(
    135deg,
    var(--indigo) 0%,
    var(--orchid) 50%,
    var(--lilac) 100%
  );
}

/* Subtle gradient */
.gradient-subtle {
  background: linear-gradient(
    to bottom,
    rgba(157, 122, 214, 0.05) 0%,
    rgba(157, 122, 214, 0) 100%
  );
}
```

## Accessibility Guidelines

### Color Contrast
- **Normal text:** 4.5:1 minimum contrast ratio
- **Large text:** 3:1 minimum contrast ratio
- **Interactive elements:** Clear focus indicators
- **Error states:** Don't rely on color alone

### Interactive Elements
- **Focus indicators:** 2px skyward outline
- **Hover states:** Visual feedback
- **Active states:** Pressed appearance
- **Disabled states:** Reduced opacity (0.5)

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Component Library

### Existing Shadcn/ui Components to Leverage
- **Button:** Primary, secondary, ghost variants
- **Card:** Content containers with hover effects
- **Dialog:** Modal windows for forms
- **Input:** Form inputs with validation states
- **Select:** Dropdown selections
- **Tabs:** Content organization
- **Toast:** Notification system
- **Tooltip:** Helpful information on hover

### Custom Components Needed
- **GradientHero:** Animated background with content overlay
- **ServiceCard:** Icon, title, description, CTA
- **TestimonialCard:** Quote, author, photo, company
- **BlogCard:** Featured image, title, excerpt, meta
- **StatsBlock:** Number, label, icon
- **Timeline:** Visual career/achievement timeline
- **SpeakerKit:** Downloadable resource cards

## Implementation Guidelines

### CSS Architecture
```scss
// Base styles
@layer base {
  // Reset and defaults
}

// Component styles
@layer components {
  // Reusable component classes
}

// Utility styles
@layer utilities {
  // Single-purpose utility classes
}
```

### Naming Conventions
- **BEM for components:** `.block__element--modifier`
- **Utility classes:** Tailwind CSS conventions
- **JavaScript hooks:** `js-` prefix
- **State classes:** `is-active`, `is-loading`

### Performance Considerations
- **CSS containment:** For expensive animations
- **Will-change:** Sparingly for transforms
- **GPU acceleration:** For smooth animations
- **Critical CSS:** Inline above-the-fold styles

## Brand Applications

### Email Templates
- Maintain brand colors and typography
- Simplified layout for email clients
- Clear CTAs with adequate padding
- Mobile-responsive design

### Social Media
- Consistent color usage
- Profile images with gradient background
- Shareable quote cards
- Video thumbnails with brand overlay

### Presentation Templates
- Title slides with gradient backgrounds
- Consistent typography hierarchy
- Brand color accents
- Professional photography

## Design Tokens

### Export for Development
```json
{
  "colors": {
    "primary": {
      "shadow": "#131321",
      "indigo": "#2C2A4A",
      "orchid": "#4F518C",
      "lilac": "#9D7AD6",
      "lavender": "#DABFFF"
    }
  },
  "typography": {
    "families": {
      "heading": "Signal",
      "body": "Hind"
    }
  },
  "spacing": {
    "base": 8,
    "scale": [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
  }
}
```

---

*This design system ensures consistency across JarrettStanley.com while maintaining the sophisticated aesthetic established by TrueTone AI. All design decisions should reference these guidelines to maintain brand cohesion.*