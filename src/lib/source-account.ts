import type { SourceFilingRow, SourceMachine } from "@/lib/source-types";
import { SOURCE_CELL_SOFT_CAP, planById, type SourcePlan } from "@/lib/source-plans";

export function normalizeShopEmail(email: string | undefined | null) {
  return email?.trim().toLowerCase() ?? "";
}

export function isFiledSourceMachine(row: Pick<SourceMachine, "model">) {
  return Boolean(row.model?.trim());
}

export function filedSourceMachines(rows: SourceMachine[] | undefined) {
  return (rows ?? []).filter(isFiledSourceMachine);
}

export function sourceFilingsForShop(
  rows: SourceFilingRow[],
  {
    userId,
    email,
  }: {
    userId?: string | null;
    email?: string | null;
  },
) {
  const needle = normalizeShopEmail(email);
  if (userId) {
    return rows.filter(
      (row) =>
        row.userId === userId ||
        (!row.userId && needle && normalizeShopEmail(row.email) === needle),
    );
  }
  if (!needle) return [];
  return rows.filter((row) => normalizeShopEmail(row.email) === needle);
}

export function countSourceCells(rows: Pick<SourceFilingRow, "machines">[]) {
  return rows.reduce((sum, row) => sum + filedSourceMachines(row.machines).length, 0);
}

export function remainingSourceCells(_plan: SourcePlan, used: number) {
  return Math.max(0, SOURCE_CELL_SOFT_CAP - used);
}

export function sourceCapMessage(_plan: SourcePlan, used: number) {
  if (used >= SOURCE_CELL_SOFT_CAP) {
    return `This form holds ${SOURCE_CELL_SOFT_CAP} cells at a time. Existing cells stay on the dashboard.`;
  }
  return `You have ${used} cells on the list. Room for ${SOURCE_CELL_SOFT_CAP - used} more in this form.`;
}

export function shopFromFilings(
  rows: Array<
    Pick<
      SourceFilingRow,
      "company" | "email" | "name" | "phone" | "city" | "state" | "website"
    >
  >,
) {
  const latest = rows[0];
  if (!latest) return null;
  return {
    company: latest.company,
    email: latest.email,
    name: latest.name,
    phone: latest.phone,
    city: latest.city,
    state: latest.state,
    website: latest.website,
  };
}

export { planById };
