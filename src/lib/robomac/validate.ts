/**
 * Build-time validation for the Robomac 214TF twin.
 * Run with: npx tsx src/lib/robomac/validate.ts
 */

import { COMMON_SIZES, WIRE } from "@/lib/range";
import { evaluateWireForm } from "./dfm";
import { carbonWeightLb, priceCadDfm } from "./cad-quote";
import { QUOTE_FORMULA, quoteRobomacPiece } from "./quote";
import { TWIN_FIXTURES } from "./fixtures";
import {
  MATERIAL_MARKUP_RATE,
  ROBOMAC_214TF,
  ROBOMAC_MACHINE_ID,
  twinTables,
} from "./tables";

type ValidationError = {
  where: string;
  message: string;
};

export function validateTwin(): ValidationError[] {
  const errors: ValidationError[] = [];
  const tables = twinTables();
  const ids = new Set<string>();

  function takeId(where: string, id: string) {
    if (!id.trim()) {
      errors.push({ where, message: "Empty id" });
      return;
    }
    if (ids.has(id)) {
      errors.push({ where, message: `Duplicate id ${id}` });
      return;
    }
    ids.add(id);
  }

  if (ROBOMAC_214TF.headCount !== 2) {
    errors.push({
      where: "machine",
      message: `This floor has two heads, not ${ROBOMAC_214TF.headCount}`,
    });
  }

  if (ROBOMAC_214TF.id !== ROBOMAC_MACHINE_ID) {
    errors.push({
      where: "machine",
      message: `Machine id ${ROBOMAC_214TF.id} != ${ROBOMAC_MACHINE_ID}`,
    });
  }

  const wire = tables.machine_capabilities.find(
    (row) => row.key === "wire_diameter_mm",
  );
  if (!wire || wire.min !== WIRE.minMm || wire.max !== WIRE.maxMm) {
    errors.push({
      where: "cap-wire-band",
      message: `Twin band must match WIRE ${WIRE.minMm}–${WIRE.maxMm} mm`,
    });
  }

  for (const row of tables.machines) takeId("machines", row.id);
  for (const row of tables.machine_heads) {
    takeId("heads", row.id);
    if (row.machineId !== ROBOMAC_MACHINE_ID) {
      errors.push({ where: row.id, message: `head machineId ${row.machineId}` });
    }
    if (!row.provenance?.kind || !row.provenance.source) {
      errors.push({ where: row.id, message: "Missing provenance" });
    }
  }
  const kinds = tables.machine_heads.map((row) => row.kind).sort().join(",");
  if (kinds !== "push,wipe") {
    errors.push({ where: "heads", message: `Expected wipe+push, got ${kinds}` });
  }
  const wipe = tables.machine_heads.find((row) => row.kind === "wipe");
  const push = tables.machine_heads.find((row) => row.kind === "push");
  if (wipe?.pinDiameterIn !== 0.5) {
    errors.push({ where: "head-wipe", message: "Wipe pin must be 0.500 in" });
  }
  if (!push || push.maxRingDiameterIn !== 30 || push.minRingRadiusIn !== 6) {
    errors.push({
      where: "head-push",
      message: "Push envelope on 1/2 in is 6 in min R to 30 in max Ø",
    });
  }
  for (const row of tables.machine_capabilities) {
    takeId("capabilities", row.id);
    if (row.machineId !== ROBOMAC_MACHINE_ID) {
      errors.push({
        where: row.id,
        message: `capability machineId ${row.machineId}`,
      });
    }
    if (row.min != null && row.max != null && row.min > row.max) {
      errors.push({ where: row.id, message: "min > max" });
    }
    if (!row.provenance?.kind || !row.provenance.source) {
      errors.push({ where: row.id, message: "Missing provenance" });
    }
  }
  for (const row of tables.machine_tooling) {
    takeId("tooling", row.id);
    if (row.stock && row.use === "general" && row.wireDiameterMm > 0) {
      if (row.wireDiameterMm < WIRE.minMm || row.wireDiameterMm > WIRE.maxMm) {
        errors.push({
          where: row.id,
          message: "Stock tool outside the 214TF band",
        });
      }
    }
  }
  const stockMm = tables.machine_tooling
    .filter((row) => row.stock && row.use === "general" && row.wireDiameterMm > 0)
    .map((row) => row.wireDiameterMm)
    .sort((a, b) => a - b);
  const expectedStock = COMMON_SIZES.map((row) => row.mmValue);
  if (JSON.stringify(stockMm) !== JSON.stringify(expectedStock)) {
    errors.push({
      where: "tooling",
      message: `Stock tools ${stockMm.join(",")} != COMMON_SIZES ${expectedStock.join(",")}`,
    });
  }

  for (const row of tables.machine_rules) {
    takeId("rules", row.id);
    if (row.phase === 1 && !row.implemented) {
      errors.push({
        where: row.id,
        message: "Phase 1 rule must be implemented",
      });
    }
    if (row.phase >= 2 && row.implemented) {
      errors.push({
        where: row.id,
        message: "Phase 2+ rule marked implemented without collision solids",
      });
    }
  }
  for (const row of tables.materials) {
    takeId("materials", row.id);
    if (!row.coilOk) {
      errors.push({ where: row.id, message: "Seed material must be coil-ok" });
    }
    if (row.minInsideRadiusXd <= 0) {
      errors.push({ where: row.id, message: "minInsideRadiusXd must be > 0" });
    }
  }
  const shopRun = tables.materials
    .filter((row) => row.shopRun)
    .map((row) => row.id)
    .sort()
    .join(",");
  if (shopRun !== "1018,304,330,6061") {
    errors.push({
      where: "materials",
      message: `Shop-run coils must be 1018, 304, 330, 6061-T6. Got ${shopRun}`,
    });
  }
  for (const row of tables.material_prices) {
    takeId("prices", row.id);
    if (row.shopRun && row.materialId === "1018") {
      if (row.inchUsd == null) {
        errors.push({ where: row.id, message: "1018 card must have a filed inch rate" });
      }
    }
    if (
      row.shopRun &&
      row.materialId !== "1018" &&
      (row.cutUsd != null || row.bendUsd != null || row.inchUsd != null)
    ) {
      errors.push({
        where: row.id,
        message: "Do not invent 304 / 330 / 6061 dollars until the desk files them",
      });
    }
    if (row.materialUsdPerLb != null) {
      errors.push({
        where: row.id,
        message: "Material $/lb is a later input. Do not invent coil dollars.",
      });
    }
  }

  if (MATERIAL_MARKUP_RATE !== 0.3) {
    errors.push({
      where: "quote-formula",
      message: `Shop material markup must be 30%. Got ${MATERIAL_MARKUP_RATE}`,
    });
  }
  if (!QUOTE_FORMULA.includes("1 + 0.30")) {
    errors.push({
      where: "quote-formula",
      message: `Shop formula must be inch + material × 1.30. Got ${QUOTE_FORMULA}`,
    });
  }
  const formingOnly = quoteRobomacPiece({
    materialId: "1018",
    lengthIn: 10,
  });
  if (
    formingOnly.formingUsd !== 0.5 ||
    formingOnly.pieceUsd !== 0.5 ||
    !formingOnly.materialPending
  ) {
    errors.push({
      where: "quote-formula",
      message: `1018 inch-only should be $0.50 pending material. Got ${formingOnly.pieceUsd}`,
    });
  }
  const withCoil = quoteRobomacPiece({
    materialId: "1018",
    lengthIn: 10,
    weightLb: 2,
    materialUsdPerLb: 1.25,
  });
  if (
    withCoil.materialCostUsd !== 2.5 ||
    withCoil.materialMarkupUsd !== 0.75 ||
    withCoil.materialUsd !== 3.25 ||
    withCoil.pieceUsd !== 3.75
  ) {
    errors.push({
      where: "quote-formula",
      message: `1018 + $1.25/lb × 2 lb × 1.30 should be $3.75. Got ${withCoil.pieceUsd}`,
    });
  }
  const stainless = quoteRobomacPiece({
    materialId: "304",
    lengthIn: 10,
    weightLb: 2,
    materialUsdPerLb: 1.25,
  });
  if (stainless.formingFiled || stainless.pieceUsd != null) {
    errors.push({
      where: "quote-formula",
      message: "304 must not emit a piece price until its inch rate is filed.",
    });
  }

  const brief = TWIN_FIXTURES.find((row) => row.id === "brief-example");
  const short = TWIN_FIXTURES.find((row) => row.id === "short-straight");
  const tightSs = TWIN_FIXTURES.find((row) => row.id === "tight-stainless");
  if (brief) {
    const dfm = evaluateWireForm(brief.geometry);
    const priced = priceCadDfm(brief.geometry, dfm, 100);
    const expectedForming = Math.round((dfm.developedLengthMm / 25.4) * 0.05 * 100) / 100;
    if (!priced.buyable || priced.pieceUsd !== expectedForming) {
      errors.push({
        where: "cad-dfm",
        message: `PASS 1018 CAD should be buyable forming ${expectedForming}. Got ${priced.pieceUsd}`,
      });
    }
    const volume = priceCadDfm(brief.geometry, dfm, 1000);
    const broken = Math.round(expectedForming * 0.95 * 100) / 100;
    if (volume.pieceUsd !== broken) {
      errors.push({
        where: "cad-dfm",
        message: `1,000 pc CAD should be −5%. Got ${volume.pieceUsd}, expected ${broken}`,
      });
    }
    const mass = carbonWeightLb(priced.lengthIn, priced.diameterIn, "1018");
    if (mass == null || mass <= 0) {
      errors.push({
        where: "cad-dfm",
        message: "1018 CAD must emit carbon mass from the V-hook density.",
      });
    }
    if (carbonWeightLb(priced.lengthIn, priced.diameterIn, "304") != null) {
      errors.push({
        where: "cad-dfm",
        message: "Do not invent 304 density.",
      });
    }
  }
  if (short) {
    const dfm = evaluateWireForm(short.geometry);
    const priced = priceCadDfm(short.geometry, dfm, 100);
    if (priced.buyable || priced.pieceUsd != null) {
      errors.push({
        where: "cad-dfm",
        message: "FAIL must not emit a buyable CAD price.",
      });
    }
  }
  if (tightSs) {
    const dfm = evaluateWireForm(tightSs.geometry);
    const priced = priceCadDfm(tightSs.geometry, dfm, 100);
    if (priced.buyable || priced.quote.formingFiled || priced.pieceUsd != null) {
      errors.push({
        where: "cad-dfm",
        message: "304 CAD must not emit a piece price.",
      });
    }
  }

  const unknownCount = [
    ...tables.machine_capabilities,
    ...tables.machine_rules,
  ].filter((row) => row.provenance.kind === "unknown").length;
  if (unknownCount < 3) {
    errors.push({
      where: "provenance",
      message: "Expected measured-unknowns to stay visible (head, feed, collisions)",
    });
  }

  for (const fixture of TWIN_FIXTURES) {
    const result = evaluateWireForm(fixture.geometry);
    if (result.status !== fixture.expect) {
      errors.push({
        where: fixture.id,
        message: `Expected ${fixture.expect}, got ${result.status}: ${result.issues
          .map((issue) => issue.failure ?? issue.check)
          .join(", ")}`,
      });
    }
    if (
      fixture.expectFailure &&
      !result.issues.some((issue) => issue.failure === fixture.expectFailure)
    ) {
      errors.push({
        where: fixture.id,
        message: `Expected failure ${fixture.expectFailure}`,
      });
    }
    if (result.pendingPhase2.length === 0) {
      errors.push({
        where: fixture.id,
        message: "Phase 2 pending list must not be empty",
      });
    }
  }

  return errors;
}

