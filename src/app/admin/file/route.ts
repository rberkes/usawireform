import { get } from "@vercel/blob";
import { isAdmin } from "../actions";
import { blobAuth, isAdminBlobPath } from "@/lib/blob";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }
  const path = new URL(request.url).searchParams.get("path") ?? "";
  const requestedName = new URL(request.url).searchParams.get("name") ?? "";
  if (!isAdminBlobPath(path)) {
    return new Response("Not found", { status: 404 });
  }
  const result = await get(path, {
    access: "private",
    useCache: false,
    ...(await blobAuth(request)),
  });
  if (!result?.stream || result.statusCode !== 200) {
    return new Response("Not found", { status: 404 });
  }
  const name = (requestedName || path.split("/").pop() || "file").replace(
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
