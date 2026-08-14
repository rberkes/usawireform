import { NextRequest } from "next/server";
import { Resend } from "resend";
import { QUOTE_EMAIL } from "@/lib/company";
import { getDirectoryCompany } from "@/lib/directory";
import { recordLead } from "@/lib/leads";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface DirectoryLead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  referredCompany: string;
  referredCompanySlug: string;
  source: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: DirectoryLead = await request.json();

    if (!data.name || !data.email || !data.referredCompany) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Resolve against our own directory data so the stored record reflects
    // the real listing even if the client payload were tampered with.
    const company = getDirectoryCompany(data.referredCompanySlug);
    const referredCompany = company?.name ?? data.referredCompany;

    const receivedAt = new Date().toISOString();
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    console.log("Directory Lead Received:", { ...data, referredCompany, receivedAt, ip, userAgent });

    await recordLead({
      type: "directory-inquiry",
      email: data.email,
      visitorName: data.name,
      visitorCompany: data.company,
      visitorPhone: data.phone,
      message: data.message,
      referredCompany,
      referredCompanySlug: data.referredCompanySlug,
      receivedAt,
      ip,
      userAgent,
    });

    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: QUOTE_EMAIL,
          replyTo: data.email,
          subject: `Directory inquiry: ${data.name} → ${referredCompany}`,
          html: `
            <h2>Directory inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
            <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
            <p><strong>Their company:</strong> ${escapeHtml(data.company || "Not provided")}</p>
            <p><strong>Message:</strong> ${escapeHtml(data.message || "None").replace(/\n/g, "<br />")}</p>
            <hr />
            <p><strong>Asking about:</strong> ${escapeHtml(referredCompany)}</p>
            <hr />
            <p><small>${escapeHtml(receivedAt)} · ${escapeHtml(ip)}</small></p>
          `,
        });
      } catch (error) {
        console.error("[Directory Lead Email Error]", error);
      }
    }

    return Response.json({
      success: true,
      message: `Lead for ${referredCompany} received. Contact: ${QUOTE_EMAIL}`,
    });
  } catch (error) {
    console.error("Directory lead error:", error);
    return Response.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
