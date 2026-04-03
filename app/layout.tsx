import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBookingBar } from "@/components/sticky-booking-bar";
import { getSiteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Shkoder, Albania`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.baseKeywords],
  applicationName: siteConfig.name,
  category: "travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Shkoder, Albania`,
    description: siteConfig.description,
    url: getSiteUrl("/"),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: getSiteUrl("/images/promo_2.png"),
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Shkoder, Albania`,
    description: siteConfig.description,
    images: [getSiteUrl("/images/promo_2.png")],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          <main className="flex-1 pb-24 xl:pb-0">{children}</main>
          <SiteFooter />
          <StickyBookingBar />
        </div>
      </body>
    </html>
  );
}
