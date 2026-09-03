import "server-only";

import { applyProfilesToFilings, getSourceJob, listSourceFilings, listSourceProfiles, saveSourceJob } from "@/lib/source";
import { jobIsReleased } from "@/lib/source-access";
import { normalizeShopEmail } from "@/lib/source-account";
import { formatFullness, readShopCapacity } from "@/lib/source-capacity";
import {
  parseCoilBuyer,
  parseRunKind,
  stockLabel,
  type SourceBuyerFit,
} from "@/lib/source-fit";
import { partitionLeadMatches } from "@/lib/source-leads";
import { matchFilingsToJob, parseQty, type SourceJobSpec } from "@/lib/source-match";
import { secondaryLabel } from "@/lib/source-secondaries";
import { buyerShopSlots, SOURCE_BUYER_INCLUDED_SHOPS } from "@/lib/source-plans";
import type {
  SourceFiling,
  SourceInternalMatch,
  SourceJob,
  SourceJobMailedTo,
  SourceJobRow,
  SourceProfile,
} from "@/lib/source-types";

export type FitFlag = {
  label: string;
  ok: boolean | null;
  detail: string;
};

export type ReleaseShopPreview = SourceInternalMatch & {
  flags: FitFlag[];
  userId?: string;
};

export type ReleasePreview = {
  job: SourceJobRow;
  alreadyReleased: boolean;
  includedShops: number;
  extraShops: number;
  slots: number;
  matches: ReleaseShopPreview[];
  listed: SourceInternalMatch[];
  mailedTo: SourceJobMailedTo[];
};

export function jobToSpec(job: SourceJob): SourceJobSpec {
  return {
    diameterMm: job.diameterMm,
    kind: job.kind,
    oem: job.oem,
    city: job.city,
    state: job.state,
    buyerEmail: job.email,
    qty: parseQty(job.qty),
  };
}

function flag(label: string, ok: boolean | null, detail: string): FitFlag {
  return { label, ok, detail };
}

function shopFitFlags(
  job: SourceJob,
  filing: SourceFiling | undefined,
  profile?: SourceProfile,
): FitFlag[] {
  const fit: SourceBuyerFit | undefined = filing?.fit ?? profile?.fit;
  const flags: FitFlag[] = [];

  flags.push(
    flag(
      "Cell",
      Boolean(job.kind),
      job.kind || "No cell on the print",
    ),
  );
  flags.push(
    flag(
      "Wire",
      job.diameterMm != null,
      job.diameterMm != null
        ? `${job.diameterMm} mm`
        : job.diameterRaw || "No diameter",
    ),
  );

  const alloy = job.alloy?.trim();
  if (alloy) {
    const stock = fit?.stockedMaterials ?? [];
    if (stock.length === 0) {
      flags.push(flag("Alloy", null, `${stockLabel(alloy)} — shop did not file stock`));
    } else {
      const hit = stock.includes(alloy as (typeof stock)[number]);
      flags.push(
        flag(
          "Alloy",
          hit,
          hit
            ? stockLabel(alloy)
            : `${stockLabel(alloy)} not in shop stock (${stock.map(stockLabel).join(", ")})`,
        ),
      );
    }
  }

  const coil = parseCoilBuyer(job.coilBuyer);
  if (coil && fit?.coilPolicy) {
    const policy = fit.coilPolicy;
    const ok =
      coil === "either" ||
      policy === "both" ||
      (coil === "shop" && policy === "shop-stock") ||
      (coil === "buyer" && policy === "customer-coil");
    flags.push(
      flag(
        "Coil",
        ok,
        ok
          ? "Coil policy fits"
          : `Buyer: ${coil} · shop: ${policy}`,
      ),
    );
  } else if (coil) {
    flags.push(flag("Coil", null, "Shop did not file a coil policy"));
  }

  const qty = parseQty(job.qty);
  if (qty != null && fit?.minOrderKind === "qty" && fit.minOrderQty) {
    flags.push(
      flag(
        "Qty vs MOQ",
        qty >= fit.minOrderQty,
        qty >= fit.minOrderQty
          ? `${qty} ≥ ${fit.minOrderQty} pcs`
          : `${qty} pcs under shop min ${fit.minOrderQty}`,
      ),
    );
  } else if (qty != null) {
    flags.push(flag("Qty", true, `${qty} pcs`));
  }

  const snap = readShopCapacity(profile, filing?.machines ?? []);
  if (snap) {
    const ok = snap.fresh && snap.fullPercent < 100;
    flags.push(
      flag(
        "Fullness",
        ok ? true : snap.fullPercent === 100 ? false : null,
        formatFullness(snap),
      ),
    );
  } else {
    flags.push(flag("Fullness", null, "Shop has not filed this week"));
  }

  const finish = job.finish?.trim();
  if (finish) {
    const ops = profile?.secondaries ?? [];
    const hit = ops.includes(finish);
    flags.push(
      flag(
        "Finish",
        ops.length === 0 ? null : hit,
        ops.length === 0
          ? `${secondaryLabel(finish)} — shop did not file secondaries`
          : hit
            ? secondaryLabel(finish)
            : `${secondaryLabel(finish)} not on this shop`,
      ),
    );
  }

  const run = parseRunKind(job.runKind);
  if (run === "first-article" && fit?.prototypePolicy === "production") {
    flags.push(flag("First article", false, "Shop filed production lots only"));
  } else if (run === "first-article") {
    flags.push(
      flag(
        "First article",
        fit?.prototypePolicy === "yes" ? true : null,
        fit?.prototypePolicy || "Not filed",
      ),
    );
  }

  if (job.ppap) {
    flags.push(
      flag(
        "PPAP",
        fit?.ppap === true,
        fit?.ppap ? "Shop filed PPAP" : "Buyer needs PPAP — shop did not file it",
      ),
    );
  }

  return flags;
}

