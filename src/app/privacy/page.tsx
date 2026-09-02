import {
  LegalArticle,
  LegalContact,
  LegalSection,
  LegalToc,
  LegalUpdated,
} from "@/components/LegalDoc";
import { Page, PageHero, TextLink } from "@/components/ui";
import { COMPANY, QUOTE_EMAIL, SITE_HOST } from "@/lib/company";
import { LEGAL_PATHS } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${COMPANY} collects, uses, and protects quote files, accounts, and contact details on ${SITE_HOST}.`,
  path: "/privacy",
  keywords: ["privacy policy", "USA Wire Form privacy", "quote file privacy"],
});

const toc = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "What we collect" },
  { id: "use", label: "How we use it" },
  { id: "drawings", label: "Drawings and CAD files" },
  { id: "accounts", label: "Accounts" },
  { id: "payments", label: "Payments" },
  { id: "ask", label: "Ask the resource" },
  { id: "cookies", label: "Cookies and analytics" },
  { id: "processors", label: "Processors" },
  { id: "sharing", label: "Sharing and sales" },
  { id: "retention", label: "How long we keep it" },
  { id: "rights", label: "Your choices" },
  { id: "children", label: "Children" },
  { id: "security", label: "Security" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <Page>
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        lede="Quote files, emails, and account details go to headquarters for quoting, production, and running this site. We do not sell them."
      />
      <div className="mt-6">
        <LegalUpdated />
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
        Use of {SITE_HOST} is also governed by the{" "}
        <TextLink href={LEGAL_PATHS.terms}>User Agreement</TextLink>.
      </p>

      <LegalArticle>
        <LegalToc items={toc} />

        <LegalSection id="who" title="Who we are">
          <p>
            {COMPANY} (“we,” “us”) operates {SITE_HOST} from Northeast Ohio.
            This policy covers the public site, quote and directory forms, the
            Ask the resource box, Source accounts, and related email.
          </p>
        </LegalSection>

        <LegalSection id="collect" title="What we collect">
          <p>We collect what you send us and what the host needs to run the page.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Quote requests:</strong> email
              (required), optional name and company, optional LinkedIn URL,
              diameter, material, quantity, timeline, quality standard, notes,
              and the drawing you attach (STEP, STP, IGES, PDF, DXF, DWG,
              SLDPRT, or SLDASM).
            </li>
            <li>
              <strong className="text-foreground">Directory leads:</strong> name,
              title, email, phone, company, LinkedIn, message, and the shop
              page you came from.
            </li>
            <li>
              <strong className="text-foreground">Ask the resource:</strong> the
              question you type, so we can return an answer from this site’s
              content.
            </li>
            <li>
              <strong className="text-foreground">Source accounts:</strong> name
              and email through our sign-in provider if you create an account
              to list a machine cell or manage a shop card.
            </li>
            <li>
              <strong className="text-foreground">Technical data:</strong> IP
              address, approximate city and region, reverse DNS (to see if the
              connection looks like a company network, home ISP, or cloud),
              referring site, pages opened, links clicked, browser, and
              timestamps. A first-party visit cookie keeps one session together.
              Google does not send the search words someone typed.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="use" title="How we use it">
          <p>We use this information to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Quote, program, and form the print you sent.</li>
            <li>Answer email and connect a directory inquiry to the right desk.</li>
            <li>Operate Source accounts, shop listings, and $49 lead purchases.</li>
            <li>Answer Ask the resource questions from this site’s library.</li>
            <li>Keep the site up, debug failures, review traffic for abuse, and measure which pages are used.</li>
            <li>Meet legal, tax, and quality-record duties on a job.</li>
          </ul>
        </LegalSection>

        <LegalSection id="drawings" title="Drawings and CAD files">
          <p>
            A STEP or print is a customer file. We use it to decide 2D vs 3D,
            call a bend sequence, and quote or run the job. We do not post your
            drawing on the public site, put it in the factory directory, or sell
            it as a lead list.
          </p>
          <p>
            You keep ownership of your design. Sending a file is a license for{" "}
            {COMPANY} to store, open, preview, and share it internally (and with
            a processor that stores the upload) for quoting and production. It
            is not a license for us to manufacture the part for someone else.
          </p>
        </LegalSection>

        <LegalSection id="accounts" title="Accounts">
          <p>
            Source and admin sign-in is handled by Clerk. Clerk holds the
            account fields they need to authenticate you. Their privacy policy
            applies to that processing. We see the account identifiers required
            to attach a shop listing, claim, or lead purchase to you.
          </p>
        </LegalSection>

        <LegalSection id="payments" title="Payments">
          <p>
            If you buy a Source lead, Stripe processes the card. We do not store
            full card numbers. Stripe’s terms and privacy policy cover that
            payment. We keep the customer and payment identifiers needed to
            unlock the lead.
          </p>
        </LegalSection>

        <LegalSection id="ask" title="Ask the resource">
          <p>
            Questions typed into Ask the resource are sent to our answer
            service so the model can match them to this site’s pages. Do not
            paste secrets or a customer’s confidential print into the box.
            This site is not set up for export-controlled drawings. Use the{" "}
            <TextLink href="/contact">quote form</TextLink> for a drawing.
          </p>
        </LegalSection>

        <LegalSection id="cookies" title="Cookies and analytics">
          <p>
            This site uses a first-party visit log (IP, city, referrer, clicks)
            so the desk can review traffic and later block abusive addresses.
            Vercel Analytics may also run. If a Google Analytics ID is
            configured, that tool may also set cookies. Clerk and Stripe set
            cookies required to sign in and pay. Embedded YouTube players use
            YouTube’s privacy-enhanced mode; YouTube may still set cookies if
            you play a video.
          </p>
          <p>
            We do not run an advertising network on these pages. Host, auth,
            payment, and video cookies are theirs, not a {COMPANY} ad pixel.
          </p>
        </LegalSection>

        <LegalSection id="processors" title="Processors">
          <p>We use vendors to run the site. They process data on our instructions:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Vercel — hosting, analytics, and file storage for uploads.</li>
            <li>
              Google Analytics — page views and traffic when a Measurement ID is
              configured.
            </li>
            <li>Clerk — sign-in and account sessions.</li>
            <li>Stripe — Source lead payments.</li>
            <li>Resend — outbound email for quotes and lead notices.</li>
            <li>
              Our AI gateway provider — Ask the resource answers, when that
              feature is enabled.
            </li>
            <li>YouTube — video embeds you choose to play.</li>
          </ul>
        </LegalSection>

        <LegalSection id="sharing" title="Sharing and sales">
          <p>
            We do not sell your personal information, quote files, or lead
            lists. We share data with processors above, with a shop we are
            asked to introduce on a directory lead, and when the law requires
            it. Directory pages name other companies for information only;
            those names are not a sale of your data to them unless you asked
            us to make an introduction.
          </p>
        </LegalSection>

        <LegalSection id="retention" title="How long we keep it">
          <p>
            Quote packets stay as long as we need them to answer the job, keep
            a quality record, or meet tax and legal holds. Account data stays
            while the account is open. Analytics are kept on the vendor’s
            default schedule. Ask-box questions are not a permanent customer
            file. You can ask us to delete a lead or account email at{" "}
            <TextLink href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</TextLink>{" "}
            unless we must keep it for a job or the law.
          </p>
        </LegalSection>

        <LegalSection id="rights" title="Your choices">
          <p>
            You can decline optional LinkedIn, skip creating an account, and
            refuse non-essential cookies in your browser. If you are a
            California resident, you may request access to or deletion of
            personal information we hold about you, and you may ask whether we
            sold or shared it (we do not sell it). Email{" "}
            <TextLink href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</TextLink>.
            We will not discriminate against you for making that request.
          </p>
        </LegalSection>

        <LegalSection id="children" title="Children">
          <p>
            This site is for manufacturers and buyers of industrial wire forms.
            It is not directed at children under 16. We do not knowingly
            collect their data.
          </p>
        </LegalSection>

        <LegalSection id="security" title="Security">
          <p>
            Uploads and forms travel over HTTPS. Access to the quote inbox is
            limited to the shop. No transmission or host is perfectly secure.
            Do not send passwords in a quote form.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="Changes">
          <p>
            We will update this page when the collection or use of data
            changes. The effective date at the top is the current version.
            Continued use of the site after a change is acceptance of the
            revised policy.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="Contact">
          <LegalContact />
        </LegalSection>
      </LegalArticle>
    </Page>
  );
}
