import { SourceEquipmentForm } from "@/components/SourceEquipmentForm";
import { Page, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { getSourceInvite } from "@/lib/source";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Register and upload equipment — Source",
  description:
    "File the CNC cells on your floor: OEM, model, 2D or 3D, wire min and max, city. Source matches jobs to that iron.",
  path: "/source/equipment",
});

type Props = { searchParams: Promise<{ invite?: string }> };

export default async function SourceEquipmentPage({ searchParams }: Props) {
  const { invite: inviteId } = await searchParams;
  const invite = inviteId ? await getSourceInvite(inviteId) : null;

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Register and upload equipment"
        lede="Name the shop. One row per cell. Jobs match these bands so you only see work your iron can run."
      />
      {invite ? (
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          Invite for {invite.company || invite.to}. Use the email the invite
          was sent to.
        </p>
      ) : null}
      <div className="mt-8">
        <SourceEquipmentForm
          inviteId={invite?.id}
          company={invite?.company}
          email={invite?.to}
        />
      </div>
    </Page>
  );
}
