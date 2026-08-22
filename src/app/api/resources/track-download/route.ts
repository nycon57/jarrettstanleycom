import { NextResponse } from 'next/server';
import { downloadResource } from '@/app/actions/email';
import { isBotIdBotRequest } from '@/lib/botid';

/**
 * Records a resource download and emails the file link to the requester.
 *
 * The modal posts JSON; downloadResource takes FormData, which is also what the
 * contact and consulting flows use. Converting here keeps one implementation of
 * the spam checks, UTM capture, and confirmation email.
 */
export async function POST(request: Request) {
  if (await isBotIdBotRequest()) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const data = await request.json();

  const formData = new FormData();
  formData.append('resourceId', data.resourceId ?? '');
  formData.append('email', data.email ?? '');
  formData.append('firstName', data.firstName ?? '');
  formData.append('lastName', data.lastName ?? '');
  formData.append('company', data.company ?? '');

  // Spam signals: a filled honeypot or a form submitted impossibly fast.
  formData.append('website', data.website ?? '');
  formData.append('_formStartTime', data._formStartTime ?? '');

  // Attribution.
  formData.append('userAgent', data.userAgent ?? request.headers.get('user-agent') ?? '');
  formData.append('referrer', data.referrer ?? request.headers.get('referer') ?? '');
  formData.append('urlParams', JSON.stringify(data.urlParams ?? {}));

  const result = await downloadResource(formData);

  if ('error' in result && result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
