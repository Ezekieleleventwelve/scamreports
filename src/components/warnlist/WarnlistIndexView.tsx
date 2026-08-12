import Link from "next/link";
import { Suspense } from "react";
import { getLocale, getDictionary, t } from "@/lib/i18n";
import { parseWarnlistQuery, warnlistHref } from "@/lib/warnlist-query";
import {
  WARNLIST_ENTRIES,
  countWarnlistByType,
  filterWarnlistEntries,
  paginateWarnlistEntries,
} from "@/lib/warnlist-data";
import { generateWarnlistIndexJsonLd } from "@/lib/warnlist-seo";
import JsonLd from "@/components/seo/JsonLd";
import WarnlistSearch from "@/components/warnlist/WarnlistSearch";
import WarnlistIndexHeader from "@/components/warnlist/WarnlistIndexHeader";
import WarnlistEntryRow from "@/components/warnlist/WarnlistEntryRow";
import WarnlistPagination from "@/components/warnlist/WarnlistPagination";
import WarnlistSubmitCta from "@/components/warnlist/WarnlistSubmitCta";
import { getWarnlistRegisterLabels } from "@/lib/warnlist-register-labels";
import { WARNLIST_PAGE } from "@/components/warnlist/warnlist-layout";

type SearchParams = {
  type?: string;
  q?: string;
  page?: string;
};

/** Interpol-style public register (homepage + /warnlist alias). */
export default async function WarnlistIndexView({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = parseWarnlistQuery(searchParams);
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const allEntries = filterWarnlistEntries(query);
  const { items: entries, page, totalPages, total } = paginateWarnlistEntries(
    allEntries,
    query.page ?? 1
  );

  const personCount = countWarnlistByType("PERSON");
  const companyCount = countWarnlistByType("COMPANY");
  const registerLabels = getWarnlistRegisterLabels(dict);

  const tabs = [
    {
      key: "ALL" as const,
      label: t(dict, "warnlist.filterAll"),
      count: personCount + companyCount,
    },
    {
      key: "PERSON" as const,
      label: t(dict, "warnlist.filterPersons"),
      count: personCount,
    },
    {
      key: "COMPANY" as const,
      label: t(dict, "warnlist.filterCompanies"),
      count: companyCount,
    },
  ];

  return (
    <>
      <JsonLd data={generateWarnlistIndexJsonLd(WARNLIST_ENTRIES)} />

      <div className={WARNLIST_PAGE}>
        <div className="mb-5">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {t(dict, "warnlist.title")}
          </h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
            {t(dict, "warnlist.intro")}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-border bg-muted/30 space-y-3">
            <Suspense
              fallback={<div className="h-9 bg-muted animate-pulse rounded-lg" />}
            >
              <WarnlistSearch
                labels={{
                  searchLabel: t(dict, "warnlist.searchLabel"),
                  searchPlaceholder: t(dict, "warnlist.searchPlaceholder"),
                  clearSearch: t(dict, "warnlist.clearSearch"),
                  searchAction: t(dict, "warnlist.search"),
                }}
              />
            </Suspense>

            <div className="flex gap-1 p-0.5 rounded-lg bg-muted/50">
              {tabs.map((tab) => (
                <Link
                  key={tab.key}
                  href={warnlistHref({ ...query, type: tab.key, page: 1 })}
                  className={`flex-1 text-center py-1.5 text-[12px] font-medium rounded-md transition-colors ${
                    query.type === tab.key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1 tabular-nums opacity-60">{tab.count}</span>
                </Link>
              ))}
            </div>

            {query.q && (
              <p className="text-[12px] text-muted-foreground">
                {t(dict, "warnlist.resultsFor", {
                  query: query.q,
                  count: total,
                })}
              </p>
            )}
          </div>

          {total === 0 ? (
            <p className="text-[14px] text-muted-foreground text-center py-16 px-4">
              {query.q
                ? t(dict, "warnlist.noResults")
                : t(dict, "warnlist.empty")}
            </p>
          ) : (
            <>
              <WarnlistIndexHeader
                labels={{
                  category: t(dict, "warnlist.indexCategory"),
                  country: t(dict, "warnlist.indexCountry"),
                  place: t(dict, "warnlist.indexPlace"),
                  name: t(dict, "warnlist.indexName"),
                  cases: t(dict, "warnlist.indexCases"),
                  amount: t(dict, "warnlist.indexAmount"),
                }}
              />
              <ul>
                {entries.map((entry) => (
                  <WarnlistEntryRow
                    key={entry.slug}
                    entry={entry}
                    locale={locale}
                    registerLabels={registerLabels}
                  />
                ))}
              </ul>
            </>
          )}
        </div>

        {total > 0 && (
          <WarnlistPagination
            page={page}
            totalPages={totalPages}
            query={query}
            labels={{
              previous: t(dict, "warnlist.paginationPrevious"),
              next: t(dict, "warnlist.paginationNext"),
              pageOf: t(dict, "warnlist.paginationPageOf"),
            }}
          />
        )}

        <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed">
          {t(dict, "warnlist.disclaimer")}
        </p>

        <WarnlistSubmitCta />
      </div>
    </>
  );
}
