import type { Metadata } from 'next';
import StyleGuidePageClient from './page-client';

export const metadata: Metadata = {
  title: 'Design System Style Guide',
  description: 'Internal visual style guide for JarrettStanley.com components, typography, colors, and UI patterns.',
};

export default function Page() {
  return <StyleGuidePageClient />;
}
