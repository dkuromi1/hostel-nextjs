# Scodrinon Hostel Website

A premium, modular web application for high-end hospitality properties. Built for speed, SEO, and boutique aesthetics, this codebase follows a "Product vs. Instance" architecture to separate core logic from property-specific content.

## Main Features

This project is engineered beyond typical static hospitality sites, using advanced React patterns and a cutting-edge stack:

*   **Next.js 16 & React 19 Engine**: Running on the latest versions of the React ecosystem for peak rendering performance and future-ready architecture.
*   **Tailwind CSS 4.0 & Radix UI**: Utilizing the next-gen styling engine for ultra-fast, zero-runtime CSS and headless components.
*   **Framer Motion**: Powering fluid, hardware-accelerated animations, beautiful scroll reveals, and elegant layout transitions across the interface to deliver a premium user experience.
*   **Mapbox GL JS with GPU Safety**: Cinematic interactive maps with 3D extrusions and satellite switching. Includes an intelligent "GPU-Safe" mode that optimizes rendering on mobile devices to prevent browser crashes.
*   **Boutique Location Experience**: Features a custom-integrated map interface including satellite view, 3D building extrusions for urban orientation, and curated local recommendations (Eat, Shop, See, Transit).
*   **Adventure-Planning Layer**: Built-in regional travel helpers including live Theth weather, trail overlays, and Shala River / Komani / Theth-Valbona map targeting to support real trip planning from the hostel site itself.
*   **POI Deep-Linking & Map State Routing**: Experience cards can push query-driven map states (for example `?poi=...#map`) so users can jump directly from content cards into specific map views without losing page context.
*   **Fluid Glassmorphism**: A comprehensive design system built on high-fidelity `backdrop-blur` effects and dynamic Z-index layering. 'Bento Box' styled UI designed to look and perform well on mobile screens.
*   **Full PWA Architecture**: Native-like app experience with custom Service Worker (Serwist) handling background sync, a graceful update prompt UI, and granular caching for offline reliability.
*   **Rich Media Experiences**: Includes an optimized image and video masonry gallery with interactive lightbox modals using hardware acceleration so scrolling and zooming are smooth.
*   **Predictive Asset Warming**: A custom media-warming engine that uses `img.decode()` and `fetchPriority` to ensure media-heavy gallery interactions are instantaneous.
*   **UX-First Architecture**: Utilizes Next.js **Intercepting & Parallel Routes** for the gallery lightbox, enabling deep-linking into specific media items without losing page context.
*   **Shadow-Routing & URL Syncing**: The gallery implementation uses custom `window.history` synchronization to enable browser history support without triggering expensive Server Component re-renders.
*   **Direct Booking Conversion System**: WhatsApp-first booking flows are embedded throughout the site via sticky mobile booking UI, reusable booking action blocks, direct-booking cards, and booking-channel adapters for Booking.com / Hostelworld fallback.
*   **Social Proof Modules**: Includes custom Booking.com / Hostelworld review presentation, award surfaces, testimonial carousels, and booking credibility components designed specifically for hospitality conversion.
*   **Community & Volunteer Hooks**: Supports feature-flagged operational modules such as volunteer recruitment banners and WhatsApp community promotion with QR-based entry points.
*   **Automated SEO & Schema Engineering**: Built-in dynamic JSON-LD injection (`lib/metadata.ts`) generating `LocalBusiness`, `FAQPage`, and `BreadcrumbList` schemas for superior search engine visibility.
*   **Privacy-First Analytics**: Deeply integrated Umami analytics for cookie-less, GDPR-compliant visitor tracking, fully manageable via environment variables.
*   **Feature-Flagged Instance Architecture**: Instance business content lives in structured JSON files under `instances/[property-name]/content/`, while `lib/site-data.ts` validates, normalizes, and exposes property-specific capabilities like maps, weather, volunteer banners, and regional trail content.



---

## Getting Started Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd scodrinon-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **View the site:**
    Open [http://localhost:3000](http://localhost:3000).

---

## Site Management & Content Editing

This site can be managed in two ways:
*   Through the Decap CMS admin panel at `/admin`
*   Directly through the JSON content files in `instances/[property-name]/content/`

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
},
```

### Developer Notes
*   **Theme tokens** live in `app/globals.css`. Brand colors, semantic text colors, atmosphere/background tokens, selection styling, and shared utilities should be updated there.
*   **Typography utilities** in `app/globals.css` are the source of truth for repeated type patterns (e.g., `heading-section`, `text-card-body`).
*   **Icon names are strict**. JSON-backed icon fields are validated against `lib/icon-registry.ts`. Unknown icon keys fail the build, so ensure new icons are added to `ICON_REGISTRY`.
*   **Feature toggles are instance-driven**. Operational modules like local map rendering, regional weather, volunteer banners, and related experience content are controlled from instance settings rather than hardcoded in page logic.
*   **Instance Syncing**: To sync instance assets to the root public folder for build compatibility, run: `cp -R instances/[property-name]/public/* public/`

---

## Deployment

This project is optimized for **Vercel** or **Netlify**.

1. **Auto-Configuration**: Modern platforms will automatically detect the Next.js project and configure the correct build command (`npm run build`) and publish directory (`.next`).
2. **Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL`: Your live domain (e.g., `https://www.property.com`).
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Required for interactive maps.
   - `ANALYTICS_ID`: (Optional) For tracking.

