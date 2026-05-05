import { type IconName } from "@/lib/icon-registry";

export type BusinessChannelIconKey = string;
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
  title?: string;
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
  ctaUrl?: string;
  region?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  source: string;
  rating: number;
  role?: string;
  avatar?: string;
  highlight?: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  aspect: string;
  src: string;
  alt: string;
  poster?: string;
  [key: string]: unknown;
}

export interface DesignConfig {
  theme: "cool" | "warm" | "forest" | "nordic-earth" | "custom";
  colors: {
    primary: string;
    accent: string;
    background: string;
    surfaceDark: string;
    darkBackground: string;
  };
  atmosphere: {
    showGlows: boolean;
    showNoise: boolean;
    pattern: "grid" | "dots" | "none";
    glowIntensity: number;
  };
  surfaces: {
    glassBlur: number;
    glassOpacity: number;
    borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "3xl" | "2xl";
    eyebrowStyle?: "pill" | "ghost";
  };
  mascot: {
    enabled: boolean;
    type: "cat" | "dog" | "none";
    message?: string;
  };
  typography: {
    headingFont: "nunito" | "inter" | "serif" | "bevan" | "syne" | "cormorant";
    character: "playful" | "clean" | "elegant" | "sharp" | "bold";
  };
  iconStroke?: "thin" | "normal" | "bold";
  layout?: {
    width?: "compact" | "standard" | "wide";
    spacing?: "compact" | "standard" | "wide";
    gutter?: "none" | "compact" | "standard" | "wide";
  };
}

export interface HikingGuideContent {
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
  quickStats: {
    label: string;
    value: string;
    icon: IconName;
  }[];
  logistics: {
    title: string;
    description: string;
    steps: {
      title: string;
      price: string;
      description: string;
    }[];
  };
  luggage: IconFeature;
  trailTips: {
    title: string;
    description: string;
  }[];
  packingList?: {
    title: string;
    description: string;
    categories: {
      name: string;
      items: {
        name: string;
        description: string;
      }[];
    }[];
  };
  itinerary?: {
    title: string;
    description: string;
    days: {
      day: string;
      title: string;
      description: string;
      icon: IconName;
    }[];
  };
  labels: {
    transport: string;
    routePlan: string;
    interactiveMap: string;
    trailTitle: string;
    trailDescription: string;
    gear: string;
    logisticsPriority: string;
    bookWhatsApp: string;
    allExperiences: string;
    whatsAppMessage: string;
  };
}

export interface SettingsChannel {
  id: string;
  label: string;
  url: string;
  icon: BusinessChannelIconKey;
  stylePriority: BusinessChannelStylePriority;
  enabled: boolean;
}

export interface SettingsContent {
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
    design?: DesignConfig;
  };
  features: {
    volunteersNeeded: boolean;
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
  "maps"?: {
    "trekTrailheadUrl"?: string;
  };
}

export interface PropertyConfig extends SettingsContent {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: string;
  location: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappUrl: string;
  bookingUrl: string;
  hostelworldUrl: string;
  instagramUrl: string;
  whatsappCommunityUrl: string;
  breakfastHours: string;
  checkInHours: string;
  volunteersNeeded: boolean;
  showMascot: boolean;
  showRegionalWeather: boolean;
  showLocalExperienceMap: boolean;
  showLocalPois: boolean;
  showRegionalTrails: boolean;
  baseKeywords: string[];
  bookingRating: string;
  hostelworldRating: string;
  hostelworldReviews: string;
  maps?: {
    trekTrailheadUrl?: string;
  };
}

