import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { DeferredClient } from "@/components/deferred-client";
import { SerwistRoot } from "@/components/serwist-root";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBookingBar } from "@/components/sticky-booking-bar";
import { SwUpdatePrompt } from "@/components/sw-update-prompt";
import { TitoTheCat } from "@/components/tito-the-cat";
import { activeInstance } from "@/instances";
import { getSiteUrl, metadataBase } from "@/lib/metadata";
import { externalPreconnectOrigins, propertyConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const nunito = localFont({
  src: "./fonts/Nunito-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nunito",
});

const themeBootstrapScript = `
(() => {
  try {
    const root = document.documentElement;
    const cookieTheme = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith("theme="))
      ?.split("=")[1];
    const legacyTheme = localStorage.getItem("theme");
    const nextTheme =
      cookieTheme === "dark" || cookieTheme === "light"
        ? cookieTheme
        : legacyTheme === "dark" || legacyTheme === "light"
          ? legacyTheme
          : "light";

    root.classList.toggle("dark", nextTheme === "dark");
  } catch {}
})();
`;

const performanceBootstrapScript = `
(() => {
  try {
    const nav = navigator;
    const ua = nav.userAgent;
    
    // 1. GPU Dealbreaker (Mapbox GL v3 requires WebGL2)
    if (!window.WebGL2RenderingContext) {
      document.documentElement.classList.add("low-end-device");
      return;
    }

    // 2. Android Spec Sniffing (Memory & CPU)
    if (/Android/i.test(ua)) {
      const isLowMemory = nav.deviceMemory && nav.deviceMemory <= 4;
      const isWeakCPU = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;
      if (isLowMemory || isWeakCPU) {
        document.documentElement.classList.add("low-end-device");
        return;
      }
    }

    // 3. iOS / Mobile Safari (OS Version Proxy)
    const isMobileIOS = /iPhone|iPad|iPod/i.test(ua);
    if (isMobileIOS) {
      if (/(iPhone|CPU)\sOS\s([0-9]_|1[0-4]_)/.test(ua)) {
        document.documentElement.classList.add("low-end-device");
        return;
      }
    }
  } catch {}
})();
`;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${propertyConfig.name} | ${propertyConfig.seo.titleSuffix}`,
    template: `%s | ${propertyConfig.name}`,
  },
  description: propertyConfig.description,
  keywords: [...propertyConfig.baseKeywords],
  applicationName: propertyConfig.name,
  category: propertyConfig.category,
  openGraph: {
    title: `${propertyConfig.name} | ${propertyConfig.seo.titleSuffix}`,
    description: propertyConfig.description,
    url: getSiteUrl("/"),
    siteName: propertyConfig.name,
    locale: propertyConfig.seo.locale,
    type: "website",
    images: [
      {
        url: getSiteUrl(propertyConfig.seo.ogImage),
        alt: propertyConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${propertyConfig.name} | ${propertyConfig.seo.titleSuffix}`,
    description: propertyConfig.description,
    images: [getSiteUrl(propertyConfig.seo.ogImage)],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: propertyConfig.name,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  // Static reference to ensure Next.js replaces the env var at build time
  const analyticsWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const siteDomain = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname : undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full scroll-smooth", nunito.variable)}
      data-scroll-behavior="smooth"
    >
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrapScript}
        </Script>
        <Script id="performance-bootstrap" strategy="beforeInteractive">
          {performanceBootstrapScript}
        </Script>
        {externalPreconnectOrigins.map((origin) => (
          <link key={`preconnect-${origin}`} rel="preconnect" href={origin} />
        ))}
        {externalPreconnectOrigins.map((origin) => (
          <link key={`dns-prefetch-${origin}`} rel="dns-prefetch" href={origin} />
        ))}
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {analyticsWebsiteId ? (
          <Script
            defer
            src={activeInstance.integrations.analytics.scriptSrc}
            data-website-id={analyticsWebsiteId}
            data-domains={siteDomain}
            strategy="afterInteractive"
          />
        ) : null}
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          <main className="flex-1 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] lg:pb-0">{children}</main>
          {modal}
          <SiteFooter />
          <StickyBookingBar />
          <DeferredClient>
            <SerwistRoot>
              <SwUpdatePrompt />
              {propertyConfig.features.showMascot ? <TitoTheCat /> : null}
            </SerwistRoot>
          </DeferredClient>
        </div>
      </body>
    </html>
  );
}
