"use client";

import { useState } from "react";
import { SourceKindCards } from "@/components/SourceKindCards";
import { fieldClass } from "@/components/ui";
import {
  ironPickByName,
  ironPickLabel,
  ironSeries,
  machinesForOem,
  oemsForKind,
  preferredOemForKind,
} from "@/lib/source-iron";
import type { SourceMachine } from "@/lib/source-types";

const OTHER_MODEL = "__other__";

export function emptySourceMachine(): SourceMachine {
  return {
    oem: "",
    model: "",
    kind: "",
    minMm: "",
    maxMm: "",
    city: "",
    year: "",
    capacity: "",
    stockedSizes: "",
  };
}

function oemSelectValue(oem: string, kind: string) {
  const names = oemsForKind(kind);
  if (names.includes(oem) && oem !== "Other") return oem;
  return oem.trim() ? "Other" : "";
}

export function SourceMachineRows({
  machines,
  onChange,
  maxRows,
}: {
  machines: SourceMachine[];
  onChange: (rows: SourceMachine[]) => void;
  maxRows?: number;
}) {
  const [customModel, setCustomModel] = useState<boolean[]>(() =>
    machines.map(() => false),
  );

  function patch(index: number, next: SourceMachine) {
    onChange(machines.map((row, i) => (i === index ? next : row)));
  }

  function setRowCustom(index: number, value: boolean) {
    setCustomModel((flags) => {
      const next = [...flags];
      next[index] = value;
      return next;
    });
  }

  function setKind(index: number, kind: string, row: SourceMachine) {
    const names = oemsForKind(kind);
    const keepOem =
      names.includes(oemSelectValue(row.oem, kind)) &&
      oemSelectValue(row.oem, kind) !== "Other";
    const oem = keepOem ? row.oem : preferredOemForKind(kind);
    const catalog = machinesForOem(oem, kind);
    const keepModel = catalog.some((item) => item.name === row.model);
    setRowCustom(index, false);
    patch(index, {
      ...row,
      kind,
      oem,
      model: keepModel ? row.model : "",
      minMm: keepModel ? row.minMm : "",
      maxMm: keepModel ? row.maxMm : "",
    });
  }

  const canAdd = maxRows == null || machines.length < maxRows;

  return (
    <div className="space-y-4">
      {machines.map((row, index) => {
        const catalog = row.kind ? machinesForOem(row.oem, row.kind) : [];
        const listed = catalog.some((item) => item.name === row.model);
        const otherModel = customModel[index] === true;
        const modelSelect = otherModel
          ? OTHER_MODEL
          : listed
            ? row.model
            : "";
        const oemValue = oemSelectValue(row.oem, row.kind);
        const otherOem = oemValue === "Other";
        const oemNames = row.kind ? oemsForKind(row.kind) : [];
        return (
          <div key={index} className="space-y-3 border border-line p-3">
            <fieldset>
              <legend className="text-sm">Machine type</legend>
              <div className="mt-2">
                <SourceKindCards
                  value={row.kind}
                  onChange={(kind) => setKind(index, kind, row)}
                />
              </div>
            </fieldset>
            {row.kind ? (
              <div className="grid gap-3 sm:grid-cols-6">
                <label className="block text-sm sm:col-span-2">
                  OEM
                  <select
                    className={`mt-1.5 ${fieldClass}`}
                    value={oemValue}
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
                    <option value="">Select OEM</option>
                    {oemNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm sm:col-span-4">
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
                                {ironPickLabel(item)}
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
                      placeholder="Model as on the plate"
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
                <label className="block text-sm sm:col-span-2">
                  Year
                  <input
                    className={`mt-1.5 ${fieldClass}`}
                    inputMode="numeric"
                    value={row.year ?? ""}
                    onChange={(event) =>
                      patch(index, { ...row, year: event.target.value })
                    }
                    placeholder="2019"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  Capacity
                  <input
                    className={`mt-1.5 ${fieldClass}`}
                    value={row.capacity ?? ""}
                    onChange={(event) =>
                      patch(index, { ...row, capacity: event.target.value })
                    }
                    placeholder="pcs / week"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  Stocked wire sizes
                  <input
                    className={`mt-1.5 ${fieldClass}`}
                    value={row.stockedSizes ?? ""}
                    onChange={(event) =>
                      patch(index, {
                        ...row,
                        stockedSizes: event.target.value,
                      })
                    }
                    placeholder="4, 6, 8, 3/8 in"
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
            ) : (
              <p className="text-sm leading-6 text-muted">
                Pick a class. OEM and model dropdowns follow — wire capacity
                comes from the catalog row. Confirm the plate.
              </p>
            )}
          </div>
        );
      })}
      {canAdd ? (
        <button
          type="button"
          className="text-sm text-copper hover:underline"
          onClick={() => {
            onChange([...machines, emptySourceMachine()]);
            setCustomModel([...customModel, false]);
          }}
        >
          Add another cell
        </button>
      ) : null}
    </div>
  );
}
