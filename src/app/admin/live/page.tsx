import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { Page, PageHero } from "@/components/ui";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { countSourceFilings, countSourceProfiles } from "@/lib/source";
import { countBuyerAccounts } from "@/lib/source-buyer";
import { countSourceSubscribers } from "@/lib/source-leads";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Live pages",
  robots: { index: false, follow: false },
};

const GROUPS = [
  {
    title: "Public — no login",
    note: "Open these in a private window. They should load without the admin cookie or Clerk.",
    rows: [
      {
        href: "/source",
        label: "Send a print",
        check: "Buyer log in and Buyer account. No $49. ZIP required, city optional. Desk vs STEP radios. Shop line is listing free only.",
      },
      {
        href: "/source/shops",
        label: "Shop join",
        check: "Step 03 is buy the lead. Claim and file a cell still work unsigned.",
      },
      {
        href: "/sign-up?as=buyer",
        label: "Buyer sign-up",
        check: "Title is Confirm a buyer account. Clerk form. Link over to supplier sign-up.",
      },
      {
        href: "/sign-up?as=supplier",
        label: "Supplier sign-up",
        check: "Title is Confirm the shop account. Copy says dashboard next, $49 per lead.",
      },
      {
        href: "/sign-in",
        label: "Sign in",
        check: "Falls through to /source/enter so buyers and shops split after login. Buyer log in link on the page.",
      },
      {
        href: "/sign-in?as=buyer",
        label: "Buyer log in",
        check: "Title is Buyer log in. Lands on /buyer/dashboard.",
      },
    ],
  },
  {
    title: "Signed-in shop",
    note: "Use a supplier Clerk user. Dashboard opens without the NDA while that gate is off.",
    rows: [
      {
        href: "/source/enter",
        label: "Post-login router",
        check: "Sends buyers to /buyer/dashboard. Shops go to the dashboard unless the NDA gate is on.",
      },
      {
        href: "/source/nda",
        label: "Supplier NDA",
        check: "Name, shop, checkbox. Accept lands on the shop dashboard. Buyers bounce away.",
      },
      {
        href: "/source/dashboard",
        label: "Shop dashboard",
        check: "Inbox. Cell, wire, qty, masked buyer email until Buy this lead. Full contact after $49. No locale.",
      },
    ],
  },
  {
    title: "Signed-in buyer",
    note: "Use a buyer Clerk user from /sign-up?as=buyer.",
    rows: [
      {
        href: "/buyer/dashboard",
        label: "Buyer dashboard",
        check: "Company form. Monthly jobs slider. Two shops included. Extra shops $49 each. Masked quoting emails.",
      },
      {
        href: "/source",
        label: "Send another print",
        check: "Form prefills from the buyer account. New jobs attach to this user.",
      },
    ],
  },
  {
    title: "Master admin — this password",
    note: "Shops, buyers, and Source STEPs live under Accounts. This-floor Contact STEPs stay on Quote files.",
    rows: [
      {
        href: "/admin/architecture",
        label: "Architecture",
        check: "Password gate. Tree of public folders plus the desk. Not in the footer or header.",
      },
      {
        href: "/admin/visitors",
        label: "Visitors",
        check: "IP, city, referrer, clicks, company vs ISP vs cloud. Newest first.",
      },
      {
        href: "/admin/accounts",
        label: "Accounts",
        check: "Jump Shops, Buyers, STEP files. Release to shops is the desk button. Validate buyer to open Excel. NDA on shops.",
      },
      {
        href: "/admin/preview",
        label: "Role views",
        check: "Generic buyer and shop dashboards. Sample data. Forms do not save.",
      },
      {
        href: "/admin/preview/buyer",
        label: "Buyer dashboard preview",
        check: "Company card, 0–10+ volume slider, held vs released jobs. Two shops can buy first. $49 opens one more quote. Close the print. No shop names.",
      },
      {
        href: "/admin/preview/shop",
        label: "Shop dashboard preview",
        check: "Inbox teaser with masked buyer email. First two unlock. Waitlist if those two already bought. Fullness this week ranks higher. No buyer locale.",
      },
      {
        href: "/admin/source",
        label: "Source",
        check: "Invites, equipment JSON, and the same buyer jobs.",
      },
      {
        href: "/admin/subscribers",
        label: "Subscribers",
        check: "Who listed. Legacy cell plans and comps. Every shop can buy a $49 lead.",
      },
      {
        href: "/admin",
        label: "Quote files",
        check: "Contact and product-page STEPs for this floor — not Source jobs.",
      },
    ],
  },
] as const;

export default async function AdminLivePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return <AdminLogin next="/admin/live" error={error} title="Live pages" />;
  }

  const [quoteCount, directoryCount, sourceCount, subscriberCount, accountCount] =
    await Promise.all([
      countQuoteSubmissions(),
      countDirectoryLeads(),
      countSourceFilings(),
      countSourceSubscribers(),
      Promise.all([countSourceProfiles(), countBuyerAccounts()]).then(
        ([a, b]) => a + b,
      ),
    ]);

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Live pages"
        lede="What shipped with free listings, $49 leads, buyer desk, and shop desk. Click each path. The check is what should be true on that page."
      />
      <AdminInboxNav
        current="live"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={sourceCount}
        subscriberCount={subscriberCount}
        accountCount={accountCount}
      />
      {GROUPS.map((group) => (
        <section key={group.title} className="mt-12">
          <h2 className="text-lg font-medium">{group.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            {group.note}
          </p>
          <ul className="mt-4 divide-y divide-line border border-line">
            {group.rows.map((row) => (
              <li key={row.href} className="px-4 py-4 text-sm">
                <p className="font-medium">
                  <a href={row.href} className="text-copper hover:underline">
                    {row.label}
                  </a>
                  <span className="ml-2 font-mono text-[11px] font-normal tracking-widest text-muted uppercase">
                    {row.href}
                  </span>
                </p>
                <p className="mt-1 max-w-2xl text-muted">{row.check}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Page>
  );
}
