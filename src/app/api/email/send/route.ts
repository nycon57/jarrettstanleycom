import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { sendEmail, EmailConfig } from '@/lib/email-service';

export async function POST(req: NextRequest) {
  try {
    // This endpoint accepts arbitrary email content, so it must never be
    // reachable without an explicitly configured server-to-server credential.
    const adminApiKey = process.env.ADMIN_API_KEY;
    const authorization = req.headers.get('authorization');

    if (!adminApiKey || authorization !== `Bearer ${adminApiKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Bot ID verification
    const verification = await checkBotId();
    if (verification.isBot) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const body = await req.json();
    
    // Validate required fields
    if (!body.to || !body.subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject' },
        { status: 400 }
      );
    }

    if (!body.html && !body.react) {
      return NextResponse.json(
        { error: 'Either html or react content is required' },
        { status: 400 }
      );
    }

    // Construct email config
    const emailConfig: EmailConfig = {
      to: body.to,
      from: body.from,
      subject: body.subject,
      html: body.html,
      react: body.react,
      replyTo: body.replyTo,
      templateName: body.templateName,
      metadata: body.metadata || {},
      cc: body.cc,
      bcc: body.bcc
    };

    // Send email through our enhanced service
    const result = await sendEmail(emailConfig);
    
    return NextResponse.json({
      success: true,
      resendId: result.id,
      emailLogId: result.emailLogId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use POST to send emails.' 
    },
    { status: 405 }
  );
}
