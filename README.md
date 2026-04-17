# Scodrinon Hostel Website

The repository for the Scodrinon Hostel website. This project is a modern, performant web application built for a boutique hostel in Shkodër, Albania.

The site is fully optimized for speed, SEO, and direct bookings via WhatsApp, providing a simple and seamless user experience for travelers planning their Albanian itineraries.

## Main Features

This project is engineered beyond typical static hospitality sites, using advanced React patterns and a cutting-edge stack:

*   **Next.js 16 & React 19 Engine**: Running on the latest versions of the React ecosystem for peak rendering performance and future-ready architecture.
*   **Tailwind CSS 4.0 & Radix UI**: Utilizing the next-gen styling engine for ultra-fast, zero-runtime CSS and headless components.
*   **Framer Motion**: Powering fluid, hardware-accelerated animations, beautiful scroll reveals, and elegant layout transitions across the interface to deliver a premium user experience.
*   **Mapbox GL JS**: Cinematic, interactive maps with 3D extrusions and satellite switching for an immersive location experience.
*   **Boutique Location Experience**: Features a custom-integrated map interface including satellite view, 3D building extrusions for urban orientation, and curated local recommendations (Eat, Shop, See, Transit).
*   **Fluid Glassmorphism**: A comprehensive design system built on high-fidelity `backdrop-blur` effects and dynamic Z-index layering. 'Bento Box' styled UI designed to look and perform well on mobile screens, where most travelers book.
*   **Rich Media Experiences**: Includes an optimized image and video masonry gallery with interactive lightbox modals using hardware acceleration so scrolling and zooming are smooth.
*   **Shadow-Routing & URL Syncing**: The gallery implementation uses custom `window.history` synchronization to enable deep-linking and browser history support without triggering expensive Server Component re-renders.
*   **Predictive Asset Prefetching**: Custom pre-fetching logic that anticipates user navigation in media-heavy views, resulting in an "instant-load" experience.
*   **Automated Structured Data (SEO)**: Built-in dynamic JSON-LD injection (`lib/metadata.ts`) representing business details and FAQ schemas to Google search crawlers for better rich snippet visibility.
*   **Centralized Content Management**: No complex CMS administration. All site data (room pricing, faqs, images, booking links) lives directly in a single configuration file (`lib/site-data.ts`).

---

## Getting Started Locally

If you want to run the project on your local machine for development:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd scodrinon-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev / pnpm dev
    ```

4.  **View the site:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit files under `app/`.

---

## Site Management & Content Editing

This site does **not** use a traditional admin dashboard (like WordPress). Instead, all essential business details and content are managed through secure text configurations.

**For managers or non-technical admins looking to update the website:**
Please refer to the comprehensive **[`SITE_ADMIN_GUIDE.md`](./SITE_ADMIN_GUIDE.md)** included in this repository.

The guide will walk you through, step-by-step, exactly how to edit:
*   Prices and room details
*   Contact info, Instagram, and WhatsApp numbers
*   Gallery photos and videos
*   Frequently asked questions (FAQs) and events

### Quick Dev Note for Content
All text configurations are located in `lib/site-data.ts`. 
To add photos and videos to the gallery, place them in `public/images/` and `public/videos/` and update the `galleryItems` array in `lib/site-data.ts`. Note that the home page gallery uses the first 12 items defined in this list.

**Gallery Item Format:**
```ts
{
  id: "breakfast-served",
  type: "image",
  src: "/images/breakfast.jpg",
  alt: "Breakfast served at Scodrinon Hostel",
  aspect: "aspect-[4/5]",
},
```

---

## Deployment

This project requires zero extra configuration to launch on modern hosting platforms like **Vercel** or **Netlify**. It uses default Next.js build caching to output heavily optimized static resources immediately.

To deploy the application:

1. **Connect your repository**: Link your GitHub repo to your chosen hosting provider (Vercel and Netlify are recommended).
2. **Auto-Configuration**: The platform will automatically detect the Next.js project and configure the correct build command (`npm run build`) and publish directory (`.next`).
3. **Set the Production URL**: Essential for SEO and social sharing. In your platform's **Environment Variables** settings, add:
   - `NEXT_PUBLIC_SITE_URL`: Your live domain (e.g., `https://www.scodrinon.com`).
4. **Deploy**: Every push to the `main` branch will automatically trigger a rebuild and deployment.

