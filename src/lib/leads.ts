import { get, list, put } from "@vercel/blob";
import { Resend } from "resend";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";
import {
  customerThanksHtml,
  drawingReviewedHtml,
  escapeHtml,
  estimateLeadHtml,
  estimateReceiptHtml,
  shopLeadHtml,
  sourceCapacityReminderHtml,
  sourceClaimedReceiptHtml,
  sourceFiledReceiptHtml,
  sourceIncompleteReminderHtml,
  sourceInviteHtml,
  sourceJobReceiptHtml,
  sourceShopLeadHtml,
  sourceShopWaitlistHtml,
  sourceShopRebidHtml,
  sourceShopClosedHtml,
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

export async function sendDrawingReviewedEmail({
  to,
  name,
  fileName,
}: {
  to: string;
  name?: string;
  fileName?: string;
}) {
  return sendResendMail({
    to,
    replyTo: QUOTE_EMAIL,
    subject: `Your drawing is with the quote team — ${COMPANY}`,
    html: drawingReviewedHtml({ name, fileName }),
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

export async function sendSourceIncompleteReminderEmail({
  to,
  company,
  href,
  kind,
  detail,
}: {
  to: string;
  company: string;
  href: string;
  kind: "claim" | "nda" | "confirm" | "invite";
  detail: string;
}) {
  const shopName = company.trim() || "your shop";
  const copy =
    kind === "claim"
      ? {
          subject: `Finish claiming ${shopName} on Source`,
          heading: "Finish claiming your listing",
          cta: `Finish claiming ${shopName}`,
          hint: "Sign in with the email this was sent to.",
        }
      : kind === "nda"
        ? {
            subject: `Accept the Source NDA — ${shopName}`,
            heading: "One step left: the supplier NDA",
            cta: "Accept the NDA",
            hint: "Sign in with this email. Takes a minute.",
          }
        : kind === "confirm"
          ? {
              subject: `Confirm your Source account — ${shopName}`,
              heading: "Confirm the shop account",
              cta: "Confirm the shop account",
              hint: "Use this email. Next is the supplier NDA.",
            }
          : {
              subject: `Your Source invite is still open — ${shopName}`,
              heading: "Your Source invite is still open",
              cta: "Add your machines",
              hint: "Use the email this was sent to.",
            };
  const ok = await sendResendMail({
    to,
    replyTo: QUOTE_EMAIL,
    subject: `${copy.subject} — ${COMPANY}`,
    html: sourceIncompleteReminderHtml({
      company: shopName,
      href,
      heading: copy.heading,
      body: detail,
      cta: copy.cta,
      hint: copy.hint,
    }),
  });
  console.log("[Source incomplete reminder]", { to, company, kind, ok });
  return ok;
}

export async function sendSourceCapacityReminderEmail({
  to,
  company,
  href,
  current,
}: {
  to: string;
  company: string;
  href: string;
  current?: string;
}) {
  const shopName = company.trim() || "your shop";
  const ok = await sendResendMail({
    to,
    replyTo: QUOTE_EMAIL,
    subject: `Move the Source capacity slider — ${shopName} — ${COMPANY}`,
    html: sourceCapacityReminderHtml({
      company: shopName,
      href,
      current,
    }),
  });
  console.log("[Source capacity reminder]", { to, company, ok });
  return ok;
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

export async function sendSourceBuyerSignupEmails({
  to,
  company,
  name,
}: {
  to: string;
  company: string;
  name?: string;
}) {
  const shopLabel = escapeHtml(company || "Buyer");
  const safeTo = escapeHtml(to);
  const dashboard = `${SITE_URL}/admin/accounts#buyers`;
  return sendLeadEmail({
    replyTo: to,
    heading: "LEAD — buyer account",
    subject: `LEAD: buyer sign-up — ${company || to}`,
    html: `<p><strong>${shopLabel}</strong> confirmed a Source buyer account.</p>
      <p>Email: <a href="mailto:${safeTo}">${safeTo}</a>${name ? ` · ${escapeHtml(name)}` : ""}</p>
      <p>Prints (STEP, DXF, SLDPRT, PDF) are open. Excel and other files stay locked until you validate this buyer on <a href="${escapeHtml(dashboard)}">${escapeHtml(dashboard)}</a>.</p>`,
  });
}

export async function sendSourceJobEmails({
  to,
  company,
  name,
  phone,
  city,
  state,
  zip,
  diameterRaw,
  diameterMm,
  kind,
  oem,
  qty,
  notes,
  matches,
  mailed = [],
  held = false,
  drawingPrivacy = "desk",
  privacyHref,
}: {
  to: string;
  company: string;
  name?: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
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
    fitNote?: string;
  }>;
  mailed?: Array<{
    company: string;
    email: string;
    why: string;
    fitNote?: string;
  }>;
  held?: boolean;
  drawingPrivacy?: "desk" | "matched";
  privacyHref?: string;
}) {
  const size =
    diameterMm != null
      ? `${diameterMm} mm`
      : diameterRaw.trim() || "unspecified wire";
  const mailedKeys = new Set(
    mailed.map((row) => `${row.email.trim().toLowerCase()}|${row.company}`),
  );
  const chairLine = (
    row: (typeof matches)[number],
    index: number,
    sent: boolean,
  ) =>
    `${index + 1}. ${escapeHtml(row.company)} — <a href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a>${sent ? " · emailed" : " · listing only"}<br />
        ${escapeHtml(row.why)}${row.fitNote ? ` · ${escapeHtml(row.fitNote)}` : ""}${row.city || row.state ? ` · ${escapeHtml([row.city, row.state].filter(Boolean).join(", "))}` : ""}`;
  const chairs = matches
    .map((row, index) =>
      chairLine(
        row,
        index,
        mailedKeys.has(`${row.email.trim().toLowerCase()}|${row.company}`),
      ),
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
        ${city || state || zip ? `<p>Locale: ${escapeHtml([city, state, zip].filter(Boolean).join(", "))}</p>` : ""}
        <p>Wire: ${escapeHtml(diameterRaw || size)}${kind ? ` · ${escapeHtml(kind)}` : ""}${oem ? ` · ${escapeHtml(oem)}` : ""}${qty ? ` · qty ${escapeHtml(qty)}` : ""}</p>
        ${notes ? `<p>Notes: ${escapeHtml(notes)}</p>` : ""}
        <p><strong>${
          held
            ? "Held at the desk — shops not notified. Recommended if you Release:"
            : matches.length === 0
              ? "No filed cell matched."
              : "Capability matches:"
        }</strong></p>
        ${chairs || "<p>Empty floor list — work the RFQ from the desk.</p>"}
        <p>${
          held
            ? "Release to shops from /admin/accounts. Shops then see a teaser and pay $49 to unlock buyer contact."
            : "Matched shops see the lead in Source and pay $49 to unlock buyer contact. Six shops see the teaser. First two to unlock get contact."
        }</p>
        <p>Drawing: ${drawingPrivacy === "matched" ? "buyer released the STEP — a shop that bought the lead opens it in the dashboard, not attached here." : "buyer kept the STEP at the desk — do not forward the file."}</p>`,
    }),
    sendResendMail({
      to,
      replyTo: QUOTE_EMAIL,
      subject: `Receipt: your Source job — ${COMPANY}`,
      html: sourceJobReceiptHtml({
        matchCount: mailed.length,
        diameterMm,
        drawingPrivacy,
        privacyHref,
        held,
      }),
    }),
  ]);
  console.log("[Source job mail]", {
    to,
    company,
    matches: matches.length,
    mailed: mailed.length,
    shop,
    receipt,
  });
  return shop && receipt;
}

export async function sendSourceShopWaitlistEmails({
  shops,
  spec,
}: {
  shops: Array<{ company: string; email: string }>;
  spec: {
    diameterRaw: string;
    diameterMm: number | null;
    kind: string;
    qty: string;
  };
}) {
  const results = await Promise.all(
    shops.map(async (row) => {
      if (!row.email.trim()) return false;
      const ok = await sendResendMail({
        to: row.email,
        replyTo: QUOTE_EMAIL,
        subject: `You are next in line — ${COMPANY}`,
        html: sourceShopWaitlistHtml({ shop: row.company, spec }),
      });
      console.log("[Source waitlist]", { to: row.email, company: row.company, ok });
      return ok;
    }),
  );
  return results.filter(Boolean).length;
}

export async function sendSourceShopRebidEmails({
  shops,
  reason,
  spec,
}: {
  shops: Array<{ company: string; email: string }>;
  reason: string;
  spec: {
    diameterRaw: string;
    diameterMm: number | null;
    kind: string;
    qty: string;
  };
}) {
  const results = await Promise.all(
    shops.map(async (row) => {
      if (!row.email.trim()) return false;
      const ok = await sendResendMail({
        to: row.email,
        replyTo: QUOTE_EMAIL,
        subject: `This print is open for another quote — ${COMPANY}`,
        html: sourceShopRebidHtml({ shop: row.company, reason, spec }),
      });
      console.log("[Source rebid]", { to: row.email, company: row.company, ok });
      return ok;
    }),
  );
  return results.filter(Boolean).length;
}

export async function sendSourceShopClosedEmails({
  shops,
  spec,
}: {
  shops: Array<{ company: string; email: string }>;
  spec: { diameterRaw: string; diameterMm: number | null; kind: string };
}) {
  const results = await Promise.all(
    shops.map(async (row) => {
      if (!row.email.trim()) return false;
      const ok = await sendResendMail({
        to: row.email,
        replyTo: QUOTE_EMAIL,
        subject: `The buyer closed this print — ${COMPANY}`,
        html: sourceShopClosedHtml({ shop: row.company, spec }),
      });
      console.log("[Source closed]", { to: row.email, company: row.company, ok });
      return ok;
    }),
  );
  return results.filter(Boolean).length;
}

export async function sendSourceBuyerPayEmail({
  to,
  company,
  name,
}: {
  to: string;
  company: string;
  name?: string;
}) {
  const hello = name ? escapeHtml(name) : "there";
  return sendResendMail({
    to,
    replyTo: QUOTE_EMAIL,
    subject: `Your Source print is ready — ${COMPANY}`,
    html: `<p>Hi ${hello},</p>
      <p>Two shops can buy first — first come. Another quote is $49 from the buyer dashboard.</p>
      <p><a href="${SITE_URL}/buyer/dashboard">${SITE_URL}/buyer/dashboard</a></p>`,
  });
}

export async function sendSourceBuyerExtraShopsEmail({
  company,
  email,
  qty,
  pathname,
}: {
  company: string;
  email: string;
  qty: number;
  pathname: string;
}) {
  const n = Math.max(1, Math.floor(qty));
  return sendLeadEmail({
    replyTo: email,
    heading: "LEAD — buyer extra shops",
    subject: `LEAD: buyer extra shops × ${n} — ${company || email}`,
    html: `<p><strong>${escapeHtml(company || email)}</strong> paid for ${n} extra shop ${n === 1 ? "slot" : "slots"} ($49 each).</p>
      <p>Email: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p>Job: ${escapeHtml(pathname)}</p>
      <p>Desk only — the buyer receipt is Stripe. Accounts: <a href="${SITE_URL}/admin/accounts#files">${SITE_URL}/admin/accounts#files</a></p>`,
  });
}

export async function sendSourceNdaEmails({
  to,
  company,
  name,
}: {
  to: string;
  company: string;
  name?: string;
}) {
  const shopLabel = escapeHtml(company || "Shop");
  const safeTo = escapeHtml(to);
  return sendLeadEmail({
    replyTo: to,
    heading: "LEAD — shop NDA",
    subject: `LEAD: shop NDA — ${company || to}`,
    html: `<p><strong>${shopLabel}</strong> accepted the Source NDA.</p>
      <p>Email: <a href="mailto:${safeTo}">${safeTo}</a>${name ? ` · ${escapeHtml(name)}` : ""}</p>
      <p>Shop dashboard: <a href="${SITE_URL}/source/dashboard">${SITE_URL}/source/dashboard</a></p>`,
  });
}

export async function sendSourceCellsAddedEmail({
  to,
  company,
  count,
  fileName,
}: {
  to: string;
  company: string;
  count: number;
  fileName?: string;
}) {
  const shopLabel = escapeHtml(company || "Shop");
  const safeTo = escapeHtml(to);
  return sendLeadEmail({
    replyTo: to,
    heading: "LEAD — more cells",
    subject: `LEAD: more cells — ${company || to}`,
    html: `<p><strong>${shopLabel}</strong> added ${count} ${count === 1 ? "cell" : "cells"} on Source.</p>
      <p>Email: <a href="mailto:${safeTo}">${safeTo}</a></p>
      ${fileName ? `<p>File: ${escapeHtml(fileName)}</p>` : ""}`,
  });
}

export async function sendSourceBuyerVolumeEmail({
  to,
  company,
  name,
  jobsPerMonth,
  previous,
}: {
  to: string;
  company: string;
  name?: string;
  jobsPerMonth: number;
  previous?: number;
}) {
  const shopLabel = escapeHtml(company || "Buyer");
  const safeTo = escapeHtml(to);
  const volume =
    jobsPerMonth >= 10 ? "10+ jobs / month" : `${jobsPerMonth} / month`;
  const prev =
    previous == null
      ? "not filed"
      : previous >= 10
        ? "10+"
        : String(previous);
  return sendLeadEmail({
    replyTo: to || undefined,
    heading: "LEAD — buyer volume",
    subject: `LEAD: buyer volume ${volume} — ${company || to}`,
    html: `<p><strong>${shopLabel}</strong> moved the monthly job slider.</p>
      <p>Now: <strong>${escapeHtml(volume)}</strong> (was ${escapeHtml(prev)}).</p>
      <p>Email: <a href="mailto:${safeTo}">${safeTo}</a>${name ? ` · ${escapeHtml(name)}` : ""}</p>
      <p>Desk only — the buyer did not get a copy. Use this to predict how many prints this account may send.</p>
      <p>Buyer: <a href="${SITE_URL}/admin/accounts#buyers">${SITE_URL}/admin/accounts#buyers</a></p>`,
  });
}

export async function sendSourceShopLeadEmails({
  mailed,
  spec,
  maskedBuyerEmail,
}: {
  mailed: Array<{
    company: string;
    email: string;
    why: string;
    fitNote?: string;
  }>;
  buyer?: {
    company?: string;
    name?: string;
    email: string;
    phone?: string;
    city?: string;
    state?: string;
  };
  maskedBuyerEmail?: string;
  spec: {
    diameterRaw: string;
    diameterMm: number | null;
    kind: string;
    oem: string;
    qty: string;
    notes: string;
  };
  drawingPrivacy?: "desk" | "matched";
}) {
  const results = await Promise.all(
    mailed.map(async (row) => {
      const ok = await sendResendMail({
        to: row.email,
        replyTo: QUOTE_EMAIL,
        subject: `A Source job matches your cell — ${COMPANY}`,
        html: sourceShopLeadHtml({
          shop: row.company,
          why: row.why,
          fitNote: row.fitNote,
          spec,
          maskedBuyerEmail,
        }),
      });
      console.log("[Source shop lead]", { to: row.email, company: row.company, ok });
      return ok;
    }),
  );
  return results.filter(Boolean).length;
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
