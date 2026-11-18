import { NextResponse } from 'next/server';
import { submitSpeakingInquiry } from '@/app/actions/email';
import { isBotIdBotRequest } from '@/lib/botid';

export async function POST(request: Request) {
  if (await isBotIdBotRequest()) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const data = await request.json();
  const result = await submitSpeakingInquiry(data);
  return NextResponse.json(result);
}
