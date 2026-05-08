"use client";

import { useEffect, useState } from "react";

export function useRealtimeRefresh(intervalMs = 30_000) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return tick;
}
