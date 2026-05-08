"use client";

import { motion } from "framer-motion";
import { ArrowRight, Radar, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({
  onExplore,
  onTrending,
}: {
  onExplore: () => void;
  onTrending: () => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,255,102,0.14),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-16 shadow-soft md:px-10 md:py-24">
      <div className="absolute inset-0 bg-hero-radial opacity-60" />
      <motion.div
        className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-neon-500/15 blur-3xl"
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-500/20 bg-neon-500/10 px-4 py-2 text-xs font-medium text-neon-100 backdrop-blur">
          <Radar className="h-3.5 w-3.5" />
          Realtime onchain intelligence dashboard
        </div>
        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
          Track Smart Money Before Everyone Else
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
          Realtime onchain market intelligence powered by DexScreener.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={onExplore} size="lg" className="min-w-44">
            Explore Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button onClick={onTrending} variant="outline" size="lg" className="min-w-44">
            View Trending Tokens
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Smart flow", "Adaptive scoring from boosts, liquidity and volume"],
            ["Realtime refresh", "Auto updates every 30 seconds"],
            ["Terminal-grade", "Glassmorphism cards with neon accent states"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-4 text-left backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-neon-200">
                <ShieldAlert className="h-4 w-4" />
                {title}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/55">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
