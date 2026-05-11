import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/app/actions/email';

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await subscribeToNewsletter(formData);
  return NextResponse.json(result);
}
