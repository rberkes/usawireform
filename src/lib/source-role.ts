import "server-only";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const SOURCE_ROLES = ["supplier", "buyer"] as const;
export type SourceRole = (typeof SOURCE_ROLES)[number];

function asRole(value: unknown): SourceRole | null {
  return value === "buyer" || value === "supplier" ? value : null;
}

export async function getSourceRole(): Promise<SourceRole | null> {
  const user = await currentUser();
  if (!user) return null;
  const publicMeta = user.publicMetadata as Record<string, unknown>;
  const unsafeMeta = user.unsafeMetadata as Record<string, unknown>;
  return asRole(publicMeta.sourceRole) || asRole(unsafeMeta.sourceRole);
}

export async function setSourceRole(userId: string, role: SourceRole) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...user.publicMetadata,
      sourceRole: role,
    },
  });
}

export async function ensureSourceRole(
  userId: string,
  fallback: SourceRole,
): Promise<SourceRole> {
  const existing = await getSourceRole();
  if (existing) {
    const user = await currentUser();
    if (user && !asRole((user.publicMetadata as Record<string, unknown>).sourceRole)) {
      await setSourceRole(userId, existing);
    }
    return existing;
  }
  await setSourceRole(userId, fallback);
  return fallback;
}
