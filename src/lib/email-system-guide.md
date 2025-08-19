# Complete Resend Email System Implementation

This document outlines the complete Resend email notification system that has been implemented for the JarrettStanley.com website.

## Overview

The system provides:
- ✅ **Database logging** of all email activity
- ✅ **Webhook processing** for delivery tracking
- ✅ **Enhanced email templates** with React Email components
- ✅ **Retry logic** for failed emails  
- ✅ **API endpoints** for email management
- ✅ **Error handling** and monitoring
- ✅ **Professional branded templates**

## Environment Variables Required

```bash
# Required for email functionality
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional for testing and admin features
EMAIL_TEST_KEY=test-key-123
ADMIN_API_KEY=your_admin_key
RESEND_WEBHOOK_SECRET=your_webhook_secret
```

## Database Setup

1. **Run the migration**: Execute the SQL in `src/lib/database-migrations/003_create_email_system.sql`
2. **Tables created**:
   - `email_templates` - Store reusable email templates
   - `email_logs` - Track all outbound emails with status
   - `email_events` - Log webhook events from Resend

## Email Templates

### Location
- **Enhanced Templates**: `src/components/email/enhanced/`
- **Layout Components**: `src/components/email/components/`
- **Legacy Templates**: `src/components/email/` (deprecated)

### Available Templates
1. **Contact Confirmation** - User confirmation for contact form
2. **Contact Notification** - Admin notification for new contacts  
3. **Newsletter Welcome** - Welcome email for newsletter signups
4. **Speaking/Consulting/Media** - Specialized templates for each inquiry type

### Template Features
- ✅ Responsive design optimized for all email clients
- ✅ Branded purple gradient header matching website
- ✅ Professional typography and spacing
- ✅ Social media links and CTAs
- ✅ Type-specific content and priorities
- ✅ Mobile-optimized layout

## API Endpoints

### 1. Send Email - `/api/email/send`
```typescript
POST /api/email/send
Content-Type: application/json

{
  "to": "user@example.com",
  "subject": "Your subject",
  "templateName": "contact-confirmation",
  "react": ReactElement, // or html content
  "metadata": {
    "contact_type": "general",
    "user_email": "user@example.com"
  }
}
```

### 2. Webhook Handler - `/api/email/webhook`
```typescript
POST /api/email/webhook
// Processes Resend webhooks automatically
// Updates email status: sent, delivered, bounced, complained
```

### 3. Email Statistics - `/api/email/stats`
```typescript
GET /api/email/stats?period=7d&template=contact-confirmation

Response:
{
  "overall_stats": {
    "total": 100,
    "sent": 95,
    "delivered": 90,
    "failed": 5,
    "delivery_rate": 90.0,
    "success_rate": 95.0
  },
  "template_stats": [...],
  "recent_emails": [...]
}
```

### 4. Retry Failed Emails - `/api/email/retry`
```typescript
POST /api/email/retry
Authorization: Bearer your_admin_key

{
  "maxRetries": 3,
  "templateName": "contact-confirmation", // optional
  "hoursBack": 24
}
```

### 5. Test Endpoint - `/api/email/test`
```typescript
POST /api/email/test
Authorization: Bearer test-key-123

{
  "type": "contact", // or "newsletter"
  "email": "test@example.com",
  "name": "Test User"
}
```

## Email Service Usage

### Basic Email Sending
```typescript
import { sendEmail } from '@/lib/email-service';

const result = await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  templateName: 'newsletter-welcome',
  metadata: { source: 'website_signup' },
  react: React.createElement(WelcomeTemplate, { firstName: 'John' })
});
```

### Form Integration Example
```typescript
import { sendContactConfirmation, sendContactNotification, safeEmailSend } from '@/lib/email-service';

// In your form handler:
const success = await safeEmailSend(async () => {
  await sendContactConfirmation({
    name: 'John Doe',
    email: 'john@example.com', 
    message: 'Hello world',
    type: 'general'
  });
});

if (success) {
  console.log('Email sent successfully');
} else {
  console.log('Email failed after retries');
}
```

