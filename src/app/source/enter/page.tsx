import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { resolveSourceRole, safeSourceNext, sourceNdaHref } from "@/lib/source-gate";
import { shopNeedsNda } from "@/lib/source-nda";
import { getSourceProfile } from "@/lib/source";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Source",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ next?: string; redirect_url?: string }>;
};

export default async function SourceEnterPage({ searchParams }: Props) {
  const params = await searchParams;
  const dest = safeSourceNext(params.next) || safeSourceNext(params.redirect_url);
  const { userId } = await auth();
  if (!userId) {
    redirect(
      `/sign-in?redirect_url=${encodeURIComponent(dest || "/source/enter")}`,
    );
  }

  const role = await resolveSourceRole(userId);
  if (role === "buyer") redirect("/buyer/dashboard");

  const profile = await getSourceProfile(userId);
  if (shopNeedsNda(profile)) redirect(sourceNdaHref(dest));
  redirect(dest || "/source/dashboard");
}
