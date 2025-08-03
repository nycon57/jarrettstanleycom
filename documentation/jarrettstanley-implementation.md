# JarrettStanley.com - Technical Implementation Plan

## Overview

This document outlines the technical approach for transforming the existing TrueTone AI codebase into JarrettStanley.com, leveraging existing components and infrastructure while adapting the content and functionality for a personal brand website.

## Current State Analysis

### Existing Assets
- **Framework:** Next.js 15 with App Router
- **Styling:** TailwindCSS with custom configuration
- **UI Components:** Shadcn/ui component library
- **Database:** Supabase integration
- **Email:** Resend integration
- **Fonts:** Signal (headings) and Hind (body)
- **Design Elements:** Gradient animations, responsive components

### Reusable Components
1. `BackgroundGradientAnimation` - Hero sections
2. `Button`, `Input`, `Form` - Interactive elements
3. `Card`, `Badge` - Content display
4. `VideoModal` - Media presentation
5. `Header`, `Footer` - Layout structure
6. Email templates for transactional messages

## Implementation Strategy

### Phase 1: Foundation (Week 1)

#### 1.1 Project Setup
```bash
# Update package.json
- Update name to "jarrettstanley-com"
- Update description and metadata

# Update environment variables
NEXT_PUBLIC_SITE_URL=https://jarrettstanley.com
NEXT_PUBLIC_SITE_NAME="Jarrett Stanley"
```

#### 1.2 Branding Updates
- **Logo Replacement**
  - Create new logo/wordmark for Jarrett Stanley
  - Update favicon and meta images
  - Implement in header component

- **Color Palette Adjustment**
  - Maintain purple gradient theme
  - Add complementary professional colors
  - Update CSS variables in globals.css

- **Typography**
  - Keep Signal and Hind fonts
  - Adjust font sizes for professional context
  - Ensure readability across devices

#### 1.3 Homepage Transformation
Transform `src/app/page.tsx`:
```typescript
// From waitlist hero to professional homepage
- Remove waitlist functionality
- Implement new hero section with AboutPreview
- Add Services, TrueTone showcase, Latest Insights
- Integrate testimonials and credibility elements
```

### Phase 2: Core Pages (Week 2)

#### 2.1 Page Structure
Create new pages:
```
src/app/
├── about/
│   └── page.tsx
├── services/
│   ├── page.tsx
│   ├── speaking/
│   │   └── page.tsx
│   ├── consulting/
│   │   └── page.tsx
│   └── advisory/
│       └── page.tsx
├── truetone-ai/
│   └── page.tsx
├── insights/
│   ├── page.tsx
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── resources/
│       └── page.tsx
├── podcast/
│   └── page.tsx
├── speaking/
│   └── page.tsx
└── contact/
    └── page.tsx
```

#### 2.2 Navigation Update
Modify `src/components/layout/header.tsx`:
```typescript
const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'TrueTone AI', href: '/truetone-ai' },
  { name: 'Insights', href: '/insights' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Contact', href: '/contact' }
]
```

#### 2.3 Component Creation
New components needed:
- `HeroSection` - Gradient hero with CTAs
- `ServiceCard` - Service overview cards
- `TestimonialCarousel` - Client testimonials
- `BlogPostCard` - Blog listing component
- `SpeakerKit` - Downloadable resources
- `ContactForm` - Multi-purpose contact forms

### Phase 3: Content Management (Week 3)

#### 3.1 Blog System
Implement blog functionality:
```typescript
// src/lib/blog.ts
- Markdown/MDX processing
- Frontmatter parsing
- Category/tag system
- Related posts algorithm
- SEO metadata generation
```

#### 3.2 Database Schema
Extend Supabase schema:
```sql
-- Blog posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  categories TEXT[],
  tags TEXT[],
  published_at TIMESTAMP,
  updated_at TIMESTAMP,
  author_id UUID,
  status TEXT DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT
);

-- Contact submissions
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL, -- 'general', 'speaking', 'consulting'
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  preferences JSONB,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);
```

#### 3.3 Content API
Create API routes:
```typescript
// src/app/api/blog/route.ts
- GET: Fetch blog posts with filtering
- POST: Create new posts (admin only)

// src/app/api/contact/route.ts
- POST: Handle contact form submissions

// src/app/api/newsletter/route.ts
- POST: Subscribe to newsletter
```

### Phase 4: Features & Integrations (Week 4)

