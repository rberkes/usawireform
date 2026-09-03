import { isAdmin } from "../../actions";
import { AdminLogin } from "../../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import {
  AdminPreviewBanner,
  BuyerDashboardPreview,
} from "@/components/AdminRolePreviews";
import { Page } from "@/components/ui";
import { adminInboxCounts } from "@/lib/admin-inbox";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Buyer dashboard preview",
  robots: { index: false, follow: false },
};

export default async function AdminBuyerPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();
  if (!ok) {
    return (
      <AdminLogin
        next="/admin/preview/buyer"
        error={error}
        title="Buyer dashboard preview"
      />
    );
  }
  const counts = await adminInboxCounts();

  return (
    <Page>
      <AdminInboxNav current="preview" {...counts} />
      <AdminPreviewBanner role="buyer" />
      <BuyerDashboardPreview />
    </Page>
  );
}
