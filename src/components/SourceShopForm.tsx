"use client";

import { useActionState } from "react";
import { updateSourceShop, type SourceFormState } from "@/app/actions/source";
import { Button, ButtonLink, fieldClass, Panel } from "@/components/ui";

const initial: SourceFormState = { success: false, message: "" };

export function SourceShopForm({
  company,
  name,
  phone,
  city,
  state,
  website,
  blurb,
  slug,
}: {
  company: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  website: string;
  blurb: string;
  slug?: string;
}) {
  const [formState, action, pending] = useActionState(updateSourceShop, initial);

  return (
    <form action={action} className="space-y-4">
      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Shop
        </p>
        <p className="text-sm leading-6 text-muted">
          This is the public listing. Google indexes{" "}
          {slug ? (
            <a
              href={`/directory/${slug}`}
              className="text-copper hover:underline"
            >
              /directory/{slug}
            </a>
          ) : (
            "/directory/your-shop"
          )}
          . Email stays off that page.
        </p>
        <label className="block text-sm">
          Shop name
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="company"
            required
            defaultValue={company}
            autoComplete="organization"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Your name
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="name"
              defaultValue={name}
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            Phone
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="phone"
              defaultValue={phone}
              autoComplete="tel"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            City
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="city"
              defaultValue={city}
              autoComplete="address-level2"
            />
          </label>
          <label className="block text-sm">
            State
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="state"
              defaultValue={state}
              autoComplete="address-level1"
            />
          </label>
        </div>
        <label className="block text-sm">
          Website
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="website"
            defaultValue={website}
            placeholder="https://"
            autoComplete="url"
          />
        </label>
        <label className="block text-sm">
          Public note
          <textarea
            className={`${fieldClass} mt-1.5 min-h-24`}
            name="blurb"
            defaultValue={blurb}
            placeholder="What the floor runs. Keep it short."
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save shop"}
          </Button>
          {slug ? (
            <ButtonLink href={`/directory/${slug}`} variant="ghost">
              View public page
            </ButtonLink>
          ) : null}
        </div>
        {formState.message ? (
          <p
            className={`text-sm leading-6 ${
              formState.success ? "text-foreground" : "text-copper"
            }`}
          >
            {formState.message}
          </p>
        ) : null}
      </Panel>
    </form>
  );
}
