/** Buyer-filed monthly sourcing volume. 10 means 10+. */

export const SOURCE_BUYER_JOBS_MAX = 10;

export const SOURCE_BUYER_VOLUME_LINE =
  "About how many jobs you source a month. Move the slider — it helps us staff the desk.";

export function parseBuyerJobsPerMonth(raw: unknown): number {
  const n = Number(String(raw ?? "").trim());
  if (!Number.isFinite(n)) return 0;
  return Math.min(SOURCE_BUYER_JOBS_MAX, Math.max(0, Math.round(n)));
}

export function formatBuyerJobsPerMonth(n: number | undefined | null) {
  const jobs = parseBuyerJobsPerMonth(n ?? 0);
  if (jobs >= SOURCE_BUYER_JOBS_MAX) return "10+ jobs / month";
  if (jobs === 1) return "1 job / month";
  return `${jobs} jobs / month`;
}
