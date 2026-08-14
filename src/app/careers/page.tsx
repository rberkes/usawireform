import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import {
  Page,
  PageHero,
  Section,
  Panel,
  TextLink,
} from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers",
  description: `Join ${COMPANY} — careers in CNC wire forming, machine operation, and manufacturing in Northeast Ohio. Apply today.`,
  path: "/careers",
  keywords: [
    "wire forming jobs",
    "CNC operator jobs",
    "manufacturing careers Ohio",
    "Northeast Ohio manufacturing jobs",
  ],
});

const openPositions = [
  {
    title: "CNC Wire Forming Operator",
    type: "Full-time",
    location: "Northeast Ohio",
    description:
      "Operate and set up Numalliance Robomac CNC wire forming equipment. Program 2D and 3D wire forms, perform quality checks, and maintain production rates.",
    requirements: [
      "2+ years CNC machine operation experience",
      "Ability to read and interpret engineering drawings",
      "Experience with wire forming or metal fabrication preferred",
      "Strong attention to detail and quality",
      "Basic math and measurement skills",
    ],
  },
  {
    title: "Resistance Welder / Fabricator",
    type: "Full-time",
    location: "Northeast Ohio",
    description:
      "Perform resistance welding, MIG/TIG welding, and assembly operations on wire forms, baskets, and frames. Work with carbon steel, stainless, and other materials.",
    requirements: [
      "Experience with resistance welding equipment",
      "MIG and/or TIG welding certification preferred",
      "Ability to work with fixtures and jigs",
      "Quality-focused with good hand-eye coordination",
      "Willing to cross-train on multiple operations",
    ],
  },
  {
    title: "Quality Inspector",
    type: "Full-time",
    location: "Northeast Ohio",
    description:
      "Inspect wire forms and assemblies using fixtures, overlays, calipers, and CMM. Document quality records and support first-article inspections.",
    requirements: [
      "Experience with dimensional inspection",
      "Familiarity with GD&T and engineering drawings",
      "CMM experience a plus",
      "Detail-oriented with strong documentation skills",
      "ISO 9001 environment experience preferred",
    ],
  },
];

export default function CareersPage() {
  const breadcrumbItems = [{ label: "Careers" }];

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Careers", url: "/careers" }]} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <PageHero
        kicker="Careers"
        title="Build your career in wire forming"
        lede={`${COMPANY} is hiring skilled manufacturing professionals in Northeast Ohio. Join a team with 50+ years of industry experience.`}
      />

      <Section kicker="Why work here" className="mt-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <Panel>
            <h3 className="font-medium">Stable Industry</h3>
            <p className="mt-2 text-sm text-muted">
              Wire forming serves automotive, construction, industrial, and defense — 
              sectors that consistently need custom metal parts.
            </p>
          </Panel>
          <Panel>
            <h3 className="font-medium">Modern Equipment</h3>
            <p className="mt-2 text-sm text-muted">
              Work on Numalliance Robomac CNC equipment — industry-leading 
              3D wire forming technology.
            </p>
          </Panel>
          <Panel>
            <h3 className="font-medium">Growth Opportunity</h3>
            <p className="mt-2 text-sm text-muted">
              Cross-train across CNC, welding, and inspection. 
              Build skills that advance your manufacturing career.
            </p>
          </Panel>
        </div>
      </Section>

      <Section kicker="Open positions" title="Current openings" className="mt-16">
        <div className="mt-8 space-y-6">
          {openPositions.map((job) => (
            <Panel key={job.title}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-copper">
                    {job.type} · {job.location}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                {job.description}
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium">Requirements:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {job.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
            </Panel>
          ))}
        </div>
      </Section>

      <Section kicker="Apply" title="Submit your application" className="mt-16">
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Interested in joining the team? Fill out the form below and attach your resume. 
          We review all applications and will contact qualified candidates.
        </p>
        <div className="mt-8 max-w-2xl">
          <JobApplicationForm positions={openPositions.map((p) => p.title)} />
        </div>
      </Section>

      <Section className="mt-16">
        <Panel>
          <p className="text-sm text-muted">
            <strong className="text-foreground">Equal Opportunity Employer.</strong>{" "}
            {COMPANY} is committed to creating a diverse environment and is proud to be 
            an equal opportunity employer. All qualified applicants will receive consideration 
            for employment without regard to race, color, religion, gender, gender identity or 
            expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
          </p>
        </Panel>
      </Section>
    </Page>
  );
}
