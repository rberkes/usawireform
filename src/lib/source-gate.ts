import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getBuyerAccount } from "@/lib/source-buyer";
import { shopHasNda } from "@/lib/source-nda";
import {
  ensureSourceRole,
  getSourceRole,
  setSourceRole,
  type SourceRole,
} from "@/lib/source-role";
import { getSourceProfile } from "@/lib/source";

export async function requireSignedIn(redirectTo: string) {
  const { userId } = await auth();
  if (!userId) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectTo)}`);
  }
  return userId;
}

export async function resolveSourceRole(userId: string): Promise<SourceRole> {
  const fromClerk = await getSourceRole();
  if (fromClerk) {
    const user = await currentUser();
    const publicMeta = user?.publicMetadata as Record<string, unknown> | undefined;
    if (user && publicMeta?.sourceRole !== fromClerk) {
      await setSourceRole(userId, fromClerk);
    }
    return fromClerk;
  }
  const buyer = await getBuyerAccount(userId);
  const role: SourceRole = buyer ? "buyer" : "supplier";
  await ensureSourceRole(userId, role);
  return role;
}

/** Only in-app Source paths. Claim URLs stay on /source/claim?slug=… */
export function safeSourceNext(value: string | null | undefined) {
  if (!value) return "";
  let path = value.trim();
  try {
    if (/^https?:\/\//i.test(path)) {
      const url = new URL(path);
      path = `${url.pathname}${url.search}`;
    }
  } catch {
    return "";
  }
  if (!path.startsWith("/source") || path.startsWith("//")) return "";
  if (path.startsWith("/source/drawing") || path.startsWith("/source/nda")) {
    return "";
  }
  return path;
}

export function sourceNdaHref(next?: string | null) {
  const dest = safeSourceNext(next);
  return dest
    ? `/source/nda?next=${encodeURIComponent(dest)}`
    : "/source/nda";
}

export async function requireSupplier(
  userId: string,
  { next }: { next?: string } = {},
) {
  const role = await resolveSourceRole(userId);
  if (role === "buyer") redirect("/buyer/dashboard");
  const profile = await getSourceProfile(userId);
  if (!shopHasNda(profile)) redirect(sourceNdaHref(next));
  return profile;
}

export async function requireBuyer(userId: string) {
  const role = await resolveSourceRole(userId);
  if (role !== "buyer") {
    await requireSupplier(userId);
    redirect("/source/dashboard");
  }
}
