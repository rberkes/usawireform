import type { CatalogGroup } from "./catalog";

export const WIRE_DIAMETERS = [
  { id: "3-8", label: "3/8 in", inches: 0.375 },
  { id: "7-16", label: "7/16 in", inches: 0.4375 },
  { id: "1-2", label: "1/2 in", inches: 0.5 },
] as const;

export type WireDiameterId = (typeof WIRE_DIAMETERS)[number]["id"];

export const WIRE_FINISHES = [
  { id: "carbon", label: "1018 / galv", color: "#8d939a" },
  { id: "stainless", label: "304 / 316", color: "#c8ccd1" },
  { id: "copper", label: "Copper", color: "#b87333" },
] as const;

export type WireFinishId = (typeof WIRE_FINISHES)[number]["id"];

export type ShowcaseModel = {
  id: string;
  title: string;
  productSlug: string;
  group: CatalogGroup;
  summary: string;
  /** Shop-drawn centerline in the viewer. */
  kind: "wire";
};

/**
 * Catalog forms we show as 3D shop models. Each id has a STEP solid at
 * `/models/{id}.step` (3/8 in wire swept from the shop centerline).
 */
export const showcaseModels: ShowcaseModel[] = [
  {
    id: "s-hooks",
    title: "S-hook",
    productSlug: "s-hooks",
    group: "Hooks and rings",
    summary: "Lifting S-hook we form — 1/2 in wire, 6-1/2 in overall.",
    kind: "wire",
  },
  {
    id: "d-rings",
    title: "D-ring",
    productSlug: "d-rings",
    group: "Hooks and rings",
    summary: "D-ring we form — 1/2 in wire, 3-1/2 in overall.",
    kind: "wire",
  },
  {
    id: "j-hooks",
    title: "J-hook",
    productSlug: "j-hooks",
    group: "Hooks and rings",
    summary: "Straight leg and a return radius.",
    kind: "wire",
  },
  {
    id: "closed-rings",
    title: "Closed ring",
    productSlug: "closed-rings",
    group: "Hooks and rings",
    summary: "Full loop from coil. Weld the joint when the print wants it.",
    kind: "wire",
  },
  {
    id: "eye-forms",
    title: "Eye form",
    productSlug: "eye-forms",
    group: "Hooks and rings",
    summary: "Closed eye and a straight leg.",
    kind: "wire",
  },
  {
    id: "u-hangers",
    title: "U-hanger",
    productSlug: "u-hangers",
    group: "Hangers",
    summary: "Two legs and a bottom radius — pipe and hose hang.",
    kind: "wire",
  },
  {
    id: "pipe-hangers",
    title: "Pipe hanger",
    productSlug: "pipe-hangers",
    group: "Hangers",
    summary: "Circle and a stem. Name the pipe OD.",
    kind: "wire",
  },
  {
    id: "hose-hangers",
    title: "Hose hanger",
    productSlug: "hose-hangers",
    group: "Hangers",
    summary: "Stem and stacked returns — a 3D CNC part.",
    kind: "wire",
  },
  {
    id: "handles",
    title: "Handle",
    productSlug: "handles",
    group: "Frames and hardware",
    summary: "Rounded U with mounting legs.",
    kind: "wire",
  },
  {
    id: "ground-staples",
    title: "Ground staple",
    productSlug: "ground-staples",
    group: "Frames and hardware",
    summary: "Inverted U driven into soil or fabric.",
    kind: "wire",
  },
  {
    id: "machine-guards",
    title: "Machine guard",
    productSlug: "machine-guards",
    group: "Grids and trays",
    summary: "Welded grid in stock diameters — not expanded metal.",
    kind: "wire",
  },
  {
    id: "heavy-duty-wire-baskets",
    title: "Wire basket",
    productSlug: "heavy-duty-wire-baskets",
    group: "Grids and trays",
    summary: "Bottom grid and walls from coil, then resistance weld.",
    kind: "wire",
  },
  {
    id: "cable-trays",
    title: "Cable tray",
    productSlug: "cable-trays",
    group: "Grids and trays",
    summary: "U-channel with rungs for plant and data-center runs.",
    kind: "wire",
  },
  {
    id: "fan-guards",
    title: "Fan guard",
    productSlug: "fan-guards",
    group: "Grids and trays",
    summary: "Concentric rings and radials.",
    kind: "wire",
  },
];

const showcaseById = new Map(showcaseModels.map((model) => [model.id, model]));
const showcaseBySlug = new Map(
  showcaseModels.map((model) => [model.productSlug, model]),
);

export function getShowcaseModel(id: string) {
  return showcaseById.get(id) ?? null;
}

export function showcaseForProduct(slug: string) {
  return showcaseBySlug.get(slug) ?? null;
}

export function showcaseHref(slug: string) {
  return `/models?part=${encodeURIComponent(slug)}`;
}

export function showcaseStepPath(id: string) {
  return `/models/${id}.step`;
}

/** Catalog solids that should not be retubed when the diameter control changes. */
export const NATIVE_CAD_PARTS = new Set(["s-hooks", "d-rings"]);
