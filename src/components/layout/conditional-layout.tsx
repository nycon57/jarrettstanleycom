"use client";

import { ModernNavigation } from '@/components/layout/modern-navigation'
import { Footer } from '@/components/layout/footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ModernNavigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
} 