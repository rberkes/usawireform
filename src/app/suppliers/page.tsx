import { SupplierHome } from "@/components/home/SupplierHome";
import { COMPANY, SUPPLIER_PITCH } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `Supplier Portal — File Cells Free | ${COMPANY}`,
  description: SUPPLIER_PITCH,
  path: "/suppliers",
  absoluteTitle: true,
  keywords: [
    "wire form suppliers",
    "list CNC wire machines",
    "wire shop leads",
    "file wire forming capacity",
    "AI Smart Connect",
  ],
});

export const revalidate = 300;

export default function SuppliersPage() {
  return <SupplierHome />;
}
