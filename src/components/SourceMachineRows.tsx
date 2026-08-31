"use client";

import { useState } from "react";
import { fieldClass } from "@/components/ui";
import {
  SOURCE_OEM_NAMES,
  ironPickByName,
  ironSeries,
  machinesForOem,
} from "@/lib/source-iron";
import { SOURCE_KINDS, type SourceMachine } from "@/lib/source-types";

const OTHER_MODEL = "__other__";

export function emptySourceMachine(): SourceMachine {
  return {
    oem: "Numalliance",
    model: "",
    kind: "3D CNC",
    minMm: "",
    maxMm: "",
    city: "",
    year: "",
    capacity: "",
    stockedSizes: "",
  };
}

function oemSelectValue(oem: string) {
  if (SOURCE_OEM_NAMES.includes(oem) && oem !== "Other") return oem;
  return "Other";
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

  const canAdd = maxRows == null || machines.length < maxRows;

  return (
    <div className="space-y-4">
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
                  patch(index, { ...row, stockedSizes: event.target.value })
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
