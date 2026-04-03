import type { Metadata } from "next";

import { faqItems, siteConfig } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  image = "/images/promo_2.png",
  keywords = siteConfig.baseKeywords,
}: MetadataInput): Metadata {
  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: path,
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
      getSiteUrl("/images/promo_2.png"),
      getSiteUrl("/images/rooms_1.jpg"),
      getSiteUrl("/images/rooftop_social.jpg"),
    ],
    logo: getSiteUrl("/logo.png"),
    telephone: siteConfig.phoneDisplay,
    sameAs: [
      siteConfig.instagramUrl,
      siteConfig.bookingUrl,
      siteConfig.hostelworldUrl,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kole Idromeno street",
      addressLocality: "Shkoder",
      addressCountry: "AL",
    },
    amenityFeature: [
      "Privacy pods",
      "Free breakfast",
      "Free WiFi",
      "Rooftop terrace",
      "Luggage storage",
      "24h access",
      "Bike rentals",
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
