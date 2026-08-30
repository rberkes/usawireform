"use client";

import { useState } from "react";

interface DirectoryLeadFormProps {
  companyName: string;
  companySlug: string;
  className?: string;
}

export function DirectoryLeadForm({
  companyName,
  companySlug,
  className = "",
}: DirectoryLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    company: "",
    linkedin: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/directory-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referredCompany: companyName,
          referredCompanySlug: companySlug,
          source: "directory",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus("success");
          setFormData({
            name: "",
            title: "",
            email: "",
            phone: "",
            company: "",
            linkedin: "",
            message: "",
          });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`border border-copper/30 bg-copper/5 p-6 ${className}`}>
        <p className="text-center text-copper font-medium">
          Thank you for your inquiry about {companyName}.
        </p>
        <p className="mt-2 text-center text-sm text-muted">
          We&apos;ll connect you with the right contact shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="border-b border-line pb-4 mb-4">
        <h3 className="text-lg font-medium">Request information about {companyName}</h3>
        <p className="mt-1 text-sm text-muted">
          Fill out the form below. We route the inquiry and notify the shop desk.
          Ask for purchasing, the plant manager, or the owner.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name <span className="text-copper">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Purchasing, plant manager, owner…"
            className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email <span className="text-copper">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Your Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="linkedin" className="block text-sm font-medium mb-1">
            Your LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="https://www.linkedin.com/in/…"
            className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Project details
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Wire diameter, material, quantity, and application..."
          className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-copper px-6 py-3 text-sm font-medium text-background hover:bg-copper/90 disabled:opacity-50 transition-colors"
      >
        {status === "submitting" ? "Sending..." : "Get Connected"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-500 text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <p className="text-xs text-muted text-center">
        By submitting, you agree to our{" "}
        <a href="/terms" className="underline hover:text-copper">
          User Agreement
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-copper">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
