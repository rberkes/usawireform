import type { SourceFilingRow, SourceMachine } from "@/lib/source-types";
import { planById, type SourcePlan } from "@/lib/source-plans";

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

export function remainingSourceCells(plan: SourcePlan, used: number) {
  return Math.max(0, plan.cells - used);
}

export function shopFromFilings(rows: SourceFilingRow[]) {
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

export function sourceCapMessage(plan: SourcePlan, used: number) {
  const label = plan.cells === 1 ? "1 cell" : `${plan.cells} cells`;
  if (used >= plan.cells) {
    return `This plan holds ${label}. Upgrade to file more iron.`;
  }
  return `This plan holds ${label}. You already have ${used}.`;
}

export { planById };
