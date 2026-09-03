import type { SourceMachine, SourceProfile } from "@/lib/source-types";

/** Legacy per-cell slots. Matching now uses the company fullness slider. */
export const SOURCE_SLOT_CAP = 10;

/** After this, last week's number is stale and gets no match boost. */
export const SOURCE_CAPACITY_STALE_MS = 8 * 24 * 60 * 60 * 1000;

export const SOURCE_CAPACITY_LINE =
  "One slider for the plant. 0% full means you need work — matching sends more jobs that already fit your cells. 100% full means no capacity. File it every week. We email you on the 1st and the 15th. Free.";

export type SourceCapacitySnap = {
  fullPercent: number;
  openSlots: number;
  capacityAt: string;
  fresh: boolean;
};

export function parseOpenSlots(raw: unknown): number | undefined {
  if (raw === "" || raw == null) return undefined;
  const n = Number(String(raw).trim());
  if (!Number.isFinite(n)) return undefined;
  return Math.min(SOURCE_SLOT_CAP, Math.max(0, Math.round(n)));
}

export function parseFullPercent(raw: unknown): number | undefined {
  if (raw === "" || raw == null) return undefined;
  const n = Number(String(raw).trim());
  if (!Number.isFinite(n)) return undefined;
  return Math.min(100, Math.max(0, Math.round(n)));
}

export function openSlotsFromFullPercent(fullPercent: number) {
  return Math.round((100 - fullPercent) / SOURCE_SLOT_CAP);
}

export function fullPercentFromOpenSlots(openSlots: number) {
  return 100 - openSlots * SOURCE_SLOT_CAP;
}

function snapFrom(
  fullPercent: number,
  capacityAt: string,
): SourceCapacitySnap | undefined {
  const at = Date.parse(capacityAt);
  if (!Number.isFinite(at)) return undefined;
  return {
    fullPercent,
    openSlots: openSlotsFromFullPercent(fullPercent),
    capacityAt,
    fresh: Date.now() - at <= SOURCE_CAPACITY_STALE_MS,
  };
}

export function withCapacity(machine: SourceMachine): SourceMachine {
  const openSlots = parseOpenSlots(machine.openSlots);
  const capacityAt = String(machine.capacityAt ?? "").trim() || undefined;
  return {
    ...machine,
    openSlots,
    capacityAt,
  };
}

export function stampMachinesWithShopFullness(
  machines: SourceMachine[],
  snap: SourceCapacitySnap,
): SourceMachine[] {
  return machines.map((cell) => ({
    ...cell,
    openSlots: snap.openSlots,
    capacityAt: snap.capacityAt,
  }));
}

export function readCapacity(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): SourceCapacitySnap | undefined {
  const openSlots = parseOpenSlots(machine.openSlots);
  const capacityAt = String(machine.capacityAt ?? "").trim();
  if (openSlots == null || !capacityAt) return undefined;
  return snapFrom(fullPercentFromOpenSlots(openSlots), capacityAt);
}

export function readShopCapacity(
  profile?: Pick<SourceProfile, "fullPercent" | "capacityAt"> | null,
  cells: SourceMachine[] = [],
): SourceCapacitySnap | undefined {
  const fromProfile = parseFullPercent(profile?.fullPercent);
  const at = String(profile?.capacityAt ?? "").trim();
  if (fromProfile != null && at) {
    return snapFrom(fromProfile, at);
  }
  const fresh = cells
    .map((cell) => readCapacity(cell))
    .filter((row): row is SourceCapacitySnap => Boolean(row));
  if (fresh.length === 0) return undefined;
  return fresh.reduce((hungriest, row) =>
    row.fullPercent < hungriest.fullPercent ? row : hungriest,
  );
}

/** Capability already gated the cell. Hungry fresh shops rank up; full shops rank down. */
export function capacityScoreAdjust(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): number {
  const snap = readCapacity(machine);
  if (!snap?.fresh) return 0;
  const hungry = Math.round(((100 - snap.fullPercent) / 100) * 42 - 18);
  const age = Date.now() - Date.parse(snap.capacityAt);
  const thisWeek = Number.isFinite(age) && age <= 7 * 24 * 60 * 60 * 1000 ? 12 : 0;
  return hungry + thisWeek;
}

export function formatCapacityDay(iso: string) {
  const at = Date.parse(iso);
  if (!Number.isFinite(at)) return iso;
  return new Date(at).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatFullness(snap: SourceCapacitySnap): string {
  if (!snap.fresh) {
    return `Last filed ${formatCapacityDay(snap.capacityAt)} — file this week`;
  }
  if (snap.fullPercent === 0) return "0% full — needs work";
  if (snap.fullPercent === 100) return "100% full — no capacity";
  return `${snap.fullPercent}% full this week`;
}

export function formatCapacity(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): string | undefined {
  const snap = readCapacity(machine);
  if (!snap) return undefined;
  return formatFullness(snap);
}

export function formatCapacityWhy(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): string {
  const snap = readCapacity(machine);
  if (!snap?.fresh) return "";
  if (snap.fullPercent === 0) return "needs work this week (0% full)";
  if (snap.fullPercent === 100) return "full this week — no capacity";
  return `${snap.fullPercent}% full this week`;
}

export function shopCapacityLine(
  profile?: Pick<SourceProfile, "fullPercent" | "capacityAt"> | null,
  cells: SourceMachine[] = [],
): string | undefined {
  const snap = readShopCapacity(profile, cells);
  if (!snap?.fresh) return undefined;
  return formatFullness(snap);
}

export function capacityNeedsRefresh(
  profile?: Pick<SourceProfile, "fullPercent" | "capacityAt"> | null,
  cells: SourceMachine[] = [],
): boolean {
  return !readShopCapacity(profile, cells)?.fresh;
}
