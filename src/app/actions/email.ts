'use server';

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
  safeEmailSend
} from '@/lib/email';
import { createClient } from '@/lib/supabase-client';
import { supabase } from '@/lib/supabase';

// Contact form submission action
export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const type = (formData.get('type') as string) || 'general';
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;

    if (!name || !email || !message) {
      return { error: 'Missing required fields' };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParams = JSON.parse((formData.get('urlParams') as string) || '{}');

    // Save to database
    const { error: dbError } = await supabase.from('contacts').insert({
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
      utm_content: urlParams.utm_content || null,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return { error: 'Failed to save contact information' };
    }

    // Send emails (don't let email failures prevent form submission)
    const contactData = { name, email, message, type, company, phone };
    
    await safeEmailSend(() => sendContactConfirmation(contactData));
    await safeEmailSend(() => sendContactNotification(contactData));

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return { error: 'Failed to submit contact form' };
  }
}

// Media inquiry submission action
export async function submitMediaInquiry(formData: FormData) {
  try {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const outlet = formData.get('outlet') as string;
    const role = formData.get('role') as string;
    const deadline = formData.get('deadline') as string;
    const topic = formData.get('topic') as string;
    const interviewType = formData.get('interviewType') as 'written' | 'phone' | 'video' | 'in-person';
    const message = formData.get('message') as string;

    if (!firstName || !lastName || !email || !outlet || !role || !topic || !interviewType) {
      return { error: 'Missing required fields' };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParams = JSON.parse((formData.get('urlParams') as string) || '{}');

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
      utm_content: urlParams.utm_content || null,
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
      message,
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
  try {
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;

    if (!email || !firstName) {
      return { error: 'Email and first name are required' };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParams = JSON.parse((formData.get('urlParams') as string) || '{}');

    // Save to database
    const { error: dbError } = await supabase.from('newsletter_subscribers').insert({
      email,
      first_name: firstName,
      status: 'subscribed',
      source: 'website',
      referrer,
      user_agent: userAgent,
      utm_source: urlParams.utm_source || null,
      utm_medium: urlParams.utm_medium || null,
      utm_campaign: urlParams.utm_campaign || null,
      utm_term: urlParams.utm_term || null,
      utm_content: urlParams.utm_content || null,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return { error: 'Failed to subscribe to newsletter' };
    }

    // Send welcome email
    await safeEmailSend(() => sendNewsletterWelcome(email, firstName));

    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { error: 'Failed to subscribe to newsletter' };
  }
}

// Resource download action
export async function downloadResource(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const company = formData.get('company') as string;
    const resourceId = formData.get('resourceId') as string;

    if (!email || !firstName || !resourceId) {
      return { error: 'Email, first name, and resource ID are required' };
    }

    // Get tracking data
    const userAgent = formData.get('userAgent') as string;
    const referrer = formData.get('referrer') as string;
    const urlParams = JSON.parse((formData.get('urlParams') as string) || '{}');

    // Get resource details
    const { data: resource, error: resourceError } = await supabase
      .from('resources')
      .select('*')
      .eq('id', resourceId)
      .single();

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
      utm_content: urlParams.utm_content || null,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return { error: 'Failed to record download' };
    }

    // Update download count
    await supabase
      .from('resources')
      .update({ download_count: resource.download_count + 1 })
      .eq('id', resourceId);

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
      utm_content: urlParams.utm_content,
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
export async function submitSpeakingInquiry(data: any) {
  try {
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
      utm_content: urlParams.utm_content,
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
export async function submitWaitlistSignup(data: any) {
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
      utm_content: urlParams.utm_content,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save waitlist signup');
    }

    // Send confirmation email (you already have this template)
    await safeEmailSend(async () => {
      const { WaitlistConfirmationEmail } = await import('@/components/email/waitlist-confirmation');
      const { sendEmail } = await import('@/lib/email');
      
      return sendEmail({
        to: data.email,
        subject: '🎉 Welcome to TrueTone AI Beta Waitlist!',
        react: React.createElement(WaitlistConfirmationEmail, { firstName: data.first_name }),
      });
    });

    return { success: true };
  } catch (error) {
    console.error('Waitlist signup error:', error);
    throw error;
  }
}