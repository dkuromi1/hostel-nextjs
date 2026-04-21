# Scodrinon Website — Admin Guide

This site is built with **Next.js** and supports two editing paths:
*   **Decap CMS** at `/admin` for dashboard-style editing
*   **Manual JSON editing** in the `content/` folder for technical updates or backup workflows

---

## Why This Site Is Unique:

This platform was custom-engineered to move travelers from browsing to booking by using "high-trust" design and unique engagement features. 

*   **Modern Brand Styling:** Uses a professional "Glassmorphic" design style and a slate-midnight palette to signal a high-end, boutique experience.
*   **Speed as a Conversion Tool:** The site is built off the latest React 19 ecosystem to ensure pages load instantly, preventing impatient travelers from leaving.
*   **Progressive Web App (PWA):** Fully installable on phone home screens (iOS/Android) with offline caching via Service Worker, custom app icons, and an integrated native "Install" button.
*   **Premium Animations:** Powered by Framer Motion for hardware-accelerated, fluid transitions and beautiful scroll reveals.
*   **Custom Gallery Code:** Includes hybrid state-URL synchronization, intercepted modal architecture, touch-optimized swiping, hardware-acceleration, and intelligent history management.
*   **Mobile-First Design:** Engineered specifically for the "on-the-go" traveler with touch-friendly elements and simplified booking flows.

---

## 📍 Location & Map Management

The site's interactive map is powered by Mapbox GL JS and managed in the `components/location-map-inner.tsx` file.

### Mapbox Access Token
You must provide a valid public access token in your `.env.local` file:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```
> [!IMPORTANT]
> To enable the **Satellite View**, ensure your Mapbox account has the "Satellite Streets" style enabled in your dashboard.

### Updating Coordinates
Key map coordinates are defined as follows:
- **HOSTEL_COORDS**: Used for the primary pulsing marker and centripetal anchor (located at the top of `components/location-map-inner.tsx`).
- **BUS_STATION_COORDS**: The primary arrival point label (located at the top of `components/location-map-inner.tsx`).
- **RECOMMENDED_POIS**: A list of objects where you can add/remove local recommendations (Eat, Shop, See) located in `content/pois.json`.

### Custom Visual Layers
The map includes three bespoke visual overlays:
1. **5-Minute Walk Area**: A dashed perimeter automatically generated around the hostel coordinates.
2. **Pedonale Highlight**: A custom LineString that highlights the promenade. To update the path, edit the `PEDONALE_COORDS` array.
3. **3D Buildings**: Automatically applied in 'Streets' view for buildings with height data in Mapbox.

> [!TIP]
> Use [Google Maps](https://maps.google.com) to find new coordinates. Right-click on any spot and copy the latitude/longitude, but remember that Mapbox uses **[Longitude, Latitude]** order (the inverse of Google Maps).

---

## The Primary Method: Using the Admin Dashboard

The easiest way to update the site is through the **Admin Panel**.

### 1. How to Access
1. Go to **`https://www.scodrinon.com/admin`**.
2. Log in with your authorized account (GitHub, Google, or Netlify Identity).

### 2. How to Update Content
1. **Select a Collection**: In the sidebar, choose what you want to edit (e.g., **Rooms**, **FAQs**, **Events**, or **Settings**).
2. **Edit Fields**: Change text, toggle switches (like "Volunteers Needed"), or upload new images.
3. **Save**: Click the **"Save"** (or "Publish") button at the top.
4. **Wait for Build**: Once you save, the site will automatically start a new "build." Your changes will appear live on the website in about **1–3 minutes**.

---

## 🛠 Manual Data Files (Backup/Technical Method)

If the CMS is unavailable, the site's data is stored in **JSON files** within the `content/` folder. The app reads those files through `lib/site-data.ts`, which validates and exports them for the UI.

