import type { Metadata } from "next";

import { faqItems, siteConfig } from "@/lib/site-data";

const LOCAL_DEV_SITE_URL = "http://localhost:3000";
const SITE_URL_CANDIDATES = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.SITE_URL,
  process.env.URL,
  process.env.DEPLOY_PRIME_URL,
  process.env.DEPLOY_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
] as const;

function normalizeSiteUrl(candidate: string) {
  const value = candidate.trim();

  if (!value) {
    return null;
  }

  const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(value);
  const isLocalHost = value.startsWith("localhost") || value.startsWith("127.0.0.1");
  const normalizedValue = hasProtocol
    ? value
    : `${isLocalHost ? "http" : "https"}://${value}`;

  try {
    return new URL(normalizedValue).origin;
  } catch {
    return null;
  }
}

function resolveSiteUrl() {
  for (const candidate of SITE_URL_CANDIDATES) {
    if (!candidate) {
      continue;
    }

    const normalizedUrl = normalizeSiteUrl(candidate);

    if (normalizedUrl) {
      return normalizedUrl;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    return LOCAL_DEV_SITE_URL;
  }

  throw new Error(
    "Missing public site URL. Set NEXT_PUBLIC_SITE_URL or provide a hosting URL env such as URL, DEPLOY_PRIME_URL, DEPLOY_URL, VERCEL_PROJECT_PRODUCTION_URL, or VERCEL_URL.",
  );
}

export const siteUrl = resolveSiteUrl();
export const metadataBase = new URL(siteUrl);

export function getSiteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: readonly string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/promo_2.jpg",
  keywords = siteConfig.baseKeywords,
}: MetadataInput): Metadata {
  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: getSiteUrl(path),
    },
    openGraph: {
      title,
      description,
      url: getSiteUrl(path),
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: getSiteUrl(image),
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getSiteUrl(image)],
    },
  };
}

export function buildHostelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hostel",
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl("/"),
    image: [
      getSiteUrl("/images/promo_2.jpg"),
      getSiteUrl("/images/room_18bed2.jpg"),
      getSiteUrl("/images/rooftop_social.webp"),
      getSiteUrl("/images/hiking_1.jpg"),
      getSiteUrl("/images/shkoder_pedestrian_street_3.webp"),
    ],
    logo: getSiteUrl("/logo.webp"),
    telephone: siteConfig.phoneDisplay,
    sameAs: [
      siteConfig.instagramUrl,
      siteConfig.bookingUrl,
      siteConfig.hostelworldUrl,
    ],
    priceRange: "€8 - €10",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kolë Idromeno Street",
      addressLocality: "Shkoder",
      addressCountry: "AL",
    },
    amenityFeature: [
      "Privacy pods",
      "Free breakfast (excl. off-season)",
      "Free WiFi",
      "Rooftop terrace",
      "Luggage storage",
      "24h access",
      "Bike rentals (across the street)",
      "Walking tours",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
}

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path),
    })),
  };
}
