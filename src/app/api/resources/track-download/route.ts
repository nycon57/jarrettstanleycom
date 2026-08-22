import { NextResponse } from 'next/server';
import { trackResourceDownload } from '@/lib/resource-downloads';
import { isBotIdBotRequest } from '@/lib/botid';

export async function POST(request: Request) {
  if (await isBotIdBotRequest()) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const data = await request.json();

  await trackResourceDownload(
    data.resourceId,
    data.email,
    data.firstName,
    data.lastName,
    data.company
  );

  return NextResponse.json({ success: true });
}
