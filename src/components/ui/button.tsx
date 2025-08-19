import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Brand gradient variants
        gradient:
          "bg-gradient-to-r from-lilac to-orchid text-white shadow-lg hover:from-lilac/90 hover:to-orchid/90 hover:shadow-xl hover:scale-105 border-0",
        "gradient-secondary":
          "bg-gradient-to-r from-orchid to-skyward text-white shadow-lg hover:from-orchid/90 hover:to-skyward/90 hover:shadow-xl hover:scale-105 border-0",
        "gradient-subtle":
          "bg-gradient-to-r from-lavender/20 to-lilac/20 text-lilac dark:text-lilac border border-lilac/30 hover:from-lavender/30 hover:to-lilac/30 hover:border-lilac/50",
        // Brand solid variants
        lilac:
          "bg-lilac text-white shadow-md hover:bg-lilac/90 hover:shadow-lg",
        orchid:
          "bg-orchid text-white shadow-md hover:bg-orchid/90 hover:shadow-lg",
        skyward:
          "bg-skyward text-shadow shadow-md hover:bg-skyward/90 hover:shadow-lg",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-8",
        "2xl": "h-16 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
