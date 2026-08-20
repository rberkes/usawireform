import Link from "next/link";
import { MachineLeadForm } from "@/components/MachineLeadForm";
import { Kicker, Page, PageHero, Section, TextLink } from "@/components/ui";
import { CNC_HUB, CNC_COMPARE } from "@/lib/cnc-oems";
import {
  COMPARE_JOBS,
  COMPARE_ROWS,
  FIT_LABEL,
  bestFor,
  type MachineFit,
} from "@/lib/machine-comparison";
import { cx } from "@/lib/cx";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CNC Wire Forming Machine Comparison",
  description:
    "Which machines win small springs, heavy 3D forming, cut-to-length, and 5–8 mm parts. Numalliance, WAFIOS, AIM, Itaya, Bihler, BLM, Simplex Rapid, Pave, Fortuna, Whitelegg — and fourslide. We run a Robomac 214TF. We do not sell iron.",
  path: CNC_COMPARE,
  keywords: [
    "CNC wire forming machine comparison",
    "spring coiler vs 3D CNC",
    "cut to length wire machine",
    "5-8mm wire forming machine",
    "Robomac 214TF",
  ],
});

const fitClass: Record<MachineFit, string> = {
  best: "bg-copper/15 text-foreground font-medium",
  good: "bg-inset text-foreground",
  fair: "text-muted",
  poor: "text-muted/70",
};

export default function MachineComparisonPage() {
  return (
    <Page>
      <p className="mb-8 text-sm text-muted">
        <Link href="/equipment" className="hover:text-copper">
          Floor list
        </Link>
        {" / "}
        <Link href={CNC_HUB} className="hover:text-copper">
          CNC manufacturers
        </Link>
        {" / "}
        Comparison
      </p>
      <PageHero
        kicker="Machine comparison"
        title="Each cell has a job. Pick the one that matches the print."
        lede="Small springs, heavy 3D, cut-to-length, and 5–8 mm parts do not want the same iron. This chart is the ecosystem — typical published use, not a dealer quote. USA Wire Form runs a Numalliance Robomac 214TF in 4–14 mm. We do not sell these machines."
      />

      <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {COMPARE_JOBS.map((job) => (
          <div key={job.id} className="bg-background px-5 py-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-copper">
              Best for
            </p>
            <p className="mt-2 text-lg tracking-tight">{job.label}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {bestFor(job.id).map((row) => (
                <li key={row.id}>
                  <Link href={row.href} className="hover:text-copper">
                    {row.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">
        Best = the class of machine shops buy for that work. Good = it will run it. Fair = possible, usually the wrong first buy. Wrong tool = you can force a part on it and you will pay for it. Confirm diameter, tensile, and 2D vs 3D with the OEM or dealer. Model pages:{" "}
        <TextLink href={CNC_HUB}>CNC catalog</TextLink>. Fourslide vs CNC:{" "}
        <TextLink href="/processes/fourslide">fourslide</TextLink>.
      </p>

      <div className="mt-10 overflow-x-auto border border-line">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line bg-inset text-left">
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                Machine class
              </th>
              {COMPARE_JOBS.map((job) => (
                <th
                  key={job.id}
                  className="px-3 py-3 font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  {job.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.id} className="border-b border-line">
                <td className="px-4 py-3 align-top">
                  <Link href={row.href} className="font-medium hover:text-copper">
                    {row.name}
                  </Link>
                  <p className="mt-1 text-xs leading-5 text-muted">{row.note}</p>
                </td>
                {COMPARE_JOBS.map((job) => {
                  const fit = row.fits[job.id];
                  return (
                    <td key={job.id} className="px-3 py-3 align-top">
                      <span
                        className={cx(
                          "inline-block rounded-sm px-2 py-0.5 text-xs",
                          fitClass[fit],
                        )}
                      >
                        {FIT_LABEL[fit]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {COMPARE_JOBS.map((job) => (
        <Section key={job.id} title={job.label}>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{job.lede}</p>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {bestFor(job.id).map((row) => (
              <li key={row.id} className="py-4">
                <Link href={row.href} className="font-medium hover:text-copper">
                  {row.name}
                </Link>
                <p className="mt-1 text-sm text-muted">{row.note}</p>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title="What we run">
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Production is the{" "}
          <Link href="/equipment" className="text-copper hover:underline">
            floor list
          </Link>
          : Robomac 214TF for 4–14 mm 3D, then weld and inspect. We do not coil
          small springs. We do not cut fourslide cams. Cut-to-length rides on
          the CNC when the print is a form, not a mill length.
        </p>
        <Kicker className="mt-8">Dealer / OEM</Kicker>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Buying iron? Open the catalog row and send a lead. We route it. We
          still quote parts on the 214TF.
        </p>
      </Section>

      <div className="mt-16">
        <MachineLeadForm
          oem="unspecified"
          model="machine-comparison"
          path={CNC_COMPARE}
        />
      </div>
    </Page>
  );
}
