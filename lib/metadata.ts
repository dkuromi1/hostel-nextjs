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

  console.warn(
    "[metadata] Missing public site URL. Please set NEXT_PUBLIC_SITE_URL. Falling back to placeholder."
  );
  return "https://missing-site-url.com";
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
  imageAlt?: string;
  keywords?: readonly string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.seo.ogImage,
  imageAlt = title,
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
      locale: siteConfig.seo.locale,
      type: "website",
      images: [
        {
          url: getSiteUrl(image),
          alt: imageAlt,
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

function formatTime(timeStr: string) {
  if (!timeStr) return undefined;
  // Simple extraction: look for something like "2pm", "10:00am", "11:00"
  const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return timeStr;

  let hours = parseInt(match[1], 10);
  const minutes = match[2] || "00";
  const ampm = match[3]?.toLowerCase();

  if (ampm === "pm" && hours < 12) hours += 12;
  if (ampm === "am" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
}

export function buildBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": siteConfig.schema.type,
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl("/"),
    image: siteConfig.schema.images.map((image) => getSiteUrl(image)),
    logo: getSiteUrl(siteConfig.branding.logoWebp),
    telephone: `+${siteConfig.phoneRaw}`,
    email: siteConfig.email,
    sameAs: siteConfig.schema.sameAs,
    priceRange: siteConfig.schema.priceRange,
    checkinTime: formatTime(siteConfig.checkInHours),
    checkoutTime: formatTime(siteConfig.checkOutHours),
    aggregateRating: {
      "@type": "AggregateRating",
      "ratingValue": siteConfig.bookingRating,
      "reviewCount": siteConfig.bookingReviews,
      "bestRating": "10",
      "worstRating": "1"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    amenityFeature: siteConfig.schema.amenities.map((name) => ({
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
