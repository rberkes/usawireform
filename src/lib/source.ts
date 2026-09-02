import { get, list, put, del } from "@vercel/blob";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { SITE_URL } from "@/lib/company";
import { directoryCompanies } from "@/lib/directory";
import { SOURCE_LEAD_BUYERS_MAX } from "@/lib/source-plans";
import {
  slugifyShopName,
  sourceProfileToDirectoryCompany,
} from "@/lib/source-directory";
import { filedSourceMachines, sourceFilingsForShop } from "@/lib/source-account";
import { withCapacity } from "@/lib/source-capacity";
import { parseSourceBuyerFit } from "@/lib/source-fit";
import { parseSourceSecondaries } from "@/lib/source-secondaries";
import { hydrateMachineFromCatalog } from "@/lib/source-iron";
import { filingsToFloorCells, mergeFloorFeed } from "@/lib/source-floor-feed";
import { sendDrawingReviewedEmail } from "@/lib/leads";
import {
  parseDrawingPrivacy,
  type SourceDrawingPrivacy,
  type SourceFiling,
  type SourceFilingRow,
  type SourceInvite,
  type SourceJob,
  type SourceJobMailedTo,
  type SourceJobPurchase,
  type SourceJobRow,
  type SourceMachine,
  type SourceProfile,
} from "@/lib/source-types";

export type {
  SourceFiling,
  SourceFilingRow,
  SourceInvite,
  SourceJob,
  SourceJobRow,
  SourceKind,
  SourceMachine,
  SourceProfile,
  SourcePublicMatch,
} from "@/lib/source-types";
export { SOURCE_KINDS } from "@/lib/source-types";

export function sourceInviteHref(id: string) {
  return `${SITE_URL}/source/equipment?invite=${encodeURIComponent(id)}`;
}

export function parseSourceMachines(raw: string): SourceMachine[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((row) =>
        hydrateMachineFromCatalog({
          oem: String((row as SourceMachine).oem ?? "").trim().slice(0, 80),
          model: String((row as SourceMachine).model ?? "").trim().slice(0, 80),
          kind: String((row as SourceMachine).kind ?? "").trim().slice(0, 40),
          minMm: String((row as SourceMachine).minMm ?? "").trim().slice(0, 16),
          maxMm: String((row as SourceMachine).maxMm ?? "").trim().slice(0, 16),
          city: String((row as SourceMachine).city ?? "").trim().slice(0, 80),
          year: String((row as SourceMachine).year ?? "").trim().slice(0, 8),
          capacity: String((row as SourceMachine).capacity ?? "").trim().slice(0, 80),
          stockedSizes: String((row as SourceMachine).stockedSizes ?? "")
            .trim()
            .slice(0, 120),
        }),
      )
      .filter((row) => row.model);
  } catch {
    return [];
  }
}

export async function saveSourceInvite(invite: SourceInvite) {
  if (!(await blobReady())) return false;
  await put(`source/invites/${invite.id}.json`, JSON.stringify(invite), {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    contentType: "application/json",
    ...(await blobAuth()),
  });
  return true;
}

export async function getSourceInvite(id: string) {
  if (!id || /[^a-f0-9-]/.test(id)) return null;
  if (!(await blobReady())) return null;
  const result = await get(`source/invites/${id}.json`, {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  if (!result?.stream || result.statusCode !== 200) return null;
  try {
    return JSON.parse(await new Response(result.stream).text()) as SourceInvite;
  } catch {
    return null;
  }
}

export async function listSourceInvites(): Promise<SourceInvite[]> {
  if (!(await blobReady())) return [];
  const result = await list({ prefix: "source/invites/", ...(await blobAuth()) });
  const rows: SourceInvite[] = [];
  for (const blob of result.blobs.sort((a, b) =>
    a.uploadedAt < b.uploadedAt ? 1 : -1,
  ).slice(0, 80)) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      rows.push(JSON.parse(await new Response(file.stream).text()) as SourceInvite);
    } catch {
      /* skip bad json */
    }
  }
  return rows;
}

