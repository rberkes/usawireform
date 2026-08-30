export const SOURCE_SECONDARY_LOOKUP = "source_secondary";

export const SOURCE_SECONDARY_PACKS = [
  {
    id: "three",
    slots: 3,
    priceCents: 1900,
    lookupKey: "source_secondaries_3",
    name: "Three secondaries",
    blurb: "Up to 3 of your top secondaries on the listing and in machine search.",
  },
  {
    id: "six",
    slots: 6,
    priceCents: 4900,
    lookupKey: "source_secondaries_6",
    name: "Six secondaries",
    blurb: "Six maximum. The rest stay off the listing.",
  },
] as const;

export type SourceSecondaryPack = (typeof SOURCE_SECONDARY_PACKS)[number];
export type SourceSecondaryPackId = SourceSecondaryPack["id"];

export const SOURCE_SECONDARY_TOP = SOURCE_SECONDARY_PACKS[0].slots;
export const SOURCE_SECONDARY_MAX = SOURCE_SECONDARY_PACKS[1].slots;

export const SOURCE_SECONDARY_LINE =
  "Up to 3 of your top secondaries $19/mo. Six maximum $49/mo.";

type SecondaryRow = {
  id: string;
  label: string;
  hay: string;
  href?: string;
};

/** Ops a shop can file. Buyers search these names. Pick 3, or 6 max. */
export const SOURCE_SECONDARIES = [
  {
    id: "zinc-coating",
    label: "Zinc coating",
    hay: "zinc plat zinc coat zinc-nickel zinc nickel rack zinc",
    href: "/processes/plating-and-coating",
  },
  {
    id: "zinc-nickel",
    label: "Zinc-nickel",
    hay: "zinc nickel zinc-nickel zn ni",
    href: "/processes/plating-and-coating",
  },
  {
    id: "powder-coating",
    label: "Powder coating",
    hay: "powder coat powdercoat",
    href: "/processes/plating-and-coating",
  },
  {
    id: "e-coat",
    label: "E-coat",
    hay: "ecoat e coat electrophoretic ktl",
    href: "/processes/plating-and-coating",
  },
  {
    id: "anodizing",
    label: "Anodizing",
    hay: "anodiz anodis",
    href: "/processes/plating-and-coating",
  },
  {
    id: "black-oxide",
    label: "Black oxide",
    hay: "black oxide blackoxide",
    href: "/processes/plating-and-coating",
  },
  {
    id: "nickel-plating",
    label: "Nickel plating",
    hay: "nickel plat nickle plat electroless nickel",
    href: "/processes/plating-and-coating",
  },
  {
    id: "chrome-plating",
    label: "Chrome plating",
    hay: "chrome plat chromium plat",
    href: "/processes/plating-and-coating",
  },
  {
    id: "plating-and-coating",
    label: "Plating and coating",
    hay: "plating coating",
    href: "/processes/plating-and-coating",
  },
  {
    id: "tig-welding",
    label: "TIG welding",
    hay: "tig weld gtaw",
    href: "/processes/mig-tig-assembly",
  },
  {
    id: "mig-welding",
    label: "MIG welding",
    hay: "mig weld gmaw",
    href: "/processes/mig-tig-assembly",
  },
  {
    id: "resistance-welding",
    label: "Resistance welding",
    hay: "resistance weld projection weld spot weld cross wire",
    href: "/processes/resistance-welding",
  },
  {
    id: "laser-welding",
    label: "Laser welding",
    hay: "laser weld",
  },
  {
    id: "robotic-welding",
    label: "Robotic welding",
    hay: "robotic weld robot weld weld robot",
  },
  {
    id: "press-brake",
    label: "Press brake",
    hay: "press brake pressbrake brake press",
  },
  {
    id: "end-threading",
    label: "End threading",
    hay: "end thread threaded end thread roll roll thread",
    href: "/processes/end-forming",
  },
  {
    id: "end-forming",
    label: "End forming",
    hay: "end forming endform end form chamfer swage",
    href: "/processes/end-forming",
  },
  {
    id: "heat-treating",
    label: "Heat treating",
    hay: "heat treat heat treating heattreat stress relief",
    href: "/processes/heat-treating",
  },
  {
    id: "coining",
    label: "Coining",
    hay: "coining coined",
  },
  {
    id: "cold-heading",
    label: "Cold heading",
    hay: "cold head coldhead",
  },
  {
    id: "passivation",
    label: "Passivation",
    hay: "passivat",
  },
  {
    id: "tumbling",
    label: "Tumbling",
    hay: "tumbl vibratory",
  },
  {
    id: "inspection",
    label: "Inspection",
    hay: "inspection cmm fixture first article",
    href: "/processes/inspection",
  },
] as const satisfies readonly SecondaryRow[];

