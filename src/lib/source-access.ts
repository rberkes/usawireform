import { normalizeShopEmail } from "@/lib/source-account";
import { shopHasNda } from "@/lib/source-nda";
import {
  parseDrawingPrivacy,
  type SourceJob,
  type SourceProfile,
} from "@/lib/source-types";

export function isSourceDrawingPath(path: string) {
  return (
    Boolean(path) &&
    !path.includes("..") &&
    path.startsWith("source/jobs/") &&
    !path.endsWith(".json")
  );
}

export function shopDrawingHref(path: string, fileName?: string) {
  const params = new URLSearchParams({ path });
  if (fileName) params.set("name", fileName);
  return `/source/drawing?${params.toString()}`;
}

export function buyerOwnsJob(
  job: Pick<SourceJob, "buyerUserId" | "email">,
  { userId, email }: { userId?: string | null; email?: string | null },
) {
  if (userId && job.buyerUserId === userId) return true;
  const needle = normalizeShopEmail(email);
  return Boolean(needle) && normalizeShopEmail(job.email) === needle;
}

export function jobsForBuyer<T extends SourceJob>(
  jobs: T[],
  who: { userId?: string | null; email?: string | null },
) {
  return jobs.filter((job) => buyerOwnsJob(job, who));
}

export function shopWasMailedJob(
  job: Pick<SourceJob, "mailedTo">,
  email: string | null | undefined,
) {
  const needle = normalizeShopEmail(email);
  if (!needle) return false;
  return (job.mailedTo ?? []).some(
    (row) => normalizeShopEmail(row.email) === needle,
  );
}

export function jobsMailedToShop<T extends SourceJob>(
  jobs: T[],
  email: string | null | undefined,
) {
  return jobs.filter((job) => shopWasMailedJob(job, email));
}

export function shopMayViewDrawing(
  job: Pick<SourceJob, "drawingPath" | "drawingPrivacy" | "mailedTo">,
  {
    email,
    profile,
  }: {
    email?: string | null;
    profile?: Pick<SourceProfile, "ndaAcceptedAt" | "ndaVersion"> | null;
  },
) {
  if (!shopHasNda(profile)) return false;
  if (parseDrawingPrivacy(job.drawingPrivacy) !== "matched") return false;
  if (!job.drawingPath || !isSourceDrawingPath(job.drawingPath)) return false;
  return shopWasMailedJob(job, email);
}
