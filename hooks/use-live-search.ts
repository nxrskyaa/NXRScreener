"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import type { DexPair } from "@/types/dexscreener";
import { searchTokens } from "@/lib/dexscreener";

export function useLiveSearch(query: string) {
  const debounced = useDebounce(query, 400);
  const [results, setResults] = useState<DexPair[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function run() {
      const q = debounced.trim();
      if (!q) {
        setResults([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await searchTokens(q);
        if (!active) return;
        setResults(data.slice(0, 8));
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void run();
    return () => {
      active = false;
    };
  }, [debounced]);

  return { results, isLoading, error };
}
