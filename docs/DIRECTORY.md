# Directory — how shops get listed

The directory is the top of the funnel. It is **not** the teaser pool: a listing
contributes nothing to matching until that shop files capability in Source. See
[STRATEGY.md](./STRATEGY.md) for why that distinction is the whole growth
problem.

Count it with `directoryCompanies.length`. Never by grepping one file —
`directory.ts` merges seven sources plus `fromStateShops()`.

Today: **529** entries (512 US, 17 Canada, 43 states and provinces), 430 with a
working website.

## Sources merged

| Source | What it holds |
| --- | --- |
| `directory.ts` | The original hand-built set, plus the merge itself |
| `directory-extra.ts` | Later hand additions |
| `directory-state-boost.ts` | Per-state fills with long capability notes |
| `directory-outreach.ts` | **Generated.** Do not hand-edit — see below |
| `fromStateShops()` | Shops derived from the state landing pages |

## The generated file

`src/lib/directory-outreach.ts` is written by
`scripts/ingest-directory-tsv.ts` from the TSVs in
`scripts/directory-research/`. Regenerate with:

```
npm run directory:ingest
```

The TSVs live in the repo on purpose. They were research output, and if they sat
in `/tmp` the generated file could never be rebuilt or audited — the provenance
of 129 companies would exist only in a chat log.

### Inputs

`found-*.tsv` are research passes: association rosters, trade show exhibitor
lists, under-covered states, and trade directory listings.

`resolved-*.tsv` are verification passes over rows that arrived without a
website. Each row carries a status:

- **OK** — a real website that was actually loaded and matched to that company
- **NOSITE** — company confirmed operating, but no website exists
- **EXCLUDE** — closed, acquired, a distributor, or not a forming floor

`resolved-override.tsv` is applied last and wins. It currently holds six
companies out of the directory that had **neither a website nor any
confirmation they still trade** — real phone numbers and addresses, but only
legacy listings behind them. They are one phone call from being listed; flip the
status to `NOSITE` when that call happens.

### Rules the script enforces

- A row needs a website **or** a verification status, otherwise it is dropped.
  An entry with no website and no confirmation is a lead a buyer cannot act on.
- Deduped against the live directory by website hostname and normalized name,
  so a re-run cannot double-list a shop.
- Deduped against its own prior output, which is what makes re-running safe
  once the generated file is wired into the merge.
- Slugs are disambiguated with a state suffix on collision, and the resolved
  slug is stored rather than recomputed — recomputing at write time silently
  discarded the disambiguation.
- Distributors, catalog houses, and non-forming floors are rejected by name
  pattern and by the verification pass.

### The one failure that looks like success

A resolution row that matches no researched row is a verified company thrown
away quietly. The script now prints those, and the count should stay near zero.
Two remain, both `EXCLUDE` verdicts whose target rows were rejected anyway.

Name matching runs exact, then legal-suffix-stripped, then the first eight
characters of the name — each fallback only when it points at exactly one row.
The looser tiers exist because verification passes return fuller legal names
than the listings they came from. Where a pass renamed a company outright, the
research TSV was corrected to the verified name instead of loosening the match
further:

| Listed as | Verified as |
| --- | --- |
| Monarch Spring & Mfg (Shrewsbury, MA) | Minuteman Spring Company (Millbury, MA) |
| Tremac Corp (Xenia, OH) | Timac Spring Manufacturing (Xenia, OH) |

## Data quality notes

`state` must be a two-letter US state or Canadian province. It feeds the
same-state ranking boost in `source-match.ts` and the state landing pages, so a
placeholder like `Multiple` makes a shop unmatchable and invisible. Newcomb
Spring was filed that way and is now filed under its Georgia plant, with the
other seven plants named in the description.

One entry per company, not per plant. Multi-plant shops are filed at the plant
that matters for locale. If same-state matching starts mattering more than it
does now, per-plant entries are the fix, and that is a schema change.
