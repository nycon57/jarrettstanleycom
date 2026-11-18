'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IconArrowRight, IconClose, IconMenu } from '@/components/icons/iconmcp/icons'
import { cn } from '@/lib/utils'

const NAV = [
  { name: 'Speaking', href: '/speaking' },
  { name: 'Writing', href: '/insights/blog' },
  { name: 'Consulting', href: '/services/consulting' },
  { name: 'About', href: '/about' },
] as const

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || open
          ? 'border-hp-rule bg-[oklch(0.16_0.025_278/0.92)] backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 transition-opacity duration-200 hover:opacity-80" aria-label="Jarrett Stanley, home">
          <Image
            src="/assets/images/JS-Logo-white.png"
            alt=""
            width={965}
            height={223}
            className="h-8 w-auto"
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative py-2 text-[0.9375rem] font-medium transition-colors duration-200',
                    'after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100',
                    isActive(item.href) ? 'text-hp-text after:scale-x-100 after:bg-hp-lilac' : 'text-hp-muted hover:text-hp-text',
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/speaking#book" className="btn-primary btn-primary--sm hidden sm:inline-flex">
            Book Jarrett
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-hp-text md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-hp-rule md:hidden">
        <nav aria-label="Main" className="shell py-4">
          <ul>
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-hp-rule last:border-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-lg text-hp-text"
                >
                  {item.name}
                  <IconArrowRight className="size-4 text-hp-soft" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/speaking#book" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
            Book Jarrett to speak
          </Link>
        </nav>
      </div>
    </header>
  )
}
