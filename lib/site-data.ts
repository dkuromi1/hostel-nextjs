import { isIconName, type IconName } from "./icon-registry";
import { activeInstance } from "../instances";

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
  offeringType?: string;
  capacityLabel?: string;
  featured?: boolean;
}

export interface ExtendReason {
  title: string;
  description: string;
  icon: IconName;
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
  category?: string;
  featured?: boolean;
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
  mapQuery?: string;
  price?: string;
  regularPrice?: string;
  priceNote?: string;
  showDirections?: boolean;
  category?: string;
  featured?: boolean;
  ctaLabel?: string;
  region?: string;
}

interface HomepageContent {
  hero: HeroContent;
  heroHighlights: string[];
  quickFacts: IconTextItem[];
  includedFeatures?: string[];
  sharedAmenities?: string[];
  includedServices?: ServiceItem[];
  freeServices?: ServiceItem[];
  addOnServices?: ServiceItem[];
  paidServices?: ServiceItem[];
  extendReasons: ExtendReason[];
  experiencePillars: ExperiencePillar[];
  featuredMoments?: EventCard[];
  eventCards?: EventCard[];
  contactChecklist: string[];
  bookingAwardImage: string;
  experienceLogisticsFeatures?: IconFeature[];
  socialConnectionFeatures?: VisualIconFeature[];
}

interface RoomsContent {
  moduleType?: string;
  offerings?: RoomType[];
  roomTypes?: RoomType[];
  roomHeroHighlights?: IconTextItem[];
}

interface ThingsToDoContent {
  moduleType?: string;
  localHighlights?: ThingToDoItem[];
  thingsToDo?: ThingToDoItem[];
}

interface Testimonial {
  quote: string;
  author: string;
  source: string;
  rating: number;
  role?: string;
  avatar?: string;
  highlight?: string;
}

interface TestimonialsContent {
  reviews?: Testimonial[];
  testimonials?: Testimonial[];
}

interface GalleryContent {
  mediaItems?: GalleryItem[];
  galleryItems?: GalleryItem[];
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

function parseIconFeatures(items: IconFeature[], context: string): IconFeature[] {
  return items.map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseVisualIconFeatures(items: VisualIconFeature[], context: string): VisualIconFeature[] {
  return items.map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseExtendReasons(items: ExtendReason[], context: string): ExtendReason[] {
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

function parseRoomTypes(items: RoomType[]): RoomType[] {
  return items.map((room, roomIndex) => ({
    ...room,
    amenities: room.amenities.map((amenity, amenityIndex) => ({
      ...amenity,
      icon: parseIconName(amenity.icon, `rooms.roomTypes[${roomIndex}].amenities[${amenityIndex}].icon`),
    })),
  }));
}

const {
  faq,
  gallery,
  homepage,
  navigation,
  rooms: roomsData,
  settings,
  siteCopy: siteCopyData,
  testimonials: testimonialsData,
  thingsToDo: thingsToDoData,
} = activeInstance.content;

const normalizedHomepage = homepage as HomepageContent;

const homepageContent: HomepageContent = {
  ...normalizedHomepage,
  quickFacts: parseIconTextItems(normalizedHomepage.quickFacts, "homepage.quickFacts"),
  includedServices: parseServices(
    (normalizedHomepage.includedServices ?? normalizedHomepage.freeServices ?? []) as { title: string; description: string; icon: string }[],
    "homepage.includedServices",
  ),
  addOnServices: parseServices(
    (normalizedHomepage.addOnServices ?? normalizedHomepage.paidServices ?? []) as { title: string; description: string; icon: string }[],
    "homepage.addOnServices",
  ),
  experienceLogisticsFeatures: parseIconFeatures(
    (normalizedHomepage.experienceLogisticsFeatures ?? []) as IconFeature[],
    "homepage.experienceLogisticsFeatures"
  ),
  socialConnectionFeatures: parseVisualIconFeatures(
    (normalizedHomepage.socialConnectionFeatures ?? []) as VisualIconFeature[],
    "homepage.socialConnectionFeatures"
  ),
  extendReasons: parseExtendReasons(
    (normalizedHomepage.extendReasons ?? []) as ExtendReason[],
    "homepage.extendReasons"
  ),
};

const normalizedRoomsData = roomsData as RoomsContent;
const roomsContent: RoomsContent = {
  ...normalizedRoomsData,
  offerings: parseRoomTypes(normalizedRoomsData.offerings ?? normalizedRoomsData.roomTypes ?? []),
  roomHeroHighlights: parseIconTextItems(
    (normalizedRoomsData.roomHeroHighlights ?? []) as IconTextItem[],
    "rooms.roomHeroHighlights"
  ),
};

const thingsToDoContent = thingsToDoData as ThingsToDoContent;
const testimonialsContent = testimonialsData as TestimonialsContent;
const galleryContent = gallery as GalleryContent;

const settingsContent = settings as SettingsContent;
const siteCopy = siteCopyData as SiteCopyContent;
const parsedContactChannels = parseChannels(settingsContent.contact.channels);
const parsedBookingChannels = parseChannels(settingsContent.booking.channels);

export const propertyConfig = {
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

// Compatibility alias while the repo transitions from a single-site deployment
// to a reusable product structure.
export const siteConfig = propertyConfig;

export const contactChannels = parsedContactChannels.filter((channel) => channel.enabled);
export const bookingChannels = parsedBookingChannels.filter((channel) => channel.enabled);

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
      .filter((origin): origin is string => Boolean(origin))
  )
);

export const hero = homepageContent.hero;

export const navLinks = navigation.navLinks;

export const heroHighlights = homepageContent.heroHighlights;
export const quickFacts = homepageContent.quickFacts;

export const roomTypes = roomsContent.offerings ?? roomsContent.roomTypes ?? [];

// Individual room images lists (legacy exports for specific components)
export const podDormImages = roomsContent.offerings?.[0]?.images ?? [];
export const fourBedDormImages = roomsContent.offerings?.[1]?.images ?? [];

export const sharedAmenities = homepageContent.includedFeatures ?? homepageContent.sharedAmenities ?? [];
export const freeServices = homepageContent.includedServices ?? [];
export const paidServices = homepageContent.addOnServices ?? [];

export const extendReasons = homepageContent.extendReasons;
export const experiencePillars = homepageContent.experiencePillars;
export const eventCards = homepageContent.featuredMoments ?? homepageContent.eventCards ?? [];

export const roomHeroHighlights = roomsContent.roomHeroHighlights ?? [];
export const experienceLogisticsFeatures = homepageContent.experienceLogisticsFeatures ?? [];
export const socialConnectionFeatures = homepageContent.socialConnectionFeatures ?? [];

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  aspect: string;
  src: string;
  alt: string;
  poster?: string;
  [key: string]: unknown;
}

export const galleryItems = (galleryContent.mediaItems ?? galleryContent.galleryItems ?? []) as GalleryItem[];

export const faqItems = faq.faqItems;

export const contactChecklist = homepageContent.contactChecklist;

export const testimonials = testimonialsContent.reviews ?? testimonialsContent.testimonials ?? [];
export const bookingAwardImage = homepageContent.bookingAwardImage;

export const thingsToDo = thingsToDoContent.localHighlights ?? thingsToDoContent.thingsToDo ?? [];

export const siteCopyContent = siteCopy;
