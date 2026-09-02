import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { del, get, list, put } from "@vercel/blob";
import { blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";

const FLAG_PATH = "internal/purged-test-records-2026-09-01.json";
const MOCK_INVITE_FLAG_PATH = "internal/purged-mock-invites-2026-09-02.json";

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
  return (asString(payload.email) || asString(payload.to)).toLowerCase();
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

async function flagExists(path = FLAG_PATH) {
  const result = await get(path, {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  return Boolean(result && result.statusCode === 200);
}

async function writeFlag(path: string, payload: Record<string, unknown>) {
  await put(path, JSON.stringify(payload), {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...(await blobAuth()),
  });
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

async function reminderPathForEmail(email: string) {
  const key = email.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "unknown";
  return `source/reminders/${key}.json`;
}

/** Unused Source invites from mock shop pages. Keep the real owner shop. */
export async function deleteUnusedMockInvites(email: string) {
  const needle = email.trim().toLowerCase();
  if (!needle || !(await blobReady())) return 0;
  const paths = new Set<string>();
  for (const blob of await listPrefix("source/invites/")) {
    if (!blob.pathname.endsWith(".json")) continue;
    const payload = await readJson(blob.pathname);
    if (emailOf(payload ?? {}) !== needle) continue;
    paths.add(blob.pathname);
  }
  paths.add(await reminderPathForEmail(needle));
  if (DROP_EMAILS.has(needle)) {
    for (const prefix of PREFIXES) {
      for (const blob of await listPrefix(prefix)) {
        if (!blob.pathname.endsWith(".json")) continue;
        const payload = await readJson(blob.pathname);
        if (!payload || emailOf(payload) !== needle) continue;
        paths.add(blob.pathname);
        for (const path of extraPaths(payload)) paths.add(path);
      }
    }
  }
  const existing = [...paths].filter((path) =>
    PREFIXES.some((prefix) => path.startsWith(prefix)),
  );
  const toDelete: string[] = [];
  for (const path of existing) {
    const file = await get(path, {
      access: "private",
      useCache: false,
      ...(await blobAuth()),
    });
    if (file && file.statusCode === 200) toDelete.push(path);
  }
  if (toDelete.length > 0) {
    await del(toDelete, { ...(await blobAuth()) });
  }
  return toDelete.length;
}

async function purgeUnusedMockInvites() {
  if (await flagExists(MOCK_INVITE_FLAG_PATH)) {
    return { ok: true, skipped: true, deleted: 0 };
  }
  let deleted = 0;
  deleted += await deleteUnusedMockInvites(OWNER_EMAIL);
  for (const email of SHOP_EMAILS) {
    deleted += await deleteUnusedMockInvites(email);
  }
  await writeFlag(MOCK_INVITE_FLAG_PATH, {
    at: new Date().toISOString(),
    deleted,
    emails: [OWNER_EMAIL, ...SHOP_EMAILS],
  });
  console.log("[purge mock invites]", { deleted });
  return { ok: true, skipped: false, deleted };
}

export async function purgeKnownTestRecords() {
  if (!(await blobReady())) {
    return { ok: false, skipped: true, deleted: 0 };
  }

  const mock = await purgeUnusedMockInvites();
  if (await flagExists()) {
    return { ok: true, skipped: mock.skipped, deleted: mock.deleted };
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

  await writeFlag(FLAG_PATH, {
    at: new Date().toISOString(),
    deleted: toDelete.length,
    emails: [...DROP_EMAILS],
  });

  console.log("[purge tests]", { deleted: toDelete.length });
  return {
    ok: true,
    skipped: false,
    deleted: toDelete.length + mock.deleted,
  };
}
