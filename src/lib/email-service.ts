import { Resend } from 'resend';
import React from 'react';
import { supabase } from '@/lib/supabase';
import { ContactConfirmationEmail } from '@/components/email/enhanced/contact-confirmation';
import { ContactNotificationEmail } from '@/components/email/enhanced/contact-notification';
import { NewsletterWelcomeEmail } from '@/components/email/enhanced/newsletter-welcome';
import { SpeakingConfirmationEmail } from '@/components/email/speaking-confirmation';
import { SpeakingNotificationEmail } from '@/components/email/speaking-notification';
import { ConsultingConfirmationEmail } from '@/components/email/consulting-confirmation';
import { ConsultingNotificationEmail } from '@/components/email/consulting-notification';
import { MediaConfirmationEmail } from '@/components/email/media-confirmation';
import { MediaNotificationEmail } from '@/components/email/media-notification';
import { ResourceDownloadEmail } from '@/components/email/resource-download';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Default email configuration
const DEFAULT_FROM = 'Jarrett Stanley <jarrett@jarrettstanley.com>';
const NOTIFICATION_EMAIL = 'jarrett@jarrettstanley.com';

// Email logging and status types
export type EmailStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced' | 'complained';

export interface EmailConfig {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  react?: React.ReactElement;
  replyTo?: string;
  templateName?: string;
  metadata?: Record<string, any>;
  cc?: string | string[];
  bcc?: string | string[];
}

export interface EmailLogData {
  id?: string;
  resend_id?: string;
  template_name?: string;
  from_email: string;
  to_email: string;
  cc_emails?: string[];
  bcc_emails?: string[];
  reply_to?: string;
  subject: string;
  status: EmailStatus;
  email_type?: 'notification' | 'confirmation' | 'newsletter' | 'marketing' | 'transactional';
  category?: 'contact_form' | 'speaking_inquiry' | 'consulting_inquiry' | 'newsletter_signup' | 'resource_download' | 'admin_notification' | 'welcome';
  error_message?: string;
  retry_count?: number;
  max_retries?: number;
  metadata?: Record<string, any>;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  type?: 'general' | 'speaking' | 'consulting' | 'media';
  company?: string;
  phone?: string;
}

export interface SpeakingInquiryData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  event_name?: string;
  event_date?: string;
  audience_size?: string;
  budget_range?: string;
  topic_preferences?: string[];
  message?: string;
}

export interface MediaInquiryData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  outlet: string;
  role: string;
  deadline?: string;
  topic: string;
  interview_type: 'written' | 'phone' | 'video' | 'in-person';
  message?: string;
}

// Template variable substitution helper
export const substituteTemplateVariables = (template: string, variables: Record<string, any>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
};

