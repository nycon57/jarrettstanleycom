'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  IconArrowRight,
  IconBookOpenText,
  IconBriefcase,
  IconChevronDown,
  IconClose,
  IconFileText,
  IconLightbulb,
  IconMenu,
  IconMic,
  IconUsers,
  IconWrench,
} from '@/components/icons/iconmcp/icons'
import type { AppIconComponent } from '@/components/icons/icon-types'
import { cn } from '@/lib/utils'

type MenuLink = { name: string; href: string; description: string; Icon: AppIconComponent }
type NavItem =
  | { name: string; href: string }
  | { name: string; href: string; lead: { title: string; text: string }; links: MenuLink[] }

// Every directory page stays one hover away from every page: the glossary, tools, examples and role pages
// are the site's long-tail search and AI-citation surface.
const NAV: NavItem[] = [
  { name: 'Speaking', href: '/speaking' },
  {
    name: 'Services',
    href: '/services',
    lead: { title: 'Work with me', text: 'Speaking first, plus consulting and playbooks for your role.' },
    links: [
      { name: 'Speaking engagements', href: '/speaking', description: 'Keynotes and workshops on AI in mortgage marketing', Icon: IconMic },
      { name: 'Consulting', href: '/services/consulting', description: 'Strategic guidance for mortgage companies', Icon: IconBriefcase },
      { name: 'Solutions by role', href: '/solutions', description: 'AI marketing strategies tailored to your role', Icon: IconUsers },
    ],
  },
  {
    name: 'Insights',
    href: '/insights',
    lead: { title: 'Writing and resources', text: 'The Signal, plain-English definitions, the tools I use and campaigns that worked.' },
    links: [
      { name: 'The Signal and articles', href: '/insights/blog', description: 'Thought leadership on AI in mortgage marketing', Icon: IconBookOpenText },
      { name: 'Glossary', href: '/insights/glossary', description: 'AI and mortgage marketing terms explained', Icon: IconFileText },
      { name: 'Tools and resources', href: '/insights/tools', description: 'Curated AI tools for mortgage professionals', Icon: IconWrench },
      { name: 'Campaign examples', href: '/insights/examples', description: 'Real-world AI marketing campaigns that work', Icon: IconLightbulb },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const hasMenu = (item: NavItem): item is Extract<NavItem, { links: MenuLink[] }> => 'links' in item

const underline =
  'relative after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100'

/** A dropdown's panel: lead copy on the left, the pages on the right (truetone.ai's editorial menu). */
function MenuPanel({ item, open, isActive, onClose }: { item: Extract<NavItem, { links: MenuLink[] }>; open: boolean; isActive: (href: string) => boolean; onClose: () => void }) {
  return (
    <div id={`menu-${item.name}`} hidden={!open} className="nav-panel absolute left-1/2 top-full z-50 w-[40rem] -translate-x-1/2 pt-3">
      <div className="hp-card grid grid-cols-[13rem_minmax(0,1fr)] gap-6 p-5">
        <div className="border-r border-hp-rule pr-6">
          <p className="t-title !text-base">{item.lead.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-hp-muted">{item.lead.text}</p>
          <Link href={item.href} onClick={onClose} className="btn-ghost mt-3 text-sm">
            See all
            <IconArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="grid gap-1">
          {item.links.map(({ name, href, description, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                aria-current={isActive(href) ? 'page' : undefined}
                className="group flex gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-[oklch(0.97_0.008_295/0.05)]"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-hp-muted group-hover:text-hp-text" />
                <span>
                  <span className="block text-[0.9375rem] font-semibold text-hp-text">{name}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-hp-muted">{description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Small screens: every top page with its sub-pages listed under it. */
function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div id="mobile-nav" hidden={!open} className="max-h-[calc(100svh-72px)] overflow-y-auto border-t border-hp-rule lg:hidden">
      <nav aria-label="Main" className="shell py-4">
        <ul>
          {NAV.map((item) => (
            <li key={item.name} className="border-b border-hp-rule last:border-0">
              <Link href={item.href} onClick={onClose} className="flex items-center justify-between py-4 text-lg text-hp-text">
                {item.name}
                <IconArrowRight className="size-4 text-hp-soft" />
              </Link>
              {hasMenu(item) ? (
                <ul className="-mt-1 grid gap-0.5 pb-4">
                  {item.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={onClose} className="block py-1.5 pl-4 text-[0.9375rem] text-hp-muted">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <Link href="/speaking#book" onClick={onClose} className="btn-primary mt-4 w-full">
          Book Jarrett to speak
        </Link>
      </nav>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close an open dropdown on outside click or Escape (focus returns to its trigger).
  useEffect(() => {
    if (!menu) return
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenu(null)
      navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${menu}"]`)?.focus()
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const openNow = (name: string) => {
    window.clearTimeout(closeTimer.current)
    setMenu(name)
  }
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMenu(null), 140)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || mobileOpen || menu ? 'border-hp-rule bg-[oklch(0.16_0.025_278/0.94)] backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 transition-opacity duration-200 hover:opacity-80" aria-label="Jarrett Stanley, home">
          <Image src="/assets/images/JS-Logo-white.png" alt="" width={965} height={223} className="h-8 w-auto" loading="eager" fetchPriority="high" />
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => {
              if (!hasMenu(item)) {
                const active = isActive(item.href)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(underline, 'py-2 text-[0.9375rem] font-medium transition-colors duration-200', active ? 'text-hp-text after:scale-x-100 after:bg-hp-lilac' : 'text-hp-muted hover:text-hp-text')}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              }
              const open = menu === item.name
              const active = isActive(item.href) || item.links.some((l) => isActive(l.href))
              return (
                <li
                  key={item.name}
                  className="relative"
                  onPointerEnter={(e) => e.pointerType === 'mouse' && openNow(item.name)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && closeSoon()}
                >
                  <button
                    type="button"
                    data-menu={item.name}
                    aria-expanded={open}
                    aria-controls={`menu-${item.name}`}
                    onClick={() => setMenu(open ? null : item.name)}
                    className={cn('flex items-center gap-1 py-2 text-[0.9375rem] font-medium transition-colors duration-200', active || open ? 'text-hp-text' : 'text-hp-muted hover:text-hp-text')}
                  >
                    {item.name}
                    <IconChevronDown className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} />
                  </button>
                  <MenuPanel item={item} open={open} isActive={isActive} onClose={() => setMenu(null)} />
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/speaking#book" className="btn-primary btn-primary--sm hidden sm:inline-flex">
            Book Jarrett
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-hp-text lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
