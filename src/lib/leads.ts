import { list, put } from "@vercel/blob";
import { Resend } from "resend";

export const LEADS_NOTIFY_EMAIL =
  process.env.LEADS_NOTIFY_EMAIL?.trim() || "rberkes@gmail.com";

export type DirectoryLeadRecord = {
  name: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  linkedin: string;
  message: string;
  referredCompany: string;
  referredCompanySlug: string;
  source: string;
  timestamp: string;
};

function resendClient() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

export async function storeDirectoryLead(lead: DirectoryLeadRecord) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false;
  await put(
    `leads/directory/${Date.now()}.json`,
    JSON.stringify(lead),
    {
      access: "private",
      addRandomSuffix: true,
      contentType: "application/json",
    },
  );
  return true;
}

export async function emailDirectoryLead(lead: DirectoryLeadRecord) {
  const resend = resendClient();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!resend || !from) return false;
  await resend.emails.send({
    from,
    to: LEADS_NOTIFY_EMAIL,
    replyTo: lead.email,
    subject: `Directory lead: ${lead.referredCompany} — ${lead.name}`,
    html: `
      <h2>Directory lead</h2>
      <p><strong>About:</strong> ${lead.referredCompany} (/directory/${lead.referredCompanySlug})</p>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Title:</strong> ${lead.title || "—"}</p>
      <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
      <p><strong>Phone:</strong> ${lead.phone || "—"}</p>
      <p><strong>Their company:</strong> ${lead.company || "—"}</p>
      <p><strong>LinkedIn:</strong> ${
        lead.linkedin
          ? `<a href="${lead.linkedin}">${lead.linkedin}</a>`
          : "—"
      }</p>
      <p><strong>Notes:</strong> ${lead.message.replace(/\n/g, "<br />") || "—"}</p>
      <p><small>${lead.timestamp}</small></p>
    `,
  });
  return true;
}

export async function listDirectoryLeads() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const result = await list({ prefix: "leads/directory/" });
  return result.blobs.sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}
