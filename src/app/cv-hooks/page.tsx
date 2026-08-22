import { PowderCoatingStylePage } from "@/components/PowderCoatingStylePage";
import { powderHookStyle } from "@/lib/powder-coating-hooks";
import { pageMeta } from "@/lib/seo";

const style = powderHookStyle("cv-hooks");

export const metadata = pageMeta({
  title: style.title,
  description: style.description,
  path: style.path,
  keywords: style.keywords,
});

export default function CvHooksPage() {
  return <PowderCoatingStylePage style={style} />;
}
