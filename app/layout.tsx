import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { DeferredClient } from "@/components/deferred-client";
import { SerwistRoot } from "@/components/serwist-root";
import { AtmosphereBackground } from "@/components/atmosphere-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBookingBar } from "@/components/sticky-booking-bar";
import { SwUpdatePrompt } from "@/components/sw-update-prompt";
import { TitoTheCat } from "@/components/tito-the-cat";
import { ThemeVars } from "@/components/theme-vars";
import { StructuredData } from "@/components/structured-data";
import { activeInstance } from "@/instances";
import { buildBusinessSchema, getSiteUrl, metadataBase } from "@/lib/metadata";
import { 
  externalPreconnectOrigins, 
  propertyConfig,
  navLinks,
  contactChannels,
  bookingChannels,
  siteCopyContent
} from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Nunito, Inter, Playfair_Display, Fraunces, Syne, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const serif = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  preload: true,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  preload: false,
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: true,
});


const themeFontClasses: Record<string, string[]> = {
  cool:           [serif.variable, inter.variable],
  warm:           [cormorant.variable, inter.variable],
  forest:         [fraunces.variable, inter.variable],
  "nordic-earth": [syne.variable, inter.variable],
};

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
  const mapUrl = "/experiences?poi=hostel#map";

  // Determine which fonts the active theme needs
  const design = activeInstance.content.settings.branding?.design;
  const activeTheme = design?.theme;
  const requestedHeadingFont = design?.typography?.headingFont;

  // Start with the theme defaults
  const activeFontClasses = [...(themeFontClasses[activeTheme ?? "cool"] ?? [serif.variable, inter.variable])];

  // Force-add Cormorant (used for Hero H1 override)
  if (!activeFontClasses.includes(cormorant.variable)) {
    activeFontClasses.push(cormorant.variable);
  }

  // Force-add Playfair if explicitly requested
  if (requestedHeadingFont === "serif" && !activeFontClasses.includes(serif.variable)) {
    activeFontClasses.push(serif.variable);
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full scroll-smooth", ...activeFontClasses)}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          id="theme-bootstrap"
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
        <script
          id="performance-bootstrap"
          dangerouslySetInnerHTML={{ __html: performanceBootstrapScript }}
        />
        <ThemeVars />
        {externalPreconnectOrigins.map((origin) => (
          <link key={`preconnect-${origin}`} rel="preconnect" href={origin} />
        ))}
        {externalPreconnectOrigins.map((origin) => (
          <link key={`dns-prefetch-${origin}`} rel="dns-prefetch" href={origin} />
        ))}
        <StructuredData data={buildBusinessSchema()} />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {analyticsWebsiteId ? (
          <Script
            id="umami-analytics"
            src={activeInstance.integrations.analytics.scriptSrc}
            data-website-id={analyticsWebsiteId}
            data-domains={siteDomain}
            strategy="afterInteractive"
          />
        ) : null}
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader 
            navLinks={navLinks} 
            contactChannels={contactChannels} 
            bookingChannels={bookingChannels} 
            siteName={propertyConfig.name} 
            siteAddressSummary={propertyConfig.address.summary}
            volunteersNeeded={propertyConfig.volunteersNeeded}
            whatsappUrl={propertyConfig.whatsappUrl}
            phoneRaw={propertyConfig.phoneRaw}
            mapUrl={mapUrl}
          />
          <AtmosphereBackground />
          <main className="flex-1">{children}</main>
          {modal}
          <SiteFooter 
            contactChannels={contactChannels} 
            bookingChannels={bookingChannels} 
            navLinks={navLinks} 
            siteConfig={propertyConfig} 
            copy={siteCopyContent.footer} 
          />
          <StickyBookingBar bookingChannels={bookingChannels} contactChannels={contactChannels} />
          <DeferredClient>
            <SerwistRoot>
              <SwUpdatePrompt />
              {propertyConfig.branding.design?.mascot.enabled ? (
                <TitoTheCat 
                  isEnabled={propertyConfig.branding.design.mascot.enabled} 
                  message={propertyConfig.branding.design.mascot.message}
                  type={propertyConfig.branding.design.mascot.type}
                />
              ) : null}
            </SerwistRoot>
          </DeferredClient>
        </div>
      </body>
    </html>
  );
}
