import { ActivitySquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-neon-400/20 bg-neon-500/15 text-neon-300 shadow-glow">
        <ActivitySquare className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold tracking-[0.25em] text-neon-300">ALPHAPULSE</div>
        <div className="text-xs text-white/45">NXR Screener</div>
      </div>
    </div>
  );
}
