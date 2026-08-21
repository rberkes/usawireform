import { get, list, put } from "@vercel/blob";
import { Resend } from "resend";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";

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
  if (!(await blobReady())) return false;
  await put(
    `leads/directory/${Date.now()}.json`,
    JSON.stringify(lead),
    {
      access: BLOB_ACCESS,
      addRandomSuffix: true,
      contentType: "application/json",
      ...(await blobAuth()),
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
  if (!(await blobReady())) return [];
  const result = await list({ prefix: "leads/directory/", ...(await blobAuth()) });
  return result.blobs.sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export type DirectoryLeadRow = DirectoryLeadRecord & {
  pathname: string;
  href: string;
};

export async function countDirectoryLeads() {
  const blobs = await listDirectoryLeads();
  return blobs.length;
}

export async function listDirectoryLeadRows(): Promise<DirectoryLeadRow[]> {
  const blobs = await listDirectoryLeads();
  const rows: DirectoryLeadRow[] = [];
  for (const blob of blobs.slice(0, 80)) {
    const result = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!result?.stream || result.statusCode !== 200) continue;
    try {
      const payload = JSON.parse(
        await new Response(result.stream).text(),
      ) as Partial<DirectoryLeadRecord>;
      rows.push({
        name: String(payload.name ?? ""),
        title: String(payload.title ?? ""),
        email: String(payload.email ?? ""),
        phone: String(payload.phone ?? ""),
        company: String(payload.company ?? ""),
        linkedin: String(payload.linkedin ?? ""),
        message: String(payload.message ?? ""),
        referredCompany: String(payload.referredCompany ?? ""),
        referredCompanySlug: String(payload.referredCompanySlug ?? ""),
        source: String(payload.source ?? ""),
        timestamp:
          String(payload.timestamp ?? "") ||
          (blob.uploadedAt instanceof Date
            ? blob.uploadedAt.toISOString()
            : String(blob.uploadedAt)),
        pathname: blob.pathname,
        href: adminFileHref(blob.pathname),
      });
    } catch {
      rows.push({
        name: blob.pathname,
        title: "",
        email: "",
        phone: "",
        company: "",
        linkedin: "",
        message: "",
        referredCompany: "",
        referredCompanySlug: "",
        source: "",
        timestamp:
          blob.uploadedAt instanceof Date
            ? blob.uploadedAt.toISOString()
            : String(blob.uploadedAt),
        pathname: blob.pathname,
        href: adminFileHref(blob.pathname),
      });
    }
  }
  return rows;
}
