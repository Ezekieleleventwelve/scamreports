import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale, getDictionary, t } from "@/lib/i18n";
import { WARNLIST_ENTRIES } from "@/data/warnlist";
import { getWarnlistEntry } from "@/lib/warnlist-data";
import WarnlistEntryArticle from "@/components/warnlist/WarnlistEntryArticle";
import JsonLd from "@/components/seo/JsonLd";
import {
  generateWarnlistEntryBreadcrumbJsonLd,
  generateWarnlistEntryJsonLd,
  generateWarnlistEntryMetadata,
} from "@/lib/warnlist-seo";
import { getWarnlistRegisterLabels } from "@/lib/warnlist-register-labels";
import { WARNLIST_PAGE } from "@/components/warnlist/warnlist-layout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return WARNLIST_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWarnlistEntry(slug);
  if (!entry) return {};
  return generateWarnlistEntryMetadata(entry);
}

export default async function WarnlistEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWarnlistEntry(slug);
  if (!entry) notFound();

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const labels = {
    principals: t(dict, "warnlist.principals"),
    alsoKnown: t(dict, "warnlist.alsoKnown"),
    address: t(dict, "warnlist.address"),
    companyAddress: t(dict, "warnlist.companyAddress"),
    listed: t(dict, "warnlist.listed"),
    casesInvolving: t(dict, "warnlist.casesInvolving"),
    websites: t(dict, "warnlist.websites"),
    source: t(dict, "warnlist.source"),
    videoEvidence: t(dict, "warnlist.videoEvidence"),
    watchVideo: t(dict, "warnlist.watchVideo"),
    amountOwed: t(dict, "warnlist.amountOwed"),
    uid: t(dict, "warnlist.uid"),
    related: t(dict, "warnlist.relatedEntries"),
  };
  const registerLabels = getWarnlistRegisterLabels(dict);

  return (
    <>
      <JsonLd data={generateWarnlistEntryJsonLd(entry)} />
      <JsonLd data={generateWarnlistEntryBreadcrumbJsonLd(entry)} />

      <div className={WARNLIST_PAGE}>
        <Link
          href="/scamreport/warnlist"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground mb-4"
        >
          <span aria-hidden>←</span>
          {t(dict, "warnlist.backToList")}
        </Link>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <WarnlistEntryArticle
            entry={entry}
            locale={locale}
            labels={labels}
            registerLabels={registerLabels}
          />
        </div>

        <p className="mt-8 text-[11px] text-muted-foreground leading-relaxed">
          {t(dict, "warnlist.disclaimer")}
        </p>
      </div>
    </>
  );
}