const LEGACY_SECONDARIES = [
  {
    id: "mig-tig-assembly",
    label: "MIG / TIG",
    hay: "mig weld tig weld gmaw gtaw",
    href: "/processes/mig-tig-assembly",
  },
] as const satisfies readonly SecondaryRow[];

const ALL_SECONDARIES = [...SOURCE_SECONDARIES, ...LEGACY_SECONDARIES];
const SECONDARY_IDS = new Set<string>(ALL_SECONDARIES.map((row) => row.id));

export type SourceSecondaryId =
  | (typeof SOURCE_SECONDARIES)[number]["id"]
  | (typeof LEGACY_SECONDARIES)[number]["id"];

export function isSourceSecondaryId(
  value: string | undefined | null,
): value is SourceSecondaryId {
  return Boolean(value && SECONDARY_IDS.has(value));
}

export function parseSourceSecondaries(raw: unknown): SourceSecondaryId[] {
  const values = Array.isArray(raw) ? raw : [];
  const ids: SourceSecondaryId[] = [];
  for (const value of values) {
    const id = String(value ?? "").trim();
    if (isSourceSecondaryId(id) && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

/** Old MIG/TIG bucket becomes the two named welds on the form. */
export function secondariesForForm(raw: unknown): SourceSecondaryId[] {
  const ids: SourceSecondaryId[] = [];
  for (const id of parseSourceSecondaries(raw)) {
    if (id === "mig-tig-assembly") {
      for (const next of ["mig-welding", "tig-welding"] as const) {
        if (!ids.includes(next)) ids.push(next);
      }
      continue;
    }
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

export function secondaryLabel(id: string) {
  return ALL_SECONDARIES.find((row) => row.id === id)?.label ?? id;
}

export function secondaryHref(id: string) {
  const row = ALL_SECONDARIES.find((item) => item.id === id);
  return row && "href" in row ? row.href : undefined;
}

export function secondarySearchHay(id: string) {
  return ALL_SECONDARIES.find((row) => row.id === id)?.hay ?? secondaryLabel(id);
}

export function packById(id: string | undefined | null) {
  return SOURCE_SECONDARY_PACKS.find((pack) => pack.id === id);
}

export function packByLookupKey(key: string | null | undefined) {
  return SOURCE_SECONDARY_PACKS.find((pack) => pack.lookupKey === key);
}

export function packForCount(count: number) {
  if (count <= 0) return undefined;
  if (count <= SOURCE_SECONDARY_TOP) return SOURCE_SECONDARY_PACKS[0];
  return SOURCE_SECONDARY_PACKS[1];
}

export function formatSecondaryPrice(count: number) {
  const pack = packForCount(count);
  if (!pack) return "Free";
  return `$${(pack.priceCents / 100).toFixed(0)}/mo`;
}

export function isSourceSecondaryPrice(price: {
  lookup_key?: string | null;
  metadata?: Record<string, string> | null;
} | null) {
  if (!price) return false;
  if (price.metadata?.source_addon === "secondary") return true;
  const key = price.lookup_key ?? "";
  return (
    key === SOURCE_SECONDARY_LOOKUP ||
    SOURCE_SECONDARY_PACKS.some((pack) => pack.lookupKey === key)
  );
}
