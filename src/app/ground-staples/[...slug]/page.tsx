import { notFound } from "next/navigation";
import { GroundStapleArticlePage } from "@/components/GroundStapleArticlePage";
import { GroundStaplePricesView } from "@/components/GroundStaplePricesView";
import {
  groundStapleHref,
  groundStapleNode,
  groundStapleStaticParams,
} from "@/lib/ground-staple-tree";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return groundStapleStaticParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const node = groundStapleNode(slug);
  if (!node) return {};
  return pageMeta({
    title: node.title,
    description: node.description,
    path: groundStapleHref(node.slug),
    keywords: node.keywords,
  });
}

export default async function GroundStapleBranchPage({ params }: Props) {
  const { slug } = await params;
  const node = groundStapleNode(slug);
  if (!node) notFound();
  if (node.render === "prices") return <GroundStaplePricesView />;
  return <GroundStapleArticlePage node={node} />;
}
