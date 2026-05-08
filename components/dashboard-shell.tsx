"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronRight, Command, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { TokenSearch } from "@/components/token-search";
import { TrendingSection } from "@/components/trending-section";
import { SmartMoneySection } from "@/components/smart-money-section";
import { ChainTabs } from "@/components/chain-tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { chainBadgeClass, chainLabel } from "@/lib/utils";
import type { ChainId } from "@/types/dexscreener";

export function DashboardShell() {
  const [searchValue, setSearchValue] = useState("");
  const [chainFilter, setChainFilter] = useState<"all" | ChainId>("all");
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const trendingRef = useRef<HTMLDivElement | null>(null);

  const chainSummary = useMemo(
    () => [
      { id: "ethereum", label: "Ethereum" as const, metric: "High-liquidity" },
      { id: "solana", label: "Solana" as const, metric: "Fast flow" },
      { id: "base", label: "Base" as const, metric: "Retail momentum" },
      { id: "bsc", label: "BSC" as const, metric: "Speculative volume" },
      { id: "arbitrum", label: "Arbitrum" as const, metric: "DeFi activity" },
    ],
    []
  );

  return (
    <div className="relative z-10">
      <SiteHeader
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onOpenSearch={() => dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
        <Hero
          onExplore={() => dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          onTrending={() => trendingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />

        <div ref={dashboardRef} id="dashboard" className="mt-8 grid gap-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Realtime feeds", "DexScreener latest boosts, search, and pair data."],
              ["Premium filters", "Chain tabs that keep signal quality high."],
              ["Playbook ready", "Built for Vercel deployment and fast iteration."],
            ].map(([title, desc]) => (
              <Card key={title} className="p-5">
                <div className="flex items-center gap-2 text-neon-200">
                  <Command className="h-4 w-4" />
                  <div className="font-medium">{title}</div>
                </div>
                <div className="mt-2 text-sm leading-6 text-white/55">{desc}</div>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.45fr_0.85fr]">
            <Card className="overflow-hidden p-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-white/45">Network Matrix</div>
                    <h2 className="text-2xl font-semibold">Chain Overview</h2>
                  </div>
                  <Badge className={chainBadgeClass(chainFilter === "all" ? "ethereum" : chainFilter)}>
                    {chainFilter === "all" ? "All Chains" : chainLabel(chainFilter)}
                  </Badge>
                </div>

                <ChainTabs value={chainFilter} onChange={setChainFilter} />

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {chainSummary.map((chain, index) => (
                    <motion.div
                      key={chain.id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setChainFilter(chain.id)}
                      className="cursor-pointer"
                    >
                      <Card className="h-full p-4 transition hover:shadow-glow">
                        <div className="text-xs uppercase tracking-[0.3em] text-white/30">Chain {index + 1}</div>
                        <div className="mt-3 text-base font-semibold">{chain.label}</div>
                        <div className="mt-2 text-sm text-white/55">{chain.metric}</div>
                        <div className="mt-4 inline-flex items-center gap-2 text-xs text-neon-200">
                          Select
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="text-sm text-white/45">Terminal Status</div>
                  <h2 className="text-2xl font-semibold">Live Signal Engine</h2>
                </div>
                <div className="grid gap-3">
                  {[
                    ["API", "Connected"],
                    ["Alerts", "Active"],
                    ["Latency", "< 1s"],
                    ["Refresh", "30s"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      <div className="text-sm text-white/50">{label}</div>
                      <div className={`text-sm font-semibold ${value === "Connected" || value === "< 1s" ? "text-neon-200" : "text-white"}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Wallet className="h-4 w-4" />
                  View Watchlist
                </Button>
              </div>
            </Card>
          </div>

          <TokenSearch />

          <div ref={trendingRef}>
            <TrendingSection chainFilter={chainFilter} />
          </div>

          <SmartMoneySection chainFilter={chainFilter} />
        </div>
      </main>
    </div>
  );
}
