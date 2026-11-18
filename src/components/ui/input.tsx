import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
function Input(


{ className, type, ref, ...props }: InputProps & {ref?: React.Ref<HTMLInputElement>;}) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-[oklch(0.97_0.008_295/0.14)] bg-hp-lift px-3.5 py-2 text-[0.9375rem] text-hp-text placeholder:text-hp-soft transition-colors duration-200 hover:border-[oklch(0.97_0.008_295/0.24)] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-[oklch(0.72_0.155_298/0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[oklch(0.85_0.12_298)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />);


}


Input.displayName = "Input";

export { Input };
