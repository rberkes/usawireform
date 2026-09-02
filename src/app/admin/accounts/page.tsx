import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { AdminStepPreview } from "@/components/UploadedDrawingPreview";
import { Button, Page, PageHero } from "@/components/ui";
import { adminFileHref } from "@/lib/blob";
import {
  removeIncompleteSourceShop,
  runSourceRegistrationReminders,
} from "@/app/actions/source-reminders";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import {
  listSourceFilings,
  listSourceJobs,
  listSourceProfiles,
} from "@/lib/source";
import { jobsForBuyer } from "@/lib/source-access";
import {
  buyerDeskVerified,
  buyerProfileComplete,
  listBuyerAccounts,
} from "@/lib/source-buyer";
import { setSourceBuyerVerified } from "@/app/actions/source-accounts";
import { SOURCE_NDA_VERSION, shopHasNda } from "@/lib/source-nda";
import { countSourceSubscribers } from "@/lib/source-leads";
import { purgeKnownTestRecords } from "@/lib/purge-test-records";
import {
  listIncompleteSourceShops,
  listSourceReminderLogs,
  reminderKindLabel,
} from "@/lib/source-reminders";
import {
  drawingPrivacyLabel,
  parseDrawingPrivacy,
} from "@/lib/source-types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Source accounts",
  robots: { index: false, follow: false },
};

function ny(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", { timeZone: "America/New_York" });
}