#### 4.1 Form Handling
Implement forms with existing components:
```typescript
// Leverage existing form components
- Use react-hook-form with zod validation
- Integrate with Supabase for storage
- Send notifications via Resend
- Add success/error handling
```

#### 4.2 Analytics Setup
```typescript
// src/app/layout.tsx
- Add Google Analytics 4 script
- Implement Microsoft Clarity
- Set up conversion tracking
- Add event tracking helpers
```

#### 4.3 SEO Implementation
```typescript
// src/app/[page]/page.tsx
export const metadata: Metadata = {
  title: 'Page Title | Jarrett Stanley',
  description: 'Page description',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
  }
}
```

### Phase 5: Performance & Polish (Week 5)

#### 5.1 Performance Optimization
- Implement image optimization with next/image
- Add lazy loading for components
- Configure caching headers
- Optimize bundle size
- Implement static generation where possible

#### 5.2 Mobile Optimization
- Test all pages on mobile devices
- Optimize touch targets
- Simplify mobile navigation
- Ensure form usability
- Test gradient performance

#### 5.3 Accessibility Audit
- Validate WCAG 2.1 compliance
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Fix color contrast issues

## Technical Specifications

### Environment Configuration
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=

NEXT_PUBLIC_CALENDLY_URL=
```

### API Integrations

#### Calendly Integration
```typescript
// src/components/CalendlyEmbed.tsx
- Inline embed for booking
- PopupWidget for CTAs
- Event tracking
```

#### Newsletter Integration
```typescript
// src/lib/newsletter.ts
- ConvertKit API integration
- Double opt-in flow
- Tag management
- Automation triggers
```

### Deployment Configuration

#### Vercel Setup
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/contact/route.ts": {
      "maxDuration": 10
    }
  }
}
```

#### Domain Configuration
1. Configure jarrettstanley.com in Vercel
2. Set up SSL certificate
3. Configure www redirect
4. Set up email DNS records

## Migration Checklist

### Pre-Launch
- [ ] Update all brand references
- [ ] Replace placeholder content
- [ ] Test all forms
- [ ] Verify email delivery
- [ ] Check responsive design
- [ ] Run accessibility audit
- [ ] Test page speed
- [ ] Verify SEO setup
- [ ] Test analytics tracking
- [ ] Review security headers

### Launch Day
- [ ] Deploy to production
- [ ] Update DNS records
- [ ] Verify SSL certificate
- [ ] Test all pages
- [ ] Submit sitemap to Google
- [ ] Monitor error logs
- [ ] Check analytics data
- [ ] Test contact forms
- [ ] Verify email delivery

### Post-Launch
- [ ] Monitor performance
- [ ] Check for 404 errors
- [ ] Review analytics data
- [ ] Gather user feedback
- [ ] Plan content updates
- [ ] Schedule maintenance

## Maintenance Plan

### Regular Tasks
- **Daily:** Monitor error logs, check form submissions
- **Weekly:** Review analytics, update content, check backups
- **Monthly:** Security updates, performance audit, SEO review
- **Quarterly:** Feature updates, design refresh, strategy review

### Backup Strategy
- Automated daily backups via Supabase
- Weekly full site backup to external storage
- Version control through Git
- Database export procedures

### Update Procedures
1. Test updates in development
2. Deploy to staging environment
3. Run automated tests
4. Deploy to production during low traffic
5. Monitor for issues
6. Rollback procedure if needed

## Risk Mitigation

### Technical Risks
- **Dependency updates:** Use dependabot, test thoroughly
- **API limits:** Implement rate limiting, caching
- **Database growth:** Plan for scaling, archival strategy
- **Security vulnerabilities:** Regular audits, updates

### Content Risks
- **SEO penalties:** Follow best practices, avoid duplicates
- **Broken links:** Regular scanning, 301 redirects
- **Stale content:** Content calendar, regular reviews

## Success Metrics

### Technical KPIs
- Page load time < 2 seconds
- Lighthouse score > 90
- Zero critical security vulnerabilities
- 99.9% uptime
- Mobile usability score > 95

### Implementation Milestones
- Week 1: Foundation complete
- Week 2: All pages created
- Week 3: Content system operational
- Week 4: Features integrated
- Week 5: Launch ready

---

*This implementation plan provides a roadmap for transforming the TrueTone AI codebase into JarrettStanley.com. Follow the phases sequentially while maintaining flexibility for adjustments based on discoveries during development.*