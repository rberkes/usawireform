"use server";

import { randomUUID } from "crypto";
import { isAdmin } from "@/app/admin/actions";
import { QUOTE_EMAIL } from "@/lib/company";
import { blobErrorMessage, blobReady } from "@/lib/blob";
import {
  sendSourceFilingEmails,
  sendSourceInviteEmails,
} from "@/lib/leads";
import {
  getSourceInvite,
  parseSourceMachines,
  saveSourceFiling,
  saveSourceInvite,
  sourceInviteHref,
} from "@/lib/source";

export type SourceFormState = {
  success: boolean;
  message: string;
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
