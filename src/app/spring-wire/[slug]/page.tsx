import { notFound } from "next/navigation";
import { TopicArticlePage } from "@/components/TopicArticlePage";
import {
  SPRING_WIRE_PAGES,
  SPRING_WIRE_ROOT,
  springWireHref,
} from "@/lib/spring-wire";
import { topicBySlug } from "@/lib/topic-article";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SPRING_WIRE_PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const node = topicBySlug(SPRING_WIRE_PAGES, slug);
  if (!node) return {};
  return pageMeta({
    title: node.title,
    description: node.description,
    path: springWireHref(node.slug),
    keywords: node.keywords,
  });
}

export default async function SpringWireGradePage({ params }: Props) {
  const { slug } = await params;
  const node = topicBySlug(SPRING_WIRE_PAGES, slug);
  if (!node) notFound();
  return (
    <TopicArticlePage
      node={node}
      hubHref={SPRING_WIRE_ROOT}
      hubLabel="Spring wire"
      kicker="Materials"
      serviceType="Spring wire forming"
      quoteTitle="Have a spring-wire print?"
    />
  );
}
