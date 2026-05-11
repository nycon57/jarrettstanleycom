import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Spinner variants
const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-12"
      },
      color: {
        default: "text-foreground",
        lilac: "text-lilac",
        orchid: "text-orchid",
        skyward: "text-skyward",
        gradient: "text-lilac"
      }
    },
    defaultVariants: {
      size: "md",
      color: "default"
    }
  }
);

// Progress bar variants
const progressVariants = cva(
  "h-2 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

// Skeleton variants
const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

// Spinner Component
interface SpinnerProps extends
  Omit<React.SVGAttributes<SVGSVGElement>, 'color'>,
  VariantProps<typeof spinnerVariants> {
  label?: string;
}function Spinner(


{ className, size, color, label, ref, ...props }: SpinnerProps & {ref?: React.Ref<SVGSVGElement>;}) {
  const isGradient = color === "gradient";

  return (
    <div className="inline-flex flex-col items-center gap-2">
        <svg
        ref={ref}
        className={cn(spinnerVariants({ size, color: isGradient ? "lilac" : color }), className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}>

          {isGradient ?
        <defs>
              <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#907AD6" />
                <stop offset="50%" stopColor="#4F518C" />
                <stop offset="100%" stopColor="#7FDEFF" />
              </linearGradient>
            </defs> :
        null}
          <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4" />

          <path
          className="opacity-75"
          fill={isGradient ? "url(#spinner-gradient)" : "currentColor"}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />

        </svg>
        {label &&
      <span className="text-sm text-muted-foreground">{label}</span>
      }
      </div>);

}

Spinner.displayName = "Spinner";

// Progress Bar Component
interface ProgressBarProps extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  color?: "default" | "gradient" | "lilac" | "orchid" | "skyward";
  showLabel?: boolean;
}function ProgressBar(


{ className, size, value = 0, max = 100, color = "default", showLabel = false, ref, ...props }: ProgressBarProps & {ref?: React.Ref<HTMLDivElement>;}) {
  const percentage = Math.min(100, Math.max(0, value / max * 100));

  const getProgressColor = () => {
    switch (color) {
      case "gradient":
        return "bg-gradient-to-r from-lilac to-orchid";
      case "lilac":
        return "bg-lilac";
      case "orchid":
        return "bg-orchid";
      case "skyward":
        return "bg-skyward";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="w-full gap-y-1">
        {showLabel &&
      <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{Math.round(percentage)}%</span>
          </div>
      }
        <div
        ref={ref}
        className={cn(progressVariants({ size }), className)}
        {...props}>

          <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            getProgressColor()
          )}
          style={{ width: `${percentage}%` }} />

        </div>
      </div>);

}

ProgressBar.displayName = "ProgressBar";

// Skeleton Component
interface SkeletonProps extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof skeletonVariants> {}function Skeleton(


{ className, variant, ref, ...props }: SkeletonProps & {ref?: React.Ref<HTMLDivElement>;}) {
  return (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      {...props} />);


}

Skeleton.displayName = "Skeleton";

// Dots Loading Component
interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "default" | "lilac" | "orchid" | "skyward";
}function Dots(


{ className, size = "md", color = "default", ref, ...props }: DotsProps & {ref?: React.Ref<HTMLDivElement>;}) {
  const sizeClasses = {
    sm: "gap-x-1",
    md: "gap-x-1.5",
    lg: "gap-x-2"
  };

  const dotSizeClasses = {
    sm: "size-1.5",
    md: "size-2",
    lg: "size-3"
  };

  const colorClasses = {
    default: "bg-foreground",
    lilac: "bg-lilac",
    orchid: "bg-orchid",
    skyward: "bg-skyward"
  };

  return (
    <div
      ref={ref}
      className={cn("inline-flex items-center", sizeClasses[size], className)}
      {...props}>

        {[
          { id: "first", delay: 0 },
          { id: "second", delay: 150 },
          { id: "third", delay: 300 }
        ].map((dot) =>
      <div
        key={dot.id}
        className={cn(
          "rounded-full animate-pulse",
          dotSizeClasses[size],
          colorClasses[color]
        )}
        style={{
          animationDelay: `${dot.delay}ms`
        }} />

      )}
      </div>);

}

Dots.displayName = "Dots";

// Pulse Component
interface PulseProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "lilac" | "orchid" | "skyward";
}function Pulse(


{ className, size = "md", color = "lilac", ref, ...props }: PulseProps & {ref?: React.Ref<HTMLDivElement>;}) {
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
    xl: "size-24"
  };

  const colorClasses = {
    lilac: "bg-lilac",
    orchid: "bg-orchid",
    skyward: "bg-skyward"
  };

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex", sizeClasses[size], className)}
      {...props}>

        <div
        className={cn(
          "absolute inset-0 rounded-full opacity-75 animate-ping",
          colorClasses[color]
        )} />

        <div
        className={cn(
          "relative inline-flex rounded-full",
          sizeClasses[size],
          colorClasses[color]
        )} />

      </div>);

}

Pulse.displayName = "Pulse";

export {
  Spinner,
  ProgressBar,

  Dots,
  Pulse };
