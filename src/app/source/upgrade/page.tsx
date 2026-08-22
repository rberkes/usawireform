import { auth } from "@clerk/nextjs/server";
import { SourceUpgradePlans } from "@/components/SourceUpgradePlans";
import { ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import { getSourcePlanForUser } from "@/lib/source-billing";
import { pageMeta } from "@/lib/seo";
import { formatPlanPrice, SOURCE_PLANS } from "@/lib/source-plans";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Source plans — shop dashboard",
  description:
    "File CNC cells on Source. One cell free. $30/mo for 4. $49/mo for 10. $99/mo for 20. Stripe checkout.",
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
        lede="The dashboard is where you add cells. One cell is free. Three more is $30 a month."
      />

      <Panel className="mt-10 max-w-xl p-5 sm:p-6">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          {free.name}
        </p>
        <p className="mt-3 text-3xl font-medium tracking-tight">
          {formatPlanPrice(free.priceCents)}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          One cell. Confirm the account. Three more is $30 a month. Then 10
          and 20.
        </p>
        <div className="mt-6">
          <ButtonLink href="/source/dashboard" variant="ghost">
            Open the shop dashboard
          </ButtonLink>
        </div>
      </Panel>

      <SourceUpgradePlans currentPlanId={plan.id} />

      <p className="mt-10 max-w-xl text-sm leading-6 text-muted">
        Instant estimate on this site is still this cell. Source is the
        trade — other floors, other heads. Cancel any month from billing on
        the dashboard.
      </p>
    </Page>
  );
}
