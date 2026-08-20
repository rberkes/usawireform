import { isLeadsAdmin, loginLeadsAdmin } from "./actions";
import { listDirectoryLeads } from "@/lib/leads";
import { Page, PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Directory leads",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isLeadsAdmin();

  if (!ok) {
    return (
      <Page>
        <PageHero kicker="Admin" title="Directory leads" lede="Password required." />
        <form action={loginLeadsAdmin} className="mt-8 max-w-sm space-y-3">
          <label className="block text-sm">
            Password
            <input
              type="password"
              name="password"
              required
              className="mt-1.5 w-full border border-line bg-background px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="bg-copper px-5 py-2.5 text-sm font-medium text-white"
          >
            Open leads
          </button>
          {error ? (
            <p className="text-sm text-muted">Wrong password.</p>
          ) : null}
        </form>
      </Page>
    );
  }

  const blobs = await listDirectoryLeads();

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Directory leads"
        lede={`${blobs.length} stored files under leads/directory/. Emails go to rberkes@gmail.com until you switch the notify address.`}
      />
      {blobs.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No stored leads yet. Forms need BLOB_READ_WRITE_TOKEN. Resend sends
          the same payload to the notify inbox.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border border-line">
          {blobs.map((blob) => (
            <li key={blob.pathname} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <span className="font-mono text-xs">{blob.pathname}</span>
              <span className="text-muted">
                {blob.uploadedAt instanceof Date
                  ? blob.uploadedAt.toISOString()
                  : String(blob.uploadedAt)}
              </span>
              <a href={blob.url} className="text-copper hover:underline">
                Open
              </a>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
