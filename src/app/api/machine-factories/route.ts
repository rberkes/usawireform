import { directoryCompanies } from "@/lib/directory";
import {
  machineDocsFromCompanies,
  searchFactoriesByMachine,
} from "@/lib/machine-search";
import { listPublishedSourceDirectoryCompanies } from "@/lib/source";
import { mergeDirectoryList } from "@/lib/source-directory";

export const dynamic = "force-dynamic";

const MAX_QUERY = 80;
const INDEX_TTL_MS = 60_000;

let cached:
  | { at: number; docs: ReturnType<typeof machineDocsFromCompanies> }
  | null = null;

async function machineIndex() {
  const now = Date.now();
  if (cached && now - cached.at < INDEX_TTL_MS) return cached.docs;
  const sourced = await listPublishedSourceDirectoryCompanies();
  const companies = mergeDirectoryList(directoryCompanies, sourced);
  const docs = machineDocsFromCompanies(companies);
  cached = { at: now, docs };
  return docs;
}

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("q") ?? "";
  const query = raw.slice(0, MAX_QUERY);
  const docs = await machineIndex();
  return Response.json(searchFactoriesByMachine(query, docs));
}
