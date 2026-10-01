import { permanentRedirect } from "next/navigation";
import { CNC_OEMS, getModel, modelPath } from "@/lib/cnc-oems";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ oem: string; model: string }> };

export function generateStaticParams() {
  return CNC_OEMS.flatMap((oem) =>
    oem.models.map((model) => ({ oem: oem.slug, model: model.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { oem, model } = await params;
  const hit = getModel(oem, model);
  if (!hit) return {};
  return pageMeta({
    title: `${hit.model.name} — ${hit.oem.name}`,
    description: hit.model.tagline,
    path: modelPath(hit.oem, hit.model),
    noindex: true,
  });
}

export default async function LegacyCncModelPage({ params }: Props) {
  const { oem, model } = await params;
  const hit = getModel(oem, model);
  permanentRedirect(hit ? modelPath(hit.oem, hit.model) : "/equipment/cnc-manufacturers");
}
