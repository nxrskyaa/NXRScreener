import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink, Globe, Link2, LineChart, PiggyBank, ShieldCheck, WalletCards } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchTokenDetails, searchTokens } from "@/lib/dexscreener";
import { chainBadgeClass, chainLabel, formatCurrency, formatPercent, truncateAddress } from "@/lib/utils";

type Props = {
  params: { address: string };
  searchParams?: { chain?: string };
};

export default async function TokenPage({ params, searchParams }: Props) {
  const address = params.address;
  const chain = searchParams?.chain;
  const token = await fetchTokenDetails(address, chain);

  if (!token) notFound();

  const related = token.baseToken?.address ? await searchTokens(token.baseToken.address) : [];
  const pair = token;
  const price = pair.priceUsd ? Number(pair.priceUsd) : undefined;
  const volume = pair.volume?.h24 ?? 0;
  const liquidity = pair.liquidity?.usd ?? 0;
  const buys = pair.txns?.h24?.buys ?? 0;
  const sells = pair.txns?.h24?.sells ?? 0;
  const buyRatio = sells === 0 ? buys : buys / sells;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <Badge className={chainBadgeClass(pair.chainId)}>{chainLabel(pair.chainId)}</Badge>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(0,255,102,0.14),transparent_35%)] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                {pair.info?.imageUrl ? (
                  <img src={pair.info.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-lg font-semibold text-neon-200">{pair.baseToken?.symbol?.slice(0, 3) || "NX"}</div>
                )}
              </div>
              <div>
                <div className="text-sm text-white/45">Token detail</div>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                  {pair.baseToken?.name || "Unknown"} <span className="text-white/45">({pair.baseToken?.symbol || "—"})</span>
                </h1>
                <div className="mt-2 text-sm text-white/45">
                  Contract {truncateAddress(pair.baseToken?.address || address)} · Pair {truncateAddress(pair.pairAddress || "—")}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Price", price ? formatCurrency(price, 6) : "—"],
                ["Volume 24h", formatCurrency(volume)],
                ["Liquidity", formatCurrency(liquidity)],
                ["Buy/Sell", sells === 0 ? `${buys}:0` : `${buyRatio.toFixed(2)}x`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/35">{label}</div>
                  <div className="mt-2 text-xl font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard title="Pair Info" icon={<Link2 className="h-4 w-4" />}>
                <LineRow label="DEX" value={pair.dexId || "—"} />
                <LineRow label="Pair address" value={truncateAddress(pair.pairAddress || "—")} />
                <LineRow label="Created" value={pair.pairCreatedAt ? new Date(pair.pairCreatedAt).toLocaleDateString() : "—"} />
              </InfoCard>

              <InfoCard title="Market Stats" icon={<WalletCards className="h-4 w-4" />}>
                <LineRow label="FDV" value={formatCurrency(pair.fdv)} />
                <LineRow label="Market cap" value={formatCurrency(pair.marketCap)} />
                <LineRow label="24h price change" value={formatPercent(pair.priceChange?.h24)} />
              </InfoCard>
            </div>

            <InfoCard title="External Links" icon={<Globe className="h-4 w-4" />}>
              <div className="grid gap-3 sm:grid-cols-2">
                {(pair.info?.websites || []).map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <span>{site.label || site.url}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
                {(pair.info?.socials || []).map((social) => (
                  <a
                    key={`${social.type}-${social.url}`}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <span>{social.type || "social"}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
                <a
                  href={pair.url || `https://dexscreener.com/search?q=${encodeURIComponent(pair.baseToken?.symbol || address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between rounded-2xl border border-neon-500/20 bg-neon-500/10 px-4 py-3 text-sm text-neon-100 transition hover:bg-neon-500/15"
                >
                  <span>Open on DexScreener</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </InfoCard>

            <InfoCard title="Related Pairs" icon={<ShieldCheck className="h-4 w-4" />}>
              <div className="grid gap-3">
                {related.slice(0, 5).map((item) => (
                  <Link
                    key={item.pairAddress}
                    href={`/token/${item.baseToken?.address || address}?chain=${item.chainId || ""}`}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-white">{item.baseToken?.name || "Unknown"} ({item.baseToken?.symbol || "—"})</div>
                        <div className="text-sm text-white/45">
                          {chainLabel(item.chainId)} · {item.dexId || "DEX"} · {truncateAddress(item.pairAddress || "—")}
                        </div>
                      </div>
                      <div className="text-right text-sm text-white/75">
                        <div>{item.priceUsd ? formatCurrency(Number(item.priceUsd)) : "—"}</div>
                        <div className="text-white/40">Vol {formatCurrency(item.volume?.h24)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </InfoCard>
          </div>

          <div className="space-y-6">
            <InfoCard title="Chart" icon={<LineChart className="h-4 w-4" />}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/50">
                <iframe
                  src={pair.url || `https://dexscreener.com/${pair.chainId || "ethereum"}/${pair.pairAddress || address}`}
                  className="h-[420px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-3 text-xs text-white/40">Chart iframe uses the DexScreener pair page as a best-effort embed.</p>
            </InfoCard>

            <InfoCard title="Trade Breakdown" icon={<PiggyBank className="h-4 w-4" />}>
              <div className="space-y-4">
                <MeterRow label="Buys" value={buys} max={Math.max(buys + sells, 1)} />
                <MeterRow label="Sells" value={sells} max={Math.max(buys + sells, 1)} />
                <MeterRow label="Boost intensity" value={pair.boosts?.active || 0} max={10} />
              </div>
            </InfoCard>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/55">
              The detail page resolves token pairs across supported chains, then prefers the highest-scoring pair for the view.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="text-neon-200">{icon}</div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function LineRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm">
      <span className="text-white/45">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function MeterRow({ label, value, max }: { label: string; value: number; max: number }) {
  const width = Math.min(100, (value / Math.max(max, 1)) * 100);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/55">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-black/30">
        <div className="h-full rounded-full bg-neon-500/80" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