export async function saveSourceFiling(filing: SourceFiling) {
  if (!(await blobReady())) return false;
  await put(
    `source/equipment/${Date.now()}.json`,
    JSON.stringify(filing),
    {
      access: BLOB_ACCESS,
      addRandomSuffix: true,
      contentType: "application/json",
      ...(await blobAuth()),
    },
  );
  return true;
}

export async function listSourceFilings(): Promise<SourceFilingRow[]> {
  if (!(await blobReady())) return [];
  const result = await list({
    prefix: "source/equipment/",
    ...(await blobAuth()),
  });
  const rows: SourceFilingRow[] = [];
  for (const blob of result.blobs.sort((a, b) =>
    a.uploadedAt < b.uploadedAt ? 1 : -1,
  ).slice(0, 80)) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      const payload = JSON.parse(
        await new Response(file.stream).text(),
      ) as Partial<SourceFiling>;
      rows.push({
        inviteId: payload.inviteId,
        userId:
          typeof payload.userId === "string" ? payload.userId : undefined,
        company: String(payload.company ?? ""),
        name: String(payload.name ?? ""),
        email: String(payload.email ?? ""),
        phone: String(payload.phone ?? ""),
        city: String(payload.city ?? ""),
        state: String(payload.state ?? ""),
        website: String(payload.website ?? ""),
        machines: filedSourceMachines(
          Array.isArray(payload.machines)
            ? payload.machines.map((row) =>
                withCapacity(hydrateMachineFromCatalog(row as SourceMachine)),
              )
            : [],
        ),
        notes: String(payload.notes ?? ""),
        fileName: payload.fileName,
        timestamp:
          String(payload.timestamp ?? "") ||
          (blob.uploadedAt instanceof Date
            ? blob.uploadedAt.toISOString()
            : String(blob.uploadedAt)),
        pathname: blob.pathname,
        href: adminFileHref(blob.pathname),
      });
    } catch {
      /* skip */
    }
  }
  return rows;
}

export async function listRecentSourceFloorCells(limit = 6) {
  const filings = await listSourceFilings();
  return mergeFloorFeed(filingsToFloorCells(filings), limit);
}

export async function replaceSourceFilingsForShop({
  userId,
  email,
  shop,
  machines,
}: {
  userId: string;
  email: string;
  shop: {
    company: string;
    name: string;
    phone: string;
    city: string;
    state: string;
    website: string;
  };
  machines: SourceMachine[];
}) {
  if (!(await blobReady())) return false;
  const rows = sourceFilingsForShop(await listSourceFilings(), { userId, email });
  const paths = rows.map((row) => row.pathname).filter(Boolean);
  if (paths.length > 0) {
    await del(paths, { ...(await blobAuth()) });
  }
  if (machines.length === 0) return true;
  await saveSourceFiling({
    userId,
    company: shop.company,
    name: shop.name,
    email,
    phone: shop.phone,
    city: shop.city,
    state: shop.state,
    website: shop.website,
    machines,
    notes: "",
    timestamp: new Date().toISOString(),
  });
  return true;
}

export async function countSourceFilings() {
  const rows = await listSourceFilings();
  return rows.length;
}

export async function saveSourceJob(job: SourceJob, pathname?: string) {
  if (!(await blobReady())) return false;
  const path = pathname ?? `source/jobs/${Date.now()}.json`;
  const { pathname: _path, ...payload } = job as SourceJobRow;
  await put(path, JSON.stringify(payload), {
    access: BLOB_ACCESS,
    addRandomSuffix: !pathname,
    allowOverwrite: Boolean(pathname),
    contentType: "application/json",
    ...(await blobAuth()),
  });
  return true;
}

