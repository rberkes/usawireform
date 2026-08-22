import Link from "next/link";
import { Page, PageHero, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

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

export default function SourcePage() {
  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Jobs match the iron on the floor"
        lede="Shops file equipment. Buyers ask three shops whose cells can run the print. Diameter, 2D or 3D, OEM, locale — not a directory blurb."
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
          where you add more iron. Free is 3 cells.{" "}
          <TextLink href="/source/upgrade">$39 / $59 / $99 a month</TextLink>{" "}
          for 10, 15, or 20.
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
    </Page>
  );
}
