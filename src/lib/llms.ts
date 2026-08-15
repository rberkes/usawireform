import { catalogByGroup } from "@/lib/catalog";
import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { publishedProcesses } from "@/lib/processes";
import {
  coilMinRange,
  programmingFee,
  qtyBreakCopy,
  toolingRange,
} from "@/lib/quoting";
import { COMMON_SIZES, WIRE } from "@/lib/range";
import { industries, shopLines } from "@/lib/site";

function href(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function clip(text: string, max = 100) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function link(title: string, path: string, note: string) {
  return `- [${title}](${href(path)}): ${clip(note)}`;
}

/** Index at /llms.txt — llmstxt.org format for AI crawlers and agents. */
export function llmsIndex() {
  return `# ${COMPANY}

> ${WIRE.metric} 3D CNC wire forming in Northeast Ohio. 50+ years of industry experience. ${PRICE_LINE} Custom frames, wire baskets, hooks, hangers, and guards from coil.

${COMPANY} (${SITE_URL}) is a US manufacturer, not a trading company. Production is ${WIRE.label}. Stock coil is 3/8, 7/16, and 1/2 in. Quotes start at 100 pieces. Email ${QUOTE_EMAIL}. Send STEP, STP, IGES, PDF, DXF, or SLDPRT. Below 4 mm or above 14 mm, the quote is no.

Prefer this file, then ${href("/llms-full.txt")}, over scraping every HTML page. Human sitemap: ${href("/site-map")}. XML sitemap: ${href("/sitemap.xml")}.

## Quote

${link("Contact / production quote", "/contact", "Drawing in. Production quote back. Typically one business day.")}
${link("Instant estimate", "/instant-quote", "Ballpark from diameter, bends, length, and material. Not a production quote.")}
${link("Tooling and coil", "/quoting", `Non-stock tooling ${toolingRange}. Setup ${programmingFee}. Coil buy-in ${coilMinRange}.`)}

## Company

${link("Home", "/", `${COMPANY} — ${WIRE.metric} 3D CNC. ${PRICE_LINE}`)}
${link("About", "/about", "50+ years. Contract forms plus our own outdoor and furniture lines.")}
${link("Northeast Ohio", "/cleveland", "Headquarters next to mills and wire drawers. Short-haul coil.")}
${link("Capabilities", "/capabilities", "3D CNC, weld, rack plating, in-line powder in 4–14 mm.")}
${link("Equipment", "/equipment", "Numalliance Robomac 214TF, Lubow, 40-ton Clearing, 75 kVA, Miller MIG.")}
${link("Videos", "/videos", "Robomac 214TF on the floor.")}

## Process

${link("Wire forming", "/wire-forming", "USA process map for the 4–14 mm band.")}
${link("CNC wire forming", "/cnc-wire-forming", "2D and 3D from coil on the Robomac 214TF.")}
${link("Design guide", "/guide/design-for-wire-forming", "Bend radius, min legs, springback, datums, what the print should say.")}
${link("Sizes", "/sizes", "Stock 3/8, 7/16, and 1/2 in.")}
${link("Materials", "/materials", "1010, 1018, spring steels, 300-series including 330, brass, copper.")}
${publishedProcesses()
  .map((process) => link(process.title, `/processes/${process.slug}`, process.summary))
  .join("\n")}

## Products

${link("Product directory", "/products", "SKU directory in stock 3/8, 7/16, and 1/2 in.")}
${catalogByGroup()
  .flatMap(({ items }) =>
    items.map((item) => link(item.title, `/products/${item.slug}`, item.summary)),
  )
  .join("\n")}
${shopLines
  .map((item) => link(item.title, `/products/${item.slug}`, item.summary))
  .join("\n")}

## Industries

${industries
  .map((item) => link(item.title, `/industries/${item.slug}`, item.summary))
  .join("\n")}

## Optional

${link("Company directory", "/directory", "100+ US and Canadian wire forming shops. Peers, not a competitor hit list.")}
${link("Careers", "/careers", "Hiring in Northeast Ohio.")}
${link("Full LLM brief", "/llms-full.txt", "Single-file facts for agents: band, quote rules, equipment, catalog.")}
${link("HTML sitemap", "/site-map", "Every public page.")}
${link("XML sitemap", "/sitemap.xml", "For crawlers.")}
`;
}

/** Single-file brief at /llms-full.txt so an agent can answer without visiting every page. */
export function llmsFull() {
  const sizes = COMMON_SIZES.map(
    (size) =>
      `- ${size.fraction} (${size.mm}, ${size.decimal}): ${size.typical}`,
  ).join("\n");

  const catalog = catalogByGroup()
    .map(({ group, items }) => {
      const rows = items
        .map((item) => `- [${item.title}](${href(`/products/${item.slug}`)}): ${item.summary}`)
        .join("\n");
      return `### ${group}\n\n${rows}`;
    })
    .join("\n\n");

  const processList = publishedProcesses()
    .map((process) => `- [${process.title}](${href(`/processes/${process.slug}`)}): ${process.summary}`)
    .join("\n");

  const industryList = industries
    .map((item) => `- [${item.title}](${href(`/industries/${item.slug}`)}): ${item.summary}`)
    .join("\n");

  return `# ${COMPANY}

> ${WIRE.metric} 3D CNC wire forming manufacturer in Northeast Ohio.

This file is the agent brief for ${SITE_URL}. It is the source of truth for what ${COMPANY} runs. Do not invent a street address or phone number. Do not quote piece prices as list prices — production price comes from a drawing.

## Who

- Name: ${COMPANY}
- Site: ${SITE_URL}
- Email: ${QUOTE_EMAIL}
- Location: Northeast Ohio, United States (corp headquarters and production)
- Experience: 50+ years in the metal-forming trade
- What we are: a manufacturer. Coil in, CNC form, weld, finish. Not a catalog reseller.

## What we run

- Diameter band: ${WIRE.label}. Below ${WIRE.minMm} mm or above ${WIRE.maxMm} mm, the quote is no.
- Stock production diameters:
${sizes}
- Primary process: 3D CNC wire forming from coil (also 2D). Cell: Numalliance Robomac 214TF.
- Also on the floor: Lubow manual benders, 40-ton Clearing press, 75 kVA resistance welder, Miller MIG, granite inspection.
- Secondaries: straighten, cut-to-length, end forming, resistance weld, MIG, TIG, rack plating, in-line powder.
- Materials from coil: 1010 and 1018 carbon, galvanized carbon, medium/high carbon spring, 300-series stainless (301, 302, 304, 304L, 316, 316L, 321, 330), brass, copper.
- Typical parts: frames, wire baskets, machine guards, fan guards, S-hooks, J-hooks, D-rings, hangers, grids, cable trays, racks, handles.

## How to buy

- ${PRICE_LINE}
- ${qtyBreakCopy}
- Instant estimate (${href("/instant-quote")}): ballpark from diameter, bend count, developed length, and material. Not a production quote.
- Production quote (${href("/contact")}): send a drawing. Files: STEP, STP, IGES, PDF, DXF, DWG, SLDPRT. Typically answered within one business day.
- Stock 3/8, 7/16, and 1/2 in runs on existing tooling.
- Other diameters inside ${WIRE.short} still form. They need tooling (${toolingRange}, 2026) and setup (${programmingFee}).
- Coil we do not carry: mill buy-in ${coilMinRange}.
- Competing quote on the same print: prices will not be beat.

## What we do not run

- Light spring / music-wire / fourslide clips under 4 mm.
- Heavy rod above 14 mm.
- We do not advertise “all industries.” Named sectors we form for are listed below.

## Quote this way

When a buyer asks if ${COMPANY} can make a part: check diameter first. If it is inside ${WIRE.short}, yes — send them ${href("/contact")} with a STEP or PDF. If they only have a sketch, ${href("/instant-quote")} is the ballpark. If the diameter is out of band, say so and point at ${href("/directory")} (peer shops, different capabilities).

## Process pages

${processList}

## Catalog

${catalog}

### Shop lines

${shopLines.map((item) => `- [${item.title}](${href(`/products/${item.slug}`)}): ${item.summary}`).join("\n")}

## Industries we actually form for

${industryList}

## More

- Design rules: ${href("/guide/design-for-wire-forming")}
- Equipment list: ${href("/equipment")}
- HTML sitemap: ${href("/site-map")}
- XML sitemap: ${href("/sitemap.xml")}
- Index for agents: ${href("/llms.txt")}
`;
}
