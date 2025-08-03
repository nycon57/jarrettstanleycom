# Analytics Implementation Guide

This document outlines the comprehensive analytics and tracking implementation for JarrettStanley.com, designed to provide actionable insights for business growth.

## Overview

The analytics implementation includes:
- **Google Analytics 4** for comprehensive web analytics
- **Microsoft Clarity** for user behavior insights and heatmaps
- **Custom event tracking** for business-critical actions
- **Privacy-compliant** cookie consent management
- **UTM parameter tracking** for campaign attribution

## Architecture

### Core Components

1. **Analytics Utility** (`src/lib/analytics.ts`)
   - Central analytics functions and event tracking
   - Google Analytics 4 and Microsoft Clarity initialization
   - UTM parameter management and attribution
   - Custom event definitions and tracking methods

2. **Analytics Provider** (`src/components/analytics/analytics-provider.tsx`)
   - Script loading and initialization
   - Page view tracking on route changes
   - UTM parameter storage for attribution

3. **Analytics Hook** (`src/hooks/use-analytics.ts`)
   - React hook for component-level analytics
   - Pre-configured tracking methods for common actions
   - Conversion funnel tracking helpers

4. **Tracking Components**
   - `TrackedButton`: Button component with automatic CTA tracking
   - `TrackedLink`: Link component with click tracking
   - `ScrollTracker`: Scroll depth tracking wrapper
   - `ReadingProgress`: Blog post engagement tracking

5. **Cookie Consent** (`src/components/analytics/cookie-consent.tsx`)
   - GDPR/privacy-compliant consent management
   - Granular consent for different tracking types
   - User-friendly consent interface

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
NEXT_PUBLIC_SITE_URL=https://jarrettstanley.com
```

### 2. Google Analytics 4 Setup

1. Create a GA4 property in Google Analytics
2. Copy the Measurement ID (format: G-XXXXXXXXXX)
3. Add it to your environment variables
4. The implementation will automatically:
   - Load GA4 scripts
   - Track page views
   - Send custom events
   - Track conversions

### 3. Microsoft Clarity Setup

1. Create a project in Microsoft Clarity
2. Copy the Project ID
3. Add it to your environment variables
4. Clarity will automatically track:
   - User sessions and recordings
   - Heatmaps and click patterns
   - Custom events from the application

## Tracked Events

### Lead Generation Events

#### Contact Form
- **Form Start**: User begins typing in contact form
- **Form Submit**: User successfully submits contact form
- **Form Error**: Contact form submission fails

#### Newsletter Signup
- **Signup Start**: User focuses on newsletter form
- **Signup Submit**: User successfully subscribes to newsletter
- **Signup Error**: Newsletter subscription fails

#### Consulting Inquiry
- **Form Start**: User begins consulting inquiry form
- **Form Submit**: User successfully submits consulting inquiry
- **Form Error**: Consulting form submission fails

#### Speaking Inquiries
- **Calendly Click**: User clicks to open speaking booking calendar
- **Email Click**: User clicks speaking inquiry email link
- **Phone Click**: User clicks speaking inquiry phone number

### Content Engagement

#### Blog Posts
- **Page View**: User visits blog post
- **Reading Progress**: Tracked at 25%, 50%, 75%, 100% milestones
- **Share Click**: User clicks social share buttons

#### Resource Downloads
- **Download Request**: User requests gated content
- **Download Complete**: User successfully downloads resource

### Navigation & Interaction

#### CTA Tracking
- **Speaking CTA**: Clicks on speaking-related CTAs
- **Consulting CTA**: Clicks on consulting-related CTAs
- **TrueTone AI CTA**: Clicks on TrueTone AI links
- **Newsletter CTA**: Clicks on newsletter signup CTAs

#### External Links
- **Social Media**: Clicks on social media links
- **External Sites**: Clicks on external website links
- **Email Links**: Clicks on mailto: links
- **Phone Links**: Clicks on tel: links

#### Scroll Depth
- **Scroll Tracking**: Page scroll depth at 25%, 50%, 75%, 100%

### Conversion Funnels

#### Contact Conversion Funnel
1. **Page Load**: User visits contact page
2. **Form Start**: User begins filling contact form
3. **Form Submit**: User submits contact form

#### Speaking Inquiry Funnel
1. **Page Load**: User visits speaking page
2. **Calendly Click**: User clicks scheduling link
3. **Calendar Open**: Calendly widget opens

#### Newsletter Conversion Funnel
1. **Signup Start**: User begins newsletter signup
2. **Signup Submit**: User completes newsletter signup

## Data Insights & Business Metrics

### Lead Generation Metrics
- **Contact Form Conversion Rate**: Form starts vs. submissions
- **Newsletter Signup Rate**: Signups per page visit
- **Speaking Inquiry Rate**: Calendar clicks per speaking page visit
- **Consulting Inquiry Rate**: Form submissions per consulting page visit

### Content Performance
- **Blog Engagement**: Reading progress and time on page
- **Popular Topics**: Most viewed blog categories
- **Share Rate**: Social media sharing frequency
- **Content Funnel**: Blog visits → contact form submissions

### Campaign Attribution
- **UTM Tracking**: Campaign source, medium, campaign attribution
- **Referrer Analysis**: Traffic source effectiveness
- **Landing Page Performance**: Conversion rates by entry page

### User Journey Analysis
- **Conversion Paths**: Most common paths to conversion
- **Drop-off Points**: Where users exit the funnel
- **High-Value Actions**: Actions that correlate with conversions

## Usage Examples

### Basic Event Tracking

```tsx
import { useAnalytics } from '@/hooks/use-analytics';

