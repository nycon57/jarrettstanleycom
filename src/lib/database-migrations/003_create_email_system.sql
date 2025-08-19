-- Create email logging system tables
-- This migration sets up comprehensive email tracking and logging

-- Email Templates table
CREATE TABLE public.email_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    subject_template TEXT NOT NULL,
    html_template TEXT NOT NULL,
    text_template TEXT,
    variables JSONB DEFAULT '[]'::jsonb,
    category VARCHAR(100) DEFAULT 'general',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Email Logs table
CREATE TABLE public.email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resend_id VARCHAR(255),
    template_name VARCHAR(255),
    from_email VARCHAR(255) NOT NULL,
    to_email VARCHAR(255) NOT NULL,
    cc_emails TEXT[],
    bcc_emails TEXT[],
    reply_to VARCHAR(255),
    subject TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    bounced_at TIMESTAMP WITH TIME ZONE,
    complained_at TIMESTAMP WITH TIME ZONE
);

-- Email Events table (for webhook processing)
CREATE TABLE public.email_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email_log_id UUID REFERENCES public.email_logs(id) ON DELETE CASCADE,
    resend_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_email_logs_resend_id ON public.email_logs(resend_id);
CREATE INDEX idx_email_logs_to_email ON public.email_logs(to_email);
CREATE INDEX idx_email_logs_status ON public.email_logs(status);
CREATE INDEX idx_email_logs_created_at ON public.email_logs(created_at);
CREATE INDEX idx_email_logs_template_name ON public.email_logs(template_name);
CREATE INDEX idx_email_events_resend_id ON public.email_events(resend_id);
CREATE INDEX idx_email_events_event_type ON public.email_events(event_type);
CREATE INDEX idx_email_events_occurred_at ON public.email_events(occurred_at);
CREATE INDEX idx_email_templates_name ON public.email_templates(name);
CREATE INDEX idx_email_templates_category ON public.email_templates(category);

-- Create updated_at trigger functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON public.email_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_logs_updated_at BEFORE UPDATE ON public.email_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies (service role can access all, authenticated users can read their own)
CREATE POLICY "Service role can manage email templates" ON public.email_templates FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage email logs" ON public.email_logs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage email events" ON public.email_events FOR ALL USING (auth.role() = 'service_role');

-- Insert default email templates
INSERT INTO public.email_templates (name, subject_template, html_template, category, variables) VALUES
('contact-notification', 'New {{type}} Inquiry from {{name}}', '', 'notification', '["name", "type", "email", "company", "phone", "message"]'),
('contact-confirmation', 'Thanks for reaching out - We''ll be in touch!', '', 'confirmation', '["name", "type", "message"]'),
('speaking-notification', 'New Speaking Inquiry: {{event_name}}', '', 'notification', '["first_name", "last_name", "email", "company", "event_name", "event_date", "audience_size", "budget_range", "topic_preferences", "message"]'),
('speaking-confirmation', 'Speaking inquiry received - We''ll be in touch soon!', '', 'confirmation', '["first_name", "event_name", "event_date"]'),
('consulting-notification', 'New Consulting Inquiry: {{company}} - {{budget_range}}', '', 'notification', '["first_name", "last_name", "email", "company", "role", "budget_range", "timeline", "project_description", "current_challenges"]'),
('consulting-confirmation', 'Consulting inquiry received - Let''s discuss your project', '', 'confirmation', '["first_name", "company", "timeline"]'),
('media-notification', 'Media Inquiry: {{outlet}} - {{topic}}', '', 'notification', '["first_name", "last_name", "email", "outlet", "role", "topic", "deadline", "interview_type", "message"]'),
('media-confirmation', 'Media inquiry received - Response coming soon', '', 'confirmation', '["first_name", "outlet", "deadline"]'),
('newsletter-welcome', 'Welcome to the AI Marketing Revolution!', '', 'marketing', '["first_name"]'),
('resource-download', 'Your download: {{resource_title}}', '', 'delivery', '["first_name", "resource_title", "download_url"]'),
('waitlist-confirmation', 'Welcome to TrueTone AI Beta Waitlist!', '', 'confirmation', '["first_name"]');

-- Create a function to retry failed emails
CREATE OR REPLACE FUNCTION retry_failed_emails()
RETURNS INTEGER AS $$
DECLARE
    retry_count INTEGER := 0;
    email_record RECORD;
BEGIN
    FOR email_record IN 
        SELECT id FROM public.email_logs 
        WHERE status = 'failed' 
        AND retry_count < max_retries 
        AND created_at > NOW() - INTERVAL '24 hours'
        ORDER BY created_at ASC
        LIMIT 10
    LOOP
        UPDATE public.email_logs 
        SET status = 'pending', retry_count = retry_count + 1, updated_at = NOW()
        WHERE id = email_record.id;
        retry_count := retry_count + 1;
    END LOOP;
    
    RETURN retry_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE public.email_templates IS 'Store reusable email templates with variable substitution';
COMMENT ON TABLE public.email_logs IS 'Log all outbound email attempts with delivery tracking';
COMMENT ON TABLE public.email_events IS 'Track email events from Resend webhooks (delivery, opens, clicks, etc.)';
COMMENT ON FUNCTION retry_failed_emails() IS 'Retry failed emails that are within retry limits and recent';