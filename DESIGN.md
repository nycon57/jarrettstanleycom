---
name: Jarrett Stanley
description: Speaker site for Jarrett Stanley on truetone.ai's dark Quiet Voice Studio system, carrying his own content.
colors:
  shadow-base: "oklch(0.16 0.025 278)"
  shadow-lift: "oklch(0.185 0.03 278)"
  elevated-panel: "oklch(0.225 0.04 280)"
  text-primary: "oklch(0.97 0.008 295)"
  text-lede: "oklch(0.78 0.018 295)"
  text-muted: "oklch(0.72 0.022 295)"
  text-muted-soft: "oklch(0.58 0.03 282)"
  ghost-link: "oklch(0.92 0.012 295 / 0.88)"
  cta-foreground: "oklch(0.99 0.005 295)"
  rule-subtle: "oklch(0.97 0.008 295 / 0.08)"
  rule-strong: "oklch(0.97 0.008 295 / 0.18)"
  lilac: "oklch(0.72 0.155 298)"
  lilac-deep: "oklch(0.62 0.165 298)"
  lilac-hover: "oklch(0.66 0.165 298)"
  lavender: "oklch(0.85 0.08 301)"
  focus: "oklch(0.85 0.12 298)"
  skyward: "oklch(0.85 0.11 215)"
typography:
  display:
    fontFamily: "var(--font-display), Helvetica Neue, Arial Narrow, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.9rem + 3.2vw, 4.25rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "0.005em"
  headline:
    fontFamily: "var(--font-display), Helvetica Neue, Arial Narrow, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 3vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline-sm:
    fontFamily: "var(--font-display), Helvetica Neue, Arial Narrow, Helvetica, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  quote:
    fontFamily: "var(--font-display), Helvetica Neue, Arial Narrow, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.1rem + 2.4vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-body), Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 0.9rem + 0.5vw, 1.3125rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.018em"
  lede:
    fontFamily: "var(--font-body), Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "var(--font-body), Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "var(--font-body), Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "var(--font-body), Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.02em"
    fontFeature: "tnum"
rounded:
  control: "8px"
  panel: "14px"
  frame: "24px"
  pill: "9999px"
spacing:
  row-dense: "0.875rem"
  row: "1.75rem"
  head-gap: "3.5rem"
  gutter: "clamp(1rem, 4vw, 2rem)"
  section: "clamp(5rem, 12vh, 8.5rem)"
  hero-top: "clamp(7rem, 15vh, 10rem)"
  hero-bottom: "clamp(4rem, 10vh, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.lilac-deep}"
    textColor: "{colors.cta-foreground}"
    rounded: "{rounded.control}"
    padding: "0.875rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.lilac-hover}"
    textColor: "{colors.cta-foreground}"
    rounded: "{rounded.control}"
  button-primary-sm:
    backgroundColor: "{colors.lilac-deep}"
    textColor: "{colors.cta-foreground}"
    rounded: "{rounded.control}"
    padding: "0.625rem 1.125rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ghost-link}"
    padding: "0.625rem 0.125rem"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
  choice:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.control}"
    padding: "0.375rem 0.75rem"
    height: "2.125rem"
  choice-checked:
    backgroundColor: "oklch(0.42 0.13 298 / 0.24)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
  card-panel:
    backgroundColor: "{colors.elevated-panel}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.panel}"
    padding: "1.5rem"
  card-frame:
    backgroundColor: "{colors.elevated-panel}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.frame}"
  chip:
    backgroundColor: "oklch(0.42 0.13 298 / 0.22)"
    textColor: "oklch(0.9 0.09 298)"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
  nav-link:
    textColor: "{colors.text-muted}"
  nav-link-active:
    textColor: "{colors.text-primary}"
---

# Design System: Jarrett Stanley

## Overview

**Creative North Star: "The Quiet Voice Studio, Booking Desk"**

jarrettstanley.com is a sibling property of truetone.ai and runs on its design system by owner ruling ("same family", 2026-11-18). The tokens keep truetone.ai's names (`--hp-*` in `src/app/globals.css`) and values: an indigo shadow ground, an ambient field with film grain behind every page opening, lilac used as punctuation, deep lilac as the one action color, Montserrat display and Inter body. The studio is the same; the desk is Jarrett's. Every surface is arranged so an event organizer can read who he is, shape a session and book it.

