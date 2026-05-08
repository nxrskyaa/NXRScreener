import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CursorGlow } from "@/components/cursor-glow";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "NXR Screener | AlphaPulse",
  description: "Premium futuristic smart money tracker powered by DexScreener.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-white antialiased">
        <CursorGlow />
        {children}
        <Footer />
      </body>
    </html>
  );
}
