import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { Page, PageHero } from "@/components/ui";

export const metadata = {
  title: "Confirm your Source account",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ email_address?: string }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const { email_address: email } = await searchParams;
  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Confirm your Source account"
        lede="Use the email we sent the equipment receipt to. Then the shop dashboard."
      />
      <div className="mt-10">
        <SignUp
          appearance={clerkAppearance}
          forceRedirectUrl="/source/dashboard"
          fallbackRedirectUrl="/source/dashboard"
          signInUrl="/sign-in"
          initialValues={email ? { emailAddress: email } : undefined}
        />
      </div>
    </Page>
  );
}
