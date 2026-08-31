import "server-only";

import { get, list, put } from "@vercel/blob";
import { blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";

export type SourceBuyerAccount = {
  userId: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

function buyerPath(userId: string) {
  return `source/buyers/${userId.replace(/[^a-zA-Z0-9_-]/g, "")}.json`;
}

function readBuyer(
  payload: Partial<SourceBuyerAccount>,
  userId: string,
): SourceBuyerAccount {
  return {
    userId: String(payload.userId ?? userId),
    company: String(payload.company ?? ""),
    name: String(payload.name ?? ""),
    email: String(payload.email ?? ""),
    phone: String(payload.phone ?? ""),
    createdAt: String(payload.createdAt ?? payload.updatedAt ?? new Date().toISOString()),
    updatedAt: String(payload.updatedAt ?? new Date().toISOString()),
  };
}

export async function getBuyerAccount(userId: string) {
  if (!userId || !(await blobReady())) return null;
  const result = await get(buyerPath(userId), {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  if (!result?.stream || result.statusCode !== 200) return null;
  try {
    return readBuyer(
      JSON.parse(
        await new Response(result.stream).text(),
      ) as Partial<SourceBuyerAccount>,
      userId,
    );
  } catch {
    return null;
  }
}

export async function saveBuyerAccount(row: SourceBuyerAccount) {
  if (!(await blobReady())) return false;
  await put(buyerPath(row.userId), JSON.stringify(row), {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...(await blobAuth()),
  });
  return true;
}

export async function listBuyerAccounts(): Promise<SourceBuyerAccount[]> {
  if (!(await blobReady())) return [];
  const result = await list({
    prefix: "source/buyers/",
    ...(await blobAuth()),
  });
  const rows: SourceBuyerAccount[] = [];
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
      ) as Partial<SourceBuyerAccount>;
      const userId = String(payload.userId ?? blob.pathname.split("/").pop()?.replace(/\.json$/, "") ?? "");
      if (userId) rows.push(readBuyer(payload, userId));
    } catch {
      /* skip */
    }
  }
  return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function countBuyerAccounts() {
  if (!(await blobReady())) return 0;
  const result = await list({
    prefix: "source/buyers/",
    ...(await blobAuth()),
  });
  return result.blobs.length;
}
