import { Resend } from 'resend';
import React from 'react';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailConfig {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  react?: React.ReactElement;
  replyTo?: string;
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

// Default email configuration
const DEFAULT_FROM = 'Jarrett Stanley <hello@jarrettstanley.com>';
const NOTIFICATION_EMAIL = 'jarrett@jarrettstanley.com';

export const sendEmail = async (config: EmailConfig) => {
  try {
    const { data, error } = await resend.emails.send({
      from: config.from || DEFAULT_FROM,
      to: Array.isArray(config.to) ? config.to : [config.to],
      subject: config.subject,
      html: config.html,
      react: config.react,
      replyTo: config.replyTo,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  } catch (error) {
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
    react: React.createElement(
      require('@/components/email/contact-confirmation').ContactConfirmationEmail,
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
    replyTo: data.email,
    react: React.createElement(
      require('@/components/email/contact-notification').ContactNotificationEmail,
      data
    ),
  });
};

// Send speaking inquiry confirmation
export const sendSpeakingConfirmation = async (data: SpeakingInquiryData) => {
  return sendEmail({
    to: data.email,
    subject: 'Speaking inquiry received - We\'ll be in touch soon!',
    react: React.createElement(
      require('@/components/email/speaking-confirmation').SpeakingConfirmationEmail,
      { firstName: data.first_name, data }
    ),
  });
};

// Send speaking inquiry notification
export const sendSpeakingNotification = async (data: SpeakingInquiryData) => {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `New Speaking Inquiry: ${data.event_name || 'Event TBD'}`,
    replyTo: data.email,
    react: React.createElement(
      require('@/components/email/speaking-notification').SpeakingNotificationEmail,
      data
    ),
  });
};

// Send consulting confirmation
export const sendConsultingConfirmation = async (data: any) => {
  return sendEmail({
    to: data.email,
    subject: 'Consulting inquiry received - Let\'s discuss your project',
    react: React.createElement(
      require('@/components/email/consulting-confirmation').ConsultingConfirmationEmail,
      { firstName: data.first_name, data }
    ),
  });
};

// Send consulting notification
export const sendConsultingNotification = async (data: any) => {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `New Consulting Inquiry: ${data.company} - ${data.budget_range}`,
    replyTo: data.email,
    react: React.createElement(
      require('@/components/email/consulting-notification').ConsultingNotificationEmail,
      data
    ),
  });
};

// Send media inquiry confirmation
export const sendMediaConfirmation = async (data: MediaInquiryData) => {
  return sendEmail({
    to: data.email,
    subject: 'Media inquiry received - Response coming soon',
    react: React.createElement(
      require('@/components/email/media-confirmation').MediaConfirmationEmail,
      { firstName: data.first_name, data }
    ),
  });
};

// Send media inquiry notification
export const sendMediaNotification = async (data: MediaInquiryData) => {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `Media Inquiry: ${data.outlet} - ${data.topic}`,
    replyTo: data.email,
    react: React.createElement(
      require('@/components/email/media-notification').MediaNotificationEmail,
      data
    ),
  });
};

// Send resource download email
export const sendResourceDownloadEmail = async (email: string, firstName: string, resourceTitle: string, downloadUrl: string) => {
  return sendEmail({
    to: email,
    subject: `Your download: ${resourceTitle}`,
    react: React.createElement(
      require('@/components/email/resource-download').ResourceDownloadEmail,
      { firstName, resourceTitle, downloadUrl }
    ),
  });
};

// Send newsletter welcome email
export const sendNewsletterWelcome = async (email: string, firstName: string) => {
  return sendEmail({
    to: email,
    subject: 'Welcome to the AI Marketing Revolution!',
    react: React.createElement(
      require('@/components/email/newsletter-welcome').NewsletterWelcomeEmail,
      { firstName }
    ),
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

// Error handling wrapper
export const safeEmailSend = async (emailFunction: () => Promise<any>) => {
  try {
    await emailFunction();
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw the error to prevent form submission from failing
    // Log to monitoring service in production
  }
};