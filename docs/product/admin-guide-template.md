# Admin Guide Template

Use this document as the base admin guide for a new deployment of the hospitality site system.

Replace bracketed placeholders before handing it to a client or operator.

## Editing Paths

This site supports two editing paths:

- `Decap CMS` at `/admin`
- Manual JSON editing in the deployment content folder

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

The site reads business content from structured JSON files and adapts them through `lib/site-data.ts`.

Typical files:

| File Name | What it controls |
|-----------|------------------|
| `settings.json` | Business details, channels, branding, feature flags |
| `rooms.json` | Offerings, pricing, and room details |
| `homepage.json` | Homepage facts, services, and experience blocks |
| `faq.json` | Frequently asked questions |
| `testimonials.json` | Reviews and ratings |
| `gallery.json` | Media library entries |
| `things-to-do.json` | Local experiences |
| `pois.json` | Map recommendations |

## Media Uploads

- Put images in the deployment image folder
- Put videos in the deployment video folder
- Use simple filenames with no spaces
- Prefer JPEG or WebP for photos
- Use PNG or WebP for transparent graphics

## Map Setup

If the deployment uses the local experience map, provide:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```

Adjust deployment-specific coordinates and POIs in the map config or content files.

## SEO Notes

Update SEO defaults in the page files and content objects used by:

- `app/page.tsx`
- `app/rooms/page.tsx`
- `app/experiences/page.tsx`

## Avoid Editing

- `package.json`
- `next.config.ts`
- `netlify.toml`
- framework files unless you are making a deliberate product change

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
- If analytics are enabled, ensure the deployment environment variables are set.
- If the map is enabled, confirm the Mapbox token is present.
