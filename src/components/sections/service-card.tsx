import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  href?: string
}

export function ServiceCard({ title, description, icon, className, href }: ServiceCardProps) {
  const cardContent = (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#9D7AD6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-[#9D7AD6] to-[#4F518C] w-fit">
          {icon}
        </div>
        <CardTitle className="text-2xl font-signal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-base text-gray-300">
          {description}
        </CardDescription>
      </CardContent>
    </>
  )

  if (href) {
    return (
      <a href={href} className="block">
        <Card className={cn(
          "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl",
          "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 h-full",
          className
        )}>
          {cardContent}
        </Card>
      </a>
    )
  }
  
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl",
        "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10",
        className
      )}
    >
      {cardContent}
    </Card>
  )
}