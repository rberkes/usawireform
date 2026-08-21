import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { listDirectoryLeads } from "@/lib/leads";
import { Page, PageHero, TextLink } from "@/components/ui";

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
  const ok = await isAdmin();

  if (!ok) {
    return (
      <AdminLogin next="/admin/leads" error={error} title="Directory leads" />
    );
  }

  const blobs = await listDirectoryLeads();

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Directory leads"
        lede={`${blobs.length} stored files under leads/directory/.`}
      />
      <p className="mt-6 text-sm text-muted">
        <TextLink href="/admin">Quote files</TextLink>
      </p>
      {blobs.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No stored leads yet. Forms need BLOB_READ_WRITE_TOKEN.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border border-line">
          {blobs.map((blob) => (
            <li
              key={blob.pathname}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
            >
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
