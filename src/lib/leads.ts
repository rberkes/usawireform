import { get, list, put } from "@vercel/blob";
import { Resend } from "resend";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";
import {
  customerThanksHtml,
  escapeHtml,
  estimateLeadHtml,
  estimateReceiptHtml,
  shopLeadHtml,
  sourceClaimedReceiptHtml,
  sourceFiledReceiptHtml,
  sourceInviteHtml,
  sourceJobReceiptHtml,
  type EstimateMailCopy,
  type MailRow,
} from "@/lib/lead-mail";

export const LEADS_NOTIFY_EMAIL =
  process.env.LEADS_NOTIFY_EMAIL?.trim() || "rberkes@gmail.com";

/** Shop inboxes that should see every estimate and lead. */
export function shopNotifyEmails() {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of [QUOTE_EMAIL, LEADS_NOTIFY_EMAIL]) {
    const email = raw.trim();
    if (!email) continue;
    const key = email.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(email);
  }
  return out;
}

export function resendFromEmail() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `${COMPANY} <beth.t@example.com>`
  );
}

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

export type LeadMailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
  contentId?: string;
};

const PREVIEW_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_PREVIEW_BYTES = 3 * 1024 * 1024;

export async function previewAttachmentFromForm(formData: FormData) {
  const file = formData.get("preview");
  if (file instanceof File && file.size >= 80 && file.size <= MAX_PREVIEW_BYTES) {
    const type = file.type || "image/jpeg";
    if (PREVIEW_TYPES.has(type) || /\.(jpe?g|png|webp)$/i.test(file.name)) {
      return {
        filename: file.name.replace(/[^\w.-]+/g, "_") || "drawing.jpg",
        content: Buffer.from(await file.arrayBuffer()),
        contentType: type,
        contentId: "drawing",
      } satisfies LeadMailAttachment;
    }
  }

  const dataUrl = String(formData.get("previewData") ?? "");
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\s]+)$/);
  if (!match) return undefined;
  const content = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  if (content.length < 80 || content.length > MAX_PREVIEW_BYTES) return undefined;
  return {
    filename: "drawing.jpg",
    content,
    contentType: match[1],
    contentId: "drawing",
  } satisfies LeadMailAttachment;
}

function resendClient() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

async function sendResendMail({
  to,
  subject,
  html,
  replyTo,
  attachments,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: LeadMailAttachment[];
}) {
  const resend = resendClient();
  if (!resend || !process.env.RESEND_API_KEY) return false;
  const recipients = (Array.isArray(to) ? to : [to])
    .map((addr) => addr.trim())
    .filter(Boolean);
  if (!recipients.length) return false;
  const { error } = await resend.emails.send({
    from: resendFromEmail(),
    to: recipients,
    replyTo,
    subject,
    html,
    ...(attachments?.length
      ? {
          attachments: attachments.map((item) => ({
            filename: item.filename,
            content: item.content.toString("base64"),
            contentType: item.contentType,
            contentId: item.contentId,
          })),
        }
      : {}),
  });
  if (error) {
    console.error("[Lead email]", { to, subject, error });
    if (attachments?.length) {
      return sendResendMail({ to, subject, html, replyTo });
    }
    return false;
  }
  return true;
}

async function sendShopMails({
  subject,
  html,
  replyTo,
  attachments,
}: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: LeadMailAttachment[];
}) {
  const results = await Promise.all(
    shopNotifyEmails().map((to) =>
      sendResendMail({ to, subject, html, replyTo, attachments }),
    ),
  );
  return results.some(Boolean);
}

export async function sendLeadEmail({
  subject,
  html,
  replyTo,
  heading,
  fileName,
  preview,
}: {
  subject: string;
  html: string;
  replyTo?: string;
  heading?: string;
  fileName?: string;
  preview?: LeadMailAttachment;
}) {
  return sendShopMails({
    replyTo,
    subject,
    html: shopLeadHtml({
      heading: heading ?? "New lead",
      fileName,
      hasPreview: Boolean(preview),
      bodyHtml: html,
    }),
    attachments: preview ? [preview] : undefined,
  });
}

export async function sendLeadThanksEmail({
  to,
  name,
  kind,
  fileName,
  preview,
}: {
  to: string;
  name?: string;
  kind: "quote" | "quick" | "directory" | "machine";
  fileName?: string;
  preview?: LeadMailAttachment;
}) {
  return sendResendMail({
    to,
    replyTo: QUOTE_EMAIL,
    subject:
      kind === "quote" || kind === "quick"
        ? `We have your drawing — ${COMPANY}`
        : `We received your note — ${COMPANY}`,
    html: customerThanksHtml({
      name,
      fileName,
      hasPreview: Boolean(preview),
      kind,
    }),
    attachments: preview ? [preview] : undefined,
  });
}

