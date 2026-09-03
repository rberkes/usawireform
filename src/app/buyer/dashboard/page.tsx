import { currentUser } from "@clerk/nextjs/server";
import { syncCheckoutSession } from "@/app/actions/source-billing";
import { SourceBuyerForm } from "@/components/SourceBuyerForm";
import { SourceBuyerVolumeForm } from "@/components/SourceBuyerVolumeForm";
import { SourceBuyerExtraShopsForm } from "@/components/SourceBuyerExtraShopsForm";
import { ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import { jobsForBuyer, jobIsReleased, shopDrawingHref } from "@/lib/source-access";
import { requireBuyer, requireSignedIn } from "@/lib/source-gate";
import {
  buyerMayUploadExtras,
  clerkEmailIsConfirmed,
  getBuyerAccount,
  saveBuyerAccount,
} from "@/lib/source-buyer";
import { applyProfilesToFilings, listSourceFilings, listSourceJobs, listSourceProfiles } from "@/lib/source";
import { matchFilingsToJob } from "@/lib/source-match";
import { jobToSpec } from "@/lib/source-release";
import { maskEmail } from "@/lib/mask-email";
import {
  SOURCE_BUYER_INCLUDED_SHOPS,
  SOURCE_BUYER_QUOTE_LINE,
  extraShopsRemaining,
} from "@/lib/source-plans";
import { stripeConfigured } from "@/lib/stripe";
import {
  drawingPrivacyLabel,
  parseDrawingPrivacy,
} from "@/lib/source-types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Buyer dashboard — Source",
  robots: { index: false, follow: false },
};

export default async function BuyerDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const userId = await requireSignedIn("/buyer/dashboard", { as: "buyer" });
  await requireBuyer(userId);
  const { session_id: sessionId } = await searchParams;
  if (sessionId) {
    await syncCheckoutSession(sessionId);
  }

  const [user, account, jobs, filingRows, profiles] = await Promise.all([
    currentUser(),
    getBuyerAccount(userId),
    listSourceJobs(),
    listSourceFilings(),
    listSourceProfiles(),
  ]);
  if (account && clerkEmailIsConfirmed(user) && !account.emailConfirmedAt) {
    const confirmedAt = new Date().toISOString();
    await saveBuyerAccount({
      ...account,
      emailConfirmedAt: confirmedAt,
    });
    account.emailConfirmedAt = confirmedAt;
  }
  const email =
    account?.email || user?.primaryEmailAddress?.emailAddress || "";
  const extrasOpen = buyerMayUploadExtras(account, {
    emailConfirmed: clerkEmailIsConfirmed(user),
  });
  const mine = jobsForBuyer(jobs, { userId, email });
  const filings = applyProfilesToFilings(filingRows, profiles);
  const canPay = stripeConfigured();

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Buyer dashboard"
        lede={`Your jobs and drawing privacy. ${SOURCE_BUYER_QUOTE_LINE} Shop names stay with the desk.`}
      />
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
        {extrasOpen
          ? "This account is confirmed. You can upload STEP, DXF, SLDPRT, PDF, Excel, Word, ZIP, and photos of the print."
          : "Prints only for now (STEP, DXF, SLDPRT, PDF). Excel and other files unlock after you save this account and the desk confirms you are a real buyer."}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/source">Send a print</ButtonLink>
        <ButtonLink href="/source/account" variant="ghost">
          Account
        </ButtonLink>
      </div>

      <section className="mt-10">
        <SourceBuyerForm
          company={account?.company}
          name={account?.name || user?.fullName || undefined}
          email={email}
          phone={account?.phone}
        />
      </section>

      {account?.company ? (
        <section className="mt-10">
          <SourceBuyerVolumeForm jobsPerMonth={account.jobsPerMonth ?? 0} />
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-lg font-medium">Your jobs</h2>
        {mine.length === 0 ? (
          <Panel className="mt-4 space-y-3 p-5">
            <p className="text-sm leading-6 text-muted">
              No jobs on this email yet. Send a print from Source — keep the
              STEP at the desk, or release it so quoting shops can open the
              file. {SOURCE_BUYER_QUOTE_LINE}
            </p>
            <ButtonLink href="/source" variant="ghost">
              Send the print
            </ButtonLink>
          </Panel>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {mine.map((job) => {
              const privacy = parseDrawingPrivacy(job.drawingPrivacy);
              const released = jobIsReleased(job);
              const offered = job.mailedTo?.length ?? 0;
              const quoting = (job.purchasedBy ?? [])
                .map((row) => maskEmail(row.email))
                .filter(Boolean);
              const matchCount = released
                ? matchFilingsToJob(filings, jobToSpec(job)).length
                : 0;
              const remaining = extraShopsRemaining(matchCount, offered);
              return (
                <li
                  key={job.pathname}
                  className="px-4 py-4 text-sm"
                >
                  <p className="font-medium">
                    {job.company || job.email}
                    <span className="ml-2 font-normal text-muted">
                      {job.kind || "job"}
                      {job.diameterMm != null ? ` · ${job.diameterMm} mm` : ""}
                    </span>
                  </p>
                  <p className="mt-1 text-muted">
                    {drawingPrivacyLabel(privacy)}
                    {offered > 0
                      ? offered <= SOURCE_BUYER_INCLUDED_SHOPS
                        ? ` · ${offered} of ${SOURCE_BUYER_INCLUDED_SHOPS} shops included`
                        : ` · ${offered} shops`
                      : " · not sent to shops yet"}
                  </p>
                  {quoting.length > 0 ? (
                    <p className="mt-1 text-muted">
                      Quoting: {quoting.join(" · ")}
                    </p>
                  ) : null}
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {job.timestamp
                      ? new Date(job.timestamp).toLocaleString("en-US", {
                          timeZone: "America/New_York",
                        })
                      : "—"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {job.privacyToken ? (
                      <a
                        href={`/source/privacy?t=${encodeURIComponent(job.privacyToken)}`}
                        className="text-copper hover:underline"
                      >
                        Change drawing privacy
                      </a>
                    ) : null}
                    {job.drawingPath ? (
                      <a
                        href={shopDrawingHref(job.drawingPath, job.fileName)}
                        className="text-copper hover:underline"
                      >
                        Download {job.fileName || "drawing"}
                      </a>
                    ) : null}
                  </div>
                  {released && remaining > 0 && canPay ? (
                    <SourceBuyerExtraShopsForm
                      pathname={job.pathname}
                      remaining={remaining}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </Page>
  );
}
