"use client";

import { useEffect, useMemo, useState } from "react";

export function useQueryData<T>({
  key,
  fetcher,
  initial,
}: {
  key: unknown[];
  fetcher: () => Promise<T>;
  initial: T;
}) {
  const [data, setData] = useState<T>(initial);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stableKey = useMemo(() => JSON.stringify(key), [key]);

  useEffect(() => {
    let active = true;

    (async () => {
      setIsLoading(true);
      try {
        const next = await fetcher();
        if (!active) return;
        setData(next);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Request failed");
      } finally {
        if (active) setIsLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [stableKey, fetcher]);

  return { data, isLoading, error };
}
