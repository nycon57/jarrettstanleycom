import React from 'react';
import { headers } from 'next/headers';
import {
  sendContactConfirmation,
  sendContactNotification,
  sendSpeakingConfirmation,
  sendSpeakingNotification,
  sendConsultingConfirmation,
  sendConsultingNotification,
  sendMediaConfirmation,
  sendMediaNotification,
  sendResourceDownloadEmail,
  sendNewsletterWelcome,
  sendNewsletterNotification,
  safeEmailSend } from
'@/lib/email-service';
import { createClient } from '@/lib/supabase-client';
import { supabase } from '@/lib/supabase';
import { checkForSpam, isSubmittedTooFast } from '@/lib/spam-protection';

// Helper to get client IP for rate limiting
async function getClientIP(): Promise<string> {
  const headersList = await headers();
  return headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
  headersList.get('x-real-ip') ||
  'unknown';
}

// Contact form submission action
export async function submitContactForm(formData: FormData) {
  console.log('🟡 Contact form submission started');
  console.log('📝 Form data received:', {
    keys: Array.from(formData.keys()),
    values: Object.fromEntries(formData.entries())
  });

  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const type = formData.get('type') as string || 'general';
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;

    // Honeypot field - should be empty
    const honeypot = formData.get('website') as string;
    // Form timing - should have taken at least 3 seconds
    const formStartTime = formData.get('_formStartTime') as string;

    console.log('📧 Extracted contact data:', { name, email, type, company, phone, messageLength: message?.length });

    if (!name || !email || !message) {
      console.log('❌ Validation failed: missing required fields', { name: !!name, email: !!email, message: !!message });
      return { error: 'Missing required fields' };
    }

    // SPAM PROTECTION CHECK
    const clientIP = await getClientIP();
    const spamCheck = checkForSpam({
      name,
      email,
      message,
      company,
      honeypot,
      identifier: clientIP
    });

    if (spamCheck.isSpam) {
      console.log('🚫 SPAM DETECTED:', { reason: spamCheck.reason, score: spamCheck.score, name, email });
      // Return success to not reveal detection to bots, but don't actually process
      return { success: true };
    }

    // Check form submission timing
    if (formStartTime && isSubmittedTooFast(parseInt(formStartTime, 10))) {
      console.log('🚫 Form submitted too fast - likely bot');
      return { success: true };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParamsString = formData.get('urlParams') as string || '{}';

    console.log('🔍 Raw tracking data:', { userAgent, referrer, urlParamsString });

    let urlParams;
    try {
      urlParams = JSON.parse(urlParamsString);
      console.log('📊 Parsed URL params:', urlParams);
    } catch (parseError) {
      console.log('⚠️ Failed to parse URL params:', parseError);
      urlParams = {};
    }

    const insertData = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || null,
      email,
      phone: phone || null,
      company: company || null,
      message,
      type,
      source: 'website',
      status: 'new',
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_term: urlParams.utm_term || null,
      utm_content: urlParams.utm_content || null
    };

    console.log('💾 About to insert to Supabase contacts table:', insertData);

    // Save to database
    const { data: insertResult, error: dbError } = await supabase.from('contacts').insert(insertData).select();

    if (dbError) {
      console.error('❌ Database error:', dbError);
      console.error('❌ Database error details:', JSON.stringify(dbError, null, 2));
      return { error: 'Failed to save contact information' };
    }

    console.log('✅ Database insert successful:', insertResult);
    console.log('📧 Starting email sending process...');

    // Send emails (don't let email failures prevent form submission)
    const contactData = {
      name,
      email,
      message,
      type: type as 'general' | 'speaking' | 'consulting' | 'media',
      company,
      phone
    };

    console.log('📤 Sending confirmation email to user...');
    const confirmationResult = await safeEmailSend(() => sendContactConfirmation(contactData));
    console.log('📧 Confirmation email result:', confirmationResult ? 'SUCCESS' : 'FAILED');

    console.log('📤 Sending notification email to admin...');
    const notificationResult = await safeEmailSend(() => sendContactNotification(contactData));
    console.log('📧 Admin notification email result:', notificationResult ? 'SUCCESS' : 'FAILED');

    console.log('🟢 Contact form submission completed successfully');
    return { success: true };
  } catch (error) {
    console.error('💥 Contact form error:', error);
    console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack available');
    return { error: 'Failed to submit contact form' };
  }
}

