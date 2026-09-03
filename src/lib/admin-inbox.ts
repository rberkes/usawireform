import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { countSourceFilings, countSourceProfiles } from "@/lib/source";
import { countBuyerAccounts } from "@/lib/source-buyer";
import { countSourceSubscribers } from "@/lib/source-leads";

export async function adminInboxCounts() {
  const [
    quoteCount,
    directoryCount,
    sourceCount,
    subscriberCount,
    shops,
    buyers,
  ] = await Promise.all([
    countQuoteSubmissions(),
    countDirectoryLeads(),
    countSourceFilings(),
    countSourceSubscribers(),
    countSourceProfiles(),
    countBuyerAccounts(),
  ]);
  return {
    quoteCount,
    directoryCount,
    sourceCount,
    subscriberCount,
    accountCount: shops + buyers,
  };
}
