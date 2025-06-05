# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn typecheck` - Run TypeScript type checking and React Router type generation
- `yarn typegen` - Generate Cloudflare bindings types from wrangler.toml
- `yarn start` - Preview production build locally using Wrangler
- `yarn deploy` - Build and deploy to Cloudflare Pages
- `yarn preview` - Build and start local preview

## Architecture Overview

This is a personal portfolio website built with React Router v7 and deployed on Cloudflare Pages.

### Tech Stack
- **Framework**: React Router v7 (migrated from Remix)
- **Styling**: Tailwind CSS v4 with custom terminal/matrix theme
- **Deployment**: Cloudflare Pages with Wrangler
- **Language**: TypeScript with Zod validation
- **Package Manager**: Yarn

### Key Architecture Patterns

**Single-Page Portfolio**: The main route (`app/routes/_index.tsx`) renders all portfolio sections as a single scrolling page with matrix-themed design.

**Data Management**: Static portfolio data is centralized in `app/data.tsx`. External data (blog posts) is fetched via loaders from Hashnode GraphQL API.

**Contact Form**: Uses Telegram Bot API for form submissions. Contact schema validation with Zod in `app/services/telegram.ts`.

**Component Structure**: All UI components are in `app/components/` with consistent terminal styling. Matrix rain background effect and easter eggs provide interactive elements.

**Cloudflare Integration**: 
- Server-side rendering with Cloudflare Pages Functions
- Type generation from `wrangler.toml` for environment bindings
- Build output targets `./build/client` for Pages deployment

### Development Notes

**Type Safety**: Always run `yarn typecheck` before commits. React Router types are auto-generated.

**Cloudflare Bindings**: After modifying `wrangler.toml`, run `yarn typegen` to update TypeScript definitions.

**Contact Form Testing**: Contact form requires Telegram bot configuration in Cloudflare environment variables.