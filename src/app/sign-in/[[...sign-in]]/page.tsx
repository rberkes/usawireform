import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { Page, PageHero } from "@/components/ui";
import { safeSourceNext } from "@/lib/source-gate";

export const metadata = {
  title: "Sign in — Source",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ redirect_url?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const { redirect_url: raw } = await searchParams;
  const next = safeSourceNext(raw);
  const after = next || "/source/enter";
  const signUpQs = new URLSearchParams({ as: "supplier" });
  if (next) signUpQs.set("redirect_url", next);

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Log in"
        lede="Shops land on the supplier dashboard after the NDA. Buyers land on the buyer dashboard. Forgot the password? Use Forgot password on this form."
      />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        New here?{" "}
        <Link href={`/sign-up?${signUpQs}`} className="text-copper hover:underline">
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
          fallbackRedirectUrl={after}
          signUpUrl={`/sign-up?${signUpQs}`}
        />
      </div>
    </Page>
  );
}
