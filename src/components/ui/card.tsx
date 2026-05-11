import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl bg-card text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border shadow-sm",
        elevated: "shadow-lg hover:shadow-xl border border-border/50",
        interactive: "border shadow-sm hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        "gradient-border": "relative bg-gradient-to-br from-lilac/10 to-orchid/10 p-[1px]",
        ghost: "border-0 shadow-none",
        blur: "bg-card/50 backdrop-blur-sm border border-white/10 shadow-xl"
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
  if (variant === "gradient-border") {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}>

          <div className="relative bg-card rounded-xl h-full">
            {children}
          </div>
        </div>);

  }

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
