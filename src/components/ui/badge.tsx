import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border text-foreground hover:bg-accent",
        // Brand color variants
        lilac:
          "bg-lilac/10 text-lilac border border-lilac/30 hover:bg-lilac/20 hover:border-lilac/50",
        orchid:
          "bg-orchid/10 text-orchid border border-orchid/30 hover:bg-orchid/20 hover:border-orchid/50",
        skyward:
          "bg-skyward/10 text-skyward border border-skyward/30 hover:bg-skyward/20 hover:border-skyward/50",
        lavender:
          "bg-lavender/10 text-orchid border border-lavender/30 hover:bg-lavender/20 hover:border-lavender/50",
        // Gradient variants
        gradient:
          "bg-gradient-to-r from-lilac to-orchid text-white hover:from-lilac/90 hover:to-orchid/90",
        "gradient-subtle":
          "bg-gradient-to-r from-lilac/10 to-orchid/10 text-lilac border border-lilac/30 hover:from-lilac/20 hover:to-orchid/20",
        // Status variants with brand colors
        success:
          "bg-skyward/10 text-skyward border border-skyward/30 hover:bg-skyward/20",
        warning:
          "bg-lilac/10 text-lilac border border-lilac/30 hover:bg-lilac/20",
        error:
          "bg-orchid/10 text-orchid border border-orchid/30 hover:bg-orchid/20",
        info:
          "bg-lavender/10 text-orchid border border-lavender/30 hover:bg-lavender/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-base",
        xl: "px-4 py-1.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
