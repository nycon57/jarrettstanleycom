import { NextResponse } from 'next/server';
import { trackResourceDownload } from '@/lib/resource-downloads';

export async function POST(request: Request) {
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
