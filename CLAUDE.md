# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is JarrettStanley.com - a personal brand website for Jarrett Stanley, Chief Marketing Officer at Nationwide Mortgage Bankers and creator of TrueTone AI. The site establishes Jarrett as a thought leader in AI-powered mortgage marketing, providing pathways for speaking engagements, consulting, and showcasing TrueTone AI.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with custom components from shadcn/ui
- **Database**: Supabase (for waitlist signups)
- **Email**: Resend API for transactional emails
- **Forms**: React Hook Form with Zod validation
- **Fonts**: Custom local fonts (Signal, Hind, Metropolis)

### Project Structure

```
src/
├── app/              # Next.js app directory with page routes
│   ├── contact/      # Contact page
│   ├── home/         # Home page  
│   └── resources/    # Resources page
├── components/       # React components
│   ├── email/        # Email templates for Resend
│   ├── layout/       # Layout components (header, footer)
│   ├── sections/     # Page sections (hero, features, etc.)
│   └── ui/           # shadcn/ui components
├── lib/              # Utility functions and configurations
│   ├── supabase.ts   # Supabase client configuration
│   └── validations/  # Zod schemas for form validation
└── types/            # TypeScript type definitions
```

### Key Patterns

1. **Component Organization**: UI components are in `src/components/ui/`, following shadcn/ui conventions
2. **Path Aliases**: Use `@/` for imports from `src/` directory
3. **Environment Variables**: Required for Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
4. **Styling**: Uses Tailwind CSS with CSS variables for theming, configured in `tailwind.config.ts`
5. **Form Handling**: Uses React Hook Form with Zod schemas located in `src/lib/validations/`

### Database Schema

The project uses Supabase with a `waitlist` table for collecting email signups. The schema includes fields for email, name, company, marketing consent, and tracking parameters (UTM, referrer, etc.).

### Important Files

- `components.json` - shadcn/ui configuration
- `src/lib/supabase.ts` - Database client and types
- `src/app/layout.tsx` - Root layout with theme provider and font configuration
- `src/components/layout/conditional-layout.tsx` - Conditional layout logic for different pages

## Project Context

### Business Goals
- Establish Jarrett as the go-to expert on AI in mortgage marketing
- Generate 50+ qualified speaking inquiries annually
- Attract 20+ enterprise consulting opportunities
- Build email list of 5,000+ industry professionals

### Target Audiences
1. **Primary**: Mortgage industry executives, conference organizers, marketing professionals
2. **Secondary**: Progressive loan officers, industry media

### Key Features & Pages

1. **Homepage**: Hero with "Where Mortgage Marketing Meets Artificial Intelligence", credibility bar (CMO at Nationwide, Creator of TrueTone AI, Featured Speaker), services overview
2. **Speaking Page**: Topics, past engagements, booking system
3. **Consulting Page**: Services offered, case studies, inquiry form
4. **About Page**: Professional journey, achievements, industry expertise
5. **Resources/Blog**: Thought leadership content on AI in mortgage marketing
6. **TrueTone AI Showcase**: Dedicated section highlighting the platform

### Design System
- Leverages TrueTone AI's purple gradient aesthetic
- Signal font for headings, Hind for body text  
- Professional photography throughout
- Animated gradient backgrounds for key sections

### Content Strategy
The site will feature content pillars around:
- AI Innovation in Mortgage
- Marketing Excellence
- Industry Leadership  
- Personal Insights from building TrueTone AI

### Integration Points
- Calendly for speaking engagement booking
- ConvertKit or similar for email marketing
- Google Analytics 4 for tracking
- Social media APIs for content sharing