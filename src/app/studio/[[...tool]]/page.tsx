import type { Metadata } from 'next';
import StudioPageClient from './page-client';

export const metadata: Metadata = {
  title: 'AI Marketing Studio',
  description: 'Interactive AI marketing studio tools and workflows for mortgage marketing experimentation.',
};

export default function Page() {
  return <StudioPageClient />;
}
