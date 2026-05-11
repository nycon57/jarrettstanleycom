import { NextResponse } from 'next/server';
import { submitContactForm } from '@/app/actions/email';

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await submitContactForm(formData);
  return NextResponse.json(result);
}
