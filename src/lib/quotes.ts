import { get, list } from "@vercel/blob";
import { adminFileHref, blobAuth, blobReady } from "@/lib/blob";

export type QuoteSubmission = {
  id: string;
  kind: "contact" | "quick" | "drawing";
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
  const kind = payload.kind === "contact" ? "contact" : "quick";
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
  };
}

export async function listQuoteSubmissions(): Promise<QuoteSubmission[]> {
  if (!(await blobReady())) return [];

  const [contactRecords, quickRecords, quoteFiles, quickFiles] =
    await Promise.all([
      listPrefix("leads/contact/"),
      listPrefix("leads/quick/"),
      listPrefix("quotes/"),
      listPrefix("quick-quotes/"),
    ]);

  const records = [...contactRecords, ...quickRecords].sort(
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
