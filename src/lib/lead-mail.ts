import { COMPANY, SITE_HOST, SITE_URL } from "@/lib/company";
import { QUOTE_REVIEW, TOOLING } from "@/lib/price";
import { SOURCE_PLAN_LINE } from "@/lib/source-plans";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type MailRow = { label: string; value: string; href?: string };

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

function shell(preheader: string, innerRows: string) {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f4f2">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #eceae6">
          <tr>
            <td style="height:6px;background:#0b6bcb;font-size:0;line-height:0">&nbsp;</td>
          </tr>
          ${innerRows}
          <tr>
            <td style="padding:4px 32px 28px;font-family:${FONT};font-size:13px;line-height:1.55;color:#5c5c5c">
              ${COMPANY} · Northeast Ohio · 4–14 mm CNC<br />
              <a href="${SITE_URL}" style="color:#0b6bcb;text-decoration:none">${SITE_HOST}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function kickerRow() {
  return `<tr>
    <td style="padding:24px 32px 0;font-family:${FONT}">
      <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#0b6bcb">${COMPANY}</p>
    </td>
  </tr>`;
}

function headingRow(heading: string) {
  return `<tr>
    <td style="padding:10px 32px 0;font-family:${FONT};font-size:26px;line-height:1.25;color:#111111;font-weight:500">
      ${escapeHtml(heading)}
    </td>
  </tr>`;
}

function copyRow(html: string) {
  return `<tr>
    <td style="padding:14px 32px 0;font-family:${FONT};font-size:15px;line-height:1.65;color:#111111">
      ${html}
    </td>
  </tr>`;
}

function drawingRow(fileName: string | undefined, hasPreview: boolean) {
  if (!hasPreview && !fileName) return "";
  const caption = fileName
    ? `<p style="margin:10px 0 0;font-family:${FONT};font-size:12px;letter-spacing:0.04em;color:#5c5c5c">${escapeHtml(fileName)}</p>`
    : "";
  const image = hasPreview
    ? `<img src="cid:drawing" alt="${escapeHtml(fileName || "Uploaded drawing")}" width="496" style="display:block;width:100%;max-width:496px;height:auto;border:0;background:#f4f4f2" />`
    : "";
  return `<tr>
    <td style="padding:20px 32px 0">
      <p style="margin:0 0 10px;font-family:${FONT};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#0b6bcb">The form you sent</p>
      ${image}
      ${caption}
    </td>
  </tr>`;
}

export function mailRowsHtml(rows: MailRow[]) {
  const cells = rows
    .map((row) => {
      const value = row.href
        ? `<a href="${escapeHtml(row.href)}" style="color:#0b6bcb;text-decoration:none">${escapeHtml(row.value)}</a>`
        : escapeHtml(row.value);
      return `<tr>
        <td style="padding:9px 0;border-bottom:1px solid #eceae6;font-family:${FONT};font-size:13px;color:#5c5c5c;width:36%;vertical-align:top">${escapeHtml(row.label)}</td>
        <td style="padding:9px 0;border-bottom:1px solid #eceae6;font-family:${FONT};font-size:13px;color:#111111;vertical-align:top">${value}</td>
      </tr>`;
    })
    .join("");
  return `<tr>
    <td style="padding:20px 32px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cells}</table>
    </td>
  </tr>`;
}

function ctaBannerRow(href: string, label: string, hint?: string) {
  const hintHtml = hint
    ? `<p style="margin:14px 0 0;font-family:${FONT};font-size:13px;line-height:1.5;color:#5c5c5c;text-align:center">${escapeHtml(hint)}</p>`
    : "";
  return `<tr>
    <td style="padding:28px 32px 8px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%">
        <tr>
          <td align="center" bgcolor="#0b6bcb" style="background-color:#0b6bcb;border-radius:2px">
            <a href="${escapeHtml(href)}" style="display:block;padding:22px 28px;font-family:${FONT};font-size:18px;font-weight:600;line-height:1.25;color:#ffffff;text-decoration:none;text-align:center">
              ${escapeHtml(label)}
            </a>
          </td>
        </tr>
      </table>
      ${hintHtml}
    </td>
  </tr>`;
}

function estimateForwardMailto(estimate: EstimateMailCopy) {
  const part = estimate.hookType ?? "wire form";
  const lines = [
    `USA Wire Form estimate — ${part}`,
    "",
    ...estimateFactRows(estimate).map((row) => `${row.label}: ${row.value}`),
    "",
    `Builder: ${SITE_URL}/custom-powder-coating-hooks`,
    "Not a production quote. Reply to USA Wire Form if you want a STEP reviewed.",
  ];
  const subject = `${COMPANY} estimate — ${part}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function customerThanksHtml({
  name,
  fileName,
  hasPreview,
  kind,
}: {
  name?: string;
  fileName?: string;
  hasPreview: boolean;
  kind: "quote" | "quick" | "directory" | "machine";
}) {
  const who = name?.trim() ? escapeHtml(name.trim()) : "";
  const hello = who ? `Hi ${who},` : "Hi,";
  const drawing = kind === "quote" || kind === "quick";
  const heading = drawing ? "We have your drawing" : "We received your note";
  const intro = drawing
    ? `${hello}<br /><br />Thank you for your time, and for the upload. USA Wire Form has ${fileName ? `<strong>${escapeHtml(fileName)}</strong>` : "the file"}. We'll be with you shortly — usually within 24 hours.`
    : kind === "directory"
      ? `${hello}<br /><br />Thank you for your time. We received the intro and will follow up if we can help.`
      : `${hello}<br /><br />Thank you for your time. We received the machine note and will route it.`;
  const follow = drawing
    ? `If this isn't the part, reply with the right STEP, Solid file, or PDF. No STEP? We'll model one free.`
    : `Reply to this email if you need to add a note.`;
  const cta =
    kind === "directory"
      ? ctaBannerRow(
          `${SITE_URL}/source`,
          "Match a job on Source",
          "Wire size, 2D or 3D, locale. We introduce shops that filed that iron.",
        )
      : kind === "machine"
        ? ctaBannerRow(
            `${SITE_URL}/source/equipment`,
            "File your cells on Source",
            "List every cell free. Jobs match the iron on the floor.",
          )
        : ctaBannerRow(
            `${SITE_URL}/contact`,
            "Send another drawing",
            "STEP, IGES, or a print. We'll look at the form.",
          );

  return shell(
    drawing
      ? "Thank you for the upload. We'll be with you within 24 hours."
      : "Thank you for your time. We'll be with you shortly.",
    `${kickerRow()}
     ${headingRow(heading)}
     ${copyRow(intro)}
     ${drawing ? drawingRow(fileName, hasPreview) : ""}
     ${cta}
     ${copyRow(`<span style="color:#5c5c5c">${follow}</span>`)}`,
  );
}

export function drawingReviewedHtml({
  name,
  fileName,
}: {
  name?: string;
  fileName?: string;
}) {
  const who = name?.trim() ? escapeHtml(name.trim()) : "";
  const hello = who ? `Hi ${who},` : "Hi,";
  const file = fileName?.trim()
    ? `<strong>${escapeHtml(fileName.trim())}</strong>`
    : "your drawing";
  const intro = `${hello}<br /><br />A quote team specialist opened ${file}. We have the file in review and will be in touch.`;
  return shell(
    "A quote team specialist opened your drawing.",
    `${kickerRow()}
     ${headingRow("Your drawing is with the quote team")}
     ${copyRow(intro)}
     ${drawingRow(fileName, false)}
     ${copyRow(`<span style="color:#5c5c5c">Reply if this isn't the right file, or if anything on the print changed.</span>`)}`,
  );
}

export function shopLeadHtml({
  heading,
  intro,
  fileName,
  hasPreview,
  rows,
  bodyHtml,
}: {
  heading: string;
  intro?: string;
  fileName?: string;
  hasPreview: boolean;
  rows?: MailRow[];
  bodyHtml?: string;
}) {
  const body = bodyHtml
    ? `<tr>
        <td style="padding:16px 32px 0;font-family:${FONT};font-size:14px;line-height:1.6;color:#111111">
          ${bodyHtml}
        </td>
      </tr>`
    : "";
  const links = `<tr>
    <td style="padding:20px 32px 0;font-family:${FONT};font-size:14px">
      <a href="${SITE_URL}/admin" style="color:#0b6bcb;text-decoration:none">Open quote files</a>
      &nbsp;·&nbsp;
      <a href="${SITE_URL}/admin/leads" style="color:#0b6bcb;text-decoration:none">Open directory</a>
    </td>
  </tr>`;

  return shell(heading, `${kickerRow()}
    ${headingRow(heading)}
    ${intro ? copyRow(intro) : ""}
    ${drawingRow(fileName, hasPreview)}
    ${rows?.length ? mailRowsHtml(rows) : ""}
    ${body}
    ${links}`);
}

export type EstimateMailCopy = {
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
  hookType?: string;
  overallIn?: string;
  legIdIn?: string;
  notes?: string;
};

function estimateFactRows(estimate: EstimateMailCopy): MailRow[] {
  const qty = estimate.quantity.toLocaleString("en-US");
  const material = estimate.shopSteel
    ? `${estimate.materialLabel} — shop steel${
        estimate.steelLb && estimate.steelUsd
          ? ` · ${estimate.steelLb} lb · ${estimate.steelUsd}`
          : ""
      }`
    : `${estimate.materialLabel} — customer coil`;
  const part = [
    estimate.hookType,
    estimate.overallIn ? `${estimate.overallIn} in overall` : "",
    estimate.legIdIn ? `${estimate.legIdIn} in leg ID` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const rows: MailRow[] = [
    ...(part ? [{ label: "Part", value: part }] : []),
    { label: "Wire", value: estimate.diameterLabel },
    { label: "Material", value: material },
    { label: "Quantity", value: `${qty} pcs` },
    { label: "Piece", value: `${estimate.piece} / piece` },
    { label: "Lot", value: `${estimate.lot} for ${qty} pcs` },
    {
      label: "Forming",
      value: `${estimate.lengthIn} in — ${estimate.forming}`,
    },
    {
      label: "Cuts",
      value: `${estimate.cuts} — ${estimate.cut}`,
    },
  ];
  if (estimate.shopSteel) {
    rows.push({ label: "Bends", value: "On the drawing — not billed" });
  } else {
    rows.push({
      label: "Bends",
      value: `${estimate.bends} — ${estimate.bend}`,
    });
  }
  if (estimate.discount) {
    rows.push({ label: "Qty break", value: estimate.discount });
  }
  if (estimate.shopSteel && estimate.beatUsd) {
    rows.push({ label: "5% under boxed 3/8", value: `−${estimate.beatUsd}` });
  }
  if (!estimate.stock) {
    rows.push({
      label: "Tooling",
      value: `Non-stock · ${TOOLING.newLead} · ${TOOLING.newCostLabel}. Not in the piece price.`,
    });
  }
  if (estimate.notes) {
    rows.push({ label: "Notes", value: estimate.notes });
  }
  return rows;
}

/** Client copy — a receipt to keep. */
export function estimateReceiptHtml(estimate: EstimateMailCopy) {
  return shell(
    "Save this estimate for your files.",
    `${kickerRow()}
     ${headingRow("Your estimate receipt")}
     ${copyRow("Keep this email. It is not a production quote. Reply if you want the shop to look at a STEP.")}
     ${mailRowsHtml(estimateFactRows(estimate))}
     ${ctaBannerRow(
       `${SITE_URL}/contact`,
       "Send a STEP",
       "This estimate is not a production quote. A print still goes through the desk.",
     )}
     ${copyRow(`<span style="color:#5c5c5c"><a href="${escapeHtml(estimateForwardMailto(estimate))}" style="color:#0b6bcb;text-decoration:none">Forward to a coworker</a> · ${QUOTE_REVIEW}</span>`)}`,
  );
}

/** Shop copy — a lead. The customer's email is the point. */
export function estimateLeadHtml(estimate: EstimateMailCopy) {
  const email = escapeHtml(estimate.to);
  return shopLeadHtml({
    heading: "LEAD",
    intro: `<p style="margin:0 0 12px;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#0b6bcb">Lead — follow up</p>
      <p style="font-size:22px;line-height:1.3;margin:0"><a href="mailto:${email}" style="color:#0b6bcb;text-decoration:none">${email}</a></p>
      <p style="margin:12px 0 0">This person asked us to email themselves an estimate. Reply to this message to write them.</p>`,
    hasPreview: false,
    rows: [
      {
        label: "Customer email",
        value: estimate.to,
        href: `mailto:${estimate.to}`,
      },
      ...estimateFactRows(estimate),
    ],
  });
}

export function sourceInviteHtml({
  company,
  href,
}: {
  company?: string;
  href: string;
}) {
  const shop = company?.trim()
    ? escapeHtml(company.trim())
    : "";
  const hello = shop
    ? `This is for ${shop}.`
    : "This is for your shop.";
  return shell(
    "Wire forming leads to your inbox — jobs that fit your machines.",
    `${kickerRow()}
     ${headingRow("Wire forming leads to your inbox")}
     ${copyRow(`${hello} We send RFQs by the iron on the floor — wire size, 2D or 3D, brand, and city. Not a directory listing.`)}
     ${ctaBannerRow(
       href,
       "Add your machines",
       "Takes a few minutes. Use the email this was sent to.",
     )}
     ${copyRow(`<span style="color:#5c5c5c">For each machine: brand, model, 2D or 3D, smallest and largest wire (mm), city. That list is how a job finds you.</span>`)}`,
  );
}

export function sourceFiledReceiptHtml({
  company,
  machineCount,
  email,
  hasAccount,
}: {
  company?: string;
  machineCount: number;
  email?: string;
  hasAccount?: boolean;
}) {
  const who = company?.trim() ? escapeHtml(company.trim()) : "your shop";
  const n =
    machineCount === 1 ? "1 cell" : `${machineCount.toLocaleString("en-US")} cells`;
  const confirmHref = `${SITE_URL}/sign-up?as=supplier&redirect_url=${encodeURIComponent(`${SITE_URL}/source/enter`)}${
    email ? `&email_address=${encodeURIComponent(email)}` : ""
  }`;
  const dashboardHref = `${SITE_URL}/source/dashboard`;
  const upgradeHref = `${SITE_URL}/source/upgrade`;
  const cta = hasAccount
    ? ctaBannerRow(
        dashboardHref,
        "Open the shop dashboard",
        "Add cells, edit the listing, or buy a matched lead.",
      )
    : ctaBannerRow(
        confirmHref,
        "Confirm your Source account",
        "Use this email. Then the shop dashboard. Listing is free. $49 unlocks a matched lead.",
      );
  return shell(
    hasAccount
      ? "We have the list. Finish the shop from the dashboard."
      : "Confirm your Source account. Then log in and finish the shop.",
    `${kickerRow()}
     ${headingRow(hasAccount ? "Your cells are on Source" : "Confirm your Source account")}
     ${copyRow(`We have the list. ${who} filed ${n}. ${
       hasAccount
         ? "The shop dashboard is where you add more iron."
         : "Confirm the account, then log in to finish registration and add more iron."
     }`)}
     ${cta}
     ${copyRow(`<span style="color:#5c5c5c">${SOURCE_PLAN_LINE} <a href="${escapeHtml(upgradeHref)}" style="color:#0b6bcb;text-decoration:none">Plans</a>.</span>`)}`,
  );
}

export function sourceClaimedReceiptHtml({
  company,
  slug,
}: {
  company: string;
  slug: string;
}) {
  const who = escapeHtml(company.trim() || "your shop");
  const listingHref = `${SITE_URL}/directory/${encodeURIComponent(slug)}`;
  const dashboardHref = `${SITE_URL}/source/dashboard`;
  return shell(
    "You claimed the directory page. File cells from the shop dashboard.",
    `${kickerRow()}
     ${headingRow("You claimed the page")}
     ${copyRow(`${who} is yours on Source. Public listing stays <a href="${escapeHtml(listingHref)}" style="color:#0b6bcb;text-decoration:none">${escapeHtml(`${SITE_HOST}/directory/${slug}`)}</a>. File CNC cells from the dashboard.`)}
     ${ctaBannerRow(
       dashboardHref,
       "Open the shop dashboard",
       "List every cell free. Buy matched leads from the dashboard.",
     )}
     ${copyRow(SOURCE_PLAN_LINE)}`,
  );
}

export function sourceJobReceiptHtml({
  matchCount,
  diameterMm,
  drawingPrivacy = "desk",
  privacyHref,
}: {
  matchCount: number;
  diameterMm?: number | null;
  drawingPrivacy?: "desk" | "matched";
  privacyHref?: string;
}) {
  const size =
    diameterMm != null
      ? `${diameterMm.toLocaleString("en-US")} mm`
      : "this print";
  const chairs =
    matchCount === 0
      ? `No filed cell matches ${size} yet. The desk has the RFQ and will work it.`
      : matchCount === 1
        ? `One shop can run ${size}. They see the job and can quote.`
        : `Up to ${Math.min(matchCount, 10)} shops that can run ${size} see the job.`;
  const privacy =
    drawingPrivacy === "matched"
      ? "You released the STEP. A quoting shop can open it in the dashboard. It is not posted and not attached to email."
      : "You kept the STEP at the desk. Shops quote from the spec. You choose whether they get the file.";
  const privacyCta = privacyHref
    ? ctaBannerRow(
        privacyHref,
        "Change drawing privacy",
        "Keep it at the desk, or release it to matched shops.",
      )
    : "";
  return shell(
    "Your Source job is in.",
    `${kickerRow()}
     ${headingRow("Your Source job is in")}
     ${copyRow(chairs)}
     ${copyRow(privacy)}
     ${privacyCta}
     ${ctaBannerRow(
       `${SITE_URL}/source`,
       "Send another job",
       "Wire size, 2D or 3D, locale. We introduce — emails stay with the desk.",
     )}
     ${copyRow(`<span style="color:#5c5c5c">Run a shop? <a href="${SITE_URL}/source/shops" style="color:#0b6bcb;text-decoration:none">List every cell free</a>. Instant estimate on this site is still this floor — 4–14 mm Robomac.</span>`)}`,
  );
}

export function sourceShopLeadHtml({
  shop,
  why,
  fitNote,
  spec,
}: {
  shop: string;
  why: string;
  fitNote?: string;
  buyer?: {
    company?: string;
    name?: string;
    email: string;
    phone?: string;
    city?: string;
    state?: string;
  };
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
  const size =
    spec.diameterMm != null
      ? `${spec.diameterMm.toLocaleString("en-US")} mm`
      : spec.diameterRaw.trim() || "unspecified wire";
  return shell(
    `A Source job matches your cell — ${size}`,
    `${kickerRow()}
     ${headingRow("A job matches your cell")}
     ${copyRow(`${escapeHtml(shop || "Your shop")}: this print sits in a cell you filed. The lead is in the shop dashboard. $49 unlocks buyer contact. Up to 10 shops can buy it.`)}
     ${copyRow(`<strong>${escapeHtml(why)}</strong>${fitNote ? `<br />${escapeHtml(fitNote)}` : ""}`)}
     ${mailRowsHtml(
       [
         spec.kind ? { label: "Cell", value: spec.kind } : null,
         { label: "Wire", value: spec.diameterRaw || size },
         spec.oem ? { label: "OEM", value: spec.oem } : null,
         spec.qty ? { label: "Qty", value: spec.qty } : null,
         spec.notes
           ? { label: "Notes", value: spec.notes.slice(0, 180) }
           : null,
       ].filter((row): row is MailRow => Boolean(row)),
     )}
     ${ctaBannerRow(
       `${SITE_URL}/source/dashboard`,
       "Open the shop dashboard — $49 to unlock",
       "Buyer email is not in this message. The STEP is never attached.",
     )}`,
  );
}

export function sourceIncompleteReminderHtml({
  company,
  href,
  heading,
  body,
  cta,
  hint,
}: {
  company: string;
  href: string;
  heading: string;
  body: string;
  cta: string;
  hint: string;
}) {
  const who = escapeHtml(company.trim() || "your shop");
  return shell(
    heading,
    `${kickerRow()}
     ${headingRow(heading)}
     ${copyRow(`${who}. ${body}`)}
     ${ctaBannerRow(href, cta, hint)}
     ${copyRow(`<span style="color:#5c5c5c">If this is already done, sign in and the dashboard will skip this step. Questions: reply to this email.</span>`)}`,
  );
}
