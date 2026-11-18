import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// truetone.ai chips (DESIGN.md "Chips"): small pill, lilac-tinted fill and hairline, uppercase-free
// sentence labels at 11-13px. Status keeps meaning through muted tints, never gradients.
const chip = "bg-[oklch(0.42_0.13_298/0.22)] text-[oklch(0.9_0.09_298)] border border-[oklch(0.72_0.155_298/0.3)]";
const quiet = "bg-transparent text-hp-muted border border-[oklch(0.97_0.008_295/0.14)]";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors duration-200",
  {
    variants: {
      variant: {
        default: chip,
        secondary: quiet,
        destructive: "bg-destructive/15 text-destructive border border-destructive/30",
        outline: quiet,
        lilac: chip,
        orchid: chip,
        skyward: "bg-[oklch(0.85_0.11_215/0.12)] text-[oklch(0.88_0.08_215)] border border-[oklch(0.85_0.11_215/0.3)]",
        lavender: chip,
        gradient: chip,
        "gradient-subtle": chip,
        success: "bg-[oklch(0.85_0.11_215/0.12)] text-[oklch(0.88_0.08_215)] border border-[oklch(0.85_0.11_215/0.3)]",
        warning: chip,
        error: "bg-destructive/15 text-destructive border border-destructive/30",
        info: quiet
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-[0.8125rem]",
        xl: "px-3.5 py-1 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

interface BadgeProps extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />);

}

export { Badge };
