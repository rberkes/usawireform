"use server";

import { randomUUID } from "crypto";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/app/admin/actions";
import { QUOTE_EMAIL } from "@/lib/company";
import { blobErrorMessage, blobReady } from "@/lib/blob";
import { getDirectoryCompany } from "@/lib/directory";
import {
  sendSourceClaimEmails,
  sendSourceFilingEmails,
  sendSourceInviteEmails,
  sendSourceJobEmails,
} from "@/lib/leads";
import {
  countSourceCells,
  remainingSourceCells,
  shopFromFilings,
  sourceCapMessage,
  sourceFilingsForShop,
} from "@/lib/source-account";
import { getSourcePlanForUser } from "@/lib/source-billing";
import { parseBuyerJob } from "@/lib/source-job-parse";
import { matchFilingsToJob } from "@/lib/source-match";
import { planById } from "@/lib/source-plans";
import {
  directoryCity,
  normalizeShopWebsite,
  sourceClaimable,
  sourceClaimPath,
} from "@/lib/source-directory";
import type { SourcePublicMatch } from "@/lib/source-types";
import {
  applyProfilesToFilings,
  findSourceProfileBySlug,
  getSourceInvite,
  getSourceProfile,
  listSourceFilings,
  listSourceProfiles,
  parseSourceMachines,
  saveSourceFiling,
  saveSourceInvite,
  saveSourceJob,
  saveSourceProfile,
  sourceInviteHref,
  uniqueSourceSlug,
} from "@/lib/source";

export type SourceFormState = {
  success: boolean;
  message: string;
  receiptTo?: string;
  matches?: SourcePublicMatch[];
  diameterMm?: number | null;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function signedInShop() {
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated || !userId) return null;
  const user = await currentUser();
  return {
    userId,
    email: user?.primaryEmailAddress?.emailAddress ?? "",
  };
}

async function shopCellBudget(email: string, userId?: string | null) {
  const filings = await listSourceFilings();
  const shopRows = sourceFilingsForShop(filings, { userId, email });
  const used = countSourceCells(shopRows);
  const plan = userId ? await getSourcePlanForUser(userId) : planById("free");
  return { filings, shopRows, used, plan, remaining: remainingSourceCells(plan, used) };
}

async function upsertShopProfile({
  userId,
  company,
  name,
  phone,
  city,
  state,
  website,
  blurb,
}: {
  userId: string;
  company: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  website: string;
  blurb?: string;
}) {
  const existing = await getSourceProfile(userId);
  const slug = existing?.slug || (await uniqueSourceSlug(company, userId));
  const now = new Date().toISOString();
  await saveSourceProfile({
    userId,
    slug,
    company,
    name,
    phone,
    city,
    state,
    website: normalizeShopWebsite(website),
    blurb: (blurb ?? existing?.blurb ?? "").trim().slice(0, 500),
    published: true,
    claimedDirectory: existing?.claimedDirectory,
    secondaries: existing?.secondaries ?? [],
    listedAt: existing?.listedAt || existing?.updatedAt || now,
    updatedAt: now,
  });
  return slug;
}

export async function sendSourceInvite(
  _prev: SourceFormState,
  formData: FormData,
): Promise<SourceFormState> {
  if (!(await isAdmin())) {
    return { success: false, message: "Admin password required." };
  }
  const to = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim().slice(0, 120);
  const note = String(formData.get("note") ?? "").trim().slice(0, 500);
  if (!isValidEmail(to)) {
    return { success: false, message: "Enter a shop email for the invite." };
  }
  if (!(await blobReady())) {
    return { success: false, message: "Could not store the invite." };
  }

  const id = randomUUID();
  const href = sourceInviteHref(id);
  const invite = {
    id,
    to,
    company,
    note,
    href,
    sentAt: new Date().toISOString(),
  };

  try {
    await saveSourceInvite(invite);
  } catch (error) {
    console.error("[Source invite store]", error);
    return {
      success: false,
      message: `Could not store the invite (${blobErrorMessage(error)}).`,
    };
  }

  const emailed = await sendSourceInviteEmails({ to, company, href });
  if (!emailed) {
    return {
      success: false,
      message: `Invite stored but mail failed. Copy ${href} or email ${QUOTE_EMAIL}.`,
    };
  }
  return {
    success: true,
    message: `Invite sent to ${to}. LEAD copy is in the shop inbox.`,
  };
}

