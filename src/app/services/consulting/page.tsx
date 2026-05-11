import type { Metadata } from 'next';
import ConsultingPageClient from './page-client';

export const metadata: Metadata = {
  title: 'AI Consulting Services',
  description: 'Strategic AI consulting for mortgage marketing teams ready to implement practical workflows and measurable transformation.',
};

export default function Page() {
  return <ConsultingPageClient />;
}
