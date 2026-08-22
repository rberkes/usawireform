import { PLANT_CHECKS } from "@/lib/plant-verify";

export function PlantCheckList({
  className = "mt-6",
}: {
  className?: string;
}) {
  return (
    <ol className={`${className} max-w-xl space-y-4`}>
      {PLANT_CHECKS.map((check) => (
        <li key={check.n} className="flex gap-4">
          <span className="font-mono text-[11px] text-copper">{check.n}</span>
          <div>
            <p className="text-sm font-medium">{check.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{check.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
