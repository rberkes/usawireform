import { notFound } from "next/navigation";
import { TopicArticlePage } from "@/components/TopicArticlePage";
import {
  HAIRPIN_PAGES,
  HAIRPIN_ROOT,
  hairpinHref,
} from "@/lib/hairpin-cotter-pins";
import { topicBySlug } from "@/lib/topic-article";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HAIRPIN_PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const node = topicBySlug(HAIRPIN_PAGES, slug);
  if (!node) return {};
  return pageMeta({
    title: node.title,
    description: node.description,
    path: hairpinHref(node.slug),
    keywords: node.keywords,
  });
}

export default async function HairpinCotterPinPage({ params }: Props) {
  const { slug } = await params;
  const node = topicBySlug(HAIRPIN_PAGES, slug);
  if (!node) notFound();
  return (
    <TopicArticlePage
      node={node}
      hubHref={HAIRPIN_ROOT}
      hubLabel="Hairpin cotter pins"
      kicker="Clips"
      serviceType="Hairpin cotter pins"
      quoteTitle="Have a hairpin or R-clip print?"
    />
  );
}