The mood is calm, dark and exact. Proof is set as dated hairline ledgers, the way a program committee reads a speaker record, not as tiles, badges or stat bands. The one product-style card on the site is the session proposal: truetone.ai's mockup chrome framing a program listing that the reader rewrites with three radio groups. Portraits of Jarrett at section scale ship in the brand duotone; nothing ships in stock color.

### Inherited, and where this site differs

Source of truth for the family is `TrueToneAI-FrontEnd/DESIGN.md` and the live truetone.ai. Where that file and this site's code disagree, this file records the code.

- **Personal content.** Jarrett's name and signature logo (`JS-Logo-white.png`) identify the site; TrueTone AI appears as his company, never as this site's brand. No Voice Orb, no TrueTone product mockups, no product-in-use imagery.
- **The session builder.** A signature component truetone.ai does not have: the first-viewport card where topic, format and audience radios rewrite a program-style listing, and "Book this session" carries the choice into the inquiry form. It introduces the choice control to the family.
- **Ledgers for proof.** Past stages, recognition, formats, inclusions and FAQ are hairline-ruled rows. Card grids are not used to explain or prove anything.
- **Montserrat and Inter.** Loaded with `next/font/google` as `--font-montserrat` and `--font-inter`, exactly as truetone.ai ships them now. Signal, Hind and Metropolis are retired here; `font-signal`, `font-hind` and `font-serif` remain as utility aliases that resolve to the same two faces.
- **Measured in the code:** section headlines are Montserrat Bold (700), not light; the hero tops out at 4.25rem instead of 4.75rem; there are no lilac eyebrows and no section-index masthead; chips are sentence case, not uppercase.

**Key Characteristics:**
- Dark-committed: `<html>` and `<body>` are both painted Studio Shadow; `color-scheme: dark`; there is no light theme.
- Two display registers: light uppercase for page openings and the closing call, bold tight sentence case for section headlines. Inter Bold owns every smaller heading.
- Deep lilac fills actions only; bright lilac marks state.
- Proof as dated ledgers; the session proposal as the single product-chrome card in a viewport.
- One orchestrated entrance per page, a breathing ambient field, a blurred crossfade when the session listing changes; everything else is a 200 to 280ms state change.

## Colors

An almost monochrome indigo system with one calibrated accent family (lilac) and a rare blue-cyan exception. Runtime values are OKLCH custom properties; the shadcn HSL variables (`--background`, `--card`, `--primary`, `--border`, `--ring`) are mapped onto the same values so every shadcn primitive lands in the palette.

### Primary
- **Deep Lilac Action** (`lilac-deep`): the fill of every primary button and the cookie notice's "Accept all". Hover lifts to `lilac-hover`; the hue never changes. Text on it is `cta-foreground`.
- **Lilac Signal** (`lilac`): state marks only. The check glyphs in takeaway lists, the active-route underline in the header, the pip on the pip rule, the checked choice border (at 65% alpha).

### Secondary
- **Lavender Date** (`lavender`): years in the engagement and recognition ledgers, and the hover color of writing-card titles. It is how a date reads as proof.
- **Skyward Exception** (`skyward`): carried in the token set and spent only on the Badge's `success` and `skyward` variants. Not a theme color.

### Neutral
- **Studio Shadow** (`shadow-base`): page ground and the default section band.
- **Lifted Shadow** (`shadow-lift`): the alternate section band (`hp-section--lift`) and the hover fill of ledger-grid cells.
- **Elevated Panel** (`elevated-panel`): card interiors, always as the top stop of a vertical gradient down to `oklch(0.19 0.035 278)`.
- **Lavender White** (`text-primary`): headings, ledger entries, list items, anything the reader must read.
- **Lede Orchid** (`text-lede`): hero and section ledes.
- **Muted Orchid** (`text-muted`): body copy, secondary lines, the muted step of a section headline, unselected choices.
- **Soft Orchid** (`text-muted-soft`): meta lines, read times, footnotes, legal row, choice-group legends.
- **Ghost Link White** (`ghost-link`): resting text of ghost links.
- **Hairline Rule** (`rule-subtle`, strong variant `rule-strong`): every border, ledger rule and divider. Strong is for control outlines.
- **Focus Lilac** (`focus`): the focus outline on every interactive element.

### Named Rules
**The Action Owns Deep Lilac Rule.** Deep lilac fills a primary action and nothing else. Bright lilac marks a state and never fills a surface. Selection highlight is deep lilac at 45% alpha.

**The No Pure Neutral Rule.** No pure black or white anywhere. Every neutral is tinted toward hue 278 to 301; even the CTA text is `oklch(0.99 0.005 295)`.

## Typography

