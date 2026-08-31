import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SourceNdaForm } from "@/components/SourceNdaForm";
import { Page, PageHero } from "@/components/ui";
import { resolveSourceRole, safeSourceNext } from "@/lib/source-gate";
import { shopHasNda } from "@/lib/source-nda";
import { getSourceProfile } from "@/lib/source";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Supplier NDA — Source",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function SourceNdaPage({ searchParams }: Props) {
  const { next: rawNext } = await searchParams;
  const next = safeSourceNext(rawNext);
  const { userId } = await auth();
  if (!userId) {
    redirect(
      `/sign-in?redirect_url=${encodeURIComponent(next ? `/source/nda?next=${encodeURIComponent(next)}` : "/source/nda")}`,
    );
  }

  const role = await resolveSourceRole(userId);
  if (role === "buyer") redirect("/buyer/dashboard");

  const [profile, user] = await Promise.all([
    getSourceProfile(userId),
    currentUser(),
  ]);
  if (shopHasNda(profile)) redirect(next || "/source/dashboard");

  const resumeClaim = next.startsWith("/source/claim");

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Accept the supplier NDA"
        lede={
          resumeClaim
            ? "Buyer prints stay behind this agreement. After you accept, you return to the listing claim — plant street, floor proof, then the shop dashboard."
            : "Buyer prints stay behind this agreement. You cannot open a STEP until you accept it. The file is never attached to email."
        }
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
          next={next || undefined}
        />
      </div>
    </Page>
  );
}
