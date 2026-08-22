import { PowderCoatingStylePage } from "@/components/PowderCoatingStylePage";
import { powderHookStyle } from "@/lib/powder-coating-hooks";
import { pageMeta } from "@/lib/seo";

const style = powderHookStyle("c-hooks");

export const metadata = pageMeta({
  title: style.title,
  description: style.description,
  path: style.path,
  keywords: style.keywords,
});

export default function CHooksPage() {
  return <PowderCoatingStylePage style={style} />;
}
