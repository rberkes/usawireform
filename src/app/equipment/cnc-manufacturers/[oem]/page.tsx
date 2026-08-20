import Link from "next/link";
import { notFound } from "next/navigation";
import { MachineIso } from "@/components/MachineIso";
import { MachineLeadForm } from "@/components/MachineLeadForm";
import { LinkList, Page, PageHero, Section } from "@/components/ui";
import {
  CNC_HUB,
  CNC_OEMS,
  getOem,
  modelPath,
  oemPath,
} from "@/lib/cnc-oems";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ oem: string }> };

export function generateStaticParams() {
  return CNC_OEMS.map((oem) => ({ oem: oem.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { oem: slug } = await params;
  const oem = getOem(slug);
  if (!oem) return {};
  return pageMeta({
    title: `${oem.name} CNC Wire Forming Machines`,
    description: `${oem.name} (${oem.country}): ${oem.summary}`,
    path: oemPath(oem),
    keywords: [oem.name, "CNC wire forming machine", oem.country],
  });
}

export default async function CncOemPage({ params }: Props) {
  const { oem: slug } = await params;
  const oem = getOem(slug);
  if (!oem) notFound();

  return (
    <Page>
      <p className="mb-8 text-sm text-muted">
        <Link href={CNC_HUB} className="hover:text-copper">
          CNC manufacturers
        </Link>
        {" / "}
        {oem.name}
      </p>
      <PageHero
        kicker={`${oem.country} · ${oem.hq}`}
        title={oem.name}
        lede={oem.summary}
      >
        <a
          href={oem.site}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-copper hover:underline"
        >
          {oem.site.replace(/^https:\/\//, "")}
        </a>
      </PageHero>
      <Section title="Six catalog models">
        <LinkList
          className="mt-5"
          items={oem.models.map((model) => ({
            href: modelPath(oem, model),
            title: model.name,
            note: model.kind.toUpperCase(),
            body: model.tagline,
          }))}
        />
      </Section>
      <div className="mt-10 aspect-[16/9] border border-line bg-inset">
        <MachineIso shape={oem.models[0]?.shape ?? "robomac"} title={oem.name} />
      </div>
      <div className="mt-16">
        <MachineLeadForm oem={oem.slug} model="oem-hub" path={oemPath(oem)} />
      </div>
    </Page>
  );
}
