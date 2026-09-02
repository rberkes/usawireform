import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { del, get, list, put } from "@vercel/blob";
import { blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";

const FLAG_PATH = "internal/purged-test-records-2026-09-01.json";

/** Plus/alias inboxes from quote-desk tests. Delete every record on these. */
const DROP_EMAILS = new Set([
  "rberkes+987@gmail.com",
  "rberkes+999@gmail.com",
  "rberkes+6565@gmail.com",
  "rbekes+564546@gmail.com",
  "rberkes-8885@gmail.com",
  "rberkes+007@gmail.com",
  "rberkes+854654@gmail.com",
  "rberkes+1122@gmail.com",
  "rberkes+987777@gmail.com",
]);

const SHOP_EMAILS = [
  "rberkes+1122@gmail.com",
  "rberkes+987777@gmail.com",
];

const OWNER_EMAIL = "rberkes@gmail.com";

const PREFIXES = [
  "leads/contact/",
  "leads/quick/",
  "leads/instant/",
  "leads/directory/",
  "quotes/",
  "quick-quotes/",
  "source/equipment/",
  "source/profiles/",
  "source/buyers/",
  "source/jobs/",
  "source/reminders/",
  "source/invites/",
];

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function emailOf(payload: Record<string, unknown>) {
  return asString(payload.email).toLowerCase();
}

function nyDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

function isOwnerTestSHook(payload: Record<string, unknown>) {
  if (emailOf(payload) !== OWNER_EMAIL) return false;
  const file = asString(payload.fileName).toLowerCase();
  const when = nyDate(asString(payload.timestamp));
  const name = asString(payload.name).toLowerCase();
  return (
    when === "2026-08-21" &&
    file.includes("s-hook for lifting") &&
    (name === "ron" || name === "")
  );
}

function shouldDropJson(payload: Record<string, unknown>) {
  const email = emailOf(payload);
  if (DROP_EMAILS.has(email)) return true;
  return isOwnerTestSHook(payload);
}

function extraPaths(payload: Record<string, unknown>) {
  return [payload.drawingPath, payload.logoPath, payload.photoPath]
    .map((value) => asString(value))
    .filter(Boolean);
}

async function listPrefix(prefix: string) {
  const blobs: Array<{ pathname: string }> = [];
  let cursor: string | undefined;
  do {
    const page = await list({
      prefix,
      cursor,
      limit: 100,
      ...(await blobAuth()),
    });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

async function readJson(pathname: string) {
  const result = await get(pathname, {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  try {
    return JSON.parse(await new Response(result.stream).text()) as Record<
      string,
      unknown
    >;
  } catch {
    return null;
  }
}

async function flagExists() {
  const result = await get(FLAG_PATH, {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  return Boolean(result && result.statusCode === 200);
}

async function deleteClerkTestShops() {
  try {
    const client = await clerkClient();
    for (const email of SHOP_EMAILS) {
      const { data } = await client.users.getUserList({
        emailAddress: [email],
        limit: 10,
      });
      for (const user of data) {
        const emails = user.emailAddresses.map((row) =>
          row.emailAddress.trim().toLowerCase(),
        );
        if (emails.includes(OWNER_EMAIL)) continue;
        if (!emails.some((row) => DROP_EMAILS.has(row))) continue;
        await client.users.deleteUser(user.id);
      }
    }
  } catch (error) {
    console.error("[purge tests] clerk", error);
  }
}

export async function purgeKnownTestRecords() {
  if (!(await blobReady())) {
    return { ok: false, skipped: true, deleted: 0 };
  }
  if (await flagExists()) {
    return { ok: true, skipped: true, deleted: 0 };
  }

  const paths = new Set<string>();
  const userIds = new Set<string>();

  for (const prefix of PREFIXES) {
    const blobs = await listPrefix(prefix);
    for (const blob of blobs) {
      if (!blob.pathname.endsWith(".json")) continue;
      const payload = await readJson(blob.pathname);
      if (!payload) continue;
      if (!shouldDropJson(payload)) continue;
      paths.add(blob.pathname);
      for (const path of extraPaths(payload)) paths.add(path);
      const userId = asString(payload.userId);
      if (userId && DROP_EMAILS.has(emailOf(payload))) userIds.add(userId);
    }
  }

  if (userIds.size > 0) {
    for (const blob of await listPrefix("source/profiles/")) {
      const payload = await readJson(blob.pathname);
      const userId = asString(payload?.userId) || blob.pathname.split("/").pop()?.replace(/\.json$/, "");
      if (userId && userIds.has(userId)) {
        paths.add(blob.pathname);
        if (payload) {
          for (const path of extraPaths(payload)) paths.add(path);
        }
      }
    }
    for (const blob of await listPrefix("source/buyers/")) {
      const payload = await readJson(blob.pathname);
      const userId = asString(payload?.userId) || blob.pathname.split("/").pop()?.replace(/\.json$/, "");
      if (userId && userIds.has(userId)) paths.add(blob.pathname);
    }
  }

  const toDelete = [...paths];
  if (toDelete.length > 0) {
    await del(toDelete, { ...(await blobAuth()) });
  }
  await deleteClerkTestShops();

  await put(
    FLAG_PATH,
    JSON.stringify({
      at: new Date().toISOString(),
      deleted: toDelete.length,
      emails: [...DROP_EMAILS],
    }),
    {
      access: BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      ...(await blobAuth()),
    },
  );

  console.log("[purge tests]", { deleted: toDelete.length });
  return { ok: true, skipped: false, deleted: toDelete.length };
}
