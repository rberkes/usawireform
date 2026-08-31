import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { get, list, put } from "@vercel/blob";
import { blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { SITE_URL } from "@/lib/company";
import { sendLeadEmail, sendSourceIncompleteReminderEmail } from "@/lib/leads";
import { normalizeShopEmail } from "@/lib/source-account";
import { sourceClaimPath, suggestedDirectoryClaim } from "@/lib/source-directory";
import { shopHasNda } from "@/lib/source-nda";
import {
  listSourceFilings,
  listSourceInvites,
  listSourceProfiles,
} from "@/lib/source";
import type { SourceFilingRow, SourceProfile } from "@/lib/source-types";

export const SOURCE_REMINDER_KINDS = [
  "claim",
  "nda",
  "confirm",
  "invite",
] as const;

export type SourceReminderKind = (typeof SOURCE_REMINDER_KINDS)[number];

export type IncompleteShop = {
  key: string;
  to: string;
  company: string;
  kind: SourceReminderKind;
  href: string;
  startedAt: string;
  detail: string;
};

export type SourceReminderLog = {
  key: string;
  to: string;
  company: string;
  kind: SourceReminderKind;
  href: string;
  sentAt: string[];
};

export type SourceReminderRun = {
  sent: number;
  held: number;
  missingEmail: number;
  failed: number;
  mailed: Array<{ to: string; company: string; kind: SourceReminderKind }>;
};

const FIRST_WAIT_MS = 18 * 60 * 60 * 1000;
const BETWEEN_MS = 3 * 24 * 60 * 60 * 1000;
const MAX_SENDS = 3;
const KIND_RANK: Record<SourceReminderKind, number> = {
  claim: 4,
  nda: 3,
  confirm: 2,
  invite: 1,
};

function reminderPath(key: string) {
  return `source/reminders/${key.replace(/[^a-z0-9._-]+/g, "-")}.json`;
}

function emailKey(email: string) {
  return normalizeShopEmail(email).replace(/[^a-z0-9]+/g, "-") || "unknown";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function ageMs(iso: string) {
  const at = new Date(iso).getTime();
  if (Number.isNaN(at)) return 0;
  return Date.now() - at;
}

function signInHref(next: string) {
  const path = next.startsWith("http") ? next : `${next.startsWith("/") ? next : `/${next}`}`;
  return `${SITE_URL}/sign-in?redirect_url=${encodeURIComponent(path)}`;
}

function keepRicher(current: IncompleteShop | undefined, next: IncompleteShop) {
  if (!current) return next;
  if (KIND_RANK[next.kind] > KIND_RANK[current.kind]) return next;
  if (KIND_RANK[next.kind] < KIND_RANK[current.kind]) return current;
  return ageMs(next.startedAt) > ageMs(current.startedAt) ? next : current;
}

async function clerkEmail(userId: string) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return (
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses[0]?.emailAddress ||
      ""
    ).trim();
  } catch {
    return "";
  }
}

async function emailForProfile(
  profile: SourceProfile,
  filings: SourceFilingRow[],
) {
  const fromFiling = filings.find(
    (row) => row.userId === profile.userId && row.email,
  )?.email;
  if (fromFiling && isEmail(fromFiling)) return fromFiling.trim();
  const fromClerk = await clerkEmail(profile.userId);
  return isEmail(fromClerk) ? fromClerk : "";
}

function profileComplete(profile: SourceProfile) {
  if (!shopHasNda(profile)) return false;
  if (profile.claimedDirectory || profile.plantVerifiedAt) return true;
  return !suggestedDirectoryClaim(profile);
}

export function reminderKindLabel(kind: SourceReminderKind) {
  if (kind === "claim") return "Directory claim open";
  if (kind === "nda") return "NDA not signed";
  if (kind === "confirm") return "Account not confirmed";
  return "Invite not used";
}

