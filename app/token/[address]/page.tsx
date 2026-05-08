import { fetchTokenDetails } from "@/lib/dexscreener";

export default async function TokenPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;
  const data = await fetchTokenDetails(address);
  const pair = data?.pairs?.[0];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-green-400 mb-8">
        Token Details
      </h1>

      {pair ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-3xl">
          <p>Base Token: {pair.baseToken?.name}</p>
          <p>Symbol: {pair.baseToken?.symbol}</p>
          <p>Price USD: {pair.priceUsd}</p>
          <p>Liquidity: {pair.liquidity?.usd}</p>
          <p>Volume 24h: {pair.volume?.h24}</p>
          <p>DEX: {pair.dexId}</p>
          <p>Chain: {pair.chainId}</p>
        </div>
      ) : (
        <p>No token data found.</p>
      )}
    </div>
  );
}