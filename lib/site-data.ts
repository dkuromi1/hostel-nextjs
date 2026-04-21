import { isIconName, type IconName } from "./icon-registry";

import settings from "../content/settings.json";
import navigation from "../content/navigation.json";
import roomsData from "../content/rooms.json";
import homepage from "../content/homepage.json";
import faq from "../content/faq.json";
import testimonialsData from "../content/testimonials.json";
import gallery from "../content/gallery.json";
import thingsToDoData from "../content/things-to-do.json";
import siteCopyData from "../content/site-copy.json";

interface SettingsContent {
  business: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    category: string;
  };
  address: {
    label: string;
    summary: string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    instagramUrl: string;
    whatsappCommunityUrl: string;
    channels: SettingsChannel[];
  };
  booking: {
    whatsappUrl: string;
    bookingUrl: string;
    hostelworldUrl: string;
    bookingRating: string;
    hostelworldRating: string;
    hostelworldReviews: string;
    channels: SettingsChannel[];
  };
  operations: {
    breakfastHours: string;
    checkInHours: string;
  };
  seo: {
    baseKeywords: string[];
    titleSuffix: string;
    locale: string;
    ogImage: string;
  };
  branding: {
    logoWebp: string;
    logoPng: string;
    favicon: string;
    appleTouchIcon: string;
    manifestThemeColor: string;
    manifestBackgroundColor: string;
  };
  features: {
    volunteersNeeded: boolean;
    showVolunteerBanner: boolean;
    showMascot: boolean;
    showRegionalWeather: boolean;
    showLocalExperienceMap: boolean;
    showLocalPois: boolean;
    showRegionalTrails: boolean;
  };
  schema: {
    type: string;
    priceRange: string;
    sameAs: string[];
    images: string[];
    amenities: string[];
  };
}

interface SettingsChannel {
  id: string;
  label: string;
  url: string;
  icon: BusinessChannelIconKey;
  stylePriority: BusinessChannelStylePriority;
  enabled: boolean;
}

export type BusinessChannelIconKey =
  | "whatsapp"
  | "instagram"
  | "bookingCom"
  | "hostelworld";

export type BusinessChannelStylePriority = "primary" | "secondary" | "tertiary";

export interface BusinessChannel {
  id: string;
  label: string;
  url: string;
  icon: BusinessChannelIconKey;
  stylePriority: BusinessChannelStylePriority;
  enabled: boolean;
}

export interface CtaLink {
  text: string;
  url: string;
}

export interface HeroContent {
  title1: string;
  title2: string;
  description: string;
}

export interface IconTextItem {
  text: string;
  icon: IconName;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface RoomImage {
  src: string;
  alt: string;
}

export interface RoomAmenity {
  icon: IconName;
  label: string;
}

export interface RoomType {
  name: string;
  price: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  bullets: string[];
  images: RoomImage[];
  amenities: RoomAmenity[];
}

export interface ExtendReason {
  title: string;
  description: string;
}

export interface ExperiencePillar {
  title: string;
  description: string;
  image: string;
  alt: string;
  cta?: CtaLink;
}

export interface EventCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface IconFeature {
  title: string;
  description: string;
  icon: IconName;
}

export interface VisualIconFeature extends IconFeature {
  image: string;
  focus?: string;
}

export interface ThingToDoItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  price?: string;
  regularPrice?: string;
  priceNote?: string;
  showDirections?: boolean;
}

interface HomepageContent {
  hero: HeroContent;
  heroHighlights: string[];
  quickFacts: IconTextItem[];
  sharedAmenities: string[];
  freeServices: ServiceItem[];
  paidServices: ServiceItem[];
  extendReasons: ExtendReason[];
  experiencePillars: ExperiencePillar[];
  eventCards: EventCard[];
  contactChecklist: string[];
  bookingAwardImage: string;
}

interface RoomsContent {
  roomTypes: RoomType[];
}

interface ThingsToDoContent {
  thingsToDo: ThingToDoItem[];
}

