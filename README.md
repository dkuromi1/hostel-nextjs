# Scodrinon Hostel Website & Architecture Guide

A premium, modular web application for upscale hospitality properties. Built for speed, SEO, and boutique aesthetics, this codebase uses a product vs. instance architecture to separate core application logic from property-specific content.

---

## 1. System Architecture & Core Philosophy

The codebase is engineered as a multi-tenant, white-label hospitality product. Core business logic ("Product") is kept separate from property-specific content ("Instance").

* **Product (Core Logic):** Framework setup, design tokens, UI components, routing, map rendering engines, and accessibility patterns residing in `app/`, `components/`, and `lib/`.
* **Instance (Tenant Data):** Property copywriting, room offerings, map POIs, gallery media, and feature flags located under `instances/[property-name]/content/*.json`.
* **Build-Time Asset Sync (`scripts/prebuild.js`):** During prebuild, instance-specific public assets are dynamically synced to the root `public/` directory, isolating builds per property deployment.

---

## 2. Main Features & Tech Stack

This project is engineered beyond typical static hospitality sites, using advanced React patterns and a cutting-edge stack:

* **Next.js 16 & React 19 Engine**: Running on the latest versions of the React ecosystem for peak rendering performance and server-component-first architecture.
* **Tailwind CSS 4.0 & Radix UI**: Utilizing the next-gen styling engine for zero-runtime CSS paired with headless, accessible component primitives.
* **Editorial Design System (Sharp Aesthetic)**: A premium design philosophy enforced across all UI components for a modern, high-density boutique look.
* **Framer Motion**: Hardware-accelerated animations, scroll reveals, and elegant layout transitions across the interface.
* **Mapbox GL JS with GPU Safety**: Cinematic interactive maps with 3D extrusions and satellite switching. Includes an intelligent "GPU-Safe" mode that optimizes rendering on mobile devices to prevent browser crashes.
* **Boutique Location Experience**: Features a custom-integrated map interface including satellite view, 3D building extrusions, and curated local recommendations (Eat, Shop, See, Transit).
* **Adventure-Planning Layer**: Built-in regional travel helpers including live weather, trail overlays, and interactive map targeting to support real trip planning directly on the site.
* **UX-First Routing (`@modal/`)**: Utilizes Next.js **Intercepting & Parallel Routes** for gallery lightboxes, enabling deep-linking into specific media items without losing page context.
* **Shadow-Routing & URL Syncing**: The gallery and map POI implementations use custom `window.history` synchronization (`?poi=...#map`) to enable browser history support without triggering expensive Server Component re-renders.
* **Full PWA Architecture**: Native-like app experience with custom Service Worker (Serwist) handling background sync, a graceful update prompt UI, and granular caching for offline reliability.
* **Rich Media Experiences**: Includes an optimized image and video masonry gallery with interactive lightbox modals using hardware acceleration so scrolling and zooming are smooth.
* **Predictive Asset Warming**: Custom media-warming engine using `img.decode()` and `fetchPriority` to ensure gallery interactions are instantaneous.
* **Intelligent Performance Engine (`lib/performance.ts`)**: Audits device hardware concurrency, memory, connection speed, and browser age to dynamically disable battery-draining effects (such as site-wide `backdrop-blur`, 3D map extrusions, and complex spring animations) on low-end mobile devices.
* **Direct Booking Conversion System**: WhatsApp-first booking flows embedded throughout the site via sticky mobile booking UI, reusable booking action blocks, direct-booking cards, and booking-channel adapters (Booking.com / Hostelworld fallback).
* **Social Proof Modules**: Includes custom Booking.com / Hostelworld / Google review presentation, awards, testimonial carousels, and booking credibility components designed specifically for hospitality conversion.
* **Community & News Hooks**: Supports feature-flagged operational modules such as volunteer recruitment banners and WhatsApp community promotion with QR-based entry points.
* **Automated SEO & Schema Engineering**: Dynamic JSON-LD injection (`lib/metadata.ts`) generating `LocalBusiness`, `FAQPage`, and `BreadcrumbList` schemas for superior search engine visibility.
* **Privacy-First Analytics**: Integrated analytics for cookie-less, GDPR-compliant visitor tracking, fully manageable via environment variables.
* **Configuration-Driven Typography**: Built-in support for dynamic font-swapping (e.g., Cormorant Garamond vs. Inter) via CSS variables mapped directly to instance settings, allowing for rapid re-branding without code changes.
* **Dynamic Theme & Layout Engine**: Granular control over site "Density" and "Width" via `settings.json`, supporting configurable container max-widths, grid gutters, and section spacing.

