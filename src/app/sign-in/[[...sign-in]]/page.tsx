import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { Page, PageHero } from "@/components/ui";

export const metadata = {
  title: "Sign in — Source",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Log in to the shop"
        lede="Confirm the account, then the dashboard is where you add cells and change the plan."
      />
      <div className="mt-10">
        <SignIn
          appearance={clerkAppearance}
          forceRedirectUrl="/source/dashboard"
          fallbackRedirectUrl="/source/dashboard"
          signUpUrl="/sign-up"
        />
      </div>
    </Page>
  );
}
