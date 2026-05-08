"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gauge, RefreshCw, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useRealtimeRefresh } from "@/hooks/use-realtime-refresh";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { chainBadgeClass, chainLabel, formatCurrency, formatNumber, truncateAddress } from "@/lib/utils";
import { fakeRealtimePulse, fetchTrendingBoosts } from "@/lib/dexscreener";
import type { BoostEntry, ChainId } from "@/types/dexscreener";
import { useQueryData } from "@/components/use-query-data";

export function TrendingSection({ chainFilter }: { chainFilter: "all" | ChainId }) {
  const tick = useRealtimeRefresh(30_000);
  const { data, isLoading, error } = useQueryData<BoostEntry[]>({
    key: ["boosts", tick],
    fetcher: fetchTrendingBoosts,
    initial: [],
  });

  const items = useMemo(() => {
    const filtered = (data || []).filter((item) => chainFilter === "all" || item.chainId === chainFilter);
    return filtered.slice(0, 8);
  }, [data, chainFilter]);

  return (
    <section className="panel overflow-hidden" id="trending">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neon-500/20 bg-neon-500/10 text-neon-200">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Trending Tokens</h2>
              <p className="text-sm text-white/55">Latest boosted tokens from DexScreener.</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/55">
            <RefreshCw className="h-3.5 w-3.5" />
            Auto refresh every 30 seconds
          </div>
        </div>
      </div>

      <div className="p-6">
        {error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200">
            Failed to load trending tokens: {error}
          </div>
        ) : isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-60 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AnimatePresence>
              {items.map((item, index) => {
                const pulse = fakeRealtimePulse(index + (item.amount || 0));
                return (
                  <motion.div
                    key={`${item.chainId}-${item.tokenAddress}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link href={`/token/${item.tokenAddress}?chain=${item.chainId || ""}`}>
                      <Card className="group relative h-full overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,102,0.14),transparent_30%)] opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="relative flex h-full flex-col gap-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                                {item.icon ? (
                                  <img src={item.icon} alt="" className="h-full w-full object-cover" />
                                ) : (
                                  <div className="text-sm font-semibold text-neon-200">NX</div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="truncate font-semibold text-white">{item.description || "Boosted token"}</div>
                                <div className="text-xs text-white/45">{truncateAddress(item.tokenAddress || "—")}</div>
                              </div>
                            </div>
                            <Badge className={chainBadgeClass(item.chainId)}>{chainLabel(item.chainId)}</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                              <div className="text-white/40">Boost</div>
                              <div className="mt-1 font-semibold text-neon-100">+{formatNumber(item.amount)}</div>
                            </div>
                            <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                              <div className="text-white/40">Total</div>
                              <div className="mt-1 font-semibold text-white">{formatNumber(item.totalAmount)}</div>
                            </div>
                            <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                              <div className="text-white/40">Momentum</div>
                              <div className="mt-1 font-semibold text-white">{pulse}%</div>
                            </div>
                            <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                              <div className="text-white/40">Status</div>
                              <div className="mt-1 font-semibold text-neon-200">Live</div>
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between text-xs text-white/45">
                            <span className="inline-flex items-center gap-1">
                              <Gauge className="h-3.5 w-3.5 text-neon-300" />
                              Smart money radar
                            </span>
                            <span>{item.url ? "Open token profile" : "Boosted signal"}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