---

## 3. Data Flow & Normalization Engine

Instead of relying on a runtime database or external CMS network call during rendering, the application reads flat-file JSON content at build time:

1. **Schema Validation (`lib/data-normalizer.ts`):** Validates raw JSON structures against expected fallback defaults and enforces TypeScript types.
2. **Icon Safety (`lib/icon-registry.ts`):** All JSON-backed icon string fields are validated against a strict central icon registry. Unknown icon keys fail the build to prevent broken visual rendering.
3. **Data Gateway (`lib/site-data.ts`):** Exposes validated, fully typed property data getters to React components across the application.

---

## 4. Advanced Routing Patterns

### Intercepting & Parallel Routes (`@modal/`)
The application uses Next.js Parallel Routes (`app/@modal/`) and Intercepting Routes (`app/(.)gallery/[id]/`) for media lightbox interaction:
* **In-App Navigation:** Clicking a gallery item intercepts the route and renders a lightbox modal over the active page while updating the browser URL to `/gallery/[id]`.
* **Direct Navigation / Refresh:** Navigating directly to `/gallery/[id]` or refreshing the browser renders the media item as a standalone server-rendered page for complete SEO indexability.

### Shadow-Routing & Map State Deep-Linking
For POI cards and map interactions (`?poi=...#map`), the client utilizes `window.history.pushState` / `replaceState` to update browser query parameters dynamically, preserving page context and preventing unnecessary server re-renders.

---

### 5. Architectural Case Study & Hospitality Client Value

This project is engineered beyond a standard brochure website, serving as a **production-grade reference framework** for high-conversion, multi-property hospitality brands.

### 💰 Direct Business ROI for Hospitality Operators

1. **Commission-Free Direct Booking Conversion Engine**:
   - Reduces reliance on heavy (15%+) OTA commissions (Booking.com / Hostelworld) by driving guests into friction-free, high-converting WhatsApp & direct booking funnels.
   - Sticky mobile booking bars, dynamic pricing cards, and direct channel adapters maintain high mobile conversion rates.

2. **Multi-Property Scalability & Instant White-Labeling**:
   - The **Product vs. Instance** architecture enables launching or re-skinning new hostel/hotel locations in under an hour simply by creating a new `instances/[property]/content/*.json` config folder—saving custom redesign costs.

3. **Zero Maintenance & Infrastructure Overhead**:
   - Flat-file JSON architecture eliminates SQL database crashes, plugin security vulnerabilities, and expensive server infrastructure. Deploys to global edge CDNs (Cloudflare Pages / Vercel) with near-zero monthly hosting costs.

4. **Offline Hiker & Traveler Utility (PWA Engine)**:
   - Remote hospitality properties (like alpine hiking hubs) benefit from offline Progressive Web App (PWA) caching. Guests can access mountain trail maps, emergency contacts, and hostel guides even when disconnected from cellular coverage.

---

### 💡 Technical Trade-Offs: Custom Next.js Engine vs. Traditional CMS (Webflow / WordPress)

| Architectural Dimension | Traditional CMS / No-Code Monoliths | Custom Next.js 16 Multi-Tenant Engine | Business Impact |
| :--- | :--- | :--- | :--- |
| **Multi-Property Scale** | Rigid single-site silos requiring full duplication for new locations. | **Product vs. Instance Architecture**: 1 core codebase powers unlimited locations. | **80%+ savings** on multi-site development & maintenance. |
| **Direct Booking Funnels** | Static forms or redirection off-site with high drop-off. | **WhatsApp-First Sticky Booking System** & custom channel adapters. | Captures **commission-free direct bookings** at higher rates. |
| **Mobile Core Web Vitals** | Heavy plugin tax, script bloat, and layout shifts (CLS). | Zero-runtime CSS, predictive media pre-warming (`img.decode()`), and sub-millisecond edge SSG. | Maximizes Google Search ranking & lowers mobile bounce rates. |
| **Hardware & GPU Safety** | Serves heavy 3D maps universally, risking mobile browser crashes. | **Adaptive Performance Engine**: Audits device RAM/CPU and degrades GPU load dynamically. | **Zero mobile crashes** for guests on low-end smartphones. |
| **Offline Utility** | Inaccessible without active cellular/wifi connections. | **Full Service Worker PWA**: Offline map tracks & emergency guides. | Unmatched guest satisfaction during remote trail travel. |

