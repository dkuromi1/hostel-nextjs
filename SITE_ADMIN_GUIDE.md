# Scodrinon Website — Admin Guide

This site is built with **Next.js** and integrated with **Decap CMS**. You can update almost all content (text, prices, photos) through a user-friendly visual dashboard without touching any code.

---

## Why This Site Is Unique:

This platform was custom-engineered to move travelers from browsing to booking by using "high-trust" design and unique engagement features. 

*   **Modern Brand Styling:** Uses a professional "Glassmorphic" design style and a slate-midnight palette to signal a high-end, boutique experience.
*   **Speed as a Conversion Tool:** The site is built off the latest React 19 ecosystem to ensure pages load instantly, preventing impatient travelers from leaving.
*   **Custom Gallery Code:** Includes hybrid state-URL synchronization, intercepted modal architecture, predictive asset pipeline, hardware-acceleration, and intelligent history management
*   **Mobile-First Design:** Engineered specifically for the "on-the-go" traveler with touch-optimized swiping and simplified booking flows.

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

If the CMS is unavailable, the site's data is stored in **JSON files** within the `content/` folder. 

### Key Data Files:
| File Name | What it controls |
|-----------|------------------|
| **`settings.json`** | Hostel Name, WhatsApp link, Phone, Address, Volunteer Toggle. |
| **`rooms.json`** | Dorm prices, descriptions, and feature bullets. |
| **`homepage.json`** | Quick facts, amenities, and "Reasons to Extend." |
| **`faq.json`** | All questions and answers. |
| **`testimonials.json`** | Guest reviews and ratings. |
| **`gallery.json`** | Every photo and video in the gallery grid. |

**Important:** If you change the **WhatsApp number**, update **`phoneDisplay`**, **`phoneRaw`**, and **`whatsappUrl`** together. The booking buttons use `whatsappUrl` from this file.
---

## 📸 Managing Photos and Videos

### Using the CMS (Easiest)
When editing a Room or a Gallery item in the dashboard, you will see an **"Upload"** button. 
- Use simple filenames: `rooftop_sunset.jpg` (no spaces).
- JPEG or WebP formats are preferred for speed. 
- Graphics with transparency:** PNG or WebP

### Manual Uploads
If uploading manually via GitHub or FTP:
1. **Images:** Put files in `public/images/`.
2. **Videos:** Put files in `public/videos/`.
3. **Logo:** `public/logo.png`.

---

## 🔍 SEO and Social Sharing

You can update page titles and descriptions directly in the CMS for most sections. For specific page-level SEO defaults (like the "Home" or "Contact" page specific snippets), these are located in:
- `app/page.tsx` (Home)
- `app/rooms/page.tsx` (Rooms)
- `app/experience/page.tsx` (Experiences)

---

## 🚫 What to Avoid Editing
- **`package.json`**, **`next.config.ts`**, **`netlify.toml`**.
- Anything inside the **`components/`**, **`lib/`**, or **`node_modules/`** folders.
- Technical configuration files like **`config.yml`** (this defines how the CMS itself works).

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
