import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Heading variants
const headingVariants = cva(
  "font-signal font-bold tracking-tight",
  {
    variants: {
      variant: {
        h1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
        h2: "text-3xl md:text-4xl lg:text-5xl leading-tight",
        h3: "text-2xl md:text-3xl lg:text-4xl leading-tight",
        h4: "text-xl md:text-2xl lg:text-3xl leading-tight",
        h5: "text-lg md:text-xl lg:text-2xl leading-tight",
        h6: "text-base md:text-lg lg:text-xl leading-tight",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent",
        "gradient-subtle": "bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent",
        lilac: "text-lilac",
        orchid: "text-orchid",
        skyward: "text-skyward",
      },
    },
    defaultVariants: {
      variant: "h1",
      color: "default",
    },
  }
);

// Text variants
const textVariants = cva(
  "font-hind",
  {
    variants: {
      variant: {
        large: "text-xl leading-relaxed",
        base: "text-base leading-relaxed",
        small: "text-sm leading-relaxed",
        xs: "text-xs leading-relaxed",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        lilac: "text-lilac",
        orchid: "text-orchid",
        skyward: "text-skyward",
        gradient: "bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "base",
      color: "default",
      weight: "normal",
    },
  }
);

// Label variants
const labelVariants = cva(
  "font-medium text-sm",
  {
    variants: {
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        lilac: "text-lilac",
        orchid: "text-orchid",
        skyward: "text-skyward",
      },
      required: {
        true: "after:content-['*'] after:ml-1 after:text-destructive",
        false: "",
      },
    },
    defaultVariants: {
      color: "default",
      required: false,
    },
  }
);

// Caption variants
const captionVariants = cva(
  "text-xs text-muted-foreground",
  {
    variants: {
      color: {
        default: "text-muted-foreground",
        lilac: "text-lilac/70",
        orchid: "text-orchid/70",
        skyward: "text-skyward/70",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

// Heading Component
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = "h1", color, as, ...props }, ref) => {
    const Component = as || variant || "h1";
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ variant, color }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

// Text Component
export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, color, weight, as = "p", ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, color, weight }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

// Label Component
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, color, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ color, required }), className)}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

// Caption Component
export interface CaptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof captionVariants> {}

const Caption = React.forwardRef<HTMLParagraphElement, CaptionProps>(
  ({ className, color, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(captionVariants({ color }), className)}
        {...props}
      />
    );
  }
);
Caption.displayName = "Caption";

// Code Component
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "inline" | "block";
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant = "inline", children, ...props }, ref) => {
    if (variant === "block") {
      return (
        <pre
          ref={ref as any}
          className={cn(
            "rounded-lg bg-shadow/5 dark:bg-shadow/20 border border-border p-4 overflow-x-auto",
            "font-mono text-sm",
            className
          )}
          {...props}
        >
          <code>{children}</code>
        </pre>
      );
    }

    return (
      <code
        ref={ref}
        className={cn(
          "rounded bg-lilac/10 px-1.5 py-0.5 font-mono text-sm text-lilac",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);
Code.displayName = "Code";

// Blockquote Component
export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "border-l-4 border-lilac/50 pl-4 italic text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Blockquote.displayName = "Blockquote";

export {
  Heading,
  Text,
  Label,
  Caption,
  Code,
  Blockquote,
  headingVariants,
  textVariants,
  labelVariants,
  captionVariants,
};