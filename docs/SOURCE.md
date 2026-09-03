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

## Capacity

One company slider, 0–100% full.

- 0% = needs work (match boost among shops that already fit)
- 100% = no capacity
- Stale after 8 days — no boost
- Email listed shops on the **1st and 15th Eastern** (cron + 10-day gap)

UI: `SourceWeeklyCapacityForm` on `/source/dashboard`. Logic: `src/lib/source-capacity.ts`.

## Buyer volume

One slider on `/buyer/dashboard`, 0–10+ jobs they source a month. Starts at 0. Saving a new number emails the **desk only** (`LEAD: buyer volume`) so we can predict uploads. The buyer does not get a copy and the copy does not mention the ping. Shown on `/admin/accounts` buyers.

## Money (copy rules)

- Shop unlock name: **AI Smart Connect™**. Charge is $49 per lead (`SOURCE_LEAD_PRICE_CENTS`).
- Do not tell **buyers** about shop $49.
- Agreed buyer money (not coded yet): first print free; each later job the desk qualifies and releases is $49. Not $49 per shop bid.

Listing every cell is free. Up to 10 shops can buy the same job.

## Desk email today

Desk **does** get: Source job, first equipment list, directory claim, invite, quote/drawing, estimate, directory intro, careers, buyer **account saved**, buyer **monthly volume slider**, shop NDA, later machine adds, reminder summaries.

Desk **does not** get: Clerk sign-up itself, fullness slider moves, plant photo.

## Matching (current code)

Hard filter: cell class + diameter band. Bonuses: OEM, locale, qty vs fit, fullness. Cap 10 shops. `src/lib/source-match.ts`.

**Still wrong vs product:** `submitSourceJob` writes `mailedTo` and emails shops immediately. Product is: save job, receipt to buyer + desk, **Release to shops** is the trigger.

## Agreed next (not in this push)

1. Admin is the trigger — no shop mail, no shop inbox until Release
2. Shop ping after release: “a job fits this cell” — no file, no contact
3. Shop $49 opens spec/contact; STEP stays desk unless released **and** paid
4. Buyer first print free; later released jobs $49
5. Fit check on Release: cell, wire, alloy, coil, finish, qty vs MOQ, fullness
6. Buyer form: alloy, who buys coil, need-by, finish, first-article vs production, PPAP
7. Desk mail: shop sign-up, NDA, later cells
8. Desk expert uses live filings + match rules; PDF/notes ok; raw STEP is not for the model

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
