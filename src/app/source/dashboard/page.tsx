import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncCheckoutSession } from "@/app/actions/source-billing";
import { openSourceBillingPortal } from "@/app/actions/source-billing";
import { SourceAddCellsForm } from "@/components/SourceAddCellsForm";
import { SourceShopForm } from "@/components/SourceShopForm";
import { Button, ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import {
  countSourceCells,
  remainingSourceCells,
  shopFromFilings,
  sourceFilingsForShop,
} from "@/lib/source-account";
import { getSourcePlanForUser, getStripeCustomerId } from "@/lib/source-billing";
import { formatPlanPrice } from "@/lib/source-plans";
import {
  getSourceProfile,
  listSourceFilings,
  saveSourceProfile,
  uniqueSourceSlug,
} from "@/lib/source";
import { normalizeShopWebsite } from "@/lib/source-directory";

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
    updatedAt: new Date().toISOString(),
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

  const [user, plan, filings] = await Promise.all([
    currentUser(),
    getSourcePlanForUser(userId),
    listSourceFilings(),
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
  const cells = shopRows.flatMap((row) => row.machines);
  const customerId = await getStripeCustomerId(userId);
  const location = [shop?.city, shop?.state].filter(Boolean).join(", ");

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Shop dashboard"
        lede="Shop listing, cells, and the plan. Account is email and password."
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
          <p className="mt-1 text-sm text-muted">{formatPlanPrice(plan.priceCents)}</p>
        </Panel>
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Cells
          </p>
          <p className="mt-2 text-xl font-medium">
            {used} / {plan.cells}
          </p>
          <p className="mt-1 text-sm text-muted">
            {remaining === 0
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
          </p>
        </Panel>
      </div>

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
        />
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">Filed cells</h2>
        {cells.length === 0 ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Nothing on the list yet.{" "}
            <a href="/source/equipment" className="text-copper hover:underline">
              Register the shop
            </a>{" "}
            first, then add cells here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {cells.map((row, index) => (
              <li key={`${row.oem}-${row.model}-${index}`} className="px-4 py-3 text-sm">
                <p className="font-medium">
                  {row.oem} {row.model}
                </p>
                <p className="mt-1 text-muted">
                  {row.kind}
                  {row.minMm || row.maxMm
                    ? ` · ${row.minMm || "?"}–${row.maxMm || "?"} mm`
                    : ""}
                </p>
              </li>
            ))}
          </ul>
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
