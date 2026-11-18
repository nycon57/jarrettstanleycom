"use client";

import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Routes that should not have nav/footer (e.g., Sanity Studio)
  const isStudioRoute = pathname?.startsWith('/studio')

  if (isStudioRoute) {
    return <>{children}</>
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
} 