---

### 🚀 Key Technical & Engineering Accomplishments
1. **Adaptive Hardware Performance Engine (`lib/performance.ts`):** Programmatically audits hardware constraints (CPU cores, device RAM, network RTT) to dynamically toggle heavy Mapbox 3D layers and CSS backdrop blurs.
2. **Deep-Linkable App Router State (`@modal/`):** Utilizes Next.js Parallel & Intercepting routes to deliver instant lightbox overlays that preserve deep-linkable URLs without full page reloads.
3. **Decoupled Flat-File CMS Architecture (`lib/data-normalizer.ts`):** Enforces build-time schema safety and icon registry validation across JSON assets, guaranteeing zero visual breakage during content updates.
4. **Offline-First PWA & Media Warming:** Integrated Serwist Service Worker and `img.decode()` asset pre-warming for instantaneous media interactions.

---

## 6. Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd scodrinon-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the site:**
   Open [http://localhost:3000](http://localhost:3000).

---

## 7. Site Management & Content Editing

This site can be managed in two ways:
* Through the Decap CMS admin panel at `/admin`
* Directly through the JSON content files in `instances/[property-name]/content/`

**For detailed management instructions, see [`SITE_ADMIN_GUIDE.md`](./SITE_ADMIN_GUIDE.md).**

### Quick Dev Note for Content
Instance source content lives in `instances/[property-name]/content/*.json`. `lib/site-data.ts` is the typed adapter layer that validates and exports that content to the UI.

To add photos and videos to the gallery for an instance, place them in `instances/[property-name]/public/images/` and `instances/[property-name]/public/videos/`, then update `instances/[property-name]/content/gallery.json`.

**Gallery Item Format:**
```ts
{
  id: "item-id",
  type: "image",
  src: "/images/photo.jpg",
  alt: "Description for SEO",
  aspect: "aspect-[4/5]",
}
```

### Developer Notes
* **Theme tokens** live in `app/globals.css`. Brand colors, semantic text colors, atmosphere/background tokens, selection styling, and shared utilities should be updated there.
* **Typography utilities** in `app/globals.css` are the source of truth for repeated type patterns (e.g., `heading-section`, `text-card-body`).
* **Icon names are strict**. JSON-backed icon fields are validated against `lib/icon-registry.ts`. Unknown icon keys fail the build, so ensure new icons are added to `ICON_REGISTRY`.
* **Feature toggles are instance-driven**. Operational modules like local map rendering, regional weather, volunteer banners, and related experience content are controlled from instance settings rather than hardcoded in page logic.
* **Instance Syncing**: To sync instance assets to the root public folder for build compatibility, run:
  ```bash
  cp -R instances/[property-name]/public/* public/
  ```

---

## 8. Deployment

This project is optimized for **Cloudflare Pages**, **Vercel**, or **Netlify**.

### Cloudflare Pages (OpenNext)
This project uses `@opennextjs/cloudflare` for edge-optimized deployments on Cloudflare.
1. Configure your `wrangler.jsonc` file.
2. Build for Cloudflare: `npm run cf:build`
3. Preview locally: `npm run cf:preview`
4. Deploy: `npm run cf:deploy`

### Vercel / Netlify
1. **Auto-Configuration**: Modern platforms will automatically detect the Next.js project and configure the correct build command (`npm run build`) and publish directory (`.next`).

### Environment Variables
Regardless of platform, ensure these are set:
- `NEXT_PUBLIC_SITE_URL`: Your live domain (e.g., `https://www.property.com`).
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Required for interactive maps.
- `ANALYTICS_ID`: (Optional) For tracking.
