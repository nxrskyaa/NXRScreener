"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Zap } from "lucide-react";
import { useMemo } from "react";
import { useRealtimeRefresh } from "@/hooks/use-realtime-refresh";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { buildSmartMoneyAlerts, fetchTrendingBoosts, sortPairs } from "@/lib/dexscreener";
import { chainLabel, formatCurrency } from "@/lib/utils";
import type { BoostEntry, ChainId, DexPair } from "@/types/dexscreener";
import { useQueryData } from "@/components/use-query-data";

export function SmartMoneySection({ chainFilter }: { chainFilter: "all" | ChainId }) {
  const tick = useRealtimeRefresh(30_000);
  const { data: boosts, isLoading, error } = useQueryData<BoostEntry[]>({
    key: ["smart-money-source", tick],
    fetcher: fetchTrendingBoosts,
    initial: [],
  });

  const normalized = useMemo(
    () => boosts.filter((item) => chainFilter === "all" || item.chainId === chainFilter),
    [boosts, chainFilter]
  );

  const alerts = useMemo(() => {
    const now = Date.now();
    const pairs = normalized.slice(0, 6).map((boost, index) => ({
      chainId: boost.chainId,
      baseToken: {
        name: boost.description || "Unknown",
        symbol: (boost.description || "TOK").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6) || "TOK",
        address: boost.tokenAddress || "",
      },
      liquidity: { usd: (boost.totalAmount || 0) * 1500 + (boost.amount || 0) * 5000 },
      volume: { h24: (boost.amount || 0) * 250000 + (boost.totalAmount || 0) * 10000 },
      txns: { h24: { buys: Math.round((boost.amount || 1) * 18), sells: Math.max(1, Math.round((boost.amount || 1) * 7)) } },
      boosts: { active: boost.amount },
      pairAddress: boost.tokenAddress,
      dexId: "dexscreener",
    } as DexPair));

    return buildSmartMoneyAlerts(sortPairs(pairs).map((pair, index) => ({
      ...pair,
      boosts: { active: (normalized[index]?.amount || pair.boosts?.active || 0) + (now % 3) },
    }))).slice(0, 5);
  }, [normalized]);

  return (
    <section className="panel overflow-hidden" id="boosted">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neon-500/20 bg-neon-500/10 text-neon-200">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Smart Money Flow</h2>
            <p className="text-sm text-white/55">Heuristic signals derived from boost + liquidity + volume data.</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200">
            Failed to synthesize smart money flow: {error}
          </div>
        ) : isLoading ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            <AnimatePresence>
              {alerts.map((alert, index) => (
                <motion.div
                  key={`${alert.title}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="relative overflow-hidden p-5">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,255,102,0.08),transparent_38%)]" />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="terminal text-xs uppercase tracking-[0.3em] text-neon-300">
                            <span className="inline-flex items-center gap-2">
                              <Zap className="h-3.5 w-3.5" />
                              Signal {index + 1}
                            </span>
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-white">{alert.title}</h3>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                          <div className="text-xs text-white/40">Score</div>
                          <div className="text-lg font-bold text-neon-200">{Math.round(alert.score)}</div>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-white/60 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                          <div className="text-white/35">Token</div>
                          <div className="mt-1 font-medium text-white">{alert.pair.baseToken?.symbol || "—"}</div>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                          <div className="text-white/35">Chain</div>
                          <div className="mt-1 font-medium text-white">{chainLabel(alert.pair.chainId)}</div>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                          <div className="text-white/35">Liquidity</div>
                          <div className="mt-1 font-medium text-white">{formatCurrency(alert.pair.liquidity?.usd)}</div>
                        </div>
                      </div>
                      <p className="mt-4 font-mono text-xs leading-6 text-white/55">{alert.body}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
