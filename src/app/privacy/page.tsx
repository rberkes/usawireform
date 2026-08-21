import { Page, PageHero, TextLink } from "@/components/ui";
import { COMPANY, QUOTE_EMAIL } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${COMPANY} handles quote requests and email.`,
  path: "/privacy",
  keywords: ["privacy policy"],
});

export default function PrivacyPage() {
  return (
    <Page>
      <PageHero
        kicker="Legal"
        title="Privacy"
        lede="Quote files and contact details go to headquarters. We do not sell them."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          {COMPANY} collects what you send on the{" "}
          <TextLink href="/contact">quote form</TextLink>: name, company,
          email, optional LinkedIn profile URL, diameter, material, notes, and
          the STEP file you attach. That packet is for quoting and production. It is not a
          marketing list we sell.
        </p>
        <p>
          Email to{" "}
          <TextLink href={`mailto:${QUOTE_EMAIL}`}>
            {QUOTE_EMAIL}
          </TextLink>{" "}
          is the same: used to answer the request.
        </p>
        <p>
          This site is pages and a form. If a host or analytics tool
          sets a cookie, it is theirs. We do not run an ad network on
          these pages.
        </p>
        <p>
          Questions:{" "}
          <TextLink href={`mailto:${QUOTE_EMAIL}`}>
            {QUOTE_EMAIL}
          </TextLink>
          .
        </p>
      </div>
    </Page>
  );
}
