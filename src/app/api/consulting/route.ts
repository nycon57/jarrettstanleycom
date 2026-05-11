import { NextResponse } from 'next/server';
import { submitConsultingInquiry } from '@/app/actions/email';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await submitConsultingInquiry(data);
  return NextResponse.json(result);
}
