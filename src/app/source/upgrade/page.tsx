import { ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import {
  formatLeadPrice,
  SOURCE_PLAN_LINE,
  SOURCE_SMART_CONNECT,
  SOURCE_SMART_CONNECT_LINE,
  SOURCE_TEASER_POOL,
} from "@/lib/source-plans";
import { SOURCE_SECONDARY_LINE } from "@/lib/source-secondaries";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Unlock Buyer Leads with AI Smart Connect™",
  description:
    "List every cell free. Matched buyer jobs show in the shop dashboard. Unlock Buyer Leads with AI Smart Connect™. Six shops see the teaser. First two to unlock get contact.",
  path: "/source/upgrade",
  keywords: ["wire forming leads", "buy RFQ", "source shop dashboard"],
});

export default function SourceUpgradePage() {
  return (
    <Page>
      <PageHero
        kicker="Source"
        title={SOURCE_SMART_CONNECT_LINE}
        lede={SOURCE_PLAN_LINE}
      />

      <Panel className="mt-10 max-w-xl space-y-3 p-5 sm:p-6">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Equipment
        </p>
        <p className="text-3xl font-medium tracking-tight">Free</p>
        <p className="text-sm leading-6 text-muted">
          File every cell on the floor. No monthly cell cap. How the plant
          operates stays free on the listing.
        </p>
      </Panel>

      <Panel className="mt-4 max-w-xl space-y-3 p-5 sm:p-6">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          {SOURCE_SMART_CONNECT}
        </p>
        <p className="text-3xl font-medium tracking-tight">{formatLeadPrice()}</p>
        <p className="text-sm leading-6 text-muted">
          The job shows in your dashboard when a print fits a cell you filed.
          Pay {formatLeadPrice()} to unlock buyer contact. Up to{" "}
          {SOURCE_TEASER_POOL} shops see the teaser. First two to unlock get
          contact — first come. Others wait if the buyer wants another quote.
          File fullness this week to sit higher in that six. A STEP opens
          only if the buyer released it. Never attached to email.
        </p>
        <div className="pt-2">
          <ButtonLink href="/source/dashboard">Open the shop dashboard</ButtonLink>
        </div>
      </Panel>

      <p className="mt-8 max-w-xl text-sm leading-6 text-muted">
        {SOURCE_SECONDARY_LINE} File them from the dashboard.
      </p>
    </Page>
  );
}
