import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  title: string
  company?: string
  className?: string
}

export function TestimonialCard({ quote, author, title, company, className }: TestimonialCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10",
      className
    )}>
      <CardContent className="p-8">
        <Quote className="w-12 h-12 text-[#9D7AD6]/30 mb-4" />
        <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9D7AD6] to-[#4F518C]" />
          <div>
            <div className="font-semibold text-white">{author}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {title}
              {company && <span> at {company}</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}