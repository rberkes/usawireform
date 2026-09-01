import { purgeKnownTestRecords } from "@/lib/purge-test-records";
import { sendDueSourceRegistrationReminders } from "@/lib/source-reminders";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

function cronAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  await purgeKnownTestRecords();
  const result = await sendDueSourceRegistrationReminders();
  return Response.json({ ok: true, ...result });
}