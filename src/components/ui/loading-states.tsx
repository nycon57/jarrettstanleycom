import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Page loading skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section skeleton */}
      <div className="relative h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-4xl px-4">
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <div className="flex gap-4 justify-center mt-8">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog post loading skeleton
export function BlogPostSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-20" />
      </CardContent>
    </Card>
  )
}

// Testimonial loading skeleton
export function TestimonialSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    </Card>
  )
}

// Service card loading skeleton
export function ServiceCardSkeleton() {
  return (
    <Card className="p-6 h-full">
      <div className="space-y-4">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-24 mt-6" />
      </div>
    </Card>
  )
}

// Stats block loading skeleton
export function StatsBlockSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="h-12 w-16 mx-auto mb-2" />
      <Skeleton className="h-4 w-24 mx-auto" />
    </div>
  )
}

// Table loading skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

// Form loading skeleton
export function FormSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    </Card>
  )
}

// Navigation loading skeleton
export function NavigationSkeleton() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Skeleton className="h-8 w-32" />
      <div className="flex space-x-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>
      <Skeleton className="h-8 w-24" />
    </nav>
  )
}

// Content section loading skeleton
export function ContentSectionSkeleton() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Image loading skeleton
export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton className={`bg-muted animate-pulse ${className}`} />
  )
}

// Avatar loading skeleton
export function AvatarSkeleton() {
  return (
    <Skeleton className="h-10 w-10 rounded-full" />
  )
}

// Badge loading skeleton
export function BadgeSkeleton() {
  return (
    <Skeleton className="h-6 w-16 rounded-full" />
  )
}

// Button loading skeleton
export function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton className={`h-10 w-24 rounded-md ${className}`} />
  )
}