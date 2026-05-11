import type { Metadata } from 'next';
import ResourcesInsightsPageClient from './page-client';

export const metadata: Metadata = {
  title: 'AI Marketing Resource Library',
  description: 'Browse downloadable resources, tools, and practical guides for AI-powered mortgage marketing.',
};

export default function Page() {
  return <ResourcesInsightsPageClient />;
}
