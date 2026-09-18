# Sale readiness — directory buyer

Snapshot of the live site and codebase as of 18 Sep 2026. Use this as the
operating list if the goal is to sell **usawireform.com** (the directory +
Source engine) to another directory company.

Related: [ARCHITECTURE.md](./ARCHITECTURE.md) (how it is built),
[SOURCE.md](./SOURCE.md) (how Source is supposed to work),
[STRATEGY.md](./STRATEGY.md) (why wire forming first),
[DIRECTORY.md](./DIRECTORY.md) (the 539-shop list),
[ANALYTICS.md](./ANALYTICS.md) (what GA actually counts).

---

## Do this first

1. **Pick the package** (A / B / C below). A directory company wants **B**.
2. **Make `info@usawireform.com` receive mail.** The root domain has **no MX
   records**. Resend can send. Replies bounce. You cannot demo or diligence
   that.
3. **Move Clerk, Stripe, Vercel, Resend, GoDaddy, GitHub, and GA4 off
   `rberkes@gmail.com`** into a company workspace.

Until those three are done, stop building SEO pages and new verticals.

---

## What a directory company would actually buy

Two products share one deploy. Do not pitch them as one thing.

1. **This floor** — Northeast Ohio shop. Instant quote, production quote,
   catalog, Robomac 214TF. A competing manufacturer on its own list.
2. **Source** — marketplace. Buyers send prints. Desk holds them. Shops file
   cells. Desk clicks Release. First two shops to pay $49 unlock contact.

A directory buyer pays for a **shop list**, **SEO traffic**, and optionally a
**paid matching engine**. They do not pay a premium for more catalog pages,
more processes, or `manufacturingeasy.com` (parked on purpose).

| Asset | Why they’d pay | Current problem |
| --- | --- | --- |
| 539-shop list + research TSVs | Most of the ~869 US wire/spring plants, with provenance | Listings are not Source inventory until shops **file cells** |
| SEO landers + GA4 | Rankings, queries, inbound | Tied to the USA Wire Form manufacturer brand |
| Source engine | $49 unlocks, gated RFQ, ZIP match | Unproven. Four gates in STRATEGY.md are not cleared |
| Code + Vercel + Blob | Running product | Accounts sit on personal logins; data is JSON in Blob, not a CRM |
| `usawireform.com` | The URL | Conflicts with listed shops; house floor is still the brand |

### Pick one package

Write one paragraph and stop mixing the three:

- **A. Directory + SEO only** — the 539 shops, landers, forms. Easiest to
  sell. Lowest price.
- **B. Directory + Source engine** — what a directory company actually wants
  if they have money. Needs one real paid loop.
- **C. Whole going concern** — shop site + marketplace + domain. Messy,
  because you are a competitor on your own list.

If the buyer is another directory company, sell **B**. Keep the Ohio floor as
a customer of Source, not as the brand they inherit. House exclusion already
exists in `src/lib/source-house.ts` and is **not** derived from the site name,
so a rebrand does not silently put the owned floor back in teaser pools.

---

## Full stack (what is live)

| Layer | What it actually is |
| --- | --- |
| App | Next.js 16 App Router, React 19, TypeScript, Tailwind 4 |
| Host | Vercel. GitHub `rberkes/usawireform` → `main`. DNS at GoDaddy (`ns09` / `ns10.domaincontrol.com`) |
| Auth | **Clerk** for buyers and shops. Admin desk is a cookie + `ADMIN_LEADS_PASSWORD`, not Clerk |
| Data | **No SQL.** Private JSON/files on **Vercel Blob** (`source/jobs/`, `source/profiles/`, `leads/`, drawings) |
| Outbound mail | **Resend** (`src/lib/leads.ts`, package `resend@6.20.0`) |
| Auth mail | **Clerk** (sign-up, verify, password reset) — not Resend |
| Payments | **Stripe** ($49 shop lead unlock, $49 buyer extra quote, leftover cell/secondary plans) |
| AI | Vercel AI Gateway → `openai/gpt-5.4-mini` (Ask the resource, print parse) |
| Analytics | GA4 `G-2J3FGMRF7E` + Vercel Analytics + first-party visitor log |
| 3D | `occt-import-js` + Three.js, Autodesk share viewer for a few parts |

