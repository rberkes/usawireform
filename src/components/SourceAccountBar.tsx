import { auth } from "@clerk/nextjs/server";
import { SourceAccountNav } from "@/components/SourceAccountNav";
import { getSourceProfile } from "@/lib/source";

export async function SourceAccountBar() {
  const { userId } = await auth();
  const profile = userId ? await getSourceProfile(userId) : null;
  return (
    <SourceAccountNav
      shopName={profile?.company || undefined}
      shopSlug={profile?.slug || undefined}
    />
  );
}
