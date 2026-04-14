import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBookingBar } from "@/components/sticky-booking-bar";
import { TitoTheCat } from "@/components/tito-the-cat";
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
        url: getSiteUrl("/images/promo_2.jpg"),
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Shkoder, Albania`,
    description: siteConfig.description,
    images: [getSiteUrl("/images/promo_2.jpg")],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};


import Script from "next/script";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preconnect" href="https://www.booking.com" />
        <link rel="preconnect" href="https://www.hostelworld.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.booking.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="lazyOnload" />
        <Script id="netlify-identity-init" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
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
