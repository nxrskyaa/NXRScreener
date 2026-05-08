const API = "https://api.dexscreener.com";

export async function fetchTrendingBoosts() {
  try {
    const res = await fetch(`${API}/token-boosts/latest/v1`, {
      next: { revalidate: 30 }
    });
    return await res.json();
  } catch {
    return [];
  }
}

export async function searchTokens(query: string) {
  if (!query) return [];
  try {
    const res = await fetch(`${API}/latest/dex/search?q=${query}`);
    const data = await res.json();
    return data.pairs || [];
  } catch {
    return [];
  }
}

export async function fetchTokenDetails(address: string) {
  try {
    const res = await fetch(`${API}/latest/dex/tokens/${address}`, {
      next: { revalidate: 30 }
    });
    return await res.json();
  } catch {
    return { pairs: [] };
  }
}