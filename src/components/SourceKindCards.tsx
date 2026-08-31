"use client";

import { SOURCE_JOB_CLASSES } from "@/lib/source-types";

export function SourceKindCards({
  name,
  value,
  onChange,
  required,
}: {
  name?: string;
  value?: string;
  onChange?: (kind: string) => void;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {SOURCE_JOB_CLASSES.map((row) => {
        const selected = value === row.kind;
        const className =
          "flex cursor-pointer flex-col border border-line bg-background px-3 py-3 text-left has-[:checked]:border-copper has-[:checked]:bg-inset aria-pressed:border-copper aria-pressed:bg-inset";
        if (onChange) {
          return (
            <button
              key={row.kind}
              type="button"
              aria-pressed={selected}
              className={className}
              onClick={() => onChange(row.kind)}
            >
              <span className="text-sm font-medium">{row.label}</span>
              <span className="mt-1 text-xs leading-5 text-muted">
                {row.hint}
              </span>
            </button>
          );
        }
        return (
          <label key={row.kind} className={className}>
            <input
              type="radio"
              name={name}
              value={row.kind}
              required={required}
              className="sr-only"
            />
            <span className="text-sm font-medium">{row.label}</span>
            <span className="mt-1 text-xs leading-5 text-muted">{row.hint}</span>
          </label>
        );
      })}
    </div>
  );
}
