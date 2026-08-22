import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/app/actions/email';
import { isBotIdBotRequest } from '@/lib/botid';

export async function POST(request: Request) {
  if (await isBotIdBotRequest()) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const formData = await request.formData();
  const result = await subscribeToNewsletter(formData);
  return NextResponse.json(result);
}
