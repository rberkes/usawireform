import "server-only";

import { applyProfilesToFilings, getSourceJob, listSourceFilings, listSourceJobs, listSourceProfiles, saveSourceJob } from "@/lib/source";
import {
  buyerHasReleasedJob,
  jobIsReleased,
} from "@/lib/source-access";
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
};

export type ReleasePreview = {
  job: SourceJobRow;
  alreadyReleased: boolean;
  firstPrintFree: boolean;
  needsBuyerPay: boolean;
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
  allJobs?: SourceJobRow[],
): Promise<ReleasePreview> {
  const jobs = allJobs ?? (await listSourceJobs());
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
    return { ...row, flags: shopFitFlags(job, filing, profile) };
  });
  const firstPrintFree = !buyerHasReleasedJob(jobs, job);
  const alreadyReleased = jobIsReleased(job);
  const needsBuyerPay = !alreadyReleased && !firstPrintFree && !job.buyerPaidAt;
  return {
    job,
    alreadyReleased,
    firstPrintFree,
    needsBuyerPay,
    matches,
    listed,
    mailedTo,
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

export async function recordBuyerJobPayment(pathname: string) {
  const job = await getSourceJob(pathname);
  if (!job) return null;
  if (job.buyerPaidAt) return job;
  const now = new Date().toISOString();
  const next = { ...job, buyerPaidAt: now };
  await saveSourceJob(next, pathname);
  return next;
}
