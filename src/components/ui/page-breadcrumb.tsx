'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { generateBreadcrumbs, generateBreadcrumbSchema, generateStructuredData } from '@/lib/seo'
import { Home } from 'lucide-react'

interface PageBreadcrumbProps {
  customBreadcrumbs?: Array<{ name: string; url: string }>
  showHome?: boolean
  className?: string
}

export function PageBreadcrumb({ 
  customBreadcrumbs, 
  showHome = true,
  className 
}: PageBreadcrumbProps) {
  const pathname = usePathname()
  
  // Use custom breadcrumbs if provided, otherwise generate from pathname
  const breadcrumbs = customBreadcrumbs || generateBreadcrumbs(pathname)
  
  // Filter out home if showHome is false
  const filteredBreadcrumbs = showHome ? breadcrumbs : breadcrumbs.slice(1)
  
  if (filteredBreadcrumbs.length <= 1) {
    return null // Don't show breadcrumbs for home page or single-level pages
  }

  const structuredData = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredData([structuredData])}
      />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {filteredBreadcrumbs.map((item, index) => {
            const isLast = index === filteredBreadcrumbs.length - 1
            
            return (
              <BreadcrumbItem key={item.url}>
                {isLast ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={item.url}>
                      {item.name === 'Home' && showHome ? (
                        <span className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          <span className="sr-only">Home</span>
                        </span>
                      ) : (
                        item.name
                      )}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}

// Specific breadcrumb configurations for different sections
export const breadcrumbConfigs = {
  speaking: [
    { name: 'Home', url: '/' },
    { name: 'Speaking', url: '/speaking' }
  ],
  consulting: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Consulting', url: '/services/consulting' }
  ],
  blog: [
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: 'Blog', url: '/insights/blog' }
  ],
  resources: [
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: 'Resources', url: '/insights/resources' }
  ],
  truetoneAi: [
    { name: 'Home', url: '/' },
    { name: 'TrueTone AI', url: '/truetone-ai' }
  ],
  about: [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ],
  contact: [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]
}