"use client";

import ProfessionalHeader from '@/components/layout/professional-header'
import { Footer } from '@/components/layout/footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ProfessionalHeader />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
} 