export async function storeSourceJobDrawing(file: File) {
  const ext = file.name.split(".").pop() || "bin";
  const body = Buffer.from(await file.arrayBuffer());
  return put(`source/jobs/${Date.now()}.${ext}`, body, {
    access: BLOB_ACCESS,
    addRandomSuffix: true,
    contentType: file.type || "application/octet-stream",
    ...(await blobAuth()),
  });
}

function readMailedTo(raw: unknown): SourceJobMailedTo[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((row) => {
      const item = row as Partial<SourceJobMailedTo>;
      return {
        email: String(item.email ?? "").trim(),
        company: String(item.company ?? "").trim(),
        userId: typeof item.userId === "string" ? item.userId : undefined,
      };
    })
    .filter((row) => row.email);
}

function readPurchasedBy(raw: unknown): SourceJobPurchase[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const rows: SourceJobPurchase[] = [];
  for (const row of raw) {
    const item = row as Partial<SourceJobPurchase>;
    const userId = String(item.userId ?? "").trim();
    const email = String(item.email ?? "").trim();
    const key = userId || email.toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    rows.push({
      userId,
      email,
      company: String(item.company ?? "").trim(),
      purchasedAt: String(item.purchasedAt ?? ""),
      sessionId:
        typeof item.sessionId === "string" ? item.sessionId : undefined,
    });
  }
  return rows;
}

function readSourceJob(
  payload: Partial<SourceJob>,
  pathname: string,
): SourceJobRow {
  return {
    company: String(payload.company ?? ""),
    name: String(payload.name ?? ""),
    email: String(payload.email ?? ""),
    phone: String(payload.phone ?? ""),
    city: String(payload.city ?? ""),
    state: String(payload.state ?? ""),
    diameterRaw: String(payload.diameterRaw ?? ""),
    diameterMm:
      typeof payload.diameterMm === "number" ? payload.diameterMm : null,
    kind: String(payload.kind ?? ""),
    oem: String(payload.oem ?? ""),
    qty: String(payload.qty ?? ""),
    notes: String(payload.notes ?? ""),
    parsedBy:
      payload.parsedBy === "ai" || payload.parsedBy === "form+ai"
        ? payload.parsedBy
        : "form",
    timestamp: String(payload.timestamp ?? ""),
    fileName: payload.fileName ? String(payload.fileName) : undefined,
    drawingPath: payload.drawingPath ? String(payload.drawingPath) : undefined,
    drawingPrivacy: parseDrawingPrivacy(payload.drawingPrivacy),
    privacyToken: payload.privacyToken
      ? String(payload.privacyToken)
      : undefined,
    mailedTo: readMailedTo(payload.mailedTo),
    purchasedBy: readPurchasedBy(payload.purchasedBy),
    buyerUserId: payload.buyerUserId ? String(payload.buyerUserId) : undefined,
    reviewedNotifiedAt: payload.reviewedNotifiedAt
      ? String(payload.reviewedNotifiedAt)
      : undefined,
    pathname,
  };
}

export async function listSourceJobs(): Promise<SourceJobRow[]> {
  if (!(await blobReady())) return [];
  const result = await list({ prefix: "source/jobs/", ...(await blobAuth()) });
  const rows: SourceJobRow[] = [];
  for (const blob of result.blobs
    .filter((item) => item.pathname.endsWith(".json"))
    .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1))
    .slice(0, 80)) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      rows.push(
        readSourceJob(
          JSON.parse(await new Response(file.stream).text()) as Partial<SourceJob>,
          blob.pathname,
        ),
      );
    } catch {
      /* skip */
    }
  }
  return rows;
}

