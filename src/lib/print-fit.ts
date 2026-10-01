import { WIRE } from "@/lib/range";
import {
  isSourceJobClass,
  type SourceJobClassKind,
} from "@/lib/source-types";
import { parseWireMm } from "@/lib/source-match";

/** Homepage drop and header primary CTA. */
export const UPLOAD_PRINT_HREF = "/#upload";

export const THIS_FLOOR_ESTIMATE_HREF = "/instant-quote";

/** Grades this Ohio cell actually talks about running. */
export const THIS_FLOOR_MATERIAL_IDS = [
  "1018",
  "bright",
  "galvanized",
  "304",
  "316",
  "330",
] as const;

export type PrintFitInput = {
  diameterRaw: string;
  kind: string;
  materialId: string;
};

export type PrintFitCheck = {
  label: string;
  ok: boolean;
  detail: string;
};

export type PrintFitResult = {
  route: "need-spec" | "this-floor" | "source";
  thisFloor: boolean;
  title: string;
  body: string;
  sourceHref: string;
  floorHref?: string;
  checks: PrintFitCheck[];
  diameterMm: number | null;
  kind: SourceJobClassKind | null;
  materialId: string;
};

export function sourceJobHref(input: {
  kind?: string | null;
  diameter?: string | null;
  material?: string | null;
}) {
  const params = new URLSearchParams();
  if (input.kind) params.set("kind", input.kind);
  if (input.diameter) params.set("diameter", input.diameter);
  if (input.material) params.set("material", input.material);
  const query = params.toString();
  return query ? `/source?${query}#job` : "/source#job";
}

export function thisFloorEstimateHref(diameterMm: number | null) {
  if (diameterMm == null) return THIS_FLOOR_ESTIMATE_HREF;
  return `${THIS_FLOOR_ESTIMATE_HREF}?diameter=${encodeURIComponent(String(diameterMm))}`;
}

export function isThisFloorMaterial(materialId: string) {
  return (THIS_FLOOR_MATERIAL_IDS as readonly string[]).includes(materialId);
}

function diameterInThisFloorBand(diameterMm: number) {
  return (
    diameterMm + 0.05 >= WIRE.minMm && diameterMm - 0.05 <= WIRE.maxMm
  );
}

export function assessPrintFit(input: PrintFitInput): PrintFitResult {
  const diameterRaw = input.diameterRaw.trim();
  const diameterMm = parseWireMm(diameterRaw);
  const kind = isSourceJobClass(input.kind) ? input.kind : null;
  const materialId = input.materialId.trim();
  const inBand = diameterMm != null && diameterInThisFloorBand(diameterMm);
  const typicalMaterial = !materialId || isThisFloorMaterial(materialId);
  const thisFloor = kind === "3D CNC" && inBand && typicalMaterial;

  const checks: PrintFitCheck[] = [
    {
      label: "Wire diameter",
      ok: diameterMm != null,
      detail:
        diameterMm != null
          ? inBand
            ? `${diameterMm} mm is inside the ${WIRE.short} Ohio band.`
            : `${diameterMm} mm is outside ${WIRE.short}. Not this floor.`
          : "Enter a size in mm or inches (8 mm, 3/8 in).",
    },
    {
      label: "Cell",
      ok: kind != null,
      detail:
        kind == null
          ? "Pick 2D, 3D, straighten-and-cut, or another cell class."
          : kind === "3D CNC"
            ? "3D CNC is the Robomac class on this floor."
            : `${kind} is not the Ohio 3D cell.`,
    },
    {
      label: "Material",
      ok: true,
      detail: !materialId
        ? "Grade optional. Carbon and 300-series stainless are typical here."
        : typicalMaterial
          ? `${materialId} is a grade this floor talks about running.`
          : `${materialId} is not a typical this-floor coil — Source first.`,
    },
  ];

  const href = sourceJobHref({
    kind,
    diameter: diameterRaw || (diameterMm != null ? `${diameterMm} mm` : ""),
    material: materialId,
  });

  if (!kind || diameterMm == null) {
    return {
      route: "need-spec",
      thisFloor: false,
      title: "Need diameter and a cell class",
      body: "We do not read the CAD in the browser. Diameter and 2D vs 3D (or another cell) decide the match. The file goes with you to Source.",
      sourceHref: href,
      checks,
      diameterMm,
      kind,
      materialId,
    };
  }

  if (thisFloor) {
    return {
      route: "this-floor",
      thisFloor: true,
      title: "This Ohio cell can run it",
      body: `${diameterMm} mm 3D on the Robomac 214TF (${WIRE.short}). Source still matches other shops that filed a 3D cell. The this-floor estimate is cuts, bends, and inches — not a production price, and not a multi-shop checkout.`,
      sourceHref: href,
      floorHref: thisFloorEstimateHref(diameterMm),
      checks,
      diameterMm,
      kind,
      materialId,
    };
  }

  const why = !inBand
    ? `${diameterMm} mm sits outside ${WIRE.short}.`
    : kind !== "3D CNC"
      ? `${kind} is not the Robomac 3D cell.`
      : "That grade is not a typical this-floor coil.";

  return {
    route: "source",
    thisFloor: false,
    title: "Not this Ohio floor — Source can match a cell",
    body: `${why} We do not invent a price across the directory. Source matches shops that filed this diameter and cell. They quote after they see the print.`,
    sourceHref: href,
    checks,
    diameterMm,
    kind,
    materialId,
  };
}
