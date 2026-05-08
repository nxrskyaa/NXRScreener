import Link from "next/link";
import { Github } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <BrandMark />
        <div className="text-sm text-white/45">Powered by DexScreener API</div>
        <div className="flex items-center gap-4 text-sm text-white/55">
          <Link href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <span>Created by NXRSKYAA</span>
        </div>
      </div>
    </footer>
  );
}