export async function getSourceJob(pathname: string) {
  if (
    !pathname ||
    pathname.includes("..") ||
    !pathname.startsWith("source/jobs/") ||
    !pathname.endsWith(".json")
  ) {
    return null;
  }
  if (!(await blobReady())) return null;
  const file = await get(pathname, {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  if (!file?.stream || file.statusCode !== 200) return null;
  try {
    return readSourceJob(
      JSON.parse(await new Response(file.stream).text()) as Partial<SourceJob>,
      pathname,
    );
  } catch {
    return null;
  }
}

export async function notifySourceBuyerOnDrawingView(viewedPath: string) {
  if (!viewedPath.startsWith("source/jobs/")) return false;
  const jobs = await listSourceJobs();
  const job = jobs.find((row) => row.drawingPath === viewedPath);
  if (!job) return false;
  if (!job.email.trim()) return true;
  if (job.reviewedNotifiedAt) return true;

  job.reviewedNotifiedAt = new Date().toISOString();
  await saveSourceJob(job, job.pathname);
  const ok = await sendDrawingReviewedEmail({
    to: job.email,
    name: job.name,
    fileName: job.fileName,
  });
  console.log("[Drawing viewed mail]", {
    to: job.email,
    path: viewedPath,
    record: job.pathname,
    ok,
  });
  return true;
}

export async function recordSourceLeadPurchase({
  pathname,
  userId,
  email,
  company,
  sessionId,
}: {
  pathname: string;
  userId: string;
  email: string;
  company: string;
  sessionId?: string;
}) {
  const job = await getSourceJob(pathname);
  if (!job) return { ok: false as const, reason: "missing" as const };
  const offered = (job.mailedTo ?? []).some(
    (row) =>
      row.userId === userId ||
      (email &&
        row.email.trim().toLowerCase() === email.trim().toLowerCase()),
  );
  if (!offered) return { ok: false as const, reason: "not-offered" as const };
  const already = (job.purchasedBy ?? []).some(
    (row) => row.userId === userId || row.sessionId === sessionId,
  );
  if (already) return { ok: true as const, job };
  if ((job.purchasedBy ?? []).length >= SOURCE_LEAD_BUYERS_MAX) {
    return { ok: false as const, reason: "sold-out" as const };
  }
  const next: SourceJobRow = {
    ...job,
    purchasedBy: [
      ...(job.purchasedBy ?? []),
      {
        userId,
        email,
        company,
        purchasedAt: new Date().toISOString(),
        sessionId,
      },
    ],
  };
  await saveSourceJob(next, pathname);
  return { ok: true as const, job: next };
}

export async function findSourceJobByPrivacyToken(token: string) {
  const needle = token.trim();
  if (!needle || !(await blobReady())) return null;
  const result = await list({ prefix: "source/jobs/", ...(await blobAuth()) });
  for (const blob of result.blobs.filter((item) => item.pathname.endsWith(".json"))) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      const row = readSourceJob(
        JSON.parse(await new Response(file.stream).text()) as Partial<SourceJob>,
        blob.pathname,
      );
      if (row.privacyToken === needle) return row;
    } catch {
      /* skip */
    }
  }
  return null;
}

export async function setSourceJobDrawingPrivacy(
  token: string,
  drawingPrivacy: SourceDrawingPrivacy,
) {
  const row = await findSourceJobByPrivacyToken(token);
  if (!row) return null;
  const next: SourceJobRow = { ...row, drawingPrivacy };
  await saveSourceJob(next, row.pathname);
  return next;
}

export async function attachJobsToBuyer(userId: string, email: string) {
  const needle = email.trim().toLowerCase();
  if (!userId || !needle) return 0;
  const jobs = await listSourceJobs();
  let attached = 0;
  for (const job of jobs) {
    if (job.email.trim().toLowerCase() !== needle) continue;
    if (job.buyerUserId === userId) continue;
    await saveSourceJob({ ...job, buyerUserId: userId }, job.pathname);
    attached += 1;
  }
  return attached;
}

export function sourceJobPrivacyHref(token: string) {
  return `${SITE_URL}/source/privacy?t=${encodeURIComponent(token)}`;
}

function profilePath(userId: string) {
  return `source/profiles/${userId.replace(/[^a-zA-Z0-9_-]/g, "")}.json`;
}

