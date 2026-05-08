import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.dexscreener.com";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ schemaVersion: "1.0.0", pairs: [] });
  }

  const res = await fetch(`${BASE_URL}/latest/dex/search?q=${encodeURIComponent(q)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
