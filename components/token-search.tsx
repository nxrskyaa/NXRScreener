"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowUpRight, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useLiveSearch } from "@/hooks/use-live-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { chainBadgeClass, chainLabel, formatCurrency, formatNumber, truncateAddress } from "@/lib/utils";

export function TokenSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const { results, isLoading, error } = useLiveSearch(query);

  const showDropdown = focused && query.trim().length > 0;
  const countText = useMemo(() => `${results.length} results`, [results.length]);

  return (
    <section className="panel overflow-hidden" id="search">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neon-300">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Token Search</h2>
            <p className="text-sm text-white/55">Live DexScreener search with debounced updates.</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => window.setTimeout(() => setFocused(false), 150)}
            placeholder="Search by token, pair, or contract address..."
            className="pl-10 pr-28"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white/40" />
            ) : (
              <span className="text-xs text-white/35">{countText}</span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl"
            >
              {error ? (
                <div className="p-5 text-sm text-red-300">{error}</div>
              ) : results.length === 0 ? (
                <div className="p-5 text-sm text-white/45">No matches found.</div>
              ) : (
                <div className="divide-y divide-white/8">
                  {results.map((pair) => (
                    <Link
                      key={pair.pairAddress || `${pair.chainId}-${pair.baseToken?.address}`}
                      href={`/token/${pair.baseToken?.address || ""}?chain=${pair.chainId || ""}`}
                      className="block p-4 transition hover:bg-white/5"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="font-semibold text-white">
                              {pair.baseToken?.name || "Unknown"} <span className="text-white/45">({pair.baseToken?.symbol || "—"})</span>
                            </div>
                            <Badge className={chainBadgeClass(pair.chainId)}>{chainLabel(pair.chainId)}</Badge>
                          </div>
                          <div className="mt-1 text-sm text-white/45">
                            Pair {truncateAddress(pair.pairAddress || "—")} · {pair.dexId || "DEX"} · {pair.quoteToken?.symbol || "Quote"}
                          </div>
                        </div>

                        <div className="grid gap-2 text-sm text-white/75 md:grid-cols-4 md:text-right">
                          <div>
                            <div className="text-white/40">Price</div>
                            <div>{pair.priceUsd ? formatCurrency(Number(pair.priceUsd)) : "—"}</div>
                          </div>
                          <div>
                            <div className="text-white/40">Volume 24h</div>
                            <div>{formatCurrency(pair.volume?.h24)}</div>
                          </div>
                          <div>
                            <div className="text-white/40">Liquidity</div>
                            <div>{formatCurrency(pair.liquidity?.usd)}</div>
                          </div>
                          <div className="inline-flex items-center justify-end gap-1 text-neon-200">
                            Open
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
