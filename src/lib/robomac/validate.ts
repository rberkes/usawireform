/**
 * Build-time validation for the Robomac 214TF twin.
 * Run with: npx tsx src/lib/robomac/validate.ts
 */

import { COMMON_SIZES, WIRE } from "@/lib/range";
import { evaluateWireForm } from "./dfm";
import { TWIN_FIXTURES } from "./fixtures";
import { ROBOMAC_214TF, ROBOMAC_MACHINE_ID, twinTables } from "./tables";

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
      if (row.cutUsd == null || row.bendUsd == null || row.inchUsd == null) {
        errors.push({ where: row.id, message: "1018 card must have filed rates" });
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
