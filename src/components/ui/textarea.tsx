"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
function Textarea(


{ className, ref, ...props }: TextareaProps & {ref?: React.Ref<HTMLTextAreaElement>;}) {
  return (
    <textarea
      className={cn(
        "flex min-h-[96px] w-full rounded-lg border border-[oklch(0.97_0.008_295/0.14)] bg-hp-lift px-3.5 py-2 text-[0.9375rem] text-hp-text placeholder:text-hp-soft transition-colors duration-200 hover:border-[oklch(0.97_0.008_295/0.24)] py-2.5 leading-relaxed focus-visible:border-[oklch(0.72_0.155_298/0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[oklch(0.85_0.12_298)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />);


}

Textarea.displayName = "Textarea";

export { Textarea };
