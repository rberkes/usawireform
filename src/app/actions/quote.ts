"use server";

import { QUOTE_EMAIL, COMPANY } from "@/lib/company";

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

  // In production, integrate with:
  // - Email service (Resend, SendGrid, AWS SES)
  // - CRM (Salesforce, HubSpot)
  // - Database (store lead data)
  // - File storage (S3, Vercel Blob for the drawing)

  // For now, log the submission (in production, remove this)
  console.log("[Quote Request]", {
    ...data,
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));

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

  console.log("[Quick Quote]", {
    ...data,
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: `Quote request received. We'll review ${data.fileName} and follow up at ${data.email}.`,
  };
}