export async function sendDrawingLeadEmails({
  to,
  name,
  subject,
  heading,
  intro,
  fileName,
  preview,
  rows,
}: {
  to: string;
  name?: string;
  subject: string;
  heading: string;
  intro?: string;
  fileName?: string;
  preview?: LeadMailAttachment;
  rows: MailRow[];
}) {
  const attachments = preview ? [preview] : undefined;
  const [shop, customer] = await Promise.all([
    sendShopMails({
      replyTo: to,
      subject,
      html: shopLeadHtml({
        heading,
        intro,
        fileName,
        hasPreview: Boolean(preview),
        rows,
      }),
      attachments,
    }),
    sendLeadThanksEmail({
      to,
      name,
      kind: "quote",
      fileName,
      preview,
    }),
  ]);
  console.log("[Drawing lead mail]", { to, shop, customer, hasPreview: Boolean(preview) });
  return shop;
}

export type InstantEstimateMail = EstimateMailCopy;

export async function sendInstantEstimateEmails(estimate: InstantEstimateMail) {
  const [shop, customer] = await Promise.all([
    sendShopMails({
      replyTo: estimate.to,
      subject: `LEAD: ${estimate.to}`,
      html: estimateLeadHtml(estimate),
    }),
    sendResendMail({
      to: estimate.to,
      replyTo: QUOTE_EMAIL,
      subject: `Receipt: your estimate — ${COMPANY}`,
      html: estimateReceiptHtml(estimate),
    }),
  ]);
  console.log("[Instant estimate mail]", {
    to: estimate.to,
    shop,
    customer,
    notify: shopNotifyEmails(),
  });
  return shop && customer;
}

export async function sendSourceInviteEmails({
  to,
  company,
  href,
}: {
  to: string;
  company?: string;
  href: string;
}) {
  const shopName = company?.trim() || to;
  const safeTo = escapeHtml(to);
  const safeCompany = company ? escapeHtml(company) : "";
  const safeHref = escapeHtml(href);
  const [shop, invite] = await Promise.all([
    sendLeadEmail({
      replyTo: to,
      heading: "LEAD — Source invite sent",
      subject: `LEAD: Source invite — ${shopName}`,
      html: `<p>Invite sent to <a href="mailto:${safeTo}">${safeTo}</a>${
        safeCompany ? ` (${safeCompany})` : ""
      }.</p>
        <p>They register and upload equipment from this link:<br />
        <a href="${safeHref}">${safeHref}</a></p>`,
    }),
    sendResendMail({
      to,
      replyTo: QUOTE_EMAIL,
      subject: `Wire forming leads to your inbox — ${COMPANY}`,
      html: sourceInviteHtml({ company, href }),
    }),
  ]);
  console.log("[Source invite mail]", { to, company, shop, invite });
  return shop && invite;
}

export async function sendSourceFilingEmails({
  to,
  company,
  name,
  phone,
  city,
  state,
  website,
  machines,
  notes,
  fileName,
  hasAccount,
}: {
  to: string;
  company: string;
  name?: string;
  phone?: string;
  city?: string;
  state?: string;
  website?: string;
  machines: Array<{
    oem: string;
    model: string;
    kind: string;
    minMm: string;
    maxMm: string;
    city: string;
  }>;
  notes?: string;
  fileName?: string;
  hasAccount?: boolean;
}) {
  const cells = machines
    .map(
      (row) =>
        `${escapeHtml(row.oem)} ${escapeHtml(row.model)} · ${escapeHtml(row.kind)} · ${escapeHtml(row.minMm)}–${escapeHtml(row.maxMm)} mm${
          row.city ? ` · ${escapeHtml(row.city)}` : ""
        }`,
    )
    .join("<br />");
  const shopLabel = escapeHtml(company || "Shop");
  const safeTo = escapeHtml(to);
  const [shop, receipt] = await Promise.all([
    sendLeadEmail({
      replyTo: to,
      heading: "LEAD — equipment list",
      subject: `LEAD: equipment list — ${company || to}`,
      html: `<p><strong>${shopLabel}</strong> filed equipment on Source.</p>
        <p>Email: <a href="mailto:${safeTo}">${safeTo}</a>${name ? ` · ${escapeHtml(name)}` : ""}</p>
        ${phone ? `<p>Phone: ${escapeHtml(phone)}</p>` : ""}
        ${city || state ? `<p>Locale: ${escapeHtml([city, state].filter(Boolean).join(", "))}</p>` : ""}
        ${website ? `<p>Site: ${escapeHtml(website)}</p>` : ""}
        <p>${cells || "No machine rows — see attached list if any."}</p>
        ${fileName ? `<p>File: ${escapeHtml(fileName)}</p>` : ""}
        ${notes ? `<p>Notes: ${escapeHtml(notes)}</p>` : ""}`,
    }),
    sendResendMail({
      to,
      replyTo: QUOTE_EMAIL,
      subject: `Confirm your Source account — ${COMPANY}`,
      html: sourceFiledReceiptHtml({
        company,
        machineCount: machines.length,
        email: to,
        hasAccount,
      }),
    }),
  ]);
  console.log("[Source filing mail]", { to, company, shop, receipt });
  return shop && receipt;
}

