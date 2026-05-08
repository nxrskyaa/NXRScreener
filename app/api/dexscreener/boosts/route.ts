import { NextResponse } from "next/server";

const BASE_URL = "https://api.dexscreener.com";

export async function GET() {
  const res = await fetch(`${BASE_URL}/token-boosts/latest/v1`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
