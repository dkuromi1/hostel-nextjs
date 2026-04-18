import settings from "../content/settings.json";
import navigation from "../content/navigation.json";
import roomsData from "../content/rooms.json";
import homepage from "../content/homepage.json";
import faq from "../content/faq.json";
import testimonialsData from "../content/testimonials.json";
import gallery from "../content/gallery.json";
import thingsToDoData from "../content/things-to-do.json";

export const siteConfig = {
  ...settings,
} as const;

export const navLinks = navigation.navLinks;

export const heroHighlights = homepage.heroHighlights;
export const quickFacts = homepage.quickFacts;

export const roomTypes = roomsData.roomTypes;

// Individual room images lists (legacy exports for specific components)
export const podDormImages = roomsData.roomTypes[0].images;
export const fourBedDormImages = roomsData.roomTypes[1].images;

export const sharedAmenities = homepage.sharedAmenities;
export const freeServices = homepage.freeServices;
export const paidServices = homepage.paidServices;

export const extendReasons = homepage.extendReasons;
export const experiencePillars = homepage.experiencePillars;
export const eventCards = homepage.eventCards;

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

export const contactChecklist = homepage.contactChecklist;

export const testimonials = testimonialsData.testimonials;
export const bookingAwardImage = homepage.bookingAwardImage;

export const thingsToDo = thingsToDoData.thingsToDo;