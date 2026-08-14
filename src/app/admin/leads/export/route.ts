import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listLeads } from "@/lib/leads";

function csvCell(value: string | undefined): string {
  const text = (value ?? "").replace(/"/g, '""');
  return `"${text}"`;
}

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return new Response("Unauthorized", { status: 401 });
  }

  const leads = await listLeads();

  const header = [
    "Received",
    "Type",
    "Email",
    "Visitor name",
    "Visitor company",
    "Visitor phone",
    "Referred company",
    "Referred company slug",
    "Destination URL",
    "Message",
  ];

  const rows = leads.map((lead) =>
    [
      lead.receivedAt,
      lead.type,
      lead.email,
      lead.visitorName,
      lead.visitorCompany,
      lead.visitorPhone,
      lead.referredCompany,
      lead.referredCompanySlug,
      lead.destinationUrl,
      lead.message,
    ]
      .map(csvCell)
      .join(","),
  );

  const csv = [header.map(csvCell).join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="uwf-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
