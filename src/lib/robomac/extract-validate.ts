import { readFileSync } from "node:fs";
import { join } from "node:path";
import { evaluateWireForm } from "./dfm";
import { developedLengthMm, formatSequence } from "./geometry";
import { extractWireFormFromStep } from "./step-extract";

const ROOT = join(process.cwd());

export type CatalogCase = {
  file: string;
  minDiameterMm: number;
  maxDiameterMm: number;
};

export const CATALOG_CASES: CatalogCase[] = [
  {
    file: "public/models/u-hangers.step",
    minDiameterMm: 9,
    maxDiameterMm: 10,
  },
  {
    file: "public/models/ground-staples.step",
    minDiameterMm: 9,
    maxDiameterMm: 10,
  },
  {
    file: "public/models/s-hooks.step",
    minDiameterMm: 11,
    maxDiameterMm: 14,
  },
  {
    file: "public/models/j-hooks.step",
    minDiameterMm: 9,
    maxDiameterMm: 10,
  },
];

export function validateExtract(verbose = false) {
  const errors: { where: string; message: string }[] = [];
  const goldenPath = "src/lib/robomac/fixtures/l-hook.step";
  const golden = extractWireFormFromStep(
    readFileSync(join(ROOT, goldenPath), "utf8"),
    "1018",
  );
  if (!golden.ok) {
    errors.push({ where: goldenPath, message: golden.message });
  } else {
    const bends = golden.geometry.segments.filter((row) => row.kind === "bend");
    const straights = golden.geometry.segments.filter((row) => row.kind === "straight");
    const dfm = evaluateWireForm(golden.geometry);
    if (golden.geometry.diameterMm < 12.6 || golden.geometry.diameterMm > 12.8) {
      errors.push({
        where: goldenPath,
        message: `diameter ${golden.geometry.diameterMm}, expected 12.7`,
      });
    }
    if (bends.length !== 1 || Math.abs(Math.abs(bends[0].angleDeg) - 90) > 5) {
      errors.push({
        where: goldenPath,
        message: `bends ${JSON.stringify(bends)}, expected one ~90°`,
      });
    }
    if (bends[0] && (bends[0].insideRadiusMm < 12 || bends[0].insideRadiusMm > 13.5)) {
      errors.push({
        where: goldenPath,
        message: `inside R ${bends[0].insideRadiusMm}, expected 12.7`,
      });
    }
    if (straights.length < 2) {
      errors.push({ where: goldenPath, message: `straights ${straights.length}, expected 2` });
    } else {
      if (straights[0].lengthMm < 110 || straights[0].lengthMm > 130) {
        errors.push({
          where: goldenPath,
          message: `S1 ${straights[0].lengthMm} mm, expected ~120`,
        });
      }
      const last = straights[straights.length - 1];
      if (last.lengthMm < 70 || last.lengthMm > 95) {
        errors.push({
          where: goldenPath,
          message: `last straight ${last.lengthMm} mm, expected ~80`,
        });
      }
    }
    if (dfm.status === "FAIL") {
      errors.push({ where: goldenPath, message: `DFM ${dfm.status}` });
    }
    if (verbose) {
      console.log(`\n${goldenPath}`);
      console.log(formatSequence(golden.geometry));
      console.log(`  DFM ${dfm.status}`);
    }
  }

  for (const test of CATALOG_CASES) {
    const result = extractWireFormFromStep(
      readFileSync(join(ROOT, test.file), "utf8"),
      "1018",
    );
    if (!result.ok) {
      errors.push({ where: test.file, message: result.message });
      continue;
    }
    const { geometry, meta } = result;
    if (
      geometry.diameterMm < test.minDiameterMm ||
      geometry.diameterMm > test.maxDiameterMm
    ) {
      errors.push({
        where: test.file,
        message: `diameter ${geometry.diameterMm} mm not in ${test.minDiameterMm}–${test.maxDiameterMm}`,
      });
    }
    if (geometry.segments.length === 0) {
      errors.push({ where: test.file, message: "no segments" });
    }
    if (developedLengthMm(geometry) < 40) {
      errors.push({
        where: test.file,
        message: `developed ${developedLengthMm(geometry)} mm is too short`,
      });
    }
    if (verbose) {
      console.log(`\n${test.file} · ${meta.units} · Ø${geometry.diameterMm}`);
      console.log(formatSequence(geometry));
    }
  }
  return errors;
}

if (require.main === module || process.argv[1]?.includes("extract-validate")) {
  const verbose = process.argv.includes("--verbose");
  const errors = validateExtract(verbose);
  if (errors.length === 0) {
    console.log("✓ STEP centerline (golden L-hook + catalog diameters)");
    process.exit(0);
  }
  console.error("✗ STEP centerline failed:");
  for (const error of errors) {
    console.error(`  [${error.where}] ${error.message}`);
  }
  process.exit(1);
}
