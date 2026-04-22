import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBookingBar } from "@/components/sticky-booking-bar";
import { SwUpdatePrompt } from "@/components/sw-update-prompt";
import { TitoTheCat } from "@/components/tito-the-cat";
import { activeInstance } from "@/instances";
import { getSiteUrl, metadataBase } from "@/lib/metadata";
import { externalPreconnectOrigins, propertyConfig } from "@/lib/site-data";
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
      { url: propertyConfig.branding.logoWebp, type: "image/webp", sizes: "648x648" },
      { url: propertyConfig.branding.logoPng, type: "image/png", sizes: "648x648" },
      { url: propertyConfig.branding.favicon, type: "image/x-icon", sizes: "any" },
    ],
    apple: [
      { url: propertyConfig.branding.appleTouchIcon, sizes: "648x648", type: "image/png" },
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

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value;
  const analyticsWebsiteId = process.env[activeInstance.integrations.analytics.websiteIdEnvVar];

  return (
    <html
      lang="en"
      className={cn("h-full scroll-smooth", nunito.variable, savedTheme === "dark" && "dark")}
      data-scroll-behavior="smooth"
    >
      <head>
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
            strategy="afterInteractive"
          />
        ) : null}
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          <main className="flex-1 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] lg:pb-0">{children}</main>
          {modal}
          <SiteFooter />
          <StickyBookingBar />
          <SwUpdatePrompt />
          {propertyConfig.features.showMascot ? <TitoTheCat /> : null}
        </div>
      </body>
    </html>
  );
}
