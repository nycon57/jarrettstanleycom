import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Spinner variants
const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      color: {
        default: "text-foreground",
        lilac: "text-lilac",
        orchid: "text-orchid",
        skyward: "text-skyward",
        gradient: "text-lilac",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
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
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Skeleton variants
const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Spinner Component
export interface SpinnerProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, color, label, ...props }, ref) => {
    const isGradient = color === "gradient";
    
    return (
      <div className="inline-flex flex-col items-center gap-2">
        <svg
          ref={ref}
          className={cn(spinnerVariants({ size, color: isGradient ? "lilac" : color }), className)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          {...props}
        >
          {isGradient ? (
            <defs>
              <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#907AD6" />
                <stop offset="50%" stopColor="#4F518C" />
                <stop offset="100%" stopColor="#7FDEFF" />
              </linearGradient>
            </defs>
          ) : null}
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill={isGradient ? "url(#spinner-gradient)" : "currentColor"}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

// Progress Bar Component
export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  color?: "default" | "gradient" | "lilac" | "orchid" | "skyward";
  showLabel?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, size, value = 0, max = 100, color = "default", showLabel = false, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
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
      <div className="w-full space-y-1">
        {showLabel && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ size }), className)}
          {...props}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              getProgressColor()
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

// Skeleton Component
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

// Dots Loading Component
export interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "default" | "lilac" | "orchid" | "skyward";
}

const Dots = React.forwardRef<HTMLDivElement, DotsProps>(
  ({ className, size = "md", color = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "space-x-1",
      md: "space-x-1.5",
      lg: "space-x-2",
    };
    
    const dotSizeClasses = {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-3 h-3",
    };
    
    const colorClasses = {
      default: "bg-foreground",
      lilac: "bg-lilac",
      orchid: "bg-orchid",
      skyward: "bg-skyward",
    };
    
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center", sizeClasses[size], className)}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full animate-pulse",
              dotSizeClasses[size],
              colorClasses[color]
            )}
            style={{
              animationDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>
    );
  }
);
Dots.displayName = "Dots";

// Pulse Component
export interface PulseProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "lilac" | "orchid" | "skyward";
}

const Pulse = React.forwardRef<HTMLDivElement, PulseProps>(
  ({ className, size = "md", color = "lilac", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-24 h-24",
    };
    
    const colorClasses = {
      lilac: "bg-lilac",
      orchid: "bg-orchid",
      skyward: "bg-skyward",
    };
    
    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", sizeClasses[size], className)}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-75 animate-ping",
            colorClasses[color]
          )}
        />
        <div
          className={cn(
            "relative inline-flex rounded-full",
            sizeClasses[size],
            colorClasses[color]
          )}
        />
      </div>
    );
  }
);
Pulse.displayName = "Pulse";

export {
  Spinner,
  ProgressBar,
  Skeleton,
  Dots,
  Pulse,
  spinnerVariants,
  progressVariants,
  skeletonVariants,
};