import { VHookLanderPage } from "@/components/VHookLander";
import { pageMeta } from "@/lib/seo";
import { vHookLander } from "@/lib/v-hook-landers";

const lander = vHookLander("/custom-v-hooks");

export const metadata = pageMeta({
  title: lander.title,
  description: lander.description,
  path: lander.path,
  keywords: lander.keywords,
});

export default function CustomVHooksPage() {
  return <VHookLanderPage lander={lander} />;
}
