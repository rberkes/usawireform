import Link from "next/link";
import { ButtonLink, fieldClass, PageHero, Panel } from "@/components/ui";
import {
  SOURCE_BUYER_JOBS_MAX,
  SOURCE_BUYER_VOLUME_LINE,
  formatBuyerJobsPerMonth,
} from "@/lib/source-buyer-volume";
import { SOURCE_CAPACITY_LINE } from "@/lib/source-capacity";
import {
  SOURCE_BUYER_QUOTE_LINE,
  SOURCE_CELL_SOFT_CAP,
  SOURCE_PLAN_LINE,
  SOURCE_SMART_CONNECT,
  SOURCE_TEASER_POOL,
  formatLeadPrice,
} from "@/lib/source-plans";
import { drawingPrivacyLabel } from "@/lib/source-types";

const locked = `${fieldClass} cursor-not-allowed opacity-80`;

export function AdminPreviewBanner({
  role,
}: {
  role: "buyer" | "shop";
}) {
  return (
    <p className="mt-8 border border-copper px-4 py-3 text-sm leading-6">
      Desk preview. Sample account — not a live user. Forms do not save.
      {" · "}
      {role === "buyer" ? (
        <span>
          Buyer view
          {" · "}
          <Link href="/admin/preview/shop" className="text-copper hover:underline">
            Shop view
          </Link>
        </span>
      ) : (
        <span>
          <Link href="/admin/preview/buyer" className="text-copper hover:underline">
            Buyer view
          </Link>
          {" · "}
          Shop view
        </span>
      )}
      {" · "}
      <Link href="/admin/preview" className="text-muted hover:text-copper hover:underline">
        Both
      </Link>
    </p>
  );
}

