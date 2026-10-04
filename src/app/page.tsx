import { redirect } from "next/navigation";
import { BuyerHome } from "@/components/home/BuyerHome";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `Custom CNC Wire Forming from Your File | ${COMPANY}`,
  description: `${COMPANY} connects buyers with U.S. custom wire forming manufacturers. Upload a STEP or drawing and get quotes from shops that can form it. Instant estimate, catalog parts, and production quotes. No CAD? We convert a PDF 3-view free.`,
  path: "/",
  absoluteTitle: true,
  image: {
    url: "/shop/robomac-214tf.jpg",
    width: 1536,
    height: 1024,
    alt: "Numalliance Robomac 214TF 3D CNC wire forming machine",
  },
  keywords: [
    "custom CNC wire forming",
    "upload STEP wire form",
    "wire forming quote",
    "wire form suppliers",
    "wire form manufacturers",
    "USA made wire forms",
    "CNC wire forming",
    "USA Wire Form",
    "instant wire forming quote",
    "powder coating hooks",
    "ground staples",
    "wire baskets",
    "4-14 mm wire forming",
  ],
});

/** ISR: cache the page for 5 minutes. */
export const revalidate = 300;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  if (tab === "suppliers") redirect("/suppliers");

  return <BuyerHome />;
}
