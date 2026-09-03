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
  applyProfilesToFilings,
  listSourceFilings,
  listSourceJobs,
  listSourceProfiles,
} from "@/lib/source";
import {
  jobIsReleased,
  jobsForBuyer,
  leadOutcomeCounts,
} from "@/lib/source-access";
import {
  buyerAnswerRecord,
  leadRepeatSummary,
  shopLeadRecords,
} from "@/lib/source-lead-history";
import {
  buyerDeskVerified,
  buyerProfileComplete,
  listBuyerAccounts,
} from "@/lib/source-buyer";
import { releaseSourceJob } from "@/app/actions/source";
import { setSourceBuyerVerified } from "@/app/actions/source-accounts";
import { SOURCE_NDA_VERSION, shopHasNda } from "@/lib/source-nda";
import { countSourceSubscribers } from "@/lib/source-leads";
import { purgeKnownTestRecords } from "@/lib/purge-test-records";
import {
  listIncompleteSourceShops,
  listSourceReminderLogs,
  reminderKindLabel,
} from "@/lib/source-reminders";
import { formatBuyerJobsPerMonth } from "@/lib/source-buyer-volume";
import { SOURCE_LEAD_BUYERS_MAX } from "@/lib/source-plans";
import { deskMailedShopLines, formatDeskPlace } from "@/lib/source-locale";
import { previewSourceReleaseFrom } from "@/lib/source-release";
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
    released?: string;
  }>;
}) {
  const { error, reminded, held, missing, failed, released } = await searchParams;
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
  const leadRecords = shopLeadRecords(jobs);
  const repeat = leadRepeatSummary(leadRecords);
  const ndaOk = shops.filter((row) => shopHasNda(row)).length;
  const accountCount = profiles.length + buyers.length;
  const lastReminder = new Map(
    reminderLogs.map((row) => [row.key, row.sentAt[row.sentAt.length - 1]]),
  );
  const reminderCount = new Map(
    reminderLogs.map((row) => [row.key, row.sentAt.length]),
  );
  const ranReminders = reminded != null;
  const shopPlaces = [
    ...profiles.map((row) => ({
      userId: row.userId,
      city: row.city,
      state: row.state,
    })),
    ...filings.map((row) => ({
      userId: row.userId,
      email: row.email,
      city: row.city,
      state: row.state,
    })),
  ];
  const hydrated = applyProfilesToFilings(filings, profiles);
  const heldCount = jobs.filter((job) => !jobIsReleased(job)).length;
  const releasedNote =
    released === "missing"
      ? "That job is gone."
      : released === "already"
        ? "That print was already sent to shops."
        : released && /^\d+$/.test(released)
          ? `Sent to ${released} shop${released === "1" ? "" : "s"}.`
          : null;

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Accounts"
        lede="New shops, buyers, and Source STEP files. Locale (plant city and nearest metro) is desk-only. This-floor Contact drawings stay under Quote files. Password resets stay in Clerk."
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
          {heldCount ? ` · ${heldCount} held` : ""}
        </a>
        <a href="#repeat" className="text-copper hover:underline">
          Lead repeat ({repeat.repeat}/{repeat.shops})
        </a>
        <a href="/admin/preview" className="text-muted hover:text-copper hover:underline">
          Role views
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
                    formatDeskPlace(row.city, row.state),
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
          buyer until they confirm Clerk. Monthly volume is the slider they
          file on the buyer dashboard — desk-only, they do not see this ping.
          Prints (STEP, DXF, SLDPRT, PDF) are always allowed. Excel and other
          files stay locked until the buyer confirms the account and you
          validate them here.
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
                    {row.jobsPerMonth != null
                      ? ` · ${formatBuyerJobsPerMonth(row.jobsPerMonth)}`
                      : " · volume not filed"}
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
              {guestJobs.slice(0, 40).map((job) => {
                const place = formatDeskPlace(job.city, job.state);
                return (
                <li key={job.pathname} className="px-4 py-4 text-sm">
                  <p className="font-medium">
                    {job.company || job.email}
                    <span className="ml-2 font-normal text-muted">{job.email}</span>
                  </p>
                  <p className="mt-1 text-muted">
                    {job.kind}
                    {job.diameterMm != null ? ` · ${job.diameterMm} mm` : ""}
                    {job.drawingPath ? " · has STEP" : " · spec only"}
                    {place ? ` · ${place}` : ""}
                    {job.zip ? ` · ${job.zip}` : ""}
                  </p>
                </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </section>

      <section id="files" className="mt-12 scroll-mt-24">
        <h2 className="text-lg font-medium">STEP files</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Source jobs from /source. The buyer can release the STEP file.
          You decide when shops see the job. Same-state shops that can run
          it fill the six first. First two to unlock get contact.
        </p>
        {releasedNote ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-copper">
            {releasedNote}
          </p>
        ) : null}
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
              const sent = jobIsReleased(row);
              const preview = sent
                ? null
                : previewSourceReleaseFrom(row, hydrated, profiles);
              const nextShops = preview?.mailedTo ?? [];
              const mailed = sent
                ? deskMailedShopLines(row, shopPlaces)
                : nextShops.map((item) => {
                    const match = preview?.matches.find(
                      (shop) =>
                        shop.email.trim().toLowerCase() ===
                        item.email.trim().toLowerCase(),
                    );
                    const place = formatDeskPlace(match?.city, match?.state);
                    const name = item.company || item.email;
                    return place ? `${name} (${place})` : name;
                  });
              const buyerPlace = formatDeskPlace(row.city, row.state);
              const outcomes = leadOutcomeCounts(row);
              const record = buyerAnswerRecord(jobs, row.email);
              return (
                <li key={row.pathname} className="px-4 py-4 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {row.company || row.email}
                      <span className="ml-2 font-normal text-muted">{row.email}</span>
                    </p>
                    <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                      {sent ? "Sent to shops" : "Held"}
                      {row.drawingPath ? " · STEP" : " · spec only"}
                    </p>
                  </div>
                  <p className="mt-1 text-muted">
                    {[
                      row.name,
                      row.phone,
                      buyerPlace,
                      row.zip,
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
                    {sent
                      ? mailed.length > 0
                        ? ` · ${mailed.join(", ")}`
                        : " · released, no shops mailed"
                      : nextShops.length > 0
                        ? ` · will send teaser to ${mailed.join(", ")}`
                        : " · no matching shops yet"}
                    {row.buyerUserId ? " · buyer account" : " · guest"}
                    {(row.buyerExtraShops ?? 0) > 0
                      ? ` · ${row.buyerExtraShops} extra shop ${row.buyerExtraShops === 1 ? "slot" : "slots"} paid`
                      : ""}
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
                  {record.reached > 0 ? (
                    <p
                      className={
                        record.answered === 0
                          ? "mt-1 text-copper"
                          : "mt-1 text-muted"
                      }
                    >
                      This buyer answered {record.answered} of {record.reached}{" "}
                      shop{record.reached === 1 ? "" : "s"} that paid to reach
                      them.
                      {record.answered === 0
                        ? " Shops are losing money on this buyer."
                        : ""}
                    </p>
                  ) : null}
                  {sent && outcomes.sold > 0 ? (
                    <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                      {`${outcomes.sold} unlocked`}
                      {outcomes.quoted ? ` · ${outcomes.quoted} quoted` : ""}
                      {outcomes.ghosted
                        ? ` · ${outcomes.ghosted} buyer never answered`
                        : ""}
                      {outcomes.passed ? ` · ${outcomes.passed} passed` : ""}
                      {outcomes.pending
                        ? ` · ${outcomes.pending} not reported`
                        : ""}
                    </p>
                  ) : null}
                  {!sent && nextShops.length > 0 ? (
                    <form action={releaseSourceJob} className="mt-3">
                      <input type="hidden" name="pathname" value={row.pathname} />
                      {nextShops.length < SOURCE_LEAD_BUYERS_MAX ? (
                        <p className="mb-2 max-w-xl text-copper">
                          Only {nextShops.length} shop
                          {nextShops.length === 1 ? "" : "s"} can run this
                          print. Releasing it fills fewer than the two quotes
                          the buyer expects. Widen the pool or tell the buyer
                          before you send it.
                        </p>
                      ) : null}
                      <Button type="submit">
                        Release to {nextShops.length} shop
                        {nextShops.length === 1 ? "" : "s"}
                      </Button>
                    </form>
                  ) : null}
                  {!sent && nextShops.length === 0 ? (
                    <p className="mt-3 max-w-xl text-copper">
                      No filed cell can run this print. Releasing it sends the
                      buyer nothing. Recruit a shop for this cell class or tell
                      the buyer the desk cannot cover it.
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section id="repeat" className="mt-12 scroll-mt-24">
        <h2 className="text-lg font-medium">Lead repeat</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Does a shop that pays for a lead pay again? Nothing else here says as
          much about whether the model works — a second purchase means the shop
          decided the first one was worth the money. Shops whose first buy is
          under 45 days old are held out of the rate; they have not had a fair
          chance to return yet.
        </p>
        {repeat.shops === 0 ? (
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            No shop has bought a lead yet. This is the first number to watch
            once one does.
          </p>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <p className="border border-line px-4 py-4 text-sm">
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                  Bought again
                </span>
                <span className="mt-2 block text-xl font-medium">
                  {repeat.rate == null
                    ? "—"
                    : `${Math.round(repeat.rate * 100)}%`}
                </span>
                <span className="mt-1 block text-muted">
                  {repeat.rate == null
                    ? "No shop has had a fair chance to return yet"
                    : `${repeat.repeat} of ${repeat.repeat + repeat.once} shops with a fair chance`}
                </span>
              </p>
              <p className="border border-line px-4 py-4 text-sm">
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                  Shops paying
                </span>
                <span className="mt-2 block text-xl font-medium">
                  {repeat.shops}
                </span>
                <span className="mt-1 block text-muted">
                  {repeat.totalPurchases} lead
                  {repeat.totalPurchases === 1 ? "" : "s"} sold
                  {repeat.tooNew
                    ? ` · ${repeat.tooNew} too new to judge`
                    : ""}
                </span>
              </p>
              <p className="border border-line px-4 py-4 text-sm">
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                  Days to return
                </span>
                <span className="mt-2 block text-xl font-medium">
                  {repeat.medianDaysToRepeat ?? "—"}
                </span>
                <span className="mt-1 block text-muted">
                  {repeat.medianDaysToRepeat == null
                    ? "No second purchase yet"
                    : "Median between first and second lead"}
                </span>
              </p>
            </div>
            <ul className="mt-4 divide-y divide-line border border-line">
              {leadRecords.map((row) => {
                const lost = row.purchases === 1 && row.ghosted > 0;
                return (
                  <li key={row.key} className="px-4 py-4 text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium">
                        {row.company || row.email}
                        <span className="ml-2 font-normal text-muted">
                          {row.email}
                        </span>
                      </p>
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                        {row.purchases} lead{row.purchases === 1 ? "" : "s"}
                        {row.daysToRepeat != null
                          ? ` · returned in ${row.daysToRepeat}d`
                          : ""}
                      </p>
                    </div>
                    <p className="mt-1 text-muted">
                      {row.quoted ? `${row.quoted} quoted` : ""}
                      {row.ghosted
                        ? `${row.quoted ? " · " : ""}${row.ghosted} buyer never answered`
                        : ""}
                      {row.passed
                        ? `${row.quoted || row.ghosted ? " · " : ""}${row.passed} passed`
                        : ""}
                      {row.pending
                        ? `${row.quoted || row.ghosted || row.passed ? " · " : ""}${row.pending} not reported`
                        : ""}
                    </p>
                    {lost ? (
                      <p className="mt-1 text-copper">
                        Bought once, got no answer, has not come back. This is a
                        shop lost to a bad lead — worth a call.
                      </p>
                    ) : null}
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      {row.firstAt ? ny(row.firstAt) : "no date"}
                      {row.purchases > 1 && row.lastAt
                        ? ` → ${ny(row.lastAt)}`
                        : ""}
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
    </Page>
  );
}
