import { Suspense } from "react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ModelsStudio from "@/components/ModelsStudio";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { STOCK } from "@/lib/catalog";

export const metadata = pageMeta({
  title: "3D STEP Viewer",
  description: `Orbit shop models of S-hooks, D-rings, baskets, trays, and guards in ${STOCK} wire. Drop a STEP or IGES to inspect a print before you send it.`,
  path: "/models",
  keywords: [
    "STEP viewer",
    "wire form 3D model",
    "STP viewer",
    "IGES viewer",
    "CNC wire form CAD",
  ],
});

type Props = { searchParams: Promise<{ part?: string }> };

export default async function ModelsPage({ searchParams }: Props) {
  const { part } = await searchParams;
  const breadcrumbItems = [{ label: "3D models" }];

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "3D models", url: "/models" }]} />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        kicker="3D models"
        title="What we form, in the round."
        lede={
          <>
            Shop models of catalog parts in {STOCK}. Orbit, change diameter,
            drop a STEP from the print. Jobs we already ran live on{" "}
            <TextLink href="/past-projects">our past projects</TextLink>. Then
            send it — the viewer does not replace a quote. Design rules live
            in the{" "}
            <TextLink href="/guide/design-for-wire-forming">
              design guide
            </TextLink>
            .
          </>
        }
      />
      <Suspense
        fallback={
          <div
            className="mt-10 h-[min(70vh,36rem)] min-h-[22rem] bg-inset"
            aria-hidden
          />
        }
      >
        <ModelsStudio initialPart={part} />
      </Suspense>
      <StepQuoteBlock className="mt-16" title="Have a STEP to run?" />
    </Page>
  );
}
