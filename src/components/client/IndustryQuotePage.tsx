import type { ReactNode } from "react";
import {
  ClientCtaBand,
  ClientHero,
  ClientPage,
} from "@/components/client/ClientLanding";
import { Container } from "@/components/ui";
import { CLIENT_CTA_LEDE } from "@/lib/client-landing";

export function IndustryQuotePage({
  title,
  lede,
  ctaTitle,
  ctaLede = CLIENT_CTA_LEDE,
  top,
  children,
}: {
  title: string;
  lede: string;
  ctaTitle: string;
  ctaLede?: string;
  top?: ReactNode;
  children: ReactNode;
}) {
  return (
    <ClientPage>
      {top ? (
        <div className="bg-background">
          <Container className="pt-8">{top}</Container>
        </div>
      ) : null}
      <ClientHero kicker="Industries" title={title} lede={lede} />
      <div className="bg-background">
        <Container className="py-16 sm:py-20">{children}</Container>
      </div>
      <ClientCtaBand title={ctaTitle} lede={ctaLede} />
    </ClientPage>
  );
}
