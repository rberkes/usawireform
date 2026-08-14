import type { Metadata } from "next";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { listLeads, isLeadStorageConfigured, type LeadRecord } from "@/lib/leads";
import { LoginForm } from "./LoginForm";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<LeadRecord["type"], string> = {
  "directory-inquiry": "Directory form",
  "outbound-capture": "Outbound click",
  "outbound-revisit": "Outbound revisit",
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default async function AdminLeadsPage() {
  if (!isAdminConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="text-2xl font-medium">Leads</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          This page is not set up yet. Add an{" "}
          <code className="bg-inset px-1.5 py-0.5">ADMIN_LEADS_PASSWORD</code>{" "}
          environment variable to enable it, then reload.
        </p>
      </main>
    );
  }

  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="text-2xl font-medium">Leads</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to view directory and outbound-link leads.
        </p>
        <LoginForm />
      </main>
    );
  }

  const storageReady = isLeadStorageConfigured();
  const leads = await listLeads();

  const byType = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.type] = (acc[lead.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">Leads</h1>
          <p className="mt-1 text-sm text-muted">
            Directory inquiries and outbound-link captures, newest first.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/admin/leads/export"
            className="border border-line px-4 py-2 text-sm transition-colors hover:border-copper hover:text-copper"
          >
            Export CSV
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-copper hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {!storageReady && (
        <div className="mt-6 border border-copper/40 bg-copper/5 p-4 text-sm leading-6">
          <strong className="text-copper">Storage not configured.</strong>{" "}
          Leads are only appearing in server logs (and email, if Resend is
          set up). Add a <code className="bg-inset px-1.5 py-0.5">BLOB_READ_WRITE_TOKEN</code>{" "}
          environment variable (Vercel Blob) so leads persist here.
        </div>
      )}

      <div className="mt-8 grid gap-px bg-line sm:grid-cols-4">
        <div className="bg-background p-5">
          <p className="font-mono text-2xl text-copper">{leads.length}</p>
          <p className="mt-1 text-sm text-muted">Total leads</p>
        </div>
        {Object.entries(TYPE_LABELS).map(([type, label]) => (
          <div key={type} className="bg-background p-5">
            <p className="font-mono text-2xl text-copper">{byType[type] ?? 0}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-x-auto">
        {leads.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            No leads captured yet.
          </p>
        ) : (
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="py-3 pr-4 font-medium">Received</th>
                <th className="py-3 pr-4 font-medium">Type</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Visitor</th>
                <th className="py-3 pr-4 font-medium">Referred company</th>
                <th className="py-3 pr-4 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-line/60 align-top">
                  <td className="py-3 pr-4 whitespace-nowrap text-muted">
                    {formatDate(lead.receivedAt)}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    {TYPE_LABELS[lead.type]}
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-copper hover:underline"
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td className="py-3 pr-4">
                    {lead.visitorName && <div>{lead.visitorName}</div>}
                    {lead.visitorCompany && (
                      <div className="text-muted">{lead.visitorCompany}</div>
                    )}
                    {lead.visitorPhone && (
                      <div className="text-muted">{lead.visitorPhone}</div>
                    )}
                    {!lead.visitorName && !lead.visitorCompany && !lead.visitorPhone && (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={`/directory/${lead.referredCompanySlug}`}
                      className="text-copper hover:underline"
                    >
                      {lead.referredCompany}
                    </a>
                  </td>
                  <td className="py-3 pr-4 max-w-xs text-muted">
                    {lead.message || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
