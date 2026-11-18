import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// truetone.ai button language (DESIGN.md): 8px rectangles, deep-lilac primary with a lift on hover,
// hairline outline, no gradients, no glow, no scale-on-hover. The old brand variant names stay so
// existing pages keep compiling; they all resolve to the same system.
const primary =
  "bg-[oklch(0.62_0.165_298)] text-[oklch(0.99_0.005_295)] hover:bg-[oklch(0.66_0.165_298)] active:scale-[0.98]";
const outline =
  "border border-[oklch(0.97_0.008_295/0.18)] bg-transparent text-hp-text hover:border-[oklch(0.97_0.008_295/0.32)] hover:bg-[oklch(0.97_0.008_295/0.04)]";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[oklch(0.85_0.12_298)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: primary,
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline,
        secondary: "bg-hp-lift text-hp-text hover:bg-hp-panel",
        ghost: "text-hp-muted hover:bg-[oklch(0.97_0.008_295/0.05)] hover:text-hp-text",
        link: "text-hp-text underline decoration-[oklch(0.97_0.008_295/0.3)] underline-offset-4 hover:decoration-current",
        gradient: primary,
        "gradient-secondary": primary,
        "gradient-subtle": outline,
        lilac: primary,
        orchid: primary,
        skyward: primary
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3.5 text-[0.8125rem]",
        lg: "h-11 px-6 text-[0.9375rem]",
        xl: "h-12 px-7 text-base",
        "2xl": "h-14 px-8 text-base",
        icon: "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}function Button(


{ className, variant, size, asChild = false, ref, ...props }: ButtonProps & {ref?: React.Ref<HTMLButtonElement>;}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />);


}

Button.displayName = "Button";

export { Button };
