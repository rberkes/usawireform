import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { Page, PageHero } from "@/components/ui";
import { safeSourceNext } from "@/lib/source-gate";
import { SOURCE_SMART_CONNECT_LINE } from "@/lib/source-plans";

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
  const signInUrl = buyer
    ? "/sign-in?as=buyer&redirect_url=/buyer/dashboard"
    : next
      ? `/sign-in?redirect_url=${encodeURIComponent(next)}`
      : "/sign-in";

  return (
    <Page>
      <PageHero
        kicker="Source"
        title={buyer ? "Confirm a buyer account" : "Confirm the shop account"}
        lede={
          buyer
            ? "Then the buyer dashboard. You manage jobs, drawing privacy, and how many prints you source a month."
            : next.startsWith("/source/claim")
              ? `Use the shop email. Next you finish claiming this listing. Listing is free. ${SOURCE_SMART_CONNECT_LINE}.`
              : `Use the email we sent the equipment receipt to. Next is the shop dashboard. Listing is free. ${SOURCE_SMART_CONNECT_LINE}.`
        }
      />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        {buyer ? (
          <>
            Run a shop?{" "}
            <Link href="/sign-up?as=supplier" className="text-copper hover:underline">
              Supplier sign-up
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
        ) : (
          <>
            Buying parts?{" "}
            <Link href="/sign-up?as=buyer" className="text-copper hover:underline">
              Buyer sign-up
            </Link>
            {" · "}
            <Link href="/sign-in?as=buyer" className="text-copper hover:underline">
              Buyer log in
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
