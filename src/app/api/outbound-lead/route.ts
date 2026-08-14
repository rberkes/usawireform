import { NextRequest } from "next/server";
import { Resend } from "resend";
import { QUOTE_EMAIL, SITE_URL } from "@/lib/company";
import { getDirectoryCompany } from "@/lib/directory";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface OutboundLead {
  email: string;
  visitorCompany?: string;
  referredCompanySlug: string;
  event?: "capture" | "revisit";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const data: OutboundLead = await request.json();
    const email = (data.email ?? "").trim();
    const event = data.event === "revisit" ? "revisit" : "capture";

    if (!email || !data.referredCompanySlug) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Resolve the company and its destination from our own data. Nothing about
    // the attribution comes from the request body, so it cannot be spoofed.
    const company = getDirectoryCompany(data.referredCompanySlug);
    if (!company?.website) {
      return Response.json({ error: "Unknown company" }, { status: 400 });
    }

    const lead = {
      email,
      visitorCompany: (data.visitorCompany ?? "").trim() || undefined,
      referredCompany: company.name,
      referredCompanySlug: company.slug,
      referredCompanyLocation: company.location,
      destinationUrl: company.website,
      directoryPage: `${SITE_URL}/directory/${company.slug}`,
      event,
      receivedAt: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? "unknown",
      referer: request.headers.get("referer") ?? "unknown",
    };

    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: QUOTE_EMAIL,
          replyTo: email,
          subject:
            event === "capture"
              ? `Outbound lead: ${email} → ${company.name}`
              : `Outbound revisit: ${email} → ${company.name}`,
          html: `
            <h2>Directory outbound ${event === "capture" ? "lead" : "revisit"}</h2>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Their company:</strong> ${escapeHtml(lead.visitorCompany ?? "Not provided")}</p>
            <hr />
            <h3>Left for</h3>
            <p><strong>Company:</strong> ${escapeHtml(company.name)}</p>
            <p><strong>Location:</strong> ${escapeHtml(company.location)}</p>
            <p><strong>Destination:</strong> <a href="${escapeHtml(lead.destinationUrl)}">${escapeHtml(lead.destinationUrl)}</a></p>
            <p><strong>Our page:</strong> <a href="${escapeHtml(lead.directoryPage)}">${escapeHtml(lead.directoryPage)}</a></p>
            <hr />
            <p><small>${escapeHtml(lead.receivedAt)} · ${escapeHtml(lead.ip)}</small></p>
          `,
        });
      } catch (error) {
        console.error("[Outbound Lead Email Error]", error);
      }
    }

    console.log("[Outbound Lead]", lead);

    return Response.json({ success: true, referredCompany: company.name });
  } catch (error) {
    console.error("[Outbound Lead Error]", error);
    return Response.json({ error: "Failed to process lead" }, { status: 500 });
  }
}