There is **no CRM**. There is **no Zoho** in the repo, env, or DNS. Leads are
Blob records plus email to `info@usawireform.com` and `LEADS_NOTIFY_EMAIL`
(defaults to `rberkes@gmail.com`).

### How Source is supposed to work

1. Buyer sends a print on `/source` (ZIP required). Job **holds**.
2. Desk sees recommended shops on `/admin/accounts`.
3. Desk clicks **Release**. Up to 6 teasers. No shop mail before that.
4. First two shops pay $49 (AI Smart Connect™) and get contact.
5. Buyer can pay $49 to open one more waitlist slot, or close the print.

Matching is capability (cell class + diameter) then same-state from ZIP. The
539-shop directory does **not** feed the pool. Only shops that **filed cells**
can match. A STEP is never attached to email.

NDA exists but **`SOURCE_NDA_REQUIRED = false`**, so shops can use the
dashboard without signing it.

This-floor quote path is separate: `/instant-quote` (ballpark), `/contact` and
`/production-quote` (drawing required). Those land on `/admin` Quote files,
not Source.

### Env that has to be set in production

`.env.example` is stale. Real env:

| Var | Used for |
| --- | --- |
| `RESEND_API_KEY` | Outbound mail. Missing → forms may store to Blob and log only |
| `RESEND_FROM_EMAIL` | From line. Default `USA Wire Form <beth.t@example.com>` |
| `LEADS_NOTIFY_EMAIL` | Second desk copy. Default `rberkes@gmail.com` |
| `BLOB_READ_WRITE_TOKEN` / `BLOB_STORE_ID` + OIDC | Jobs, drawings, profiles |
| `STRIPE_SECRET_KEY` | Checkout |
| `STRIPE_WEBHOOK_SECRET` | `/api/stripe/webhook` — without this, $49 unlocks do not complete |
| `CRON_SECRET` | Daily `0 14 * * *` → `/api/cron/source-reminders` |
| `ADMIN_LEADS_PASSWORD` | `/admin/*` |
| Clerk keys | Buyer/shop accounts |
| `NEXT_PUBLIC_GA_ID` | Fallback already `G-2J3FGMRF7E` |
| `AI_GATEWAY_API_KEY` | Local Ask box. Production can use Vercel OIDC |

---

## Email — send works, receive does not

Three systems, not one. **Zoho is not in this codebase** (no SDK, webhook, or
env). Live DNS has no Zoho MX and no `zoho._domainkey`.

### 1. Resend — transactional product mail

Every quote, Source, directory, and reminder email goes through
`sendResendMail()` in `src/lib/leads.ts` except careers, which has its own
Resend call.

- **From:** `RESEND_FROM_EMAIL`, or `USA Wire Form <beth.t@example.com>`
- **Desk copies:** `info@usawireform.com` and `LEADS_NOTIFY_EMAIL`
- **Customer copies:** receipt / thanks, `Reply-To: info@usawireform.com`
- **STEP files are never attached.** Drawing previews can be, as a small JPEG/PNG

DNS already has Resend **send-side** records:

- `send.usawireform.com` MX → Amazon SES feedback (bounce / return-path)
- `send.usawireform.com` SPF
- `resend._domainkey.usawireform.com` DKIM

That is send, not receive.

**What Resend sends today**

| Event | To shop / desk | To customer / shop |
| --- | --- | --- |
| Contact / production drawing | Lead with preview | “We have your drawing” |
| Instant estimate | `LEAD: {email}` | Estimate receipt |
| Directory intro | Desk | Thanks |
| Machine inquiry | Desk | Thanks |
| Source job (held) | Recommended shops | Receipt |
| Desk Release | — | Teaser to up to 6 shops |
| Shop unlocks ($49) | Desk | Buyer contact in dashboard + mail |
| Waitlist / rebid / close | — | Those shops |
| Invite, claim, file cells, NDA, extra cells, buyer volume | Desk | Shop/buyer receipt where coded |
| Cron 1st/15th fullness + incomplete-shop reminders | Desk summary | Shop |
| Careers | `info@` only | **No applicant receipt** |

