"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-28 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,120,0.15),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-6xl font-black mb-6">
          Track Smart Money Before Everyone Else
        </h1>

        <p className="text-zinc-400 max-w-2xl mx-auto">
          Realtime onchain market intelligence powered by DexScreener.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-green-400 text-black px-6 py-3 rounded-2xl font-bold glow">
            Explore Dashboard
          </button>

          <button className="border border-white/20 px-6 py-3 rounded-2xl">
            View Trending Tokens
          </button>
        </div>
      </motion.div>
    </section>
  );
}