interface SiteCopyContent {
  footer: {
    heading: string;
    description: string;
    socialLabels: {
      instagram: string;
      booking: string;
      hostelworld: string;
    };
    exploreLabel: string;
    communityLabel: string;
    communityCaption: string;
    communityButton: string;
    detailsLabel: string;
    breakfastPrefix: string;
    detailsSummary: string;
    credit: string;
  };
  errorPage: {
    eyebrow: string;
    title: string;
    description: string;
    reloadLabel: string;
    contactLabel: string;
  };
  notFoundPage: {
    eyebrow: string;
    title: string;
    description: string;
    homeLabel: string;
    contactLabel: string;
  };
  home: {
    metadata: {
      title: string;
      description: string;
      image: string;
    };
    guestRatings: {
      label: string;
      topRatedLabel: string;
      bookingSourceLabel: string;
      bookingAwardTitle: string;
      bookingScoreSuffix: string;
      bookingDescription: string;
      hostelworldSourceLabel: string;
      hostelworldTitle: string;
      hostelworldReviewsSuffix: string;
      hostelworldImageAlt: string;
    };
    hero: {
      backgroundAlt: string;
    };
    atmosphere: {
      directBookingLabel: string;
      directBookingTitle: string;
      directBookingTitleMobile: string;
      directBookingDescription: string;
      directBookingDescriptionMobile: string;
      directBookingButton: string;
      rooftopEyebrow: string;
      rooftopTitle: string;
      rooftopImageAlt: string;
      roomImageAlt: string;
    };
    roomsSection: {
      titleEyebrowPrefix: string;
      title: string;
      description: string;
      buttonLabel: string;
      detailsLabel: string;
    };
    includedStay: {
      eyebrow: string;
      title: string;
      description: string;
    };
    gallerySection: {
      eyebrow: string;
      title: string;
      description: string;
      buttonLabel: string;
    };
    experiencesSection: {
      eyebrow: string;
      title: string;
      description: string;
      buttonLabel: string;
      discoverLabel: string;
      connectLabel: string;
    };
    whyStayLonger: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
      alt: string;
    };
  };
  gallery: {
    metadata: {
      title: string;
      description: string;
      image: string;
    };
    pageTitle: string;
    visualTour: {
      eyebrow: string;
      title: string;
      description: string;
    };
    awardPanel: {
      label: string;
      title: string;
      description: string;
      imageAlt: string;
    };
    vibePanel: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
      alt: string;
    };
  };
  contact: {
    metadata: {
      title: string;
      description: string;
      image: string;
    };
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    bestBookingRoute: {
      label: string;
      title: string;
      description: string;
    };
    heroImages: {
      streetAlt: string;
      socialAlt: string;
    };
    contactDetails: {
      label: string;
      reception: string;
    };
    faq: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
      alt: string;
    };
  };
  rooms: {
    metadata: {
      title: string;
      description: string;
      image: string;
    };
    pageTitle: string;
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    heroImages: {
      fourBedAlt: string;
      podAlt: string;
    };
    heroPriceBlurb: {
      labelPrefix: string;
      title: string;
    };
    chooseSetup: {
      eyebrow: string;
      title: string;
      description: string;
    };
    includedStay: {
      eyebrow: string;
      title: string;
      description: string;
    };
    extraHelp: {
      label: string;
      title: string;
      imageAlt: string;
    };
    testimonialsImages: {
      socialAlt: string;
      breakfastAlt: string;
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      image: string;
      alt: string;
    };
  };
  experiences: {
    metadata: {
      title: string;
      description: string;
      image: string;
    };
    pageTitle: string;
  };
}

function parseIconName(icon: string, context: string): IconName {
  if (isIconName(icon)) {
    return icon;
  }

  throw new Error(`[site-data] Unknown icon "${icon}" in ${context}. Add it to ICON_REGISTRY or fix the content key.`);
}

function parseIconTextItems(items: { text: string; icon: string }[], context: string): IconTextItem[] {
  return items.map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseServices(items: { title: string; description: string; icon: string }[], context: string): ServiceItem[] {
  return items.map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseChannels(items: SettingsChannel[]): BusinessChannel[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    url: item.url,
    icon: item.icon,
    stylePriority: item.stylePriority,
    enabled: item.enabled,
  }));
}

function findChannelUrl(channels: BusinessChannel[], id: string, fallback: string) {
  return channels.find((channel) => channel.id === id)?.url ?? fallback;
}

function parseRoomTypes(items: typeof roomsData.roomTypes): RoomType[] {
  return items.map((room, roomIndex) => ({
    ...room,
    amenities: room.amenities.map((amenity, amenityIndex) => ({
      ...amenity,
      icon: parseIconName(amenity.icon, `rooms.roomTypes[${roomIndex}].amenities[${amenityIndex}].icon`),
    })),
  }));
}

const homepageContent: HomepageContent = {
  ...homepage,
  quickFacts: parseIconTextItems(homepage.quickFacts, "homepage.quickFacts"),
  freeServices: parseServices(homepage.freeServices, "homepage.freeServices"),
  paidServices: parseServices(homepage.paidServices, "homepage.paidServices"),
};

const roomsContent: RoomsContent = {
  roomTypes: parseRoomTypes(roomsData.roomTypes),
};

const thingsToDoContent: ThingsToDoContent = thingsToDoData;

const settingsContent = settings as SettingsContent;
const siteCopy = siteCopyData as SiteCopyContent;
const parsedContactChannels = parseChannels(settingsContent.contact.channels);
const parsedBookingChannels = parseChannels(settingsContent.booking.channels);

