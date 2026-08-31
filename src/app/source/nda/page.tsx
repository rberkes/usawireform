import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SourceNdaForm } from "@/components/SourceNdaForm";
import { Page, PageHero } from "@/components/ui";
import { resolveSourceRole } from "@/lib/source-gate";
import { shopHasNda } from "@/lib/source-nda";
import { getSourceProfile } from "@/lib/source";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Supplier NDA — Source",
  robots: { index: false, follow: false },
};

export default async function SourceNdaPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/source/nda");

  const role = await resolveSourceRole(userId);
  if (role === "buyer") redirect("/buyer/dashboard");

  const [profile, user] = await Promise.all([
    getSourceProfile(userId),
    currentUser(),
  ]);
  if (shopHasNda(profile)) redirect("/source/dashboard");

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Accept the supplier NDA"
        lede="Buyer prints stay behind this agreement. You cannot open a STEP until you accept it. The file is never attached to email."
      />
      <div className="mt-10">
        <SourceNdaForm
          company={profile?.company}
          name={
            profile?.name ||
            user?.fullName ||
            user?.firstName ||
            undefined
          }
        />
      </div>
    </Page>
  );
}
