import {
  LegalArticle,
  LegalContact,
  LegalSection,
  LegalToc,
  LegalUpdated,
} from "@/components/LegalDoc";
import { Page, PageHero, TextLink } from "@/components/ui";
import { COMPANY, PART_PREFIX, QUOTE_EMAIL, SITE_HOST, SITE_URL } from "@/lib/company";
import { LEGAL_PATHS } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "User Agreement",
  description: `${COMPANY} user agreement: copyright, trademarks, and rules against copying the site, code, or structure of ${SITE_HOST}.`,
  path: "/terms",
  keywords: [
    "user agreement",
    "terms of use",
    "USA Wire Form copyright",
    "USA Wire Form trademark",
  ],
});

const toc = [
  { id: "agreement", label: "The agreement" },
  { id: "copyright", label: "Copyright" },
  { id: "structure", label: "Code and site structure" },
  { id: "trademarks", label: "Trademarks" },
  { id: "license", label: "Limited license to visit" },
  { id: "forbidden", label: "What you may not do" },
  { id: "scraping", label: "Scraping and cloning" },
  { id: "ai", label: "Machine copies and training" },
  { id: "submissions", label: "Your drawings" },
  { id: "directory", label: "Directory and third-party marks" },
  { id: "accounts", label: "Accounts" },
  { id: "quotes", label: "Quotes and orders" },
  { id: "disclaimer", label: "No warranty" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnity", label: "Indemnity" },
  { id: "dmca", label: "Copyright complaints" },
  { id: "law", label: "Governing law" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <Page>
      <PageHero
        kicker="Legal"
        title="User Agreement"
        lede={`${COMPANY} owns this site. You may read it and send a print. You may not copy the code, the page structure, the catalog compilation, or the marks.`}
      />
      <div className="mt-6">
        <LegalUpdated />
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
        Personal data is covered in the{" "}
        <TextLink href={LEGAL_PATHS.privacy}>Privacy Policy</TextLink>. Both
        documents apply when you use {SITE_HOST}.
      </p>

      <LegalArticle>
        <LegalToc items={toc} />

        <LegalSection id="agreement" title="The agreement">
          <p>
            By visiting {SITE_URL}, using Ask the resource, submitting a form,
            creating an account, or linking to these pages, you agree to this
            User Agreement. If you do not agree, do not use the site.
          </p>
          <p>
            This is a contract with {COMPANY}, Northeast Ohio. It is not a
            substitute for registering a copyright or trademark with the U.S.
            government. Those filings, when made, add remedies. The rights
            below exist whether or not a registration number appears here.
          </p>
        </LegalSection>

        <LegalSection id="copyright" title="Copyright">
          <p>
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
          <p>
            The site is an original work of authorship. That includes, without
            limitation: page copy; product and process descriptions; the
            selection, arrangement, and compilation of the factory directory,
            machine catalog, coil pages, and state landers; photographs;
            diagrams; 3D models and STEP previews we publish; video pages;
            blog and briefing text; user-interface design; and the source
            code, markup, stylesheets, and scripts that render the site.
          </p>
          <p>
            No part of the site may be copied, reproduced, republished,
            uploaded, posted, transmitted, stored, or distributed in any form
            without prior written permission from {COMPANY}, except for the
            limited viewing license below or a use that U.S. copyright law
            expressly allows (such as a statutory fair-use analysis that you
            are responsible for).
          </p>
        </LegalSection>

        <LegalSection id="structure" title="Code and site structure">
          <p>
            The HTML, CSS, TypeScript, React components, App Router tree,
            information architecture, URL scheme, internal linking pattern,
            navigation, and unique combination of landers are proprietary to{" "}
            {COMPANY}. You may not:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Copy, fork, or republish the source code or a substantial
              portion of it to build another site.
            </li>
            <li>
              Clone the page structure, section order, or distinctive layout
              of {SITE_HOST} for a competing wire-forming, sourcing, or
              directory product.
            </li>
            <li>
              Recreate our catalog taxonomy, factory-card format, machine
              class tags, or compilation of shops and models as a substitute
              for this resource.
            </li>
            <li>
              Remove copyright, trademark, or proprietary notices from any
              copy or code you are shown.
            </li>
          </ul>
          <p>
            Facts about the trade (a published machine diameter, a mill’s
            public grade) are not ours to lock up. The original expression,
            compilation, and software that present those facts are.
          </p>
        </LegalSection>

        <LegalSection id="trademarks" title="Trademarks">
          <p>
            The following are trademarks or service marks of {COMPANY},
            whether or not a registration has issued:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>{COMPANY}™</li>
            <li>{PART_PREFIX}™ and part numbers that begin with {PART_PREFIX}</li>
            <li>AI Smart Connect™</li>
            <li>{SITE_HOST} and the {COMPANY} word mark and logo (the wire lockup)</li>
            <li>
              Distinctive taglines used as source identifiers on this site,
              including “the resource” as applied to this wire-forming map
            </li>
          </ul>
          <p>
            You may not use these marks in a domain, company name, paid ad,
            meta tag, or product label in a way that suggests you are{" "}
            {COMPANY} or that we sponsor or endorse you. Do not use confusingly
            similar spellings (including usa-wire-form, usawireforms, or
            usawf.com lookalikes) to trade on the mark.
          </p>
          <p>
            Third-party names on this site — Numalliance, Robomac, WAFIOS,
            Clerk, Stripe, mill names, and shops in the directory — belong to
            their owners. Listing a shop or machine is not affiliation,
            endorsement, or a license to use that owner’s mark.
          </p>
        </LegalSection>

        <LegalSection id="license" title="Limited license to visit">
          <p>
            We grant you a personal, revocable, non-exclusive, non-transferable
            license to load pages in a browser and to send a quote or directory
            request for a lawful manufacturing inquiry. That is a license to
            use, not a sale or assignment of any intellectual property.
          </p>
          <p>
            We do not grant a license to scrape, mirror, frame (except as a
            browser requires), resell, white-label, or commercially reuse the
            site, its code, or its compilation.
          </p>
        </LegalSection>

        <LegalSection id="forbidden" title="What you may not do">
          <p>You may not, and you may not help anyone else:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Copy this website or a substantial part of it onto another host.
            </li>
            <li>
              Use our original copy, structure, or code to train, fine-tune, or
              evaluate a competing product without written permission.
            </li>
            <li>Bypass access controls on /admin, Source dashboards, or inboxes.</li>
            <li>
              Upload malware, or a file you do not have the right to send.
            </li>
            <li>
              Misrepresent yourself as {COMPANY}, or as a listed shop you do
              not represent.
            </li>
            <li>
              Use the site to infringe someone else’s patent, copyright, trade
              secret, or trademark.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="scraping" title="Scraping and cloning">
          <p>
            Automated collection of the directory, machine catalog, prices,
            landers, or page HTML for any purpose other than a public search
            engine’s ordinary crawl is prohibited unless we have given written
            permission. That includes bulk download, site-cloning tools,
            “save as complete website,” and agents that reconstruct our
            information architecture.
          </p>
          <p>
            Ordinary indexing by Googlebot and similar public search crawlers
            that honor robots.txt is allowed. Training crawlers and clone
            utilities are not.
          </p>
        </LegalSection>

        <LegalSection id="ai" title="Machine copies and training">
          <p>
            You may not use the site, its source, or its compilation as
            training, fine-tuning, embedding, or evaluation data for a
            generative model or a competing sourcing engine except with our
            written permission. Ask the resource is our tool, running on our
            content. It is not a license to extract the library.
          </p>
        </LegalSection>

        <LegalSection id="submissions" title="Your drawings">
          <p>
            You retain ownership of CAD files and prints you upload. You
            represent that you have the right to send them. You grant{" "}
            {COMPANY} a non-exclusive license to store, open, preview, quote,
            program, and manufacture from those files for the inquiry you
            opened, and to keep a quality record.
          </p>
          <p>
            We do not claim copyright in your part. You do not claim copyright
            in our quote letter, CNC program, or process pages by sending a
            print.
          </p>
        </LegalSection>

        <LegalSection id="directory" title="Directory and third-party marks">
          <p>
            Factory cards are informational. Unless a page says a shop is
            verified or claimed, {COMPANY} does not warrant that shop’s
            equipment, capacity, or credentials. Company names and trademarks
            in the directory belong to those companies. Contact them directly
            to confirm a capability.
          </p>
        </LegalSection>

        <LegalSection id="accounts" title="Accounts">
          <p>
            Source accounts must be accurate. You are responsible for the
            credentials and for filings made under them. We may suspend an
            account that violates this agreement or that we reasonably believe
            is abusive or fraudulent.
          </p>
        </LegalSection>

        <LegalSection id="quotes" title="Quotes and orders">
          <p>
            Instant quote and form acknowledgements are estimates, not a
            binding production contract. A job is accepted when {COMPANY}{" "}
            confirms price, quantity, material, and lead time in writing.
            Production terms (100-piece minimum, tooling, coil buys) on the
            site describe this floor; they become contract terms only when
            incorporated into an accepted order.
          </p>
        </LegalSection>

        <LegalSection id="disclaimer" title="No warranty">
          <p>
            The site is provided “as is” and “as available.” {COMPANY}{" "}
            disclaims all warranties, express or implied, including
            merchantability, fitness for a particular purpose, title, and
            non-infringement, to the fullest extent Ohio and U.S. law allow.
            Process pages and machine notes are a resource, not a certified
            engineering opinion for your print.
          </p>
        </LegalSection>

        <LegalSection id="liability" title="Limitation of liability">
          <p>
            To the fullest extent the law allows, {COMPANY} is not liable for
            indirect, incidental, special, consequential, or punitive damages,
            or for lost profits, data, or business, arising from the site or
            from a copy or misuse of the site. Our total liability for a claim
            about the public website itself is limited to one hundred U.S.
            dollars ($100). This cap does not limit liability that cannot be
            limited under applicable law, and it does not rewrite an accepted
            production order that states its own terms.
          </p>
        </LegalSection>

        <LegalSection id="indemnity" title="Indemnity">
          <p>
            You will defend and indemnify {COMPANY} against claims that arise
            from your misuse of the site, a file you uploaded without rights,
            or a copy of our code, structure, or marks that you made or
            commissioned.
          </p>
        </LegalSection>

        <LegalSection id="dmca" title="Copyright complaints">
          <p>
            If you believe content on this site infringes your copyright, send
            a notice to{" "}
            <TextLink href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</TextLink>{" "}
            with: your contact information; a description of the work; the URL
            of the material; a statement that you have a good-faith belief the
            use is not authorized; a statement under penalty of perjury that
            the notice is accurate and that you are the owner or authorized
            agent; and your physical or electronic signature.
          </p>
          <p>
            If we find a copy of this site, its code, or its structure on
            another host, we may send a takedown notice and pursue all remedies
            available under the Copyright Act, the Lanham Act, and this
            contract, including injunctive relief and recovery of costs.
          </p>
        </LegalSection>

        <LegalSection id="law" title="Governing law">
          <p>
            Ohio law governs this agreement, without regard to conflict-of-law
            rules. Exclusive venue is the state or federal courts sitting in
            Cuyahoga County, Ohio, and you consent to that venue. The United
            Nations Convention on Contracts for the International Sale of Goods
            does not apply to this website agreement.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="Changes">
          <p>
            We may revise this User Agreement by posting a new version on this
            page. The effective date will change. Continued use after a post is
            acceptance. If you do not agree, stop using the site.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="Contact">
          <LegalContact />
          <p>
            Written permission to reuse code, copy, or structure:{" "}
            <TextLink href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</TextLink>.
            Permission is not granted until we say so in writing.
          </p>
        </LegalSection>
      </LegalArticle>
    </Page>
  );
}