export async function claimDirectoryListing(
  _prev: SourceFormState,
  formData: FormData,
): Promise<SourceFormState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const signedIn = await signedInShop();
  if (!signedIn) {
    redirect(
      `/sign-in?redirect_url=${encodeURIComponent(sourceClaimPath(slug))}`,
    );
  }

  const listed = getDirectoryCompany(slug);
  if (!listed) {
    return { success: false, message: "That listing is not in the directory." };
  }
  if (!sourceClaimable(listed)) {
    return {
      success: false,
      message: "Source is USA shops for now. Europe later, on its own platform.",
    };
  }

  const owner = await findSourceProfileBySlug(slug);
  if (owner && owner.userId === signedIn.userId) {
    redirect("/source/dashboard");
  }
  if (owner) {
    return {
      success: false,
      message: "This page is already claimed.",
    };
  }

  const existing = await getSourceProfile(signedIn.userId);
  if (
    existing?.slug &&
    existing.slug !== slug &&
    (existing.claimedDirectory || getDirectoryCompany(existing.slug))
  ) {
    return {
      success: false,
      message: `This account already claimed ${existing.company}.`,
    };
  }

  if (!(await blobReady())) {
    return { success: false, message: "Could not store the claim." };
  }

  const now = new Date().toISOString();
  try {
    await saveSourceProfile({
      userId: signedIn.userId,
      slug: listed.slug,
      company: listed.name,
      name: existing?.name ?? "",
      phone: existing?.phone || listed.phone || "",
      city: existing?.city || directoryCity(listed),
      state: existing?.state || listed.state,
      website: normalizeShopWebsite(existing?.website || listed.website || ""),
      blurb: (existing?.blurb || listed.description).trim().slice(0, 500),
      published: true,
      claimedDirectory: true,
      secondaries: existing?.secondaries ?? [],
      listedAt: existing?.listedAt || existing?.updatedAt || now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("[Source claim store]", error);
    return {
      success: false,
      message: `Could not store the claim (${blobErrorMessage(error)}).`,
    };
  }

  if (signedIn.email) {
    await sendSourceClaimEmails({
      to: signedIn.email,
      company: listed.name,
      slug: listed.slug,
    });
  }

  redirect("/source/dashboard");
}

export async function submitSourceEquipment(
  _prev: SourceFormState,
  formData: FormData,
): Promise<SourceFormState> {
  const inviteId = String(formData.get("inviteId") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim().slice(0, 120);
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);
  const city = String(formData.get("city") ?? "").trim().slice(0, 80);
  const state = String(formData.get("state") ?? "").trim().slice(0, 40);
  const website = String(formData.get("website") ?? "").trim().slice(0, 200);
  const notes = String(formData.get("notes") ?? "").trim().slice(0, 2000);
  const machines = parseSourceMachines(String(formData.get("machines") ?? "[]"));
  const file = formData.get("list") as File | null;
  const fileName =
    file && file.size > 0 ? file.name.replace(/[^\w.-]+/g, "_") : undefined;

  if (!company) {
    return { success: false, message: "Enter the shop name." };
  }
  if (!isValidEmail(email)) {
    return { success: false, message: "Enter a valid email." };
  }
  if (machines.length === 0 && !(file && file.size > 0)) {
    return {
      success: false,
      message: "Add at least one cell, or upload an equipment list file.",
    };
  }
  if (file && file.size > 4 * 1024 * 1024) {
    return { success: false, message: "List file must be under 4 MB." };
  }

  if (inviteId) {
    const invite = await getSourceInvite(inviteId);
    if (!invite) {
      return { success: false, message: "That invite link is not valid." };
    }
  }

  const signedIn = await signedInShop();
  const budget = await shopCellBudget(email, signedIn?.userId);
  if (machines.length > 0 && machines.length > budget.remaining) {
    return {
      success: false,
      message: `${sourceCapMessage(budget.plan, budget.used)} See /source/upgrade.`,
    };
  }

  const filing = {
    inviteId: inviteId || undefined,
    userId: signedIn?.userId,
    company,
    name,
    email,
    phone,
    city,
    state,
    website,
    machines,
    notes,
    fileName,
    timestamp: new Date().toISOString(),
  };

  try {
    if (await blobReady()) {
      await saveSourceFiling(filing);
      if (signedIn?.userId) {
        await upsertShopProfile({
          userId: signedIn.userId,
          company,
          name,
          phone,
          city,
          state,
          website,
        });
      }
    }
  } catch (error) {
    console.error("[Source filing store]", error);
    return {
      success: false,
      message: `Could not store the list (${blobErrorMessage(error)}).`,
    };
  }

  const emailed = await sendSourceFilingEmails({
    to: email,
    company,
    name,
    phone,
    city,
    state,
    website,
    machines,
    notes,
    fileName,
    hasAccount: Boolean(signedIn?.userId),
  });
  if (!emailed) {
    return {
      success: false,
      message: `List received but mail failed. Email ${QUOTE_EMAIL} if you need a copy.`,
    };
  }
  return {
    success: true,
    message: `Confirm the account in ${email}. The shop dashboard is where you add more cells.`,
  };
}

export async function addSourceCells(
  _prev: SourceFormState,
  formData: FormData,
): Promise<SourceFormState> {
  const signedIn = await signedInShop();
  if (!signedIn) {
    return { success: false, message: "Sign in to add cells." };
  }

  const notes = String(formData.get("notes") ?? "").trim().slice(0, 2000);
  const machines = parseSourceMachines(String(formData.get("machines") ?? "[]"));
  const file = formData.get("list") as File | null;
  const fileName =
    file && file.size > 0 ? file.name.replace(/[^\w.-]+/g, "_") : undefined;

  if (machines.length === 0 && !(file && file.size > 0)) {
    return {
      success: false,
      message: "Add at least one cell, or upload an equipment list file.",
    };
  }
  if (file && file.size > 4 * 1024 * 1024) {
    return { success: false, message: "List file must be under 4 MB." };
  }

  const email = signedIn.email;
  if (!isValidEmail(email)) {
    return { success: false, message: "Your account needs an email." };
  }

  const budget = await shopCellBudget(email, signedIn.userId);
  if (machines.length > budget.remaining) {
    return {
      success: false,
      message: `${sourceCapMessage(budget.plan, budget.used)} See /source/upgrade.`,
    };
  }

  const profile = await getSourceProfile(signedIn.userId);
  const shop = profile
    ? {
        company: profile.company,
        name: profile.name,
        phone: profile.phone,
        city: profile.city,
        state: profile.state,
        website: profile.website,
      }
    : shopFromFilings(budget.shopRows);
  if (!shop) {
    return {
      success: false,
      message: "Register the shop first on /source/equipment.",
    };
  }

  const filing = {
    userId: signedIn.userId,
    company: shop.company,
    name: shop.name,
    email,
    phone: shop.phone,
    city: shop.city,
    state: shop.state,
    website: shop.website,
    machines,
    notes,
    fileName,
    timestamp: new Date().toISOString(),
  };

  try {
    if (await blobReady()) {
      await saveSourceFiling(filing);
    }
  } catch (error) {
    console.error("[Source cells store]", error);
    return {
      success: false,
      message: `Could not store the cells (${blobErrorMessage(error)}).`,
    };
  }

  return {
    success: true,
    message:
      machines.length === 1
        ? "Saved 1 cell."
        : `Saved ${machines.length} cells.`,
  };
}

export async function updateSourceShop(
  _prev: SourceFormState,
  formData: FormData,
): Promise<SourceFormState> {
  const signedIn = await signedInShop();
  if (!signedIn) {
    return { success: false, message: "Sign in to edit the shop." };
  }

  const company = String(formData.get("company") ?? "").trim().slice(0, 120);
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);
  const city = String(formData.get("city") ?? "").trim().slice(0, 80);
  const state = String(formData.get("state") ?? "").trim().slice(0, 40);
  const website = String(formData.get("website") ?? "").trim().slice(0, 200);
  const blurb = String(formData.get("blurb") ?? "").trim().slice(0, 500);

  if (!company) {
    return { success: false, message: "Enter the shop name." };
  }

  try {
    if (!(await blobReady())) {
      return { success: false, message: "Could not store the shop." };
    }
    const slug = await upsertShopProfile({
      userId: signedIn.userId,
      company,
      name,
      phone,
      city,
      state,
      website,
      blurb,
    });
    return {
      success: true,
      message: `Shop saved. Public page is /directory/${slug}.`,
    };
  } catch (error) {
    console.error("[Source shop store]", error);
    return {
      success: false,
      message: `Could not store the shop (${blobErrorMessage(error)}).`,
    };
  }
}

