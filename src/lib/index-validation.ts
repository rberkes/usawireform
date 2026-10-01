/**
 * Build-time checks for the taxonomy graph and index policy.
 * Run with `npx tsx src/lib/index-validation.ts` (wired into npm run validate).
 */

import { CNC_OEMS } from "./cnc-oems";
import { publishedProcesses } from "./processes";
import { industries } from "./site";
import {
  FORMING_CAPABILITIES,
  FORMING_INDUSTRIES,
  FORMING_MATERIALS,
  isReservedEquipmentSlug,
} from "./taxonomy";
import { shopsForCapability } from "./graph";

type ValidationError = {
  field: string;
  message: string;
};

export function validateIndexGraph(): ValidationError[] {
  const errors: ValidationError[] = [];
  const paths = new Set<string>();

  for (const item of FORMING_CAPABILITIES) {
    if (paths.has(item.path)) {
      errors.push({ field: item.slug, message: `Duplicate capability path ${item.path}` });
    }
    paths.add(item.path);
    if (!item.path.startsWith("/wire-forming/")) {
      errors.push({
        field: item.slug,
        message: `Capability path must live under /wire-forming/ (${item.path})`,
      });
    }
    if (shopsForCapability(item.slug).length === 0) {
      errors.push({
        field: item.slug,
        message: `Capability "${item.slug}" matches zero directory shops`,
      });
    }
    if (item.engineeringHref) {
      const slug = item.engineeringHref.replace(/^\/processes\//, "");
      const processOk = publishedProcesses().some((process) => process.slug === slug);
      const otherOk =
        item.engineeringHref.startsWith("/products/") ||
        item.engineeringHref.startsWith("/guide/");
      if (!processOk && !otherOk) {
        errors.push({
          field: item.slug,
          message: `engineeringHref ${item.engineeringHref} is not a published process or known guide`,
        });
      }
    }
  }

  for (const item of FORMING_MATERIALS) {
    if (paths.has(item.path)) {
      errors.push({ field: item.slug, message: `Duplicate material path ${item.path}` });
    }
    paths.add(item.path);
    if (!item.path.startsWith("/materials/")) {
      errors.push({
        field: item.slug,
        message: `Material path must live under /materials/ (${item.path})`,
      });
    }
  }

  const knownIndustry = new Set<string>(industries.map((item) => item.slug));
  for (const item of FORMING_INDUSTRIES) {
    if (
      !knownIndustry.has(item.slug) &&
      item.slug !== "medical" &&
      item.slug !== "aerospace" &&
      item.slug !== "retail-displays"
    ) {
      errors.push({
        field: item.slug,
        message: `Industry slug ${item.slug} is not in site.industries and is not a new taxonomy page`,
      });
    }
  }

  for (const oem of CNC_OEMS) {
    if (isReservedEquipmentSlug(oem.slug)) {
      errors.push({
        field: oem.slug,
        message: `OEM slug collides with a reserved /equipment/ path`,
      });
    }
  }

  return errors;
}

if (require.main === module || process.argv[1]?.includes("index-validation")) {
  const errors = validateIndexGraph();
  if (errors.length === 0) {
    console.log("✓ Index graph validation passed");
    process.exit(0);
  }
  console.error("✗ Index graph validation failed:");
  for (const error of errors) {
    console.error(`  [${error.field}] ${error.message}`);
  }
  process.exit(1);
}
