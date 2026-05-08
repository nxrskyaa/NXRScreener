"use client";

import { Tabs } from "@/components/ui/tabs";
import type { ChainId } from "@/types/dexscreener";

const chains: { value: "all" | ChainId; label: string }[] = [
  { value: "all", label: "All Chains" },
  { value: "ethereum", label: "Ethereum" },
  { value: "solana", label: "Solana" },
  { value: "base", label: "Base" },
  { value: "bsc", label: "BSC" },
  { value: "arbitrum", label: "Arbitrum" },
];

export function ChainTabs({
  value,
  onChange,
}: {
  value: "all" | ChainId;
  onChange: (value: "all" | ChainId) => void;
}) {
  return (
    <Tabs
      tabs={chains}
      value={value}
      onValueChange={(next) => onChange(next as "all" | ChainId)}
    />
  );
}
