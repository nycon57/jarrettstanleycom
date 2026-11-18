import Image from 'next/image'
import Link from 'next/link'
import { BrandLinkedin, BrandX } from '@/components/icons/brands'
import { IconMail } from '@/components/icons/iconmcp/icons'

const COLUMNS = [
  {
    label: 'Speaking',
    links: [
      { name: 'Book Jarrett', href: '/speaking#book' },
      { name: 'Talks and past stages', href: '/speaking' },
      { name: 'About', href: '/about' },
    ],
  },
  {
    label: 'Writing',
    links: [
      { name: 'The Signal and articles', href: '/insights/blog' },
      { name: 'AI glossary', href: '/insights/glossary' },
      { name: 'Tools and resources', href: '/insights/tools' },
      { name: 'Campaign examples', href: '/insights/examples' },
    ],
  },
  {
    label: 'Work together',
    links: [
      { name: 'Consulting', href: '/services/consulting' },
      { name: 'Solutions by role', href: '/solutions' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Elsewhere',
    links: [
      { name: 'TrueTone AI', href: 'https://www.truetone.ai' },
      { name: 'The TrueTone Show', href: 'https://www.truetone.ai/show' },
      { name: 'For developers and agents', href: '/developers' },
    ],
  },
] as const

const SOCIAL = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/jarrettstanley', Icon: BrandLinkedin },
  { name: 'X', href: 'https://x.com/IAmJarrettS', Icon: BrandX },
  { name: 'Email', href: 'mailto:jarrett@truetone.ai', Icon: IconMail },
] as const

const linkClass =
  'relative text-[0.9375rem] text-hp-muted transition-colors duration-200 hover:text-hp-text after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-hp-rule py-[clamp(4rem,9vh,7rem)] text-hp-text">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-24">
          <div className="max-w-[34ch]">
            <Link href="/" className="inline-flex transition-opacity duration-200 hover:opacity-80" aria-label="Jarrett Stanley, home">
              <Image src="/assets/images/JS-Logo-white.png" alt="" width={965} height={223} className="h-9 w-auto" />
            </Link>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-hp-muted">
              Chief Marketing Officer at Nationwide Mortgage Bankers and CEO of TrueTone AI. Speaker on AI, marketing and
              leadership in mortgage.
            </p>
            <ul className="mt-6 flex gap-5">
              {SOCIAL.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    aria-label={name}
                    className="inline-flex size-7 items-center justify-center text-hp-soft transition-colors duration-200 hover:text-hp-text"
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon className="size-[1.125rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.label}>
                <h2 className="font-body text-[0.8125rem] font-semibold text-hp-text">{col.label}</h2>
                <ul className="mt-4 grid gap-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith('http') ? (
                        <a href={link.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hp-rule pt-8 text-sm text-hp-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jarrett Stanley</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-hp-text">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-hp-text">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
