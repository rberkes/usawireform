import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { Page, PageHero } from "@/components/ui";
import { safeSourceNext } from "@/lib/source-gate";

export const metadata = {
  title: "Confirm your Source account",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{
    email_address?: string;
    as?: string;
    redirect_url?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const { email_address: email, as, redirect_url: raw } = await searchParams;
  const buyer = as === "buyer";
  const next = buyer ? "" : safeSourceNext(raw);
  const after = buyer ? "/buyer/dashboard" : next || "/source/enter";
  const signInUrl = next
    ? `/sign-in?redirect_url=${encodeURIComponent(next)}`
    : "/sign-in";

  return (
    <Page>
      <PageHero
        kicker="Source"
        title={buyer ? "Confirm a buyer account" : "Confirm the shop account"}
        lede={
          buyer
            ? "Then the buyer dashboard. You manage jobs and whether a STEP is released. Matched shops only open a file after they signed the NDA."
            : next.startsWith("/source/claim")
              ? "Use the shop email. Next you accept the supplier NDA, then finish claiming this listing."
              : "Use the email we sent the equipment receipt to. Next you accept the supplier NDA. Buyer prints stay behind that agreement."
        }
      />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        {buyer ? (
          <>
            Run a shop?{" "}
            <Link href="/sign-up?as=supplier" className="text-copper hover:underline">
              Supplier sign-up
            </Link>
            .
          </>
        ) : (
          <>
            Buying parts?{" "}
            <Link href="/sign-up?as=buyer" className="text-copper hover:underline">
              Buyer sign-up
            </Link>
            .
          </>
        )}
      </p>
      <div className="mt-10">
        <SignUp
          appearance={clerkAppearance}
          fallbackRedirectUrl={after}
          signInUrl={signInUrl}
          unsafeMetadata={{ sourceRole: buyer ? "buyer" : "supplier" }}
          initialValues={email ? { emailAddress: email } : undefined}
        />
      </div>
    </Page>
  );
}
