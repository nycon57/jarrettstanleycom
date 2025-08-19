import { NextRequest, NextResponse } from 'next/server';
import { sendContactConfirmation, sendNewsletterWelcome } from '@/lib/email-service';

export async function POST(req: NextRequest) {
  try {
    // Basic authentication for test endpoint
    const authHeader = req.headers.get('authorization');
    const testKey = process.env.EMAIL_TEST_KEY || 'test-key-123';
    
    if (authHeader !== `Bearer ${testKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { type = 'contact', email = 'test@example.com', name = 'Test User' } = body;

    let result;

    switch (type) {
      case 'contact':
        result = await sendContactConfirmation({
          name,
          email,
          message: 'This is a test message to verify the email system is working correctly.',
          type: 'general'
        });
        break;
        
      case 'newsletter':
        result = await sendNewsletterWelcome(email, name);
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid test type. Use "contact" or "newsletter"' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully`,
      type,
      recipient: email,
      result: {
        resendId: result.id,
        emailLogId: result.emailLogId
      }
    });

  } catch (error) {
    console.error('Test email error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Email Test Endpoint',
    usage: 'POST with Bearer token and { type: "contact"|"newsletter", email: "test@example.com", name: "Test User" }',
    available_types: ['contact', 'newsletter'],
    note: 'Requires EMAIL_TEST_KEY in environment or Authorization: Bearer test-key-123'
  });
}