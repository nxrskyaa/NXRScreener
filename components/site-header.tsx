"use client";

import Link from "next/link";
import { Github, Search, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Trending", href: "#trending" },
  { label: "Boosted", href: "#boosted" },
  { label: "Chains", href: "#chains" },
];

export function SiteHeader({
  searchValue,
  onSearchChange,
  onOpenSearch,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onOpenSearch: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-6 pl-2 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-white/60 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex w-full max-w-xl items-center gap-3">
          <div className="relative hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onOpenSearch}
              placeholder="Search token, pair, contract..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            <Sparkles className="h-4 w-4" />
            Live
          </Button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white/80 transition hover:bg-white/10"
            )}
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
