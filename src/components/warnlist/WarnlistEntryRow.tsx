"use client";

import Link from "next/link";
import { useState } from "react";
import type { WarnlistEntry } from "@/data/warnlist";
import { hasAmountOwed } from "@/lib/warnlist";
import { formatMoney } from "@/lib/money";
import { getWarnlistOriginDisplay } from "@/lib/warnlist-origin";
import WarnlistEntryPanel from "./WarnlistEntryPanel";
import type { WarnlistRegisterLabels } from "./WarnlistRegisterBlock";
import { WARNLIST_INDEX_GRID, warnlistTypeShort } from "./warnlist-index-grid";

interface WarnlistEntryRowProps {
  entry: WarnlistEntry;
  locale: string;
  defaultOpen?: boolean;
  registerLabels?: WarnlistRegisterLabels;
}

export default function WarnlistEntryRow({
  entry,
  locale,
  defaultOpen = false,
  registerLabels,
}: WarnlistEntryRowProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `warnlist-panel-${entry.slug}`;
  const origin = getWarnlistOriginDisplay(entry);
  const moneyLocale = "en-GB";

  const amountLabel =
    hasAmountOwed(entry.amountOwed) &&
    formatMoney(entry.amountOwed!, entry.amountOwedCurrency ?? "CHF", moneyLocale);

  return (
    <li className="border-b border-border last:border-b-0">
      <div
        className={`${WARNLIST_INDEX_GRID} px-3 sm:px-4 min-h-[44px] items-center hover:bg-muted/40`}
      >
        <span
          className="text-[10px] font-bold uppercase text-muted-foreground tabular-nums"
          title={entry.type === "PERSON" ? "Person" : "Company"}
        >
          {warnlistTypeShort(entry.type)}
        </span>
        <span className="text-[11px] font-semibold text-foreground tabular-nums">
          {origin.countryCode}
        </span>
        <span className="text-[11px] text-muted-foreground truncate" title={origin.place}>
          {origin.place || "—"}
        </span>
        <Link
          href={`/scamreport/warnlist/${entry.slug}`}
          className="text-[14px] font-medium text-foreground truncate min-w-0 hover:underline underline-offset-2"
        >
          {entry.name}
        </Link>
        <span className="text-[11px] text-muted-foreground tabular-nums text-right">
          {entry.cases.length > 0 ? entry.cases.length : "—"}
        </span>
        <span className="text-[11px] font-medium tabular-nums text-right truncate">
          {amountLabel || "—"}
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-muted-foreground hover:text-foreground justify-self-end p-1 -mr-1"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Collapse" : "Expand"}
        >
          <span
            className={`block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
      </div>

      {open && (
        <div id={panelId} className="px-4 pb-4 border-t border-border/80 bg-muted/20">
          <WarnlistEntryPanel entry={entry} locale={locale} registerLabels={registerLabels} />
        </div>
      )}
    </li>
  );
}
