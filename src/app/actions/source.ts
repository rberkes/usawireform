"use server";

import { randomUUID } from "crypto";
import { isAdmin } from "@/app/admin/actions";
import { QUOTE_EMAIL } from "@/lib/company";
import { blobErrorMessage, blobReady } from "@/lib/blob";
import {
  sendSourceFilingEmails,
  sendSourceInviteEmails,
  sendSourceJobEmails,
} from "@/lib/leads";
import { parseBuyerJob } from "@/lib/source-job-parse";
import { matchFilingsToJob } from "@/lib/source-match";
import type { SourcePublicMatch } from "@/lib/source-types";
import {
  getSourceInvite,
  listSourceFilings,
  parseSourceMachines,
  saveSourceFiling,
  saveSourceInvite,
  saveSourceJob,
  sourceInviteHref,
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

  const filing = {
    inviteId: inviteId || undefined,
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
  });
  if (!emailed) {
    return {
      success: false,
      message: `List received but mail failed. Email ${QUOTE_EMAIL} if you need a copy.`,
    };
  }
  return {
    success: true,
    message: `Receipt sent to ${email}. The shop has a LEAD with this equipment list.`,
  };
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

  const filings = await listSourceFilings();
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