Instant estimate and Source job treat mail as failed if **either** the desk
copy or the customer copy fails.

### 2. Clerk — account mail

Sign-up, email verification, password reset. Live DNS has **no** `clerk`,
`accounts`, or `clkmail` CNAMEs, so Clerk is still on Clerk’s shared domains.

`src/proxy.ts` does **not** set `authorizedParties`. That is the subdomain
cookie leak Clerk warns about.

### 3. Inbound mailbox — not wired

Root `usawireform.com` has:

- A → Vercel (`76.76.21.21`)
- TXT Google Search Console
- DMARC `p=quarantine` to GoDaddy (`dmarc_rua@onsecureserver.net`)
- **No MX**
- **No SPF on the root**
- **No Zoho / Google Workspace DKIM**

So outbound via Resend can work, and replies to `info@usawireform.com` have no
mailbox. Every `Reply-To` points at an address that cannot receive.

Stripe receipts are Stripe’s own mail, not Resend.

**Correct split if you add Zoho (or Google Workspace):** MX on `@` only for
the inbox. Leave Resend on `send.`. Do not put Resend MX on the root or
inbound mail dies.

Prove it after DNS:

- Send a test from Gmail → `info@usawireform.com` and open it
- Submit `/contact` and `/source`, reply to the Resend receipt, confirm the
  reply lands
- Set `RESEND_FROM_EMAIL` and `LEADS_NOTIFY_EMAIL` to that mailbox, not Gmail

---

## What is already built

- Instant quote + production quote + Source hold / release / waitlist / rebid / close
- Clerk buyer vs shop split via `/source/enter`
- Stripe checkout + webhook for lead unlock and extra quotes
- Private Blob for jobs, drawings, profiles, visitor log
- Resend HTML templates (`src/lib/lead-mail.ts`)
- Daily cron reminders
- Admin desk: quotes, accounts, visitors, architecture, subscribers, live-page checklist
- 539-shop directory, SEO landers, hook/staple calculators, Ask box, GA4
- House floor kept out of teaser pools (`src/lib/source-house.ts`)

The engine is further along than the mailbox.

---

## Gaps vs how it is supposed to work

### Blockers (mail, auth, money)

1. Inbound MX for `info@usawireform.com`
2. Confirm Resend production: `RESEND_API_KEY` + `RESEND_FROM_EMAIL` on Vercel
3. Root SPF if sending From `@usawireform.com` (Resend include), without
   breaking inbound later
4. Clerk production domains at GoDaddy + `authorizedParties: ['https://usawireform.com']`
5. Stripe live keys + webhook → `/api/stripe/webhook`
6. Blob token or OIDC + store id
7. `CRON_SECRET` so 1st/15th capacity mail actually runs

### Product gaps already named in SOURCE.md

1. **Refund on a ghosted lead** — outcome log has `no-response`;
   `source-billing.ts` has no refund. Do **not** build this before one paid
   loop exists.
2. **Outcome nudge email** — shops who unlock and never report leave the
   record blank. Cheapest unblock for the “does the model work” gates.
3. **Buyer form fields** — action already reads alloy, who buys coil,
   need-by, finish, first-article vs production, PPAP. `SourceJobForm` does
   not show them.
4. **Certifications as a hard filter** (ISO, AS9100, IATF, ITAR, NADCAP + expiry)
5. **Recruit against thin pools** — desk already warns when a print cannot
   fill 6; that list is unused
6. **Supplier NDA gate is off**
7. **Careers** always returns success even if Resend/Blob fail; no applicant
   receipt; only emails `info@`, not the notify inbox
8. **Directory 503** tells the user to email `rberkes@gmail.com`
9. **GA4** only tracks Source job / claim / file cells / Stripe return.
   Contact, instant quote, and directory intros are not `generate_lead`.
   Purchases are lost if the user never returns from Stripe (no Measurement
   Protocol)
