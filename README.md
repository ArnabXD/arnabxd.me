# arnabxd.me

Personal site + blog for Arnab Paryali. Astro 6 · Tailwind v4 · MDX · Cloudflare Pages.

Aesthetic: **"Signal Observatory"** — deep midnight-teal dark theme with phosphor-cyan accents, dense readouts, generous negative space.

## Stack

| Layer          | Choice                                                      |
| -------------- | ----------------------------------------------------------- |
| Framework      | [Astro 6](https://astro.build) (static, Cloudflare adapter) |
| Styling        | Tailwind v4 (`@theme` tokens) + `@tailwindcss/typography`   |
| Content        | MDX via `astro:content` collections                         |
| Syntax hl.     | Shiki — `poimandres` theme                                  |
| Interactivity  | React 19 islands (contact form, view counter)               |
| Deploy target  | Cloudflare Pages (Workers adapter, KV, secrets)             |
| Fonts          | Geist Mono + Fraunces (Google Fonts)                        |
| Lint / format  | Biome                                                       |

## Project structure

```
├── data.json               ← static site data (profile, projects, skills, contact)
├── src/
│   ├── content.config.ts   ← blog collection schema
│   ├── content/blog/       ← MDX posts (one per file; id == slug)
│   ├── data.ts             ← typed loader for data.json
│   ├── types.ts            ← SiteData / Experience / Project / SkillGroup / ...
│   ├── env.d.ts            ← Cloudflare runtime bindings (Env types)
│   ├── global.css          ← design tokens, base styles, prose-terminal
│   ├── layouts/Base.astro  ← head/meta/OG + page chrome
│   ├── components/         ← section + shared components (.astro + .tsx islands)
│   │   ├── mdx/            ← components exposed to MDX (e.g. Callout)
│   │   ├── ContactForm.tsx ← react island, posts to /api/contact
│   │   └── ViewCounter.tsx ← react island, posts to /api/views
│   └── pages/
│       ├── index.astro
│       ├── blog/
│       │   ├── index.astro
│       │   └── [...slug].astro
│       └── api/
│           ├── contact.ts  ← SSR, proxies to Telegram
│           └── views.ts    ← SSR, increments/reads KV counter
└── wrangler.jsonc          ← Cloudflare bindings (KV, vars)
```

## Commands

| Command               | Action                                  |
| --------------------- | --------------------------------------- |
| `pnpm install`        | Install dependencies                    |
| `pnpm dev`            | Start dev server (`localhost:4321`)     |
| `pnpm build`          | Build for production (`./dist/`)        |
| `pnpm preview`        | Preview the production build locally    |
| `pnpm generate-types` | Run `wrangler types` after config edits |
| `pnpm astro ...`      | Any Astro CLI command                   |

## Authoring posts

Drop a new `.mdx` (or `.md`) file into `src/content/blog/`. The filename (without extension) becomes the slug.

Frontmatter schema (enforced by `src/content.config.ts`):

```mdx
---
title: "Your post title"
description: "One-liner for listings, meta description, and OG card."
pubDate: 2026-04-25
updatedDate: 2026-04-26         # optional
tags: ["astro", "mdx"]          # optional
draft: false                    # optional — drafts excluded from builds
cover: ./cover.jpg              # optional — optimized by Astro
coverAlt: "Alt text"            # optional
---

Body content — plain markdown **and** MDX components.

import Callout from "~/components/mdx/Callout.astro";

<Callout tone="cyan" label="NOTE">
  MDX components are first-class here.
</Callout>
```

See `src/content/blog/hello-world.mdx` for a kitchen-sink syntax demo.

## Cloudflare setup (first time)

1. **Create the KV namespace for view counts** (one-time per env):

   ```sh
   npx wrangler kv namespace create VIEWS
   # paste the returned id into wrangler.jsonc -> kv_namespaces[0].id
   ```

2. **Add Telegram secrets** (for `/api/contact`):

   ```sh
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   ```

3. **Regenerate Cloudflare types** whenever bindings change:

   ```sh
   pnpm generate-types
   ```

4. **Deploy** via Cloudflare Pages (Git integration) or manually:

   ```sh
   pnpm build && npx wrangler deploy
   ```

## Local dev notes

- `/api/*` routes are **SSR only** (`export const prerender = false`). Everything else is prerendered.
- `pnpm dev` does not evaluate Cloudflare bindings — contact form + view counter return `503` locally unless you run against the built worker (`pnpm build && pnpm preview` or `wrangler dev`).
- Changes to `data.json` are type-checked via `src/types.ts`.
