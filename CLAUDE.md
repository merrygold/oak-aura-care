# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js version warning

This project uses **Next.js 16** (React 19), which has breaking API changes from older versions. Before writing any Next.js-specific code, read the relevant guide at `node_modules/next/dist/docs/` — especially `01-app/` for App Router APIs. The `AGENTS.md` file at the repo root is maintained automatically by `next dev`; do not remove it.

## Commands

```bash
npm run dev      # start dev server (uses Turbopack)
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint
```

There is no test suite.

## Architecture

**Oak & Aura Care** is a marketing site for an NDIS disability care provider, built with Next.js App Router (all Server Components by default).

### Data layer

`src/lib/data.ts` is the single source of truth for all site content: navigation links, contact details, services, stats, testimonials, FAQs, and shared button style utilities (`buttonBase`, `buttonVariants`). No database or CMS — update content here.

### Pages

Each route in `src/app/` maps to a public page:

| Route | Description |
|---|---|
| `/` | Homepage with hero video, stats, services overview, testimonials, FAQs |
| `/services` | Service listing grid |
| `/services/[slug]` | Individual service detail — slug comes from `SERVICES` array in `data.ts` |
| `/about` | About / team page |
| `/activities` | Activities page |
| `/transitions` | Hospital & aged care transitions page |
| `/careers`, `/vacancies` | Careers and SIL vacancies |
| `/contact` | Contact page with `EnquiryForm` |

### Components

- **`Header` / `Footer`** — site-wide nav and footer; pull contact data from `data.ts`
- **`sections.tsx`** — shared section building blocks (`CtaSection`, `CheckList`, `StatsBand`, `TestimonialCard`, etc.) reused across pages
- **`EnquiryForm`** — `"use client"` form component on the contact page
- **`FaqAccordion`** — `"use client"` accordion for FAQs
- **`RevealScript`** — `"use client"` IntersectionObserver that adds `is-visible` to `[data-reveal]` elements for scroll-reveal animations

### Styling

- **Tailwind CSS v4** via `@tailwindcss/turbopack` — no `tailwind.config` file; tokens are defined in `globals.css` using CSS `@theme inline` and `:root` custom properties.
- **Design tokens**: `oklch`-based color palette (`--primary` purple, `--accent` green leaf, `--sun` gold), two radius scales, two font families.
- **Custom utilities** defined with `@utility` in `globals.css`: `eyebrow` (small caps label style), `glass-nav` (header glassmorphism), `glass-panel` (card glassmorphism), `reveal` (entrance animation).
- **Scroll reveal**: apply `data-reveal` attribute to any element; `RevealScript` handles the IntersectionObserver. Use `data-reveal-delay="<ms>"` for staggered animations.
- **Fonts**: `Sora` (headings, `font-heading`) and `Manrope` (body, `font-body`) loaded via `next/font/google`.
- **Background**: fixed radial gradients (gold top-right, green bottom-left) set on `body` in `globals.css` — do not override with page-level backgrounds.

### Images

Static images live in `public/images/` as `.webp` files. Use `next/image` with explicit `width`/`height` or `fill` prop. Images that appear above the fold should have `priority`.
