import { get, list, put } from "@vercel/blob";
import { Resend } from "resend";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { COMPANY, QUOTE_EMAIL, SITE_HOST, SITE_URL } from "@/lib/company";
import { QUOTE_REVIEW, TOOLING } from "@/lib/price";
import {
  customerThanksHtml,
  shopLeadHtml,
  type MailRow,
} from "@/lib/lead-mail";

export const LEADS_NOTIFY_EMAIL =
  process.env.LEADS_NOTIFY_EMAIL?.trim() || "rberkes@gmail.com";

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: LeadMailAttachment[];
}) {
  const resend = resendClient();
  if (!resend || !process.env.RESEND_API_KEY) return false;
  const { error } = await resend.emails.send({
    from: resendFromEmail(),
    to,
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
  return sendResendMail({
    to: LEADS_NOTIFY_EMAIL,
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
    sendResendMail({
      to: LEADS_NOTIFY_EMAIL,
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

export type InstantEstimateMail = {
  to: string;
  diameterLabel: string;
  materialLabel: string;
  cuts: number;
  bends: number;
  lengthIn: number;
  quantity: number;
  piece: string;
  lot: string;
  forming: string;
  cut: string;
  bend: string;
  discount?: string;
  stock: boolean;
  shopSteel?: boolean;
  steelLb?: string;
  steelUsd?: string;
  beatUsd?: string;
};

function instantEstimateHtml(estimate: InstantEstimateMail) {
  const qty = estimate.quantity.toLocaleString("en-US");
  const tooling = estimate.stock
    ? ""
    : `<p>Non-stock diameter: new tooling in ${TOOLING.newLead}, ${TOOLING.newCostLabel}. Not in the piece price.</p>`;
  const coilLine = estimate.shopSteel
    ? `Steel: ${escapeHtml(estimate.materialLabel)} — we buy it. ${escapeHtml(estimate.steelLb ?? "")} lb · ${escapeHtml(estimate.steelUsd ?? "")} in the piece price.`
    : `Coil: ${escapeHtml(estimate.materialLabel)} — you buy it and bring it in. Alloy is not in this number.`;
  const bendLine = estimate.shopSteel
    ? `<li>Bends on the drawing — not billed</li>`
    : `<li>${estimate.bends} bend${estimate.bends === 1 ? "" : "s"} — ${escapeHtml(estimate.bend)}</li>`;
  return `
    <p>USA Wire Form — instant estimate from the numbers you entered.</p>
    <p style="font-size:28px;margin:8px 0 0"><strong>${escapeHtml(estimate.piece)}</strong> / piece</p>
    <p>${escapeHtml(estimate.lot)} for ${qty} pcs</p>
    <p>
      ${escapeHtml(estimate.diameterLabel)}<br />
      ${coilLine}
    </p>
    <ul>
      <li>Forming · ${estimate.lengthIn} in — ${escapeHtml(estimate.forming)}</li>
      <li>${estimate.cuts} cut${estimate.cuts === 1 ? "" : "s"} — ${escapeHtml(estimate.cut)}</li>
      ${bendLine}
      ${estimate.discount ? `<li>${escapeHtml(estimate.discount)}</li>` : ""}
      ${estimate.shopSteel && estimate.beatUsd ? `<li>5% under boxed 3/8 — −${escapeHtml(estimate.beatUsd)}</li>` : ""}
    </ul>
    ${tooling}
    <p>${QUOTE_REVIEW} This is not a production quote. Weld, finish, and a print still go through <a href="${SITE_URL}/contact">contact</a>.</p>
    <p>Reply to this email with a STEP if you want the shop to look at the form.<br />
    ${COMPANY} · Northeast Ohio · <a href="${SITE_URL}">${SITE_HOST}</a></p>
  `;
}

export async function sendInstantEstimateEmails(estimate: InstantEstimateMail) {
  const html = instantEstimateHtml(estimate);
  const [shop, customer] = await Promise.all([
    sendLeadEmail({
      replyTo: estimate.to,
      heading: "Instant estimate",
      subject: `Instant estimate: ${estimate.piece}/pc · ${estimate.quantity.toLocaleString("en-US")} pcs`,
      html: `<h2>Instant estimate emailed to the customer</h2>
        <p><strong>To:</strong> <a href="mailto:${escapeHtml(estimate.to)}">${escapeHtml(estimate.to)}</a></p>
        ${html}`,
    }),
    sendResendMail({
      to: estimate.to,
      replyTo: QUOTE_EMAIL,
      subject: `Your estimate — ${COMPANY}`,
      html,
    }),
  ]);
  return shop && customer;
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
