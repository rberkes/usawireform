/**
 * Fit-routing checks for the homepage upload hero.
 * Run with `npx tsx src/lib/print-fit-validation.ts` (wired into npm run validate).
 */

import { WIRE } from "./range";
import {
  assessPrintFit,
  sourceJobHref,
  thisFloorEstimateHref,
} from "./print-fit";

type ValidationError = {
  field: string;
  message: string;
};

function expect(
  errors: ValidationError[],
  field: string,
  ok: boolean,
  message: string,
) {
  if (!ok) errors.push({ field, message });
}

export function validatePrintFit(): ValidationError[] {
  const errors: ValidationError[] = [];

  const missing = assessPrintFit({
    diameterRaw: "",
    kind: "",
    materialId: "",
  });
  expect(errors, "need-spec", missing.route === "need-spec", "Empty input must ask for diameter and cell");
  expect(errors, "need-spec-floor", missing.thisFloor === false, "Empty input is not this floor");

  const ohio = assessPrintFit({
    diameterRaw: "8 mm",
    kind: "3D CNC",
    materialId: "1018",
  });
  expect(errors, "ohio-route", ohio.route === "this-floor", "8 mm 3D 1018 should hit this floor");
  expect(errors, "ohio-mm", ohio.diameterMm === 8, `Expected 8 mm, got ${ohio.diameterMm}`);
  expect(errors, "ohio-source", ohio.sourceHref.includes("kind=3D") && ohio.sourceHref.includes("8"), "This-floor result still routes to Source with spec");
  expect(errors, "ohio-floor-href", ohio.floorHref === thisFloorEstimateHref(8), "This-floor estimate should carry the diameter");

  const fraction = assessPrintFit({
    diameterRaw: "3/8 in",
    kind: "3D CNC",
    materialId: "",
  });
  expect(errors, "fraction-floor", fraction.route === "this-floor", "3/8 in 3D with unknown grade is still this floor");
  expect(
    errors,
    "fraction-mm",
    fraction.diameterMm != null && Math.abs(fraction.diameterMm - 9.53) < 0.02,
    `3/8 in should parse near 9.53 mm, got ${fraction.diameterMm}`,
  );

  const thin = assessPrintFit({
    diameterRaw: "2 mm",
    kind: "3D CNC",
    materialId: "1018",
  });
  expect(errors, "thin", thin.route === "source" && !thin.thisFloor, "2 mm 3D is Source, not this floor");
  expect(errors, "thin-href", !thin.floorHref, "Out-of-band jobs must not offer a this-floor estimate");

  const twoD = assessPrintFit({
    diameterRaw: "8 mm",
    kind: "2D CNC",
    materialId: "1018",
  });
  expect(errors, "2d", twoD.route === "source" && !twoD.thisFloor, "2D in-band is Source, not the 3D Ohio cell");

  const fourslide = assessPrintFit({
    diameterRaw: "8 mm",
    kind: "Fourslide",
    materialId: "1018",
  });
  expect(errors, "fourslide", fourslide.route === "source", "Fourslide must not claim this floor");

  const music = assessPrintFit({
    diameterRaw: "8 mm",
    kind: "3D CNC",
    materialId: "music",
  });
  expect(errors, "music", music.route === "source" && !music.thisFloor, "Music wire is Source-first");

  const edgeLow = assessPrintFit({
    diameterRaw: String(WIRE.minMm),
    kind: "3D CNC",
    materialId: "304",
  });
  expect(errors, "edge-low", edgeLow.route === "this-floor", `${WIRE.minMm} mm 3D 304 should be this floor`);

  const edgeHigh = assessPrintFit({
    diameterRaw: String(WIRE.maxMm),
    kind: "3D CNC",
    materialId: "galvanized",
  });
  expect(errors, "edge-high", edgeHigh.route === "this-floor", `${WIRE.maxMm} mm 3D galvanized should be this floor`);

  const heavy = assessPrintFit({
    diameterRaw: "16 mm",
    kind: "3D CNC",
    materialId: "1018",
  });
  expect(errors, "heavy", heavy.route === "source" && !heavy.floorHref, "16 mm must not offer the Ohio estimate");

  const href = sourceJobHref({
    kind: "3D CNC",
    diameter: "8 mm",
    material: "1018",
  });
  expect(errors, "href", href.startsWith("/source?") && href.endsWith("#job"), "Source href must keep the job hash");
  expect(
    errors,
    "href-params",
    href.includes("kind=3D+CNC") && href.includes("diameter=8") && href.includes("material=1018"),
    `Unexpected Source href ${href}`,
  );

  return errors;
}

if (require.main === module || process.argv[1]?.includes("print-fit-validation")) {
  const errors = validatePrintFit();
  if (errors.length === 0) {
    console.log("✓ Print-fit validation passed");
    process.exit(0);
  }
  console.error("✗ Print-fit validation failed:");
  for (const error of errors) {
    console.error(`  [${error.field}] ${error.message}`);
  }
  process.exit(1);
}
