# Speaking Page Documentation

## Overview
The Speaking page showcases Jarrett Stanley as a keynote speaker and thought leader in AI-powered mortgage marketing. It includes sections for speaker reel, signature topics, past engagements, testimonials, upcoming events, speaker kit download, and booking information.

## Components Structure

### Main Page Component
- **Location**: `/src/app/speaking/page.tsx`
- **Purpose**: Main page layout that imports and arranges all speaking sections

### Section Components
All located in `/src/components/sections/speaking/`:

1. **speaking-hero.tsx**
   - Hero section with video placeholder
   - Speaker statistics
   - CTA buttons for watching reel and booking

2. **signature-topics.tsx**
   - Four main speaking topics with detailed takeaways
   - Icons and card-based layout

3. **past-engagements.tsx**
   - Logo grid of past conferences/organizations
   - Event photo gallery with modal view
   - Notable engagements list

4. **speaking-testimonials.tsx**
   - Database-integrated testimonials
   - Filters by service_type = 'speaking'
   - Star ratings display
   - Fallback to placeholder data

5. **upcoming-events.tsx**
   - Database-integrated event listing
   - Shows future events from speaking_events table
   - Event type badges and featured events
   - Registration links

6. **speaker-kit.tsx**
   - Downloadable speaker kit information
   - Technical requirements
   - Kit contents preview

7. **book-jarrett.tsx**
   - Contact options (calendar, email, phone)
   - Booking information
   - Calendly widget integration

### Supporting Components

**calendly-widget.tsx**
- Modal dialog for Calendly integration
- Loads Calendly external widget script
- Responsive design

## Database Schema

### Tables Created

1. **testimonials**
   - Stores all testimonials with service_type field
   - Rating system (1-5 stars)
   - Can be filtered for speaking-specific testimonials

2. **speaking_events**
   - Stores past and upcoming speaking engagements
   - Event types: keynote, panel, workshop, webinar
   - Featured events capability
   - Registration URL support

### Sample Data
The migration file includes sample data for both tables to demonstrate functionality during development.

## Setup Instructions

1. **Database Migration**
   Run the migration file to create tables:
   ```sql
   -- Execute the contents of:
   -- /src/lib/database-migrations/001_create_speaking_tables.sql
   ```

2. **Environment Variables**
   Ensure these are set in your `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Calendly Integration**
   Update the Calendly URL in `book-jarrett.tsx`:
   ```tsx
   url="https://calendly.com/jarrettstanley/speaking-inquiry"
   ```

4. **Assets Needed**
   - Speaker reel video
   - Event photos for gallery
   - Conference/organization logos
   - Professional headshots
   - Speaker kit ZIP file

## Customization

### Adding New Speaking Topics
Edit the `topics` array in `signature-topics.tsx`

### Updating Contact Information
Modify contact details in `book-jarrett.tsx`

### Changing Event Types
Update the event_type enum in both the database and component files

### Styling
All components use Tailwind CSS with the project's design system:
- Purple gradient backgrounds
- Signal font for headings
- Consistent card styling
- Responsive grid layouts

## Future Enhancements

1. **Admin Interface**
   - Add/edit testimonials
   - Manage speaking events
   - Update speaker kit

2. **Analytics**
   - Track speaker kit downloads
   - Monitor booking conversions
   - Event registration tracking

3. **Enhanced Features**
   - Video testimonials
   - Live streaming integration
   - Speaker rating system
   - Automated booking confirmation