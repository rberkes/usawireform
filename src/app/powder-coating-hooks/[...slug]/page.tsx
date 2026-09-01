import { notFound } from "next/navigation";
import { PowderHookArticlePage } from "@/components/PowderHookArticlePage";
import { PowderCoatingStylePage } from "@/components/PowderCoatingStylePage";
import { PowderHookPricesView } from "@/components/PowderHookPricesView";
import { PowderHookSquareView } from "@/components/PowderHookSquareView";
import { EpsiHookPricesView } from "@/components/EpsiHookPricesView";
import { HOOK_PHOTOS } from "@/components/VHookFigure";
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
  const photoKey =
    node.styleId === "v-hooks" ||
    slug[0] === "v-hooks" ||
    slug[0] === "super-v-hooks" ||
    slug[0] === "locking-v-hooks" ||
    slug[0] === "hv-series-v-hooks"
      ? "v"
      : node.styleId === "c-hooks" ||
          slug[0] === "c-hooks" ||
          slug[0] === "hc-series-c-hooks"
        ? "c"
        : node.styleId === "cv-hooks" ||
            slug[0] === "cv-hooks" ||
            slug[0] === "hcv-series-cv-hooks"
          ? "cv"
          : node.styleId === "s-hooks" ||
              slug[0] === "s-hooks" ||
              slug[0] === "hs-series-s-hooks"
            ? "s"
            : node.styleId === "90-degree-hooks" ||
                slug[0] === "90-degree-hooks" ||
                slug[0] === "hv90-series-90-degree-v-hooks"
              ? "90v"
              : undefined;
  const photo = photoKey ? HOOK_PHOTOS[photoKey] : undefined;
  return pageMeta({
    title: node.title,
    description: node.description,
    path: powderHookHref(node.slug),
    keywords: node.keywords,
    ...(photo
      ? {
          image: {
            url: photo.src,
            width: photo.width,
            height: photo.height,
            alt: node.h1,
          },
        }
      : {}),
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
  if (node.render === "epsi") return <EpsiHookPricesView />;
  if (node.render === "square") return <PowderHookSquareView />;
  return <PowderHookArticlePage node={node} />;
}
