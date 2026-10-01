import { permanentRedirect } from "next/navigation";
import { CNC_OEMS, getOem, oemPath } from "@/lib/cnc-oems";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ oem: string }> };

export function generateStaticParams() {
  return CNC_OEMS.map((oem) => ({ oem: oem.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { oem: slug } = await params;
  const oem = getOem(slug);
  if (!oem) return {};
  return pageMeta({
    title: `${oem.name} CNC Wire Forming Machines`,
    description: oem.summary,
    path: oemPath(oem),
    noindex: true,
  });
}

export default async function LegacyCncOemPage({ params }: Props) {
  const { oem } = await params;
  permanentRedirect(oemPath(oem));
}
