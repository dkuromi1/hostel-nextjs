import { activeInstance } from "../instances";
import { normalizeInstanceData } from "./data-normalizer";

// Export types for consumers
export * from "./types/site";

// Perform normalization on the active instance
const normalizedData = normalizeInstanceData(activeInstance.content);

// Export all the normalized data pieces
export const {
  siteConfig,
  contactChannels,
  bookingChannels,
  navLinks,
  hero,
  heroHighlights,
  quickFacts,
  roomTypes,
  freeServices,
  paidServices,
  extendReasons,
  experiencePillars,
  eventCards,
  roomHeroHighlights,
  experienceLogisticsFeatures,
  socialConnectionFeatures,
  galleryItems,
  faqItems,
  contactChecklist,
  testimonials,
  bookingAwardImage,
  thingsToDo,
  hikingGuide,
  siteCopyContent,
} = normalizedData;

// Compatibility alias
export const propertyConfig = siteConfig;

// External origins for preconnect
const toOrigin = (value: string) => {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

export const externalPreconnectOrigins = Array.from(
  new Set(
    [...contactChannels, ...bookingChannels]
      .map((channel) => toOrigin(channel.url))
      .filter((origin): origin is string => typeof origin === "string" && !origin.includes("instagram.com"))
  )
);
