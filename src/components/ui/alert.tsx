import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive:
        "bg-destructive/10 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        // Brand themed variants
        info:
        "bg-skyward/10 border-skyward/30 text-skyward dark:bg-skyward/5 dark:border-skyward/40 [&>svg]:text-skyward",
        success:
        "bg-lavender/10 border-lavender/30 text-orchid dark:bg-lavender/5 dark:border-lavender/40 [&>svg]:text-orchid",
        warning:
        "bg-lilac/10 border-lilac/30 text-lilac dark:bg-lilac/5 dark:border-lilac/40 [&>svg]:text-lilac",
        error:
        "bg-orchid/10 border-orchid/30 text-orchid dark:bg-orchid/5 dark:border-orchid/40 [&>svg]:text-orchid",
        // Gradient variants
        "gradient-info":
        "bg-gradient-to-r from-skyward/10 to-lavender/10 border-skyward/30 text-skyward [&>svg]:text-skyward",
        "gradient-success":
        "bg-gradient-to-r from-lavender/10 to-lilac/10 border-lavender/30 text-orchid [&>svg]:text-orchid",
        "gradient-warning":
        "bg-gradient-to-r from-lilac/10 to-orchid/10 border-lilac/30 text-lilac [&>svg]:text-lilac"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);function Alert(




{ className, variant, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {ref?: React.Ref<HTMLDivElement>;}) {return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props} />);}


Alert.displayName = "Alert";function AlertTitle(




{ className, children, ref, ...props }: React.HTMLAttributes<HTMLHeadingElement> & {ref?: React.Ref<HTMLParagraphElement>;}) {return (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}>
      {children}
    </h5>);}


AlertTitle.displayName = "AlertTitle";function AlertDescription(




{ className, ref, ...props }: React.HTMLAttributes<HTMLParagraphElement> & {ref?: React.Ref<HTMLParagraphElement>;}) {return (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props} />);}


AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
