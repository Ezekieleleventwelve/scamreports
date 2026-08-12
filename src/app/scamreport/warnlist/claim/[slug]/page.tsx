"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/money";
import { useLocale } from "@/lib/i18n/context";
import { WARNLIST_PAGE } from "@/components/warnlist/warnlist-layout";
import { WARNLIST_BASE } from "@/lib/warnlist-paths";

interface WarnlistEntryInfo {
  slug: string;
  name: string;
  amountOwed: number | null;
  amountOwedCurrency: string;
}

const RELATIONSHIP_OPTIONS = [
  { value: "SUBJECT", label: "I am the person named on the warning list" },
  { value: "LEGAL_REPRESENTATIVE", label: "I am their legal representative" },
  {
    value: "AUTHORIZED_REPRESENTATIVE",
    label: "I am an authorized representative (with proof)",
  },
  { value: "OTHER", label: "Other (explain in your statement)" },
] as const;

export default function WarnlistClaimPage() {
  const { slug } = useParams();
  const { t, locale } = useLocale();
  const formOpenedAt = useRef(Date.now());
  const [entry, setEntry] = useState<WarnlistEntryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    claimantName: "",
    contactEmail: "",
    contactPhone: "",
    postalAddress: "",
    relationship: "SUBJECT" as (typeof RELATIONSHIP_OPTIONS)[number]["value"],
    reason: "",
    identityConfirmed: false,
    willingToPayVictimAmount: false,
    requestDeletion: false,
    website: "",
  });

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/warnlist/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.entry) setEntry(data.entry);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry?.slug) return;
    if (!form.identityConfirmed) {
      setError("You must confirm the identity declaration.");
      return;
    }
    if (!form.requestDeletion && !form.willingToPayVictimAmount && !form.reason.trim()) {
      setError("Please describe your claim.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          warnlistSlug: entry.slug,
          claimantName: form.claimantName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          postalAddress: form.postalAddress,
          relationship: form.relationship,
          reason: form.reason.trim() || "Claim submitted via warnlist claim form.",
          identityConfirmed: true,
          willingToPayVictimAmount: form.willingToPayVictimAmount,
          requestDeletion: form.requestDeletion,
          website: form.website,
          formOpenedAt: formOpenedAt.current,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(typeof data.error === "string" ? data.error : "Could not submit claim.");
      }
    } catch {
      setError("Could not submit claim.");
    } finally {
      setSubmitting(false);
    }
  };

  const moneyLocale = locale === "de" ? "de-CH" : "en-GB";
  const shell = WARNLIST_PAGE;

  if (loading) {
    return (
      <div className={`${shell} text-center text-muted-foreground text-[14px]`}>
        Loading…
      </div>
    );
  }

  if (!entry) {
    return (
      <div className={`${shell} text-center`}>
        <h1 className="text-[22px] font-bold mb-2">Entry not found</h1>
        <Link href={`${WARNLIST_BASE}/claim`} className="text-[13px] text-primary underline">
          {t("warnlist.claimHub.title")}
        </Link>
      </div>
    );
  }

  const amountLabel =
    entry.amountOwed && entry.amountOwed > 0
      ? formatMoney(entry.amountOwed, entry.amountOwedCurrency, moneyLocale)
      : null;

  if (success) {
    return (
      <div className={`${shell} text-center py-12`}>
        <h1 className="text-[22px] font-bold mb-3">{t("warnlist.claim.successTitle")}</h1>
        <p className="text-[14px] text-muted-foreground mb-8">
          {t("warnlist.claim.successBody")}
        </p>
        <Link
          href={`/scamreport/warnlist/${entry.slug}`}
          className="text-[13px] text-primary underline"
        >
          Back to warning list entry
        </Link>
      </div>
    );
  }

  return (
    <div className={shell}>
      <Link
        href={`${WARNLIST_BASE}/claim`}
        className="inline-flex items-center text-[13px] text-muted-foreground hover:text-foreground mb-4"
      >
        &larr; {t("warnlist.claimHub.title")}
      </Link>

      <h1 className="text-[22px] font-bold tracking-tight mb-1">{t("warnlist.fileClaim")}</h1>
      <p className="text-[13px] text-muted-foreground mb-1">{t("warnlist.claim.intro")}</p>
      <p className="text-[14px] font-medium text-foreground mb-6">{entry.name}</p>

      {amountLabel && (
        <div className="mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3">
          <p className="text-[11px] text-muted-foreground">{t("warnlist.amountOwed")}</p>
          <p className="text-[24px] font-bold tabular-nums">{amountLabel}</p>
          <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed">
            {t("warnlist.amountOwedNote")}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
        />

        <fieldset className="space-y-3 rounded-xl border border-border p-4 bg-card">
          <legend className="px-1 text-[12px] font-medium text-muted-foreground">
            {t("warnlist.claim.intentLegend")}
          </legend>
          <label className="flex items-start gap-3 text-[13px] leading-snug cursor-pointer">
            <input
              type="checkbox"
              checked={form.willingToPayVictimAmount}
              onChange={(e) =>
                setForm({ ...form, willingToPayVictimAmount: e.target.checked })
              }
              className="mt-0.5 rounded border-border"
            />
            <span>
              {t("warnlist.claim.willingToPay")}
              {amountLabel ? (
                <strong className="block mt-1 tabular-nums">{amountLabel}</strong>
              ) : null}
            </span>
          </label>
          <label className="flex items-start gap-3 text-[13px] leading-snug cursor-pointer">
            <input
              type="checkbox"
              checked={form.requestDeletion}
              onChange={(e) =>
                setForm({ ...form, requestDeletion: e.target.checked })
              }
              className="mt-0.5 rounded border-border"
            />
            <span>{t("warnlist.claim.requestDeletion")}</span>
          </label>
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border border-border p-4">
          <legend className="px-1 text-[12px] font-medium text-muted-foreground">
            Your details
          </legend>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Full legal name *</label>
            <input
              type="text"
              required
              maxLength={120}
              value={form.claimantName}
              onChange={(e) => setForm({ ...form, claimantName: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Email *</label>
            <input
              type="email"
              required
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Phone *</label>
            <input
              type="tel"
              required
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Postal address *</label>
            <textarea
              required
              rows={3}
              value={form.postalAddress}
              onChange={(e) => setForm({ ...form, postalAddress: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Your relationship *</label>
            <select
              value={form.relationship}
              onChange={(e) =>
                setForm({
                  ...form,
                  relationship: e.target
                    .value as (typeof RELATIONSHIP_OPTIONS)[number]["value"],
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            >
              {RELATIONSHIP_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">Statement *</label>
            <textarea
              required
              rows={5}
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
              placeholder={t("warnlist.claim.statementPlaceholder")}
            />
          </div>
          <label className="flex items-start gap-2 text-[13px]">
            <input
              type="checkbox"
              checked={form.identityConfirmed}
              onChange={(e) => setForm({ ...form, identityConfirmed: e.target.checked })}
              className="mt-1"
            />
            <span>
              I confirm that my identification details are accurate. False claims may have
              legal consequences.
            </span>
          </label>
        </fieldset>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl py-3 bg-foreground text-background text-[13px] font-medium disabled:opacity-50"
        >
          {submitting ? t("warnlist.claim.submitting") : t("warnlist.claim.submit")}
        </button>
      </form>
    </div>
  );
}
