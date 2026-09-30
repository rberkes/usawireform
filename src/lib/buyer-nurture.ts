import { COMPANY, DESK_FIRST_NAME, SITE_URL } from "@/lib/company";
import { drawingKindOf, DRAWING_LIST, DRAWING_FREE_STEP } from "@/lib/drawings";
import { WIRE } from "@/lib/range";

export const HOW_TO_ORDER_PATH = "/guide/how-to-order";
export const HOW_TO_ORDER_HREF = `${SITE_URL}${HOW_TO_ORDER_PATH}`;
export const DESIGN_GUIDE_HREF = `${SITE_URL}/guide/design-for-wire-forming`;
export const MATERIALS_HREF = `${SITE_URL}/materials`;
export const QUOTING_HREF = `${SITE_URL}/quoting`;
export const SOURCE_UPLOAD_HREF = `${SITE_URL}/source#job`;
export const INSTANT_QUOTE_HREF = `${SITE_URL}/instant-quote`;

export function firstNameOf(name?: string) {
  const first = name?.trim().split(/\s+/)[0] ?? "";
  if (first.length < 2 || first.length > 24) return "";
  if (!/^[A-Za-z][A-Za-z.'-]*$/.test(first)) return "";
  return first;
}

export function helloLine(name?: string) {
  const first = firstNameOf(name);
  return first ? `Hi ${first},` : "Hi,";
}

export function deskSignOff() {
  return `${DESK_FIRST_NAME}<br />${COMPANY}`;
}

export function formatCoachHtml(fileName?: string) {
  const kind = drawingKindOf(fileName);
  if (kind === "cad") {
    return `Please note: ${DRAWING_LIST} is what the quoting path reads first. <strong>${escapePlain(fileName || "Your file")}</strong> is in that set.`;
  }
  if (kind === "pdf") {
    return `A PDF 3-view is enough for us to model a STEP free. For the fastest upload on the site, a STEP, DXF, or SolidWorks file is better. ${DRAWING_FREE_STEP}`;
  }
  if (kind === "other") {
    return `Photos and office files are notes, not a quote file. ${DRAWING_FREE_STEP}`;
  }
  return `${DRAWING_FREE_STEP}`;
}

export function websitePriceHtml() {
  return `Feel free to upload on the website whenever you are ready. Using the site gets the absolute best price on the project — a desk quote is only required for parts outside typical limits (${WIRE.short}, or a process this cell does not run).`;
}

export function gettingStartedHtml() {
  return `You may want to start with <a href="${HOW_TO_ORDER_HREF}" style="color:#0b6bcb;text-decoration:none">How to order wire forms</a> and the <a href="${DESIGN_GUIDE_HREF}" style="color:#0b6bcb;text-decoration:none">design guide</a>.`;
}

export function lookingForwardHtml() {
  return "We're looking forward to working on this with you.";
}

export function educationFooterHtml() {
  return `Set up your files for a quicker turnaround with our <a href="${DESIGN_GUIDE_HREF}" style="color:#0b6bcb;text-decoration:none">Design guide</a> and reference coil grades in the <a href="${MATERIALS_HREF}" style="color:#0b6bcb;text-decoration:none">Material Catalog</a>. Tooling and coil minimums sit on <a href="${QUOTING_HREF}" style="color:#0b6bcb;text-decoration:none">Quotes, tooling, and coil</a>.<br /><br />Become a regular buyer on this site. The <a href="${HOW_TO_ORDER_HREF}" style="color:#0b6bcb;text-decoration:none">How to order</a> walkthrough is the education series.`;
}

function escapePlain(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
