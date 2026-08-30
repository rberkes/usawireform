"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AutodeskShareViewer } from "./AutodeskShareViewer";
import { btn } from "./ui";
import { cx } from "@/lib/cx";
import { getPastProject, pastProjects } from "@/lib/past-projects";

export default function PastProjectsStudio({
  initialProject,
}: {
  initialProject?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const projectParam =
    searchParams.get("project") ?? initialProject ?? pastProjects[0]?.id ?? "";
  const selected = getPastProject(projectParam) ?? pastProjects[0];

  if (!selected) {
    return (
      <p className="mt-10 max-w-xl text-sm leading-6 text-muted">
        No shop files on this page yet.
      </p>
    );
  }

  function selectProject(id: string) {
    router.replace(`${pathname}?project=${encodeURIComponent(id)}`, {
      scroll: false,
    });
  }

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <aside>
        <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
          Past jobs
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {pastProjects.map((project) => {
            const active = project.id === selected.id;
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => selectProject(project.id)}
                  className={cx(
                    "w-full rounded-sm border px-3 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "border-copper bg-copper/10 text-foreground"
                      : "border-line bg-background text-muted hover:border-copper/40 hover:text-foreground",
                  )}
                >
                  <span className="block text-foreground">{project.title}</span>
                  <span className="mt-0.5 block font-mono text-[10px] tracking-widest uppercase">
                    Autodesk share
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div>
        <div className="relative border border-line">
          <AutodeskShareViewer part={selected.id} />
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-muted">
            {selected.summary} Download is off on the share. This is a job we
            ran — not a catalog quote.{" "}
            <a
              href={selected.permalink}
              className="text-copper hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              Open in Autodesk
            </a>
            .
          </p>
          <Link href="/quoting" className={btn.primary}>
            Send a drawing
          </Link>
        </div>
      </div>
    </div>
  );
}
