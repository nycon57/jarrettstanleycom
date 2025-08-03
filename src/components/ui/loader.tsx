"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
} as const;

const iconSizes = {
  sm: 32,
  md: 64,
  lg: 96,
} as const;

export function Loader({ className, size = "md", ...props }: LoaderProps) {
  const sizeClass = sizeClasses[size];
  const iconSize = iconSizes[size];

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "relative",
          sizeClass,
          "flex items-center justify-center"
        )}
      >
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-orchid/30"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        {/* Inner rotating ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-lavender/50"
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        {/* Animated icon */}
        <motion.div
          className={cn("relative", size === "sm" ? "w-8 h-8" : "w-16 h-16")}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5, // Slightly offset from rings for visual interest
          }}
        >
          <Image
            src="/assets/images/TrueToneAI-Icon-Logo-Full-Color.png"
            alt="TrueTone AI"
            width={iconSize}
            height={iconSize}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
