import { updateSourceJobPrivacy } from "@/app/actions/source";
import { Button, Page, PageHero } from "@/components/ui";
import { findSourceJobByPrivacyToken } from "@/lib/source";
import {
  drawingPrivacyLabel,
  parseDrawingPrivacy,
} from "@/lib/source-types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Drawing privacy — Source",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ t?: string; saved?: string; error?: string }>;
};

export default async function SourceDrawingPrivacyPage({ searchParams }: Props) {
  const { t, saved, error } = await searchParams;
  const token = t?.trim() ?? "";
  const job = token ? await findSourceJobByPrivacyToken(token) : null;

  if (!job) {
    return (
      <Page>
        <PageHero
          kicker="Source"
          title="Drawing privacy"
          lede="Use the link in your job receipt. That page is private to the buyer who sent the print."
        />
        {error ? (
          <p className="mt-6 max-w-xl text-sm text-copper">
            That link is not valid.
          </p>
        ) : null}
      </Page>
    );
  }

  const current = parseDrawingPrivacy(job.drawingPrivacy);

  return (
    <Page>
      <PageHero
        kicker="Source"
        title="Drawing privacy"
        lede={`${job.company || job.email}: ${drawingPrivacyLabel(current)}. Matched shops see the spec. A shop that buys the lead gets your contact. A released STEP opens in their dashboard after they pay — never attached to email.`}
      />
      {saved ? (
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted">Saved.</p>
      ) : null}
      <form action={updateSourceJobPrivacy} className="mt-8 max-w-xl space-y-4">
        <input type="hidden" name="t" value={token} />
        <label className="flex items-start gap-2 text-sm leading-6">
          <input
            className="mt-1"
            type="radio"
            name="drawingPrivacy"
            value="desk"
            defaultChecked={current === "desk"}
          />
          <span>
            Keep the STEP at the desk. Shops quote from wire, cell, and notes.
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm leading-6">
          <input
            className="mt-1"
            type="radio"
            name="drawingPrivacy"
            value="matched"
            defaultChecked={current === "matched"}
          />
          <span>
            Release the STEP to shops that buy this lead. They open it in the
            shop dashboard after they pay $49. It is not posted and not
            attached to email.
          </span>
        </label>
        <Button type="submit">Save</Button>
      </form>
    </Page>
  );
}
