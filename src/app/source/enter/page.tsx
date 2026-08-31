import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { resolveSourceRole } from "@/lib/source-gate";
import { shopHasNda } from "@/lib/source-nda";
import { getSourceProfile } from "@/lib/source";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Source",
  robots: { index: false, follow: false },
};

export default async function SourceEnterPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/source/enter");

  const role = await resolveSourceRole(userId);
  if (role === "buyer") redirect("/buyer/dashboard");

  const profile = await getSourceProfile(userId);
  if (!shopHasNda(profile)) redirect("/source/nda");
  redirect("/source/dashboard");
}