10. **Clerk sign-up itself** does not email the desk (by design)

### Growth, not a code bug

The model only works if listed shops **file capability**. 539 directory
entries, 517 US. Matching ignores the listing until they file. Strategy:
convert listings → filings, get shops to buy a second $49 lead, get buyers to
answer, fill 4 of 6 teaser slots, get a second print. Do not expand to
stamping/molding until those four gates clear.

---

## Task list to get to a sale

### 0 — This week

1. Pick package A / B / C. Default for a directory buyer: **B**.
2. Stand up inbound mail (Zoho or Google Workspace MX on `@` only).
3. Move every vendor account onto a company email / workspace.

### 1 — Make the directory the product

4. **Count filings, not listings.** Export from `/admin/subscribers` and
   `/admin/accounts`: how many filed, how many have a working email, how many
   can fill a 6-shop teaser in OH / MI / PA / IN. That spreadsheet is the
   data room.
5. **Invite the densest states first.** Source invite mail already exists. Do
   not scrape more associations. Convert listed shops → filed shops.
6. **Turn the NDA on** (`SOURCE_NDA_REQUIRED`). A directory buyer will ask how
   prints are protected.
7. **Stop competing with the list in the pitch.** Homepage and `info@` still
   say USA Wire Form the manufacturer. For a sale, the public story has to be
   “the map,” with the Ohio cell as one shop — or keep the shop and sell only
   a data license.

### 2 — One real money loop (required if Source is in the deal)

Without this, Source is a slide.

8. Confirm Stripe live keys + webhook.
9. Run **one print all the way through**: hold → desk Release → shop pays $49
   → buyer answers. Screenshot Stripe, the teaser, and the desk row.
10. Get **a second $49 from the same shop** if you can. That is gate 1 in
    STRATEGY.md. One unlock is a curiosity; a repeat is a business.

### 3 — Diligence pack

11. **Data room folder** (Notion/Drive is fine):
    - What is included / excluded (shop floor vs directory vs Source)
    - Shop list export + TSV provenance ([DIRECTORY.md](./DIRECTORY.md))
    - Last 90 days: GA4, Search Console, Vercel analytics, visitor log
    - Stripe: volume, refunds (none), webhook health
    - Resend: domain verified, bounce rate
    - Clerk: user counts (buyers vs shops)
    - Env var inventory (not the secrets)
    - Open PRs to ignore or merge (several August drafts are still open)
12. **Transfer runbook:** GoDaddy DNS, Vercel project, Clerk app, Stripe
    account, Blob store, Resend domain, GitHub `rberkes/usawireform`, GA4
    property. One page: who clicks what on close.
13. **Legal, cheap version:** entity that owns the IP; assignment of the
    compilation; trademarks (USA Wire Form™ / USAWF™ / AI Smart Connect™) —
    claimed on-site, probably unregistered. Buyer’s counsel will ask. Don’t
    invent registrations.
14. Privacy/terms contact must be the working `info@`. Directory 503 copy
    still tells people to email `rberkes@gmail.com`.
15. Clerk production CNAMEs (`clerk`, `accounts`, `clkmail`) and
    `authorizedParties`. Optional for a data-only sale; required if they take
    the live app.

---

## Do not do (it delays a sale)

- More SEO pages, glossary, peer directories (old open PRs)
- Expanding into stamping / molding / `manufacturingeasy.com`
- Building a Zoho CRM integration
- A full brand rewrite before mail and one paid loop work
- Telling a buyer “539 shops get every RFQ” — they don’t. Only filings do
- Refunds, cert filters, or new verticals before money exists

---

## Order, in one line

**Package (A/B/C) → mailbox that receives → accounts in a company name →
filing count + invites → one $49 loop → data room.**

If you only do three things: **pick B, fix MX, send 20 Source invites in Ohio
and Michigan.** That is the shortest path to something a directory company can
underwrite. Everything else is packaging.
