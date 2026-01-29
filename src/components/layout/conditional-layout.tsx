"use client";

import { usePathname } from 'next/navigation'
import { ModernNavigation } from '@/components/layout/modern-navigation'
import { Footer } from '@/components/layout/footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Routes that should not have nav/footer (e.g., Sanity Studio)
  const isStudioRoute = pathname?.startsWith('/studio')

  if (isStudioRoute) {
    return <>{children}</>
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <ModernNavigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
} 