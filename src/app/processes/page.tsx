import { LinkList, Page, PageHero, Section, TextLink } from "@/components/ui";
import { processesByCategory } from "@/lib/processes";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Form Processes",
  description: "Process index for 4–14 mm wire forming: 2D and 3D CNC, straightening, cutoff, end forming, weld, finish, and inspection.",
  path: '/processes',
  keywords: [
    "wire forming processes",
    "CNC forming",
    "resistance welding",
  ],
});

export default function ProcessesIndexPage() {
  const groups = processesByCategory();

  return (
    <Page>
      <PageHero
        kicker="Library"
        title="Wire form processes"
        lede="Deep pages for each operation — how it works, when to use it, and what the print should say. Production is 4–14 mm. Forming first, then prep, join, and finish."
      />
      <p className="mt-4 max-w-2xl text-sm text-muted">
        Start with{" "}
        <TextLink href="/processes/heavy-wire-forming">4–14 mm heavy wire</TextLink>
        , <TextLink href="/processes/3d-cnc-wire-forming">3D CNC</TextLink>,{" "}
        <TextLink href="/processes/wire-form-shapes">shapes</TextLink>, or
        the <TextLink href="/wire-forming">USA overview</TextLink>.
      </p>

      {groups.map((group) => (
        <Section key={group.id} kicker={group.label}>
          <LinkList
            className="mt-5"
            items={group.items.map((process) => ({
              href: process.published ? `/processes/${process.slug}` : undefined,
              title: process.title,
              body: process.summary,
              note: process.published
                ? process.weRun
                  ? "We run this"
                  : "Explain only"
                : "Page next",
            }))}
          />
        </Section>
      ))}
    </Page>
  );
}
