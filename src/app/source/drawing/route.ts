import { get } from "@vercel/blob";
import { auth, currentUser } from "@clerk/nextjs/server";
import { blobAuth } from "@/lib/blob";
import {
  buyerOwnsJob,
  isSourceDrawingPath,
  shopMayViewDrawing,
} from "@/lib/source-access";
import { resolveSourceRole } from "@/lib/source-gate";
import { getSourceProfile, listSourceJobs } from "@/lib/source";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const path = new URL(request.url).searchParams.get("path") ?? "";
  const requestedName = new URL(request.url).searchParams.get("name") ?? "";
  if (!isSourceDrawingPath(path)) {
    return new Response("Not found", { status: 404 });
  }

  const [jobs, profile, user, role] = await Promise.all([
    listSourceJobs(),
    getSourceProfile(userId),
    currentUser(),
    resolveSourceRole(userId),
  ]);
  const job = jobs.find((row) => row.drawingPath === path);
  if (!job) {
    return new Response("Not found", { status: 404 });
  }

  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const allowed =
    (role === "buyer" && buyerOwnsJob(job, { userId, email })) ||
    (role === "supplier" &&
      shopMayViewDrawing(job, { userId, email, profile }));
  if (!allowed) {
    return new Response("Forbidden", { status: 403 });
  }

  const result = await get(path, {
    access: "private",
    useCache: false,
    ...(await blobAuth(request)),
  });
  if (!result?.stream || result.statusCode !== 200) {
    return new Response("Not found", { status: 404 });
  }
  const name = (requestedName || job.fileName || path.split("/").pop() || "drawing").replace(
    /["\\\r\n]/g,
    "_",
  );
  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
  });
}