**Display Font:** Montserrat (variable, `next/font/google`, `--font-montserrat` behind `--font-display`), falling back to Helvetica Neue and Arial Narrow.
**Body Font:** Inter (variable, `next/font/google`, `--font-inter` behind `--font-body`), falling back to Helvetica Neue.
**Label/Mono Font:** system monospace (`--font-mono`: ui-monospace, SF Mono, Menlo, Consolas) with tabular numerals, for meta lines and card chrome only.

**Character:** Montserrat speaks in two registers: a light uppercase titling voice that reads like a masthead, and a bold, tightly tracked sentence-case voice that states each section's point. Inter carries everything a reader actually reads, at a generous 1.65 line height on the dark ground.

### Hierarchy
- **Display** (Montserrat 300, `clamp(2.5rem, 1.9rem + 3.2vw, 4.25rem)`, 0.98, uppercase, +0.005em, −0.04em optical left pull): the page-opening h1 and the closing "Bring it to your stage." Max 15 to 16ch.
- **Headline** (Montserrat 700, `clamp(2rem, 1.2rem + 3vw, 3.5rem)`, 1, −0.03em): section headlines via `SectionHead`. An optional second clause steps back to Muted Orchid in the same size.
- **Headline Small** (Montserrat 700, 1.5rem to 2rem, 1.1 to 1.12, −0.025em): the session title inside the session card and each talk's name in the talks rows.
- **Quote** (Montserrat 300, `clamp(1.75rem, 1.1rem + 2.4vw, 3rem)`, 1.14, −0.02em, sentence case): the lead colleague quote only.
- **Title** (Inter 700, `clamp(1.0625rem, 0.9rem + 0.5vw, 1.3125rem)`, 1.2, −0.018em): ledger entries, writing-card titles, FAQ questions, column heads.
- **Lede** (Inter 400, `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)`, 1.65, max 54ch): hero and section intros.
- **Body** (Inter 400, 1rem, 1.65, max 68ch): paragraphs and FAQ answers. Dense lines inside ledgers and cards drop to 0.9375rem.
- **Label** (mono 400, 0.75rem, +0.02em, tabular): ledger years and dates (0.8125rem, lavender), format lengths in the formats list, the session card's chrome title and status. Softer metadata elsewhere (post series and dates, read times, skills) is Inter at 0.875rem in Soft Orchid, not mono.

### Named Rules
**The Two Registers Rule.** Light uppercase belongs to the page opening and the closing call; bold tight sentence case belongs to section headlines; Inter Bold owns every heading below about 1.3rem. Never mix registers inside one block.

**The Muted Step Rule.** A section headline gets its hierarchy from color, not from a second size: the first clause in Lavender White, the step ("before you book.", "tuned to your room.") in Muted Orchid.

**The Data-Only Meta Rule.** A mono meta line states a fact: a year, a date, a format length, a chrome title. It never labels a section or sits above a headline as an eyebrow.

## Layout

A centered shell capped at 1400px with a fluid side gutter (`clamp(1rem, 4vw, 2rem)`); compositions inside it are asymmetric two-column splits that collapse to one column below Tailwind's `lg` (1024px). The desktop header nav and the four-column footer appear at `md` (768px).

- **Page opening:** `page-hero` pads `clamp(7rem, 15vh, 10rem)` on top (clearing the 72px fixed header) and `clamp(4rem, 10vh, 7rem)` below. On the home page the text column and the session card split `1fr : 1.02fr` with a 4rem gap; the card stacks under the calls to action on smaller screens.
- **Bands:** every section is an `hp-section` with `clamp(5rem, 12vh, 8.5rem)` block padding, alternating Studio Shadow and Lifted Shadow so bands separate by tone, not by rules.
- **Section heads:** `SectionHead` is capped at 48rem; content starts 3.5rem below it.
- **Splits:** ledgers run head `1 : 1.55` rows with the head sticky at 7rem from the top; booking details `1 : 1.4`; FAQ `1 : 1.6`; about `0.9 : 1.1`; talk rows `1 : 1.1`; the inquiry section `0.8 : 1.2` with a sticky head. Column gaps run 3 to 5rem.
- **Rows:** ledger rows pad 1.75rem block; dense rows (formats, inclusions, recognition) 0.875rem to 1rem; FAQ summaries 1.5rem.
- **Measure:** ledes 54ch, body 68ch, hero headline 15ch.

