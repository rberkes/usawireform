import { get, list, put } from "@vercel/blob";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { sendDrawingReviewedEmail } from "@/lib/leads";

export type QuoteSubmission = {
  id: string;
  kind: "contact" | "quick" | "drawing" | "instant";
  timestamp: string;
  email?: string;
  name?: string;
  company?: string;
  phone?: string;
  material?: string;
  diameter?: string;
  fileName?: string;
  drawingUrl?: string;
  drawingPath?: string;
  source?: string;
  targetPrice?: string;
  timeline?: string;
  quality?: string;
  linkedin?: string;
  notes?: string;
  recordPath: string;
  reviewedNotifiedAt?: string;
};

async function listPrefix(prefix: string) {
  if (!(await blobReady())) return [];
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 100, ...(await blobAuth()) });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

async function readPrivateJson(pathname: string) {
  const result = await get(pathname, {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function fromRecord(
  pathname: string,
  payload: Record<string, unknown>,
): QuoteSubmission {
  const kind =
    payload.kind === "contact"
      ? "contact"
      : payload.kind === "instant"
        ? "instant"
        : "quick";
  const fileName = asString(payload.fileName);
  const drawingPath = asString(payload.drawingPath);
  return {
    id: pathname,
    kind,
    timestamp: asString(payload.timestamp) ?? "",
    email: asString(payload.email),
    name: asString(payload.name),
    company: asString(payload.company),
    phone: asString(payload.phone),
    material: asString(payload.material),
    diameter: asString(payload.diameter),
    fileName,
    drawingUrl: drawingPath
      ? adminFileHref(drawingPath, fileName)
      : asString(payload.drawingUrl),
    drawingPath,
    source: asString(payload.source),
    targetPrice: asString(payload.targetPrice),
    timeline: asString(payload.timeline),
    quality: asString(payload.quality),
    linkedin: asString(payload.linkedin),
    notes: asString(payload.notes),
    recordPath: pathname,
    reviewedNotifiedAt: asString(payload.reviewedNotifiedAt),
  };
}

function drawingPathMatches(stored: string | undefined, viewed: string) {
  if (!stored || !viewed) return false;
  if (stored === viewed) return true;
  try {
    if (decodeURIComponent(stored) === viewed) return true;
    if (stored === decodeURIComponent(viewed)) return true;
  } catch {
    /* ignore */
  }
  try {
    const url = new URL(stored);
    const pathname = decodeURIComponent(url.pathname.replace(/^\//, ""));
    return pathname === viewed || pathname.endsWith(`/${viewed}`);
  } catch {
    return false;
  }
}

/** Email the buyer once when the desk opens their drawing. Returns true if this path belonged to a quote record. */
export async function notifyQuoteBuyerOnDrawingView(viewedPath: string) {
  if (!(await blobReady())) return false;
  const records = (
    await Promise.all([listPrefix("leads/contact/"), listPrefix("leads/quick/")])
  ).flat();

  for (const blob of records) {
    const payload = await readPrivateJson(blob.pathname);
    if (!payload) continue;
    if (
      !drawingPathMatches(asString(payload.drawingPath), viewedPath) &&
      !drawingPathMatches(asString(payload.drawingUrl), viewedPath)
    ) {
      continue;
    }
    const email = asString(payload.email);
    if (!email) return true;
    if (asString(payload.reviewedNotifiedAt)) return true;

    payload.reviewedNotifiedAt = new Date().toISOString();
    await put(blob.pathname, JSON.stringify(payload), {
      access: BLOB_ACCESS,
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
      ...(await blobAuth()),
    });
    const ok = await sendDrawingReviewedEmail({
      to: email,
      name: asString(payload.name),
      fileName: asString(payload.fileName),
    });
    console.log("[Drawing viewed mail]", {
      to: email,
      path: viewedPath,
      record: blob.pathname,
      ok,
    });
    return true;
  }
  return false;
}

export async function countQuoteSubmissions() {
  if (!(await blobReady())) return 0;
  const [contactRecords, quickRecords, instantRecords] = await Promise.all([
    listPrefix("leads/contact/"),
    listPrefix("leads/quick/"),
    listPrefix("leads/instant/"),
  ]);
  return contactRecords.length + quickRecords.length + instantRecords.length;
}

export async function listQuoteSubmissions(): Promise<QuoteSubmission[]> {
  if (!(await blobReady())) return [];

  const [contactRecords, quickRecords, instantRecords, quoteFiles, quickFiles] =
    await Promise.all([
      listPrefix("leads/contact/"),
      listPrefix("leads/quick/"),
      listPrefix("leads/instant/"),
      listPrefix("quotes/"),
      listPrefix("quick-quotes/"),
    ]);

  const records = [...contactRecords, ...quickRecords, ...instantRecords].sort(
    (a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt),
  );

  const submissions: QuoteSubmission[] = [];
  const drawingUrls = new Set<string>();

  for (const blob of records.slice(0, 80)) {
    const payload = await readPrivateJson(blob.pathname);
    if (!payload) continue;
    const row = fromRecord(blob.pathname, payload);
    if (!row.timestamp) {
      row.timestamp =
        blob.uploadedAt instanceof Date
          ? blob.uploadedAt.toISOString()
          : String(blob.uploadedAt);
    }
    if (row.drawingUrl) drawingUrls.add(row.drawingUrl);
    if (row.drawingPath) drawingUrls.add(row.drawingPath);
    submissions.push(row);
  }

  for (const blob of [...quoteFiles, ...quickFiles]) {
    if (
      drawingUrls.has(blob.pathname) ||
      drawingUrls.has(blob.url) ||
      drawingUrls.has(blob.downloadUrl)
    )
      continue;
    submissions.push({
      id: blob.pathname,
      kind: "drawing",
      timestamp:
        blob.uploadedAt instanceof Date
          ? blob.uploadedAt.toISOString()
          : String(blob.uploadedAt),
      fileName: blob.pathname.split("/").pop(),
      drawingUrl: adminFileHref(blob.pathname, blob.pathname.split("/").pop()),
      recordPath: blob.pathname,
    });
  }

  return submissions.sort(
    (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp),
  );
}