export const siteConfig = {
  ...settingsContent,
  name: settingsContent.business.name,
  shortName: settingsContent.business.shortName,
  tagline: settingsContent.business.tagline,
  description: settingsContent.business.description,
  category: settingsContent.business.category,
  location: settingsContent.address.label,
  phoneDisplay: settingsContent.contact.phoneDisplay,
  phoneRaw: settingsContent.contact.phoneRaw,
  whatsappUrl: findChannelUrl(parsedContactChannels, "whatsapp", settingsContent.booking.whatsappUrl),
  bookingUrl: findChannelUrl(parsedBookingChannels, "booking-com", settingsContent.booking.bookingUrl),
  hostelworldUrl: findChannelUrl(parsedBookingChannels, "hostelworld", settingsContent.booking.hostelworldUrl),
  instagramUrl: findChannelUrl(parsedContactChannels, "instagram", settingsContent.contact.instagramUrl),
  whatsappCommunityUrl: settingsContent.contact.whatsappCommunityUrl,
  breakfastHours: settingsContent.operations.breakfastHours,
  checkInHours: settingsContent.operations.checkInHours,
  volunteersNeeded: settingsContent.features.volunteersNeeded,
  showVolunteerBanner: settingsContent.features.showVolunteerBanner,
  showMascot: settingsContent.features.showMascot,
  showRegionalWeather: settingsContent.features.showRegionalWeather,
  showLocalExperienceMap: settingsContent.features.showLocalExperienceMap,
  showLocalPois: settingsContent.features.showLocalPois,
  showRegionalTrails: settingsContent.features.showRegionalTrails,
  baseKeywords: settingsContent.seo.baseKeywords,
  bookingRating: settingsContent.booking.bookingRating,
  hostelworldRating: settingsContent.booking.hostelworldRating,
  hostelworldReviews: settingsContent.booking.hostelworldReviews,
} as const;

export const contactChannels = parsedContactChannels.filter((channel) => channel.enabled);
export const bookingChannels = parsedBookingChannels.filter((channel) => channel.enabled);

export const hero = homepageContent.hero;

export const navLinks = navigation.navLinks;

export const heroHighlights = homepageContent.heroHighlights;
export const quickFacts = homepageContent.quickFacts;

export const roomTypes = roomsContent.roomTypes;

// Individual room images lists (legacy exports for specific components)
export const podDormImages = roomsContent.roomTypes[0].images;
export const fourBedDormImages = roomsContent.roomTypes[1].images;

export const sharedAmenities = homepageContent.sharedAmenities;
export const freeServices = homepageContent.freeServices;
export const paidServices = homepageContent.paidServices;

export const extendReasons = homepageContent.extendReasons;
export const experiencePillars = homepageContent.experiencePillars;
export const eventCards = homepageContent.eventCards;

export const roomHeroHighlights = [
  { text: "Curtained privacy pods in the mixed dorm", icon: "Blinds" },
  { text: "Four-bed dorms with male and female options", icon: "Bed" },
  { text: "A/C and heat, secure lockers, power sockets, and WiFi", icon: "Snowflake" },
  { text: "All rooms include breakfast every morning (excl. off-season)", icon: "Coffee" },
] as const satisfies readonly IconTextItem[];

export const experienceLogisticsFeatures = [
  {
    title: "Free Luggage Storage",
    description: "Drop your main backpack in our secure storage. Hike the Valbona to Theth trail carrying only what you actually need.",
    icon: "Backpack",
  },
  {
    title: "Transport & Logistics",
    description: "We provide honest, up-to-date info on furgon (minibus) schedules, Komani Lake ferries, and Shala River boat trips.",
    icon: "Bus",
  },
  {
    title: "The Post-Hike Reset",
    description: "Return from the mountains to a hot shower, A/C, crisp linens, and a cold drink on the rooftop.",
    icon: "Mountain",
  },
] as const satisfies readonly IconFeature[];

export const socialConnectionFeatures = [
  {
    title: "The Drin River Escape",
    description: "Just outside the city, the Drin river offers a cool, scenic contrast to the Alps. We organize regular group swimming trips to our favorite spots along the water for a perfect, sun-drenched afternoon.",
    icon: "Waves",
    image: "/images/drin_swimming_trip2.jpeg",
    focus: "50% 40%",
  },
  {
    title: "Spontaneous Socials",
    description: "Whether it’s rooftop raki or an informal food crawl, we prioritize warm, unscripted moments that make it easy for solo travelers to join. It’s social, but never forced.",
    icon: "Sparkles",
    image: "/images/rooftop_social_7.webp",
    focus: "50% 40%",
  },
  {
    title: "Bicycle Capital Access",
    description: "Shkodër is best explored on two wheels. Grab a rental from across the street and navigate the flat streets, historic center, and scenic lake paths exactly how the locals do.",
    icon: "Bike",
    image: "/images/biking_in_shkodra.jpeg",
    focus: "50% 40%",
  },
] as const satisfies readonly VisualIconFeature[];

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  aspect: string;
  src: string;
  alt: string;
  poster?: string;
  [key: string]: unknown;
}

export const galleryItems = gallery.galleryItems as GalleryItem[]; // Cast to bypass strict literal checks for id/type/aspect

export const faqItems = faq.faqItems;

export const contactChecklist = homepageContent.contactChecklist;

export const testimonials = testimonialsData.testimonials;
export const bookingAwardImage = homepageContent.bookingAwardImage;

export const thingsToDo = thingsToDoContent.thingsToDo;

export const siteCopyContent = siteCopy;
