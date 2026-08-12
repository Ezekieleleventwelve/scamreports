"use client";

import Image from "next/image";
import Link from "next/link";
import type { WarnlistEntry } from "@/data/warnlist";
import { useLocale } from "@/lib/i18n/context";
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

function EntryPhoto({ entry }: { entry: WarnlistEntry }) {
  if (entry.imageUrl) {
    return (
      <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-muted shrink-0 ring-1 ring-border">
        <Image
          src={entry.imageUrl}
          alt=""
          fill
          className="object-cover object-top"
          sizes="72px"
        />
      </div>
    );
  }

  const initials = entry.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-[72px] h-[72px] rounded-xl bg-muted shrink-0 ring-1 ring-border flex items-center justify-center text-[15px] font-semibold text-muted-foreground"
      aria-hidden
    >
      {initials || "?"}
    </div>
  );
}

function formatAddress(entry: WarnlistEntry): string | null {
  if (entry.address?.trim()) return entry.address.trim();
  const parts = [entry.location, entry.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

interface WarnlistEntryPanelProps {
  entry: WarnlistEntry;
  locale: string;
  registerLabels?: WarnlistRegisterLabels;
}

export default function WarnlistEntryPanel({
  entry,
  locale,
  registerLabels,
}: WarnlistEntryPanelProps) {
  const { t } = useLocale();
  const moneyLocale = "en-GB";
  const address = formatAddress(entry);
  const websites = (entry.websites ?? "")
    .split(/[,;]+/)
    .map((w) => w.trim())
    .filter(Boolean);
  const listedDate = new Date(entry.listedAt).toLocaleDateString(moneyLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-4 pt-4">
      <div className="flex gap-4">
        <EntryPhoto entry={entry} />
        <dl className="flex-1 min-w-0 space-y-2 text-[13px]">
          {entry.type === "COMPANY" && entry.principals && (
            <div>
              <dt className="text-[11px] text-muted-foreground">{t("warnlist.principals")}</dt>
              <dd className="text-foreground">{entry.principals}</dd>
            </div>
          )}
          {entry.aliases && (
            <div>
              <dt className="text-[11px] text-muted-foreground">{t("warnlist.alsoKnown")}</dt>
              <dd className="text-foreground">{entry.aliases}</dd>
            </div>
          )}
          {address && (
            <div>
              <dt className="text-[11px] text-muted-foreground">
                {entry.type === "COMPANY"
                  ? t("warnlist.companyAddress")
                  : t("warnlist.address")}
              </dt>
              <dd className="text-foreground">{address}</dd>
            </div>
          )}
          <div>
            <dt className="text-[11px] text-muted-foreground">{t("warnlist.listed")}</dt>
            <dd className="text-foreground">{listedDate}</dd>
          </div>
        </dl>
      </div>

      <p className="text-[14px] text-muted-foreground leading-relaxed">{entry.summary}</p>

      {entry.relatedSlugs && entry.relatedSlugs.length > 0 ? (
        <WarnlistRelatedLinks
          slugs={entry.relatedSlugs}
          label={t("warnlist.relatedEntries")}
        />
      ) : null}

      {entry.videoUrl ? (
        <WarnlistEntryVideo
          videoUrl={entry.videoUrl}
          title={`${entry.name} — video evidence`}
          label={t("warnlist.videoEvidence")}
          watchLabel={t("warnlist.watchVideo")}
        />
      ) : null}

      {entry.type === "COMPANY" && registerLabels && (
        <WarnlistRegisterBlock entry={entry} labels={registerLabels} variant="entry" />
      )}

      {entry.cases.length > 0 && (
        <div>
          <p className="text-[11px] font-medium text-muted-foreground mb-2">
            {t("warnlist.casesInvolving")} ({entry.cases.length})
          </p>
          <ul className="space-y-2">
            {entry.cases.map((c) => (
              <li
                key={c.id}
                className="rounded-lg border border-border bg-background px-3 py-2 text-[13px]"
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
        </div>
      )}

      {websites.length > 0 && (
        <div>
          <p className="text-[11px] font-medium text-muted-foreground mb-1">
            {t("warnlist.websites")}
          </p>
          <ul className="text-[13px] space-y-0.5 break-all">
            {websites.map((site) => (
              <li key={site} className="text-foreground">
                {site}
              </li>
            ))}
          </ul>
        </div>
      )}

      {entry.sourceLabel && (
        <p className="text-[12px] text-muted-foreground">
          {t("warnlist.source")}:{" "}
          {entry.sourceUrl ? (
            <a
              href={entry.sourceUrl}
              className="text-primary underline"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {entry.sourceLabel}
            </a>
          ) : (
            entry.sourceLabel
          )}
        </p>
      )}

      <WarnlistEntryActions entry={entry} locale={locale} />
    </div>
  );
}
