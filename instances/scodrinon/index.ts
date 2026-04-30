import faq from "./content/faq.json";
import gallery from "./content/gallery.json";
import homepage from "./content/homepage.json";
import navigation from "./content/navigation.json";
import pois from "./content/pois.json";
import rooms from "./content/rooms.json";
import settings from "./content/settings.json";
import siteCopy from "./content/site-copy.json";
import testimonials from "./content/testimonials.json";
import thingsToDo from "./content/things-to-do.json";
import thethValbonaTracks from "./content/theth_valbona_tracks.json";
import hikingGuide from "./content/hiking-guide.json";
import mapConfig from "./content/map-config.json";

export const scodrinonInstance = {
  id: "scodrinon",
  name: "Scodrinon",
  paths: {
    contentRoot: "instances/scodrinon/content",
    publicRoot: "instances/scodrinon/public",
    imagesRoot: "instances/scodrinon/public/images",
    videosRoot: "instances/scodrinon/public/videos",
    brandingRoot: "instances/scodrinon/public/branding",
  },
  contentPaths: {
    settings: "instances/scodrinon/content/settings.json",
    navigation: "instances/scodrinon/content/navigation.json",
    rooms: "instances/scodrinon/content/rooms.json",
    homepage: "instances/scodrinon/content/homepage.json",
    faq: "instances/scodrinon/content/faq.json",
    testimonials: "instances/scodrinon/content/testimonials.json",
    gallery: "instances/scodrinon/content/gallery.json",
    thingsToDo: "instances/scodrinon/content/things-to-do.json",
    pois: "instances/scodrinon/content/pois.json",
    trails: "instances/scodrinon/content/theth_valbona_tracks.json",
    siteCopy: "instances/scodrinon/content/site-copy.json",
    mapConfig: "instances/scodrinon/content/map-config.json",
  },
  brandingAssets: {
    publicLogoWebp: "/logo.webp",
    publicLogoPng: "/logo.png",
    publicIcon: "/icon.png",
    publicIcon192: "/icon-192.png",
    publicAppleIcon: "/apple-icon.png",
    appIcon: "app/icon.png",
    appIcon192: "app/icon-192.png",
    appAppleIcon: "app/apple-icon.png",
    appFavicon: "app/favicon.ico",
  },
  featureFlags: settings.features,
  integrations: {
    analytics: {
      provider: "umami",
      scriptSrc: "https://cloud.umami.is/script.js",
      websiteIdEnvVar: "NEXT_PUBLIC_UMAMI_WEBSITE_ID",
    },
    mapbox: {
      tokenEnvVar: "NEXT_PUBLIC_MAPBOX_TOKEN",
    },
    cms: {
      mediaFolder: "public/images",
      publicFolder: "/images",
    },
  },
  content: {
    settings,
    navigation,
    rooms,
    homepage,
    faq,
    testimonials,
    gallery,
    thingsToDo,
    siteCopy,
    pois,
    thethValbonaTracks,
    hikingGuide,
    mapConfig,
  },
  loaders: {
    loadPois: async () => pois,
    loadTrailGeoJson: async () => thethValbonaTracks,
  },
  mapConfig: mapConfig as any,
} as const;

export type InstanceDefinition = typeof scodrinonInstance;

export const activeInstance = scodrinonInstance;
