import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncCheckoutSession } from "@/app/actions/source-billing";
import { openSourceBillingPortal, startSourceLeadCheckout } from "@/app/actions/source-billing";
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
import { formatLeadPrice, SOURCE_LEAD_BUYERS_MAX, SOURCE_PLAN_LINE } from "@/lib/source-plans";
import {
  jobsMailedToShop,
  leadPurchaseCount,
  shopBoughtLead,
  shopDrawingHref,
  shopMaySeeBuyerContact,
  shopMayViewDrawing,
} from "@/lib/source-access";
import { requireSignedIn, requireSupplier } from "@/lib/source-gate";
import {
  getSourceProfile,
  listSourceFilings,
  listSourceJobs,
  saveSourceProfile,
  uniqueSourceSlug,
} from "@/lib/source";
import { secondariesForForm } from "@/lib/source-secondaries";
import { normalizeShopWebsite, sourceAccountLocksClaim, sourceClaimPath, suggestedDirectoryClaim } from "@/lib/source-directory";
import { parseDrawingPrivacy } from "@/lib/source-types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Shop dashboard — Source",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string; lead?: string }> };

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
    ndaAcceptedAt: undefined,
    ndaVersion: undefined,
    ndaName: undefined,
  };
  await saveSourceProfile(profile);
  return profile;
}

export default async function SourceDashboardPage({ searchParams }: Props) {
  const userId = await requireSignedIn("/source/enter");
  await requireSupplier(userId);

  const { session_id: sessionId, lead: leadFlag } = await searchParams;
  if (sessionId) {
    await syncCheckoutSession(sessionId);
    redirect("/source/dashboard");
  }

  const [user, plan, filings, billedSecondaries, jobs] = await Promise.all([
    currentUser(),
    getSourcePlanForUser(userId),
    listSourceFilings(),
    getSourceSecondaryQtyForUser(userId),
    listSourceJobs(),
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
  const inbox = jobsMailedToShop(jobs, { userId, email });
  const finishClaim = suggestedDirectoryClaim(profile);

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
      {finishClaim ? (
        <Panel className="mt-8 max-w-xl space-y-3 p-5">
          <p className="text-sm leading-6 text-muted">
            Login is done. {finishClaim.name} is still unclaimed on the
            directory. Finish with plant street, a public floor-proof URL, and
            the factory attestation.
          </p>
          <ButtonLink href={sourceClaimPath(finishClaim.slug)}>
            Continue claiming {finishClaim.name}
          </ButtonLink>
        </Panel>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/source/upgrade" variant="ghost">
          How leads work
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
            Leads
          </p>
          <p className="mt-2 text-xl font-medium">{formatLeadPrice()} each</p>
          <p className="mt-1 text-sm text-muted">
            Up to {SOURCE_LEAD_BUYERS_MAX} shops can buy a job.
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Cells
          </p>
          <p className="mt-2 text-xl font-medium">{used}</p>
          <p className="mt-1 text-sm text-muted">
            Listing is free. {remaining === 0
              ? "This form is full — cells already filed stay."
              : `${remaining} more in this form.`}
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
        <p className="mt-2 text-xl font-medium">Buy as they come</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {SOURCE_PLAN_LINE} Spec shows here. Buyer contact unlocks after you
          pay. A STEP opens only if the buyer released it.
        </p>
        {leadFlag === "full" ? (
          <p className="mt-2 text-sm leading-6 text-copper">
            This lead already has {SOURCE_LEAD_BUYERS_MAX} buyers.
          </p>
        ) : null}
        {leadFlag === "stripe" ? (
          <p className="mt-2 text-sm leading-6 text-copper">
            Card checkout is not configured. Email the desk.
          </p>
        ) : null}
      </Panel>

      <section className="mt-4">
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Job inbox
          </p>
          {inbox.length === 0 ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              No matched buyer jobs yet. When a print fits a cell you filed,
              the lead lands here. Pay {formatLeadPrice()} to unlock the
              buyer.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-line border border-line">
              {inbox.map((job) => {
                const bought = shopBoughtLead(job, { userId, email });
                const contact = shopMaySeeBuyerContact(job, { userId, email });
                const released = shopMayViewDrawing(job, {
                  userId,
                  email,
                  profile,
                });
                const privacy = parseDrawingPrivacy(job.drawingPrivacy);
                const sold = leadPurchaseCount(job);
                const full = sold >= SOURCE_LEAD_BUYERS_MAX && !bought;
                return (
                  <li key={job.pathname} className="px-4 py-4 text-sm">
                    <p className="font-medium">
                      {job.kind || "Job"}
                      {job.diameterMm != null ? ` · ${job.diameterMm} mm` : ""}
                      {job.qty ? ` · qty ${job.qty}` : ""}
                    </p>
                    <p className="mt-1 text-muted">
                      {[job.city, job.state].filter(Boolean).join(", ") || "Locale on the print"}
                      {job.oem ? ` · ${job.oem}` : ""}
                    </p>
                    {job.notes ? (
                      <p className="mt-1 max-w-2xl text-foreground/90">
                        {bought ? job.notes : job.notes.slice(0, 140)}
                      </p>
                    ) : null}
                    {contact ? (
                      <p className="mt-2 text-foreground">
                        {[job.company, job.name, job.email, job.phone]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : (
                      <p className="mt-2 text-muted">
                        Buyer contact unlocks at {formatLeadPrice()}.
                        {sold
                          ? ` ${sold} of ${SOURCE_LEAD_BUYERS_MAX} shops bought this lead.`
                          : ""}
                      </p>
                    )}
                    <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                      {privacy === "matched"
                        ? released
                          ? "Drawing released — open in this dashboard"
                          : bought
                            ? "Buyer released the STEP — waiting on file access"
                            : "STEP released after you buy"
                        : "STEP held at the desk"}
                    </p>
                    {released && job.drawingPath ? (
                      <p className="mt-2">
                        <a
                          href={shopDrawingHref(job.drawingPath, job.fileName)}
                          className="text-copper hover:underline"
                        >
                          Open {job.fileName || "drawing"}
                        </a>
                      </p>
                    ) : null}
                    {!bought && !full ? (
                      <form action={startSourceLeadCheckout} className="mt-3">
                        <input type="hidden" name="pathname" value={job.pathname} />
                        <Button type="submit">
                          Buy this lead — {formatLeadPrice()}
                        </Button>
                      </form>
                    ) : null}
                    {full ? (
                      <p className="mt-2 text-sm text-muted">
                        This lead is closed. {SOURCE_LEAD_BUYERS_MAX} shops
                        already bought it.
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </section>

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
