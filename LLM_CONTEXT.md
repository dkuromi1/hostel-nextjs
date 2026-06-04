# Deep Dive LLM Context: Scodrinon Next.js (Product vs. Instance Architecture)

This document is the ultimate architectural guide for LLMs working on this Next.js 16 / React 19 codebase. It details not just the file structure, but the deep internal APIs, performance hacks, CSS architecture, and strict runtime/build-time safety constraints.

---

## 1. The Instance Architecture Internals

The application strictly separates reusable UI (Product) from property-specific data (Instance).

### Build-Time Instance Resolution & Validation
1. **Resolution (`instances/index.ts`)**: The active instance is resolved strictly by checking `process.env.INSTANCE_ID` (and fallback variants). It dynamically exports `activeInstance`.
2. **Validation (`scripts/validate-instance.js`)**: Before any build or asset sync, the normalizer strictly checks that the active instance's JSON schema is correct, that all required fields are present, and that referenced images actually exist in `instances/[id]/public/`.
3. **Asset Isolation (`scripts/prebuild.js`)**: During `npm run build`, a prebuild script recursively copies `instances/[id]/public/` into the Next.js root `public/` directory. Vercel/Cloudflare serve these isolated assets seamlessly.

### Data Normalization (`lib/data-normalizer.ts`)
- **JSON to UI**: Components NEVER import `instances/*.json` directly. They import from `lib/site-data.ts`. 
- **Type Casting & Fallbacks**: The normalizer provides deep null-checks and sensible defaults (e.g., if a feature flag is missing, it falls back to a safe default). If you introduce a new feature flag in `settings.json`, you must wire it through `lib/data-normalizer.ts` into `PropertyConfig` (found in `lib/types/site.ts`).

---

## 2. Advanced Performance & UX Heuristics

### 2.1 The Bootstrap Scripts (`app/layout.tsx`)
To prevent FOUC (Flash of Unstyled Content) and hydration mismatches, `layout.tsx` uses raw string inline scripts (`themeBootstrapScript` and `performanceBootstrapScript`) placed in `<head>`. 
- **Low-End Device Detection**: The script checks `navigator.hardwareConcurrency <= 4`, `navigator.deviceMemory <= 4`, OS versions via userAgent, and `WebGL2RenderingContext`. If it flags a low-end device, it adds the `.low-end-device` class to `<html>`.
- **CSS Degration (`globals.css`)**: `.low-end-device * { backdrop-filter: none !important; }` forcibly removes expensive glassmorphism effects.

### 2.2 Mapbox GPU-Safety
Interactive Maps (Mapbox GL JS) are notorious for crashing low-end iOS devices. Our Mapbox implementation conditionally strips 3D extrusions and reduces terrain complexity if `isLowEndDevice()` returns true.

### 2.3 Fluid Typography & Utility Classes (`app/globals.css`)
We use Tailwind v4 `@utility` directives extensively to map semantic design tokens. 
- **Never use hardcoded Tailwind scales** for typography or spacing.
- **Typography utilities**: Use `@apply heading-hero`, `heading-page`, `heading-section`, `text-card-body`.
- **Spacing utilities**: Use `@apply p-card`, `p-card-premium`, `px-card` instead of `p-6` or `p-8`.
- **Visual Styles**: Use `@apply glass-panel`, `media-frame`, or `section-muted` for background styling. We do **not** use `rounded-*` utility classes unless making a pill button; the site has a strict "sharp" (0px radius) editorial aesthetic.

---

## 3. Advanced React & Next.js Patterns

### 3.1 Intercepting & Parallel Routes for the Gallery
The media gallery is a masterclass in UX routing.
- The gallery grid lives in `app/gallery/page.tsx`.
- We use the Next.js `@modal` slot (`app/@modal/(.)gallery/[id]/page.tsx`) to intercept clicks.
- The user gets a smooth client-side transition to a hardware-accelerated lightbox.
- Shadow-routing pushes history state (`?poi=...` or `/gallery/item-123`) so users can share deep-links to specific photos, and "Back" closes the modal instantly without triggering a Server Component waterfall.

### 3.2 Dynamic JSON-LD & SEO (`lib/metadata.ts`)
We programmatically generate JSON-LD schema (`LocalBusiness`, `FAQPage`, `BreadcrumbList`) derived entirely from `siteConfig`.
- Time parsing dynamically converts strings like "2pm" into "14:00:00" for strict schema.org compliance.
- Metadata automatically resolves canonical URLs across Vercel, Netlify, and Cloudflare Pages environments using fallback ENV vars.

### 3.3 The Strict Icon Registry (`lib/icon-registry.ts`)
Instance editors pass icons via JSON strings (e.g., `{"icon": "waves"}`). 
- **CRITICAL:** `lib/data-normalizer.ts` validates these strings against `lib/icon-registry.ts`.
- If you need a new Lucide icon for the UI, you MUST add it to the `ICON_REGISTRY` mapping object. Without it, the icon will silently fail or break the build.

---

## 4. LLM Coding Rules 

1. **Do Not Hardcode Data**: Ever. Read from `lib/site-data.ts`.
2. **Do Not Hardcode Colors/Radii**: Use semantic CSS variables (`bg-background`, `text-body-subtle`) defined in `app/globals.css`.
3. **Respect Feature Flags**: Do not inject a UI component if its corresponding boolean (e.g., `showRegionalWeather`, `showMascot`) in `siteConfig` is false.
4. **Assume React 19 Strict Mode**: Use `use` for promises/context. Default to Server Components. Only use `"use client"` when state or event listeners are fundamentally required.
5. **Check Validations**: If you instruct a human to edit a JSON file, tell them to run `npm run validate-instance` immediately after.