### Named Rules
**The Ledger Over Grid Rule.** Lists of proof and options are hairline rows: a rule above the list, a rule under each row, a mono or lavender date in a fixed left column. The only tiled grid is the writing grid, and it is drawn with 1px gaps on the rule color inside one 14px frame, not as separate cards.

## Elevation & Depth

Depth is tonal first: the ambient field and grain behind openings, two alternating band tones, panels lifted by a faint vertical gradient and a 1px inset top highlight. Shadows are structural and soft, and appear only on the panel cards. Nothing glows; focus is an outline.

The ambient field is three stacked radial gradients (one lilac highlight at upper right, indigo pools at lower left and top center) breathing on a 14s loop under a 5% overlay film grain. Plain bands carry the same grain at 3.5%. The closing call reuses the field at 70% opacity.

### Shadow Vocabulary
- **Panel Depth** (`box-shadow: 0 1px 0 oklch(0.97 0.008 295 / 0.05) inset, 0 24px 60px -28px oklch(0 0 0 / 0.55), 0 8px 24px -16px oklch(0 0 0 / 0.35)`): `hp-card`: the session card, the inquiry form panel, the cookie notice.
- **Card Depth** (`box-shadow: 0 1px 0 oklch(0.97 0.008 295 / 0.05) inset, 0 24px 60px -28px oklch(0 0 0 / 0.55)`): the shadcn `Card` primitive used by template pages.
- **Pip Ring** (`box-shadow: 0 0 0 4px oklch(0.72 0.16 298 / 0.22)`): the single lilac pip on the pip rule.
- **Focus Outline** (`outline: 2px solid oklch(0.85 0.12 298); outline-offset: 3px`): every interactive element, including choices via `:has(input:focus-visible)`.
- **Scrolled Header** (`background: oklch(0.16 0.025 278 / 0.92); backdrop-filter: blur(12px)`): the header once the page scrolls past 8px. The only backdrop blur in the system.

### Named Rules
**The Flat Until Useful Rule.** Ledger rows, bands and links are flat. A shadow appears only under a panel that holds a working object: the session proposal, the inquiry form, the cookie notice.

## Shapes

Rectangles with intent. Buttons and choice controls are 8px rectangles; panel cards and the writing grid frame are 14px; the session card frame and section-scale portraits are 24px; the stage photo in the ledger clips at 14px; the show thumbnail at 8px. Pills are reserved for chips, the avatar, chrome dots and the pip. Every border is a 1px hairline in the rule tokens; there are no accent stripes. The ghost-link and nav underlines are 1px lines that scale in from the left.

### Named Rules
**The Pill Is Not a Button Rule.** A pill means a label or a status. Anything you press is an 8px rectangle.

## Components

### Buttons
Confident and quiet: one filled action, everything else a link.
- **Shape:** 8px rectangle (`rounded.control`).
- **Primary:** Deep Lilac Action fill, `cta-foreground` text, Inter 600 at 1rem, −0.005em, `0.875rem 1.5rem` padding, usually a trailing arrow. Small variant (header, session card, cookie notice) is 0.9375rem with `0.625rem 1.125rem`.
- **Hover / Active / Focus:** fill lifts to `lilac-hover` over 220ms; the arrow slides 2px right; press scales to 0.98 over 140ms; focus is the Focus Outline. No glow, no gradient.
- **Ghost:** the secondary action is a text link, not a box: Inter 500 in `ghost-link`, turning Lavender White on hover while a 1px underline scales in from the left over 240ms (also on focus).
- **Button primitive:** the shadcn `Button` resolves to the same language at its own sizes (h-9 to h-14, 8px radius, semibold), adds an `outline` variant (hairline `rule-strong` border, faint 4% fill on hover), and maps every legacy variant name (`gradient`, `lilac`, `orchid`, `skyward`) to the primary fill.

### Choice controls
8px labelled rectangles for picking from a short set. In the session builder they wrap native radio inputs (small size, 2.125rem tall); in the inquiry form's topic picker they are `aria-pressed` toggle buttons for multi-select (default size, 2.5rem tall).
- **Rest:** transparent, 1px `rule-strong` border, Muted Orchid Inter 500 at 0.875rem (small) or 0.9375rem.
- **Hover / Press:** text to Lavender White, border to 30% white; press scales to 0.98.
- **Checked / Pressed:** `oklch(0.42 0.13 298 / 0.24)` fill, lilac border at 65%, Lavender White text.
- **Focus:** the Focus Outline, drawn on the label when its hidden radio has keyboard focus. Radio groups are `role="radiogroup"` with a soft-orchid legend in a 4.75rem left column.

