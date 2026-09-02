# How this website is built

USA Wire Form is a Next.js 16 App Router site. Two products share one deploy:

1. **This floor** — Northeast Ohio shop. Instant quote, production quote, catalog, processes.
2. **Source** — marketplace. Shops file cells. Buyers send prints. The desk is the gate. See [SOURCE.md](./SOURCE.md).

## Stack

- Next.js 16 App Router (`src/app`), TypeScript, Tailwind 4
- Clerk for buyer and shop accounts (`src/proxy.ts` protects `/source/*` dashboards and `/buyer/*`)
- Admin desk is a cookie + `ADMIN_LEADS_PASSWORD`, not Clerk (`/admin/*`)
- Vercel Blob (private) for jobs, drawings, shop profiles, visitor log
- Resend for outbound mail
- Stripe for shop lead unlocks (AI Smart Connect™, $49)
- AI Gateway (`openai/gpt-5.4-mini`) for Ask the resource and job-spec parse — not a custom trained model
- GA4 `G-2J3FGMRF7E` in `src/app/layout.tsx`. First-party visitor log: `/admin/visitors`

## Folder map

```
src/app/            routes (page.tsx) and Server Actions
  actions/          quote, source, careers
  admin/            desk (password)
  buyer/            buyer dashboard
  source/           Source public + shop dashboards
  api/              cron, stripe webhook, ask, recent-cells
src/components/     UI (forms, header, Source widgets)
src/lib/            data + rules (matching, mail, catalog, directory)
docs/               this folder — operating memory for humans and agents
```

Catalog, directory, processes, and SEO landers live in `src/lib/*.ts` and `src/lib/seo/pages.ts`. Do not invent shop capacity or machines that were not filed.

## Auth split

| Who | How they get in | Land |
| --- | --- | --- |
| Buyer | Clerk `/sign-up?as=buyer` | `/buyer/dashboard` then `/source` |
| Shop | Clerk `/sign-up?as=supplier` | NDA → `/source/dashboard` |
| Desk | `/admin` password | Accounts, visitors, quote files, architecture |

After Clerk login, `/source/enter` splits buyer vs shop. Do not send buyers to shop fees.

## Data (Blob prefixes)

Private JSON and files, not a SQL database.

- `source/jobs/` — buyer RFQs + drawing files
- `source/profiles/` — shop listings, NDA, fullness slider
- `source/buyers/` — buyer accounts (`verifiedAt` = desk validated)
- `source/filings/` — machine cells
- `source/capacity-mail/` — 1st/15th reminder idempotency
- `leads/` — directory intros, quote submissions
- Visitor hits — `/admin/visitors`

## Mail

Resend. Desk copies go to `info@usawireform.com` and `LEADS_NOTIFY_EMAIL` (default `rberkes@gmail.com`). A STEP is never attached to email. Shops that bought a lead open a released file in the dashboard only.

Daily cron `0 14 * * *` → `/api/cron/source-reminders` (`CRON_SECRET`): incomplete-shop reminders, plus plant-fullness mail on the 1st and 15th Eastern.

## Deploy

- Production: Vercel project from **GitHub** `rberkes/usawireform` (`main`)
- Cursor remote `origin` is a backup, not the Vercel source
- Env: Clerk, Blob, Resend, Stripe, `ADMIN_LEADS_PASSWORD`, `CRON_SECRET`, `NEXT_PUBLIC_GA_ID`

## Conventions

- Server Actions in `src/app/actions/` for forms
- Matching and money rules in `src/lib`, not in the page
- Ask-the-resource facts: `src/lib/ask-prompt.ts` — keep it aligned with live behavior
- Next.js 16 APIs differ from older training data; check `node_modules/next/dist/docs/` before new routing or cache code
