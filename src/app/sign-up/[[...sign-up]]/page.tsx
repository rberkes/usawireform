import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { Page, PageHero } from "@/components/ui";

export const metadata = {
  title: "Confirm your Source account",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ email_address?: string; as?: string }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const { email_address: email, as } = await searchParams;
  const buyer = as === "buyer";
  return (
    <Page>
      <PageHero
        kicker="Source"
        title={buyer ? "Confirm a buyer account" : "Confirm the shop account"}
        lede={
          buyer
            ? "Then the buyer dashboard. You manage jobs and whether a STEP is released. Matched shops only open a file after they signed the NDA."
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
          fallbackRedirectUrl="/source/enter"
          signInUrl="/sign-in"
          unsafeMetadata={{ sourceRole: buyer ? "buyer" : "supplier" }}
          initialValues={email ? { emailAddress: email } : undefined}
        />
      </div>
    </Page>
  );
}
