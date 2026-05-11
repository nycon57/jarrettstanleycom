import { NextResponse } from 'next/server';
import { submitMediaInquiry } from '@/app/actions/email';

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await submitMediaInquiry(formData);
  return NextResponse.json(result);
}