export default async function AdminAccountsPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    reminded?: string;
    held?: string;
    missing?: string;
    failed?: string;
  }>;
}) {
  const { error, reminded, held, missing, failed } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return <AdminLogin next="/admin/accounts" error={error} title="Accounts" />;
  }

  await purgeKnownTestRecords();

  const [
    profiles,
    buyers,
    jobs,
    filings,
    quoteCount,
    directoryCount,
    subscriberCount,
    incomplete,
    reminderLogs,
  ] = await Promise.all([
    listSourceProfiles(),
    listBuyerAccounts(),
    listSourceJobs(),
    listSourceFilings(),
    countQuoteSubmissions(),
    countDirectoryLeads(),
    countSourceSubscribers(),
    listIncompleteSourceShops(),
    listSourceReminderLogs(),
  ]);

  const emailByUser = new Map<string, string>();
  for (const row of filings) {
    if (row.userId && row.email && !emailByUser.has(row.userId)) {
      emailByUser.set(row.userId, row.email);
    }
  }

  const buyerEmails = new Set(
    buyers.map((row) => row.email.trim().toLowerCase()).filter(Boolean),
  );
  const shops = [...profiles].sort((a, b) =>
    (b.listedAt || b.updatedAt).localeCompare(a.listedAt || a.updatedAt),
  );
  const newestBuyers = [...buyers].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
  const steps = jobs.filter((job) => job.drawingPath);
  const specOnly = jobs.filter((job) => !job.drawingPath);
  const guestJobs = jobs.filter(
    (job) =>
      job.email &&
      !job.buyerUserId &&
      !buyerEmails.has(job.email.trim().toLowerCase()),
  );
  const ndaOk = shops.filter((row) => shopHasNda(row)).length;
  const accountCount = profiles.length + buyers.length;
  const lastReminder = new Map(
    reminderLogs.map((row) => [row.key, row.sentAt[row.sentAt.length - 1]]),
  );
  const reminderCount = new Map(
    reminderLogs.map((row) => [row.key, row.sentAt.length]),
  );
  const ranReminders = reminded != null;

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Accounts"
        lede="New shops, buyers, and Source STEP files. This-floor Contact drawings stay under Quote files. Password resets stay in Clerk."
      />
      <AdminInboxNav
        current="accounts"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={filings.length}
        subscriberCount={subscriberCount}
        accountCount={accountCount}
      />

      <nav
        className="mt-8 flex flex-wrap gap-3 text-sm"
        aria-label="Accounts sections"
      >
        <a href="#shops" className="text-copper hover:underline">
          Shops ({shops.length})
        </a>
        <a href="#incomplete" className="text-copper hover:underline">
          Incomplete ({incomplete.length})
        </a>
        <a href="#buyers" className="text-copper hover:underline">
          Buyers ({newestBuyers.length})
        </a>
        <a href="#files" className="text-copper hover:underline">
          STEP files ({steps.length})
        </a>
        <a href="/admin/live" className="text-muted hover:text-copper hover:underline">
          Live pages
        </a>
      </nav>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <p className="border border-line px-4 py-4 text-sm">
          <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Shops
          </span>
          <span className="mt-2 block text-xl font-medium">{shops.length}</span>
          <span className="mt-1 block text-muted">
            {ndaOk} signed NDA {SOURCE_NDA_VERSION}
            {incomplete.length
              ? ` · ${incomplete.length} incomplete`
              : ""}
          </span>
        </p>
        <p className="border border-line px-4 py-4 text-sm">
          <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Buyers
          </span>
          <span className="mt-2 block text-xl font-medium">
            {newestBuyers.length}
          </span>
          <span className="mt-1 block text-muted">
            {guestJobs.length === 0
              ? "No guest RFQs waiting on an account"
              : `${guestJobs.length} guest RFQ${guestJobs.length === 1 ? "" : "s"} without an account`}
          </span>
        </p>
        <p className="border border-line px-4 py-4 text-sm">
          <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            STEP files
          </span>
          <span className="mt-2 block text-xl font-medium">{steps.length}</span>
          <span className="mt-1 block text-muted">
            {specOnly.length === 0
              ? "Every Source job has a drawing"
              : `${specOnly.length} job${specOnly.length === 1 ? "" : "s"} spec-only`}
          </span>
        </p>
      </div>

      <section id="incomplete" className="mt-12 scroll-mt-24">
        <h2 className="text-lg font-medium">Incomplete registration</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Daily at 10:00 Eastern. First mail after 18 hours, then every 3 days,
          stop after 3. NDA, directory claim, unconfirmed equipment, and unused
          invites. Listed shops also get a plant-fullness email on the 1st
          and 15th Eastern. The button below skips the 18-hour wait (still will
          not send twice in 3 days). Desk gets a copy when any go out.
        </p>
        {ranReminders ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            This run: sent {reminded || "0"}, held {held || "0"} (too soon or
            already at 3), no email {missing || "0"}, failed {failed || "0"}.
          </p>
        ) : null}
        <form action={runSourceRegistrationReminders} className="mt-4">
          <Button type="submit">Email due reminders now</Button>
        </form>
        {incomplete.length === 0 ? (
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Every started shop finished NDA and claim, or there is no email on
            file yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {incomplete.map((row) => {
              const last = lastReminder.get(row.key);
              const n = reminderCount.get(row.key) ?? 0;
              return (
                <li key={row.key} className="px-4 py-4 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {row.company}
                      {row.to ? (
                        <span className="ml-2 font-normal text-muted">
                          {row.to}
                        </span>
                      ) : (
                        <span className="ml-2 font-normal text-muted">
                          no email on file
                        </span>
                      )}
                    </p>
                    <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                      {reminderKindLabel(row.kind)}
                    </p>
                  </div>
                  <p className="mt-1 text-muted">{row.detail}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    Started {ny(row.startedAt)}
                    {n
                      ? ` · ${n} reminder${n === 1 ? "" : "s"}${
                          last ? `, last ${ny(last)}` : ""
                        }`
                      : " · none sent yet"}
                  </p>
                  {row.kind === "invite" && row.to ? (
                    <form action={removeIncompleteSourceShop} className="mt-2">
                      <input type="hidden" name="email" value={row.to} />
                      <input type="hidden" name="kind" value={row.kind} />
                      <Button type="submit" variant="ghost">
                        Remove unused invite
                      </Button>
                    </form>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section id="shops" className="mt-12 scroll-mt-24">
        <h2 className="text-lg font-medium">Shops</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Newest first. Shops list iron free. They open buyer contact after they
          buy the lead. A released STEP follows that purchase.
        </p>
        {shops.length === 0 ? (
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            No shop profiles yet. A shop appears here after equipment filing
            plus account, or after the NDA.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {shops.map((row) => (
              <li key={row.userId} className="px-4 py-4 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">
                    {row.company || "Shop"}
                    {row.name ? (
                      <span className="ml-2 font-normal text-muted">
                        {row.name}
                      </span>
                    ) : null}
                  </p>
                  <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                    {shopHasNda(row)
                      ? `NDA ${row.ndaVersion}`
                      : row.ndaAcceptedAt
                        ? `NDA outdated (${row.ndaVersion || "none"})`
                        : "NDA not signed"}
                  </p>
                </div>
                <p className="mt-1 text-muted">
                  {[
                    emailByUser.get(row.userId),
                    [row.city, row.state].filter(Boolean).join(", "),
                    row.slug ? `/directory/${row.slug}` : "",
                  ]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {ny(row.listedAt || row.updatedAt)}
                  {row.ndaName ? ` · signed as ${row.ndaName}` : ""}
                </p>
                {row.slug ? (
                  <p className="mt-2">
                    <a
                      href={`/directory/${row.slug}`}
                      className="text-copper hover:underline"
                    >
                      Open listing
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="buyers" className="mt-12 scroll-mt-24">
        <h2 className="text-lg font-medium">Buyers</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Newest first. Guest RFQs without an account are listed under the
          buyer until they confirm Clerk. Prints (STEP, DXF, SLDPRT, PDF)
          are always allowed. Excel and other files stay locked until the
          buyer confirms the account and you validate them here.
        </p>
        {newestBuyers.length === 0 ? (
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            No buyer accounts yet. Jobs from /source still land in STEP files
            below.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {newestBuyers.map((row) => {
              const theirs = jobsForBuyer(jobs, {
                userId: row.userId,
                email: row.email,
              });
              const theirsSteps = theirs.filter((job) => job.drawingPath).length;
              const extrasOpen =
                buyerDeskVerified(row) &&
                buyerProfileComplete(row) &&
                Boolean(row.emailConfirmedAt);
              return (
                <li key={row.userId} className="px-4 py-4 text-sm">
                  <p className="font-medium">
                    {row.company || row.email}
                    <span className="ml-2 font-normal text-muted">{row.email}</span>
                  </p>
                  <p className="mt-1 text-muted">
                    {[row.name, row.phone].filter(Boolean).join(" · ") || "—"}
                  </p>
                  <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                    {theirs.length === 0
                      ? "No jobs yet"
                      : `${theirs.length} job${theirs.length === 1 ? "" : "s"}`}
                    {theirsSteps > 0 ? ` · ${theirsSteps} STEP` : ""}
                    {extrasOpen
                      ? " · extra files open"
                      : " · prints only"}
                    {row.emailConfirmedAt ? " · email confirmed" : " · email not confirmed"}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {ny(row.updatedAt)}
                    {row.verifiedAt ? ` · validated ${ny(row.verifiedAt)}` : ""}
                  </p>
                  <form action={setSourceBuyerVerified} className="mt-3">
                    <input type="hidden" name="userId" value={row.userId} />
                    <input
                      type="hidden"
                      name="verified"
                      value={row.verifiedAt ? "0" : "1"}
                    />
                    <Button type="submit" variant={row.verifiedAt ? "ghost" : "primary"}>
                      {row.verifiedAt ? "Lock extra files" : "Validate buyer"}
                    </Button>
                  </form>
                </li>
              );
            })}
          </ul>
        )}
        {guestJobs.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-sm font-medium">Guest RFQs (no buyer account)</h3>
            <ul className="mt-3 divide-y divide-line border border-line">
              {guestJobs.slice(0, 40).map((job) => (
                <li key={job.pathname} className="px-4 py-4 text-sm">
                  <p className="font-medium">
                    {job.company || job.email}
                    <span className="ml-2 font-normal text-muted">{job.email}</span>
                  </p>
                  <p className="mt-1 text-muted">
                    {job.kind}
                    {job.diameterMm != null ? ` · ${job.diameterMm} mm` : ""}
                    {job.drawingPath ? " · has STEP" : " · spec only"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section id="files" className="mt-12 scroll-mt-24">
        <h2 className="text-lg font-medium">STEP files</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Source jobs from /source. The desk can always download. A shop only
          opens a file after they buy the lead and the buyer released it.
        </p>
        {jobs.length === 0 ? (
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            No Source jobs yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {jobs.map((row) => {
              const privacy = parseDrawingPrivacy(row.drawingPrivacy);
              const href = row.drawingPath
                ? adminFileHref(row.drawingPath, row.fileName)
                : null;
              return (
                <li key={row.pathname} className="px-4 py-4 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {row.company || row.email}
                      <span className="ml-2 font-normal text-muted">{row.email}</span>
                    </p>
                    <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                      {row.drawingPath ? "STEP" : "Spec only"}
                    </p>
                  </div>
                  <p className="mt-1 text-muted">
                    {[
                      row.name,
                      row.phone,
                      [row.city, row.state].filter(Boolean).join(", "),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-1 text-muted">
                    {row.diameterMm != null ? `${row.diameterMm} mm` : row.diameterRaw}
                    {row.kind ? ` · ${row.kind}` : ""}
                    {row.oem ? ` · ${row.oem}` : ""}
                    {row.qty ? ` · qty ${row.qty}` : ""}
                  </p>
                  {row.notes ? (
                    <p className="mt-1 max-w-2xl text-foreground/90">{row.notes}</p>
                  ) : null}
                  <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                    {drawingPrivacyLabel(privacy)}
                    {row.mailedTo && row.mailedTo.length > 0
                      ? ` · ${row.mailedTo.map((shop) => shop.company || shop.email).join(", ")}`
                      : " · no match yet"}
                    {row.buyerUserId ? " · buyer account" : " · guest"}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {ny(row.timestamp)}
                  </p>
                  {href ? (
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                      <a href={href} className="text-copper hover:underline">
                        Download {row.fileName || "drawing"}
                      </a>
                      <AdminStepPreview src={href} name={row.fileName} />
                    </div>
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