function readProfile(payload: Partial<SourceProfile>, userId: string): SourceProfile {
  return {
    userId: String(payload.userId ?? userId),
    slug: String(payload.slug ?? ""),
    company: String(payload.company ?? ""),
    name: String(payload.name ?? ""),
    phone: String(payload.phone ?? ""),
    city: String(payload.city ?? ""),
    state: String(payload.state ?? ""),
    website: String(payload.website ?? ""),
    blurb: String(payload.blurb ?? ""),
    secondaries: parseSourceSecondaries(payload.secondaries),
    published: payload.published !== false,
    claimedDirectory: payload.claimedDirectory === true,
    logoPath:
      typeof payload.logoPath === "string" &&
      payload.logoPath.startsWith("source/logos/")
        ? payload.logoPath
        : undefined,
    photoPath:
      typeof payload.photoPath === "string" &&
      payload.photoPath.startsWith("source/photos/")
        ? payload.photoPath
        : undefined,
    plantStreet: String(payload.plantStreet ?? "").trim() || undefined,
    plantProofUrl: String(payload.plantProofUrl ?? "").trim() || undefined,
    plantVerifiedAt: String(payload.plantVerifiedAt ?? "").trim() || undefined,
    fit: parseSourceBuyerFit(payload.fit),
    leadsAccess: payload.leadsAccess === "comp" ? "comp" : undefined,
    ndaAcceptedAt: String(payload.ndaAcceptedAt ?? "").trim() || undefined,
    ndaVersion: String(payload.ndaVersion ?? "").trim() || undefined,
    ndaName: String(payload.ndaName ?? "").trim() || undefined,
    listedAt: String(
      payload.listedAt ?? payload.updatedAt ?? new Date().toISOString(),
    ),
    updatedAt: String(payload.updatedAt ?? new Date().toISOString()),
  };
}

export async function getSourceProfile(userId: string) {
  if (!userId || !(await blobReady())) return null;
  const result = await get(profilePath(userId), {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  if (!result?.stream || result.statusCode !== 200) return null;
  try {
    return readProfile(
      JSON.parse(await new Response(result.stream).text()) as Partial<SourceProfile>,
      userId,
    );
  } catch {
    return null;
  }
}

export async function listSourceProfiles(): Promise<SourceProfile[]> {
  if (!(await blobReady())) return [];
  const result = await list({
    prefix: "source/profiles/",
    ...(await blobAuth()),
  });
  const rows: SourceProfile[] = [];
  for (const blob of result.blobs.slice(0, 200)) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      const payload = JSON.parse(
        await new Response(file.stream).text(),
      ) as Partial<SourceProfile>;
      const userId = String(
        payload.userId ??
          blob.pathname.split("/").pop()?.replace(/\.json$/, "") ??
          "",
      );
      if (!userId) continue;
      rows.push(readProfile(payload, userId));
    } catch {
      /* skip */
    }
  }
  return rows;
}

export async function countSourceProfiles() {
  if (!(await blobReady())) return 0;
  const result = await list({
    prefix: "source/profiles/",
    ...(await blobAuth()),
  });
  return result.blobs.length;
}

export async function uniqueSourceSlug(
  name: string,
  userId: string,
  { keepExisting = true }: { keepExisting?: boolean } = {},
) {
  const existing = await getSourceProfile(userId);
  if (keepExisting && existing?.slug) return existing.slug;

  const base = slugifyShopName(name) || `shop-${userId.slice(-6).toLowerCase()}`;
  const taken = new Set(directoryCompanies.map((company) => company.slug));
  for (const profile of await listSourceProfiles()) {
    if (profile.userId !== userId) taken.add(profile.slug);
  }
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

export async function saveSourceProfile(profile: SourceProfile) {
  if (!(await blobReady())) return false;
  await put(profilePath(profile.userId), JSON.stringify(profile), {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...(await blobAuth()),
  });
  return true;
}

const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

function imageExt(file: File) {
  const fromType = IMAGE_TYPES[file.type];
  if (fromType) return fromType;
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "jpeg") return "jpg";
  if (ext === "png" || ext === "jpg" || ext === "webp" || ext === "gif") {
    return ext;
  }
  return "";
}