### Chips
- **Style:** sentence-case pill, `oklch(0.42 0.13 298 / 0.22)` fill, `oklch(0.9 0.09 298)` text, 1px lilac border at 30%, 600 weight at 0.6875 to 0.875rem.
- **Variants:** a quiet variant (transparent, hairline border, Muted Orchid text); Skyward for success; destructive for errors.

### Cards / Containers
- **Corner Style:** 14px panels; 24px for the session card frame.
- **Background:** vertical gradient from Elevated Panel to `oklch(0.19 0.035 278)`.
- **Shadow Strategy:** Panel Depth (see Elevation & Depth).
- **Border:** 1px `rule-subtle`.
- **Chrome strip:** the session card opens like a product window: three 9px hairline dots, a lowercase mono title ("session proposal") and a lowercase mono status ("keynote · 45 to 60 minutes"), over a hairline at 6%.
- **Internal Padding:** 1.25rem to 1.75rem in the session card; 1.5rem to 2.25rem around the inquiry form.

### Inputs / Fields
- **Style:** 44px tall, Lifted Shadow fill, a 14% lavender-white hairline (24% on hover), 8px radius, 0.9375rem Lavender White text, Soft Orchid placeholder. Select triggers match.
- **Focus:** the lilac Focus Ring outline (2px, 3px offset) and a lilac-tinted border. No rings, no browser blue.
- **Error:** a destructive-red line under the field, shown when a step is checked and cleared as soon as the field changes. Nothing re-validates on blur: a message disappearing on blur moves the layout under the pointer and swallows the next click.

### Navigation
- **Header:** fixed, 72px, transparent over the hero, then Studio Shadow at 92% with a 12px backdrop blur and a hairline once scrolled. Signature logo 32px tall at left; four Inter 500 links at 0.9375rem in Muted Orchid; a small primary "Book Jarrett" at right.
- **States:** hover brings the text to Lavender White with a 1px current-color underline from the left; the active route keeps a lilac underline and `aria-current="page"`.
- **Mobile:** a 40px menu toggle opens a disclosure of hairline-divided rows at 1.125rem with a trailing soft arrow, and a full-width primary at the bottom.
- **Footer:** a colophon under a hairline: logo, a one-line role statement, bare LinkedIn, X and mail glyphs in Soft Orchid; four link columns headed in Inter 600 at 0.8125rem; a legal row under a second hairline.

### Booking Card (signature, home and /speaking)
The session builder is step one of the speaking inquiry. A 24px frame with the chrome strip (dots, "session proposal", "1 of 3") over a 1px progress hairline that fills in lilac. Step 1 is the session listing: speaker row (48px avatar), format and length in Soft Orchid, the session title in Headline Small, an audience-and-summary line, takeaways with lilac checks, then three small choice groups (Topic, Format, Audience); each change remounts the listing with the 280ms blurred `swap-in`. "Book this session" moves to step 2 (the event: name, date, location, audience size and budget as choice chips) and step 3 (contact details and a message prefilled with the session line). Steps 2 and 3 open with a clickable summary row of the chosen session ("Change" returns to step 1). Steps change with a direction-aware 260ms slide-and-blur (`step-next` / `step-prev`, a fade under reduced motion) and focus moves to the new step's heading. It sends in place and ends on a "Sent" state; it never promises a reply time.

### Speaking Conversation (signature, /contact)
The contact page's speaking inquiry, built differently from the card: one question per screen set in the light display face (`clamp(1.875rem, 1.3rem + 1.8vw, 2.75rem)`), a 15rem rail of steps on the left that fills in each answer in Soft Orchid as you go (done steps are buttons that jump back; the current step carries the lilac pip), full-width Option Rows (hairline rows with a round or square mark on the right that fills Deep Lilac when chosen), a review ledger with "Edit" links, and Continue on Enter. Same schema and endpoint as the card.

### Home Hero Portrait and Voice Field
The home opening pairs the headline with Jarrett's cut-out portrait (true color, bottom-masked into the next band, soft drop shadow). Behind it, a three.js voice field: about 6,000 additive lilac-to-lavender particles on a Fibonacci sphere, displaced by simplex noise on a speech-like envelope, two thin orbit rings, and a spring drift toward the pointer. It loads after the page, pauses off screen and in hidden tabs, caps device pixel ratio, renders one still frame under reduced motion, and dissolves at its edges through a circular mask so no canvas edge ever shows. A CSS glow carries the hero if WebGL is missing. This is the one place the system allows a glowing object, as truetone.ai allows the Voice Orb.

