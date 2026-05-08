export type ChainId = "ethereum" | "solana" | "base" | "bsc" | "arbitrum";

export type DexToken = {
  address: string;
  name: string;
  symbol: string;
};

export type DexPair = {
  chainId?: string;
  dexId?: string;
  url?: string;
  pairAddress?: string;
  labels?: string[] | null;
  baseToken?: DexToken;
  quoteToken?: DexToken;
  priceNative?: string;
  priceUsd?: string | null;
  txns?: {
    m5?: { buys?: number; sells?: number };
    h1?: { buys?: number; sells?: number };
    h6?: { buys?: number; sells?: number };
    h24?: { buys?: number; sells?: number };
  };
  volume?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  };
  priceChange?: {
    m5?: number;
    h1?: number;
    h6?: number;
    h24?: number;
  } | null;
  liquidity?: {
    usd?: number;
    base?: number;
    quote?: number;
  } | null;
  fdv?: number | null;
  marketCap?: number | null;
  pairCreatedAt?: number | null;
  info?: {
    imageUrl?: string;
    websites?: { label?: string; url?: string }[];
    socials?: { type?: string; url?: string }[];
  };
  boosts?: {
    active?: number;
  };
};

export type BoostEntry = {
  url?: string;
  chainId?: string;
  tokenAddress?: string;
  amount?: number;
  totalAmount?: number;
  icon?: string | null;
  header?: string | null;
  description?: string | null;
  links?: { type?: string; label?: string; url?: string }[] | null;
};

export type SearchResponse = {
  schemaVersion?: string;
  pairs?: DexPair[];
};

export type SmartMoneyAlert = {
  title: string;
  body: string;
  pair: DexPair;
  score: number;
};
