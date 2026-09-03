import { buyerShopSlots, SOURCE_LEAD_BUYERS_MAX } from "@/lib/source-plans";
import { normalizeShopEmail } from "@/lib/source-account";
import { shopNeedsNda } from "@/lib/source-nda";
import {
  parseDrawingPrivacy,
  type SourceJob,
  type SourceJobPurchase,
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

export function jobIsReleased(
  job: Pick<SourceJob, "releasedAt" | "mailedTo">,
) {
  if (job.releasedAt) return true;
  return (job.mailedTo?.length ?? 0) > 0;
}

export function jobsForBuyer<T extends SourceJob>(
  jobs: T[],
  who: { userId?: string | null; email?: string | null },
) {
  return jobs.filter((job) => buyerOwnsJob(job, who));
}

export function buyerHasReleasedJob<T extends SourceJob & { pathname?: string }>(
  jobs: T[],
  job: Pick<SourceJob, "buyerUserId" | "email"> & { pathname?: string },
) {
  return jobs.some(
    (row) =>
      jobIsReleased(row) &&
      row.pathname !== job.pathname &&
      buyerOwnsJob(row, { userId: job.buyerUserId, email: job.email }),
  );
}

export function shopWasMailedJob(
  job: Pick<SourceJob, "mailedTo">,
  {
    userId,
    email,
  }: { userId?: string | null; email?: string | null },
) {
  const needle = normalizeShopEmail(email);
  return (job.mailedTo ?? []).some(
    (row) =>
      (userId && row.userId === userId) ||
      (Boolean(needle) && normalizeShopEmail(row.email) === needle),
  );
}

export function jobsMailedToShop<T extends SourceJob>(
  jobs: T[],
  { userId, email }: { userId?: string | null; email?: string | null },
) {
  return jobs.filter((job) => shopWasMailedJob(job, { userId, email }));
}

export function shopBoughtLead(
  job: Pick<SourceJob, "purchasedBy">,
  {
    userId,
    email,
  }: { userId?: string | null; email?: string | null },
) {
  const needle = normalizeShopEmail(email);
  return (job.purchasedBy ?? []).some(
    (row) =>
      (userId && row.userId === userId) ||
      (Boolean(needle) && normalizeShopEmail(row.email) === needle),
  );
}

export function leadPurchaseCount(job: Pick<SourceJob, "purchasedBy">) {
  return job.purchasedBy?.length ?? 0;
}

export function leadIsClosed(job: Pick<SourceJob, "closedAt">) {
  return Boolean(job.closedAt);
}

export function leadPurchaseSlots(
  job: Pick<SourceJob, "buyerExtraShops">,
) {
  return buyerShopSlots(job.buyerExtraShops);
}

export function waitlistedMailed(
  job: Pick<SourceJob, "mailedTo" | "purchasedBy">,
) {
  const boughtEmail = new Set(
    (job.purchasedBy ?? []).map((row) => normalizeShopEmail(row.email)),
  );
  const boughtUser = new Set(
    (job.purchasedBy ?? []).map((row) => row.userId).filter(Boolean),
  );
  return (job.mailedTo ?? []).filter((row) => {
    if (row.userId && boughtUser.has(row.userId)) return false;
    return !boughtEmail.has(normalizeShopEmail(row.email));
  });
}

export function shopMayBuyLead(
  job: Pick<SourceJob, "mailedTo" | "purchasedBy" | "buyerExtraShops" | "closedAt">,
  who: { userId?: string | null; email?: string | null },
) {
  if (leadIsClosed(job)) return false;
  if (!shopWasMailedJob(job, who)) return false;
  if (shopBoughtLead(job, who)) return false;
  if (leadPurchaseCount(job) >= SOURCE_LEAD_BUYERS_MAX) return false;
  return leadPurchaseCount(job) < leadPurchaseSlots(job);
}

export function shopIsWaitlisted(
  job: Pick<SourceJob, "mailedTo" | "purchasedBy" | "buyerExtraShops" | "closedAt">,
  who: { userId?: string | null; email?: string | null },
) {
  if (leadIsClosed(job)) return false;
  return (
    shopWasMailedJob(job, who) &&
    !shopBoughtLead(job, who) &&
    !shopMayBuyLead(job, who)
  );
}

export function shopMaySeeBuyerContact(
  job: Pick<SourceJob, "mailedTo" | "purchasedBy">,
  who: { userId?: string | null; email?: string | null },
) {
  return shopWasMailedJob(job, who) && shopBoughtLead(job, who);
}

export function shopMayViewDrawing(
  job: Pick<
    SourceJob,
    "drawingPath" | "drawingPrivacy" | "mailedTo" | "purchasedBy"
  >,
  {
    userId,
    email,
    profile,
  }: {
    userId?: string | null;
    email?: string | null;
    profile?: Pick<SourceProfile, "ndaAcceptedAt" | "ndaVersion"> | null;
  },
) {
  if (shopNeedsNda(profile)) return false;
  if (parseDrawingPrivacy(job.drawingPrivacy) !== "matched") return false;
  if (!job.drawingPath || !isSourceDrawingPath(job.drawingPath)) return false;
  return shopMaySeeBuyerContact(job, { userId, email });
}

export type { SourceJobPurchase };
