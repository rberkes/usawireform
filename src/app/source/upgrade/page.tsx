import { auth } from "@clerk/nextjs/server";
import { SourceUpgradePlans } from "@/components/SourceUpgradePlans";
import { ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import { getSourcePlanForUser } from "@/lib/source-billing";
import { pageMeta } from "@/lib/seo";
import { formatPlanPrice, SOURCE_PLANS } from "@/lib/source-plans";
import { SOURCE_SECONDARY_LINE } from "@/lib/source-secondaries";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Source plans — shop dashboard",
    description:
      "List equipment free on Source. Buyer leads need a paid plan. $30/mo for 4 cells. $49/mo for 10. $99/mo for 20. Up to 3 secondaries $19/mo. Six maximum $49/mo. Stripe checkout.",
  path: "/source/upgrade",
  keywords: [
    "wire forming capacity",
    "CNC equipment list",
    "source shop plan",
  ],
});

export default async function SourceUpgradePage() {
  const { userId } = await auth();
  const plan = userId ? await getSourcePlanForUser(userId) : SOURCE_PLANS[0];
  const free = SOURCE_PLANS[0];

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Shop plans"
        lede="Listing a cell is free. Buyer leads go to paid plans. Extra cells are $30 a month for four, $49 for ten, $99 for twenty. How the factory operates — min, setup, stock, lead — stays free on the listing."
      />

      <Panel className="mt-10 max-w-xl p-5 sm:p-6">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          {free.name}
        </p>
        <p className="mt-3 text-3xl font-medium tracking-tight">
          {formatPlanPrice(free.priceCents)}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          List one cell and how the plant runs — no card. Buyer RFQs do not
          come to this inbox until you subscribe. Extra cells and listed
          secondaries are on the paid plans below.
        </p>
        <div className="mt-6">
          <ButtonLink href="/source/dashboard" variant="ghost">
            Open the shop dashboard
          </ButtonLink>
        </div>
      </Panel>

      <SourceUpgradePlans currentPlanId={plan.id} />

      <p className="mt-8 max-w-xl text-sm leading-6 text-muted">
        {SOURCE_SECONDARY_LINE} File them from the dashboard.
      </p>

      <p className="mt-10 max-w-xl text-sm leading-6 text-muted">
        Instant estimate on this site is still this cell. Source is the
        trade — other floors, other heads. Cancel any month from billing on
        the dashboard.
      </p>
    </Page>
  );
}
