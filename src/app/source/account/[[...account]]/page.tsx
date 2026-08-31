import { SourceAccountProfile } from "@/components/SourceAccountProfile";
import { ButtonLink, Page, PageHero } from "@/components/ui";
import { getSourceRole } from "@/lib/source-role";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Account — Source",
  robots: { index: false, follow: false },
};

export default async function SourceAccountPage() {
  const role = await getSourceRole();
  const back =
    role === "buyer" ? "/buyer/dashboard" : "/source/dashboard";
  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Account"
        lede="Email, password, and the rest of the login. Forgot the password while signed out? Use Forgot password on sign-in."
      />
      <div className="mt-6">
        <ButtonLink href={back} variant="ghost">
          {role === "buyer"
            ? "Back to the buyer dashboard"
            : "Back to the shop dashboard"}
        </ButtonLink>
      </div>
      <div className="mt-10">
        <SourceAccountProfile />
      </div>
    </Page>
  );
}
