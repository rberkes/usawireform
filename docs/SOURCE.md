# Source — how it is supposed to work

Source matches buyers to US wire-form shops. **The desk is the gate.** Shops do not see a job until the desk releases it. That release path is agreed product; the code on `main` still emails shops on submit until that pass is built.

## Roles

- **Buyer** — `/sign-in?as=buyer` or `/sign-up?as=buyer` → `/buyer/dashboard` → send a print on `/source`
- **Shop** — `/sign-up?as=supplier` → NDA → file cells on `/source/equipment` or dashboard → fullness slider
- **Desk** — `/admin/accounts` — shops, buyers, STEP files, **Validate buyer**. Generic role views at `/admin/preview` (buyer + shop dashboards, sample data).

## Files

Always allowed (guest or unvalidated buyer): STEP, STP, IGES, PDF, DXF, DWG, SLDPRT.

Excel, Word, ZIP, photos: only if **all three** are true:

1. Buyer saved company + email
2. Clerk email is confirmed
3. Desk clicked **Validate buyer** on `/admin/accounts`

Contact/quote (this floor) stays prints-only. Code: `src/lib/drawings.ts`, `buyerMayUploadExtras` in `src/lib/source-buyer.ts`.

A drawing is never on email. Privacy default is **desk**. Shop may open a released file only after they paid for the lead (`shopMayViewDrawing`).

**Names and locale stay off both dashboards.** Shop teaser: cell, wire, qty, and a **masked** buyer email (`a***@m***.com`). Full contact after the shop pays. After shops buy the lead, the buyer sees those shops as **masked shop emails** — not names or full addresses. Plant city and nearest major city are **desk-only** on `/admin/accounts`.

## Capacity

One company slider, 0–100% full.

- 0% = needs work (match boost among shops that already fit)
- 100% = no capacity
- Stale after 8 days — no boost
- Filed **this week** (7 days) ranks higher in the six teasers
- Email listed shops on the **1st and 15th Eastern** (cron + 10-day gap)

UI: `SourceWeeklyCapacityForm` on `/source/dashboard`. Logic: `src/lib/source-capacity.ts`.

## Buyer volume

One slider on `/buyer/dashboard`, 0–10+ jobs they source a month. Starts at 0. Saving a new number emails the **desk only** (`LEAD: buyer volume`) so we can predict uploads. The buyer does not get a copy and the copy does not mention the ping. Shown on `/admin/accounts` buyers.

## Money (copy rules)

- Shop unlock name: **AI Smart Connect™**. Charge is $49 per lead (`SOURCE_LEAD_PRICE_CENTS`).
- Do not tell **buyers** about shop $49.
- **Buyer quotes:** two shops can buy first (first come). If the buyer wants another quote, $49 opens **one more slot** among the waitlist (`SOURCE_BUYER_EXTRA_SHOP_LOOKUP`). Four more quotes = 4 × $49. Not a bundle. One-line **why** goes to waitlist only — not to shops that already quoted.
- Buyer can **close** the print so waitlist shops stop sitting on a ghost RFQ.

Listing every cell is free. Teaser pool is **6**. First **2** unlock. Hard cap 10.

## Desk email today

Desk **does** get: Source job, first equipment list, directory claim, invite, quote/drawing, estimate, directory intro, careers, buyer **account saved**, buyer **monthly volume slider**, shop NDA, later machine adds, reminder summaries.

Desk **does not** get: Clerk sign-up itself, fullness slider moves, plant photo.

## Matching (current code)

Hard filter: cell class + diameter band. Buyer **ZIP** sets the state. **Same-state capable shops fill the six first.** Then OEM, same city, qty vs fit, fullness this week. First two of those six to unlock get contact. `src/lib/source-match.ts`.

Prints **hold** on submit. Desk **Release** on `/admin/accounts` sends the six teasers.

## Agreed next (not in this push)

1. Fit check on Release: alloy, coil, finish, qty vs MOQ (flags exist; desk still Releases the ranked six)
2. Buyer form: alloy, who buys coil, need-by, finish, first-article vs production, PPAP
3. Desk mail: shop sign-up, NDA, later cells
4. Desk expert uses live filings + match rules; PDF/notes ok; raw STEP is not for the model

**Out of that pass:** train an LLM, charge the first buyer print, buyer blasting all shops, per-machine sliders.

## Key files

| Piece | Where |
| --- | --- |
| Submit / file cells | `src/app/actions/source.ts` |
| Buyer account / validate | `src/app/actions/source-accounts.ts` |
| Types | `src/lib/source-types.ts` |
| Access / drawing | `src/lib/source-access.ts` |
| Mail | `src/lib/leads.ts`, `src/lib/lead-mail.ts` |
| Billing | `src/lib/source-billing.ts`, `/api/stripe/webhook` |
