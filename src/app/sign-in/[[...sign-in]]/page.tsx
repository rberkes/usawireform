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
        lede="Forgot the password? Use Forgot password on this form. Then the shop dashboard."
      />
      <div className="mt-10">
        <SignIn
          appearance={clerkAppearance}
          fallbackRedirectUrl="/source/dashboard"
          signUpUrl="/sign-up"
        />
      </div>
    </Page>
  );
}
