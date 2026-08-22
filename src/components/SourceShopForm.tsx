"use client";

import { useActionState } from "react";
import { updateSourceShop, type SourceFormState } from "@/app/actions/source";
import { Button, ButtonLink, fieldClass, Panel } from "@/components/ui";
import { ReleaseDirectoryClaimForm } from "@/components/ReleaseDirectoryClaimForm";
import {
  SOURCE_COIL_POLICIES,
  SOURCE_MIN_ORDER_KINDS,
  SOURCE_PROTOTYPE_POLICIES,
  SOURCE_SETUP_FEE_KINDS,
  SOURCE_STOCK_MATERIALS,
  type SourceBuyerFit,
} from "@/lib/source-fit";
import { SOURCE_FIT_LINE } from "@/lib/source-plans";

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
  fit,
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
  fit?: SourceBuyerFit;
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
        {claimedDirectory && company ? (
          <div className="border-t border-line pt-4">
            <ReleaseDirectoryClaimForm company={company} />
          </div>
        ) : null}
      </Panel>

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Buyer fit · Free
        </p>
        <p className="text-sm leading-6 text-muted">
          {SOURCE_FIT_LINE} No card. Blank stays off the public page.
        </p>

        <fieldset>
          <legend className="text-sm">Minimum order</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {SOURCE_MIN_ORDER_KINDS.map((row) => (
              <label
                key={row.id}
                className="flex cursor-pointer items-center gap-2 border border-line bg-background px-3 py-2 text-sm has-[:checked]:border-copper"
              >
                <input
                  type="radio"
                  name="minOrderKind"
                  value={row.id}
                  defaultChecked={fit?.minOrderKind === row.id}
                />
                {row.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Piece minimum
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="minOrderQty"
              inputMode="numeric"
              defaultValue={fit?.minOrderQty ?? ""}
              placeholder="1000"
            />
          </label>
          <label className="block text-sm">
            Dollar minimum, if any
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="minOrderUsd"
              inputMode="numeric"
              defaultValue={fit?.minOrderUsd ?? ""}
              placeholder="2500"
            />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm">Setup fee</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {SOURCE_SETUP_FEE_KINDS.map((row) => (
              <label
                key={row.id}
                className="flex cursor-pointer items-center gap-2 border border-line bg-background px-3 py-2 text-sm has-[:checked]:border-copper"
              >
                <input
                  type="radio"
                  name="setupFeeKind"
                  value={row.id}
                  defaultChecked={fit?.setupFeeKind === row.id}
                />
                {row.label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm">
          Fixed setup, USD
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="setupFeeUsd"
            inputMode="numeric"
            defaultValue={fit?.setupFeeUsd ?? ""}
            placeholder="350"
          />
        </label>

        <fieldset>
          <legend className="text-sm">Materials this floor stocks</legend>
          <p className="mt-1 text-xs leading-5 text-muted">
            Grades on the rack — not every alloy you can buy to print.
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {SOURCE_STOCK_MATERIALS.map((row) => (
              <li key={row.id}>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="stock"
                    value={row.id}
                    defaultChecked={fit?.stockedMaterials?.includes(row.id)}
                  />
                  {row.label}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="text-sm">Coil</legend>
          <div className="mt-2 grid gap-2">
            {SOURCE_COIL_POLICIES.map((row) => (
              <label
                key={row.id}
                className="flex cursor-pointer flex-col border border-line bg-background px-3 py-2 has-[:checked]:border-copper"
              >
                <span className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="coilPolicy"
                    value={row.id}
                    defaultChecked={fit?.coilPolicy === row.id}
                  />
                  {row.label}
                </span>
                <span className="mt-1 pl-6 text-xs leading-5 text-muted">
                  {row.hint}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Typical lead, weeks
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="leadTimeWeeks"
              inputMode="numeric"
              defaultValue={fit?.leadTimeWeeks ?? ""}
              placeholder="4"
            />
          </label>
          <label className="block text-sm">
            Quote turnaround, days
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="quoteDays"
              inputMode="numeric"
              defaultValue={fit?.quoteDays ?? ""}
              placeholder="2"
            />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm">Prototypes / first articles</legend>
          <div className="mt-2 grid gap-2">
            {SOURCE_PROTOTYPE_POLICIES.map((row) => (
              <label
                key={row.id}
                className="flex cursor-pointer items-center gap-2 border border-line bg-background px-3 py-2 text-sm has-[:checked]:border-copper"
              >
                <input
                  type="radio"
                  name="prototypePolicy"
                  value={row.id}
                  defaultChecked={fit?.prototypePolicy === row.id}
                />
                {row.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm">
          New RFQs
          <select
            className={`mt-1.5 ${fieldClass}`}
            name="acceptingRfqs"
            defaultValue={
              fit?.acceptingRfqs === true
                ? "yes"
                : fit?.acceptingRfqs === false
                  ? "no"
                  : ""
            }
          >
            <option value="">Not filed</option>
            <option value="yes">Accepting</option>
            <option value="no">Not listing new work</option>
          </select>
        </label>

        <label className="flex items-start gap-2 text-sm leading-6">
          <input
            className="mt-1"
            type="checkbox"
            name="rush"
            value="1"
            defaultChecked={fit?.rush === true}
          />
          Rush / overtime available
        </label>
        <label className="flex items-start gap-2 text-sm leading-6">
          <input
            className="mt-1"
            type="checkbox"
            name="itar"
            value="1"
            defaultChecked={fit?.itar === true}
          />
          ITAR registered
        </label>
        <label className="flex items-start gap-2 text-sm leading-6">
          <input
            className="mt-1"
            type="checkbox"
            name="ppap"
            value="1"
            defaultChecked={fit?.ppap === true}
          />
          PPAP / first-article pack
        </label>
      </Panel>

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
    </form>
  );
}
