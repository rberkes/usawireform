import { get } from "@vercel/blob";
import { auth } from "@clerk/nextjs/server";
import { blobAuth } from "@/lib/blob";
import { findSourceProfileBySlug } from "@/lib/source";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const profile = await findSourceProfileBySlug(slug);
  if (!profile?.logoPath?.startsWith("source/logos/")) {
    return new Response("Not found", { status: 404 });
  }
  if (!profile.published) {
    const { userId } = await auth();
    if (userId !== profile.userId) {
      return new Response("Not found", { status: 404 });
    }
  }

  const result = await get(profile.logoPath, {
    access: "private",
    useCache: false,
    ...(await blobAuth()),
  });
  if (!result?.stream || result.statusCode !== 200) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
