import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { ButtonLink, Page, PageHero, Panel } from "@/components/ui";
import { adminInboxCounts } from "@/lib/admin-inbox";
import { SOURCE_SMART_CONNECT } from "@/lib/source-plans";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Role previews",
  robots: { index: false, follow: false },
};

export default async function AdminPreviewIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();
  if (!ok) {
    return <AdminLogin next="/admin/preview" error={error} title="Role previews" />;
  }
  const counts = await adminInboxCounts();

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="What they see"
        lede="Generic buyer and shop dashboards. Sample data — not a live account. Forms do not save. Real users still sign in with Clerk."
      />
      <AdminInboxNav current="preview" {...counts} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Panel className="space-y-4 p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Buyer
          </p>
          <p className="text-lg font-medium">Buyer dashboard</p>
          <p className="text-sm leading-6 text-muted">
            Company card, monthly volume slider, jobs held at the desk vs
            released. Shop names and locations stay off this screen.
          </p>
          <ButtonLink href="/admin/preview/buyer">Open buyer view</ButtonLink>
        </Panel>
        <Panel className="space-y-4 p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Shop
          </p>
          <p className="text-lg font-medium">Shop dashboard</p>
          <p className="text-sm leading-6 text-muted">
            Inbox teaser, {SOURCE_SMART_CONNECT} unlock, filed cells, plant
            fullness. Buyer name and email stay hidden until they buy the lead.
            Buyer locale stays on the desk.
          </p>
          <ButtonLink href="/admin/preview/shop">Open shop view</ButtonLink>
        </Panel>
      </div>
    </Page>
  );
}
