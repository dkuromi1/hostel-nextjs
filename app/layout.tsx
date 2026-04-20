import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

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
    default: `${siteConfig.name} | Shkoder, Albania`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.baseKeywords],
  applicationName: siteConfig.name,
  category: "travel",
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
    icon: [
      // References /public/logo.webp
      { url: "/logo.webp", type: "image/webp", sizes: "648x648" },

      // References /public/logo.png
      { url: "/logo.png", type: "image/png", sizes: "648x648" },

      // References /app/favicon.ico (Next.js serves this at the root)
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [
      // Best to use the PNG version for Apple devices
      { url: "/logo.png", sizes: "648x648", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  manifest: "/site.webmanifest",
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
  return (
    <html lang="en" className={cn("h-full scroll-smooth", nunito.variable)} data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = savedTheme || systemTheme;
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
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