// Get template from database
export const getEmailTemplate = async (templateName: string) => {
  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('name', templateName)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error(`Template '${templateName}' not found:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching template:', error);
    return null;
  }
};

// Enhanced email sending with database logging
export const sendEmail = async (config: EmailConfig): Promise<{ id: string; emailLogId: string }> => {
  const primaryRecipient = Array.isArray(config.to) ? config.to[0] : config.to;
  const ccEmails = config.cc ? (Array.isArray(config.cc) ? config.cc : [config.cc]) : undefined;
  const bccEmails = config.bcc ? (Array.isArray(config.bcc) ? config.bcc : [config.bcc]) : undefined;
  
  // Determine email type and category based on template name
  const getEmailTypeAndCategory = (templateName?: string) => {
    if (!templateName) return { email_type: 'transactional' as const, category: 'contact_form' as const };
    
    if (templateName.includes('confirmation')) return { email_type: 'confirmation' as const, category: getCategory(templateName) };
    if (templateName.includes('notification')) return { email_type: 'notification' as const, category: getCategory(templateName) };
    if (templateName.includes('welcome') || templateName.includes('newsletter')) return { email_type: 'newsletter' as const, category: 'newsletter_signup' as const };
    if (templateName.includes('resource') || templateName.includes('download')) return { email_type: 'marketing' as const, category: 'resource_download' as const };
    
    return { email_type: 'transactional' as const, category: getCategory(templateName) };
  };
  
  const getCategory = (templateName: string) => {
    if (templateName.includes('speaking')) return 'speaking_inquiry' as const;
    if (templateName.includes('consulting')) return 'consulting_inquiry' as const;
    if (templateName.includes('newsletter') || templateName.includes('welcome')) return 'newsletter_signup' as const;
    if (templateName.includes('resource') || templateName.includes('download')) return 'resource_download' as const;
    if (templateName.includes('admin')) return 'admin_notification' as const;
    return 'contact_form' as const;
  };

  const { email_type, category } = getEmailTypeAndCategory(config.templateName);

  // Create initial log entry
  const emailLogData: EmailLogData = {
    template_name: config.templateName,
    from_email: config.from || DEFAULT_FROM,
    to_email: primaryRecipient,
    cc_emails: ccEmails,
    bcc_emails: bccEmails,
    reply_to: config.replyTo,
    subject: config.subject,
    status: 'pending',
    email_type,
    category,
    metadata: config.metadata || {}
  };

  const { data: logEntry, error: logError } = await supabase
    .from('email_logs')
    .insert(emailLogData)
    .select('id')
    .single();

  if (logError) {
    console.error('Failed to create email log:', logError);
    throw new Error(`Failed to log email: ${logError.message}`);
  }

  try {
    const { data, error } = await resend.emails.send({
      from: config.from || DEFAULT_FROM,
      to: Array.isArray(config.to) ? config.to : [config.to],
      cc: ccEmails,
      bcc: bccEmails,
      subject: config.subject,
      html: config.html,
      react: config.react,
      replyTo: config.replyTo,
    });

    if (error) {
      // Update log with error
      await supabase
        .from('email_logs')
        .update({
          status: 'failed',
          error_message: error.message,
          updated_at: new Date().toISOString()
        })
        .eq('id', logEntry.id);
      
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    // Update log with success
    await supabase
      .from('email_logs')
      .update({
        resend_id: data?.id || null,
        status: 'sent',
        sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', logEntry.id);

    return { id: data?.id || '', emailLogId: logEntry.id };
  } catch (error) {
    // Update log with error
    await supabase
      .from('email_logs')
      .update({
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        updated_at: new Date().toISOString()
      })
      .eq('id', logEntry.id);
    
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send confirmation email to user
export const sendContactConfirmation = async (data: ContactFormData) => {
  const subject = getConfirmationSubject(data.type);
  
  return sendEmail({
    to: data.email,
    subject,
    templateName: 'contact-confirmation',
    metadata: {
      contact_type: data.type,
      has_company: !!data.company,
      has_phone: !!data.phone
    },
    react: React.createElement(
      ContactConfirmationEmail,
      { 
        name: data.name, 
        type: data.type || 'general',
        message: data.message 
      }
    ),
  });
};

// Send notification email to Jarrett
export const sendContactNotification = async (data: ContactFormData) => {
  const subject = getNotificationSubject(data.type);
  
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject,
    templateName: 'contact-notification',
    replyTo: data.email,
    metadata: {
      contact_type: data.type,
      user_email: data.email,
      has_company: !!data.company,
      has_phone: !!data.phone,
      message_length: data.message.length
    },
    react: React.createElement(
      ContactNotificationEmail,
      data
    ),
  });
};

// Send speaking inquiry confirmation
export const sendSpeakingConfirmation = async (data: SpeakingInquiryData) => {
  return sendEmail({
    to: data.email,
    subject: 'Speaking inquiry received - We\'ll be in touch soon!',
    templateName: 'speaking-confirmation',
    metadata: {
      event_name: data.event_name,
      event_date: data.event_date,
      audience_size: data.audience_size,
      budget_range: data.budget_range,
      has_topic_preferences: !!data.topic_preferences?.length
    },
    react: React.createElement(
      SpeakingConfirmationEmail,
      { firstName: data.first_name, data }
    ),
  });
};

// Send speaking inquiry notification
export const sendSpeakingNotification = async (data: SpeakingInquiryData) => {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `New Speaking Inquiry: ${data.event_name || 'Event TBD'}`,
    templateName: 'speaking-notification',
    replyTo: data.email,
    metadata: {
      event_name: data.event_name,
      event_date: data.event_date,
      audience_size: data.audience_size,
      budget_range: data.budget_range,
      user_email: data.email,
      company: data.company,
      topic_count: data.topic_preferences?.length || 0
    },
    react: React.createElement(
      SpeakingNotificationEmail,
      data
    ),
  });
};

// Send consulting confirmation
export const sendConsultingConfirmation = async (data: any) => {
  return sendEmail({
    to: data.email,
    subject: 'Consulting inquiry received - Let\'s discuss your project',
    templateName: 'consulting-confirmation',
    metadata: {
      company: data.company,
      budget_range: data.budget_range,
      timeline: data.timeline,
      company_size: data.company_size,
      role: data.role
    },
    react: React.createElement(
      ConsultingConfirmationEmail,
      { firstName: data.first_name, data }
    ),
  });
};

// Send consulting notification
export const sendConsultingNotification = async (data: any) => {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `New Consulting Inquiry: ${data.company} - ${data.budget_range}`,
    templateName: 'consulting-notification',
    replyTo: data.email,
    metadata: {
      company: data.company,
      budget_range: data.budget_range,
      timeline: data.timeline,
      company_size: data.company_size,
      user_email: data.email,
      role: data.role,
      project_description_length: data.project_description?.length || 0,
      challenges_length: data.current_challenges?.length || 0
    },
    react: React.createElement(
      ConsultingNotificationEmail,
      data
    ),
  });
};

// Send media inquiry confirmation
export const sendMediaConfirmation = async (data: MediaInquiryData) => {
  return sendEmail({
    to: data.email,
    subject: 'Media inquiry received - Response coming soon',
    templateName: 'media-confirmation',
    metadata: {
      outlet: data.outlet,
      topic: data.topic,
      interview_type: data.interview_type,
      deadline: data.deadline,
      role: data.role
    },
    react: React.createElement(
      MediaConfirmationEmail,
      { firstName: data.first_name, data }
    ),
  });
};

// Send media inquiry notification
export const sendMediaNotification = async (data: MediaInquiryData) => {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `Media Inquiry: ${data.outlet} - ${data.topic}`,
    templateName: 'media-notification',
    replyTo: data.email,
    metadata: {
      outlet: data.outlet,
      topic: data.topic,
      interview_type: data.interview_type,
      deadline: data.deadline,
      user_email: data.email,
      role: data.role,
      has_phone: !!data.phone,
      message_length: data.message?.length || 0
    },
    react: React.createElement(
      MediaNotificationEmail,
      data
    ),
  });
};

// Send resource download email
export const sendResourceDownloadEmail = async (email: string, firstName: string, resourceTitle: string, downloadUrl: string) => {
  return sendEmail({
    to: email,
    subject: `Your download: ${resourceTitle}`,
    templateName: 'resource-download',
    metadata: {
      resource_title: resourceTitle,
      download_url: downloadUrl
    },
    react: React.createElement(
      ResourceDownloadEmail,
      { firstName, resourceTitle, downloadUrl }
    ),
  });
};

// Send newsletter welcome email
export const sendNewsletterWelcome = async (email: string, firstName: string) => {
  return sendEmail({
    to: email,
    subject: 'Welcome to the AI Marketing Revolution!',
    templateName: 'newsletter-welcome',
    metadata: {
      subscriber_email: email,
      first_name: firstName
    },
    react: React.createElement(
      NewsletterWelcomeEmail,
      { firstName }
    ),
  });
};

// Send newsletter subscription notification to admin
export const sendNewsletterNotification = async (email: string, firstName: string, source?: string) => {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `New newsletter subscriber: ${firstName} (${email})`,
    templateName: 'newsletter-notification',
    replyTo: email,
    metadata: {
      subscriber_email: email,
      first_name: firstName,
      source: source || 'website'
    },
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B5CF6;">🎉 New Newsletter Subscriber</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Subscriber Details</h3>
          <p><strong>Name:</strong> ${firstName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Source:</strong> ${source || 'Website newsletter form'}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
          <p style="margin: 0;"><strong>💡 Tip:</strong> Consider sending a personalized welcome message or follow-up within 24 hours!</p>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <p style="color: #6b7280; font-size: 14px;">
          This notification was sent from your JarrettStanley.com website.<br>
          <a href="mailto:${email}?subject=Welcome%20to%20the%20newsletter!">Reply directly to the subscriber</a>
        </p>
      </div>
    `,
  });
};

