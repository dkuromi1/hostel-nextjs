# Admin & Management Guide

This site is built as a reusable hospitality product. Content and configuration are separated into **Product** (reusable logic) and **Instance** (property-specific data).

## Management Workflow

1.  **Dashboard Editing**: Most content can be edited via the Decap CMS at `/admin`.
2.  **Asset Uploads**: Images uploaded through the Decap CMS are stored directly in the root `public/images/` folder and are available immediately at `/images/...`.
3.  **Build & Deploy**: Changes made in the CMS or via Git will automatically trigger a new build on your hosting platform (Vercel/Netlify).

---

## Detailed Guides

### 1. Product Documentation
General guides for the underlying site system, schema definitions, and reusable components.
- [**Admin Guide Template**](./docs/product/admin-guide-template.md): A base guide for any new property deployment.
- [**Product Refactor Map**](./docs/product-refactor-map.md): Technical roadmap for the modular architecture.

### 2. Property Instance Documentation
Specific operating details for the current active deployment.
- [**Scodrinon Admin Guide**](./docs/instances/scodrinon-admin-guide.md): The primary manual for managing the Shkodër property.

---

> [!NOTE]
> Keep root-level documentation focused on the reusable product features. Business-specific operating details (like specific contact names or regional hiking tips) should always live in `docs/instances/`.
