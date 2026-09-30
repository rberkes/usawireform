import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { SOURCE_BUYER_QUOTE_LINE } from "@/lib/source-plans";

export const BUYER_HOME_FAQS = [
  {
    question: "What if I don’t have a CAD file?",
    answer:
      "Send a PDF 3-view, a sketch, or a dimensioned drawing. We model a STEP for free from the print. Instant quote still works if you only know cuts, bends, and inches.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Upload on /source. How to order (/guide/how-to-order) is the walkthrough. The website is the lowest price — a desk quote is only for parts outside typical limits. Instant quote on this site is a ballpark for the Northeast Ohio 214TF.",
  },
  {
    question: "What wire diameters can you form?",
    answer: `This floor runs ${WIRE.label}. Stock tooling is 3/8, 7/16, and 1/2 in. The Source network matches your print to shops that filed the right diameter band — including cells outside 4–14 mm.`,
  },
  {
    question: "What is the minimum order?",
    answer: `${PRICE_LINE} Instant estimate will still run a smaller count so you can budget.`,
  },
  {
    question: "Do I pick the shop?",
    answer: `You send the print. Matching is cell class, wire size, and open capacity. ${SOURCE_BUYER_QUOTE_LINE} Shop names stay with the desk until a shop unlocks.`,
  },
  {
    question: "Are my files confidential?",
    answer:
      "Yes. A STEP is never attached to email. Shops see a teaser first. The file opens in the dashboard only after they buy the lead, and only if you released it.",
  },
] as const;

export const SUPPLIER_HOME_FAQS = [
  {
    question: "What does it cost to list?",
    answer:
      "Listing every cell is free. File OEM, year, capacity, and stocked wire sizes. Operating notes — min order, setup, lead — are free on the public listing.",
  },
  {
    question: "When do I pay?",
    answer:
      "When a matched job shows in the dashboard and you want the buyer contact. Unlock Buyer Leads with AI Smart Connect™ for $49. Six shops see the teaser. First two to unlock get contact.",
  },
  {
    question: "How does matching work?",
    answer:
      "A buyer STEP is held at the desk, then released to cells that fit — machine class and diameter band first, then same-state preference and this week’s plant fullness. 100% full means no capacity.",
  },
] as const;
