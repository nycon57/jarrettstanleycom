import Link from 'next/link'
import { IconArrowRight as ArrowRight } from '@/components/icons/iconmcp/icons'

interface PseoCtaBannerProps {
  heading: string
  description?: string
  buttonText: string
  buttonHref: string
}

export function PseoCtaBanner({
  heading,
  description,
  buttonText,
  buttonHref,
}: PseoCtaBannerProps) {
  return (
    <section className="py-12">
      <div className="hp-card p-8 md:p-12">
        <div className="pip-rule mb-8 max-w-[10rem]" aria-hidden="true" />
        <h2 className="t-headline !text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)]">{heading}</h2>
        {description && <p className="t-lede mt-4">{description}</p>}
        <Link href={buttonHref} className="btn-primary mt-8">
          {buttonText}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
