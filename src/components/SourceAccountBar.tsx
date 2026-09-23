import { auth } from "@clerk/nextjs/server";
import { getBuyerAccount } from "@/lib/source-buyer";
import { getSourceRole } from "@/lib/source-role";
import { getSourceProfile } from "@/lib/source";

export async function SourceAccountBar() {
  const { userId } = await auth();
  if (!userId) return null;
  const { AccountSlot } = await import("@/components/AccountSlot");
  const [profile, role, buyer] = await Promise.all([
    getSourceProfile(userId),
    getSourceRole(),
    getBuyerAccount(userId),
  ]);
  return (
    <AccountSlot
      signedIn
      shopName={profile?.company || buyer?.company || undefined}
      shopSlug={profile?.slug || undefined}
      role={role === "buyer" ? "buyer" : role === "supplier" ? "supplier" : undefined}
    />
  );
}
