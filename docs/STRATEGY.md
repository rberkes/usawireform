# Strategy — depth before breadth

**Decision (Sep 2026): make wire forming work first. Park
`manufacturingeasy.com`. Renew the domain, do not build on it.**

This is a decision record, not a permanent rule. Revisit when the four gates
below are cleared — not on a calendar date.

---

## Why not expand now

### The pool math says depth, not breadth

A teaser pool wants **6 shops** (`SOURCE_TEASER_POOL`). The buyer is promised
**2 quotes** (`SOURCE_BUYER_INCLUDED_SHOPS`). Getting there means surviving
four narrowing steps:

1. Shops in the directory — **529** (512 US, 17 Canada, 43 states/provinces).
   Count it with `directoryCompanies.length`, not by grepping one file:
   `directory.ts` merges seven sources plus `fromStateShops()`.
2. Of those, shops that actually **filed capability** with a working email —
   this is the number that matters, and it is much smaller than 529
3. Of those, shops with the **matching cell class**
4. Of those, shops whose **diameter band brackets the print**
5. Then same-state preference reorders whoever is left

The desk now warns when a print cannot fill six, and that warning is expected
to fire often. That is a **depth** problem.

Breadth does not fix it. Adding stamping, molding, machining, cold heading and
laser cutting does not produce six wire shops for a spring print — it produces
six separate cold-start pools with the same shortage, each needing its own
equipment catalog before matching means anything. One thin market becomes six
thin markets.

Industry counts (external, not from this codebase) put spring and wire product
manufacturing at roughly **869 US companies** — about **1,051 establishments**
and 35K workers. The directory already maps **529 shops**, so *most of the
industry is already catalogued*.

That reframes the recruiting job. The gap is not finding shops; it is converting
listed shops into shops that have **filed capability** in Source. A directory
listing contributes nothing to a teaser pool. Every pool is drawn from filings,
and that conversion is the cheapest growth available — the shops are already
identified.

### The moat is domain knowledge, not code

`src/lib/source-iron.ts` carries real depth on Numalliance, WAFIOS, AIM, U.S.
Baird, Nilson, Lubow, Bihler and Whitelegg because that iron is known
first-hand. Press tonnage families and molding machine catalogs are not known
at that depth yet.

Thin capability data produces bad matches. Bad matches mean shops paying for
junk leads, which is the fastest way to kill a marketplace. Every new vertical
is a new catalog to learn before its matching is trustworthy.

### The desk does not scale to six processes yet

Every release is a manual decision. That hand-checking is the quality control
that makes a low-volume marketplace work at all. It cannot be spread across six
processes while it is still the thing holding match quality up.

---

## Why waiting is free

The marketplace engine is already process-agnostic, and it does not decay by
sitting still.

Of ~5,935 lines in `src/lib/source*.ts`, roughly 700–900 carry wire-specific
knowledge, concentrated in three files:

| File | Lines | What is wire-specific |
| --- | --- | --- |
| `source-iron.ts` | 301 | Wire machine OEM and model catalogs |
| `source-match.ts` | 178 | Diameter band + cell class hard filter — **the blocker** |
| `source-job-parse.ts` | 130 | Wire print parsing |
| `source-types.ts` | part of 314 | `SOURCE_KINDS`, `SourceJobClassKind` |

Everything else — gated release, the six-shop teaser pool, first-come unlocks,
waitlist, rebid, close, Stripe on both sides, ZIP locale ranking, capacity
freshness, the outcome log, repeat tracking — never asks what process a job is.
A stamping buyer ghosts a shop exactly the way a wire buyer does.

So expanding early is expensive and hard to reverse; expanding late is cheap.
In a year the engine will be just as portable, except by then the real answer
rate, pool depth and repeat rate will be known.

**The investor story does not need the platform built.** Proof in one vertical
plus a credible expansion thesis is more fundable than six empty verticals.
Xometry launched on CNC machining alone. `manufacturingeasy.com` is a slide, not
a roadmap item.

---

## The four gates

Clear these in wire forming before touching another process.

### 1. Shops buy a second lead

`/admin/accounts#repeat`

The single most important number. A shop paying a second time has decided the
first lead was worth the money. Nothing else in the system says as much about
whether the model works.

Shops whose first purchase is under 45 days old are held out of the rate, so a
burst of new signups cannot make retention look collapsed.

### 2. Buyers answer the shops who paid

Shop teaser, and the buyer line on every desk job row.

If buyers ghost the shops who paid, fix that before selling the same experience
to five more industries. The desk flags a buyer who has answered nobody with
*"Shops are losing money on this buyer."*

### 3. Released prints fill at least 4 of 6 slots

Thin-pool warnings at the desk.

Below that, the answer is recruiting wire shops, not writing a capability
schema. Treat accumulated warnings as a shopping list: which cell classes, in
which states, are short.

### 4. Buyers return with a second print

One-print buyers mean the platform is a curiosity, not a channel.

---

## Parked, with the trap in each

**Named-band capability schema.** Replacing `{ kind, minMm, maxMm }` with
`{ process, class, bands }` is the real unlock for multi-process. `diameterMm`,
`minMm` and `maxMm` appear in **560 matches across 334 lines in 36 files**,
including live directory and SEO pages that earn traffic today. It needs its own
branch with the old shape still readable during a transition. Do not fold it
into unrelated work.

**Splitting `source-types.ts`.** It now mixes agnostic marketplace types
(`SourceJobPurchase`, quote outcomes) with wire-specific ones (`SOURCE_KINDS`).
Left alone, every new vertical edits the same file the engine depends on. Split
it as part of the schema migration.

**Certifications as a hard filter.** ISO 9001, AS9100, IATF 16949, ITAR,
NADCAP, with expiry dates — an expired cert must drop the shop from the pool.
High value even within wire forming; needs the taxonomy decided first.

**Refund path on a ghosted lead.** The outcome log records `no-response` but
nothing acts on it. `src/lib/source-billing.ts` has no refund code at all. Two
product decisions block it: cash refund vs lead credit, and how long a buyer
gets to answer before the fee is refundable.

**Outcome nudge email.** A shop that unlocks and never reports leaves the record
blank, which is what keeps gates 1 and 2 from filling in. One email a few days
after purchase closes most of that gap. This is the cheapest unblock on the
list.

---

## The cheap hedge

Costs nothing, so do it by default: **keep new marketplace-layer code
process-agnostic.** Do not run the schema migration, just do not add fresh wire
assumptions to the engine. Wire specifics belong in the capability layer
(`source-iron.ts`, matching, print parsing), not in release, billing, access or
the lead ledger.

One example of the trap. The house-floor exclusion (`src/lib/source-house.ts`)
was first written to derive the owned floor from `SITE_HOST` and `COMPANY`. That
works today and breaks silently on rebrand: under a platform brand the owned
floor is *USA Wire Form*, which matches neither constant, so the check would
have gone dead and started letting the house into pools while the docs still
promised it could not happen. It is now an explicit list, decoupled from site
identity, with env overrides so one deploy can serve both brands.

That is the shape of the whole hedge: assume the brand and the process will
change, and do not let anything load-bearing depend on today's.

---

## What would change this decision

If wire forming genuinely cannot sustain the model — pools that cannot fill even
after real recruiting effort — then breadth stops being growth and becomes the
fix.

Nothing observed so far points that way. With 512 of ~869 US companies already
mapped, the constraint is filing conversion, not supply. That is a much better
problem than needing more industries.
