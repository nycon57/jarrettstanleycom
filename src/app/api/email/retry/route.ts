import { NextRequest, NextResponse } from 'next/server';
import { retryFailedEmails } from '@/lib/email-service';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // Basic authentication check - in production you'd want proper admin authentication
    const authHeader = req.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;
    
    if (adminKey && authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get optional filters from request body
    const body = await req.json().catch(() => ({}));
    const { 
      maxRetries = 3,
      templateName,
      hoursBack = 24 
    } = body;

    // Get failed emails that are eligible for retry
    let query = supabase
      .from('email_logs')
      .select('id, resend_id, template_name, to_email, subject, retry_count, error_message')
      .eq('status', 'failed')
      .lt('retry_count', maxRetries)
      .gte('created_at', new Date(Date.now() - hoursBack * 60 * 60 * 1000).toISOString());

    if (templateName) {
      query = query.eq('template_name', templateName);
    }

    const { data: failedEmails, error: queryError } = await query
      .order('created_at', { ascending: true })
      .limit(50); // Limit to 50 retries per request to avoid overwhelming

    if (queryError) {
      console.error('Failed to query failed emails:', queryError);
      return NextResponse.json(
        { error: 'Failed to query failed emails' },
        { status: 500 }
      );
    }

    if (!failedEmails || failedEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No failed emails found for retry',
        retriedCount: 0,
        eligibleEmails: []
      });
    }

    // Use the database function to retry failed emails
    const retriedCount = await retryFailedEmails();

    // Get updated status of the emails we attempted to retry
    const emailIds = failedEmails.map(email => email.id);
    const { data: updatedEmails, error: updateError } = await supabase
      .from('email_logs')
      .select('id, status, retry_count, error_message')
      .in('id', emailIds);

    const retryResults = {
      total_eligible: failedEmails.length,
      successfully_queued: retriedCount,
      failed_emails: failedEmails.map(email => ({
        id: email.id,
        template_name: email.template_name,
        to_email: email.to_email,
        subject: email.subject,
        retry_count: email.retry_count,
        error_message: email.error_message
      })),
      updated_statuses: updateError ? [] : updatedEmails
    };

    return NextResponse.json({
      success: true,
      message: `Successfully queued ${retriedCount} emails for retry`,
      retriedCount,
      details: retryResults
    });

  } catch (error) {
    console.error('Email retry API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to retry failed emails',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get failed emails summary (no retry, just info)
    const { searchParams } = new URL(req.url);
    const templateName = searchParams.get('template');
    const hoursBack = parseInt(searchParams.get('hoursBack') || '24');

    let query = supabase
      .from('email_logs')
      .select('id, template_name, to_email, subject, retry_count, max_retries, error_message, created_at, updated_at')
      .eq('status', 'failed')
      .gte('created_at', new Date(Date.now() - hoursBack * 60 * 60 * 1000).toISOString());

    if (templateName) {
      query = query.eq('template_name', templateName);
    }

    const { data: failedEmails, error } = await query
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Failed to query failed emails:', error);
      return NextResponse.json(
        { error: 'Failed to query failed emails' },
        { status: 500 }
      );
    }

    // Categorize failed emails
    const eligibleForRetry = failedEmails?.filter(email => 
      email.retry_count < (email.max_retries || 3)
    ) || [];

    const maxRetriesReached = failedEmails?.filter(email => 
      email.retry_count >= (email.max_retries || 3)
    ) || [];

    return NextResponse.json({
      success: true,
      summary: {
        total_failed: failedEmails?.length || 0,
        eligible_for_retry: eligibleForRetry.length,
        max_retries_reached: maxRetriesReached.length,
        hours_back: hoursBack,
        template_filter: templateName || 'all'
      },
      eligible_for_retry: eligibleForRetry,
      max_retries_reached: maxRetriesReached
    });

  } catch (error) {
    console.error('Failed emails query error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to query failed emails',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}