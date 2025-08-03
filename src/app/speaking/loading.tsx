import { ContentSectionSkeleton, TestimonialSkeleton } from '@/components/ui/loading-states'

export default function SpeakingLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <ContentSectionSkeleton />
      
      {/* Topics skeleton */}
      <ContentSectionSkeleton />
      
      {/* Testimonials skeleton */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4">
          <TestimonialSkeleton />
        </div>
      </section>
      
      {/* CTA skeleton */}
      <ContentSectionSkeleton />
    </div>
  )
}