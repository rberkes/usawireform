import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DirectoryClaimForm } from "@/components/DirectoryClaimForm";
import { ReleaseDirectoryClaimForm } from "@/components/ReleaseDirectoryClaimForm";
import { ButtonLink, Page, PageHero } from "@/components/ui";
import { getDirectoryCompany } from "@/lib/directory";
import { SOURCE_PLAN_LINE } from "@/lib/source-plans";
import { sourceAccountLocksClaim } from "@/lib/source-directory";
import { findSourceProfileBySlug, getSourceProfile } from "@/lib/source";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Claim directory page — Source",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ slug?: string }> };

export default async function SourceClaimPage({ searchParams }: Props) {
  const { slug: raw } = await searchParams;
  const slug = raw?.trim() ?? "";
  const listed = slug ? getDirectoryCompany(slug) : undefined;
  if (!listed) {
    return (
      <Page>
        <PageHero
          kicker="Source"
          title="Claim a directory page"
          lede="That listing is not in the directory. Open the company page and claim from there."
        />
        <div className="mt-8">
          <ButtonLink href="/directory">Company directory</ButtonLink>
        </div>
      </Page>
    );
  }

  const { userId } = await auth();
  const [owner, mine] = await Promise.all([
    findSourceProfileBySlug(listed.slug),
    userId ? getSourceProfile(userId) : Promise.resolve(null),
  ]);

  if (owner && userId && owner.userId === userId) {
    redirect("/source/dashboard");
  }

  const alreadyMine =
    Boolean(mine?.company) &&
    mine?.slug !== listed.slug &&
    sourceAccountLocksClaim(mine);
  const usaShop = listed.country === "USA";

  if (alreadyMine && mine) {
    return (
      <Page>
        <PageHero
          kicker="Source"
          title={`Signed in as ${mine.company}`}
          lede={`This login cannot claim ${listed.name}. One shop per account. Sign out to use a different company.`}
        />
        <div className="mt-8 max-w-xl space-y-4 text-sm leading-6 text-muted">
          <p>
            File cells for {mine.company} from the shop dashboard.{" "}
            {listed.name} is for that shop’s own login.
          </p>
          <ReleaseDirectoryClaimForm company={mine.company} />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/source/dashboard">Shop dashboard</ButtonLink>
            {mine.slug ? (
              <ButtonLink href={`/directory/${mine.slug}`} variant="ghost">
                Open {mine.company}
              </ButtonLink>
            ) : null}
            <ButtonLink href={`/directory/${listed.slug}`} variant="ghost">
              Back to {listed.name}
            </ButtonLink>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <PageHero
        kicker="Source"
        title={`Claim ${listed.name}`}
        lede={
          usaShop
            ? `This keeps /directory/${listed.slug}. File CNC cells on that listing from the shop dashboard.`
            : "Source is USA shops for now. Europe later, on its own platform."
        }
      />
      <div className="mt-8 max-w-xl space-y-4 text-sm leading-6 text-muted">
        <p>
          {listed.location}. Public equipment notes stay until you file cells.
          Email stays off the listing.
        </p>
        <p>{SOURCE_PLAN_LINE}</p>
        {!usaShop ? (
          <p>This listing is outside the US Source floor.</p>
        ) : owner ? (
          <p>This page is already claimed.</p>
        ) : (
          <DirectoryClaimForm slug={listed.slug} company={listed.name} />
        )}
        <div>
          <ButtonLink href={`/directory/${listed.slug}`} variant="ghost">
            Back to the listing
          </ButtonLink>
        </div>
      </div>
    </Page>
  );
}
