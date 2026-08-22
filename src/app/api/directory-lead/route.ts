import { NextRequest } from "next/server";
import {
  emailDirectoryLead,
  sendLeadThanksEmail,
  storeDirectoryLead,
  type DirectoryLeadRecord,
} from "@/lib/leads";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<DirectoryLeadRecord>;
    const lead: DirectoryLeadRecord = {
      name: String(body.name ?? "").trim(),
      title: String(body.title ?? "").trim(),
      email: String(body.email ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      company: String(body.company ?? "").trim(),
      linkedin: String(body.linkedin ?? "").trim(),
      message: String(body.message ?? "").trim(),
      referredCompany: String(body.referredCompany ?? "").trim(),
      referredCompanySlug: String(body.referredCompanySlug ?? "").trim(),
      source: String(body.source ?? "directory").trim(),
      timestamp: new Date().toISOString(),
    };

    if (!lead.name || !lead.email || !lead.referredCompany) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isEmail(lead.email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    let stored = false;
    let emailed = false;
    try {
      stored = await storeDirectoryLead(lead);
    } catch (error) {
      console.error("[Directory lead store]", error);
    }
    try {
      const [shop] = await Promise.all([
        emailDirectoryLead(lead),
        sendLeadThanksEmail({
          to: lead.email,
          name: lead.name,
          kind: "directory",
        }),
      ]);
      emailed = shop;
    } catch (error) {
      console.error("[Directory lead email]", error);
    }

    console.log("[Directory lead]", {
      referredCompany: lead.referredCompany,
      email: lead.email,
      stored,
      emailed,
    });

    if (!stored && !emailed) {
      return Response.json(
        {
          error:
            "Lead did not store. Email rberkes@gmail.com.",
        },
        { status: 503 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Directory lead error:", error);
    return Response.json({ error: "Failed to process lead" }, { status: 500 });
  }
}