### Ledgers (signature)
- **Engagement ledger:** a sticky head with an optional duotone stage photo; an ordered list of events, each row with a lavender mono year in a 5.5rem column, the event in Title, role and organization in Muted Orchid, the talk title in quotes, and date, place and audience in Soft Orchid.
- **Dense ledgers:** recognition (lavender year beside the honor), formats as a definition list with mono lengths right-aligned, inclusions with lilac checks.
- **FAQ:** native `<details>`; the question in Title, a bare plus that rotates 45° over 220ms when open, the answer in Body.

### Writing grid
Three latest posts and The TrueTone Show in one 14px hairline frame, cells separated by 1px rule-colored gaps. Post cells lead with the Title (lavender on hover), then a three-line clamped excerpt, with series, issue, date and read time at the foot in Soft Orchid; the cell fill lifts to Lifted Shadow on hover. The show cell sits on Lifted Shadow: a true-color 16:9 episode thumbnail in an 8px hairline-ringed frame (scales to 1.03 over 500ms on hover), the show name in Title, one Muted line, and an up-right arrow that nudges on hover.

### Colleague quotes
The lead quote in the Quote register at up to 3rem; two supporting quotes in Inter at 1.0625rem in a two-column row under a hairline. Every attribution is name in 600 Lavender White, then role and year in Muted Orchid.

### Duotone photography
Portraits and stage photos at section scale are greyscaled (contrast 1.08, brightness 0.92), blended as luminosity over `oklch(0.3 0.08 285)`, and multiplied under a deep-lilac-to-shadow gradient. Small headshots (the 48px avatar in the session card, the 32px author avatar on posts) and episode thumbnails stay true color, as a program headshot or a show still would.

### Icons
IconMCP outline glyphs and official brand marks, vendored (`docs/icons.md`). Rows use `size-4` to `size-5`; color is Muted Orchid unless the icon stands for a channel or a status.

**The Bare Icon Rule.** No tinted square, disc or tile behind a glyph, and no icon in a section header. `tests/design/no-icon-chips.test.ts` enforces it.

### Cookie notice
A compact `hp-card` pinned 1rem from the bottom: a centered 52rem bar on desktop, full-width minus 1rem gutters on mobile. A bold "Cookies." lead-in, Muted Orchid copy, a small primary, a ghost "Necessary only" and a bare close glyph.

## Do's and Don'ts

### Do:
- **Do** paint `<html>` and `<body>` Studio Shadow and keep `color-scheme: dark`.
- **Do** open every page with `page-hero` (field, grain, `stagger` entrance) and alternate `hp-section` bands between Studio Shadow and Lifted Shadow.
- **Do** head sections with `SectionHead`: bold tight headline, optional Muted Orchid step, lede beneath.
- **Do** give each band at most one deep-lilac primary, paired with at most one ghost link.
- **Do** set proof as ledger rows with dates in lavender mono tabular figures.
- **Do** use native controls: radio inputs for single choices, `aria-pressed` buttons for multi-select, `<details>` for FAQ, links for navigation.
- **Do** animate transform, opacity and (for `swap-in` only) a 4px blur with `--hp-ease` (`cubic-bezier(0.25, 1, 0.5, 1)`): 200 to 280ms for state, one 620ms entrance staggered by 80ms per page, 14s for the ambient field.
- **Do** keep the reduced-motion kill switches: the field stops breathing, entrances and swaps become short fades, content stays visible.
- **Do** grade section-scale photography of Jarrett into the duotone.

### Don't:
- **Don't** put eyebrows, kickers or section-index labels above headings; a mono meta line carries a fact or nothing.
- **Don't** put icons in chips, tiles or discs, or in section headers; don't import Lucide, Heroicons, Tabler or react-icons.
- **Don't** make buttons pills; pills are for chips, the avatar, chrome dots and the pip.
- **Don't** present proof as card grids, stat bands or logo walls.
- **Don't** use glows, gradient text or glass cards; the scrolled header is the only blur.
- **Don't** use the legacy hex palettes in `tailwind.config.ts` (`shadow`, `indigo`, `orchid`, `lilac`, `lavender`, `skyward`, `website`) or the alias variant names for new work; use the `hp-*` tokens.
- **Don't** set Montserrat below about 1.3rem; hand smaller headings to Inter Bold.
- **Don't** use pure black or pure white.
- **Don't** brand the site as TrueTone AI; the signature logo and Jarrett's name identify it.
