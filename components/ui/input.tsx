import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white placeholder:text-white/35 shadow-sm outline-none transition focus:border-neon-500/40 focus:ring-2 focus:ring-neon-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
