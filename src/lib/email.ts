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

// Default email configuration
const DEFAULT_FROM = 'Jarrett Stanley <hello@mail.jarrettstanley.com>';

export const sendEmail = async (config: EmailConfig) => {
  try {
    const { data, error } = await resend.emails.send({
      from: config.from || DEFAULT_FROM,
      to: Array.isArray(config.to) ? config.to : [config.to],
      subject: config.subject,
      html: config.html,
      react: config.react,
      replyTo: config.replyTo
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
