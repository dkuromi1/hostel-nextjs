# Scodrinon Hostel Website

The repository for the Scodrinon Hostel website. This project is a modern, performant web application built for a boutique hostel in Shkodër, Albania.

The site is fully optimized for speed, SEO, and direct bookings via WhatsApp, providing a simple and seamless user experience for travelers planning their Albanian itineraries.

## Main Features

*   **Extremely Fast Stack**: Built with Next.js 16 (Server Components, advanced routing) and React 19 to deliver incredibly fast, static, and dynamically optimized pages.
*   **Modern Aesthetics & Responsive Design**: Styled with Tailwind CSS v4 and UI components from Radix UI and shadcn using Glassmorphism & 'Bento Box' styled UI. Designed to look and perform well on mobile screens, where most travelers book.
*   **Centralized Content Management**: No complex CMS administration. All site data (room pricing, faqs, images, booking links) lives directly in a single configuration file (`lib/site-data.ts`).
*   **Rich Media Experiences**: Includes an optimized image and video masonry gallery with interactive lightbox modals using hardware acceleration so scrolling and zooming are smooth.
*   **Automated Structured Data (SEO)**: Built-in dynamic JSON-LD injection (`lib/metadata.ts`) representing business details and FAQ schemas to Google search crawlers for better rich snippet visibility.

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

