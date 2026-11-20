# Umri Dessert

A Next.js website for Umri Dessert in Betel, Addis Ababa. The homepage opens with a five-chapter dessert film, followed by a second pinned sequence, an editorial lookbook and visit information. Explore, Gallery, About and Visit have dedicated routes.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview, run `npm run build` followed by `npm start`.

## Project structure

- `components/hero/ScrollSequence.tsx` contains the master GSAP timeline. `motion-config.ts` defines chapter boundaries, header cues and viewport-specific motion settings.
- `components/home/HomeMotion.tsx` coordinates the in-flow reveals, Sweet Journey and horizontal lookbook. `lib/motion.ts` holds shared motion settings and the device capability check.
- `lib/content.ts` holds shop details, image provenance, navigation links and the future menu type.
- Explore shows a menu and category navigation when `menuEntries` contains owner-verified products.
- [Asset sources](docs/ASSET_SOURCES.md) documents the originals and WebP derivatives. Run `npm run images:optimize` to regenerate the local WebP files.
- [Business facts](docs/BUSINESS_FACTS.md) records the supplied listing details and research results.

Run `npm run lint`, `npm run typecheck` and `npm run build` to check changes.
