import "server-only";

import { getSourcePlanForUser } from "@/lib/source-billing";
import {
  countSourceCells,
  shopFromFilings,
  sourceFilingsForShop,
} from "@/lib/source-account";
import { planById, type SourcePlan } from "@/lib/source-plans";
import {
  getSourceProfile,
  listSourceFilings,
  listSourceProfiles,
  saveSourceProfile,
  uniqueSourceSlug,
} from "@/lib/source";
import type {
  SourceFiling,
  SourceInternalMatch,
  SourceProfile,
} from "@/lib/source-types";

export type SourceLeadsStatus = "stripe" | "comp" | "listing";

export type SourceSubscriber = {
  key: string;
  userId?: string;
  company: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  cells: number;
  planName: string;
  leads: SourceLeadsStatus;
  listedAt?: string;
};

export function leadsStatus(
  plan: SourcePlan,
  profile?: Pick<SourceProfile, "leadsAccess"> | null,
): SourceLeadsStatus {
  if (plan.id !== "free") return "stripe";
  if (profile?.leadsAccess === "comp") return "comp";
  return "listing";
}

export function shopGetsLeads(status: SourceLeadsStatus) {
  return status !== "listing";
}

export function leadsStatusLabel(status: SourceLeadsStatus) {
  if (status === "stripe") return "Paid — receives leads";
  if (status === "comp") return "Comp — receives leads";
  return "Listing only";
}

function filingKey(row: SourceFiling) {
  if (row.userId) return `user:${row.userId}`;
  const email = row.email.trim().toLowerCase();
  if (email) return `email:${email}`;
  return `shop:${row.company.trim().toLowerCase() || "unknown"}`;
}

export async function listSourceSubscribers(): Promise<SourceSubscriber[]> {
  const [filings, profiles] = await Promise.all([
    listSourceFilings(),
    listSourceProfiles(),
  ]);
  const profileByUser = new Map(profiles.map((row) => [row.userId, row]));
  const groups = new Map<string, SourceFiling[]>();

  for (const row of filings) {
    const key = filingKey(row);
    const list = groups.get(key) ?? [];
    list.push(row);
    groups.set(key, list);
  }

  for (const profile of profiles) {
    const key = `user:${profile.userId}`;
    if (!groups.has(key)) groups.set(key, []);
  }

  const userIds = [
    ...new Set(
      [...groups.keys()]
        .map((key) =>
          key.startsWith("user:")
            ? key.slice(5)
            : groups.get(key)?.find((row) => row.userId)?.userId,
        )
        .filter((id): id is string => Boolean(id)),
    ),
  ];
  const plans = await plansByUserId(userIds);

  const rows: SourceSubscriber[] = [];
  for (const [key, shopRows] of groups) {
    const sample = shopFromFilings(shopRows);
    const userId =
      shopRows.find((row) => row.userId)?.userId ||
      (key.startsWith("user:") ? key.slice(5) : undefined);
    const profile = userId ? profileByUser.get(userId) : undefined;
    const plan = userId ? (plans.get(userId) ?? planById("free")) : planById("free");
    const email =
      sample?.email ||
      shopRows.find((row) => row.email)?.email ||
      "";
    rows.push({
      key,
      userId,
      company: sample?.company || profile?.company || "Shop",
      email,
      name: sample?.name || profile?.name || "",
      phone: sample?.phone || profile?.phone || "",
      city: sample?.city || profile?.city || "",
      state: sample?.state || profile?.state || "",
      cells: countSourceCells(shopRows),
      planName: userId ? plan.name : "No account",
      leads: leadsStatus(plan, profile),
      listedAt: profile?.listedAt || shopRows[0]?.timestamp,
    });
  }

  return rows.sort((a, b) => {
    const paid = Number(shopGetsLeads(b.leads)) - Number(shopGetsLeads(a.leads));
    if (paid !== 0) return paid;
    return (b.listedAt ?? "").localeCompare(a.listedAt ?? "");
  });
}

export async function countSourceSubscribers() {
  const [filings, profiles] = await Promise.all([
    listSourceFilings(),
    listSourceProfiles(),
  ]);
  const groups = new Set<string>();
  for (const row of filings) groups.add(filingKey(row));
  for (const profile of profiles) groups.add(`user:${profile.userId}`);
  return groups.size;
}

export async function plansByUserId(userIds: string[]) {
  const unique = [...new Set(userIds.filter(Boolean))];
  const entries = await Promise.all(
    unique.map(async (userId) => {
      const plan = await getSourcePlanForUser(userId).catch(() =>
        planById("free"),
      );
      return [userId, plan] as const;
    }),
  );
  return new Map(entries);
}

export async function partitionLeadMatches(
  matches: SourceInternalMatch[],
  filings: SourceFiling[],
  profiles: SourceProfile[],
) {
  const plans = await plansByUserId(
    filings.map((row) => row.userId).filter((id): id is string => Boolean(id)),
  );
  const profileByUser = new Map(profiles.map((row) => [row.userId, row]));
  const mailed: SourceInternalMatch[] = [];
  const listed: SourceInternalMatch[] = [];

  for (const match of matches) {
    const filing = filings.find(
      (row) =>
        row.email.trim().toLowerCase() === match.email.trim().toLowerCase() &&
        row.company.trim().toLowerCase() === match.company.trim().toLowerCase(),
    );
    const userId = filing?.userId;
    const status = leadsStatus(
      userId ? (plans.get(userId) ?? planById("free")) : planById("free"),
      userId ? profileByUser.get(userId) : undefined,
    );
    if (shopGetsLeads(status)) mailed.push(match);
    else listed.push(match);
  }

  return { mailed, listed };
}

export async function setSourceLeadsComp(userId: string, on: boolean) {
  const existing = await getSourceProfile(userId);
  const now = new Date().toISOString();
  if (existing) {
    await saveSourceProfile({
      ...existing,
      leadsAccess: on ? "comp" : undefined,
      updatedAt: now,
    });
    return true;
  }

  const filings = await listSourceFilings();
  const shopRows = sourceFilingsForShop(filings, { userId, email: "" });
  const shop = shopFromFilings(shopRows);
  if (!shop?.company) return false;
  const slug = await uniqueSourceSlug(shop.company, userId);
  await saveSourceProfile({
    userId,
    slug,
    company: shop.company,
    name: shop.name,
    phone: shop.phone,
    city: shop.city,
    state: shop.state,
    website: shop.website,
    blurb: "",
    published: true,
    claimedDirectory: false,
    secondaries: [],
    listedAt: now,
    updatedAt: now,
    leadsAccess: on ? "comp" : undefined,
  });
  return true;
}
