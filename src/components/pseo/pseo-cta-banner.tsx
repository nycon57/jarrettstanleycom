import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lilac/10 via-orchid/5 to-skyward/10 border border-lilac/20 p-8 md:p-12">
        <div className="relative flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="font-signal text-2xl md:text-3xl font-bold mb-3">{heading}</h2>
          {description && (
            <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
          )}
          <Button
            asChild
            className="bg-gradient-to-r from-lilac to-orchid hover:from-lilac/90 hover:to-orchid/90 text-white px-8 py-3 h-auto text-base font-medium rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Link href={buttonHref}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-lilac/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-skyward/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
    </section>
  )
}
