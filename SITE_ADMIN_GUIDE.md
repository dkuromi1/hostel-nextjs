# Scodrinon website — admin guide (non-technical)

This site is a **Next.js** project: there is **no WordPress-style admin panel**. Most business-wide details live in **one data file**; photos and videos live in **folders**. After changes, someone with access runs a **build and deploy** (often automatic when code is pushed to GitHub).

If you are not comfortable editing text files, **send updates to whoever maintains the site** and point them to the sections below.

---

## 1. Before you change anything

- **Keep a copy** of the file you edit (or work in a copy of the project) so you can undo mistakes.
- **Punctuation matters**: straight quotes `"like this"` are normal; do not delete commas between list items or the site may fail to build.
- **Filenames for images**: use simple names, e.g. `rooftop_summer_2026.jpg` (no spaces; lowercase is easiest).

---

## 2. Business info, links, and booking buttons (main place)

**File:** `lib/site-data.ts`

Edit the `siteConfig` object at the top. This drives **WhatsApp**, **Booking.com**, **Hostelworld**, **Instagram**, address text, breakfast hours, and default SEO keywords.

| Field | What it controls |
|--------|------------------|
| `name`, `shortName`, `tagline`, `description` | How the hostel is named and described in many places |
| `location` | Address line as shown on the site |
| `phoneDisplay` | Human-readable phone (e.g. `+355 67 677 7117`) |
| `phoneRaw` | Digits only, no `+` (used where the code needs a plain number) |
| `whatsappUrl` | Full WhatsApp link; if the number changes, this **must** be updated (ask your web person or use a “wa.me” link generator) |
| `bookingUrl`, `hostelworldUrl`, `instagramUrl` | Buttons and footer links |
| `breakfastHours` | Breakfast time text |
| `baseKeywords` | Default SEO keyword list (used with page metadata) |

**Important:** If you change the **WhatsApp number**, update **`phoneDisplay`**, **`phoneRaw`**, and **`whatsappUrl`** together. The booking buttons use `whatsappUrl` from this file.

---

## 3. Lists that appear across the site (same file)

Still in **`lib/site-data.ts`**:

- **`navLinks`** — Top menu labels and page order (only change if you know what you are doing; wrong paths break links).
- **`heroHighlights`** — Short bullets on the home hero.
- **`quickFacts`** — Quick fact lines (home and elsewhere).
- **`roomTypes`** — Room names, descriptions, bullet lists, and **which photo** each room uses (`image` + `alt`).
- **`sharedAmenities`**, **`freeServices`**, **`paidServices`** — Amenity and service lists.
- **`extendReasons`** — “Why stay longer” style blocks (title + paragraph each).
- **`experiencePillars`** — Experiences section cards (text + image path + alt).
- **`eventCards`** — Home page event tiles (title, description, image, alt).  
  - To **hide** an event: put `//` at the start of each line of that block (see the commented “Walking Tours” example in the file).  
  - To **show** it again: remove those `//` lines.
- **`galleryItems`** — **Gallery grid** and the **first five items** also appear on the home page preview. Order in this list = order on the site.
- **`faqItems`** — FAQ questions and answers (home page).
- **`contactChecklist`** — Bullet list on the contact page.

---

## 4. Photos and videos

### Where files go

- **Images:** `public/images/`  
- **Videos:** `public/videos/`  
- **Logo:** `public/logo.png` (used in the header)

### Formats (simple rule)

- **Photos:** JPEG or WebP is best.
- **Graphics with transparency:** PNG or WebP.
- **Avoid** enormous files; web-sized photos (roughly 1600–2400 px on the longest side) are enough.

### Adding a gallery photo

1. Upload the file into `public/images/`.
2. Open `lib/site-data.ts` and find **`galleryItems`**.
3. Add a new block like this (copy an existing image block and change values):

```ts
{
  type: "image",
  src: "/images/your_filename.jpg",
  alt: "Short description of the photo for accessibility and SEO",
  className: "md:col-span-4",
  aspect: "aspect-[4/5]",
},
```

- **`src`** must start with `/images/` and match the filename exactly.
- **`alt`** should describe what is in the picture (honest, plain English).
- **`className`** / **`aspect`** control width in the grid and crop shape — copy from a similar tile first; ask your web person if the layout looks wrong.

### Replacing an existing photo

1. Add the new file to `public/images/` (or overwrite the old file **keeping the same filename**).
2. If the filename changed, update every `src` or `image` path that pointed to the old name (search the project for the old filename).

### Home page “gallery preview”

The home page shows only the **first five** entries in **`galleryItems`**. Put the photos you want there at the **top** of that list, or reorder the list.

### Videos in the gallery

Use a block with `type: "video"` and `src: "/videos/yourfile.mp4"`. Keep files **small** where possible (compressed MP4) so the site stays fast on phones.

### One-off images on a specific page

Some images are only referenced inside **`app/page.tsx`**, **`app/gallery/page.tsx`**, **`app/rooms/page.tsx`**, **`app/experiences/page.tsx`**, or **`app/contact/page.tsx`**. If something does not appear in `site-data.ts`, search those files for `/images/` to find it.

---

## 5. SEO and social sharing (titles, descriptions, preview image)

### Per-page title and description

Each main page file exports metadata near the top, for example:

- `app/page.tsx` — Home  
- `app/rooms/page.tsx` — Rooms  
- `app/experiences/page.tsx` — Experiences  
- `app/gallery/page.tsx` — Gallery  
- `app/contact/page.tsx` — Contact  

Look for `export const metadata = buildMetadata({ ... })`. You can change:

- **`title`** — Browser tab / search title  
- **`description`** — Short summary for Google and social shares  
- **`image`** — Which image appears when the **link is shared** (path like `/images/promo_2.png`)

### Site-wide defaults

- **`app/layout.tsx`** — Default site title pattern and main Open Graph image for the root URL. If you change the **default share image** for the whole site, your web person should update **`openGraph.images`** there as well as **`siteConfig`** if needed.

### Live URL for SEO (important on the real domain)

The site uses an environment variable **`NEXT_PUBLIC_SITE_URL`** (e.g. `https://www.yourdomain.com`). It should match the **public website address**. This is usually set in the hosting dashboard (Netlify, Vercel, etc.), not inside the repo. If it is wrong, shared links and some SEO tags may point to the wrong URL.

---

## 6. What to avoid editing without a developer

- **`package.json`**, **`next.config.ts`**, **`tsconfig.json`**
- Anything under **`node_modules`**
- Random **`import`** lines at the tops of files — removing them breaks the build
- **`components/`** and other files under **`lib/`** except the main content file **`lib/site-data.ts`**

---

## 7. After you save changes

The live website only updates after a **deploy**:

1. Changes are saved and sent to the project repository (e.g. GitHub), **or** the host is given a new build.
2. Hosting runs **`npm run build`** (or the host’s equivalent) and publishes the result.

Your web person or agency will know the exact steps for your hosting.

---

## Quick reference — files managers use most

| Task | Where |
|------|--------|
| Phone, WhatsApp, Booking, Hostelworld, Instagram, address, breakfast | `lib/site-data.ts` → `siteConfig` |
| FAQ, gallery order, room copy, events, services lists | `lib/site-data.ts` → named lists |
| New/replace image files | `public/images/` (and `public/videos/` for video) |
| Page title / Google snippet / share image for one page | `app/<page>/page.tsx` → `buildMetadata({ ... })` |
| Default site title / root share image | `app/layout.tsx` |

If something is unclear, note the **page name** (Home, Gallery, etc.) and what you wanted to change, and pass it to whoever deploys the site.
