import { get, list, put } from "@vercel/blob";
import { adminFileHref, blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { SITE_URL } from "@/lib/company";
import type {
  SourceFiling,
  SourceFilingRow,
  SourceInvite,
  SourceMachine,
} from "@/lib/source-types";

export type {
  SourceFiling,
  SourceFilingRow,
  SourceInvite,
  SourceKind,
  SourceMachine,
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
      .map((row) => ({
        oem: String((row as SourceMachine).oem ?? "").trim().slice(0, 80),
        model: String((row as SourceMachine).model ?? "").trim().slice(0, 80),
        kind: String((row as SourceMachine).kind ?? "").trim().slice(0, 40),
        minMm: String((row as SourceMachine).minMm ?? "").trim().slice(0, 16),
        maxMm: String((row as SourceMachine).maxMm ?? "").trim().slice(0, 16),
        city: String((row as SourceMachine).city ?? "").trim().slice(0, 80),
      }))
      .filter((row) => row.oem || row.model || row.minMm || row.maxMm);
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
        company: String(payload.company ?? ""),
        name: String(payload.name ?? ""),
        email: String(payload.email ?? ""),
        phone: String(payload.phone ?? ""),
        city: String(payload.city ?? ""),
        state: String(payload.state ?? ""),
        website: String(payload.website ?? ""),
        machines: Array.isArray(payload.machines) ? payload.machines : [],
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

export async function countSourceFilings() {
  const rows = await listSourceFilings();
  return rows.length;
}
