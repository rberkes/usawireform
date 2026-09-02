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
  searchParams: Promise<{ redirect_url?: string; as?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const { redirect_url: raw, as } = await searchParams;
  const buyer = as === "buyer";
  const next = safeSourceNext(raw) || (buyer ? "/buyer/dashboard" : "");
  const after = next || "/source/enter";
  const signUpHref = buyer
    ? "/sign-up?as=buyer"
    : (() => {
        const qs = new URLSearchParams({ as: "supplier" });
        if (next) qs.set("redirect_url", next);
        return `/sign-up?${qs}`;
      })();

  return (
    <Page>
      <PageHero
        kicker="Source"
        title={buyer ? "Buyer log in" : "Log in"}
        lede={
          buyer
            ? "Then the buyer dashboard. Jobs, drawing privacy, and how many prints you source a month."
            : "Shops land on the supplier dashboard. Buyers land on the buyer dashboard. Forgot the password? Use Forgot password on this form."
        }
      />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        {buyer ? (
          <>
            New buyer?{" "}
            <Link href="/sign-up?as=buyer" className="text-copper hover:underline">
              Buyer sign-up
            </Link>
            {" · "}
            Run a shop?{" "}
            <Link href="/sign-in" className="text-copper hover:underline">
              Shop log in
            </Link>
            .
          </>
        ) : (
          <>
            New here?{" "}
            <Link href={signUpHref} className="text-copper hover:underline">
              Shop sign-up
            </Link>
            {" · "}
            <Link href="/sign-up?as=buyer" className="text-copper hover:underline">
              Buyer sign-up
            </Link>
            {" · "}
            <Link
              href="/sign-in?as=buyer"
              className="text-copper hover:underline"
            >
              Buyer log in
            </Link>
            .
          </>
        )}
      </p>
      <div className="mt-10">
        <SignIn
          appearance={clerkAppearance}
          fallbackRedirectUrl={after}
          forceRedirectUrl={after}
          signUpUrl={signUpHref}
        />
      </div>
    </Page>
  );
}
