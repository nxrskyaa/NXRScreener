import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value?: number | null, maxFractionDigits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(maxFractionDigits)}B`;
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(maxFractionDigits)}M`;
  if (abs >= 1_000) return `$${(value / 1_000).toFixed(maxFractionDigits)}K`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

export function formatNumber(value?: number | null, maxFractionDigits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(maxFractionDigits)}B`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(maxFractionDigits)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(maxFractionDigits)}K`;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

export function formatPercent(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatCompactTime(dateLike?: string | number | null) {
  if (!dateLike) return "—";
  const date = typeof dateLike === "number" ? new Date(dateLike) : new Date(dateLike);
  if (Number.isNaN(date.getTime())) return "—";
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function truncateAddress(address: string, head = 6, tail = 4) {
  if (!address) return "—";
  if (address.length <= head + tail + 3) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

export function chainLabel(chainId?: string) {
  const map: Record<string, string> = {
    ethereum: "Ethereum",
    solana: "Solana",
    base: "Base",
    bsc: "BSC",
    arbitrum: "Arbitrum",
    polygon: "Polygon",
    avax: "Avalanche",
    optimism: "Optimism",
    cronos: "Cronos",
  };
  return map[String(chainId || "").toLowerCase()] ?? chainId ?? "Unknown";
}

export function chainBadgeClass(chainId?: string) {
  const key = String(chainId || "").toLowerCase();
  if (key === "solana") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-200";
  if (key === "base") return "border-sky-400/20 bg-sky-400/10 text-sky-200";
  if (key === "bsc") return "border-amber-400/20 bg-amber-400/10 text-amber-200";
  if (key === "arbitrum") return "border-violet-400/20 bg-violet-400/10 text-violet-200";
  return "border-neon-400/20 bg-neon-500/10 text-neon-100";
}