## Database Schema

### Email Logs Structure
```sql
email_logs (
  id UUID PRIMARY KEY,
  resend_id VARCHAR(255), -- Resend's email ID
  template_name VARCHAR(255),
  from_email VARCHAR(255) NOT NULL,
  to_email VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, delivered, failed, bounced, complained
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP,
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  -- ... additional tracking timestamps
)
```

## Webhook Configuration

1. **In Resend Dashboard**: Add webhook endpoint: `https://your-domain.com/api/email/webhook`
2. **Events to track**: 
   - `email.sent`
   - `email.delivered` 
   - `email.bounced`
   - `email.complained`
3. **Security**: Add `RESEND_WEBHOOK_SECRET` to verify webhook authenticity

## Monitoring & Analytics

### Email Statistics
- **Delivery rates** by template
- **Failed email** tracking and retry
- **Bounce and complaint** monitoring
- **Response time** analysis

### Available Metrics
```typescript
const stats = await getEmailStats('contact-confirmation', dateFrom, dateTo);
// Returns: total, sent, delivered, failed, bounced, delivery_rate, success_rate
```

## Error Handling

### Automatic Retry Logic
- **Failed emails** are automatically retried up to 3 times
- **Exponential backoff** between retries (1s, 2s, 4s)
- **Safe email sending** prevents form failures from email issues

### Error Logging
- All errors logged to database with full context
- **Email events** tracked for debugging
- **Webhook processing** errors captured

## Testing

### Test Email Sending
```bash
curl -X POST https://your-domain.com/api/email/test \
  -H "Authorization: Bearer test-key-123" \
  -H "Content-Type: application/json" \
  -d '{"type":"contact","email":"test@example.com","name":"Test User"}'
```

### Test Webhook Processing
```bash
curl -X POST https://your-domain.com/api/email/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email.delivered",
    "created_at": "2023-01-01T00:00:00Z",
    "data": {
      "email_id": "test-email-id",
      "to": ["test@example.com"],
      "from": "jarrett@jarrettstanley.com",
      "subject": "Test Email"
    }
  }'
```

## Best Practices

### 1. Template Management
- Use **enhanced templates** in `/enhanced/` folder
- Include **metadata** for all emails for analytics
- Set appropriate **templateName** for tracking

### 2. Error Handling
- Always use **safeEmailSend()** wrapper
- Don't let email failures break form submissions
- Monitor failed emails regularly

### 3. Performance
- Use **database logging** for email analytics
- Implement **retry logic** for transient failures
- Monitor **webhook processing** for real-time status

### 4. Security
- Verify **webhook signatures** in production
- Use **environment variables** for sensitive config
- Implement **rate limiting** for API endpoints

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check RESEND_API_KEY is valid
   - Verify "from" domain is configured in Resend
   - Check database connection for logging

2. **Webhooks not processing**
   - Verify webhook URL is accessible
   - Check RESEND_WEBHOOK_SECRET matches
   - Monitor API logs for webhook errors

3. **Template rendering issues**
   - Ensure React Email components are installed
   - Check template imports are correct
   - Verify template props match interface

4. **Database errors**
   - Run database migrations
   - Check service role permissions
   - Verify table structure matches schema

### Debug Commands
```bash
# Check email logs
SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 10;

# Check failed emails
SELECT * FROM email_logs WHERE status = 'failed';

# Check webhook events  
SELECT * FROM email_events ORDER BY occurred_at DESC LIMIT 10;

# Retry failed emails via API
curl -X GET https://your-domain.com/api/email/retry
```

## Next Steps

1. **Apply database migration** to create email tables
2. **Configure Resend webhooks** for delivery tracking  
3. **Test email flow** with test endpoint
4. **Monitor email analytics** via stats API
5. **Set up alerting** for high failure rates

The system is now ready for production use with comprehensive logging, error handling, and professional branded templates!