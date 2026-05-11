import type { Metadata } from 'next';
import ServicesPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Services and Solutions',
  description: 'Speaking, consulting, and advisory services for mortgage marketing teams adopting AI.',
};

export default function Page() {
  return <ServicesPageClient />;
}
