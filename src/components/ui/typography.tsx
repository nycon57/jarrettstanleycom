import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Heading variants
const headingVariants = cva(
  "font-signal font-semibold tracking-tight",
  {
    variants: {
      variant: {
        h1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
        h2: "text-3xl md:text-4xl lg:text-5xl leading-tight",
        h3: "text-2xl md:text-3xl lg:text-4xl leading-tight",
        h4: "text-xl md:text-2xl lg:text-3xl leading-tight",
        h5: "text-lg md:text-xl lg:text-2xl leading-tight",
        h6: "text-base md:text-lg lg:text-xl leading-tight"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent",
        "gradient-subtle": "bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent",
        lilac: "text-lilac",
        orchid: "text-orchid",
        skyward: "text-skyward"
      }
    },
    defaultVariants: {
      variant: "h1",
      color: "default"
    }
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
        xs: "text-xs leading-relaxed"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        lilac: "text-lilac",
        orchid: "text-orchid",
        skyward: "text-skyward",
        gradient: "bg-gradient-to-r from-lilac to-orchid bg-clip-text text-transparent"
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-semibold"
      }
    },
    defaultVariants: {
      variant: "base",
      color: "default",
      weight: "normal"
    }
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
        skyward: "text-skyward"
      },
      required: {
        true: "after:content-['*'] after:ml-1 after:text-destructive",
        false: ""
      }
    },
    defaultVariants: {
      color: "default",
      required: false
    }
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
        skyward: "text-skyward/70"
      }
    },
    defaultVariants: {
      color: "default"
    }
  }
);

// Heading Component
interface HeadingProps extends
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
  VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}function Heading(


{ className, variant = "h1", color, as, ref, ...props }: HeadingProps & {ref?: React.Ref<HTMLHeadingElement>;}) {
  const Component = as || variant || "h1";
  return (
    <Component
      ref={ref}
      className={cn(headingVariants({ variant, color }), className)}
      {...props} />);


}

Heading.displayName = "Heading";

// Text Component
interface TextProps extends
  Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
  VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}function Text(


{ className, variant, color, weight, as = "p", ref, ...props }: TextProps & {ref?: React.Ref<HTMLParagraphElement>;}) {
  const Component = as;
  return (
    <Component
      ref={ref}
      className={cn(textVariants({ variant, color, weight }), className)}
      {...props} />);


}

Text.displayName = "Text";

// Label Component
interface LabelProps extends
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'color'>,
  VariantProps<typeof labelVariants> {
  htmlFor: string;
}function Label(


{ className, color, required, htmlFor, ref, ...props }: LabelProps & {ref?: React.Ref<HTMLLabelElement>;}) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(labelVariants({ color, required }), className)}
      {...props} />);


}

Label.displayName = "Label";

// Caption Component
interface CaptionProps extends
  Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
  VariantProps<typeof captionVariants> {}function Caption(


{ className, color, ref, ...props }: CaptionProps & {ref?: React.Ref<HTMLParagraphElement>;}) {
  return (
    <p
      ref={ref}
      className={cn(captionVariants({ color }), className)}
      {...props} />);


}

Caption.displayName = "Caption";

// Code Component
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "inline" | "block";
}function Code(


{ className, variant = "inline", children, ref, ...props }: CodeProps & {ref?: React.Ref<HTMLElement>;}) {
  if (variant === "block") {
    return (
      <pre
        ref={ref as any}
        className={cn(
          "rounded-lg bg-shadow/5 dark:bg-shadow/20 border border-border p-4 overflow-x-auto",
          "font-mono text-sm",
          className
        )}
        {...props}>

          <code>{children}</code>
        </pre>);

  }

  return (
    <code
      ref={ref}
      className={cn(
        "rounded bg-lilac/10 px-1.5 py-0.5 font-mono text-sm text-lilac",
        className
      )}
      {...props}>

        {children}
      </code>);

}

Code.displayName = "Code";

// Blockquote Component
interface BlockquoteProps extends
  React.BlockquoteHTMLAttributes<HTMLQuoteElement> {}function Blockquote(


{ className, ref, ...props }: BlockquoteProps & {ref?: React.Ref<HTMLQuoteElement>;}) {
  return (
    <blockquote
      ref={ref}
      className={cn(
        "border-l-4 border-lilac/50 pl-4 italic text-muted-foreground",
        className
      )}
      {...props} />);


}

Blockquote.displayName = "Blockquote";

export {
  Heading,
  Text,
  Label,
  Caption,
  Code,
  Blockquote };
