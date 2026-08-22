import { get, list, put, del } from "@vercel/blob";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { SITE_URL } from "@/lib/company";
import { directoryCompanies } from "@/lib/directory";
import {
  slugifyShopName,
  sourceProfileToDirectoryCompany,
} from "@/lib/source-directory";
import { filedSourceMachines, sourceFilingsForShop } from "@/lib/source-account";
import { parseSourceSecondaries } from "@/lib/source-secondaries";
import { hydrateMachineFromCatalog } from "@/lib/source-iron";
import type {
  SourceFiling,
  SourceFilingRow,
  SourceInvite,
  SourceJob,
  SourceMachine,
  SourceProfile,
} from "@/lib/source-types";

export type {
  SourceFiling,
  SourceFilingRow,
  SourceInvite,
  SourceJob,
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
            ? payload.machines.map(hydrateMachineFromCatalog)
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

export async function saveSourceJob(job: SourceJob) {
  if (!(await blobReady())) return false;
  await put(`source/jobs/${Date.now()}.json`, JSON.stringify(job), {
    access: BLOB_ACCESS,
    addRandomSuffix: true,
    contentType: "application/json",
    ...(await blobAuth()),
  });
  return true;
}

export async function listSourceJobs(): Promise<SourceJob[]> {
  if (!(await blobReady())) return [];
  const result = await list({ prefix: "source/jobs/", ...(await blobAuth()) });
  const rows: SourceJob[] = [];
  for (const blob of result.blobs
    .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1))
    .slice(0, 80)) {
    const file = await get(blob.pathname, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (!file?.stream || file.statusCode !== 200) continue;
    try {
      rows.push(JSON.parse(await new Response(file.stream).text()) as SourceJob);
    } catch {
      /* skip */
    }
  }
  return rows;
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
    plantStreet: String(payload.plantStreet ?? "").trim() || undefined,
    plantProofUrl: String(payload.plantProofUrl ?? "").trim() || undefined,
    plantVerifiedAt: String(payload.plantVerifiedAt ?? "").trim() || undefined,
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

const LOGO_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function storeSourceLogo(userId: string, file: File) {
  const ext =
    LOGO_TYPES[file.type] ||
    (file.name.split(".").pop()?.toLowerCase() === "png"
      ? "png"
      : file.name.split(".").pop()?.toLowerCase() === "jpg" ||
          file.name.split(".").pop()?.toLowerCase() === "jpeg"
        ? "jpg"
        : file.name.split(".").pop()?.toLowerCase() === "webp"
          ? "webp"
          : file.name.split(".").pop()?.toLowerCase() === "gif"
            ? "gif"
            : "");
  if (!ext) {
    return { ok: false as const, message: "Logo must be PNG, JPG, WebP, or GIF." };
  }
  if (file.size > 2 * 1024 * 1024) {
    return { ok: false as const, message: "Logo must be under 2 MB." };
  }
  const safeId = userId.replace(/[^a-zA-Z0-9_-]/g, "");
  const pathname = `source/logos/${safeId}.${ext}`;
  await put(pathname, file, {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
    ...(await blobAuth()),
  });
  return { ok: true as const, path: pathname };
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