export async function sendSourceClaimEmails({
  to,
  company,
  slug,
}: {
  to: string;
  company: string;
  slug: string;
}) {
  const shopLabel = escapeHtml(company || "Shop");
  const safeTo = escapeHtml(to);
  const listing = `${SITE_URL}/directory/${slug}`;
  const [shop, receipt] = await Promise.all([
    sendLeadEmail({
      replyTo: to,
      heading: "LEAD — directory claim",
      subject: `LEAD: claimed directory — ${company || to}`,
      html: `<p><strong>${shopLabel}</strong> claimed its directory page.</p>
        <p>Email: <a href="mailto:${safeTo}">${safeTo}</a></p>
        <p>Listing: <a href="${escapeHtml(listing)}">${escapeHtml(listing)}</a></p>`,
    }),
    sendResendMail({
      to,
      replyTo: QUOTE_EMAIL,
      subject: `You claimed ${company || "the listing"} — ${COMPANY}`,
      html: sourceClaimedReceiptHtml({ company, slug }),
    }),
  ]);
  console.log("[Source claim mail]", { to, company, slug, shop, receipt });
  return shop && receipt;
}

export async function sendSourceJobEmails({
  to,
  company,
  name,
  phone,
  city,
  state,
  diameterRaw,
  diameterMm,
  kind,
  oem,
  qty,
  notes,
  matches,
}: {
  to: string;
  company: string;
  name?: string;
  phone?: string;
  city?: string;
  state?: string;
  diameterRaw: string;
  diameterMm: number | null;
  kind: string;
  oem: string;
  qty: string;
  notes: string;
  matches: Array<{
    company: string;
    email: string;
    city: string;
    state: string;
    oem: string;
    model: string;
    kind: string;
    minMm: string;
    maxMm: string;
    why: string;
  }>;
}) {
  const size =
    diameterMm != null
      ? `${diameterMm} mm`
      : diameterRaw.trim() || "unspecified wire";
  const chairs = matches
    .map(
      (row, index) =>
        `${index + 1}. ${escapeHtml(row.company)} — <a href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a><br />
        ${escapeHtml(row.why)}${row.city || row.state ? ` · ${escapeHtml([row.city, row.state].filter(Boolean).join(", "))}` : ""}`,
    )
    .join("<p></p>");
  const [shop, receipt] = await Promise.all([
    sendLeadEmail({
      replyTo: to,
      heading: "LEAD — Source job",
      subject: `LEAD: Source job — ${size} — ${company || to}`,
      html: `<p><strong>${escapeHtml(company || "Buyer")}</strong> asked Source to match a job.</p>
        <p>Email: <a href="mailto:${escapeHtml(to)}">${escapeHtml(to)}</a>${name ? ` · ${escapeHtml(name)}` : ""}</p>
        ${phone ? `<p>Phone: ${escapeHtml(phone)}</p>` : ""}
        ${city || state ? `<p>Locale: ${escapeHtml([city, state].filter(Boolean).join(", "))}</p>` : ""}
        <p>Wire: ${escapeHtml(diameterRaw || size)}${kind ? ` · ${escapeHtml(kind)}` : ""}${oem ? ` · ${escapeHtml(oem)}` : ""}${qty ? ` · qty ${escapeHtml(qty)}` : ""}</p>
        ${notes ? `<p>Notes: ${escapeHtml(notes)}</p>` : ""}
        <p><strong>${matches.length === 0 ? "No filed cell matched." : "Introduce these shops:"}</strong></p>
        ${chairs || "<p>Empty floor list — work the RFQ from the desk.</p>"}`,
    }),
    sendResendMail({
      to,
      replyTo: QUOTE_EMAIL,
      subject: `Receipt: your Source job — ${COMPANY}`,
      html: sourceJobReceiptHtml({
        matchCount: matches.length,
        diameterMm,
      }),
    }),
  ]);
  console.log("[Source job mail]", { to, company, matches: matches.length, shop, receipt });
  return shop && receipt;
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
  return sendLeadEmail({
    heading: "Directory intro",
    subject: `Directory lead: ${lead.referredCompany} — ${lead.name}`,
    replyTo: lead.email,
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
