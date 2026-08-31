import { StepQuoteBlock } from "@/components/StepUpload";
import {
  ClientHero,
  ClientHowItWorks,
  ClientPage,
  ClientSection,
} from "@/components/client/ClientLanding";
import { Container } from "@/components/ui";
import { CLIENT_STEPS } from "@/lib/client-landing";
import { COMPANY } from "@/lib/company";
import { PRICE_LINE, QUOTE_REVIEW } from "@/lib/price";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Start a Production Quote",
  description: `Send a STEP, SolidWorks file, or 3-view PDF for a production wire forming quote. No STEP? ${COMPANY} models one free. ${PRICE_LINE}`,
  path: "/production-quote",
  keywords: [
    "production wire forming quote",
    "send STEP wire form",
    "CNC wire forming production quote",
  ],
});

export default function ProductionQuotePage() {
  return (
    <ClientPage>
      <ClientHero
        kicker="Production quote"
        title="Talk with the production desk"
        lede={`A STEP, SolidWorks file, or 3-view PDF and an email are enough to start. No STEP? We model one for free from the print. Instant estimate stays on Get instant quote if you only need a ballpark. ${QUOTE_REVIEW}`}
      />

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <h2 className="text-3xl tracking-tight sm:text-4xl">
            Send the print
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Production quotes are for a real lot — 100 pieces and up. Include
            quantity, material, and finish in the notes if the drawing does not.
            A PDF 3-view is enough if you do not have a STEP.
          </p>
          <div className="mt-10">
            <StepQuoteBlock title="Start a production quote" />
          </div>
        </Container>
      </section>

      <ClientSection
        kicker="After you send it"
        title="What happens next"
        inset
      >
        <ClientHowItWorks steps={[...CLIENT_STEPS]} />
      </ClientSection>
    </ClientPage>
  );
}
