import type { Metadata } from 'next';
import ResourcesPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Mortgage Marketing Resources',
  description: 'Guides, webinars, templates, and practical resources for AI-powered mortgage marketing.',
};

export default function Page() {
  return <ResourcesPageClient />;
}
