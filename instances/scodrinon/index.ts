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
  },
  loaders: {
    loadPois: async () => pois,
    loadTrailGeoJson: async () => thethValbonaTracks,
  },
  mapConfig: {
    hostelCoords: [19.51698538503564, 42.069258] as [number, number],
    thethDropoffCoords: [19.772315376603874, 42.39677313338882] as [number, number],
    valbonaVillageCoords: [19.88570882131251, 42.444877303358666] as [number, number],
    komaniFerryCoords: [19.826066248202096, 42.10881657873157] as [number, number],
    bliniParkCoords: [19.80642220690339, 42.19953460048828] as [number, number],
    pedonaleCoords: [
      [19.513800410509983, 42.067007048478274],
      [19.514691128164753, 42.06795226804246],
      [19.51697176304084, 42.06913341207323],
      [19.5171140522808, 42.069314649661514]
    ] as [number, number][],
    queries: {
      thethValbona: 'theth-valbona-midpoint',
      shalaRiver: 'shala-river-midpoint',
      komaniFerry: 'komani-ferry',
    },
    keywords: {
      property: ['hostel', 'scodrinon'],
      pedestrian: ['pedestrian', 'idromeno'],
      theth: ['theth', 'valbona'],
      shala: ['shala', 'river'],
      komani: ['komani', 'lake'],
    },
    styles: {
      standard: 'mapbox://styles/mapbox/standard',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    },
  },
} as const;

export type InstanceDefinition = typeof scodrinonInstance;

export const activeInstance = scodrinonInstance;
