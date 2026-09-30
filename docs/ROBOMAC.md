# Robomac 214TF digital twin

First engineering layer for CAD → DFM → quote. **Not a site redesign.**

The customer-facing upload page is later. This file is the machine.

## Principle

Geometry / physics / machine rules = truth.

AI = explanation only. It does not decide whether a part fits the 214TF.

## Where it lives

| Piece | Path |
| --- | --- |
| Schema (table shapes) | `src/lib/robomac/types.ts` |
| Seed tables | `src/lib/robomac/tables.ts` |
| DFM engine | `src/lib/robomac/dfm.ts` |
| Fixtures | `src/lib/robomac/fixtures.ts` |
| Validate | `npx tsx src/lib/robomac/validate.ts` |
| STEP → centerline | `src/lib/robomac/step-extract.ts` |
| Desk inspector | `/admin/robomac` (password) |

Rows are typed like Postgres tables (`machines`, `machine_capabilities`, `machine_tooling`, `machine_rules`, `materials`, plus empty production-feedback tables). The site still stores jobs in Blob. Do not stand up Supabase until the twin is being written from the floor.

Every number has provenance: `published_catalog`, `shop_practice`, `shop_measured`, `production_observed`, `estimated`, or `unknown`. **Unknown stays unknown.** Do not invent bend-head millimeters.

## What is known

- Plate: Numalliance Robomac R214TF, 4–14 mm at 600 N/mm² (85 ksi). 3D from coil. Head orbits the wire.
- This floor: one cell, Northeast Ohio, **two heads**. Instant estimate is this machine.
- Wipe / pin head: regular angle bends, about 20–180°, **0.500 in pin**. Eyes / S-hooks (~240°) still wrap on this head. Pin Ø is tooling — not a 0.5×D override of the material radius floor.
- Push head: rings in **1/2 in** wire, **6 in min centerline radius** to **30 in max centerline diameter**. Other diameters are not stated — do not scale.
- Stock pins: 3/8, 7/16, 1/2 in. Other sizes in band: 7–10 days, about $3,500.
- Staple-crown wraps on those pins are documented in `ground-staple-builder.ts`. The 3/8 in 0.200 in IR is **staple only** — not a general 0.5×D override.
- Design-guide floors: mild carbon ≥ 1×D inside radius; stainless / high-tensile 1.5–2×D; soft copper / aluminum can go tighter and marks.
- Straights: fail below 2×D, review 2–3×D, pass at ≥ 3×D.
- Closed loops trap on the mandrel unless there is a gap, a weld, or a strip sequence.
- Shop eyes / S-hooks wrap ~240°. Phase 1 ceiling 270°.
- Shop-run coils on this cell: **1018, 304, 330, 6061-T6**. Each alloy has its own price.
- Quote formula: `piece = cuts×cutUsd + bends×bendUsd + lengthIn×inchUsd + weightLb×materialUsdPerLb`. Material $/lb is a later input. Only 1018 forming is filed ($1/cut, $0.50/bend, $0.05/in). Do not invent coil dollars or 304 / 330 / 6061-T6 forming rates.

## What is not measured

Do not ship collision DFM until these are tape / program values from this 214TF:

- Bend-head solid and clearance envelope
- Tool solids (beyond stock pin IR)
- Feed axis limits
- Rotation stops (orbit is free; formed legs are the limit)
- Work-envelope / fence / decoiler
- Springback by alloy × diameter × pin (current table is a starting guess)
- Actual cycle time, setup, scrap
- Forming dollars for 304, 330, and 6061-T6 (1018 uses the published Ask card)
- Material $/lb for every alloy (plug into the formula when the desk has it)

The brief’s “bend 7, 28 mm required / 19 mm available” is the **shape** of a Phase 2 issue, not a number from this floor.

## Phase 1 engine

`evaluateWireForm(geometry)` takes a centerline sequence:

```
S1 straight 122.0 mm
B1 90° R19.05
S2 straight 181.4 mm
B2 45° R19.05
ROT 90°
B3 90° R19.05
```

and returns PASS / REVIEW / FAIL plus structured issues (`problem`, `cause`, `availableMm`, `requiredMm`, `recommendedChange`, `customerExplanation`).

Phase 2 checks are listed on every result as `pendingPhase2` and stay unimplemented.

## STEP → centerline

`extractWireForm(bytes, fileName, materialId)` reads a round-wire solid STEP (ISO-10303-21). It does **not** mesh the file.

1. Parse cylinders and tori.
2. Take the modal minor/cylinder radius as wire diameter. Units come from `SI_UNIT(.MILLI.,.METRE.)` or `CONVERSION_BASED_UNIT('INCH')`.
3. Walk each `ADVANCED_FACE` so only that face’s vertices set axis length / torus sweep.
4. Chain pieces whose endpoints sit within a few wire radii.
5. Split the polyline into S / B / ROT by turning angle.
6. Hand the geometry to `evaluateWireForm()`.

Desk path: `/admin/robomac` upload. CLI: `npx tsx src/lib/robomac/extract-cli.ts path/to/part.step [materialId]`.

The golden fixture `src/lib/robomac/fixtures/l-hook.step` is a 12.7 mm L: 120 mm, 90° at R12.7, 80 mm. Catalog STEPs under `public/models/` are used to lock diameter (CadQuery polyline sweeps discretize crowns — sequence quality is best on analytic SolidWorks cylinders/tori).

IGES, SLDPRT, and `.stpz` are out of this pass.

## What not to do yet

- Do not redesign USAWireForm.com around this.
- Do not tell Ask or public pages that CAD DFM is live.
- Do not treat estimated tripwires (2 m / 6 m developed length, 2×D cutoff) as plate limits.
- Do not fold a named-band Source schema migration into this work. See [STRATEGY.md](./STRATEGY.md).
