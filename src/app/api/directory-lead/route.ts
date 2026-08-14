import { NextRequest } from "next/server";
import { QUOTE_EMAIL } from "@/lib/company";

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

    // Log the lead for tracking (in production, save to database or send email)
    console.log("Directory Lead Received:", {
      ...data,
      receivedAt: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    // In production, you would:
    // 1. Save to database (e.g., leads table)
    // 2. Send notification email to QUOTE_EMAIL
    // 3. Potentially notify the referred company

    // For now, return success
    return Response.json({
      success: true,
      message: `Lead for ${data.referredCompany} received. Contact: ${QUOTE_EMAIL}`,
    });
  } catch (error) {
    console.error("Directory lead error:", error);
    return Response.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
