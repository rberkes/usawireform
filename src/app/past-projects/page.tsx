import { Suspense } from "react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import PastProjectsStudio from "@/components/PastProjectsStudio";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Past Projects",
  description:
    "Orbit shop files from jobs we formed. Autodesk streams the latest version of each share. Not a quote — send a print if you need one like it.",
  path: "/past-projects",
  keywords: [
    "wire forming projects",
    "CNC wire form CAD",
    "USA Wire Form past work",
    "Autodesk wire form",
  ],
});

type Props = { searchParams: Promise<{ project?: string }> };

export default async function PastProjectsPage({ searchParams }: Props) {
  const { project } = await searchParams;
  const breadcrumbItems = [{ label: "Our past projects" }];

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[{ name: "Our past projects", url: "/past-projects" }]}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        kicker="Shop files"
        title="Our past projects."
        lede={
          <>
            Jobs we ran, streamed from Autodesk. Orbit the shop file. Catalog
            forms stay on the{" "}
            <TextLink href="/models">3D models</TextLink> page. Neither one
            quotes the next job — send a print.
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
        <PastProjectsStudio initialProject={project} />
      </Suspense>
      <StepQuoteBlock className="mt-16" title="Have a STEP to run?" />
    </Page>
  );
}
