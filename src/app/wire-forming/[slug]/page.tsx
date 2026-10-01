import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/DocPage";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { QuotePath } from "@/components/QuotePath";
import { ShopRoster } from "@/components/ShopRoster";
import { ServiceSchema } from "@/components/SeoSchemas";
import { TextLink } from "@/components/ui";
import { inventorySummary, shopsForCapability } from "@/lib/graph";
import { pageMeta } from "@/lib/seo";
import { FORMING_CAPABILITIES, getCapability } from "@/lib/taxonomy";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FORMING_CAPABILITIES.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};
  const shops = shopsForCapability(capability.slug);
  return pageMeta({
    title: capability.title,
    description: `${shops.length} shops in the directory for ${capability.title.toLowerCase()}. ${capability.description}`,
    path: capability.path,
    keywords: [capability.title, "wire forming shops", "CNC wire forming"],
  });
}

export default async function CapabilityTaxonomyPage({ params }: Props) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();
  const shops = shopsForCapability(capability.slug);
  const inventory = inventorySummary(shops);

  return (
    <>
      <ServiceSchema
        name={capability.title}
        description={capability.description}
        url={capability.path}
        serviceType={capability.title}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Wire forming", url: "/wire-forming" },
          { name: capability.title, url: capability.path },
        ]}
      />
      {capability.faqs ? <FAQJsonLd questions={capability.faqs} /> : null}
      <DocPage
        kicker="Capability"
        title={capability.h1}
        lede={`${shops.length} directory shops match this capability from a public page or a Source filing. Confirm diameter and cell class before you send a print.`}
        toc={[
          { id: "shops", label: "Shops" },
          { id: "inventory", label: "What they run" },
          { id: "how", label: "How it works" },
          { id: "rfq", label: "RFQ" },
        ]}
        breadcrumbs={[
          { label: "Wire forming", href: "/wire-forming" },
          { label: capability.title },
        ]}
      >
        <p>{capability.lede}</p>

        <h2 id="shops">Shops that offer {capability.title.toLowerCase()}</h2>
        <ShopRoster
          shops={shops}
          empty="No directory shop has named this capability yet. That is a filing gap, not a reason to invent pages."
        />

        <h2 id="inventory">What this set actually runs</h2>
        <p>
          Rolled up from the listings above — not a generated claim about every
          shop. A buyer uses this to see whether the capability exists in the
          directory, then opens the shop page.
        </p>
        {inventory.materials.length > 0 ? (
          <p>
            Materials named:{" "}
            {inventory.materials.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? ", " : ""}
                <TextLink href={item.path}>{item.title.replace(/ Wire Forming$/, "")}</TextLink>
              </span>
            ))}
            .
          </p>
        ) : null}
        {inventory.oems.length > 0 ? (
          <p>
            Named iron:{" "}
            {inventory.oems.map((oem, index) => (
              <span key={oem.slug}>
                {index > 0 ? ", " : ""}
                <TextLink href={`/equipment/${oem.slug}`}>{oem.name}</TextLink>
              </span>
            ))}
            .
          </p>
        ) : null}
        {inventory.wireRanges.length > 0 ? (
          <p>Published wire ranges: {inventory.wireRanges.join(" · ")}.</p>
        ) : null}

        <h2 id="how">Engineering, not a brochure</h2>
        <p>
          {capability.engineeringHref ? (
            <>
              Process notes live on{" "}
              <TextLink href={capability.engineeringHref}>
                the engineering page
              </TextLink>
              . This URL is the shop list.
            </>
          ) : (
            <>
              Design rules — bend radius, springback, tolerances — live in the{" "}
              <TextLink href="/guide/design-for-wire-forming">
                design guide
              </TextLink>
              .
            </>
          )}{" "}
          Other capabilities:{" "}
          {FORMING_CAPABILITIES.filter((item) => item.slug !== capability.slug).map(
            (item, index) => (
              <span key={item.slug}>
                {index > 0 ? " · " : ""}
                <Link href={item.path} className="text-copper hover:underline">
                  {item.title}
                </Link>
              </span>
            ),
          )}
          .
        </p>

        <div id="rfq">
          <QuotePath
            title={`RFQ a ${capability.title.toLowerCase()} job`}
            context="Upload the print. We check diameter, 2D vs 3D, and material against filed cells, then match shops that can run it."
          />
        </div>
      </DocPage>
    </>
  );
}
