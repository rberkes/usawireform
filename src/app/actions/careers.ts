"use server";

import { Resend } from "resend";
import { put } from "@vercel/blob";
import { blobAuth, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { COMPANY, QUOTE_EMAIL } from "@/lib/company";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export type JobApplicationState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

type JobApplicationData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resumeUrl?: string;
  resumeName?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitJobApplication(
  _prevState: JobApplicationState,
  formData: FormData
): Promise<JobApplicationState> {
  const data: JobApplicationData = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    position: String(formData.get("position") ?? "").trim(),
    experience: String(formData.get("experience") ?? "").trim(),
    coverLetter: String(formData.get("coverLetter") ?? "").trim(),
  };

  const authorized = formData.get("authorized") === "on";
  const resumeFile = formData.get("resume") as File | null;

  // Validation
  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Name is required";
  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Invalid email address";
  if (!data.phone) errors.phone = "Phone is required";
  if (!data.position) errors.position = "Please select a position";
  if (!data.experience) errors.experience = "Please select experience level";
  if (!data.coverLetter) errors.coverLetter = "Please tell us why you're interested";
  if (!authorized) errors.authorized = "You must be authorized to work in the US";
  
  if (!resumeFile || resumeFile.size === 0) {
    errors.resume = "Resume is required";
  } else if (resumeFile.size > 10 * 1024 * 1024) {
    errors.resume = "Resume must be under 10MB";
  } else {
    const ext = resumeFile.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext ?? "")) {
      errors.resume = "Please upload a PDF or Word document";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  // Upload resume to Vercel Blob (if configured)
  if (resumeFile && (await blobReady())) {
    try {
      const timestamp = Date.now();
      const safeName = data.name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const ext = resumeFile.name.split(".").pop();
      const filename = `resumes/${safeName}_${timestamp}.${ext}`;
      
      const blob = await put(filename, resumeFile, {
        access: BLOB_ACCESS,
        addRandomSuffix: false,
        ...(await blobAuth()),
      });
      
      data.resumeUrl = blob.url;
      data.resumeName = resumeFile.name;
    } catch (error) {
      console.error("[Resume Upload Error]", error);
      // Continue without upload - will note in email
    }
  }

  // Send notification email (if Resend configured)
  if (resend && process.env.RESEND_FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: QUOTE_EMAIL,
        subject: `New Job Application: ${data.position} - ${data.name}`,
        html: `
          <h2>New Job Application</h2>
          <p><strong>Position:</strong> ${data.position}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Experience:</strong> ${data.experience} years</p>
          <hr />
          <h3>Cover Letter / Interest</h3>
          <p>${data.coverLetter.replace(/\n/g, "<br />")}</p>
          <hr />
          <p><strong>Resume:</strong> ${
            data.resumeUrl 
              ? `<a href="${data.resumeUrl}">${data.resumeName}</a>` 
              : "Not uploaded (Blob storage not configured)"
          }</p>
          <hr />
          <p><small>Submitted at ${new Date().toISOString()}</small></p>
        `,
      });
    } catch (error) {
      console.error("[Email Send Error]", error);
      // Continue - still log the application
    }
  }

  // Always log for debugging/backup
  console.log("[Job Application]", {
    ...data,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: `Thank you for applying, ${data.name}! We've received your application for ${data.position}. Our team will review it and contact you if your qualifications match our needs.`,
  };
}
