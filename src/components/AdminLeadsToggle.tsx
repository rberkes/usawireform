"use client";

import { Button } from "@/components/ui";
import { setSubscriberLeads } from "@/app/admin/subscribers/actions";

export function AdminLeadsToggle({
  userId,
  on,
}: {
  userId: string;
  on: boolean;
}) {
  return (
    <form action={setSubscriberLeads}>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="on" value={on ? "0" : "1"} />
      <Button type="submit" variant="ghost" className="px-3 py-1.5 text-xs">
        {on ? "Revoke comp leads" : "Grant comp leads"}
      </Button>
    </form>
  );
}
