import { auth, currentUser } from "@clerk/nextjs/server";
import { SourceEquipmentForm } from "@/components/SourceEquipmentForm";
import { ButtonLink, Page, PageHero } from "@/components/ui";
import {
  countSourceCells,
  remainingSourceCells,
  sourceFilingsForShop,
} from "@/lib/source-account";
import { getSourcePlanForUser } from "@/lib/source-billing";
import { pageMeta } from "@/lib/seo";
import { planById, SOURCE_PLAN_LINE } from "@/lib/source-plans";
import { getSourceInvite, listSourceFilings } from "@/lib/source";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Register and upload equipment — Source",
  description:
    "File machine, year, capacity, and stocked wire sizes. Buyers upload a STEP; quotes match equipment that can manufacture the part.",
  path: "/source/equipment",
});

type Props = { searchParams: Promise<{ invite?: string }> };

export default async function SourceEquipmentPage({ searchParams }: Props) {
  const { invite: inviteId } = await searchParams;
  const [{ userId }, invite] = await Promise.all([
    auth(),
    inviteId ? getSourceInvite(inviteId) : Promise.resolve(null),
  ]);

  let maxCells = planById("free").cells;
  if (userId) {
    const [user, plan, filings] = await Promise.all([
      currentUser(),
      getSourcePlanForUser(userId),
      listSourceFilings(),
    ]);
    const email = user?.primaryEmailAddress?.emailAddress ?? invite?.to ?? "";
    const used = countSourceCells(
      sourceFilingsForShop(filings, { userId, email }),
    );
    maxCells = remainingSourceCells(plan, used);
  }

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Register and upload equipment"
        lede="Pick the machine class, then file OEM, model, year, capacity, and stocked sizes. Listing is free. Matched leads show in the dashboard at $49 each."
      />
      {invite ? (
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          Invite for {invite.company || invite.to}. Use the email the invite
          was sent to.
        </p>
      ) : null}
      <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
        {SOURCE_PLAN_LINE} Confirm the account from the receipt, then the{" "}
        <a href="/source/dashboard" className="text-copper hover:underline">
          shop dashboard
        </a>{" "}
        is where you add more.
      </p>
      {maxCells <= 0 ? (
        <div className="mt-8 space-y-4">
          <p className="max-w-xl text-sm leading-6 text-muted">
            This form is full. Existing cells stay on the dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/source/upgrade">How leads work</ButtonLink>
            <ButtonLink href="/source/dashboard" variant="ghost">
              Shop dashboard
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <SourceEquipmentForm
            inviteId={invite?.id}
            company={invite?.company}
            email={invite?.to}
            maxCells={maxCells}
          />
        </div>
      )}
    </Page>
  );
}
