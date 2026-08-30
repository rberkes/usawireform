import Link from "next/link";
import { notFound } from "next/navigation";
import { MachineIso } from "@/components/MachineIso";
import { MachineLeadForm } from "@/components/MachineLeadForm";
import { Page, PageHero, Section, SpecList } from "@/components/ui";
import {
  CNC_COMPARE,
  CNC_HUB,
  CNC_OEMS,
  getModel,
  modelPath,
  oemPath,
} from "@/lib/cnc-oems";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ oem: string; model: string }> };

export function generateStaticParams() {
  return CNC_OEMS.flatMap((oem) =>
    oem.models.map((model) => ({ oem: oem.slug, model: model.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { oem: oemSlug, model: modelSlug } = await params;
  const hit = getModel(oemSlug, modelSlug);
  if (!hit) return {};
  return pageMeta({
    title: `${hit.model.name} — ${hit.oem.name} CNC Wire Forming Machine`,
    description: `${hit.model.name} from ${hit.oem.name}. ${hit.model.tagline} ${hit.model.wire}. Dealer inquiry on this page.`,
    path: modelPath(hit.oem, hit.model),
    keywords: [
      hit.model.name,
      hit.oem.name,
      "CNC wire forming machine",
      "3D CNC wire bender",
    ],
  });
}

export default async function CncModelPage({ params }: Props) {
  const { oem: oemSlug, model: modelSlug } = await params;
  const hit = getModel(oemSlug, modelSlug);
  if (!hit) notFound();
  const { oem, model } = hit;
  const href = modelPath(oem, model);
  const others = oem.models.filter((item) => item.slug !== model.slug);

  return (
    <Page>
      <p className="mb-8 text-sm text-muted">
        <Link href={CNC_HUB} className="hover:text-copper">
          CNC manufacturers
        </Link>
        {" / "}
        <Link href={oemPath(oem)} className="hover:text-copper">
          {oem.name}
        </Link>
        {" / "}
        {model.name}
      </p>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <PageHero
          kicker={`${oem.name} · ${model.kind.toUpperCase()} CNC`}
          title={model.name}
          lede={model.tagline}
        />
        <div className="aspect-[4/3] border border-line bg-inset">
          <MachineIso shape={model.shape} title={`${oem.name} ${model.name}`} />
        </div>
      </div>
      <div className="mt-10 max-w-2xl space-y-4 text-sm leading-7 text-muted">
        {model.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <Section title="Catalog notes">
        <SpecList
          rows={[
            { label: "Wire / class", value: model.wire },
            { label: "Motion", value: model.axes },
            { label: "Kind", value: model.kind.toUpperCase() },
            { label: "OEM", value: `${oem.name} · ${oem.country}` },
          ]}
        />
        <ul className="mt-6 flex flex-wrap gap-2">
          {model.jobs.map((job) => (
            <li key={job} className="border border-line px-3 py-1.5 text-sm">
              {job}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-6 text-muted">
          Published ranges vary by year and option pack. Confirm with{" "}
          <a
            href={oem.site}
            className="text-copper hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {oem.name}
          </a>{" "}
          or a dealer. USA Wire Form production is 4–14 mm on a Robomac 214TF.
          Job fit vs other cells:{" "}
          <Link href={CNC_COMPARE} className="text-copper hover:underline">
            machine comparison
          </Link>
          .
        </p>
      </Section>
      {others.length > 0 ? (
        <Section title={`More ${oem.name}`}>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={modelPath(oem, item)}
                  className="text-sm hover:text-copper"
                >
                  {item.name}
                </Link>
                <span className="text-sm text-muted"> — {item.tagline}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <div className="mt-16">
        <MachineLeadForm oem={oem.slug} model={model.slug} path={href} />
      </div>
    </Page>
  );
}
