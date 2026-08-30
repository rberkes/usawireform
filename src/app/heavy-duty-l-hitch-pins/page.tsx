import { LHitchPinPage } from "@/components/LHitchPinPage";
import { lHitchPinLander } from "@/lib/l-hitch-pins";
import { pageMeta } from "@/lib/seo";

const lander = lHitchPinLander("/heavy-duty-l-hitch-pins");

export const metadata = pageMeta({
  title: lander.title,
  description: lander.description,
  path: lander.path,
  keywords: lander.keywords,
});

export default function HeavyDutyLHitchPinsRoute() {
  return <LHitchPinPage lander={lander} />;
}