export function twinSummary() {
  const tables = twinTables();
  const fixtures = TWIN_FIXTURES.map((fixture) => ({
    id: fixture.id,
    expect: fixture.expect,
    result: evaluateWireForm(fixture.geometry),
  }));
  return {
    machine: ROBOMAC_214TF.plateName,
    rules: tables.machine_rules.length,
    implemented: tables.machine_rules.filter((row) => row.implemented).length,
    tools: tables.machine_tooling.length,
    materials: tables.materials.length,
    unknowns: [
      ...tables.machine_capabilities,
      ...tables.machine_rules,
    ].filter((row) => row.provenance.kind === "unknown").length,
    fixtures: fixtures.map((row) => ({
      id: row.id,
      status: row.result.status,
      issues: row.result.issues.length,
    })),
  };
}

if (require.main === module || process.argv[1]?.includes("robomac/validate")) {
  const errors = validateTwin();
  const summary = twinSummary();
  if (errors.length === 0) {
    console.log("✓ Robomac 214TF twin");
    console.log(
      `  ${summary.implemented}/${summary.rules} rules implemented · ${summary.tools} tools · ${summary.materials} materials · ${summary.unknowns} unknowns`,
    );
    for (const row of summary.fixtures) {
      console.log(`  ${row.status.padEnd(6)} ${row.id} (${row.issues} issues)`);
    }
    process.exit(0);
  }
  console.error("✗ Robomac 214TF twin failed:");
  for (const error of errors) {
    console.error(`  [${error.where}] ${error.message}`);
  }
  process.exit(1);
}
