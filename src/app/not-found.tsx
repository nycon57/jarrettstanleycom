import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to the homepage or explore other sections of Jarrett Stanley\'s website.',
  noindex: true,
  canonical: '/404'
})

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-md w-full mx-auto text-center px-6">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-signal">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-signal">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              Return Home
            </Link>
          </Button>
          
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/speaking">
                Speaking
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/services/consulting">
                Consulting
              </Link>
            </Button>
          </div>
        </div>

        {/* Popular Links */}
        <div className="text-sm text-gray-500">
          <p className="mb-3">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link 
              href="/about" 
              className="hover:text-purple-600 transition-colors"
            >
              About
            </Link>
            <span>•</span>
            <Link 
              href="/services" 
              className="hover:text-purple-600 transition-colors"
            >
              Services
            </Link>
            <span>•</span>
            <Link 
              href="/insights/blog" 
              className="hover:text-purple-600 transition-colors"
            >
              Blog
            </Link>
            <span>•</span>
            <Link 
              href="/contact" 
              className="hover:text-purple-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-12">
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  )
}