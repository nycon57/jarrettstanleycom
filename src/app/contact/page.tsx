import type { Metadata } from 'next';
import ContactPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Contact Jarrett Stanley',
  description: 'Book Jarrett for speaking, consulting, media requests, and AI mortgage marketing advisory conversations.',
};

export default function Page() {
  return <ContactPageClient />;
}
