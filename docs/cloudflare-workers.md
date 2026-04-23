# Cloudflare Workers Deployment

This project can deploy to Cloudflare without changing the existing Netlify or Vercel flow.

## Existing Platforms

- Netlify and Vercel continue using `npm run build`.
- Cloudflare uses the OpenNext adapter through separate `cf:*` scripts.

## Required Commands

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build for Cloudflare:
   ```bash
   npm run cf:build
   ```
3. Preview locally in the Workers runtime:
   ```bash
   npm run cf:preview
   ```
4. Deploy to Cloudflare:
   ```bash
   npm run cf:deploy
   ```

## Required Setup

- Authenticate Wrangler with `npx wrangler login` if needed.
- Set Cloudflare secrets and variables before deploying.
- Add a Worker name to `wrangler.jsonc` before the first deployment.

## Notes

- `wrangler.jsonc` intentionally does not set a `name` yet, so this file can be committed safely before choosing the Cloudflare project name.
- The current Netlify-specific `netlify.toml` remains unchanged.
- The current Next.js `build` script remains unchanged.
