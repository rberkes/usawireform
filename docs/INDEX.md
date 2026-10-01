# Index quality

Google should see a wire-forming database, not a pile of location-swapped
landers. This file is the rule. The live numbers are at `/admin/index`
and `npm run index:audit`.

## What gets indexed

A public URL stays in the sitemap only when `shouldIndexPath()` says so
(`src/lib/index-policy.ts`).

| Family | Indexed when |
| --- | --- |
| `/directory/[slug]` | The listing has a fact of its own (website, phone, iron, certs, or original copy). Thin claimable pages stay reachable and `noindex`. |
| `/ohio/[city]` | A named plant or at least one directory shop in that city. Demand-only towns render nearby shops and stay `noindex`. |
| `/[state]` | Always — the shop roster and inventory are unique per state. Titles include the shop count. |
| `/wire-forming/[capability]` | Always — each slug matches real directory shops. |
| `/materials/[slug]` | Always — only useful coil families, not every grade × process pair. |
| `/equipment/[oem]/[model]` | Always — catalog facts plus shops that name the iron. |
| Desk URLs | Never. `robots.txt` disallows `/admin`, `/buyer`, Clerk, Source desks. |

## What we will not generate

- Tens of thousands of city × service pages with the same paragraph and a swapped place name.
- Material × process combinations that nobody searches and no shop claims.
- Machine-model pages that invent a floor we have not seen.

Prefer ~2,000 useful, interlinked pages over 100,000 thin ones.

## The graph

`src/lib/graph.ts` is the relationship layer. A Cleveland shop with a
Robomac and stainless 3D work should automatically link:

Cleveland → Ohio → 3D wire forming → Stainless steel → Numalliance → Robomac → the listing → `/quote`.

Pages must call those helpers. Do not re-match free text in the template.

## RFQ

`/quote` is the information-architecture door: upload CAD → check the
cell → match shops → quote. Source and this-floor instant quote stay as
the two fulfillment paths.

## Technical checks

- Root layout must not set `alternates.canonical` to `/`.
- Do not stamp Cleveland geo meta on every page.
- Do not put `lastModified: new Date()` on every sitemap row.
- `/cnc-wire-forming` and `/cnc-wire-bending` 301 into the taxonomy.
- `/equipment/cnc-manufacturers/:oem/:model` 301s to `/equipment/:oem/:model`.
- `/directory/areas/cleveland` 301s to `/ohio/cleveland`.
