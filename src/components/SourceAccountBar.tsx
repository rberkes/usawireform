import { auth } from "@clerk/nextjs/server";
import { SourceAccountNav } from "@/components/SourceAccountNav";
import { getBuyerAccount } from "@/lib/source-buyer";
import { getSourceRole } from "@/lib/source-role";
import { getSourceProfile } from "@/lib/source";

export async function SourceAccountBar() {
  const { userId } = await auth();
  const [profile, role, buyer] = userId
    ? await Promise.all([
        getSourceProfile(userId),
        getSourceRole(),
        getBuyerAccount(userId),
      ])
    : [null, null, null];
  return (
    <SourceAccountNav
      shopName={profile?.company || buyer?.company || undefined}
      shopSlug={profile?.slug || undefined}
      role={role === "buyer" ? "buyer" : role === "supplier" ? "supplier" : undefined}
    />
  );
}