async function storeSourceImage(
  userId: string,
  file: File,
  kind: "logos" | "photos",
  maxBytes: number,
) {
  const ext = imageExt(file);
  if (!ext) {
    return { ok: false as const, message: "Use PNG, JPG, WebP, or GIF." };
  }
  if (file.size > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    return { ok: false as const, message: `Image must be under ${mb} MB.` };
  }
  const safeId = userId.replace(/[^a-zA-Z0-9_-]/g, "");
  const pathname = `source/${kind}/${safeId}.${ext}`;
  await put(pathname, file, {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
    ...(await blobAuth()),
  });
  return { ok: true as const, path: pathname };
}

export async function storeSourceLogo(userId: string, file: File) {
  return storeSourceImage(userId, file, "logos", 2 * 1024 * 1024);
}

export async function storeSourcePhoto(userId: string, file: File) {
  return storeSourceImage(userId, file, "photos", 8 * 1024 * 1024);
}

export async function setSourceProfileSecondaries(
  userId: string,
  secondaries: string[],
) {
  const existing = await getSourceProfile(userId);
  if (!existing) return false;
  const ids = parseSourceSecondaries(secondaries);
  await saveSourceProfile({
    ...existing,
    secondaries: ids,
    updatedAt: new Date().toISOString(),
  });
  return true;
}

export async function findSourceProfileBySlug(slug: string) {
  if (!slug) return null;
  const rows = await listSourceProfiles();
  return rows.find((row) => row.slug === slug) ?? null;
}

export async function getSourceProfileBySlug(slug: string) {
  const profile = await findSourceProfileBySlug(slug);
  if (!profile?.published) return null;
  return profile;
}

export function applyProfilesToFilings(
  filings: SourceFiling[],
  profiles: SourceProfile[],
) {
  const byUser = new Map(profiles.map((row) => [row.userId, row]));
  return filings.map((filing) => {
    const profile = filing.userId ? byUser.get(filing.userId) : undefined;
    if (!profile) return filing;
    return {
      ...filing,
      company: profile.company || filing.company,
      name: profile.name || filing.name,
      phone: profile.phone || filing.phone,
      city: profile.city || filing.city,
      state: profile.state || filing.state,
      website: profile.website || filing.website,
      fit: profile.fit,
    };
  });
}

export async function listPublishedSourceDirectoryCompanies() {
  return listNewestSourceDirectoryCompanies(200);
}

export async function listNewestSourceDirectoryCompanies(limit = 24) {
  const [profiles, filings] = await Promise.all([
    listSourceProfiles(),
    listSourceFilings(),
  ]);
  return profiles
    .filter((profile) => profile.published && profile.slug && profile.company)
    .sort((a, b) => {
      const aAt = a.listedAt || a.updatedAt;
      const bAt = b.listedAt || b.updatedAt;
      return aAt < bAt ? 1 : aAt > bAt ? -1 : 0;
    })
    .slice(0, limit)
    .map((profile) => {
      const cells = filings
        .filter((row) => row.userId === profile.userId)
        .flatMap((row) => row.machines);
      return sourceProfileToDirectoryCompany(profile, cells);
    });
}

export async function getSourceDirectoryCompany(slug: string) {
  const profile = await getSourceProfileBySlug(slug);
  if (!profile) return null;
  const filings = await listSourceFilings();
  const cells = filings
    .filter((row) => row.userId === profile.userId)
    .flatMap((row) => row.machines);
  return {
    profile,
    company: sourceProfileToDirectoryCompany(profile, cells),
    cells,
  };
}