export async function listIncompleteSourceShops(): Promise<IncompleteShop[]> {
  const [profiles, filings, invites] = await Promise.all([
    listSourceProfiles(),
    listSourceFilings(),
    listSourceInvites(),
  ]);

  const completeEmails = new Set<string>();
  const byEmail = new Map<string, IncompleteShop>();

  const filingEmailForUser = new Map<string, string>();
  for (const row of filings) {
    const email = normalizeShopEmail(row.email);
    if (row.userId && email) filingEmailForUser.set(row.userId, row.email.trim());
  }

  for (const profile of profiles) {
    if (profileComplete(profile)) {
      const known =
        filingEmailForUser.get(profile.userId) ||
        (await emailForProfile(profile, filings));
      if (known) completeEmails.add(normalizeShopEmail(known));
      continue;
    }

    const to =
      filingEmailForUser.get(profile.userId) ||
      (await emailForProfile(profile, filings));
    const listing = suggestedDirectoryClaim(profile);
    const nda = shopHasNda(profile);
    const kind: SourceReminderKind = nda && listing ? "claim" : "nda";
    const nextPath =
      kind === "claim" && listing
        ? sourceClaimPath(listing.slug)
        : "/source/nda";
    const row: IncompleteShop = {
      key: to ? emailKey(to) : `user-${profile.userId.slice(-8).toLowerCase()}`,
      to,
      company: profile.company || listing?.name || "your shop",
      kind,
      href: signInHref(nextPath),
      startedAt: profile.listedAt || profile.updatedAt,
      detail:
        kind === "claim" && listing
          ? `Plant street, floor proof, and the factory check for ${listing.name}.`
          : "Accept the supplier NDA, then finish the listing.",
    };
    const mapKey = to ? normalizeShopEmail(to) : profile.userId;
    byEmail.set(mapKey, keepRicher(byEmail.get(mapKey), row));
  }

  const emailsWithAccount = new Set(
    [...completeEmails, ...[...byEmail.values()].map((row) => normalizeShopEmail(row.to))].filter(
      Boolean,
    ),
  );

  for (const filing of filings) {
    const email = normalizeShopEmail(filing.email);
    if (!email || !isEmail(filing.email) || completeEmails.has(email)) continue;
    if (filing.userId) continue;
    if (emailsWithAccount.has(email)) continue;
    const confirmHref = `${SITE_URL}/sign-up?as=supplier&email_address=${encodeURIComponent(filing.email)}&redirect_url=${encodeURIComponent("/source/enter")}`;
    const row: IncompleteShop = {
      key: emailKey(filing.email),
      to: filing.email.trim(),
      company: filing.company || "your shop",
      kind: "confirm",
      href: confirmHref,
      startedAt: filing.timestamp,
      detail: "Confirm the shop account so you can log in and finish registration.",
    };
    byEmail.set(email, keepRicher(byEmail.get(email), row));
    emailsWithAccount.add(email);
  }

  const usedInviteIds = new Set(
    filings.map((row) => row.inviteId).filter((id): id is string => Boolean(id)),
  );

  for (const invite of invites) {
    const email = normalizeShopEmail(invite.to);
    if (!email || !isEmail(invite.to) || completeEmails.has(email)) continue;
    if (usedInviteIds.has(invite.id)) continue;
    if (emailsWithAccount.has(email)) continue;
    const row: IncompleteShop = {
      key: emailKey(invite.to),
      to: invite.to.trim(),
      company: invite.company || "your shop",
      kind: "invite",
      href: invite.href,
      startedAt: invite.sentAt,
      detail: "Open the invite and file the cells on the floor.",
    };
    byEmail.set(email, keepRicher(byEmail.get(email), row));
  }

  return [...byEmail.values()].sort(
    (a, b) => ageMs(b.startedAt) - ageMs(a.startedAt),
  );
}

