"use client";

import Link from "next/link";
import type { WarnlistEntry } from "@/data/warnlist";
import { getWarnlistReportSlug, hasAmountOwed } from "@/lib/warnlist";
import { formatMoney } from "@/lib/money";
import { useLocale } from "@/lib/i18n/context";

interface WarnlistEntryActionsProps {
  entry: WarnlistEntry;
  locale: string;
}

export default function WarnlistEntryActions({ entry, locale }: WarnlistEntryActionsProps) {
  const { t } = useLocale();
  const moneyLocale = locale === "de" ? "de-CH" : "en-GB";
  const reportSlug = getWarnlistReportSlug(entry);
  const showAmount = hasAmountOwed(entry.amountOwed);
  const showReport = Boolean(reportSlug);
  const showClaim = true;

  return (
    <section className="rounded-xl border-2 border-border bg-background p-4 space-y-3 mt-1">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {t("warnlist.entryActions")}
      </p>

      {showAmount && (
        <div>
          <p className="text-[11px] text-muted-foreground">{t("warnlist.amountOwed")}</p>
          <p className="text-[22px] font-bold tabular-nums tracking-tight">
            {formatMoney(
              entry.amountOwed!,
              entry.amountOwedCurrency ?? "CHF",
              moneyLocale
            )}
          </p>
        </div>
      )}

      {(showReport || showClaim) && (
        <div className={`grid gap-2 ${showReport && showClaim ? "sm:grid-cols-2" : ""}`}>
          {showReport && (
            <Link
              href={`/${reportSlug}`}
              className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-4 py-2.5 text-[13px] font-medium text-center"
            >
              {t("warnlist.readFullReport")}
            </Link>
          )}
          {showClaim && (
            <Link
              href={`/scamreport/warnlist/claim/${entry.slug}`}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-[13px] font-medium text-center ${
                showReport
                  ? "border-2 border-border hover:bg-muted/50"
                  : "bg-foreground text-background"
              }`}
            >
              {t("warnlist.fileClaim")}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
