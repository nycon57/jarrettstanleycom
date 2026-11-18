import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// truetone.ai card surface (DESIGN.md "Cards"): 14px radius, faint vertical gradient, hairline,
// soft structural shadow. No glass, no hover scale. Old variant names resolve to the same surface.
const surface =
  "border border-[oklch(0.97_0.008_295/0.08)] bg-[linear-gradient(180deg,oklch(0.225_0.04_280)_0%,oklch(0.19_0.035_278)_100%)] shadow-[0_1px_0_oklch(0.97_0.008_295/0.05)_inset,0_24px_60px_-28px_oklch(0_0_0/0.55)]";

const cardVariants = cva(
  "rounded-[14px] text-card-foreground transition-[border-color,background-color] duration-200",
  {
    variants: {
      variant: {
        default: surface,
        elevated: surface,
        interactive: `${surface} cursor-pointer hover:border-[oklch(0.97_0.008_295/0.18)]`,
        "gradient-border": surface,
        ghost: "border-0 bg-transparent shadow-none",
        blur: surface
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface CardProps extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {}function Card(


{ className, variant, children, ref, ...props }: CardProps & {ref?: React.Ref<HTMLDivElement>;}) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}>

        {children}
      </div>);

}

Card.displayName = "Card";function CardHeader(




{ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & {ref?: React.Ref<HTMLDivElement>;}) {return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-y-1.5 p-6", className)}
      {...props} />);}


CardHeader.displayName = "CardHeader";function CardTitle(




{ className, children, ref, ...props }: React.HTMLAttributes<HTMLHeadingElement> & {ref?: React.Ref<HTMLParagraphElement>;}) {return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}>
      {children}
    </h3>);}


CardTitle.displayName = "CardTitle";function CardDescription(




{ className, ref, ...props }: React.HTMLAttributes<HTMLParagraphElement> & {ref?: React.Ref<HTMLParagraphElement>;}) {return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props} />);}


CardDescription.displayName = "CardDescription";function CardContent(




{ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & {ref?: React.Ref<HTMLDivElement>;}) {return (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />);}

CardContent.displayName = "CardContent";function CardFooter(




{ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & {ref?: React.Ref<HTMLDivElement>;}) {return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props} />);}


CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
