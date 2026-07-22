'use client'

import { NextStudio } from 'next-sanity/studio'
import config, { isSanityProjectConfigured } from '../../../../sanity.config'

export default function StudioPageClient() {
  if (!isSanityProjectConfigured) {
    return <main className="mx-auto max-w-2xl px-6 py-16">Studio is temporarily unavailable.</main>
  }

  return <NextStudio config={config} />
}