function MyComponent() {
  const { trackCTA, trackLink } = useAnalytics();

  const handleCTAClick = () => {
    trackCTA('Schedule Consultation', 'hero_section', 'consulting');
  };

  const handleExternalLink = () => {
    trackLink('https://truetoneai.com', 'Visit TrueTone AI', 'truetone');
  };

  return (
    <div>
      <button onClick={handleCTAClick}>Schedule Consultation</button>
      <a href="https://truetoneai.com" onClick={handleExternalLink}>
        TrueTone AI
      </a>
    </div>
  );
}
```

### Form Tracking

```tsx
import { useAnalytics } from '@/hooks/use-analytics';

function ContactForm() {
  const { trackContactFormStart, trackContactFormSubmit } = useAnalytics();

  const handleFormStart = () => {
    trackContactFormStart();
  };

  const handleSubmit = (formData) => {
    // ... form submission logic
    trackContactFormSubmit({
      inquiry_type: formData.type,
      has_company: !!formData.company,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleFormStart} />
      {/* ... rest of form */}
    </form>
  );
}
```

### Tracked Components

```tsx
import { TrackedButton } from '@/components/analytics/tracked-button';
import { TrackedLink } from '@/components/analytics/tracked-link';

function Hero() {
  return (
    <div>
      <TrackedButton
        trackingData={{
          ctaName: 'Book Speaking Engagement',
          ctaLocation: 'hero_section',
          ctaType: 'speaking'
        }}
      >
        Book Jarrett
      </TrackedButton>

      <TrackedLink
        href="https://truetoneai.com"
        trackingData={{
          linkText: 'Learn about TrueTone AI',
          linkType: 'truetone'
        }}
        external
      >
        TrueTone AI
      </TrackedLink>
    </div>
  );
}
```

## Privacy & Compliance

### Cookie Consent
- **Granular Control**: Users can consent to specific tracking types
- **Essential Cookies**: Always enabled for site functionality
- **Analytics Cookies**: Optional, for Google Analytics and Clarity
- **Marketing Cookies**: Optional, for campaign tracking

### Data Collection
- **No PII**: Personal information is not tracked in analytics
- **Anonymized Data**: All tracking data is anonymized
- **User Control**: Users can opt-out via cookie preferences
- **GDPR Compliant**: Follows GDPR data protection guidelines

### Data Retention
- **Google Analytics**: 26 months (configurable)
- **Microsoft Clarity**: 30 days for recordings, 1 year for heatmaps
- **Custom Events**: Follows GA4 retention settings

## Performance Considerations

### Script Loading
- **Async Loading**: Analytics scripts load asynchronously
- **Performance Impact**: Minimal impact on Core Web Vitals
- **Error Handling**: Graceful fallbacks if scripts fail to load

### Event Batching
- **Debounced Events**: Scroll and progress events are debounced
- **Batch Processing**: Multiple events are batched when possible
- **Rate Limiting**: Prevents excessive event firing

## Monitoring & Maintenance

### Regular Reviews
- **Monthly Analytics Review**: Analyze key metrics and trends
- **Quarterly Goal Assessment**: Measure against business objectives
- **Annual Strategy Review**: Adjust tracking based on business evolution

### Data Quality
- **Event Validation**: Ensure events are firing correctly
- **Data Accuracy**: Verify tracking matches actual user behavior
- **Cross-Platform Consistency**: Ensure tracking works across devices

### Troubleshooting
- **Console Logging**: Development mode includes detailed logging
- **GTM Integration**: Ready for Google Tag Manager if needed
- **Testing Tools**: Use GA4 DebugView and Clarity dashboard for testing

## Business Impact

### Expected Outcomes
- **Lead Quality**: Better understanding of high-converting traffic sources
- **Content Strategy**: Data-driven content creation based on engagement
- **Campaign ROI**: Improved marketing spend allocation
- **User Experience**: Insights into user behavior for UX optimization

### Key Performance Indicators
- **Monthly Lead Generation**: Track month-over-month growth
- **Conversion Rate Optimization**: Improve form and CTA performance
- **Content Engagement**: Increase blog reading completion rates
- **Campaign Attribution**: Measure marketing channel effectiveness

This analytics implementation provides JarrettStanley.com with enterprise-level tracking capabilities while maintaining user privacy and providing actionable business insights.