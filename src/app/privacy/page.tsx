import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `Privacy policy for ${COMPANY}. How we collect, use, and protect your information when you request quotes or use our website.`,
  path: "/privacy",
  keywords: ["privacy policy", "data protection", "wire forming privacy"],
});

export default function PrivacyPage() {
  return (
    <Page className="max-w-3xl">
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        lede="This policy explains how we collect, use, and protect your information."
      />

      <div className="article mt-12">
        <p className="text-sm text-muted">
          Effective Date: January 1, 2024 | Last Updated: August 2024
        </p>

        <h2 id="intro">Introduction</h2>
        <p>
          {COMPANY} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed 
          to protecting the personal information you share with us. This Privacy Policy explains 
          how we collect, use, disclose, and safeguard your information when you visit our website 
          at {SITE_URL} or submit a quote request.
        </p>

        <h2 id="collection">Information We Collect</h2>
        <h3>Information You Provide</h3>
        <p>When you use our <TextLink href="/contact">quote request form</TextLink> or <TextLink href="/instant-quote">instant quote calculator</TextLink>, we collect:</p>
        <ul>
          <li>Contact information (name, email address, phone number)</li>
          <li>Company name and job title</li>
          <li>LinkedIn profile URL (optional, for business verification)</li>
          <li>Project details (material, diameter, quantity, specifications)</li>
          <li>Technical files you upload (STEP, STP, IGES, PDF, DXF, SLDPRT)</li>
          <li>Any additional notes or comments you provide</li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>IP address and general geographic location</li>
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>Pages visited and time spent on site</li>
          <li>Referring website or search terms</li>
        </ul>

        <h2 id="use">How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your quote requests and inquiries</li>
          <li>Prepare accurate production quotes based on your specifications</li>
          <li>Communicate about your project, orders, or account</li>
          <li>Improve our website and services</li>
          <li>Send occasional updates about our capabilities (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          <strong>We do not sell your personal information.</strong> Your data is used solely 
          for business purposes related to your quote request or inquiry.
        </p>

        <h2 id="sharing">Information Sharing</h2>
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Service providers:</strong> Companies that help us operate our website, process forms, or send emails (e.g., web hosting, email services)</li>
          <li><strong>Business partners:</strong> If your project requires outside services (plating, heat treating), we may share relevant technical details with trusted partners</li>
          <li><strong>Legal requirements:</strong> When required by law, court order, or to protect our rights</li>
        </ul>

        <h2 id="cookies">Cookies and Tracking</h2>
        <p>
          Our website uses cookies and similar technologies for basic functionality and analytics. 
          We use <TextLink href="https://vercel.com/analytics">Vercel Analytics</TextLink> to 
          understand how visitors use our site. This service collects anonymous usage data and 
          does not track you across other websites.
        </p>
        <p>
          You can control cookies through your browser settings. Disabling cookies may affect 
          some website functionality.
        </p>

        <h2 id="security">Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your 
          personal information against unauthorized access, alteration, disclosure, or 
          destruction. This includes:
        </p>
        <ul>
          <li>Secure HTTPS encryption for all data transmission</li>
          <li>Access controls limiting who can view your information</li>
          <li>Secure file storage for uploaded technical drawings</li>
          <li>Regular security reviews and updates</li>
        </ul>
        <p>
          While we strive to protect your information, no method of transmission over the 
          Internet is 100% secure. We cannot guarantee absolute security.
        </p>

        <h2 id="retention">Data Retention</h2>
        <p>
          We retain your information for as long as necessary to fulfill the purposes outlined 
          in this policy, unless a longer retention period is required by law. Quote-related 
          data is typically retained for 7 years for business records purposes. You may request 
          deletion of your data at any time.
        </p>

        <h2 id="rights">Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <TextLink href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</TextLink>.
        </p>

        <h2 id="children">Children&apos;s Privacy</h2>
        <p>
          Our website is not directed to individuals under 18 years of age. We do not 
          knowingly collect personal information from children. If you believe we have 
          collected information from a child, please contact us immediately.
        </p>

        <h2 id="changes">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated version will be 
          indicated by an updated &ldquo;Last Updated&rdquo; date. We encourage you to review this 
          policy periodically.
        </p>

        <h2 id="contact">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, contact us:
        </p>
        <ul>
          <li>Email: <TextLink href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</TextLink></li>
          <li>Web: <TextLink href="/contact">Contact Form</TextLink></li>
        </ul>
      </div>
    </Page>
  );
}
