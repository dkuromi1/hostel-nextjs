# Admin Guide Template

Use this document as the base admin guide for a new deployment of the hospitality site system.

Replace bracketed placeholders before handing it to a client or operator.

## Editing Paths

This site supports two editing paths:

- **Decap CMS**: Dashboard-style editing at `[your-domain]/admin`.
- **Manual JSON Editing**: Technical updates directly in the property instance folder: `instances/[property-name]/content/`.

## Access

1. Go to `[your-domain]/admin`.
2. Log in with the authorized account for this deployment.

## Core Editable Areas

Typical collections in the CMS:

- `Settings`
- `Offerings`
- `Gallery`
- `Testimonials`
- `FAQs`
- `Site Content`

## Content Files

The site reads business content from structured JSON files in the instance directory.

| File Name | What it controls |
|-----------|------------------|
| `settings.json` | Business details, channels, branding, feature flags |
| `rooms.json` | Offerings, pricing, and room details |
| `homepage.json` | Homepage highlights, services, and experience blocks |
| `faq.json` | Frequently asked questions |
| `testimonials.json` | Reviews and ratings |
| `gallery.json` | Media library entries |
| `things-to-do.json` | Local experiences |
| `pois.json` | Map recommendations |

## Advanced Platform Features

This product includes several high-end engineering features out of the box:

- **PWA (Progressive Web App)**: The site can be "installed" on mobile devices, providing offline reliability and a native-app feel.
- **Mapbox GPU Safety**: The interactive map automatically detects low-power mobile devices and optimizes its rendering to prevent browser crashes.
- **Predictive Warming**: The site pre-fetches and pre-decodes gallery images before they are clicked, ensuring an instant, lag-free media experience.
- **Automated Schema**: Every page automatically generates structured data (JSON-LD) for better Google Search visibility.


## Media & Assets

### 1. Uploading
- Place images in `instances/[property-name]/public/images/`.
- Place videos in `instances/[property-name]/public/videos/`.
- Use simple filenames with no spaces (e.g., `lobby_view_01.jpg`).
- Prefer JPEG or WebP for photos; use PNG or WebP for transparent graphics.

### 2. Syncing
After adding files manually, they must be synced to the root `public/` directory for build compatibility:
```bash
cp -R instances/[property-name]/public/* public/
```

## Map Setup

If the deployment uses the local experience map, provide:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```

Adjust deployment-specific coordinates and POIs in the map config or content files.

## SEO & Metadata

Update SEO defaults in the page files and content objects used by:

- `app/page.tsx`
- `app/rooms/page.tsx`
- `app/experiences/page.tsx`

Primary SEO controls are managed via `lib/metadata.ts` (dynamic schema) and `settings.json`.

## Avoid Editing

- `package.json`, `next.config.ts`, `netlify.toml`
- Core framework files in `app/`, `components/`, or `lib/` unless making a deliberate product change.

## Quick Reference

| Task | Where to update it |
|------|--------------------|
| Change contact info | `Settings` |
| Update pricing | `Offerings` |
| Add a review | `Testimonials` |
| Add a gallery item | `Gallery` |
| Update FAQs | `FAQs` |
| Change hero or homepage copy | `Site Content` |

## Deployment Notes

- Confirm the latest build succeeds after publishing content changes.
- Ensure the Mapbox token and any analytics IDs are present in the hosting environment variables.


