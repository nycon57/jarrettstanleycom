import { ReactNode } from "react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl md:text-3xl font-signal">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground font-hind">{text}</p>}
      </div>
      {children}
    </div>
  )
} 