export async function submitSourceJob(
  _prev: SourceFormState,
  formData: FormData,
): Promise<SourceFormState> {
  const company = String(formData.get("company") ?? "").trim().slice(0, 120);
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);
  const city = String(formData.get("city") ?? "").trim().slice(0, 80);
  const state = String(formData.get("state") ?? "").trim().slice(0, 40);
  const diameterRaw = String(formData.get("diameter") ?? "").trim().slice(0, 40);
  const kind = String(formData.get("kind") ?? "").trim().slice(0, 40);
  const oem = String(formData.get("oem") ?? "").trim().slice(0, 80);
  const qty = String(formData.get("qty") ?? "").trim().slice(0, 24);
  const notes = String(formData.get("notes") ?? "").trim().slice(0, 2000);

  if (!isValidEmail(email)) {
    return { success: false, message: "Enter a valid email." };
  }
  if (!diameterRaw && !notes) {
    return {
      success: false,
      message: "Enter a wire size, or describe the job in notes.",
    };
  }

  const parsed = await parseBuyerJob({
    diameterRaw,
    kind,
    oem,
    city,
    state,
    notes,
    buyerEmail: email,
  });
  if (parsed.spec.diameterMm == null) {
    return {
      success: false,
      message: "Could not read a wire diameter. Use mm or inches (8 mm, 3/8 in).",
    };
  }

  const filings = applyProfilesToFilings(
    await listSourceFilings(),
    await listSourceProfiles(),
  );
  const internal = matchFilingsToJob(filings, parsed.spec);
  const matches: SourcePublicMatch[] = internal.map(
    ({ email: _email, ...row }) => row,
  );

  const job = {
    company,
    name,
    email,
    phone,
    city: parsed.spec.city,
    state: parsed.spec.state,
    diameterRaw,
    diameterMm: parsed.spec.diameterMm,
    kind: parsed.spec.kind,
    oem: parsed.spec.oem,
    qty,
    notes,
    parsedBy: parsed.parsedBy,
    timestamp: new Date().toISOString(),
  };

  try {
    if (await blobReady()) {
      await saveSourceJob(job);
    }
  } catch (error) {
    console.error("[Source job store]", error);
    return {
      success: false,
      message: `Could not store the job (${blobErrorMessage(error)}).`,
    };
  }

  const emailed = await sendSourceJobEmails({
    to: email,
    company,
    name,
    phone,
    city: parsed.spec.city,
    state: parsed.spec.state,
    diameterRaw,
    diameterMm: parsed.spec.diameterMm,
    kind: parsed.spec.kind,
    oem: parsed.spec.oem,
    qty,
    notes,
    matches: internal,
  });
  if (!emailed) {
    return {
      success: false,
      message: `Job received but mail failed. Email ${QUOTE_EMAIL} if you need a copy.`,
      matches,
      diameterMm: parsed.spec.diameterMm,
    };
  }

  const message =
    matches.length === 0
      ? `No filed cell matches ${parsed.spec.diameterMm} mm yet. Receipt sent to ${email}. The desk has the RFQ.`
      : `Matched ${matches.length === 1 ? "1 shop" : `${matches.length} shops`} on filed cells. Receipt sent to ${email}. We introduce — emails stay with the desk.`;

  return {
    success: true,
    message,
    receiptTo: email,
    matches,
    diameterMm: parsed.spec.diameterMm,
  };
}
