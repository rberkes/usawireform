import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { RobomacStepAnalyze } from "@/components/RobomacStepAnalyze";
import { Page, PageHero, StatRow } from "@/components/ui";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { evaluateWireForm } from "@/lib/robomac/dfm";
import { TWIN_FIXTURES } from "@/lib/robomac/fixtures";
import {
  CAPABILITIES,
  COLLISION_SCENARIOS,
  MATERIALS,
  ROBOMAC_214TF,
  RULES,
  TOOLING_ROWS,
} from "@/lib/robomac/tables";
import { countSourceFilings, countSourceProfiles } from "@/lib/source";
import { countBuyerAccounts } from "@/lib/source-buyer";
import { countSourceSubscribers } from "@/lib/source-leads";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Robomac 214TF twin",
  robots: { index: false, follow: false },
};

function statusClass(status: string) {
  if (status === "FAIL") return "font-medium";
  if (status === "REVIEW") return "text-copper";
  if (status === "PASS") return "text-steel";
  return "text-muted";
}

export default async function AdminRobomacPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return (
      <AdminLogin next="/admin/robomac" error={error} title="Robomac 214TF twin" />
    );
  }

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

  const fixtures = TWIN_FIXTURES.map((fixture) => ({
    ...fixture,
    result: evaluateWireForm(fixture.geometry),
  }));
  const unknowns = [...CAPABILITIES, ...RULES].filter(
    (row) => row.provenance.kind === "unknown",
  );
  const implemented = RULES.filter((row) => row.implemented).length;

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Robomac 214TF twin"
        lede={`${ROBOMAC_214TF.oem} ${ROBOMAC_214TF.plateName} on this floor. Table-shaped rules, not a site redesign. Geometry is truth. AI does not decide pass/fail.`}
      />
      <AdminInboxNav
        current="robomac"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={sourceCount}
        subscriberCount={subscriberCount}
        accountCount={accountCount}
      />

      <StatRow
        className="mt-10"
        items={[
          { value: `${implemented}/${RULES.length}`, label: "Rules live" },
          { value: String(TOOLING_ROWS.filter((row) => row.stock).length), label: "Stock tools" },
          { value: String(unknowns.length), label: "Still unmeasured" },
          {
            value: String(fixtures.filter((row) => row.result.status === "FAIL").length),
            label: "Fixture fails",
          },
        ]}
      />

      <RobomacStepAnalyze
        materials={MATERIALS.map((row) => ({ id: row.id, label: row.label }))}
      />

      <section className="mt-12 max-w-3xl text-sm leading-6">
        <h2 className="font-medium">Cell</h2>
        <p className="mt-3 text-muted">
          {ROBOMAC_214TF.notes} Plate: {ROBOMAC_214TF.tensileRatingNmm2} N/mm².
          Feed from {ROBOMAC_214TF.feedFrom}. Orbit head:{" "}
          {ROBOMAC_214TF.orbitHead ? "yes" : "no"}.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">Stock tooling</h2>
        <ul className="mt-4 divide-y divide-line border border-line text-sm">
          {TOOLING_ROWS.map((row) => (
            <li key={row.id} className="px-4 py-3">
              <p className="font-medium">
                {row.label}
                {row.stock ? " · stock" : " · new pin"}
                {row.use === "staple_crown" ? " · staple only" : ""}
              </p>
              <p className="mt-1 text-muted">
                {row.wireDiameterMm > 0
                  ? `${row.wireDiameterMm} mm / ${row.wireDiameterIn} in`
                  : "In-band, not stock"}
                {row.insideRadiusIn
                  ? ` · IR ${row.insideRadiusIn} in`
                  : ""}
                {row.pinDiameterIn ? ` · pin ${row.pinDiameterIn} in` : ""}
              </p>
              <p className="mt-1 text-xs text-muted">{row.notes}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">Materials</h2>
        <ul className="mt-4 divide-y divide-line border border-line text-sm">
          {MATERIALS.map((row) => (
            <li key={row.id} className="px-4 py-3">
              <p className="font-medium">
                {row.label} · ≥ {row.minInsideRadiusXd}×D · springback{" "}
                {row.springbackDegAt1xD.min}–{row.springbackDegAt1xD.max}°
              </p>
              <p className="mt-1 text-muted">{row.notes}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">Rules</h2>
        <ul className="mt-4 divide-y divide-line border border-line text-sm">
          {RULES.map((row) => (
            <li key={row.id} className="px-4 py-3">
              <p className="font-medium">
                {row.implemented ? "Live" : "Queued"} · Phase {row.phase} ·{" "}
                {row.check}
              </p>
              <p className="mt-1">{row.title}</p>
              <p className="mt-1 font-mono text-xs text-muted">{row.expression}</p>
              <p className="mt-1 text-xs text-muted">
                {row.provenance.kind} · {row.provenance.source}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">Unmeasured — do not invent</h2>
        <ul className="mt-4 divide-y divide-line border border-line text-sm">
          {unknowns.map((row) => (
            <li key={row.id} className="px-4 py-3">
              <p className="font-medium">
                {"label" in row ? row.label : row.title}
              </p>
              <p className="mt-1 text-muted">{row.provenance.notes ?? row.provenance.source}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-4 divide-y divide-line border border-line text-sm">
          {COLLISION_SCENARIOS.map((row) => (
            <li key={row.id} className="px-4 py-3">
              <p className="font-medium">
                {row.implemented ? "Proxy live" : "Phase 2"} · {row.title}
              </p>
              <p className="mt-1 text-muted">{row.notes}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">Fixture DFM</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          Same engine the CAD path will call. These are not customer quotes.
        </p>
        <ul className="mt-4 divide-y divide-line border border-line text-sm">
          {fixtures.map((fixture) => (
            <li key={fixture.id} className="px-4 py-3">
              <p className="font-medium">
                <span className={statusClass(fixture.result.status)}>
                  {fixture.result.status}
                </span>
                {` · ${fixture.title}`}
              </p>
              <p className="mt-1 text-muted">
                {fixture.geometry.diameterMm} mm · {fixture.geometry.materialId} ·{" "}
                {fixture.result.bendCount} bends · developed{" "}
                {fixture.result.developedLengthMm} mm
              </p>
              {fixture.result.issues.length > 0 ? (
                <ul className="mt-2 space-y-1 text-muted">
                  {fixture.result.issues.map((issue) => (
                    <li key={issue.id}>
                      {issue.status} {issue.check}
                      {issue.bend ? ` B${issue.bend}` : ""}
                      {issue.recommendedChange ? ` — ${issue.recommendedChange}` : ""}
                    </li>
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