// Media inquiry submission action
export async function submitMediaInquiry(formData: FormData) {
  try {
    const firstName = formData.get('first_name') as string || formData.get('firstName') as string;
    const lastName = formData.get('last_name') as string || formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const outlet = formData.get('outlet') as string;
    const role = formData.get('role') as string;
    const deadline = formData.get('deadline') as string;
    const topic = formData.get('topic') as string;
    const interviewType = formData.get('interview_type') as 'written' | 'phone' | 'video' | 'in-person' || formData.get('interviewType') as 'written' | 'phone' | 'video' | 'in-person';
    const message = formData.get('message') as string;

    // Honeypot field - should be empty
    const honeypot = formData.get('website') as string;
    const formStartTime = formData.get('_formStartTime') as string;

    if (!firstName || !lastName || !email || !outlet || !role || !topic || !interviewType) {
      return { error: 'Missing required fields' };
    }

    // SPAM PROTECTION CHECK
    const clientIP = await getClientIP();
    const spamCheck = checkForSpam({
      firstName,
      lastName,
      email,
      message,
      company: outlet,
      honeypot,
      identifier: clientIP
    });

    if (spamCheck.isSpam) {
      console.log('🚫 SPAM DETECTED in media inquiry:', { reason: spamCheck.reason, score: spamCheck.score, firstName, lastName, email });
      return { success: true };
    }

    if (formStartTime && isSubmittedTooFast(parseInt(formStartTime, 10))) {
      console.log('🚫 Media form submitted too fast - likely bot');
      return { success: true };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParams = JSON.parse(formData.get('urlParams') as string || '{}');

    // Save to database
    const { error: dbError } = await supabase.from('contacts').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      company: outlet,
      role,
      message: `Topic: ${topic}\nInterview Type: ${interviewType}\nDeadline: ${deadline || 'Not specified'}\n\n${message || ''}`,
      type: 'media',
      source: 'website',
      status: 'new',
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_term: urlParams.utm_term || null,
      utm_content: urlParams.utm_content || null
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return { error: 'Failed to save media inquiry' };
    }

    // Send emails
    const mediaData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      outlet,
      role,
      deadline,
      topic,
      interview_type: interviewType,
      message
    };

    await safeEmailSend(() => sendMediaConfirmation(mediaData));
    await safeEmailSend(() => sendMediaNotification(mediaData));

    return { success: true };
  } catch (error) {
    console.error('Media inquiry error:', error);
    return { error: 'Failed to submit media inquiry' };
  }
}

