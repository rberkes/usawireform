export const SOURCE_SECONDARY_LOOKUP = "source_secondary";
export const SOURCE_SECONDARY_CENTS = 500;

export const SOURCE_SECONDARIES = [
  {
    id: "end-forming",
    label: "End forming",
    href: "/processes/end-forming",
  },
  {
    id: "resistance-welding",
    label: "Resistance welding",
    href: "/processes/resistance-welding",
  },
  {
    id: "mig-tig-assembly",
    label: "MIG / TIG",
    href: "/processes/mig-tig-assembly",
  },
  {
    id: "plating-and-coating",
    label: "Plating and coating",
    href: "/processes/plating-and-coating",
  },
  {
    id: "heat-treating",
    label: "Heat treating",
    href: "/processes/heat-treating",
  },
  {
    id: "inspection",
    label: "Inspection",
    href: "/processes/inspection",
  },
] as const;

export type SourceSecondaryId = (typeof SOURCE_SECONDARIES)[number]["id"];

export function isSourceSecondaryId(
  value: string | undefined | null,
): value is SourceSecondaryId {
  return SOURCE_SECONDARIES.some((row) => row.id === value);
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

export function secondaryLabel(id: string) {
  return SOURCE_SECONDARIES.find((row) => row.id === id)?.label ?? id;
}

export function secondaryHref(id: string) {
  return SOURCE_SECONDARIES.find((row) => row.id === id)?.href;
}

export function formatSecondaryPrice(count: number) {
  if (count <= 0) return "Free";
  return `$${(count * SOURCE_SECONDARY_CENTS) / 100}/mo`;
}
