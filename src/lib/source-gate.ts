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

export async function requireSupplier(userId: string) {
  const role = await resolveSourceRole(userId);
  if (role === "buyer") redirect("/buyer/dashboard");
  const profile = await getSourceProfile(userId);
  if (!shopHasNda(profile)) redirect("/source/nda");
  return profile;
}

export async function requireBuyer(userId: string) {
  const role = await resolveSourceRole(userId);
  if (role !== "buyer") {
    await requireSupplier(userId);
    redirect("/source/dashboard");
  }
}
