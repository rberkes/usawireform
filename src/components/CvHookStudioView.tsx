import { Suspense } from "react";
import { CvHookStudio } from "@/components/CvHookStudio";
import { PowderHookBranchNav } from "@/components/PowderHookBranchNav";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";

const PATH = "/powder-coating-hooks/cv-hooks/3d";

const faqs = [
  {
    question: "Is this an Autodesk Fusion share?",
    answer:
      "No. Autodesk Viewer here loads the glTF of the CV path this cell actually CNC-forms — C eye, shank, V locate. Fusion Team shares of jobs we ran stay on /past-projects.",
  },
  {
    question: "Can you form every size in the list?",
    answer:
      "Those lengths and 0.180 / 0.250 in wires sit in 4–14 mm. 1½ in openings match the published HCV bowl. Custom overall or 90° is a print. 100-piece minimum.",
  },
];

export function CvHookStudioView() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          { name: "CV-hooks", url: "/powder-coating-hooks/cv-hooks" },
          { name: "3D", url: PATH },
        ]}
      />
      <DocPage
        kicker="CV-hooks"
        title="CV-hook in Autodesk Viewer"
        lede="Orbit the form we bend: C clearance on top, V locate on the bottom. Stills from the same model. Round wire in 4–14 mm. Northeast Ohio."
        breadcrumbs={[
          { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
          { label: "CV-hooks", href: "/powder-coating-hooks/cv-hooks" },
          { label: "3D" },
        ]}
        toc={[
          { id: "studio", label: "Studio" },
          { id: "faq", label: "FAQ" },
        ]}
      >
        <h2 id="studio">Studio</h2>
        <p>
          Autodesk Viewer, light booth, view cube. Pick a length we actually
          run. Click a still to jump the camera. This is not a boxed catalog
          SKU — same family, our path, our part.
        </p>
        <div className="not-prose my-8">
          <Suspense
            fallback={
              <div
                className="h-[min(72vh,40rem)] min-h-[24rem] bg-inset"
                aria-hidden
              />
            }
          >
            <CvHookStudio />
          </Suspense>
        </div>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <PowderHookBranchNav slug={["cv-hooks", "3d"]} />
        <QuoteBand title="Have a CV-hook print?" />
      </DocPage>
    </>
  );
}