// Helper functions
function getConfirmationSubject(type?: string): string {
  switch (type) {
    case 'speaking':
      return 'Speaking inquiry received - We\'ll be in touch soon!';
    case 'consulting':
      return 'Consulting inquiry received - Let\'s discuss your project';
    case 'media':
      return 'Media inquiry received - Response coming soon';
    default:
      return 'Thanks for reaching out - We\'ll be in touch!';
  }
}

function getNotificationSubject(type?: string): string {
  switch (type) {
    case 'speaking':
      return 'New Speaking Inquiry';
    case 'consulting':
      return 'New Consulting Inquiry';
    case 'media':
      return 'New Media Inquiry';
    default:
      return 'New Contact Form Submission';
  }
}

// Error handling wrapper with retry logic
export const safeEmailSend = async (emailFunction: () => Promise<any>, retries = 0, maxRetries = 2): Promise<boolean> => {
  try {
    await emailFunction();
    return true;
  } catch (error) {
    console.error(`Email sending failed (attempt ${retries + 1}):`, error);
    
    if (retries < maxRetries) {
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, retries) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return safeEmailSend(emailFunction, retries + 1, maxRetries);
    }
    
    // Log final failure to monitoring service in production
    console.error('Email sending failed after all retries:', error);
    return false;
  }
};