// Newsletter subscription action
export async function subscribeToNewsletter(formData: FormData) {
  console.log('🟡 Newsletter signup started');
  console.log('📝 Form data received:', {
    keys: Array.from(formData.keys()),
    values: Object.fromEntries(formData.entries())
  });

  try {
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    // Honeypot field - should be empty
    const honeypot = formData.get('website') as string;
    const formStartTime = formData.get('_formStartTime') as string;

    console.log('📧 Extracted data:', { email, firstName, lastName });

    if (!email || !firstName || !lastName) {
      console.log('❌ Validation failed: missing required fields', { email: !!email, firstName: !!firstName, lastName: !!lastName });
      return { error: 'Email, first name, and last name are required' };
    }

    // SPAM PROTECTION CHECK
    const clientIP = await getClientIP();
    const spamCheck = checkForSpam({
      firstName,
      lastName,
      email,
      honeypot,
      identifier: clientIP
    });

    if (spamCheck.isSpam) {
      console.log('🚫 SPAM DETECTED in newsletter signup:', { reason: spamCheck.reason, score: spamCheck.score, firstName, lastName, email });
      return { success: true };
    }

    if (formStartTime && isSubmittedTooFast(parseInt(formStartTime, 10))) {
      console.log('🚫 Newsletter form submitted too fast - likely bot');
      return { success: true };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParamsString = formData.get('urlParams') as string || '{}';

    console.log('🔍 Raw tracking data:', { userAgent, referrer, urlParamsString });

    let urlParams;
    try {
      urlParams = JSON.parse(urlParamsString);
      console.log('📊 Parsed URL params:', urlParams);
    } catch (parseError) {
      console.log('⚠️ Failed to parse URL params:', parseError);
      urlParams = {};
    }

    const insertData = {
      email,
      first_name: firstName,
      last_name: lastName,
      status: 'active',
      source: 'website_newsletter',
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_term: urlParams.utm_term || null,
      utm_content: urlParams.utm_content || null
    };

    console.log('💾 About to insert to Supabase subscribers table:', insertData);

    // Save to database
    const { data: insertResult, error: dbError } = await supabase.from('subscribers').insert(insertData).select();

    if (dbError) {
      console.error('❌ Database error:', dbError);
      console.error('❌ Database error details:', JSON.stringify(dbError, null, 2));
      return { error: 'Failed to subscribe to newsletter' };
    }

    console.log('✅ Database insert successful:', insertResult);

    console.log('📧 Starting email sending process...');

    // Send welcome email and admin notification
    const fullName = `${firstName} ${lastName}`.trim();
    console.log('📤 Sending welcome email to subscriber...');
    const welcomeResult = await safeEmailSend(() => sendNewsletterWelcome(email, fullName));
    console.log('📧 Welcome email result:', welcomeResult ? 'SUCCESS' : 'FAILED');

    console.log('📤 Sending notification email to admin...');
    const notificationResult = await safeEmailSend(() => sendNewsletterNotification(email, fullName, 'website_newsletter'));
    console.log('📧 Admin notification email result:', notificationResult ? 'SUCCESS' : 'FAILED');

    console.log('🟢 Newsletter signup completed successfully');
    return { success: true };
  } catch (error) {
    console.error('💥 Newsletter subscription error:', error);
    console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack available');
    return { error: 'Failed to subscribe to newsletter' };
  }
}

// Resource download action
async function downloadResource(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const company = formData.get('company') as string;
    const resourceId = formData.get('resourceId') as string;

    // Get spam protection fields
    const honeypot = formData.get('website') as string;
    const formStartTime = formData.get('_formStartTime') as string;

    // Check for spam
    const clientIP = await getClientIP();
    const spamCheck = checkForSpam({
      firstName,
      lastName,
      email,
      company,
      honeypot,
      identifier: clientIP
    });

    if (spamCheck.isSpam) {
      console.log('🚫 SPAM DETECTED (resource download):', {
        reason: spamCheck.reason,
        score: spamCheck.score,
        email,
        firstName
      });
      // Silent success to not reveal detection to bots
      return { success: true, downloadUrl: '#' };
    }

    // Check timing (bots submit too fast)
    if (formStartTime && isSubmittedTooFast(parseInt(formStartTime, 10))) {
      console.log('🚫 SPAM DETECTED (resource download): Form submitted too fast');
      return { success: true, downloadUrl: '#' };
    }

    if (!email || !firstName || !resourceId) {
      return { error: 'Email, first name, and resource ID are required' };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParams = JSON.parse(formData.get('urlParams') as string || '{}');

    // Get resource details
    const { data: resource, error: resourceError } = await supabase.
    from('resources').
    select('*').
    eq('id', resourceId).
    single();

    if (resourceError || !resource) {
      return { error: 'Resource not found' };
    }

    // Save download record
    const { error: dbError } = await supabase.from('resource_downloads').insert({
      resource_id: resourceId,
      email,
      first_name: firstName,
      last_name: lastName || null,
      company: company || null,
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_term: urlParams.utm_term || null,
      utm_content: urlParams.utm_content || null
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return { error: 'Failed to record download' };
    }

    // Update download count
    await supabase.
    from('resources').
    update({ download_count: resource.download_count + 1 }).
    eq('id', resourceId);

    // Send download email
    await safeEmailSend(() =>
    sendResourceDownloadEmail(email, firstName, resource.title, resource.file_url)
    );

    return { success: true, downloadUrl: resource.file_url };
  } catch (error) {
    console.error('Resource download error:', error);
    return { error: 'Failed to process download' };
  }
}

// Update existing consulting form to use email integration
export async function submitConsultingInquiry(data: any) {
  try {
    // SPAM PROTECTION CHECK
    const clientIP = await getClientIP();
    const spamCheck = checkForSpam({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      message: data.project_description,
      company: data.company,
      honeypot: data.website,
      identifier: clientIP
    });

    if (spamCheck.isSpam) {
      console.log('🚫 SPAM DETECTED in consulting inquiry:', { reason: spamCheck.reason, score: spamCheck.score, email: data.email });
      return { success: true };
    }

    if (data._formStartTime && isSubmittedTooFast(parseInt(data._formStartTime, 10))) {
      console.log('🚫 Consulting form submitted too fast - likely bot');
      return { success: true };
    }

    // Get tracking data from the form
    const referrer = data.referrer || null;
    const userAgent = data.userAgent;
    const urlParams = data.urlParams || {};

    // Save to database
    const { error: dbError } = await supabase.from('contacts').insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || null,
      company: data.company,
      role: data.role,
      company_size: data.company_size,
      budget_range: data.budget_range,
      timeline: data.timeline,
      project_description: data.project_description,
      current_challenges: data.current_challenges,
      preferred_contact_method: data.preferred_contact_method,
      type: 'consulting',
      message: `Project: ${data.project_description}\n\nChallenges: ${data.current_challenges}`,
      source: 'website',
      status: 'new',
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source,
      utm_medium: urlParams.utm_medium,
      utm_campaign: urlParams.utm_campaign,
      utm_term: urlParams.utm_term,
      utm_content: urlParams.utm_content
    });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save consulting inquiry');
    }

    // Send emails
    await safeEmailSend(() => sendConsultingConfirmation(data));
    await safeEmailSend(() => sendConsultingNotification(data));

    return { success: true };
  } catch (error) {
    console.error('Consulting inquiry error:', error);
    throw error;
  }
}

