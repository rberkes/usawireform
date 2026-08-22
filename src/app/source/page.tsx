import Link from "next/link";
import { Page, PageHero, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { SOURCE_PLAN_LINE } from "@/lib/source-plans";
import { listNewestSourceDirectoryCompanies } from "@/lib/source";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Source — equipment and jobs",
  description:
    "Source by machine. Shops file the cells on the floor. Buyers ask shops whose iron can run the job. Invite, register, upload equipment.",
  path: "/source",
  keywords: [
    "wire forming capacity",
    "CNC equipment list",
    "wire forming RFQ",
    "source wire forming jobs",
  ],
});

export default async function SourcePage() {
  const newest = await listNewestSourceDirectoryCompanies(6);

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Jobs match the iron on the floor"
        lede="US shops file equipment. Buyers ask three shops whose cells can run the print. Diameter, 2D or 3D, OEM, locale — not a directory blurb. Europe later, on its own platform."
      />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-6 text-muted">
        <p>
          If you buy formed wire,{" "}
          <TextLink href="/source/job">send the job</TextLink>. Diameter, 2D
          or 3D, and locale match the cells shops filed. We introduce up to
          three chairs. Emails stay with the desk.
        </p>
        <p>
          If you run a shop, start with the invite. Register the plant and
          upload one row per cell. Confirm the account from the receipt.
          The{" "}
          <TextLink href="/source/dashboard">shop dashboard</TextLink> is
          where you add more iron. {SOURCE_PLAN_LINE}{" "}
          <TextLink href="/source/upgrade">Plans</TextLink>.
        </p>
        <p>
          Already in the{" "}
          <TextLink href="/directory">directory</TextLink>? US shops: open the
          listing and claim the page. That URL stays. File cells from the
          dashboard. Source is USA for now. Europe later, on its own platform.
        </p>
        <p>
          Instant estimate on this site is still this cell — 4–14 mm on the
          Robomac. Source is the trade: other floors, other heads.
        </p>
        <p>
          <TextLink href="/source/equipment">
            Register and upload equipment
          </TextLink>
          . Invites are sent from the shop. If you received one, use that
          link. Already filed?{" "}
          <TextLink href="/sign-in">Log in</TextLink>.
        </p>
        <p>
          <Link href="/instant-quote" className="text-copper hover:underline">
            Instant estimate
          </Link>{" "}
          stays on usawireform.com for this floor.
        </p>
      </div>

      <section className="mt-14 max-w-2xl">
        <h2 className="text-lg font-medium">Newest members</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          <TextLink href="/directory/new">See all newest Source shops</TextLink>
          .
        </p>
        {newest.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-muted">
            Nobody has published a listing yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {newest.map((shop) => (
              <li key={shop.slug} className="px-4 py-3 text-sm">
                <Link
                  href={`/directory/${shop.slug}`}
                  className="font-medium hover:text-copper"
                >
                  {shop.name}
                </Link>
                <p className="mt-1 text-muted">{shop.location}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Page>
  );
}