// Utility function to update email status from webhooks
export const updateEmailStatus = async (resendId: string, status: EmailStatus, eventData?: any) => {
  try {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    // Set specific timestamps based on status
    switch (status) {
      case 'delivered':
        updateData.delivered_at = new Date().toISOString();
        break;
      case 'bounced':
        updateData.bounced_at = new Date().toISOString();
        break;
      case 'complained':
        updateData.complained_at = new Date().toISOString();
        break;
    }

    const { error } = await supabase
      .from('email_logs')
      .update(updateData)
      .eq('resend_id', resendId);

    if (error) {
      console.error('Failed to update email status:', error);
      return false;
    }

    // Also log the event
    if (eventData) {
      const { error: eventError } = await supabase
        .from('email_events')
        .insert({
          resend_id: resendId,
          event_type: status,
          event_data: eventData,
          occurred_at: new Date().toISOString()
        });

      if (eventError) {
        console.error('Failed to log email event:', eventError);
      }
    }

    return true;
  } catch (error) {
    console.error('Error updating email status:', error);
    return false;
  }
};

// Function to get email analytics/stats
export const getEmailStats = async (templateName?: string, dateFrom?: Date, dateTo?: Date) => {
  try {
    let query = supabase
      .from('email_logs')
      .select('status, template_name, created_at, sent_at, delivered_at');

    if (templateName) {
      query = query.eq('template_name', templateName);
    }

    if (dateFrom) {
      query = query.gte('created_at', dateFrom.toISOString());
    }

    if (dateTo) {
      query = query.lte('created_at', dateTo.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to get email stats:', error);
      return null;
    }

    // Calculate statistics
    const stats = {
      total: data.length,
      sent: data.filter(email => email.status === 'sent' || email.status === 'delivered').length,
      delivered: data.filter(email => email.status === 'delivered').length,
      failed: data.filter(email => email.status === 'failed').length,
      bounced: data.filter(email => email.status === 'bounced').length,
      pending: data.filter(email => email.status === 'pending').length,
      delivery_rate: 0,
      success_rate: 0
    };

    if (stats.total > 0) {
      stats.delivery_rate = (stats.delivered / stats.total) * 100;
      stats.success_rate = (stats.sent / stats.total) * 100;
    }

    return stats;
  } catch (error) {
    console.error('Error calculating email stats:', error);
    return null;
  }
};

// Function to retry failed emails
export const retryFailedEmails = async () => {
  try {
    const { data, error } = await supabase.rpc('retry_failed_emails');
    
    if (error) {
      console.error('Failed to retry emails:', error);
      return 0;
    }
    
    return data || 0;
  } catch (error) {
    console.error('Error retrying failed emails:', error);
    return 0;
  }
};