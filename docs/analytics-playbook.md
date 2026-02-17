# Analytics Playbook

A comprehensive reference for analytics architecture, event tracking, MCP-powered monitoring, and new website setup. Written for JarrettStanley.com and reusable across future Next.js projects.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [MCP Server Setup Guide](#2-mcp-server-setup-guide)
3. [Complete Event Taxonomy](#3-complete-event-taxonomy)
4. [Naming Conventions](#4-naming-conventions)
5. [Conversion Definitions & Values](#5-conversion-definitions--values)
6. [UTM Parameter Strategy](#6-utm-parameter-strategy)
7. [New Website Checklist](#7-new-website-checklist)
8. [GTM Tag Management via MCP](#8-gtm-tag-management-via-mcp)
9. [GA4 Configuration Checklist](#9-ga4-configuration-checklist)
10. [Testing & QA Checklist](#10-testing--qa-checklist)
11. [Dashboard & Monitoring via MCP](#11-dashboard--monitoring-via-mcp)
12. [Ongoing Monitoring Playbook](#12-ongoing-monitoring-playbook)
13. [Environment Variables Reference](#environment-variables-reference)

---

## 1. Architecture Overview

The analytics stack is built on four layers, each serving a distinct purpose and gated behind user consent.

### Stack Components

| Layer | Tool | Purpose |
|---|---|---|
| Page analytics | GA4 via direct `gtag.js` | Pageviews, events, conversions, audience insights |
| Tag management | GTM (lightweight container) | Ad pixel delivery only (Meta, LinkedIn, Google Ads) |
| Session recording | Microsoft Clarity | Heatmaps, session replays, rage click detection |
| Web vitals | Vercel Analytics | Core Web Vitals (LCP, CLS, FID/INP) |

**Important distinction:** GA4 is loaded directly via `gtag.js`, not through GTM. GTM is used exclusively as a lightweight container for ad/marketing pixels. This keeps the GA4 implementation simple and debuggable while still allowing flexible pixel management through GTM.

- **GA4 Property ID:** 494919018

### Cookie Consent System

Consent is managed with three categories:

| Category | Scripts Gated | Required for Site Function |
|---|---|---|
| `necessary` | None (always active) | Yes |
| `analytics` | GA4, Microsoft Clarity | No |
| `marketing` | GTM container (all ad pixels) | No |

**Consent gating rules:**
- GA4 + Clarity load only after the user grants **analytics** consent.
- GTM + all ad pixels load only after the user grants **marketing** consent.
- If a user declines all optional cookies, zero third-party tracking scripts are loaded.

### Key Files

| File | Purpose |
|---|---|
| `src/lib/analytics.ts` | 20+ typed tracking functions, all consent-gated. This is the single source of truth for event dispatch. |
| `src/lib/gtm.ts` | GTM dataLayer push helpers for conversion events consumed by ad pixels. |
| `src/components/analytics/analytics-provider.tsx` | Script loader for GA4, Clarity, and Google Ads. Checks analytics consent before injecting scripts. |
| `src/components/analytics/gtm-provider.tsx` | Script loader for the GTM container. Checks marketing consent before injecting. |
| `src/components/analytics/cookie-consent.tsx` | Consent banner UI and `hasConsentFor()` utility function used by all providers. |
| `src/components/analytics/scroll-tracker.tsx` | Fires `scroll_depth` events at 25%, 50%, 75%, and 100% thresholds. |
| `src/components/analytics/performance-monitor.tsx` | Reports Web Vitals (LCP, CLS, FID/INP, TTFB) to GA4. |

---

## 2. MCP Server Setup Guide

Three MCP servers enable AI-powered analytics monitoring directly from Claude. All are installed globally with the `-s user` scope so they are available across all projects.

### GTM MCP (Read-Write)

Provides full read-write access to Google Tag Manager containers. Use it to create, update, delete, and publish tags, triggers, and variables entirely via Claude.

| Setting | Value |
|---|---|
| Name | `gtm` |
| URL | `https://mcp.gtmeditor.com` |
| Type | HTTP |
| Auth | OAuth 2.1 with PKCE (browser-based login on first use) |

**Capabilities:**
- Create, update, and delete containers, tags, triggers, and variables
- Publish container versions
- Full workspace management

**Installation:**
```bash
claude mcp add -s user -t http gtm https://mcp.gtmeditor.com
```

### GA4 MCP (Read-Only)

Provides read-only access to GA4 reporting. Use it to pull traffic reports, check real-time users, and analyze conversion data via Claude.

| Setting | Value |
|---|---|
| Name | `ga4` |
| Package | `@anthropic/google-analytics-mcp` |
| Auth | Google service account JSON |

**Required environment variables:**
- `GOOGLE_APPLICATION_CREDENTIALS` — Path to the service account JSON key file
- `GA4_PROPERTY_ID` — Numeric GA4 property ID (e.g., `494919018`)

**Capabilities:**
- `run_report` — Standard reports with date ranges, dimensions, metrics, and filters
- `run_realtime_report` — Real-time active users and page data
- `get_account_summaries` — List all accessible GA4 properties

**Installation:**
```bash
claude mcp add -s user ga4 -- npx -y @anthropic/google-analytics-mcp
```

### GSC MCP (Read-Only)

Provides read-only access to Google Search Console data. Use it to check search rankings, find optimization opportunities, and monitor indexing via Claude.

| Setting | Value |
|---|---|
| Name | `gsc` |
| Package | `mcp-server-gsc` |
| Auth | Google service account JSON |

**Required environment variables:**
- `GOOGLE_APPLICATION_CREDENTIALS` — Path to the service account JSON key file

**Capabilities:**
- `search_analytics` — Query performance data with up to 25,000 rows
- Regex filtering on queries, pages, countries, and devices
- Date range comparisons

**Installation:**
```bash
claude mcp add -s user gsc -- npx -y mcp-server-gsc
```

### Service Account Setup (Shared by GA4 + GSC MCPs)

1. Go to Google Cloud Console > IAM & Admin > Service Accounts.
2. Create a service account (e.g., `analytics-mcp@your-project.iam.gserviceaccount.com`).
3. Download the JSON key file and store it securely.
4. Set `GOOGLE_APPLICATION_CREDENTIALS` to the absolute path of the JSON key file.
5. In GA4: Admin > Property Access Management > Add the service account email with **Viewer** role.
6. In GSC: Settings > Users and permissions > Add the service account email as a **Full** user.

---

## 3. Complete Event Taxonomy

Every event fired by the site, organized by category.

| Event | Category | Trigger | Properties |
|---|---|---|---|
| `page_view` | — | Route change | `page_title`, `page_location` |
| `form_submit` | `lead_generation` | Form submission | `form_name`, `form_type`, `conversion_type` |
| `cta_click` | `engagement` | CTA button click | `cta_name`, `cta_location`, `cta_type` |
| `external_link_click` | `navigation` / `social` | Outbound link click | `link_url`, `link_text`, `link_type` |
| `content_view` | `content` | Page load | `content_type`, `content_title` |
| `content_read_progress` | `content` | Scroll milestone | `content_type`, `read_progress` (25/50/75/100) |
| `content_download` | `content` | Download click | `content_type`, `content_title` |
| `resource_download` | `conversion` | Resource download | `resource_name`, `resource_type` |
| `speaking_inquiry` | `lead_generation` | Speaking form or Calendly booking | `inquiry_type`, `speaking_topic` |
| `consulting_inquiry` | `lead_generation` | Consulting form submission | `inquiry_type`, `service_type` |
| `newsletter_signup` | `lead_generation` | Newsletter form submission | `signup_location`, `lead_magnet` |
| `campaign_attribution` | `engagement` | UTM parameters detected on page load | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` |
| `scroll_depth` | `engagement` | 25%, 50%, 75%, 100% scroll thresholds | `scroll_depth`, `page_url` |
| `funnel_step` | `conversion` | Funnel progression | `funnel_name`, `funnel_step`, `step_number` |
| `video_play` | `content` | Video starts playing | `video_title`, `video_progress` |
| `video_pause` | `content` | Video paused | `video_title`, `video_progress` |
| `video_complete` | `content` | Video reaches end | `video_title`, `video_progress` |
| `site_search` | `engagement` | Search query submitted | `search_term`, `result_count` |
| `file_download` | `conversion` | File download initiated | `file_name`, `file_type` |
| `error` | `errors` | JavaScript or API error | `error_type`, `error_message`, `fatal` |

---

## 4. Naming Conventions

Consistent naming makes reports readable and prevents duplicate or ambiguous events.

### Events
- Format: `snake_case`
- Examples: `speaking_inquiry`, `form_submit`, `cta_click`, `scroll_depth`

### Categories
- Format: `snake_case`
- Values: `lead_generation`, `engagement`, `content`, `conversion`, `navigation`, `social`, `errors`

### Form Types
- `contact` — General contact form
- `newsletter` — Email newsletter signup
- `consulting` — Consulting inquiry form
- `resource_download` — Gated resource download form

### CTA Types
- `speaking` — Speaking engagement CTAs
- `consulting` — Consulting service CTAs
- `truetone` — TrueTone AI product CTAs
- `newsletter` — Newsletter signup CTAs
- `resource` — Resource/download CTAs

### Link Types
- `social` — Social media profile links
- `external` — General outbound links
- `truetone` — Links to TrueTone AI
- `calendly` — Calendly booking links

---

## 5. Conversion Definitions & Values

Conversions are ranked by business priority and assigned dollar values for Google Ads optimization.

| Conversion | Event | Google Ads Value | Priority |
|---|---|---|---|
| Speaking Inquiry | `speaking_inquiry` | $500 | High |
| Consulting Inquiry | `consulting_inquiry` | $2,000 | High |
| Newsletter Signup | `newsletter_signup` | $10 | Medium |
| Contact Form | `form_submit` | $100 | Medium |
| Resource Download | `resource_download` | $25 | Low |

**High-value conversion flag:** Both `speaking_inquiry` and `consulting_inquiry` events include the property `high_value_conversion: true`. This flag can be used in GA4 audiences, GTM triggers, and ad platform optimization signals to prioritize these conversions.

---

## 6. UTM Parameter Strategy

### Naming Rules

| Parameter | Format | Description |
|---|---|---|
| `utm_source` | Platform name, lowercase | Where the traffic comes from (e.g., `linkedin`, `google`, `email`) |
| `utm_medium` | Traffic type, lowercase | How the traffic arrives (e.g., `organic`, `paid`, `email`, `social`, `referral`) |
| `utm_campaign` | Descriptive, kebab-case | Campaign identifier (e.g., `q1-2026-speaking-promo`) |
| `utm_content` | Descriptive, kebab-case | A/B test variant or creative ID (e.g., `banner-v2`, `headshot-cta`) |
| `utm_term` | Keyword, lowercase | Paid search keyword (e.g., `mortgage+marketing+speaker`) |

### Standard Examples

**LinkedIn organic post:**
```
?utm_source=linkedin&utm_medium=social&utm_campaign=thought-leadership
```

**Email newsletter:**
```
?utm_source=newsletter&utm_medium=email&utm_campaign=the-signal-issue-9
```

**Google Ads campaign:**
```
?utm_source=google&utm_medium=paid&utm_campaign=speaking-lead-gen
```

**Conference speaker bio link:**
```
?utm_source=conference-name&utm_medium=referral&utm_campaign=speaker-bio
```

---

## 7. New Website Checklist

A step-by-step guide for setting up the full analytics stack on a new website.

### Step 1: Google Search Console

- [ ] Add property (domain verification or URL prefix)
- [ ] Verify ownership via HTML meta tag (set `GOOGLE_VERIFICATION` env var, render in `<head>`)
- [ ] Submit sitemap (typically `https://yourdomain.com/sitemap.xml`)
- [ ] Add the service account email as a user (for GSC MCP access)

### Step 2: GA4 Property

- [ ] Create a new GA4 property in Google Analytics
- [ ] Get the Measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
- [ ] Get the numeric Property ID from Admin > Property Settings (for MCP access)
- [ ] Set `GA4_PROPERTY_ID` environment variable
- [ ] Create a service account with **Viewer** role on the property
- [ ] Download the JSON key file and set `GOOGLE_APPLICATION_CREDENTIALS`

### Step 3: GTM Container (via MCP)

- [ ] Use the GTM MCP to create a new Web container
- [ ] Enable built-in variables: Click Text, Click URL, Form ID, Page Path, Page URL
- [ ] Create custom dataLayer variables for `form_type` and `conversion_type`
- [ ] Create conversion triggers (e.g., `form_conversion`, `newsletter_conversion`, `speaking_conversion`)
- [ ] Set `NEXT_PUBLIC_GTM_ID` environment variable
- [ ] Publish the initial container version

### Step 4: Cookie Consent

- [ ] Implement consent banner with three categories: necessary, analytics, marketing
- [ ] Gate analytics scripts (GA4, Clarity) behind **analytics** consent
- [ ] Gate marketing scripts (GTM and all ad pixels) behind **marketing** consent
- [ ] **Test: Decline all** -- Verify zero tracking requests in the Network tab
- [ ] **Test: Accept all** -- Verify all scripts load and fire correctly

### Step 5: Code Integration

- [ ] Add `analytics-provider.tsx` to the app (loads GA4, Clarity, Google Ads scripts)
- [ ] Add `gtm-provider.tsx` to the app (loads GTM container)
- [ ] Wire both providers into the root layout (`src/app/layout.tsx`)
- [ ] Implement tracking functions from `analytics.ts` on interactive elements
- [ ] Add dataLayer pushes in `gtm.ts` for conversion events consumed by ad pixels

---

## 8. GTM Tag Management via MCP

GTM is managed entirely through the GTM MCP server. Below are patterns for the most common ad pixel setups.

### Adding Google Ads Pixel

Using the GTM MCP, create the following:

**Tag:**
- Type: Google Ads Conversion Tracking (`awct`)
- Conversion ID: From `NEXT_PUBLIC_GOOGLE_ADS_ID` env var
- Conversion Label: From the specific conversion action in Google Ads

**Trigger:**
- Type: Custom Event
- Event name: `form_conversion` (pushed to dataLayer on form submission)

**Variables:**
- `conversionId` — DataLayer variable mapped to the Google Ads account ID
- `conversionLabel` — DataLayer variable mapped to the specific conversion label

### Adding Meta Pixel

Using the GTM MCP, create the following:

**Base tag:**
- Type: Custom HTML
- Content: Meta Pixel base code (`fbq('init', 'PIXEL_ID')` + `fbq('track', 'PageView')`)
- Trigger: All Pages

**Event tags (one per conversion):**
- Type: Custom HTML
- Content: `fbq('track', 'Lead')` for speaking/consulting inquiries
- Content: `fbq('track', 'CompleteRegistration')` for newsletter signups
- Triggers: Respective custom event triggers from the dataLayer

### Adding LinkedIn Insight Tag

Using the GTM MCP, create the following:

**Base tag:**
- Type: Custom HTML
- Content: LinkedIn Insight Tag base code with partner ID
- Trigger: All Pages

**Conversion tags:**
- Type: Custom HTML
- Content: LinkedIn conversion tracking events
- Triggers: Respective custom event triggers matching the conversion events

---

## 9. GA4 Configuration Checklist

After the property is created and collecting data, configure these settings:

- [ ] **Mark key events as conversions:** `speaking_inquiry`, `consulting_inquiry`, `newsletter_signup`, `form_submit`, `resource_download`
- [ ] **Create custom dimensions:**
  - `form_type` (event-scoped)
  - `cta_type` (event-scoped)
  - `cta_location` (event-scoped)
  - `content_type` (event-scoped)
- [ ] **Link to Google Search Console:** Admin > Product Links > Search Console
- [ ] **Set data retention to 14 months:** Admin > Data Settings > Data Retention
- [ ] **Enable Google Signals:** Admin > Data Settings > Data Collection (enables demographics and cross-device reporting)
- [ ] **Set up custom audiences for remarketing:**
  - High-intent visitors (viewed speaking or consulting pages)
  - Blog readers (viewed 3+ blog posts)
  - Converters (completed any conversion event)
- [ ] **Configure cross-domain tracking** if needed (e.g., separate domain for booking)

---

## 10. Testing & QA Checklist

Run through this checklist before and after any analytics changes.

- [ ] **Consent: Decline all** — Open an incognito window, decline all cookies, then check the Network tab. There should be zero requests to GA4 (`google-analytics.com`), Clarity (`clarity.ms`), or GTM (`googletagmanager.com`).

- [ ] **Consent: Accept all** — Accept all cookies. Append `?debug_mode=true` to the URL. Open GA4 DebugView (Admin > DebugView) and confirm a `page_view` event appears.

- [ ] **GTM Preview** — Open GTM Preview mode (`https://tagmanager.google.com` > Preview). Navigate the site and verify tags fire on the correct triggers.

- [ ] **Tag Assistant** — Install the Google Tag Assistant Chrome extension. Verify the GA4 config tag is detected with the correct Measurement ID.

- [ ] **No duplicate pageviews** — In GA4 DebugView, navigate between pages. Each navigation should produce exactly one `page_view` event, not two.

- [ ] **DataLayer verification** — Submit a form on the site. Open the browser console and type `window.dataLayer`. Verify the conversion event object is present with the correct event name and properties.

- [ ] **Google Ads verification** — If Google Ads conversion tracking is configured, verify the conversion event includes the correct `send_to` parameter with the Ads account ID and conversion label.

- [ ] **Search Console verification** — View the page source and confirm the `<meta name="google-site-verification" content="...">` tag is present in the `<head>`.

- [ ] **Performance impact** — Run Lighthouse before and after analytics changes. Confirm LCP, CLS, and TBT remain within acceptable ranges (no significant regression).

- [ ] **Build verification** — Run `npm run build` and confirm it passes with zero errors.

---

## 11. Dashboard & Monitoring via MCP

Use these prompts with Claude to pull analytics data via the MCP servers.

### GA4 MCP Example Queries

**Traffic overview (last 7 days):**
> "Use the GA4 MCP to run a report for the last 7 days showing sessions, users, and pageviews by page path."

**Conversion funnel:**
> "Show me all speaking_inquiry and consulting_inquiry events from the last 30 days with their sources."

**Top content:**
> "What are the top 20 pages by pageviews in the last 30 days?"

**Real-time monitoring:**
> "Show me real-time active users and what pages they're viewing."

### GSC MCP Example Queries

**Ranking overview:**
> "Show me the top 50 queries driving traffic to jarrettstanley.com in the last 28 days."

**Quick wins (positions 5-20):**
> "Find pages ranking in positions 5-20 that could be optimized for higher rankings."

**New content performance:**
> "How are blog posts performing in search? Show queries for /blog/ pages."

---

## 12. Ongoing Monitoring Playbook

### Weekly Check-in (via Claude)

Run these three prompts each week to stay on top of trends:

1. **Traffic trend:** "What's my traffic trend this week vs last week?" (GA4 MCP)
2. **New queries:** "Any new search queries appearing for my site?" (GSC MCP)
3. **Conversions:** "How many conversions happened this week?" (GA4 MCP)

### Monthly Review

A deeper analysis at the end of each month:

1. **Full report:** "Give me a full traffic and conversion report for last month." (GA4 MCP)
2. **Search growth:** "What are my top-growing search queries?" (GSC MCP)
3. **Source performance:** "Show me my conversion rates by source/medium." (GA4 MCP)
4. **Technical SEO:** "Are there any technical SEO issues? Check for pages with high impressions but low clicks." (GSC MCP)

### After Publishing New Content

Run these checks after each new blog post or page goes live:

1. **Index check:** "Check if [new page URL] is indexed." (GSC MCP)
2. **Real-time traffic:** "Show real-time activity on [new page URL]." (GA4 MCP)
3. **Ranking emergence (1-2 weeks later):** "What queries is [new page URL] starting to rank for?" (GSC MCP)

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | GA4 Measurement ID (format: `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | No | Microsoft Clarity project ID |
| `NEXT_PUBLIC_GTM_ID` | No | GTM container ID (format: `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | No | Google Ads account ID (format: `AW-XXXXXXXXX`) |
| `GOOGLE_VERIFICATION` | No | Google Search Console HTML verification code |
| `GA4_PROPERTY_ID` | No | Numeric GA4 property ID (for GA4 MCP server) |
| `GOOGLE_APPLICATION_CREDENTIALS` | No | Absolute path to service account JSON key file (shared by GA4 + GSC MCPs) |
