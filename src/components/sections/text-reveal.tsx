"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React from "react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

// Modified component from Magic UI
// Original source: https://magicui.design/docs/components/text-reveal
// Modified to follow our coding standards and design system
// We respect copyright and attribution to the original creators

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
  title?: string;
  maxWidth?: string;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  title,
  className,
  maxWidth,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");
  
  // Find the indices for the highlight phrase
  const fullText = children.toLowerCase();
  const highlightPhrase = "my mission is to empower mortgage professionals with the tools and knowledge they need to thrive in this new era";
  const highlightStart = fullText.indexOf(highlightPhrase);
  const highlightEnd = highlightStart + highlightPhrase.length;
  
  // Calculate which words should be highlighted
  let charCount = 0;
  const highlightedIndices = new Set<number>();
  
  words.forEach((word, i) => {
    const wordStart = charCount;
    const wordEnd = charCount + word.length;
    
    if (wordStart >= highlightStart && wordEnd <= highlightEnd) {
      highlightedIndices.add(i);
    }
    
    charCount += word.length + 1; // +1 for space
  });

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[120vh]", className)}
      style={{ maxWidth: maxWidth || "56rem" }}
    >
      <div className="sticky top-0 mx-auto flex h-[50%] items-center bg-transparent px-[1rem] py-[2rem]">
        <div ref={targetRef} className="flex flex-col justify-center">
          {title && (
            <span className="text-foreground text-center text-lg font-medium tracking-tight mb-4">
              {title}
            </span>
          )}
          <span
            className={cn(
              "flex flex-wrap text-2xl font-semibold text-black/20 md:text-3xl lg:text-4xl xl:text-5xl dark:text-white/20",
              className,
            )}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              const isHighlighted = highlightedIndices.has(i);
              const isFirstHighlighted = isHighlighted && !highlightedIndices.has(i - 1);
              const isLastHighlighted = isHighlighted && !highlightedIndices.has(i + 1);
              
              if (isFirstHighlighted) {
                // Start of highlighted section - collect all highlighted words
                const highlightedWords = [];
                let j = i;
                while (highlightedIndices.has(j)) {
                  highlightedWords.push(words[j]);
                  j++;
                }
                
                return (
                  <span key={i} className="inline-flex flex-wrap bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent font-bold">
                    {highlightedWords.map((hw, idx) => {
                      const wordIndex = i + idx;
                      const wordStart = wordIndex / words.length;
                      const wordEnd = wordStart + 1 / words.length;
                      return (
                        <Word 
                          key={wordIndex} 
                          progress={scrollYProgress} 
                          range={[wordStart, wordEnd]}
                          isHighlighted={true}
                          useGradient={false}
                        >
                          {hw}
                        </Word>
                      );
                    })}
                  </span>
                );
              } else if (!isHighlighted) {
                // Regular non-highlighted word
                return (
                  <Word 
                    key={i} 
                    progress={scrollYProgress} 
                    range={[start, end]}
                    isHighlighted={false}
                  >
                    {word}
                  </Word>
                );
              } else {
                // Part of highlighted section already rendered
                return null;
              }
            }).filter(Boolean)}
          </span>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
  useGradient?: boolean;
}

const Word: FC<WordProps> = ({ children, progress, range, isHighlighted = false, useGradient = true }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className={cn(
        "absolute opacity-30",
        isHighlighted && "opacity-20"
      )}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={cn(
          isHighlighted && useGradient
            ? "bg-gradient-to-r from-lilac via-orchid to-skyward bg-clip-text text-transparent font-bold"
            : isHighlighted && !useGradient
            ? "text-transparent"
            : "text-black dark:text-white"
        )}
      >
        {children}
      </motion.span>
    </span>
  );
};