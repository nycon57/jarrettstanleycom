import { NextRequest, NextResponse } from 'next/server';
import { Resend, type WebhookEventPayload } from 'resend';
import { updateEmailStatus, EmailStatus } from '@/lib/email-service';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

type ResendWebhookEvent = Extract<
  WebhookEventPayload,
  { data: { email_id: string } }
>;

const isEmailWebhookEvent = (
  event: WebhookEventPayload
): event is ResendWebhookEvent => 'email_id' in event.data;

// Map Resend event types to our email status
const mapEventTypeToStatus = (eventType: string): EmailStatus | null => {
  switch (eventType) {
    case 'email.sent':
      return 'sent';
    case 'email.delivered':
      return 'delivered';
    case 'email.bounced':
      return 'bounced';
    case 'email.complained':
      return 'complained';
    case 'email.delivery_delayed':
      return 'pending'; // Keep as pending if delayed
    case 'email.failed':
      return 'failed';
    default:
      return null; // Unknown event type
  }
};

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('RESEND_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook service unavailable' },
        { status: 503 }
      );
    }

    // Signature verification must receive the exact bytes Resend signed.
    const payload = await req.text();
    const id = req.headers.get('svix-id');
    const timestamp = req.headers.get('svix-timestamp');
    const signature = req.headers.get('svix-signature');

    if (!id || !timestamp || !signature) {
      return NextResponse.json(
        { error: 'Missing webhook signature headers' },
        { status: 400 }
      );
    }

    let event: WebhookEventPayload;
    try {
      event = resend.webhooks.verify({
        payload,
        headers: { id, timestamp, signature },
        webhookSecret
      });
    } catch (error) {
      console.error('Invalid Resend webhook signature:', error);
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }
    
    // Validate webhook payload
    if (!isEmailWebhookEvent(event)) {
      console.error('Invalid email webhook payload:', event);
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const emailStatus = mapEventTypeToStatus(event.type);
    
    if (!emailStatus) {
      console.log(`Ignoring unknown event type: ${event.type}`);
      return NextResponse.json({ message: 'Event type ignored' });
    }

    // Update email status in our database
    const success = await updateEmailStatus(
      event.data.email_id,
      emailStatus,
      {
        event_type: event.type,
        resend_data: event.data,
        webhook_received_at: new Date().toISOString()
      }
    );

    if (!success) {
      console.error(`Failed to update email status for ${event.data.email_id}`);
      return NextResponse.json(
        { error: 'Failed to process webhook' },
        { status: 500 }
      );
    }

    // Handle specific event types with additional actions
    switch (event.type) {
      case 'email.bounced':
        await handleBouncedEmail(event);
        break;
      case 'email.complained':
        await handleSpamComplaint(event);
        break;
      case 'email.delivered':
        await handleDeliveredEmail(event);
        break;
    }

    console.log(`Processed webhook event: ${event.type} for email ${event.data.email_id}`);
    
    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle bounced email events
async function handleBouncedEmail(event: ResendWebhookEvent) {
  try {
    // Log bounce for monitoring
    console.log(`Email bounced: ${event.data.email_id} to ${event.data.to.join(', ')}`);
    
    // You could implement additional logic here such as:
    // - Marking the email address as invalid
    // - Sending alerts for high bounce rates
    // - Adding to suppression list
    
    const { error } = await supabase
      .from('email_events')
      .insert({
        resend_id: event.data.email_id,
        event_type: 'bounce_handled',
        event_data: {
          bounce_type: 'hard', // You could parse bounce details from Resend
          recipient: event.data.to[0],
          bounce_reason: 'Email bounced - recipient invalid'
        },
        occurred_at: event.created_at
      });

    if (error) {
      console.error('Failed to log bounce handling:', error);
    }
  } catch (error) {
    console.error('Error handling bounced email:', error);
  }
}

// Handle spam complaint events
async function handleSpamComplaint(event: ResendWebhookEvent) {
  try {
    // Log complaint for monitoring
    console.log(`Spam complaint: ${event.data.email_id} from ${event.data.to.join(', ')}`);
    
    // You could implement additional logic here such as:
    // - Automatically unsubscribing the user
    // - Sending alerts for spam complaints
    // - Adding to suppression list
    
    const { error } = await supabase
      .from('email_events')
      .insert({
        resend_id: event.data.email_id,
        event_type: 'complaint_handled',
        event_data: {
          complaint_type: 'spam',
          recipient: event.data.to[0],
          complaint_reason: 'User marked email as spam'
        },
        occurred_at: event.created_at
      });

    if (error) {
      console.error('Failed to log complaint handling:', error);
    }
  } catch (error) {
    console.error('Error handling spam complaint:', error);
  }
}

// Handle delivered email events
async function handleDeliveredEmail(event: ResendWebhookEvent) {
  try {
    const deliveredAt =
      'delivered_at' in event.data && typeof event.data.delivered_at === 'string'
        ? event.data.delivered_at
        : new Date().toISOString();

    // Update delivery timestamp if not already set
    const { error } = await supabase
      .from('email_logs')
      .update({
        delivered_at: deliveredAt
      })
      .eq('resend_id', event.data.email_id)
      .is('delivered_at', null);

    if (error) {
      console.error('Failed to update delivery timestamp:', error);
    }
  } catch (error) {
    console.error('Error handling delivered email:', error);
  }
}

export async function GET(_req: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed. This endpoint is for Resend webhooks only.' 
    },
    { status: 405 }
  );
}
