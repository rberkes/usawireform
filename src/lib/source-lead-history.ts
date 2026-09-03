import { normalizeShopEmail } from "@/lib/source-account";
import type { SourceJob } from "@/lib/source-types";

/**
 * Cross-job reads over the lead ledger.
 *
 * Every purchase already lives on the job record, so none of this needs new
 * schema — it is the same `purchasedBy` rows regrouped by who paid instead of
 * by what they paid for. Per-job reads stay in `source-access.ts`; anything
 * that has to walk every job lives here.
 */

type JobLedger = Pick<SourceJob, "email" | "purchasedBy">;

function time(iso: string | undefined) {
  const value = Date.parse(iso ?? "");
  return Number.isFinite(value) ? value : null;
}

export type BuyerAnswerRecord = {
  /**
   * Unlocks whose report says something about the buyer. A shop that passed on
   * the print is out of the denominator — that was the shop's call, not the
   * buyer's silence.
   */
  reached: number;
  /** Of those, the ones that turned into a real conversation. */
  answered: number;
};

/**
 * What a shop deserves to know before spending money: how this buyer treated
 * the shops that already paid. Raw counts only, never a percentage — one unlock
 * out of one is not a 100% record and should not read like one. Aggregated
 * across every job the buyer has filed, so it leaks nothing identifying.
 */
export function buyerAnswerRecord(
  jobs: JobLedger[],
  buyerEmail: string,
): BuyerAnswerRecord {
  const needle = normalizeShopEmail(buyerEmail);
  let reached = 0;
  let answered = 0;
  if (!needle) return { reached, answered };
  for (const job of jobs) {
    if (normalizeShopEmail(job.email) !== needle) continue;
    for (const row of job.purchasedBy ?? []) {
      if (row.quoteOutcome === "quoted") {
        reached += 1;
        answered += 1;
      } else if (row.quoteOutcome === "no-response") {
        reached += 1;
      }
    }
  }
  return { reached, answered };
}

/**
 * A buyer whose unlocked leads keep coming back "no response" is burning shop
 * money. The desk reads this before releasing anything else of theirs.
 */
export function buyerGhostRate(jobs: Pick<SourceJob, "purchasedBy">[]) {
  let answered = 0;
  let ghosted = 0;
  for (const job of jobs) {
    for (const row of job.purchasedBy ?? []) {
      if (!row.quoteOutcome) continue;
      answered += 1;
      if (row.quoteOutcome === "no-response") ghosted += 1;
    }
  }
  return { answered, ghosted, rate: answered ? ghosted / answered : null };
}

export type ShopLeadRecord = {
  key: string;
  company: string;
  email: string;
  purchases: number;
  firstAt: string;
  lastAt: string;
  quoted: number;
  ghosted: number;
  passed: number;
  pending: number;
  /** Days between first and second purchase. Null until they come back. */
  daysToRepeat: number | null;
};

const DAY = 86_400_000;

/**
 * Every shop that has ever paid for a lead, with what came of those leads.
 *
 * This is the retention view: a shop that bought once, reported "buyer never
 * answered", and never returned is a shop lost to a bad lead. Reading purchases
 * and outcomes on the same row is the only way to see that chain.
 */
export function shopLeadRecords(
  jobs: Pick<SourceJob, "purchasedBy">[],
): ShopLeadRecord[] {
  const byShop = new Map<string, ShopLeadRecord & { stamps: number[] }>();

  for (const job of jobs) {
    for (const row of job.purchasedBy ?? []) {
      const key = row.userId || normalizeShopEmail(row.email);
      if (!key) continue;
      const existing = byShop.get(key);
      const stamp = time(row.purchasedAt);
      const entry =
        existing ??
        {
          key,
          company: "",
          email: row.email,
          purchases: 0,
          firstAt: "",
          lastAt: "",
          quoted: 0,
          ghosted: 0,
          passed: 0,
          pending: 0,
          daysToRepeat: null,
          stamps: [] as number[],
        };
      entry.purchases += 1;
      // Company is blank on older rows; keep the first non-empty one we see.
      entry.company = entry.company || row.company?.trim() || "";
      entry.email = entry.email || row.email;
      if (stamp != null) entry.stamps.push(stamp);
      if (row.quoteOutcome === "quoted") entry.quoted += 1;
      else if (row.quoteOutcome === "no-response") entry.ghosted += 1;
      else if (row.quoteOutcome === "not-quoting") entry.passed += 1;
      else entry.pending += 1;
      byShop.set(key, entry);
    }
  }

  const records: ShopLeadRecord[] = [];
  for (const entry of byShop.values()) {
    const stamps = entry.stamps.sort((a, b) => a - b);
    const { stamps: _stamps, ...rest } = entry;
    records.push({
      ...rest,
      firstAt: stamps.length ? new Date(stamps[0]).toISOString() : "",
      lastAt: stamps.length
        ? new Date(stamps[stamps.length - 1]).toISOString()
        : "",
      daysToRepeat:
        stamps.length > 1
          ? Math.round((stamps[1] - stamps[0]) / DAY)
          : null,
    });
  }

  return records.sort(
    (a, b) =>
      b.purchases - a.purchases ||
      (time(b.lastAt) ?? 0) - (time(a.lastAt) ?? 0),
  );
}

export type LeadRepeatSummary = {
  /** Shops that have paid for at least one lead. */
  shops: number;
  /** Shops that came back for a second. */
  repeat: number;
  /** Bought once and has had a fair chance to return. */
  once: number;
  /**
   * Bought once, too recently to judge. Held out of the rate so a burst of new
   * shops cannot make retention look like it collapsed.
   */
  tooNew: number;
  /** repeat / (shops with a fair chance). Null when nobody has had one yet. */
  rate: number | null;
  /** Median days between first and second purchase, for shops that repeated. */
  medianDaysToRepeat: number | null;
  totalPurchases: number;
};

/**
 * Does a shop that pays for a lead pay again? Nothing else in the system says
 * as much about whether the model works — a shop buying a second lead has
 * decided the first one was worth the money.
 */
export function leadRepeatSummary(
  records: ShopLeadRecord[],
  { windowDays = 45, now = Date.now() }: { windowDays?: number; now?: number } = {},
): LeadRepeatSummary {
  let repeat = 0;
  let once = 0;
  let tooNew = 0;
  let totalPurchases = 0;
  const gaps: number[] = [];

  for (const row of records) {
    totalPurchases += row.purchases;
    if (row.purchases > 1) {
      repeat += 1;
      if (row.daysToRepeat != null) gaps.push(row.daysToRepeat);
      continue;
    }
    const first = time(row.firstAt);
    const fresh = first != null && now - first < windowDays * DAY;
    if (fresh) tooNew += 1;
    else once += 1;
  }

  const judged = repeat + once;
  gaps.sort((a, b) => a - b);
  const median = gaps.length
    ? gaps.length % 2
      ? gaps[(gaps.length - 1) / 2]
      : Math.round((gaps[gaps.length / 2 - 1] + gaps[gaps.length / 2]) / 2)
    : null;

  return {
    shops: records.length,
    repeat,
    once,
    tooNew,
    rate: judged ? repeat / judged : null,
    medianDaysToRepeat: median,
    totalPurchases,
  };
}
