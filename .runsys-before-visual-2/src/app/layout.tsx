import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RUNSYS — Athletes × Brands × Events",
    template: "%s — RUNSYS",
  },
  description:
    "Discover athletes, events, brands, stories, and sponsorship opportunities through RUNSYS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="min-h-screen pt-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
