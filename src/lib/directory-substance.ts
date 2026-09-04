import type { DirectoryCompany } from "@/lib/directory-types";

/**
 * Whether a listing carries any fact of its own.
 *
 * Listing pages share a template, so the only thing that makes one different
 * from the next is the data on it. A listing with no website, no phone, no
 * named iron and a description generated from its own name and city
 * ("<Name> in <City>, <ST>. Springs and related coil work.") gives a reader
 * nothing they could act on and gives a search engine nothing to tell it apart
 * from the next listing. Several hundred of those pull down the quality signal
 * for the pages that are real, so they stay out of the index and out of the
 * sitemap until someone fills them in — usually by the shop claiming the page,
 * which is the conversion we want anyway.
 *
 * This gates indexing only. The page still renders and is still reachable from
 * `/directory`, because a buyer who searches the shop by name should find it,
 * and the shop should be able to claim it.
 */
export function directoryListingHasSubstance(company: DirectoryCompany) {
  if (company.website || company.phone || company.linkedin) return true;
  if (company.machines && company.machines.length > 0) return true;
  if (company.certifications && company.certifications.length > 0) return true;
  if (company.industries && company.industries.length > 0) return true;
  if (company.secondaries && company.secondaries.length > 0) return true;
  if (company.wireDiameters || company.established || company.plantStreet) {
    return true;
  }
  if (company.filedOnSource || company.buyerFit || company.weeklyCapacity) {
    return true;
  }
  // A description that outruns the name-and-city template is real copy someone
  // wrote about this shop.
  return company.description.trim().length >= 120;
}
