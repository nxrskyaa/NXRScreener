import { fetchTrendingBoosts } from "@/lib/dexscreener";

export default async function Trending() {
  const tokens = await fetchTrendingBoosts();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-green-400">
        Trending Boosts
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {tokens?.slice(0, 9).map((token: any, index: number) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 glow"
          >
            <div className="flex items-center gap-4">
              {token.icon && (
                <img
                  src={token.icon}
                  alt={token.tokenAddress}
                  className="w-12 h-12 rounded-full"
                />
              )}

              <div>
                <h3 className="font-bold">{token.description || "Token"}</h3>
                <p className="text-sm text-zinc-400">{token.chainId}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-zinc-300">
              Boost Amount: {token.amount || "N/A"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}