import Image from "next/image";
import Link from "next/link";
import type { WarnlistEntry } from "@/data/warnlist";
import { hasAmountOwed } from "@/lib/warnlist";
import { formatMoney } from "@/lib/money";
import { getWarnlistOriginDisplay } from "@/lib/warnlist-origin";
import WarnlistEntryActions from "./WarnlistEntryActions";
import WarnlistRegisterBlock, { type WarnlistRegisterLabels } from "./WarnlistRegisterBlock";
import WarnlistEntryVideo from "./WarnlistEntryVideo";
import WarnlistRelatedLinks from "./WarnlistRelatedLinks";

const STATUS_LABELS: Record<string, string> = {
  open: "Open",
  civil: "Civil",
  criminal: "Criminal",
  regulatory: "Regulatory",
  closed: "Closed",
};

export interface WarnlistArticleLabels {
  principals: string;
  alsoKnown: string;
  address: string;
  companyAddress: string;
  listed: string;
  casesInvolving: string;
  websites: string;
  source: string;
  videoEvidence: string;
  watchVideo: string;
  amountOwed: string;
  uid: string;
  related: string;
}

interface WarnlistEntryArticleProps {
  entry: WarnlistEntry;
  locale: string;
  labels: WarnlistArticleLabels;
  registerLabels: WarnlistRegisterLabels;
}

function formatAddress(entry: WarnlistEntry): string | null {
  if (entry.address?.trim()) return entry.address.trim();
  const parts = [entry.location, entry.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

/** Server-rendered full entry — visible in HTML for search engines (no accordion). */
export default function WarnlistEntryArticle({
  entry,
  locale,
  labels,
  registerLabels,
}: WarnlistEntryArticleProps) {
  const origin = getWarnlistOriginDisplay(entry);
  const moneyLocale = "en-GB";
  const address = formatAddress(entry);
  const websites = (entry.websites ?? "")
    .split(/[,;]+/)
    .map((w) => w.trim())
    .filter(Boolean);
  const listedDate = new Date(entry.listedAt).toLocaleDateString(moneyLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const typeLabel = entry.type === "PERSON" ? "Person" : "Company";

  return (
    <article className="px-4 py-5 sm:px-6">
      <header className="mb-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mb-1">
          {typeLabel} · {origin.countryCode}
          {origin.place ? ` · ${origin.place}` : ""}
        </p>
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">{entry.name}</h1>
      </header>

      <div className="flex gap-4 mb-4">
        {entry.imageUrl ? (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0 ring-1 ring-border">
            <Image
              src={entry.imageUrl}
              alt={entry.name}
              fill
              className="object-cover object-top"
              sizes="80px"
              priority
            />
          </div>
        ) : null}
        <dl className="flex-1 min-w-0 space-y-2 text-[13px]">
          {entry.type === "COMPANY" && entry.principals && (
            <div>
              <dt className="text-[11px] text-muted-foreground">{labels.principals}</dt>
              <dd className="text-foreground">{entry.principals}</dd>
            </div>
          )}
          {entry.aliases && (
            <div>
              <dt className="text-[11px] text-muted-foreground">{labels.alsoKnown}</dt>
              <dd className="text-foreground">{entry.aliases}</dd>
            </div>
          )}
          {address && (
            <div>
              <dt className="text-[11px] text-muted-foreground">
                {entry.type === "COMPANY" ? labels.companyAddress : labels.address}
              </dt>
              <dd className="text-foreground">{address}</dd>
            </div>
          )}
          {entry.uid && (
            <div>
              <dt className="text-[11px] text-muted-foreground">{labels.uid}</dt>
              <dd className="text-foreground font-mono text-[12px]">{entry.uid}</dd>
            </div>
          )}
          <div>
            <dt className="text-[11px] text-muted-foreground">{labels.listed}</dt>
            <dd className="text-foreground">{listedDate}</dd>
          </div>
          {hasAmountOwed(entry.amountOwed) && (
            <div>
              <dt className="text-[11px] text-muted-foreground">{labels.amountOwed}</dt>
              <dd className="text-foreground font-medium tabular-nums">
                {formatMoney(entry.amountOwed!, entry.amountOwedCurrency ?? "CHF", moneyLocale)}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">{entry.summary}</p>

      {entry.relatedSlugs && entry.relatedSlugs.length > 0 ? (
        <WarnlistRelatedLinks slugs={entry.relatedSlugs} label={labels.related} />
      ) : null}

      {entry.videoUrl ? (
        <WarnlistEntryVideo
          videoUrl={entry.videoUrl}
          title={`${entry.name} — video evidence`}
          label={labels.videoEvidence}
          watchLabel={labels.watchVideo}
        />
      ) : null}

      {entry.type === "COMPANY" && (
        <div className="mb-4">
          <WarnlistRegisterBlock entry={entry} labels={registerLabels} variant="entry" />
        </div>
      )}

      {entry.cases.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-semibold text-foreground mb-2">
            {labels.casesInvolving} ({entry.cases.length})
          </h2>
          <ul className="space-y-2">
            {entry.cases.map((c) => (
              <li
                key={c.id}
                className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-[13px]"
              >
                {c.reportSlug ? (
                  <Link href={`/${c.reportSlug}`} className="font-medium text-primary hover:underline">
                    {c.title}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{c.title}</span>
                )}
                {(c.status || c.year || c.jurisdiction) && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {[
                      c.status ? (STATUS_LABELS[c.status] ?? c.status) : null,
                      c.jurisdiction,
                      c.year,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                {c.description && (
                  <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                    {c.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {websites.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-semibold text-foreground mb-1">{labels.websites}</h2>
          <ul className="text-[13px] space-y-0.5 break-all">
            {websites.map((site) => (
              <li key={site}>{site}</li>
            ))}
          </ul>
        </section>
      )}

      {entry.sourceLabel && (
        <p className="text-[12px] text-muted-foreground mb-4">
          {labels.source}:{" "}
          {entry.sourceUrl ? (
            <a
              href={entry.sourceUrl}
              className="text-primary underline"
              rel="noopener noreferrer nofollow"
            >
              {entry.sourceLabel}
            </a>
          ) : (
            entry.sourceLabel
          )}
        </p>
      )}

      <WarnlistEntryActions entry={entry} locale={locale} />
    </article>
  );
}
