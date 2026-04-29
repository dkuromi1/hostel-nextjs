# Scodrinon Admin Guide

This guide is specific to the **Scodrinon Hostel** deployment in Shkodër, Albania.

## Editing Paths

This site supports two editing paths:

- **Decap CMS**: Dashboard-style editing at `https://www.scodrinon.com/admin`.
- **Manual JSON Editing**: Technical updates directly in `instances/scodrinon/content/`.

## Access

1. Go to `https://www.scodrinon.com/admin`.
2. Log in with your authorized account.

## Scodrinon Data Files

The site’s business data is stored in `instances/scodrinon/content/` and parsed through `lib/site-data.ts`.

| File Name | What it controls |
|-----------|------------------|
| `settings.json` | Business name, WhatsApp, phone, address, volunteer toggle |
| `navigation.json` | Header and footer navigation links |
| `rooms.json` | Dorm prices, descriptions, and feature bullets |
| `homepage.json` | Quick facts, amenities, and reasons to extend |
| `faq.json` | Questions and answers |
| `testimonials.json` | Guest reviews and ratings |
| `gallery.json` | Gallery images and videos |
| `pois.json` | Scodrinon map markers and local recommendations |
| `things-to-do.json` | Scodrinon local attractions and experiences |
| `hiking-guide.json` | Theth to Valbona hiking logistics and tips |
| `site-copy.json` | Global site copy and translations |

## Advanced Platform Features

This site includes several high-end engineering features for performance and stability:

- **PWA (Progressive Web App)**: The site can be "installed" on mobile devices, providing offline reliability and a native-app feel.
- **Mapbox GPU Safety**: The interactive map automatically detects low-power mobile devices and optimizes its rendering to prevent browser crashes.
- **Predictive Warming**: The site pre-fetches and pre-decodes gallery images before they are clicked, ensuring an instant, lag-free media experience.
- **Automated Schema**: Every page automatically generates structured data (JSON-LD) for better Google Search visibility.


**Important**: if you change the WhatsApp number, update `phoneDisplay`, `phoneRaw`, and `whatsappUrl` together in `settings.json`.

## Map Management

The interactive map is powered by Mapbox and managed in `components/location-map-inner.tsx`.

### Required Environment Variable
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```

### Scodrinon Map Data
- `HOSTEL_COORDS`: primary property marker
- `PEDONALE_COORDS`: promenade highlight path
- `instances/scodrinon/content/pois.json`: local recommendations
- `instances/scodrinon/content/theth_valbona_tracks.json`: regional trek overlay

Mapbox uses `[Longitude, Latitude]` order.

## Testimonials Logic

Testimonials are currently split across pages:
- **Homepage**: first 5 items from `testimonials.json`
- **Rooms page**: next 5 items

Add stronger new reviews to the top if they should appear on the homepage first.

## Media Uploads

### Manual Uploads
1. Images go in `public/images/`
2. Videos go in `instances/scodrinon/public/videos/`
3. Branding source files live in `instances/scodrinon/public/branding/`
4. CMS image uploads already land in `public/images/`; no extra sync step is needed for those.

## SEO & Icon Management

- **SEO**: Page-level defaults live in `app/page.tsx`, `app/rooms/page.tsx`, and `app/experiences/page.tsx`.
- **Icons**: The site uses a strict registry. Ensure new icons are defined in `lib/icon-registry.ts`.

## Avoid Editing
- Core framework files in `app/`, `components/`, or `lib/` unless making a deliberate code change.

## Dashboard Quick Reference

| Task | Where in Dashboard |
|------|--------------------|
| Toggle volunteers needed | `Settings` -> `Property Configuration` |
| Change dorm prices | `Offerings` -> select offering |
| Update WhatsApp / phone | `Settings` -> `Property Configuration` |
| Add a guest review | `Testimonials` -> add new |
| Add a gallery photo | `Gallery` -> add new |
| Update FAQ | `FAQs` -> edit FAQ content |

