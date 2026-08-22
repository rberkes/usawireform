"use client";

import { useActionState } from "react";
import { updateSourceShop, type SourceFormState } from "@/app/actions/source";
import { Button, ButtonLink, fieldClass, Panel } from "@/components/ui";
import { ReleaseDirectoryClaimForm } from "@/components/ReleaseDirectoryClaimForm";

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
  claimedDirectory = false,
  logoUrl,
  plantStreet = "",
  plantProofUrl = "",
  plantVerified = false,
}: {
  company: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  website: string;
  blurb: string;
  slug?: string;
  claimedDirectory?: boolean;
  logoUrl?: string;
  plantStreet?: string;
  plantProofUrl?: string;
  plantVerified?: boolean;
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
          Plant street
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="plantStreet"
            defaultValue={plantStreet}
            autoComplete="street-address"
            placeholder="123 Industrial Ave"
          />
        </label>
        <label className="block text-sm">
          Floor proof URL
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="plantProofUrl"
            defaultValue={plantProofUrl}
            placeholder="https:// — equipment or facility page"
            autoComplete="url"
          />
        </label>
        {plantVerified ? (
          <p className="text-sm leading-6 text-muted">
            Plant check passed. Sales and sourcing offices stay off the USA
            factories page.
          </p>
        ) : (
          <label className="flex items-start gap-2 text-sm leading-6">
            <input
              className="mt-1"
              type="checkbox"
              name="plantAttest"
              value="1"
            />
            <span>
              This location forms wire or strip on the floor. Not a sales
              office, sourcing desk, or manufacturer’s rep.
            </span>
          </label>
        )}
        <label className="block text-sm">
          Logo
          {logoUrl ? (
            <img
              src={logoUrl}
              alt=""
              className="mt-1.5 h-16 w-auto max-w-[12rem] object-contain"
            />
          ) : null}
          <input
            className="mt-1.5 block text-sm"
            name="logo"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
          />
        </label>
        {logoUrl ? (
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" name="removeLogo" value="1" />
            Remove logo
          </label>
        ) : (
          <p className="text-sm leading-6 text-muted">
            PNG, JPG, WebP, or GIF. Under 2 MB. Shows on the public listing.
          </p>
        )}
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
        {claimedDirectory && company ? (
          <div className="border-t border-line pt-4">
            <ReleaseDirectoryClaimForm company={company} />
          </div>
        ) : null}
      </Panel>
    </form>
  );
}
