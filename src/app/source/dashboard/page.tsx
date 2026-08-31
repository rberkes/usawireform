import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncCheckoutSession } from "@/app/actions/source-billing";
import { openSourceBillingPortal } from "@/app/actions/source-billing";
import { SourceAddCellsForm } from "@/components/SourceAddCellsForm";
import { SourceFiledCells } from "@/components/SourceFiledCells";
import { SourceWeeklyCapacityForm } from "@/components/SourceWeeklyCapacityForm";
import { SourceSecondariesForm } from "@/components/SourceSecondariesForm";
import { SourceShopForm } from "@/components/SourceShopForm";
import { Button, ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import {
  countSourceCells,
  filedSourceMachines,
  remainingSourceCells,
  shopFromFilings,
  sourceFilingsForShop,
} from "@/lib/source-account";
import { getSourcePlanForUser, getSourceSecondaryQtyForUser, getStripeCustomerId } from "@/lib/source-billing";
import { formatPlanPrice } from "@/lib/source-plans";
import {
  leadsStatus,
  leadsStatusLabel,
  shopGetsLeads,
} from "@/lib/source-leads";
import {
  getSourceProfile,
  listSourceFilings,
  saveSourceProfile,
  uniqueSourceSlug,
} from "@/lib/source";
import { secondariesForForm } from "@/lib/source-secondaries";
import { normalizeShopWebsite, sourceAccountLocksClaim } from "@/lib/source-directory";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Shop dashboard — Source",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string }> };

async function ensureProfile({
  userId,
  company,
  name,
  phone,
  city,
  state,
  website,
}: {
  userId: string;
  company: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  website: string;
}) {
  const existing = await getSourceProfile(userId);
  if (existing) return existing;
  if (!company) return null;
  const slug = await uniqueSourceSlug(company, userId);
  const now = new Date().toISOString();
  const profile = {
    userId,
    slug,
    company,
    name,
    phone,
    city,
    state,
    website: normalizeShopWebsite(website),
    blurb: "",
    published: true,
    claimedDirectory: false,
    secondaries: [],
    listedAt: now,
    updatedAt: now,
    logoPath: undefined,
    plantStreet: undefined,
    plantProofUrl: undefined,
    plantVerifiedAt: undefined,
    fit: undefined,
    leadsAccess: undefined,
  };
  await saveSourceProfile(profile);
  return profile;
}

export default async function SourceDashboardPage({ searchParams }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/source/dashboard");

  const { session_id: sessionId } = await searchParams;
  if (sessionId) {
    await syncCheckoutSession(sessionId);
    redirect("/source/dashboard");
  }

  const [user, plan, filings, billedSecondaries] = await Promise.all([
    currentUser(),
    getSourcePlanForUser(userId),
    listSourceFilings(),
    getSourceSecondaryQtyForUser(userId),
  ]);
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const shopRows = sourceFilingsForShop(filings, { userId, email });
  const used = countSourceCells(shopRows);
  const remaining = remainingSourceCells(plan, used);
  const fromFiling = shopFromFilings(shopRows);
  const profile = await ensureProfile({
    userId,
    company: fromFiling?.company ?? "",
    name: fromFiling?.name ?? "",
    phone: fromFiling?.phone ?? "",
    city: fromFiling?.city ?? "",
    state: fromFiling?.state ?? "",
    website: fromFiling?.website ?? "",
  });
  const shop = profile ?? fromFiling;
  const cells = shopRows.flatMap((row) => filedSourceMachines(row.machines));
  const customerId = await getStripeCustomerId(userId);
  const location = [shop?.city, shop?.state].filter(Boolean).join(", ");
  const leads = leadsStatus(plan, profile);
  const getsLeads = shopGetsLeads(leads);

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Shop dashboard"
        lede={
          shop?.company
            ? `Signed in as ${shop.company.replace(/\.$/, "")} — one shop per account. Buyer fit and weekly open slots are free.`
            : "Shop listing, buyer fit, weekly open slots, cells, and the plan. How the plant operates is free. Account is email and password."
        }
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/source/upgrade" variant="ghost">
          {plan.id === "free" ? "Upgrade" : "Change plan"}
        </ButtonLink>
        <ButtonLink href="/source/account" variant="ghost">
          Account
        </ButtonLink>
        {customerId ? (
          <form action={openSourceBillingPortal}>
            <Button type="submit" variant="ghost">
              Billing
            </Button>
          </form>
        ) : null}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Plan
          </p>
          <p className="mt-2 text-xl font-medium">{plan.name}</p>
          <p className="mt-1 text-sm text-muted">
            {formatPlanPrice(plan.priceCents)}
            {getsLeads ? " · receives leads" : " · listing only"}
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Cells
          </p>
          <p className="mt-2 text-xl font-medium">
            {used} of {plan.cells}
          </p>
          <p className="mt-1 text-sm text-muted">
            {used > plan.cells
              ? `${used} cells filed. This plan holds ${plan.cells}. Existing cells stay. Remove extras or upgrade.`
              : remaining === 0
                ? "This plan is full."
                : `${remaining} left on this plan.`}
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Shop
          </p>
          <p className="mt-2 text-xl font-medium">{shop?.company || "Not filed"}</p>
          <p className="mt-1 text-sm text-muted">
            {location || email || "—"}
            {shop?.company ? " · Buyer fit is free on the listing." : ""}
          </p>
        </Panel>
      </div>

      <Panel className="mt-4 p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Buyer leads
        </p>
        <p className="mt-2 text-xl font-medium">{leadsStatusLabel(leads)}</p>
        {getsLeads ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Matched RFQs land in this shop email. Listing equipment stays
            free; this is what the plan pays for.
          </p>
        ) : (
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Your cells stay on the floor list. Buyer contact goes to paid
              shops. Subscribe to receive the RFQ.
            </p>
            <ButtonLink href="/source/upgrade" variant="ghost">
              Get leads
            </ButtonLink>
          </div>
        )}
      </Panel>

      <section className="mt-12">
        <SourceShopForm
          company={shop?.company ?? ""}
          name={shop?.name ?? ""}
          phone={shop?.phone ?? ""}
          city={shop?.city ?? ""}
          state={shop?.state ?? ""}
          website={shop?.website ?? ""}
          blurb={profile?.blurb ?? ""}
          slug={profile?.slug}
          claimedDirectory={sourceAccountLocksClaim(profile)}
          plantStreet={profile?.plantStreet ?? ""}
          plantProofUrl={profile?.plantProofUrl ?? ""}
          plantVerified={Boolean(profile?.plantVerifiedAt)}
          fit={profile?.fit}
          logoUrl={
            profile?.logoPath && profile.slug
              ? `/directory/logo/${profile.slug}?v=${encodeURIComponent(profile.updatedAt)}`
              : undefined
          }
        />
      </section>

      {shop?.company ? (
        <section className="mt-12">
          <SourceSecondariesForm
            selected={secondariesForForm(profile?.secondaries)}
            billedQty={billedSecondaries}
          />
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-lg font-medium">Filed cells</h2>
        {cells.length === 0 ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Nothing on the list yet. Add a cell below
            {profile?.claimedDirectory
              ? " — it shows on the directory page you claimed."
              : "."}{" "}
            {!profile?.company ? (
              <>
                <a href="/source/equipment" className="text-copper hover:underline">
                  Register the shop
                </a>{" "}
                first if this is a new listing.
              </>
            ) : null}
          </p>
        ) : (
          <>
            <SourceFiledCells cells={cells} />
            <SourceWeeklyCapacityForm cells={cells} />
          </>
        )}
      </section>

      <section className="mt-12">
        {shop?.company ? (
          <SourceAddCellsForm remaining={remaining} />
        ) : (
          <Panel className="space-y-3 p-5">
            <p className="text-sm leading-6 text-muted">
              Register the plant once. Then this page is the list.
            </p>
            <ButtonLink href="/source/equipment">Register and upload equipment</ButtonLink>
          </Panel>
        )}
      </section>
    </Page>
  );
}
