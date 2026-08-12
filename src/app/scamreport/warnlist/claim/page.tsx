import Link from "next/link";
import { getLocale, getDictionary, t } from "@/lib/i18n";
import { filterWarnlistEntries } from "@/lib/warnlist-data";
import { parseWarnlistQuery } from "@/lib/warnlist-query";
import { formatMoney } from "@/lib/money";
import { hasAmountOwed } from "@/lib/warnlist";
import {
  WARNLIST_PAGE,
} from "@/components/warnlist/warnlist-layout";
import {
  warnlistClaimPath,
  warnlistEntryPath,
  WARNLIST_BASE,
} from "@/lib/warnlist-paths";
import { getWarnlistPlaceLabel } from "@/lib/warnlist-origin";

type SearchParams = { q?: string };

export default async function WarnlistClaimHubPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const moneyLocale = "en-GB";
  const query = parseWarnlistQuery({ q: params.q, page: "1" });
  const q = query.q?.trim() ?? "";
  const results = q
    ? filterWarnlistEntries({ ...query, type: "ALL" }).slice(0, 40)
    : [];

  return (
    <div className={WARNLIST_PAGE}>
      <div className="mb-6 max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mb-2">
          {t(dict, "warnlist.claimHub.eyebrow")}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t(dict, "warnlist.claimHub.title")}
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
          {t(dict, "warnlist.claimHub.intro")}
        </p>
      </div>

      <form
        action={WARNLIST_BASE + "/claim"}
        method="get"
        className="mb-6"
      >
        <label className="sr-only" htmlFor="claim-hub-search">
          {t(dict, "warnlist.searchLabel")}
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-card px-3 h-12 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus-within:border-foreground/25 focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow]">
          <svg
            className="w-4 h-4 text-muted-foreground shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="claim-hub-search"
            name="q"
            type="text"
            defaultValue={q}
            placeholder={t(dict, "warnlist.claimHub.searchPlaceholder")}
            className="flex-1 min-w-0 h-full !border-0 !bg-transparent !px-0 !shadow-none text-[14px] placeholder:text-muted-foreground focus:!outline-none focus:!ring-0 focus:!shadow-none focus:!border-0"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className="shrink-0 h-9 px-4 rounded-lg bg-foreground text-background text-[13px] font-medium hover:opacity-90"
          >
            {t(dict, "warnlist.search")}
          </button>
        </div>
      </form>

      {!q ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 px-5 py-10 text-center">
          <p className="text-[14px] text-muted-foreground">
            {t(dict, "warnlist.claimHub.emptyHint")}
          </p>
          <Link
            href={WARNLIST_BASE}
            className="inline-block mt-4 text-[13px] text-foreground underline underline-offset-2"
          >
            {t(dict, "warnlist.backToList")}
          </Link>
        </div>
      ) : results.length === 0 ? (
        <p className="text-[14px] text-muted-foreground py-8 text-center">
          {t(dict, "warnlist.noResults")}
        </p>
      ) : (
        <ul className="space-y-2">
          {results.map((entry) => {
            const amount =
              hasAmountOwed(entry.amountOwed) &&
              formatMoney(
                entry.amountOwed!,
                entry.amountOwedCurrency ?? "CHF",
                moneyLocale
              );
            return (
              <li
                key={entry.slug}
                className="rounded-xl border border-border bg-card px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={warnlistEntryPath(entry.slug)}
                    className="text-[15px] font-medium text-foreground hover:underline"
                  >
                    {entry.name}
                  </Link>
                  <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
                    {entry.type === "PERSON"
                      ? t(dict, "warnlist.filterPersons")
                      : t(dict, "warnlist.filterCompanies")}
                    {" · "}
                    {getWarnlistPlaceLabel(entry) || entry.country || "—"}
                    {amount ? ` · ${amount}` : ""}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={warnlistEntryPath(entry.slug)}
                    className="inline-flex items-center justify-center h-9 px-3 rounded-lg border border-border text-[12px] font-medium hover:bg-muted/50"
                  >
                    {t(dict, "warnlist.claimHub.viewProfile")}
                  </Link>
                  <Link
                    href={warnlistClaimPath(entry.slug)}
                    className="inline-flex items-center justify-center h-9 px-3 rounded-lg bg-foreground text-background text-[12px] font-medium hover:opacity-90"
                  >
                    {t(dict, "warnlist.fileClaim")}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
