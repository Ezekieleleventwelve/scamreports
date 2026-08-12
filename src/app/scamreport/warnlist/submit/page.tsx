"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { WARNLIST_PAGE } from "@/components/warnlist/warnlist-layout";
import TurnstileField, {
  isTurnstileConfigured,
} from "@/components/security/TurnstileField";

const CURRENCIES = ["CHF", "EUR", "USD", "GBP"] as const;

function parseAmountInput(raw: string): number | null {
  const cleaned = raw.replace(/[''\s]/g, "").replace(/,/g, ".");
  if (!cleaned) return null;
  const n = parseFloat(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function WarnlistSubmitPage() {
  const { t } = useLocale();
  const formOpenedAt = useRef(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const onToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  const [form, setForm] = useState({
    type: "PERSON" as "PERSON" | "COMPANY",
    name: "",
    aliases: "",
    location: "",
    country: "",
    summary: "",
    amountOwed: "",
    amountOwedCurrency: "CHF" as (typeof CURRENCIES)[number],
    contactEmail: "",
    submitterName: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (isTurnstileConfigured() && !turnstileToken) {
      setError(t("submit.errorBot"));
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/warnlist/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          name: form.name,
          aliases: form.aliases,
          location: form.location,
          country: form.country,
          summary: form.summary,
          amountOwed: parseAmountInput(form.amountOwed),
          amountOwedCurrency: form.amountOwedCurrency,
          contactEmail: form.contactEmail,
          submitterName: form.submitterName,
          website: form.website,
          formOpenedAt: formOpenedAt.current,
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(typeof data.error === "string" ? data.error : t("warnlist.submit.error"));
      }
    } catch {
      setError(t("warnlist.submit.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={`${WARNLIST_PAGE} text-center py-12`}>
        <h1 className="text-[22px] font-bold mb-3">{t("warnlist.submit.successTitle")}</h1>
        <p className="text-[14px] text-muted-foreground mb-8 max-w-md mx-auto">
          {t("warnlist.submit.successBody")}
        </p>
        <Link href="/scamreport/warnlist" className="text-[13px] font-medium text-primary underline">
          {t("warnlist.backToList")}
        </Link>
      </div>
    );
  }

  return (
    <div className={WARNLIST_PAGE}>
      <Link
        href="/scamreport/warnlist"
        className="inline-flex items-center text-[13px] text-muted-foreground hover:text-foreground mb-4"
      >
        &larr; {t("warnlist.backToList")}
      </Link>

      <h1 className="text-[22px] font-bold tracking-tight mb-1">
        {t("warnlist.submit.title")}
      </h1>
      <p className="text-[13px] text-muted-foreground mb-6 leading-relaxed">
        {t("warnlist.submit.intro")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
        />

        <div>
          <label className="block text-[12px] font-medium mb-1.5">
            {t("warnlist.submit.typeLabel")}
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as "PERSON" | "COMPANY" })
            }
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          >
            <option value="PERSON">{t("warnlist.filterPersons")}</option>
            <option value="COMPANY">{t("warnlist.filterCompanies")}</option>
          </select>
        </div>

        <div>
          <label className="block text-[12px] font-medium mb-1.5">
            {t("warnlist.submit.nameLabel")} *
          </label>
          <input
            type="text"
            required
            maxLength={200}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            placeholder={t("warnlist.submit.namePlaceholder")}
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium mb-1.5">
            {t("warnlist.submit.aliasesLabel")}
          </label>
          <input
            type="text"
            maxLength={500}
            value={form.aliases}
            onChange={(e) => setForm({ ...form, aliases: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            placeholder={t("warnlist.submit.aliasesPlaceholder")}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              {t("warnlist.submit.locationLabel")}
            </label>
            <input
              type="text"
              maxLength={300}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
              placeholder={t("warnlist.submit.locationPlaceholder")}
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              {t("warnlist.submit.countryLabel")}
            </label>
            <input
              type="text"
              maxLength={120}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              {t("warnlist.amountOwed")}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={form.amountOwed}
              onChange={(e) => setForm({ ...form, amountOwed: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
              placeholder="30'000"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              {t("warnlist.submit.currencyLabel")}
            </label>
            <select
              value={form.amountOwedCurrency}
              onChange={(e) =>
                setForm({
                  ...form,
                  amountOwedCurrency: e.target.value as (typeof CURRENCIES)[number],
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-medium mb-1.5">
            {t("warnlist.submit.summaryLabel")} *
          </label>
          <textarea
            required
            rows={6}
            maxLength={5000}
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            placeholder={t("warnlist.submit.summaryPlaceholder")}
          />
        </div>

        <fieldset className="rounded-xl border border-border p-4 space-y-4">
          <legend className="px-1 text-[12px] font-medium text-muted-foreground">
            {t("warnlist.submit.contactLegend")}
          </legend>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              {t("warnlist.submit.emailLabel")} *
            </label>
            <input
              type="email"
              required
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              {t("warnlist.submit.yourNameLabel")}
            </label>
            <input
              type="text"
              maxLength={120}
              value={form.submitterName}
              onChange={(e) => setForm({ ...form, submitterName: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
        </fieldset>

        <TurnstileField onToken={onToken} />

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {t("warnlist.submit.disclaimer")}
        </p>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl py-3 bg-foreground text-background text-[13px] font-semibold disabled:opacity-50"
        >
          {submitting ? t("warnlist.submit.submitting") : t("warnlist.submit.submit")}
        </button>
      </form>
    </div>
  );
}
