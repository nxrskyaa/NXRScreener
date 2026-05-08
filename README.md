# NXR Screener

Premium futuristic crypto dashboard built with Next.js 15, TypeScript, TailwindCSS, shadcn-style UI primitives, Lucide Icons, Framer Motion, and DexScreener public APIs.

## What it includes

- Sticky glassmorphism navbar
- Animated hero section
- Live token search with debounce and dropdown results
- Trending boosted tokens feed from DexScreener
- Chain filter for Ethereum, Solana, Base, BSC, and Arbitrum
- Smart money flow simulation using real DexScreener data signals
- Dynamic token detail page at `/token/[address]`
- Best-effort DexScreener iframe embed on the token page
- Loading skeletons, error handling, smooth transitions, and mobile responsiveness

## Data sources

The app uses DexScreener public endpoints such as:

- `GET /token-boosts/latest/v1`
- `GET /latest/dex/search?q=...`
- `GET /token-pairs/v1/{chainId}/{tokenAddress}`

## Local setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Use the default Next.js settings.
4. Deploy.

No environment variables are required.

## Notes

- Token search and trending sections call DexScreener directly from the client.
- Smart money cards are simulated heuristics built from boosts, liquidity, volume, and buy/sell activity.
- The token detail chart uses a best-effort iframe fallback to the DexScreener pair page.
- Replace the GitHub links in the navbar/footer with your real repository URL.
- Replace the `metadataBase` and favicon assets before shipping publicly.
