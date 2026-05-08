export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-green-400">NXR Screener</h1>

        <div className="flex gap-6 text-sm text-zinc-300">
          <span>Dashboard</span>
          <span>Trending</span>
          <span>Boosted</span>
          <span>Chains</span>
        </div>

        <a
          href="https://github.com"
          className="border border-green-400 text-green-400 px-4 py-2 rounded-xl"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}