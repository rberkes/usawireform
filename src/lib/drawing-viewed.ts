import { notifyQuoteBuyerOnDrawingView } from "@/lib/quotes";
import { notifySourceBuyerOnDrawingView } from "@/lib/source";

function isBuyerDrawingPath(path: string) {
  if (!path || path.includes("..") || path.endsWith(".json")) return false;
  return (
    path.startsWith("quick-quotes/") ||
    path.startsWith("quotes/") ||
    path.startsWith("source/jobs/")
  );
}

const inFlight = new Set<string>();

/** Once per drawing: buyer mail when an admin opens the file. */
export async function notifyBuyerOnAdminFileView(path: string) {
  if (!isBuyerDrawingPath(path) || inFlight.has(path)) return;
  inFlight.add(path);
  try {
    if (await notifyQuoteBuyerOnDrawingView(path)) return;
    await notifySourceBuyerOnDrawingView(path);
  } catch (error) {
    console.error("[Drawing viewed mail]", error);
  } finally {
    inFlight.delete(path);
  }
}
