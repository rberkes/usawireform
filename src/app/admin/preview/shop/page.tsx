import { isAdmin } from "../../actions";
import { AdminLogin } from "../../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import {
  AdminPreviewBanner,
  ShopDashboardPreview,
} from "@/components/AdminRolePreviews";
import { Page } from "@/components/ui";
import { adminInboxCounts } from "@/lib/admin-inbox";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Shop dashboard preview",
  robots: { index: false, follow: false },
};

export default async function AdminShopPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();
  if (!ok) {
    return (
      <AdminLogin
        next="/admin/preview/shop"
        error={error}
        title="Shop dashboard preview"
      />
    );
  }
  const counts = await adminInboxCounts();

  return (
    <Page>
      <AdminInboxNav current="preview" {...counts} />
      <AdminPreviewBanner role="shop" />
      <ShopDashboardPreview />
    </Page>
  );
}
