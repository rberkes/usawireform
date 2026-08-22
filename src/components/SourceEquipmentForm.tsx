"use client";

import { useActionState, useState } from "react";
import {
  submitSourceEquipment,
  type SourceFormState,
} from "@/app/actions/source";
import { Button, fieldClass, Panel } from "@/components/ui";
import {
  SOURCE_OEM_NAMES,
  ironPickByName,
  ironSeries,
  machinesForOem,
} from "@/lib/source-iron";
import { SOURCE_KINDS, type SourceMachine } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };
const OTHER_MODEL = "__other__";

function emptyMachine(): SourceMachine {
  return {
    oem: "Numalliance",
    model: "",
    kind: "3D CNC",
    minMm: "",
    maxMm: "",
    city: "",
  };
}

function oemSelectValue(oem: string) {
  if (SOURCE_OEM_NAMES.includes(oem) && oem !== "Other") return oem;
  return "Other";
}

export function SourceEquipmentForm({
  inviteId,
  company: companyPrefill = "",
  email: emailPrefill = "",
}: {
  inviteId?: string;
  company?: string;
  email?: string;
}) {
  const [state, action, pending] = useActionState(submitSourceEquipment, initial);
  const [machines, setMachines] = useState<SourceMachine[]>([emptyMachine()]);
  const [customModel, setCustomModel] = useState<boolean[]>([false]);

  function patch(index: number, next: SourceMachine) {
    setMachines((rows) => rows.map((row, i) => (i === index ? next : row)));
  }

  function setRowCustom(index: number, value: boolean) {
    setCustomModel((flags) => {
      const next = [...flags];
      next[index] = value;
      return next;
    });
  }

  return (
    <form action={action} className="space-y-6">
      {inviteId ? <input type="hidden" name="inviteId" value={inviteId} /> : null}
      <input type="hidden" name="machines" value={JSON.stringify(machines)} />

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Register the shop
        </p>
        <label className="block text-sm">
          Shop name
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="company"
            required
            defaultValue={companyPrefill}
            autoComplete="organization"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Your name
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="name"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            Email
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="email"
              type="email"
              required
              defaultValue={emailPrefill}
              autoComplete="email"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm">
            Phone
            <input className={`mt-1.5 ${fieldClass}`} name="phone" autoComplete="tel" />
          </label>
          <label className="block text-sm">
            City
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="city"
              autoComplete="address-level2"
            />
          </label>
          <label className="block text-sm">
            State
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="state"
              autoComplete="address-level1"
            />
          </label>
        </div>
        <label className="block text-sm">
          Website
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="website"
            type="url"
            placeholder="https://"
            autoComplete="url"
          />
        </label>
      </Panel>

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Equipment on the floor
        </p>
        <p className="text-sm leading-6 text-muted">
          Pick the OEM, then the model. Type and wire band come from that
          catalog row — confirm the plate on the cell.
        </p>
        {machines.map((row, index) => {
          const catalog = machinesForOem(row.oem);
          const listed = catalog.some((item) => item.name === row.model);
          const otherModel = customModel[index] === true;
          const modelSelect = otherModel
            ? OTHER_MODEL
            : listed
              ? row.model
              : "";
          const otherOem = oemSelectValue(row.oem) === "Other";
          return (
            <div
              key={index}
              className="grid gap-3 border border-line p-3 sm:grid-cols-6"
            >
              <label className="block text-sm sm:col-span-2">
                OEM
                <select
                  className={`mt-1.5 ${fieldClass}`}
                  value={oemSelectValue(row.oem)}
                  onChange={(event) => {
                    const oem = event.target.value;
                    setRowCustom(index, false);
                    patch(index, {
                      ...row,
                      oem: oem === "Other" ? "" : oem,
                      model: "",
                      minMm: "",
                      maxMm: "",
                    });
                  }}
                >
                  {SOURCE_OEM_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm sm:col-span-2">
                Model
                {catalog.length > 0 ? (
                  <select
                    className={`mt-1.5 ${fieldClass}`}
                    value={modelSelect}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value === OTHER_MODEL) {
                        setRowCustom(index, true);
                        patch(index, { ...row, model: "" });
                        return;
                      }
                      const pick = ironPickByName(row.oem, value);
                      setRowCustom(index, false);
                      patch(index, {
                        ...row,
                        model: value,
                        kind: pick?.kind ?? row.kind,
                        minMm: pick?.minMm ?? row.minMm,
                        maxMm: pick?.maxMm ?? row.maxMm,
                      });
                    }}
                  >
                    <option value="">Select a model</option>
                    {ironSeries(catalog).map((series) => (
                      <optgroup key={series} label={series}>
                        {catalog
                          .filter((item) => item.series === series)
                          .map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name} · {item.minMm}–{item.maxMm} mm
                            </option>
                          ))}
                      </optgroup>
                    ))}
                    <option value={OTHER_MODEL}>Other — type it</option>
                  </select>
                ) : (
                  <input
                    className={`mt-1.5 ${fieldClass}`}
                    value={row.model}
                    onChange={(event) =>
                      patch(index, { ...row, model: event.target.value })
                    }
                    placeholder="Model"
                  />
                )}
                {catalog.length > 0 && otherModel ? (
                  <input
                    className={`mt-1.5 ${fieldClass}`}
                    value={row.model}
                    onChange={(event) =>
                      patch(index, { ...row, model: event.target.value })
                    }
                    placeholder="Model as on the plate"
                  />
                ) : null}
              </label>
              <label className="block text-sm sm:col-span-2">
                Type
                {listed && !otherModel ? (
                  <p className={`mt-1.5 ${fieldClass} text-muted`}>
                    {row.kind || "From the model"}
                  </p>
                ) : (
                  <select
                    className={`mt-1.5 ${fieldClass}`}
                    value={row.kind}
                    onChange={(event) =>
                      patch(index, { ...row, kind: event.target.value })
                    }
                  >
                    {SOURCE_KINDS.map((kind) => (
                      <option key={kind} value={kind}>
                        {kind}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              <label className="block text-sm sm:col-span-3">
                Min mm
                <input
                  className={`mt-1.5 ${fieldClass}`}
                  inputMode="decimal"
                  value={row.minMm}
                  onChange={(event) =>
                    patch(index, { ...row, minMm: event.target.value })
                  }
                  placeholder="4"
                />
              </label>
              <label className="block text-sm sm:col-span-3">
                Max mm
                <input
                  className={`mt-1.5 ${fieldClass}`}
                  inputMode="decimal"
                  value={row.maxMm}
                  onChange={(event) =>
                    patch(index, { ...row, maxMm: event.target.value })
                  }
                  placeholder="14"
                />
              </label>
              {otherOem ? (
                <label className="block text-sm sm:col-span-6">
                  OEM name
                  <input
                    className={`mt-1.5 ${fieldClass}`}
                    value={row.oem}
                    onChange={(event) =>
                      patch(index, { ...row, oem: event.target.value })
                    }
                    placeholder="Manufacturer"
                  />
                </label>
              ) : null}
            </div>
          );
        })}
        <button
          type="button"
          className="text-sm text-copper hover:underline"
          onClick={() => {
            setMachines([...machines, emptyMachine()]);
            setCustomModel([...customModel, false]);
          }}
        >
          Add another cell
        </button>
        <label className="block text-sm">
          Or upload a list (CSV, PDF, XLSX)
          <input className="mt-1.5 block text-sm" name="list" type="file" />
        </label>
        <label className="block text-sm">
          Notes
          <textarea
            className={`${fieldClass} mt-1.5 min-h-24`}
            name="notes"
            placeholder="Heads, coil vs bar, qty cap, sold cells."
          />
        </label>
      </Panel>

      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Register and upload equipment"}
      </Button>
      {state.message ? (
        <p
          className={`text-sm leading-6 ${
            state.success ? "text-foreground" : "text-copper"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
