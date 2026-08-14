"use server";

import { Resend } from "resend";
import { put } from "@vercel/blob";
import { QUOTE_EMAIL, COMPANY } from "@/lib/company";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export type QuoteFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  linkedin: string;
  phone: string;
  material: string;
  diameter: string;
  targetPrice: string;
  timeline: string;
  quality: string;
  notes: string;
  fileName?: string;
  fileSize?: number;
};

export type QuickQuoteFormData = {
  email: string;
  linkedin: string;
  targetPrice: string;
  timeline: string;
  quality: string;
  fileName?: string;
  fileSize?: number;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidLinkedIn(url: string): boolean {
  try {
    const parsed = new URL(
      url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`
    );
    return /(^|\.)linkedin\.com$/i.test(parsed.hostname);
  } catch {
    return false;
  }
}

export async function submitContactForm(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const data: ContactFormData = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    linkedin: String(formData.get("linkedin") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    material: String(formData.get("material") ?? "").trim(),
    diameter: String(formData.get("diameter") ?? "").trim(),
    targetPrice: String(formData.get("targetPrice") ?? "").trim(),
    timeline: String(formData.get("timeline") ?? "").trim(),
    quality: String(formData.get("quality") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim(),
  };

  const file = formData.get("drawing") as File | null;
  if (file && file.size > 0) {
    data.fileName = file.name;
    data.fileSize = file.size;
  }

  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Name is required";
  if (!data.company) errors.company = "Company is required";
  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Invalid email address";
  if (!data.linkedin) errors.linkedin = "LinkedIn URL is required";
  else if (!isValidLinkedIn(data.linkedin))
    errors.linkedin = "Invalid LinkedIn URL";
  if (!data.phone) errors.phone = "Phone is required";
  if (!data.material) errors.material = "Material is required";
  if (!data.diameter) errors.diameter = "Wire diameter is required";
  if (!data.targetPrice) errors.targetPrice = "Target price is required";
  if (!data.timeline) errors.timeline = "Timeline is required";
  if (!data.quality) errors.quality = "Quality standard is required";
  if (!data.notes) errors.notes = "Part notes are required";
  if (!data.fileName) errors.drawing = "Drawing file is required";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  // Upload drawing to Vercel Blob if configured
  let drawingUrl: string | undefined;
  if (file && file.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const timestamp = Date.now();
      const safeCompany = data.company.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const ext = file.name.split(".").pop();
      const blobFilename = `quotes/${safeCompany}_${timestamp}.${ext}`;
      
      const blob = await put(blobFilename, file, {
        access: "public",
        addRandomSuffix: false,
      });
      
      drawingUrl = blob.url;
    } catch (error) {
      console.error("[Drawing Upload Error]", error);
    }
  }

  // Send notification email if Resend configured
  if (resend && process.env.RESEND_FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: QUOTE_EMAIL,
        replyTo: data.email,
        subject: `Quote Request: ${data.company} - ${data.material} ${data.diameter}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Contact:</strong> ${data.name}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>LinkedIn:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <hr />
          <h3>Part Details</h3>
          <p><strong>Material:</strong> ${data.material}</p>
          <p><strong>Wire Diameter:</strong> ${data.diameter}</p>
          <p><strong>Target Price:</strong> ${data.targetPrice}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Quality Standard:</strong> ${data.quality}</p>
          <h4>Notes:</h4>
          <p>${data.notes.replace(/\n/g, "<br />")}</p>
          <hr />
          <p><strong>Drawing:</strong> ${
            drawingUrl 
              ? `<a href="${drawingUrl}">${data.fileName}</a>` 
              : data.fileName || "Not uploaded"
          }</p>
          <hr />
          <p><small>Submitted at ${new Date().toISOString()}</small></p>
        `,
      });
    } catch (error) {
      console.error("[Email Send Error]", error);
    }
  }

  // Always log for debugging
  console.log("[Quote Request]", {
    ...data,
    drawingUrl,
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  return {
    success: true,
    message: `Thank you, ${data.name}. Your quote request has been received. We'll review ${data.fileName} and respond within 1-2 business days.`,
  };
}

export async function submitQuickQuote(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const data: QuickQuoteFormData = {
    email: String(formData.get("email") ?? "").trim(),
    linkedin: String(formData.get("linkedin") ?? "").trim(),
    targetPrice: String(formData.get("targetPrice") ?? "").trim(),
    timeline: String(formData.get("timeline") ?? "").trim(),
    quality: String(formData.get("quality") ?? "").trim(),
  };

  const file = formData.get("drawing") as File | null;
  if (file && file.size > 0) {
    data.fileName = file.name;
    data.fileSize = file.size;
  }

  const errors: Record<string, string> = {};

  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Invalid email address";
  if (!data.linkedin) errors.linkedin = "LinkedIn URL is required";
  else if (!isValidLinkedIn(data.linkedin))
    errors.linkedin = "Invalid LinkedIn URL";
  if (!data.targetPrice) errors.targetPrice = "Target price is required";
  if (!data.timeline) errors.timeline = "Timeline is required";
  if (!data.quality) errors.quality = "Quality standard is required";
  if (!data.fileName) errors.drawing = "Drawing file is required";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please complete all required fields.",
      errors,
    };
  }

  // Upload drawing to Vercel Blob if configured
  let drawingUrl: string | undefined;
  if (file && file.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const timestamp = Date.now();
      const ext = file.name.split(".").pop();
      const blobFilename = `quick-quotes/${timestamp}.${ext}`;
      
      const blob = await put(blobFilename, file, {
        access: "public",
        addRandomSuffix: false,
      });
      
      drawingUrl = blob.url;
    } catch (error) {
      console.error("[Drawing Upload Error]", error);
    }
  }

  // Send notification email if Resend configured
  if (resend && process.env.RESEND_FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: QUOTE_EMAIL,
        replyTo: data.email,
        subject: `Quick Quote: ${data.timeline} - ${data.quality}`,
        html: `
          <h2>Quick Quote Request</h2>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>LinkedIn:</strong> <a href="${data.linkedin}">${data.linkedin}</a></p>
          <hr />
          <p><strong>Target Price:</strong> ${data.targetPrice}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Quality Standard:</strong> ${data.quality}</p>
          <hr />
          <p><strong>Drawing:</strong> ${
            drawingUrl 
              ? `<a href="${drawingUrl}">${data.fileName}</a>` 
              : data.fileName || "Not uploaded"
          }</p>
          <hr />
          <p><small>Submitted at ${new Date().toISOString()}</small></p>
        `,
      });
    } catch (error) {
      console.error("[Email Send Error]", error);
    }
  }

  console.log("[Quick Quote]", {
    ...data,
    drawingUrl,
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  return {
    success: true,
    message: `Quote request received. We'll review ${data.fileName} and follow up at ${data.email}.`,
  };
}
