import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.dexscreener.com";

export async function GET(_: NextRequest, { params }: { params: { chainId: string; address: string } }) {
  const res = await fetch(`${BASE_URL}/token-pairs/v1/${encodeURIComponent(params.chainId)}/${encodeURIComponent(params.address)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