export function BuyerDashboardPreview() {
  const jobs = 4;
  return (
    <>
      <PageHero
        kicker="Source"
        title="Buyer dashboard"
        lede={`Your jobs and drawing privacy. ${SOURCE_BUYER_QUOTE_LINE} Shop names stay with the desk.`}
      />
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
        Prints only for now (STEP, DXF, SLDPRT, PDF). Excel and other files
        unlock after you save this account and the desk confirms you are a
        real buyer.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/source">Send a print</ButtonLink>
        <ButtonLink href="/source/account" variant="ghost">
          Account
        </ButtonLink>
      </div>

      <section className="mt-10">
        <Panel className="space-y-4 p-5 sm:p-6">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Buyer account
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              Company
              <input className={`mt-1.5 ${locked}`} readOnly value="Midwest Stampings" />
            </label>
            <label className="block text-sm">
              Your name
              <input className={`mt-1.5 ${locked}`} readOnly value="Alex Rivera" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              Email
              <input
                className={`mt-1.5 ${locked}`}
                readOnly
                value="buyer@example.com"
              />
            </label>
            <label className="block text-sm">
              Phone
              <input className={`mt-1.5 ${locked}`} readOnly value="216-555-0142" />
            </label>
          </div>
          <p className="text-sm text-muted">Save buyer account — disabled in this preview.</p>
        </Panel>
      </section>

      <section className="mt-10">
        <Panel className="space-y-4 p-5 sm:p-6">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Monthly volume
          </p>
          <p className="text-sm leading-6 text-muted">{SOURCE_BUYER_VOLUME_LINE}</p>
          <label className="block text-sm">
            <span className="flex items-baseline justify-between gap-3">
              <span>Jobs you source a month</span>
              <span className="font-mono text-[12px] tracking-widest text-muted uppercase">
                {formatBuyerJobsPerMonth(jobs)}
              </span>
            </span>
            <input
              className="mt-3 w-full accent-copper"
              type="range"
              min={0}
              max={SOURCE_BUYER_JOBS_MAX}
              value={jobs}
              readOnly
              disabled
            />
          </label>
          <div className="flex justify-between text-xs leading-5 text-muted">
            <span>0</span>
            <span>10+</span>
          </div>
        </Panel>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">Your jobs</h2>
        <ul className="mt-4 divide-y divide-line border border-line">
          <li className="px-4 py-4 text-sm">
            <p className="font-medium">
              Midwest Stampings
              <span className="ml-2 font-normal text-muted">3D CNC · 8 mm</span>
            </p>
            <p className="mt-1 text-muted">
              {drawingPrivacyLabel("desk")} · no match yet
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              Held at the desk until you Release
            </p>
            <p className="mt-2 text-copper">Change drawing privacy</p>
          </li>
          <li className="px-4 py-4 text-sm">
            <p className="font-medium">
              Midwest Stampings
              <span className="ml-2 font-normal text-muted">2D CNC · 6 mm</span>
            </p>
            <p className="mt-1 text-muted">
              {drawingPrivacyLabel("matched")} · 6 shops on the teaser · first
              2 to unlock
            </p>
            <p className="mt-1 text-muted">Quoting: p***@l***.com · a***@w***.com</p>
            <p className="mt-1 font-mono text-[11px] text-muted">Released to shops</p>
            <p className="mt-3 text-sm text-muted">
              Why open another quote
            </p>
            <p className="mt-1 text-sm text-muted">
              Open one more quote — {formatLeadPrice()}
            </p>
            <p className="mt-2 text-sm text-muted">
              These quotes are enough — close this print
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}

export function ShopDashboardPreview() {
  const price = formatLeadPrice();
  return (
    <>
      <PageHero
        kicker="Source"
        title="Shop dashboard"
        lede="Signed in as Lakeside Wire — one shop per account. Buyer fit and plant fullness are free."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/source/upgrade" variant="ghost">
          How leads work
        </ButtonLink>
        <ButtonLink href="/source/account" variant="ghost">
          Account
        </ButtonLink>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            {SOURCE_SMART_CONNECT}
          </p>
          <p className="mt-2 text-xl font-medium">{price} each</p>
          <p className="mt-1 text-sm text-muted">
            First two to unlock. Up to {SOURCE_TEASER_POOL} see the teaser.
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Cells
          </p>
          <p className="mt-2 text-xl font-medium">3</p>
          <p className="mt-1 text-sm text-muted">
            Listing is free. {SOURCE_CELL_SOFT_CAP - 3} more in this form.
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Shop
          </p>
          <p className="mt-2 text-xl font-medium">Lakeside Wire</p>
          <p className="mt-1 text-sm text-muted">
            Cleveland, OH · Buyer fit is free on the listing.
          </p>
        </Panel>
      </div>

      <Panel className="mt-4 p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          {SOURCE_SMART_CONNECT}
        </p>
        <p className="mt-2 text-xl font-medium">Buy as they come</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {SOURCE_PLAN_LINE} Cell, wire, qty, and a masked buyer email show
          here. First two shops to unlock get contact. Others wait if the
          buyer wants another quote. A STEP opens only if the buyer released
          it.
        </p>
      </Panel>

      <section className="mt-4">
        <Panel className="p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Job inbox
          </p>
          <ul className="mt-4 divide-y divide-line border border-line">
            <li className="px-4 py-4 text-sm">
              <p className="font-medium">3D CNC · 8 mm · qty 5000</p>
              <p className="mt-2 text-muted">
                Buyer a***@e***.com. First two to unlock get contact at {price}.
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                STEP held at the desk
              </p>
              <p className="mt-3">
                <span className="inline-flex items-center justify-center rounded-sm bg-copper px-5 py-2.5 text-sm font-medium text-white opacity-80">
                  Buy this lead — {price}
                </span>
              </p>
            </li>
            <li className="px-4 py-4 text-sm">
              <p className="font-medium">4slide · 5 mm · qty 8000</p>
              <p className="mt-2 text-muted">
                Two shops already unlocked this lead. You are next if the
                buyer asks for another quote. You do not pay to wait.
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                STEP held at the desk
              </p>
            </li>
            <li className="px-4 py-4 text-sm">
              <p className="font-medium">2D CNC · 6 mm · qty 1200</p>
              <p className="mt-2 text-foreground">
                Midwest Stampings · Alex Rivera · buyer@example.com · 216-555-0142
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                Drawing released — open in this dashboard
              </p>
            </li>
          </ul>
        </Panel>
      </section>

      <section className="mt-12">
        <Panel className="space-y-4 p-4 sm:p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            Shop
          </p>
          <p className="text-sm leading-6 text-muted">
            This is the public listing. Google indexes /directory/lakeside-wire.
            Email stays off that page.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              Shop name
              <input className={`mt-1.5 ${locked}`} readOnly value="Lakeside Wire" />
            </label>
            <label className="block text-sm">
              Your name
              <input className={`mt-1.5 ${locked}`} readOnly value="Pat Chen" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              City
              <input className={`mt-1.5 ${locked}`} readOnly value="Cleveland" />
            </label>
            <label className="block text-sm">
              State
              <input className={`mt-1.5 ${locked}`} readOnly value="OH" />
            </label>
          </div>
        </Panel>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">Filed cells</h2>
        <ul className="mt-4 divide-y divide-line border border-line">
          <li className="px-4 py-3 text-sm">
            <p className="font-medium">Numalliance Robomac 214TF</p>
            <p className="mt-1 text-muted">3D CNC · 4–14 mm</p>
          </li>
          <li className="px-4 py-3 text-sm">
            <p className="font-medium">AIM SCS</p>
            <p className="mt-1 text-muted">2D CNC · 4–10 mm</p>
          </li>
          <li className="px-4 py-3 text-sm">
            <p className="font-medium">Witels-Albert straightener</p>
            <p className="mt-1 text-muted">Straighten & Cut to Length · 4–12 mm</p>
          </li>
        </ul>
        <Panel className="mt-6 space-y-4 p-4 sm:p-5">
          <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            This week · Free
          </p>
          <p className="text-sm leading-6 text-muted">{SOURCE_CAPACITY_LINE}</p>
          <label className="block text-sm">
            <span className="flex items-baseline justify-between gap-3">
              <span>How full is the plant</span>
              <span className="font-mono text-[12px] tracking-widest text-muted uppercase">
                40% full
              </span>
            </span>
            <input
              className="mt-3 w-full accent-copper"
              type="range"
              min={0}
              max={100}
              value={40}
              readOnly
              disabled
            />
          </label>
          <div className="flex justify-between text-xs leading-5 text-muted">
            <span>0% — needs work</span>
            <span>100% — no capacity</span>
          </div>
        </Panel>
      </section>
    </>
  );
}