export async function listSourceReminderLogs(): Promise<SourceReminderLog[]> {
  if (!(await blobReady())) return [];
  const result = await list({
    prefix: "source/reminders/",
    ...(await blobAuth()),
  });
  const rows: SourceReminderLog[] = [];
  for (const blob of result.blobs) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      const payload = JSON.parse(
        await new Response(file.stream).text(),
      ) as Partial<SourceReminderLog>;
      const sentAt = Array.isArray(payload.sentAt)
        ? payload.sentAt.filter((value): value is string => typeof value === "string")
        : [];
      const kind = SOURCE_REMINDER_KINDS.includes(
        payload.kind as SourceReminderKind,
      )
        ? (payload.kind as SourceReminderKind)
        : "invite";
      rows.push({
        key: String(payload.key ?? blob.pathname),
        to: String(payload.to ?? ""),
        company: String(payload.company ?? ""),
        kind,
        href: String(payload.href ?? ""),
        sentAt,
      });
    } catch {
      /* skip */
    }
  }
  return rows;
}

function reminderDue(
  shop: IncompleteShop,
  log: SourceReminderLog | undefined,
  immediate: boolean,
) {
  if (!immediate && ageMs(shop.startedAt) < FIRST_WAIT_MS) return false;
  const sent = log?.sentAt ?? [];
  if (sent.length >= MAX_SENDS) return false;
  const last = sent[sent.length - 1];
  if (last && ageMs(last) < BETWEEN_MS) return false;
  return true;
}

async function saveReminderLog(log: SourceReminderLog) {
  if (!(await blobReady())) return false;
  await put(reminderPath(log.key), JSON.stringify(log), {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...(await blobAuth()),
  });
  return true;
}

export async function sendDueSourceRegistrationReminders(
  { immediate = false }: { immediate?: boolean } = {},
): Promise<SourceReminderRun> {
  const [shops, logs] = await Promise.all([
    listIncompleteSourceShops(),
    listSourceReminderLogs(),
  ]);
  const logByKey = new Map(logs.map((row) => [row.key, row]));
  const result: SourceReminderRun = {
    sent: 0,
    held: 0,
    missingEmail: 0,
    failed: 0,
    mailed: [],
  };

  for (const shop of shops) {
    if (!shop.to || !isEmail(shop.to)) {
      result.missingEmail += 1;
      continue;
    }
    const existing = logByKey.get(shop.key);
    if (!reminderDue(shop, existing, immediate)) {
      result.held += 1;
      continue;
    }
    const ok = await sendSourceIncompleteReminderEmail({
      to: shop.to,
      company: shop.company,
      href: shop.href,
      kind: shop.kind,
      detail: shop.detail,
    });
    if (!ok) {
      result.failed += 1;
      continue;
    }
    const now = new Date().toISOString();
    const nextLog: SourceReminderLog = {
      key: shop.key,
      to: shop.to,
      company: shop.company,
      kind: shop.kind,
      href: shop.href,
      sentAt: [...(existing?.sentAt ?? []), now],
    };
    await saveReminderLog(nextLog);
    logByKey.set(shop.key, nextLog);
    result.sent += 1;
    result.mailed.push({
      to: shop.to,
      company: shop.company,
      kind: shop.kind,
    });
  }

  if (result.mailed.length > 0) {
    const lines = result.mailed
      .map(
        (row) =>
          `<li>${row.company} — ${row.to} — ${reminderKindLabel(row.kind)}</li>`,
      )
      .join("");
    await sendLeadEmail({
      heading: "LEAD — Source registration reminders",
      subject: `LEAD: ${result.sent} Source registration reminder${
        result.sent === 1 ? "" : "s"
      }`,
      html: `<p>Sent ${result.sent} reminder${
        result.sent === 1 ? "" : "s"
      }. Held ${result.held} (too soon or already at 3). Missing email ${result.missingEmail}. Failed ${result.failed}.</p><ul>${lines}</ul>`,
    });
  }

  console.log("[Source registration reminders]", result);
  return result;
}
