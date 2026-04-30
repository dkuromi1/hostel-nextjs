import { isIconName, type IconName } from "./icon-registry";
import {
  type BusinessChannel,
  type CtaLink,
  type HeroContent,
  type IconTextItem,
  type ServiceItem,
  type RoomType,
  type ExtendReason,
  type ExperiencePillar,
  type EventCard,
  type IconFeature,
  type VisualIconFeature,
  type ThingToDoItem,
  type Testimonial,
  type GalleryItem,
  type HikingGuideContent,
  type PropertyConfig,
} from "./types/site";

function parseIconName(icon: string, context: string): IconName {
  if (isIconName(icon)) {
    return icon;
  }
  console.warn(`[data-normalizer] Unknown icon "${icon}" in ${context}. Gracefully continuing.`);
  return icon as IconName;
}

function parseIconTextItems(items: any[], context: string): IconTextItem[] {
  return (items ?? []).map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseServices(items: any[], context: string): ServiceItem[] {
  return (items ?? []).map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseIconFeatures(items: any[], context: string): IconFeature[] {
  return (items ?? []).map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseVisualIconFeatures(items: any[], context: string): VisualIconFeature[] {
  return (items ?? []).map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseExtendReasons(items: any[], context: string): ExtendReason[] {
  return (items ?? []).map((item, index) => ({
    ...item,
    icon: parseIconName(item.icon, `${context}[${index}].icon`),
  }));
}

function parseRoomTypes(items: any[]): RoomType[] {
  return (items ?? []).map((room, roomIndex) => ({
    ...room,
    amenities: (room.amenities ?? []).map((amenity: any, amenityIndex: number) => ({
      ...amenity,
      icon: parseIconName(amenity.icon, `roomTypes[${roomIndex}].amenities[${amenityIndex}].icon`),
    })),
  }));
}

function parseHikingGuide(guide: any): HikingGuideContent {
  if (!guide) return {} as HikingGuideContent;
  return {
    ...guide,
    quickStats: (guide.quickStats ?? []).map((stat: any, i: number) => ({
      ...stat,
      icon: parseIconName(stat.icon, `hikingGuide.quickStats[${i}].icon`),
    })),
    luggage: {
      ...guide.luggage,
      icon: parseIconName(guide.luggage.icon, `hikingGuide.luggage.icon`),
    },
    itinerary: guide.itinerary ? {
      ...guide.itinerary,
      days: guide.itinerary.days.map((day: any, i: number) => ({
        ...day,
        icon: parseIconName(day.icon, `hikingGuide.itinerary.days[${i}].icon`),
      }))
    } : undefined,
  };
}

export function normalizeInstanceData(rawContent: any): {
  siteConfig: PropertyConfig;
  contactChannels: BusinessChannel[];
  bookingChannels: BusinessChannel[];
  navLinks: any[];
  hero: HeroContent;
  heroHighlights: string[];
  quickFacts: IconTextItem[];
  roomTypes: RoomType[];
  freeServices: ServiceItem[];
  paidServices: ServiceItem[];
  extendReasons: ExtendReason[];
  experiencePillars: ExperiencePillar[];
  eventCards: EventCard[];
  roomHeroHighlights: IconTextItem[];
  experienceLogisticsFeatures: IconFeature[];
  socialConnectionFeatures: VisualIconFeature[];
  galleryItems: GalleryItem[];
  faqItems: any[];
  contactChecklist: string[];
  testimonials: Testimonial[];
  bookingAwardImage: string;
  thingsToDo: ThingToDoItem[];
  hikingGuide: HikingGuideContent;
  siteCopyContent: any;
} {
  const {
    faq,
    gallery,
    homepage,
    navigation,
    rooms,
    settings,
    siteCopy,
    testimonials,
    thingsToDo,
    hikingGuide,
  } = rawContent;

  const normalizedHomepage = {
    ...homepage,
    quickFacts: parseIconTextItems(homepage.quickFacts, "homepage.quickFacts"),
    includedServices: parseServices(
      (homepage.includedServices ?? homepage.freeServices ?? []),
      "homepage.includedServices",
    ),
    addOnServices: parseServices(
      (homepage.addOnServices ?? homepage.paidServices ?? []),
      "homepage.addOnServices",
    ),
    experienceLogisticsFeatures: parseIconFeatures(
      (homepage.experienceLogisticsFeatures ?? []),
      "homepage.experienceLogisticsFeatures"
    ),
    socialConnectionFeatures: parseVisualIconFeatures(
      (homepage.socialConnectionFeatures ?? []),
      "homepage.socialConnectionFeatures"
    ),
    extendReasons: parseExtendReasons(
      (homepage.extendReasons ?? []),
      "homepage.extendReasons"
    ),
  };

  const normalizedRooms = {
    ...rooms,
    offerings: parseRoomTypes(rooms.offerings ?? rooms.roomTypes ?? []),
    roomHeroHighlights: parseIconTextItems(
      (rooms.roomHeroHighlights ?? []),
      "rooms.roomHeroHighlights"
    ),
  };

  const contactChannels = (settings.contact.channels ?? []).filter((c: any) => c.enabled);
  const bookingChannels = (settings.booking.channels ?? []).filter((c: any) => c.enabled);

  const findChannelUrl = (channels: any[], id: string, fallback: string) => 
    channels.find((c) => c.id === id)?.url ?? fallback;

  const siteConfig = {
    ...settings,
    name: settings.business.name,
    shortName: settings.business.shortName,
    tagline: settings.business.tagline,
    description: settings.business.description,
    category: settings.business.category,
    location: settings.address.label,
    phoneDisplay: settings.contact.phoneDisplay,
    phoneRaw: settings.contact.phoneRaw,
    whatsappUrl: findChannelUrl(contactChannels, "whatsapp", settings.booking.whatsappUrl),
    bookingUrl: findChannelUrl(bookingChannels, "booking-com", settings.booking.bookingUrl),
    hostelworldUrl: findChannelUrl(bookingChannels, "hostelworld", settings.booking.hostelworldUrl),
    instagramUrl: findChannelUrl(contactChannels, "instagram", settings.contact.instagramUrl),
    whatsappCommunityUrl: settings.contact.whatsappCommunityUrl,
    breakfastHours: settings.operations.breakfastHours,
    checkInHours: settings.operations.checkInHours,
    volunteersNeeded: settings.features.volunteersNeeded,
    showMascot: settings.features.showMascot,
    showRegionalWeather: settings.features.showRegionalWeather,
    showLocalExperienceMap: settings.features.showLocalExperienceMap,
    showLocalPois: settings.features.showLocalPois,
    showRegionalTrails: settings.features.showRegionalTrails,
    baseKeywords: settings.seo.baseKeywords,
    bookingRating: settings.booking.bookingRating,
    hostelworldRating: settings.booking.hostelworldRating,
    hostelworldReviews: settings.booking.hostelworldReviews,
    maps: settings.maps,
  };

  return {
    siteConfig,
    contactChannels,
    bookingChannels,
    navLinks: navigation.navLinks,
    hero: normalizedHomepage.hero,
    heroHighlights: normalizedHomepage.heroHighlights,
    quickFacts: normalizedHomepage.quickFacts,
    roomTypes: normalizedRooms.offerings,
    freeServices: normalizedHomepage.includedServices,
    paidServices: normalizedHomepage.addOnServices,
    extendReasons: normalizedHomepage.extendReasons,
    experiencePillars: normalizedHomepage.experiencePillars,
    eventCards: normalizedHomepage.featuredMoments ?? normalizedHomepage.eventCards ?? [],
    roomHeroHighlights: normalizedRooms.roomHeroHighlights,
    experienceLogisticsFeatures: normalizedHomepage.experienceLogisticsFeatures,
    socialConnectionFeatures: normalizedHomepage.socialConnectionFeatures,
    galleryItems: (gallery.mediaItems ?? gallery.galleryItems ?? []) as GalleryItem[],
    faqItems: faq.faqItems,
    contactChecklist: normalizedHomepage.contactChecklist,
    testimonials: testimonials.reviews ?? testimonials.testimonials ?? [],
    bookingAwardImage: normalizedHomepage.bookingAwardImage,
    thingsToDo: thingsToDo.localHighlights ?? thingsToDo.thingsToDo ?? [],
    hikingGuide: parseHikingGuide(hikingGuide),
    siteCopyContent: siteCopy,
  };
}
