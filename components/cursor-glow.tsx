"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      style={{
        background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(0,255,102,0.12), transparent 40%)`,
      }}
    />
  );
}