### Key Data Files:
| File Name | What it controls |
|-----------|------------------|
| **`settings.json`** | Hostel Name, WhatsApp link, Phone, Address, Volunteer Toggle. |
| **`rooms.json`** | Dorm prices, descriptions, and feature bullets. |
| **`homepage.json`** | Quick facts, amenities, and "Reasons to Extend." |
| **`faq.json`** | All questions and answers. |
| **`testimonials.json`** | Guest reviews and ratings. |
| **`gallery.json`** | Every photo and video in the gallery grid. |
| **`pois.json`** | Map markers for recommended places (Eat, Shop, See). |
| **`things-to-do.json`** | Top local attractions showcased on the site. |

**Important:** If you change the **WhatsApp number**, update **`phoneDisplay`**, **`phoneRaw`**, and **`whatsappUrl`** together. The booking buttons use `whatsappUrl` from this file.

### Important for Manual JSON Edits
*   If a content item has an `icon` field, the value must exactly match a key in `lib/icon-registry.ts` such as `Coffee`, `Bike`, `Castle`, or `Snowflake`.
*   Invalid icon names now fail the build on purpose. They no longer silently fall back to a generic icon.
*   Do not edit `lib/site-data.ts` just to change routine business content. Edit the matching JSON file in `content/` unless you are intentionally changing the site’s data model.

### 📝 Special Case: Testimonials (Split-Page Logic)
The site's testimonials are currently split between the **Homepage** and the **Rooms Page** to ensure variety:
- **Homepage:** Displays the **first 5** items from `testimonials.json`.
- **Rooms Page:** Displays the **next 5** items (positions 6 through 10).

When you receive new reviews you like, it is best to add them to the **top** of the list so they appear immediately on the homepage.
---

## 📸 Managing Photos and Videos

### Using the CMS (Easiest)
When editing a Room or a Gallery item in the dashboard, you will see an **"Upload"** button. 
- Use simple filenames: `rooftop_sunset.jpg` (no spaces).
- JPEG or WebP formats are preferred for speed. 
- Graphics with transparency:** PNG or WebP

### Manual Uploads & App Icons
If uploading manually via GitHub or FTP:
1. **Images:** Put files in `public/images/`.
2. **Videos:** Put files in `public/videos/`.
3. **Logo:** `public/logo.webp`.
4. **PWA App Icons:** Update `app/icon.png`, `app/icon-192.png`, `app/apple-icon.png`, `public/icon.png`, `public/icon-192.png`, `public/apple-icon.png`, and `app/favicon.ico` to change the app icons.
5. **App Details (PWA Manifest):** The `public/site.webmanifest` file controls the app's installed name, background colors, and display mode.

---

## 🔍 SEO and Social Sharing

You can update page titles and descriptions directly in the CMS for most sections. For specific page-level SEO defaults (like the "Home" or "Contact" page specific snippets), these are located in:
- `app/page.tsx` (Home)
- `app/rooms/page.tsx` (Rooms)
- `app/experiences/page.tsx` (Experiences)

---

## 🚫 What to Avoid Editing
- **`package.json`**, **`next.config.ts`**, **`netlify.toml`**.
- Anything inside the **`components/`** or **`node_modules/`** folders unless you are making a deliberate code change.
- Avoid editing **`lib/`** for routine content updates. That folder now contains typed adapter and validation code, not day-to-day business copy.
- Technical configuration files like **`config.yml`** (this defines how the CMS itself works).

### Developer-Only Design Notes
If you are making code changes rather than content edits:
*   Theme variables and shared typography utilities live in `app/globals.css`.
*   Repeated heading/body styles should use those utilities instead of hand-rolled Tailwind class stacks.
*   Registry-backed icons should be added to `lib/icon-registry.ts` and then referenced by name from content or typed config.

---

## Quick Reference — Admin Workflow

| Task | Where in Dashboard |
|------|--------------------|
| Toggle "Volunteers Needed" | **Settings** → Site Configuration (top toggle) |
| Change Dorm Prices | **Rooms** → Select Room Type |
| Update WhatsApp / Phone | **Settings** → Site Configuration |
| Add a Guest Review | **Testimonials** → Add New |
| Add a Gallery Photo | **Gallery** → Add New |
| Update FAQ | **FAQs** → Edit FAQ Content |

**Note:** Always check the **"Status"** of your build in your hosting dashboard (Vercel/Netlify) if your changes don't appear after 5 minutes.
