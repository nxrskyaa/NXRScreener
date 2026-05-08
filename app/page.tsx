import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Trending from "@/components/Trending";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Trending />

      <footer className="border-t border-white/10 py-10 text-center text-zinc-500">
        Powered by DexScreener API • Created by NXRSKYAA
      </footer>
    </main>
  );
}