export async function previewSourceRelease(
  job: SourceJobRow,
): Promise<ReleasePreview> {
  const [filingRows, profiles] = await Promise.all([
    listSourceFilings(),
    listSourceProfiles(),
  ]);
  const filings = applyProfilesToFilings(filingRows, profiles);
  const internal = matchFilingsToJob(filings, jobToSpec(job));
  const { mailed, listed } = await partitionLeadMatches(internal);
  const mailedTo: SourceJobMailedTo[] = mailed.map((row) => {
    const filing = filings.find(
      (item) =>
        item.email.trim().toLowerCase() === row.email.trim().toLowerCase() &&
        item.company.trim().toLowerCase() === row.company.trim().toLowerCase(),
    );
    return {
      email: row.email,
      company: row.company,
      userId: filing?.userId,
    };
  });
  const matches: ReleaseShopPreview[] = mailed.map((row) => {
    const filing = filings.find(
      (item) =>
        item.email.trim().toLowerCase() === row.email.trim().toLowerCase() &&
        item.company.trim().toLowerCase() === row.company.trim().toLowerCase(),
    );
    const profile = filing?.userId
      ? profiles.find((item) => item.userId === filing.userId)
      : undefined;
    return { ...row, userId: filing?.userId, flags: shopFitFlags(job, filing, profile) };
  });
  const extraShops = job.buyerExtraShops ?? 0;
  const slots = buyerShopSlots(extraShops);
  const alreadyReleased = jobIsReleased(job);
  return {
    job,
    alreadyReleased,
    includedShops: SOURCE_BUYER_INCLUDED_SHOPS,
    extraShops,
    slots,
    matches,
    listed,
    mailedTo: mailedTo.slice(
      0,
      alreadyReleased
        ? Math.max(job.mailedTo?.length ?? 0, slots)
        : slots,
    ),
  };
}

export async function markJobQualified(job: SourceJobRow) {
  const now = new Date().toISOString();
  await saveSourceJob(
    { ...job, qualifiedAt: job.qualifiedAt || now },
    job.pathname,
  );
}

export async function applyJobRelease(job: SourceJobRow, mailedTo: SourceJobMailedTo[]) {
  const now = new Date().toISOString();
  await saveSourceJob(
    {
      ...job,
      mailedTo,
      releasedAt: now,
      qualifiedAt: job.qualifiedAt || now,
    },
    job.pathname,
  );
}

export async function applyBuyerExtraShops({
  pathname,
  qty,
  sessionId,
}: {
  pathname: string;
  qty: number;
  sessionId?: string;
}) {
  const job = await getSourceJob(pathname);
  if (!job) return { ok: false as const, reason: "missing" as const };
  const want = Math.max(0, Math.floor(qty));
  if (want < 1) return { ok: false as const, reason: "qty" as const };

  const purchases = job.buyerExtraPurchases ?? [];
  if (sessionId && purchases.some((row) => row.sessionId === sessionId)) {
    return { ok: true as const, job, added: [] as ReleaseShopPreview[] };
  }

  const preview = await previewSourceRelease(job);
  const already = new Set(
    (job.mailedTo ?? []).map((row) => normalizeShopEmail(row.email)),
  );
  const take = preview.matches
    .filter((row) => !already.has(normalizeShopEmail(row.email)))
    .slice(0, want);
  const addedMailed = take.map((row) => ({
    email: row.email,
    company: row.company,
    userId: row.userId,
  }));
  const now = new Date().toISOString();
  const next = {
    ...job,
    mailedTo: [...(job.mailedTo ?? []), ...addedMailed],
    buyerExtraShops: (job.buyerExtraShops ?? 0) + take.length,
    buyerExtraPurchases: [
      ...purchases,
      { qty: take.length, paidAt: now, sessionId },
    ],
    buyerPaidAt: now,
  };
  await saveSourceJob(next, job.pathname);
  return { ok: true as const, job: next, added: take };
}

export async function recordBuyerJobPayment(pathname: string) {
  const job = await getSourceJob(pathname);
  if (!job) return null;
  if (job.buyerPaidAt) return job;
  const now = new Date().toISOString();
  const next = { ...job, buyerPaidAt: now };
  await saveSourceJob(next, pathname);
  return next;
}
