# aurasea-ai

The Aurasea corporate website at aurasea.ai. Bilingual: Thai (default) and English.

Audience: investors, partners, journalists, recruits.

This is the parent company site. Product marketing sites (auraseaos.com, ratedesk.ai, menudesk.ai) are separate.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next-intl for i18n (Thai at `/`, English at `/en/`)
- next/font for Inter (latin) + IBM Plex Sans Thai (thai)
- Vercel deployment ready

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000 (Thai default) or http://localhost:3000/en for English.

## Folder layout

```
app/
  layout.tsx              # Root passthrough
  globals.css
  [locale]/
    layout.tsx            # Locale-aware layout (html, body, fonts, intl provider)
    page.tsx              # Homepage
    about/                # /about, /en/about
    products/
    partners/
    press/
    careers/
    contact/
    legal/privacy/
    legal/terms/
components/               # Reusable UI components
messages/
  th.json                 # Thai content
  en.json                 # English content
public/                   # Static assets (logo.svg, favicon, robots.txt)
design/                   # Site-specific design files (kept for designer drafts)
i18n.ts                   # next-intl request config
middleware.ts             # Locale routing
tailwind.config.ts        # Brand theme
```

## Brand

Colors and typography are defined in `tailwind.config.ts`. The `Logo` component renders a typography-based wordmark — replace with the designed logo when delivered.

## Hosting

Vercel. Build-time static export supported; default is server-rendered with `output` left unset.

## Git

This folder is intentionally not initialized as its own git repo — it lives inside the parent Aurasea worktree.
