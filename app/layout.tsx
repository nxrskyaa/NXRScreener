import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NXR Screener",
  description: "Realtime onchain market intelligence powered by DexScreener."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}