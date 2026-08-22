import { SourceJobForm } from "@/components/SourceJobForm";
import { Page, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Match a job to shops — Source",
  description:
    "Enter wire size, 2D or 3D, and locale. Source matches the RFQ to shops that filed those cells. We introduce. Instant estimate stays this floor.",
  path: "/source/job",
});

export default function SourceJobPage() {
  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Match a job to the iron"
        lede="Wire size, 2D or 3D, brand if it matters, city. We match filed cells — not a directory paragraph. Shop emails stay with the desk."
      />
      <div className="mt-8">
        <SourceJobForm />
      </div>
    </Page>
  );
}
