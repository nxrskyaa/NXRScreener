import type { BoostEntry, ChainId, DexPair, SearchResponse, SmartMoneyAlert } from "@/types/dexscreener";

const BASE_URL = "/api/dexscreener";

async function safeFetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`DexScreener request failed (${res.status}): ${text.slice(0, 160) || res.statusText}`);
  }

  return res.json() as Promise<T>;
}

function normalizeBoosts(payload: unknown): BoostEntry[] {
  if (Array.isArray(payload)) return payload as BoostEntry[];
  if (payload && typeof payload === "object") return [payload as BoostEntry];
  return [];
}

function normalizePairs(payload: unknown): DexPair[] {
  if (Array.isArray(payload)) return payload as DexPair[];
  if (payload && typeof payload === "object" && "pairs" in (payload as Record<string, unknown>)) {
    const pairs = (payload as SearchResponse).pairs;
    return Array.isArray(pairs) ? pairs : [];
  }
  return [];
}

export async function fetchTrendingBoosts(): Promise<BoostEntry[]> {
  const payload = await safeFetchJSON<unknown>(`${BASE_URL}/boosts`);
  return normalizeBoosts(payload).filter((boost) => !!boost.tokenAddress);
}

export async function searchTokens(query: string): Promise<DexPair[]> {
  const q = query.trim();
  if (!q) return [];
  const payload = await safeFetchJSON<SearchResponse>(`${BASE_URL}/search?q=${encodeURIComponent(q)}`);
  return normalizePairs(payload);
}

export async function fetchPairsByTokenAddress(chainId: string, tokenAddress: string): Promise<DexPair[]> {
  const payload = await safeFetchJSON<unknown>(`${BASE_URL}/token/${encodeURIComponent(chainId)}/${encodeURIComponent(tokenAddress)}`);
  return normalizePairs(payload);
}

export async function fetchTokenDetails(address: string, chainId?: string): Promise<DexPair | null> {
  const chainCandidates = (chainId ? [chainId] : ["ethereum", "solana", "base", "bsc", "arbitrum"]) as string[];

  for (const chain of chainCandidates) {
    try {
      const pairs = await fetchPairsByTokenAddress(chain, address);
      if (pairs.length) {
        return sortPairs(pairs)[0] ?? null;
      }
    } catch {
      // try next chain
    }
  }

  try {
    const search = await searchTokens(address);
    const matched = search.find((pair) => pair.baseToken?.address?.toLowerCase() === address.toLowerCase());
    return matched ?? sortPairs(search)[0] ?? null;
  } catch {
    return null;
  }
}

export function sortPairs(pairs: DexPair[]): DexPair[] {
  return [...pairs].sort((a, b) => {
    const aScore = computePairScore(a);
    const bScore = computePairScore(b);
    return bScore - aScore;
  });
}

export function computePairScore(pair: DexPair): number {
  const liq = pair.liquidity?.usd ?? 0;
  const vol = pair.volume?.h24 ?? 0;
  const buys = pair.txns?.h24?.buys ?? 0;
  const sells = pair.txns?.h24?.sells ?? 0;
  const boost = pair.boosts?.active ?? 0;
  const priceMove = Math.abs(pair.priceChange?.h24 ?? 0);
  return (liq / 10_000) + (vol / 25_000) + (buys * 1.8) + (boost * 50) + (priceMove * 4) - (sells * 0.8);
}

export function buildSmartMoneyAlerts(pairs: DexPair[]): SmartMoneyAlert[] {
  const ranked = sortPairs(pairs).slice(0, 12);
  const verbs = [
    "Smart money accumulating",
    "Whales entering",
    "Momentum detected on",
    "Aggressive buying around",
    "Liquidity clustering in",
    "New flow building for",
  ];

  return ranked
    .filter((pair) => pair.baseToken?.name)
    .map((pair, index) => {
      const symbol = pair.baseToken?.symbol ?? "TOKEN";
      const liquidity = pair.liquidity?.usd ?? 0;
      const volume = pair.volume?.h24 ?? 0;
      const buys = pair.txns?.h24?.buys ?? 0;
      const sells = pair.txns?.h24?.sells ?? 0;
      const boost = pair.boosts?.active ?? 0;
      const ratio = sells === 0 ? buys + 10 : buys / Math.max(sells, 1);
      const score = computePairScore(pair) + ratio * 2;

      let headline = verbs[(index + Math.round(score)) % verbs.length];
      if (boost > 0) headline = "Boosted flow detected on";

      return {
        title: `${headline} ${symbol}`,
        body: `${formatAlertMetric(liquidity, volume, buys, sells, boost)}`,
        pair,
        score,
      };
    });
}

function formatAlertMetric(liquidity: number, volume: number, buys: number, sells: number, boost: number) {
  const buyPressure = sells === 0 ? "extreme" : buys / Math.max(sells, 1) > 1.6 ? "strong" : "moderate";
  const boostText = boost > 0 ? ` boost ${boost}` : "";
  return `liq ${formatK(liquidity)} · vol ${formatK(volume)} · ${buys}/${sells} buys/sells · ${buyPressure}${boostText}`;
}

function formatK(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${Math.round(value)}`;
}

export function fakeRealtimePulse(seed = 0): number {
  const now = Date.now() / 1000;
  return Math.round((Math.sin(now / 6 + seed) + Math.cos(now / 10 + seed * 2) + 2) * 25);
}

export function chainMatches(pair: DexPair, chainId: string) {
  return !chainId || pair.chainId?.toLowerCase() === chainId.toLowerCase();
}
