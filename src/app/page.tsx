import { HomeHero } from "@/components/HomeHero";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `Wire Form Suppliers, Manufacturers & CNC Wire Forming | ${COMPANY}`,
  description: `${COMPANY}: Upload a STEP or 3-view. We check diameter, 2D vs 3D, and material against real cells — this Ohio floor when it fits, or shops that filed the matching iron.`,
  path: "/",
  absoluteTitle: true,
  image: {
    url: "/shop/robomac-214tf.jpg",
    width: 1536,
    height: 1024,
    alt: "Numalliance Robomac 214TF 3D CNC wire forming machine",
  },
  keywords: [
    "wire form suppliers",
    "wire form manufacturers",
    "CNC wire forming",
    "USA Wire Form",
    "upload STEP file",
    "3 view drawing wire form",
    "free STEP conversion",
    "Numalliance Robomac",
  ],
});

export default async function Home() {
  return <HomeHero />;
}
