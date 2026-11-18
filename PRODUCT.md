# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (confirmed 2026-11-18): conference organizers, event producers and association program teams in mortgage and financial services, deciding whether to book Jarrett Stanley as a speaker. They arrive from a referral, a LinkedIn post, a talk they saw, or a search for a mortgage marketing or AI speaker, and they need to judge fast: can he hold a room of mortgage executives, what will he talk about, and how do I book him.

Secondary: mortgage company leaders weighing consulting or advisory work; readers of The Signal and viewers of The TrueTone Show following his thinking.

## Product Purpose

jarrettstanley.com is Jarrett Stanley's personal site. Its main job is getting him booked to speak (keynotes, workshops, panels and firesides, virtual sessions). Consulting/advisory and The Signal newsletter stay on the site but come second. Success: a qualified speaking inquiry submitted through the site.

## Positioning

A speaker who runs mortgage marketing as a sitting CMO and builds with AI every day, as CEO of TrueTone AI. Talks come from work he has shipped, not from a keynote circuit.

## Operating Context

- Inquiries arrive through the site's forms (speaking inquiry, contact, consulting) and calendar booking.
- The Signal is published on LinkedIn (newsletter "The Signal") and republished on the blog as a numbered series.
- The TrueTone Show, a video podcast with co-host Corey Shelton, publishes on YouTube and truetone.ai/show.
- The blog also hosts glossary, tools, examples and persona (solutions) template pages for search.

## Capabilities and Constraints

- Next.js App Router site; blog posts are JSON in `src/data/blog`; deployed on Vercel from the branch production uses (see repo notes).
- Speaking formats on offer: keynote (45 to 60 minutes), half-day and full-day workshops, panels and fireside chats, virtual presentations and webinars. Every booking includes a pre-event call, a customized presentation, Q&A and post-event resources.
- No published rate card: fees depend on event type, location and customization; quotes come through the inquiry form.
- Consulting: project-based (three to six months), retainer, or strategic advisory (twelve months or more).

## Brand Commitments

- **Same family as truetone.ai** (Jarrett, 2026-11-18): the site is built on TrueTone AI's design system, as a sibling property carrying his personal content. Source of truth: `TrueToneAI-FrontEnd/DESIGN.md` on main and the live site. Fonts: Montserrat (display, light uppercase heroes and bold section headlines) and Inter (body). Icons: the vendored IconMCP outline set and official brand marks, bare, never inside tinted chips.
- Jarrett's own name and signature logo (`public/assets/images/JS-Logo*.png`) identify the site; TrueTone AI is named as his company, not used as this site's brand.

## Evidence on Hand

- Roles: Chief Marketing Officer, Nationwide Mortgage Bankers; CEO, TrueTone AI. Prior: Southern Trust Mortgage, Atlantic Bay Mortgage Group, Movement Mortgage. 15+ years in mortgage marketing.
- Recognition: HousingWire Marketing Leader (2023); National Mortgage Professional Top 40 Under 40 (2022).
- Past engagements (in `src/components/sections/speaking/past-engagements.tsx`): NAMMBA Connect 2025 Mortgage Marketing Executive Summit (featured speaker, Aug 20, 2025, Orlando); Total Expert Accelerate (marketing experts panelist, 2019); NAIFA-Tidewater chapter meeting (2024); Nationwide Mortgage Bankers Sales Summit (keynote, 2024); Southern Trust Mortgage Sales Summit (guest expert, 2023).
- Signature topics: AI in mortgage marketing; digital transformation; building high-performance marketing teams.
- Testimonials: three named colleagues in `src/components/sections/testimonials-carousel.tsx`.
- Photography: studio portrait series `Jarrett-Pose-1..23` (purple-lit studio) and `Jarrett-Stock-*` portraits and stage shots with a microphone. Whether the stage shots are from specific real events is not recorded: never caption a photo as a named event.
- Writing: The Signal series on the blog; The TrueTone Show episodes.
- Absent, do not fabricate: audience sizes beyond what an engagement lists, speaker fees, ratings, event logos or "as seen at" walls, video reels, attendance or outcome metrics. Existing copy's "Increased team efficiency by 40%" is unverified; flag before featuring it.

## Product Principles

1. Booking a talk is the main path on every page; nothing competes with it in the first viewport.
2. Proof is specific: named events, roles, topics and his own words, not adjectives.
3. Same voice as his writing: plain, first person, confident, no hype.
4. The site reads as part of the TrueTone family without pretending to be TrueTone.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast on the dark ground, visible lilac focus rings, reduced-motion kill switches on every entrance and ambient loop.
