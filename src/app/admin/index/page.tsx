import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { Page, PageHero, StatRow, TextLink } from "@/components/ui";
import { runIndexAudit } from "@/lib/index-audit";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { countSourceFilings, countSourceProfiles } from "@/lib/source";
import { countBuyerAccounts } from "@/lib/source-buyer";
import { countSourceSubscribers } from "@/lib/source-leads";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Index audit",
  robots: { index: false, follow: false },
};

const INDEX_PATH = "/admin/index";

export default async function AdminIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return (
      <AdminLogin
        next={INDEX_PATH}
        error={error}
        title="Index audit"
      />
    );
  }

  const audit = runIndexAudit();
  const [quoteCount, directoryCount, sourceCount, subscriberCount, accountCount] =
    await Promise.all([
      countQuoteSubmissions(),
      countDirectoryLeads(),
      countSourceFilings(),
      countSourceSubscribers(),
      Promise.all([countSourceProfiles(), countBuyerAccounts()]).then(
        ([a, b]) => a + b,
      ),
    ]);

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Index audit"
        lede="What Google should crawl, what we noindex, and whether the directory graph actually connects shops to capabilities, machines, and places. Index quality over index quantity."
      />
      <AdminInboxNav
        current="index"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={sourceCount}
        subscriberCount={subscriberCount}
        accountCount={accountCount}
      />

      <StatRow
        className="mt-10"
        items={[
          { value: String(audit.counts.indexable), label: "Indexable URLs" },
          { value: String(audit.counts.noindex), label: "noindex" },
          {
            value: `${audit.counts.substantialShops}/${audit.counts.shops}`,
            label: "Shops with substance",
          },
          {
            value: `${audit.counts.ohioCitiesIndexed}/${audit.counts.ohioCities}`,
            label: "Ohio cities indexed",
          },
        ]}
      />

      <section className="mt-12">
        <h2 className="text-xl font-medium tracking-tight">Graph coverage</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          A listing only strengthens the topical graph when it maps to a
          capability, a material, or a named machine. Thin city pages stay
          out of the index until they have local inventory.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Capability
            </dt>
            <dd className="mt-1 text-2xl">{audit.coverage.shopsWithCapability}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Material
            </dt>
            <dd className="mt-1 text-2xl">{audit.coverage.shopsWithMaterial}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              OEM
            </dt>
            <dd className="mt-1 text-2xl">{audit.coverage.shopsWithOem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Model
            </dt>
            <dd className="mt-1 text-2xl">{audit.coverage.shopsWithModel}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-medium tracking-tight">Capabilities</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
            {audit.coverage.capabilityPages.map((row) => (
              <li key={row.slug} className="flex justify-between py-2">
                <TextLink href={`/wire-forming/${row.slug}`}>{row.slug}</TextLink>
                <span className="font-mono text-muted">{row.shops}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-medium tracking-tight">Materials</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
            {audit.coverage.materialPages.map((row) => (
              <li key={row.slug} className="flex justify-between py-2">
                <TextLink href={`/materials/${row.slug}`}>{row.slug}</TextLink>
                <span className="font-mono text-muted">{row.shops}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium tracking-tight">Findings</h2>
        <ul className="mt-6 space-y-6">
          {audit.findings.map((finding) => (
            <li key={finding.title} className="border border-line p-5">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-copper">
                {finding.severity} · {finding.area}
              </p>
              <h3 className="mt-2 font-medium">{finding.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{finding.detail}</p>
              {finding.paths && finding.paths.length > 0 ? (
                <ul className="mt-3 space-y-1 font-mono text-xs text-muted">
                  {finding.paths.map((path) => (
                    <li key={path}>{path}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
