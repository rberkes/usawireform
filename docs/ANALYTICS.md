# Analytics — what we measure and what counts as a conversion

GA4 went live on 2 Sep 2026 (`879d80c`). Property measurement ID `G-2J3FGMRF7E`,
stream "USA Wire", read from `NEXT_PUBLIC_GA_ID` with that same value as a
fallback in `src/app/layout.tsx` and `src/lib/config.ts`.

GA4 will happily record events forever without telling you whether the business
worked. That only happens when an event is marked a **key event** in the GA UI,
and the list below is the set worth marking.

## The events

| Event | Fires when | Where | Params |
| --- | --- | --- | --- |
| `purchase` | Stripe checkout completes and we have confirmed it server-side | `PurchaseTracker`, mounted on both dashboards | `transaction_id`, `currency`, `value`, `items[]` with `item_id` = purchase kind |
| `generate_lead` | A buyer submits a job through the Source form | `SourceJobForm` | `form: "source_job"`, `with_drawing` |
| `claim_listing` | A shop claims its directory listing | `DirectoryClaimForm` | `slug`, `company` |
| `list_equipment` | A shop files its cells | `SourceEquipmentForm` | `cells` (how many rows filed) |

`purchase` and `generate_lead` are GA4 recommended names, so GA already
understands their revenue and funnel meaning. `claim_listing` and
`list_equipment` are custom and will need registering as custom events if you
want them in explorations.

## Purchase kinds

`items[0].item_id` on a `purchase` says what was bought, derived from the Stripe
session metadata:

| `item_id` | Metadata key | What it is |
| --- | --- | --- |
| `lead_unlock` | `source_lead` | A shop paid $49 to unlock a lead's contact |
| `buyer_extra_quote` | `source_buyer_extra` | A buyer paid $49 to open one more quote slot; `extra_qty` carries the count |
| `secondaries` | `source_secondaries` | Secondary operations listed |
| `cells` | `source_plan` | Legacy cell subscription |
| `other` | — | Anything unclassified; if this shows up, a new checkout was added without metadata |

## How purchases survive the redirect

Stripe returns the buyer to `/source/dashboard?session_id=…` or
`/buyer/dashboard?session_id=…`. Those pages trade the session id for the real
outcome server-side and then **redirect**, which strips the id — so a browser
tracker never sees it. The dashboards therefore redirect to
`?paid=<session>&kind=<kind>&value=<dollars>&qty=<n>`, `PurchaseTracker` reports
that, remembers the transaction id in `localStorage`, and replaces the URL.

The consequences worth knowing:

- A refresh or a shared link cannot double-count, because the id is remembered
  and the params are stripped.
- A buyer who closes the tab on the Stripe page before returning is **not**
  counted, even though the money was taken. The webhook still records the sale,
  so Stripe and GA will disagree slightly, and Stripe is the truth. Closing that
  gap means sending the event server-side through the Measurement Protocol,
  which needs an API secret and is not built.

## Set these as key events

In GA4: Admin → Events → mark as key event.

1. `purchase` — the only one tied to money.
2. `generate_lead` — top of the funnel; without it nothing upstream is measurable.
3. `claim_listing` — supply-side growth.

Leave `list_equipment` unmarked unless you want it in the conversion count; it
is a supply-side signal, not demand.

Also link Search Console (`sc-domain:usawireform.com`) to the property. It puts
organic queries and landing pages inside GA and stops the cross-referencing
between two tools.

## Adding an event

Names live in `src/lib/analytics-events.ts` as a closed union, deliberately, so
a typo cannot invent a new event. Add the name there, then:

- Client, on a form success: `useReportSubmit(event, state.success, params)` —
  it fires once per success and re-arms on the next submit, which matters
  because `useActionState` re-renders on every keystroke afterwards.
- Client, anywhere else: `track(event, params)` from `src/lib/analytics.ts`.
  Safe before the tag loads and a no-op on the server.

Never let a dropped measurement throw. Both helpers swallow errors on purpose.

## What is not measured

- Server-only outcomes: desk releases, waitlist mail, lead outcome reports. They
  live in blob storage and the admin desk, not GA.
- Anyone with an ad blocker or a privacy browser, which is why owner visits
  often never appear.
- Anything before 2 Sep 2026. There was no tag, so there is no history.
