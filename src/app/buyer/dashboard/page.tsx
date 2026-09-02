import { currentUser } from "@clerk/nextjs/server";
import { SourceBuyerForm } from "@/components/SourceBuyerForm";
import { ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import { jobsForBuyer, shopDrawingHref } from "@/lib/source-access";
import { requireBuyer, requireSignedIn } from "@/lib/source-gate";
import {
  buyerMayUploadExtras,
  clerkEmailIsConfirmed,
  getBuyerAccount,
  saveBuyerAccount,
} from "@/lib/source-buyer";
import { listSourceJobs } from "@/lib/source";
import {
  drawingPrivacyLabel,
  parseDrawingPrivacy,
} from "@/lib/source-types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Buyer dashboard — Source",
  robots: { index: false, follow: false },
};

export default async function BuyerDashboardPage() {
  const userId = await requireSignedIn("/buyer/dashboard");
  await requireBuyer(userId);

  const [user, account, jobs] = await Promise.all([
    currentUser(),
    getBuyerAccount(userId),
    listSourceJobs(),
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

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Buyer dashboard"
        lede="Your jobs and drawing privacy. Matched shops see the spec. You choose whether a quoting shop can open the STEP."
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

      <section className="mt-12">
        <h2 className="text-lg font-medium">Your jobs</h2>
        {mine.length === 0 ? (
          <Panel className="mt-4 space-y-3 p-5">
            <p className="text-sm leading-6 text-muted">
              No jobs on this email yet. Send a print from Source — keep the
              STEP at the desk, or release it so quoting shops can open the
              file.
            </p>
            <ButtonLink href="/source" variant="ghost">
              Send the print
            </ButtonLink>
          </Panel>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {mine.map((job) => {
              const privacy = parseDrawingPrivacy(job.drawingPrivacy);
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
                    {job.mailedTo && job.mailedTo.length > 0
                      ? ` · offered to ${job.mailedTo.length === 1 ? "1 shop" : `${job.mailedTo.length} shops`}`
                      : " · no match yet"}
                    {job.purchasedBy && job.purchasedBy.length > 0
                      ? ` · ${job.purchasedBy.length === 1 ? "1 shop has contact" : `${job.purchasedBy.length} shops have contact`}`
                      : ""}
                  </p>
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
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </Page>
  );
}