// Update speaking inquiry to use email integration
async function submitSpeakingInquiry(data: any) {
  try {
    // SPAM PROTECTION CHECK
    const clientIP = await getClientIP();
    const spamCheck = checkForSpam({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      message: data.message,
      company: data.company,
      honeypot: data.website,
      identifier: clientIP
    });

    if (spamCheck.isSpam) {
      console.log('🚫 SPAM DETECTED in speaking inquiry:', { reason: spamCheck.reason, score: spamCheck.score, email: data.email });
      return { success: true };
    }

    if (data._formStartTime && isSubmittedTooFast(parseInt(data._formStartTime, 10))) {
      console.log('🚫 Speaking form submitted too fast - likely bot');
      return { success: true };
    }

    // Get tracking data from the form
    const referrer = data.referrer || null;
    const userAgent = data.userAgent;
    const urlParams = data.urlParams || {};

    // Save to database (you'll need to create a speaking_inquiries table)
    const { error: dbError } = await supabase.from('contacts').insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || null,
      company: data.company,
      role: data.role,
      type: 'speaking',
      message: `Event: ${data.event_name || 'TBD'}\nDate: ${data.event_date || 'TBD'}\nAudience: ${data.audience_size || 'TBD'}\nBudget: ${data.budget_range || 'TBD'}\nTopics: ${data.topic_preferences?.join(', ') || 'TBD'}\n\n${data.message || ''}`,
      source: 'website',
      status: 'new',
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source,
      utm_medium: urlParams.utm_medium,
      utm_campaign: urlParams.utm_campaign,
      utm_term: urlParams.utm_term,
      utm_content: urlParams.utm_content
    });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save speaking inquiry');
    }

    // Send emails
    await safeEmailSend(() => sendSpeakingConfirmation(data));
    await safeEmailSend(() => sendSpeakingNotification(data));

    return { success: true };
  } catch (error) {
    console.error('Speaking inquiry error:', error);
    throw error;
  }
}

// Enhanced waitlist action with email integration
async function submitWaitlistSignup(data: any) {
  try {
    // Get tracking data from the form
    const referrer = data.referrer || null;
    const userAgent = data.userAgent;
    const urlParams = data.urlParams || {};

    // Save to database
    const { error: dbError } = await supabase.from('waitlist').insert({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name || null,
      company: data.company || null,
      marketing_consent: data.marketing_consent || false,
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source,
      utm_medium: urlParams.utm_medium,
      utm_campaign: urlParams.utm_campaign,
      utm_term: urlParams.utm_term,
      utm_content: urlParams.utm_content
    });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save waitlist signup');
    }

    // Send confirmation email (you already have this template)
    await safeEmailSend(async () => {
      const [{ WaitlistConfirmationEmail }, { sendEmail }] = await Promise.all([
        import('@/components/email/waitlist-confirmation'),
        import('@/lib/email')
      ]);

      return sendEmail({
        to: data.email,
        subject: '🎉 Welcome to TrueTone AI Beta Waitlist!',
        react: React.createElement(WaitlistConfirmationEmail, { firstName: data.first_name })
      });
    });

    return { success: true };
  } catch (error) {
    console.error('Waitlist signup error:', error);
    throw error;
  }
}
