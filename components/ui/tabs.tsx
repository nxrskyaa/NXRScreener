"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Tab = { value: string; label: React.ReactNode };

export function Tabs({
  tabs,
  value,
  onValueChange,
  className,
}: {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl", className)}>
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            onClick={() => onValueChange(tab.value)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm transition-all",
              active ? "bg-neon-500 text-black shadow-glow" : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
