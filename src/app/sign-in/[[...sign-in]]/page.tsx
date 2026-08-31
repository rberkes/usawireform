import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
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
        title="Log in"
        lede="Shops land on the supplier dashboard after the NDA. Buyers land on the buyer dashboard. Forgot the password? Use Forgot password on this form."
      />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        New here?{" "}
        <Link href="/sign-up?as=supplier" className="text-copper hover:underline">
          Shop sign-up
        </Link>
        {" · "}
        <Link href="/sign-up?as=buyer" className="text-copper hover:underline">
          Buyer sign-up
        </Link>
        .
      </p>
      <div className="mt-10">
        <SignIn
          appearance={clerkAppearance}
          fallbackRedirectUrl="/source/enter"
          signUpUrl="/sign-up"
        />
      </div>
    </Page>
  );
}
