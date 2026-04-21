# Product Refactor Map

Goal: turn this repository from a single custom hostel deployment into a reusable higher-ticket hospitality site product without breaking the current Scodrinon site during extraction.

## Product Shape

The repo should end up with three clear layers:

1. Core product
   - Shared layout, design system, metadata, CMS schema, content parsing, and reusable conversion components.
2. Client instance
   - Scodrinon-specific content, branding, imagery, analytics IDs, location data, and business rules.
3. Premium add-ons
   - Advanced map overlays, regional weather, trek logistics, and other niche modules that justify higher pricing.

## Target Structure

This is the target structure to refactor toward incrementally:

```text
docs/
  product-refactor-map.md
  product/
  instances/

src-or-current-root/
  app/
  components/
  lib/

instances/
  scodrinon/
    content/
    public/
    config/

features/
  conversion/
  gallery/
  seo/
  map/
  reviews/

addons/
  local-experience-map/
  adventure-logistics/
  pwa/
```

Note: the current repo does not need a full folder migration immediately. The first phase is naming and boundary cleanup while preserving current import paths.

## Current To Target

### Core product

Keep in core and generalize:

- `app/layout.tsx`
- `app/page.tsx`
- `app/rooms/page.tsx`
- `app/contact/page.tsx`
- `app/gallery/*`
- `components/ui/*`
- `components/page-hero.tsx`
- `components/cta-strip.tsx`
- `components/faq-list.tsx`
- `components/testimonial-carousel.tsx`
- `components/gallery-*`
- `components/booking-actions.tsx` -> rename to `components/inquiry-actions.tsx`
- `components/sticky-booking-bar.tsx` -> rename to `components/sticky-inquiry-bar.tsx`
- `components/hero-booking-bar.tsx` -> rename to `components/hero-inquiry-bar.tsx`
- `components/structured-data.tsx`
- `lib/site-data.ts` -> split later into product config + instance loader
- `lib/metadata.ts`
- `lib/icon-registry.ts`
- `public/admin/config.yml` -> keep, but remove hostel-specific assumptions

### Scodrinon instance

Move out of core over time:

- `instances/scodrinon/content/*`
- Scodrinon logos and app icons in `public/`
- Scodrinon image and video assets in `instances/scodrinon/public/images` and `instances/scodrinon/public/videos`
- hardcoded Scodrinon copy in `README.md`, `SITE_ADMIN_GUIDE.md`, and CMS labels
- analytics ID in `app/layout.tsx`

### Premium add-ons

Pull out of the baseline product:

- `components/location-map.tsx`
- `components/location-map-inner.tsx`
- `components/theth-weather.tsx`
- `instances/scodrinon/content/pois.json`
- `instances/scodrinon/content/things-to-do.json`
- `instances/scodrinon/content/theth_valbona_tracks.json`

### Instance-only personality

Do not keep these in the baseline product:

- `components/tito-the-cat.tsx`
- `components/volunteer-banner.tsx`

## Phase 1 Execution Order

These changes should happen first because they improve boundaries without requiring a large move:

1. Rename structural concepts to neutral terms.
   - `siteConfig` -> `propertyConfig`
   - `booking-actions` -> `inquiry-actions`
   - `sticky-booking-bar` -> `sticky-inquiry-bar`
   - `hero-booking-bar` -> `hero-inquiry-bar`
2. Remove hardcoded client wiring from global layout.
   - make analytics env-driven
   - make preconnects config-driven
3. Neutralize CMS wording.
   - replace hostel-specific labels with business/property wording
4. Move docs into product docs vs instance docs.
5. Extract map constants and Scodrinon labels from `location-map-inner.tsx`.

## Rename Map

First rename set:

- `lib/site-data.ts`
  - `siteConfig` -> `propertyConfig`
- `components/booking-actions.tsx`
  - new name: `components/inquiry-actions.tsx`
- `components/sticky-booking-bar.tsx`
  - new name: `components/sticky-inquiry-bar.tsx`
- `components/hero-booking-bar.tsx`
  - new name: `components/hero-inquiry-bar.tsx`

Second rename set:

- `booking` content/config sections -> `reservation` or `conversion`
- `rooms` labels in admin/UI -> `offerings` where structurally appropriate

## Guardrails

- Do not move all files at once.
- Do not change visual output in phase 1.
- Do not genericize the product into a bland multi-industry template.
- Keep hospitality-specific conversion patterns as the product's value.

## Immediate Next Change

Use this map to make the first code change:

1. neutralize global naming and wiring
2. keep imports working
3. verify the site still builds
