import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBookingBar } from "@/components/sticky-booking-bar";
import { TitoTheCat } from "@/components/tito-the-cat";
import { getSiteUrl, metadataBase } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${siteConfig.name} | ${siteConfig.seo.titleSuffix}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.baseKeywords],
  applicationName: siteConfig.name,
  category: siteConfig.category,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.seo.titleSuffix}`,
    description: siteConfig.description,
    url: getSiteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.seo.locale,
    type: "website",
    images: [
      {
        url: getSiteUrl(siteConfig.seo.ogImage),
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.seo.titleSuffix}`,
    description: siteConfig.description,
    images: [getSiteUrl(siteConfig.seo.ogImage)],
  },
  icons: {
    icon: [
      { url: siteConfig.branding.logoWebp, type: "image/webp", sizes: "648x648" },
      { url: siteConfig.branding.logoPng, type: "image/png", sizes: "648x648" },
      { url: siteConfig.branding.favicon, type: "image/x-icon", sizes: "any" },
    ],
    apple: [
      { url: siteConfig.branding.appleTouchIcon, sizes: "648x648", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value;

  return (
    <html
      lang="en"
      className={cn("h-full scroll-smooth", nunito.variable, savedTheme === "dark" && "dark")}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preconnect" href="https://www.booking.com" />
        <link rel="preconnect" href="https://www.hostelworld.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.booking.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="0cbdc9d4-3d9a-44bc-b0e7-c7da205c758b" strategy="afterInteractive" />
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          <main className="flex-1 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] lg:pb-0">{children}</main>
          {modal}
          <SiteFooter />
          <StickyBookingBar />
          <TitoTheCat />
        </div>
      </body>
    </html>
  );
}
