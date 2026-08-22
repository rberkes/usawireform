import "server-only";

import Stripe from "stripe";
import { SITE_URL } from "@/lib/company";

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("Stripe is not configured");
  }
  return new Stripe(key);
}

export function appOrigin() {
  if (process.env.VERCEL_ENV === "production") return SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  return SITE_URL;
}
