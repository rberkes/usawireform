import Link from "next/link";
import { notFound } from "next/navigation";
import { MachineIso } from "@/components/MachineIso";
import { MachineLeadForm } from "@/components/MachineLeadForm";
import { QuotePath } from "@/components/QuotePath";
import { ShopRoster } from "@/components/ShopRoster";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { LinkList, Page, PageHero, Section } from "@/components/ui";
import {
  CNC_COMPARE,
  CNC_HUB,
  CNC_OEMS,
  getOem,
  modelPath,
  oemPath,
} from "@/lib/cnc-oems";
import { shopsForOem } from "@/lib/graph";
import { isReservedEquipmentSlug } from "@/lib/taxonomy";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ oem: string }> };

export function generateStaticParams() {
  return CNC_OEMS.map((oem) => ({ oem: oem.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { oem: slug } = await params;
  if (isReservedEquipmentSlug(slug)) return {};
  const oem = getOem(slug);
  if (!oem) return {};
  const shops = shopsForOem(oem.slug);
  return pageMeta({
    title: `${oem.name} CNC Wire Forming Machines`,
    description: `${oem.name} (${oem.country}): ${oem.summary} ${shops.length} directory shops name this OEM.`,
    path: oemPath(oem),
    keywords: [oem.name, "CNC wire forming machine", oem.country],
  });
}

export default async function CncOemPage({ params }: Props) {
  const { oem: slug } = await params;
  if (isReservedEquipmentSlug(slug)) notFound();
  const oem = getOem(slug);
  if (!oem) notFound();
  const shops = shopsForOem(oem.slug);

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "CNC manufacturers", url: CNC_HUB },
          { name: oem.name, url: oemPath(oem) },
        ]}
      />
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
        <Link href={CNC_COMPARE} className="text-sm text-copper hover:underline">
          Machine comparison
        </Link>
      </PageHero>
      <Section title="Catalog models">
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
      <Section title={`Directory shops that name ${oem.name}`}>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Named on a public page or a Source filing — not a floor walk.{" "}
          {shops.length === 0
            ? "None in the directory yet. That is the gap this page exists to close."
            : `${shops.length} listing${shops.length === 1 ? "" : "s"}.`}
        </p>
        <ShopRoster shops={shops} />
      </Section>
      <div className="mt-10 aspect-[16/9] border border-line bg-inset">
        <MachineIso shape={oem.models[0]?.shape ?? "robomac"} title={oem.name} />
      </div>
      <QuotePath title={`Need a job on ${oem.name} iron?`} />
      <div className="mt-16">
        <MachineLeadForm oem={oem.slug} model="oem-hub" path={oemPath(oem)} />
      </div>
    </Page>
  );
}
