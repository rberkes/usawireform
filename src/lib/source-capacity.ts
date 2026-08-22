import type { SourceMachine } from "@/lib/source-types";

/** Open slots a shop can file per cell, this week. 10 = 100% open, needs work. */
export const SOURCE_SLOT_CAP = 10;

/** After this, last week's number is stale and gets no match boost. */
export const SOURCE_CAPACITY_STALE_MS = 8 * 24 * 60 * 60 * 1000;

export const SOURCE_CAPACITY_LINE =
  "Each cell has 10 open slots this week. 10/10 is 100% open — you need work, and matching sends more jobs that already fit that cell. 0/10 is full. File it every week. Free. Shop-filed, not a floor walk.";

export type SourceCapacitySnap = {
  openSlots: number;
  percent: number;
  capacityAt: string;
  fresh: boolean;
};

export function parseOpenSlots(raw: unknown): number | undefined {
  if (raw === "" || raw == null) return undefined;
  const n = Number(String(raw).trim());
  if (!Number.isFinite(n)) return undefined;
  return Math.min(SOURCE_SLOT_CAP, Math.max(0, Math.round(n)));
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

export function readCapacity(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): SourceCapacitySnap | undefined {
  const openSlots = parseOpenSlots(machine.openSlots);
  const capacityAt = String(machine.capacityAt ?? "").trim();
  if (openSlots == null || !capacityAt) return undefined;
  const at = Date.parse(capacityAt);
  if (!Number.isFinite(at)) return undefined;
  return {
    openSlots,
    percent: Math.round((openSlots / SOURCE_SLOT_CAP) * 100),
    capacityAt,
    fresh: Date.now() - at <= SOURCE_CAPACITY_STALE_MS,
  };
}

/** Capability already gated the cell. Hungry fresh cells rank up; full cells rank down. */
export function capacityScoreAdjust(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): number {
  const snap = readCapacity(machine);
  if (!snap?.fresh) return 0;
  return Math.round((snap.openSlots / SOURCE_SLOT_CAP) * 42 - 18);
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

export function formatCapacity(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): string | undefined {
  const snap = readCapacity(machine);
  if (!snap) return undefined;
  if (!snap.fresh) {
    return `Last filed ${formatCapacityDay(snap.capacityAt)} — file this week`;
  }
  if (snap.percent === 100) return "10/10 open this week — needs work";
  if (snap.openSlots === 0) return "0/10 open this week — full";
  return `${snap.openSlots}/10 open this week (${snap.percent}%)`;
}

export function formatCapacityWhy(
  machine: Pick<SourceMachine, "openSlots" | "capacityAt">,
): string {
  const snap = readCapacity(machine);
  if (!snap?.fresh) return "";
  if (snap.percent === 100) return "needs work this week (10/10 open)";
  if (snap.openSlots === 0) return "full this week (0/10)";
  return `${snap.openSlots}/10 open this week`;
}

export function shopCapacityLine(cells: SourceMachine[]): string | undefined {
  const fresh = cells
    .map((cell) => ({ cell, snap: readCapacity(cell) }))
    .filter((row): row is { cell: SourceMachine; snap: SourceCapacitySnap } =>
      Boolean(row.snap?.fresh),
    );
  if (fresh.length === 0) return undefined;
  const hungriest = fresh.reduce((best, row) =>
    row.snap.openSlots > best.snap.openSlots ? row : best,
  );
  const { cell, snap } = hungriest;
  const name = [cell.oem, cell.model].filter(Boolean).join(" ") || cell.kind;
  if (snap.percent === 100) {
    return `${name} · 10/10 open this week — needs work`;
  }
  return `${name} · ${snap.openSlots}/10 open this week`;
}

export function capacityNeedsRefresh(cells: SourceMachine[]): boolean {
  if (cells.length === 0) return false;
  return cells.some((cell) => !readCapacity(cell)?.fresh);
}
