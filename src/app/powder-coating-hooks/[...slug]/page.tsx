import { notFound } from "next/navigation";
import { PowderHookArticlePage } from "@/components/PowderHookArticlePage";
import { PowderCoatingStylePage } from "@/components/PowderCoatingStylePage";
import { PowderHookPricesView } from "@/components/PowderHookPricesView";
import { PowderHookSquareView } from "@/components/PowderHookSquareView";
import { powderHookStyle } from "@/lib/powder-coating-hooks";
import {
  powderHookHref,
  powderHookNode,
  powderHookStaticParams,
} from "@/lib/powder-hook-tree";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return powderHookStaticParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const node = powderHookNode(slug);
  if (!node) return {};
  return pageMeta({
    title: node.title,
    description: node.description,
    path: powderHookHref(node.slug),
    keywords: node.keywords,
  });
}

export default async function PowderHookBranchPage({ params }: Props) {
  const { slug } = await params;
  const node = powderHookNode(slug);
  if (!node) notFound();

  if (node.render === "style" && node.styleId) {
    return <PowderCoatingStylePage style={powderHookStyle(node.styleId)} />;
  }
  if (node.render === "prices") return <PowderHookPricesView />;
  if (node.render === "square") return <PowderHookSquareView />;
  return <PowderHookArticlePage node={node} />;
}
