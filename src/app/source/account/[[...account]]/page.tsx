import { SourceAccountProfile } from "@/components/SourceAccountProfile";
import { ButtonLink, Page, PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Account — Source",
  robots: { index: false, follow: false },
};

export default function SourceAccountPage() {
  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Account"
        lede="Email, password, and the rest of the login. Forgot the password while signed out? Use Forgot password on sign-in."
      />
      <div className="mt-6">
        <ButtonLink href="/source/dashboard" variant="ghost">
          Back to the shop dashboard
        </ButtonLink>
      </div>
      <div className="mt-10">
        <SourceAccountProfile />
      </div>
    </Page>
  );
}
