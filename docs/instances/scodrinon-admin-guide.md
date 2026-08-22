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
- **Intelligent Performance Engine**: The site automatically audits the user's hardware (concurrency, memory, connection). On low-end devices, it disables battery-draining effects like backdrop-blur and 3D map extrusions to ensure a smooth booking experience.
- **Dynamic Layout Engine**: Site density (compact/wide), container widths, and section gutters are all managed via `settings.json`, allowing the layout to reflow consistently across all pages.

## Design & Theme Management

The site's visual character is controlled in `settings.json` under the `branding.design` object.

### 1. Typography & Layout
- **Typography**: Change `headingFont` to `serif` or `sans` to swap the site's primary character.
- **Layout Density**: The `layout` object (`width`, `spacing`, `gutter`) accepts `compact`, `standard`, or `wide` to globally adjust the site's vertical and horizontal rhythm.

### 2. Feature Toggles
In the `features` object of `settings.json`, you can enable or disable:
- `showRegionalWeather`: Live weather data for hiking planning.
- `showRegionalTrails`: Interactive trail overlays on the map.
- `volunteersNeeded`: The recruitment banner for the volunteer program.
- `showMascot`: The friendly character (Tito) in the corner of the site.
- `showPwaUpdatePrompt`: When `true`, shows a popup banner ("New version available. Refresh") upon new app versions. When `false`, updates apply organically in the background without user prompts.


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
| Change Layout Density | `Settings` -> `Branding` -> `Layout` |
| Toggle Site Mascot | `Settings` -> `Features` -> `Show Mascot` |
| Swap Heading Fonts | `Settings` -> `Branding` -> `Typography` |

