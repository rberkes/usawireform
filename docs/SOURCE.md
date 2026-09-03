# Source — how it works

Source matches buyers to US wire-form shops. It is a matching engine, not an RFQ blast. **The desk is the gate.** Shops do not see a job until you click **Release** on `/admin/accounts`.

Live: [usawireform.com](https://usawireform.com). Desk mail: `info@usawireform.com`. Role previews (sample data): `/admin/preview`.

---

## Roles

| Who | Sign-in | Home |
| --- | --- | --- |
| **Buyer** | `/sign-in?as=buyer` or `/sign-up?as=buyer` | `/buyer/dashboard` → send a print on `/source` |
| **Shop** | `/sign-up?as=supplier` → NDA → file cells | `/source/dashboard` |
| **Desk** | Admin password | `/admin/accounts` — shops, buyers, STEP files, **Validate buyer**, **Release to shops** |

One shop per account. Instant estimate on this site is still this floor (4–14 mm Robomac). Source is other US shops.

---

## The loop

1. Buyer sends a print on `/source`. **ZIP is required.** City is optional.
2. Job **holds**. Receipt to the buyer. Desk mail with recommended shops. **No shop mail. No shop inbox.**
3. Buyer may **release the STEP** (file privacy) or keep it at the desk. That is not the same as sending the job to shops.
4. You look at `/admin/accounts` → STEP files. You see ZIP, plant/metro, and which shops would get the teaser (same-state first).
5. You click **Release to N shops**. Up to **six** teasers go out.
6. First **two** shops to unlock get contact — first come.
7. The other four wait. They do not pay to wait. They are not told they “lost.”
8. If the buyer wants another quote, they pay **$49** and pick a one-line why. That opens **one** waitlist slot. First come among those still in line. The two who already quoted are not copied.
9. Buyer can **close** the print so waitlist shops stop sitting on a ghost RFQ.

---

## Two different “releases”

Do not mix these.

| What | Who | What it does |
| --- | --- | --- |
| **STEP privacy** | Buyer, on the form or the receipt link `/source/privacy` | Whether a quoting shop may open the drawing in the dashboard. Default: **desk**. Never attached to email. |
| **Release to shops** | Desk, **Release** on `/admin/accounts` | When shops see a teaser in the inbox. You decide. |

A shop may open a released STEP only after they **paid** for the lead **and** the buyer released the file.

---

## Matching

Hard filter first. Then locale. Then the rest.

1. **Capability** — same cell class (spring, 2D CNC, 3D CNC, straighten & cut, fourslide, multi-slide) and a diameter band that fits. No fit, no teaser.
2. **ZIP → state** — buyer ZIP sets the state (`44035` → OH). `OH` and Ohio count as the same. **Same-state capable shops fill the six first.** If there are not six in-state, out-of-state capable shops fill the rest.
3. **City** — optional. Same city is a tiebreak inside that state. Not shown to shops or buyers.
4. **Then** OEM, qty vs shop min, fullness. Hungry shops that filed **this week** (7 days) sit higher among shops that already fit. Stale after 8 days — no boost. 100% full = no capacity boost.

Cap: **6 teasers** (`SOURCE_TEASER_POOL`). Hard cap 10 shops can ever buy (`SOURCE_LEAD_BUYERS_MAX`).

**The house floor never enters a pool.** `isHouseShop` drops any filing whose
email domain or company name is on the operator's owned-floor list, before
scoring. A listed shop can never be outbid by the desk that ranked it. Enforced
in code, not policy — say it out loud on the shop page.

The list is **not** derived from `SITE_HOST` or `COMPANY` on purpose. Under a
neutral platform brand the owned floor carries a different name than the site,
so deriving it from the site would stop excluding anyone the day the platform
is rebranded. Add a floor to `BUILT_IN_NAMES` / `BUILT_IN_DOMAINS` the day it
is acquired, or via `SOURCE_HOUSE_NAMES` / `SOURCE_HOUSE_DOMAINS` to run one
deploy across brands. Code: `src/lib/source-house.ts`.

Shops and buyers **do not see** city, state, ZIP, or plant metro. That is desk-only on `/admin/accounts` (plant city + nearest major city, e.g. Elyria → Cleveland).

Code: `src/lib/source-match.ts`, `src/lib/states.ts` (`parseUsZip`, `stateFromZip`, `sameUsState`).

---

## What each side sees

### Shop teaser (before they pay)

Cell, wire, qty, **masked** buyer email (`a***@m***.com`). No name. No locale. No STEP.

### Shop after they unlock ($49, AI Smart Connect™)

Buyer company, name, email, phone. STEP only if the buyer released it.

Inbox states:

- **Can buy** — a slot is open; first come.
- **Waitlisted** — two shops already unlocked. Next if the buyer opens another quote. They do not pay to wait.
- **Closed** — buyer closed the print.

### Outcome log (after unlock)

A shop that paid gets one prompt: **I sent a quote / Buyer never answered /
Not quoting it**. First answer stands. Stored per purchase as `quoteOutcome`
and `quoteOutcomeAt` on `SourceJobPurchase`.

This is the only record of whether $49 bought anything. Refund eligibility,
buyer answer rate, and shop ranking all read it.

**Shops see the buyer's record before they pay.** On the teaser:
"This buyer answered 4 of 5 shops that paid to reach them." Raw counts, never a
percentage — one unlock out of one is not a 100% record and must not read like
one. Turns copper when a buyer has answered nobody.

---

## The lead ledger (desk metrics)

Purchases already live on the job record, so these are reads, not new schema.
Cross-job reads live in `src/lib/source-lead-history.ts`; per-job reads stay in
`src/lib/source-access.ts`.

**Lead repeat** (`/admin/accounts#repeat`) is the number that decides whether
the model works. A shop paying a second time has decided the first lead was
worth the money. Shops whose first purchase is under 45 days old are held out
of the rate — otherwise a burst of new shops makes retention look collapsed.

The per-shop rows pair purchases with outcomes on one line, which is the only
way to see the chain that matters: **bought once, buyer never answered, never
came back.** That is a shop lost to a bad lead, and the desk should call them.

Gates to clear before expanding to other processes:

1. Shops buy a second lead (`#repeat`)
2. Buyers answer the shops who paid (teaser record)
3. Released prints fill at least 4 of 6 slots (thin-pool warnings)
4. Buyers return with a second print

### Buyer dashboard

Jobs, drawing privacy, monthly volume slider. Shop names stay with the desk. After shops unlock, the buyer sees **masked shop emails**, not names.

- Two shops can buy first — first come.
- **Open one more quote — $49** (one-line why).
- **These quotes are enough — close this print.**

**Do not tell buyers about shop $49.**

---

## Money

| Who pays | When | Amount | Stripe lookup |
| --- | --- | --- | --- |
| **Shop** | Unlock contact on a teaser they were mailed | $49 per lead | `source_lead_once` (`SOURCE_LEAD_PRICE_CENTS`) |
| **Buyer** | After two shops have quoted, to open one more waitlist slot | $49 **per extra shop** | `source_buyer_extra_shop` |

Shop product name: **AI Smart Connect™**. Listing every cell is free. Legacy monthly cell plans exist; new shops buy leads at $49 instead.

Buyer extras are **not a bundle**. Four more quotes = 4 × $49. One checkout opens one slot. Waitlist shops then race first-come.

Why (buyer → waitlist only):

- Need a better price
- Need a shorter lead time
- Need a different process or finish
- Need more capacity
- Want another quote

Code: `src/lib/source-rebid.ts`.

---

## Files

Always allowed (guest or unvalidated buyer): STEP, STP, IGES, PDF, DXF, DWG, SLDPRT.

Excel, Word, ZIP, photos: only if **all three** are true:

1. Buyer saved company + email
2. Clerk email is confirmed
3. Desk clicked **Validate buyer** on `/admin/accounts`

A drawing is never on email. Code: `src/lib/drawings.ts`, `buyerMayUploadExtras` in `src/lib/source-buyer.ts`.

---

## Capacity (shops)

One company slider, 0–100% full, on `/source/dashboard`.

- 0% = needs work (match boost among shops that already fit)
- 100% = no capacity
- Stale after 8 days — no boost
- Filed this week (7 days) ranks higher in the six
- Email listed shops on the **1st and 15th Eastern** (cron + 10-day gap)

Desk does **not** get an email when the slider moves.

---

## Buyer volume

One slider on `/buyer/dashboard`, 0–10+ jobs they source a month. Starts at 0. Saving a new number emails the **desk only** (`LEAD: buyer volume`) so we can predict uploads. The buyer does not get a copy. Shown on `/admin/accounts` buyers.

---

## Desk email

Desk **does** get: Source job (held, with recommended shops), first equipment list, directory claim, invite, quote/drawing, estimate, directory intro, careers, buyer **account saved**, buyer **monthly volume**, shop NDA, later machine adds, reminder summaries.

Desk **does not** get: Clerk sign-up itself, fullness slider moves, plant photo.

Shop mail after **your** Release: teaser, waitlist, rebid (one-line why), closed. STEP never attached.

---

## What not to build (on purpose)

- Public leaderboards or “you came in 5th”
- Charging shops $49 to wait
- Telling the two who already quoted that they lost
- Telling buyers about shop $49
- Buyer blasting all shops
- Charging the first buyer print
- Per-machine fullness sliders
- Training an LLM on raw STEP

Gamification shops will accept: first-come unlocks, an honest waitlist, fullness this week ranking higher in the six.

---

## Still to build

1. **Refund path on a ghosted lead.** The outcome log now records
   `no-response`, but nothing acts on it. Decide cash refund vs lead credit and
   the window, then wire it in `src/lib/source-billing.ts` — there is no refund
   code path there today.
2. **Outcome nudge email.** A shop that unlocks and never reports leaves the
   record blank. One email a few days after purchase closes most of that gap.
3. **Certifications as a hard filter** (ISO 9001, AS9100, IATF 16949, ITAR,
   NADCAP) with expiry dates. Expired cert must drop the shop from the pool.
4. **Recruiting against thin pools.** The desk now warns when a print cannot
   fill six. Those warnings are a shopping list — which cell classes and which
   states are short. Depth in wire forming beats breadth across processes.
5. Richer fit flags on Release (alloy, coil, finish, qty vs MOQ — flags exist; desk still Releases the ranked six)
6. Buyer form fields: alloy, who buys coil, need-by, finish, first-article vs production, PPAP
7. More desk mail: shop sign-up, NDA, later cells (some of this already fires)
8. Desk expert uses live filings + match rules; PDF/notes ok; raw STEP is not for the model

---

## Key files

| Piece | Where |
| --- | --- |
| Submit / hold / Release | `src/app/actions/source.ts` |
| Accounts desk + close print | `src/app/admin/accounts/page.tsx`, `src/app/actions/source-accounts.ts` |
| Match + ZIP / same state | `src/lib/source-match.ts`, `src/lib/states.ts` |
| Access / waitlist / who may buy | `src/lib/source-access.ts` |
| Money | `src/lib/source-plans.ts`, `src/lib/source-billing.ts`, `/api/stripe/webhook` |
| Rebid reasons | `src/lib/source-rebid.ts` |
| Mail | `src/lib/leads.ts`, `src/lib/lead-mail.ts` |
| Types | `src/lib/source-types.ts` |
