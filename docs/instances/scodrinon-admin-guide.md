# Scodrinon Admin Guide

This guide is specific to the Scodrinon deployment of the hospitality site system.

## Editing Paths

This site supports two editing paths:

- `Decap CMS` at `/admin` for dashboard-style editing
- Manual JSON editing in `instances/scodrinon/content/` for technical updates or backup workflows

## Scodrinon-Specific Notes

### Access

1. Go to `https://www.scodrinon.com/admin`.
2. Log in with your authorized account.

### What Makes This Deployment Unique

- Boutique glassmorphism styling and a slate-midnight palette
- Direct-booking emphasis through WhatsApp and OTA links
- PWA install support
- Local experience map with Scodrinon-specific overlays
- Theth / Valbona regional hiking content

## Scodrinon Data Files

The site’s business data is stored in `instances/scodrinon/content/` and parsed through `lib/site-data.ts`.

| File Name | What it controls |
|-----------|------------------|
| `settings.json` | Business name, WhatsApp, phone, address, volunteer toggle |
| `rooms.json` | Dorm prices, descriptions, and feature bullets |
| `homepage.json` | Quick facts, amenities, and reasons to extend |
| `faq.json` | Questions and answers |
| `testimonials.json` | Guest reviews and ratings |
| `gallery.json` | Gallery images and videos |
| `pois.json` | Scodrinon map markers and local recommendations |
| `things-to-do.json` | Scodrinon local attractions and experiences |

Important: if you change the WhatsApp number, update `phoneDisplay`, `phoneRaw`, and `whatsappUrl` together.

## Map Management

The interactive map is powered by Mapbox and managed in `components/location-map-inner.tsx`.

### Required env var

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```

### Scodrinon map data

- `HOSTEL_COORDS`: primary property marker
- `PEDONALE_COORDS`: promenade highlight path
- `instances/scodrinon/content/pois.json`: local recommendations
- `instances/scodrinon/content/theth_valbona_tracks.json`: regional trek overlay

Mapbox uses `[Longitude, Latitude]` order.

## Testimonials Logic

Testimonials are currently split across pages:

- Homepage: first 5 items from `testimonials.json`
- Rooms page: next 5 items

Add stronger new reviews to the top if they should appear on the homepage first.

## Media Uploads

### CMS uploads

- Use simple filenames such as `rooftop_sunset.jpg`
- Prefer JPEG or WebP for photos
- Use PNG or WebP for graphics with transparency

### Manual uploads

1. Images go in `instances/scodrinon/public/images/`
2. Videos go in `instances/scodrinon/public/videos/`
3. Branding source files live in `instances/scodrinon/public/branding/`
4. App and public icon entrypoints are copied from the instance branding files for build compatibility
5. To sync instance assets to public after manual updates, run: `cp -R instances/scodrinon/public/* public/`
6. PWA settings live in `public/site.webmanifest`

## SEO Notes

For page-level SEO defaults, check:

- `app/page.tsx`
- `app/rooms/page.tsx`
- `app/experiences/page.tsx`

## Avoid Editing

- `package.json`
- `next.config.ts`
- `netlify.toml`
- `components/` unless making a deliberate code change
- `lib/` for routine content edits

## Dashboard Quick Reference

| Task | Where in Dashboard |
|------|--------------------|
| Toggle volunteers needed | `Settings` -> `Property Configuration` |
| Change dorm prices | `Offerings` -> select offering |
| Update WhatsApp / phone | `Settings` -> `Property Configuration` |
| Add a guest review | `Testimonials` -> add new |
| Add a gallery photo | `Gallery` -> add new |
| Update FAQ | `FAQs` -> edit FAQ content |

If changes do not appear after a few minutes, check the hosting build status.
