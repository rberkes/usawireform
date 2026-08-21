import { loginAdmin } from "./actions";
import { Page, PageHero } from "@/components/ui";

export function AdminLogin({
  next,
  error,
  title,
}: {
  next: string;
  error?: string;
  title: string;
}) {
  return (
    <Page>
      <PageHero kicker="Admin" title={title} lede="Password required." />
      <form action={loginAdmin} className="mt-8 max-w-sm space-y-3">
        <input type="hidden" name="next" value={next} />
        <label className="block text-sm">
          Password
          <input
            type="password"
            name="password"
            required
            className="mt-1.5 w-full border border-line bg-background px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="bg-copper px-5 py-2.5 text-sm font-medium text-white"
        >
          Open
        </button>
        {error ? <p className="text-sm text-muted">Wrong password.</p> : null}
      </form>
    </Page>
  );
}
