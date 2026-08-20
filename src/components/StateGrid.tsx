import Link from "next/link";
import { US_STATES } from "@/lib/states";

export function StateGrid() {
  return (
    <ul className="mt-6 columns-2 gap-x-8 sm:columns-3 lg:columns-4">
      {US_STATES.map((state) => (
        <li key={state.slug} className="break-inside-avoid py-1">
          <Link
            href={`/${state.slug}`}
            className="text-sm text-muted hover:text-copper"
          >
            {state.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
