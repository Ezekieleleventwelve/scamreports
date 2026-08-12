"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import TurnstileField, {
  isTurnstileConfigured,
} from "@/components/security/TurnstileField";

export default function SubmitReportPage() {
  const { t } = useLocale();
  const formOpenedAt = useRef(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{
    reference: string;
    amount: number | null;
    currency: string;
    accountName: string;
    iban: string;
    note: string;
  } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const onToken = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    subjectName: "",
    subjectType: "" as "" | "PERSON" | "COMPANY",
    contactEmail: "",
    submitterName: "",
    evidenceUrls: "",
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
      const res = await fetch("/api/reports/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          excerpt: form.excerpt,
          subjectName: form.subjectName,
          subjectType: form.subjectType || null,
          contactEmail: form.contactEmail,
          submitterName: form.submitterName,
          evidenceUrls: form.evidenceUrls,
          website: form.website,
          formOpenedAt: formOpenedAt.current,
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        if (data.payment) setPaymentInfo(data.payment);
      } else {
        setError(
          typeof data.error === "string" ? data.error : t("submit.errorFailed")
        );
      }
    } catch {
      setError(t("submit.errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-3">{t("submit.successTitle")}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {t("submit.successMessage")}
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          {t("submit.reviewTime")}
        </p>
        {paymentInfo && (
          <div className="text-left rounded-lg border border-border p-4 mb-8 text-sm space-y-2">
            <p className="font-medium">{t("submit.paymentTitle")}</p>
            <p className="text-muted-foreground text-xs">{paymentInfo.note}</p>
            {paymentInfo.amount != null && (
              <p>
                {t("submit.paymentAmount")}: {paymentInfo.amount}{" "}
                {paymentInfo.currency}
              </p>
            )}
            <p>
              {t("submit.paymentReference")}:{" "}
              <span className="font-mono">{paymentInfo.reference}</span>
            </p>
            <p>
              {paymentInfo.accountName}
              <br />
              IBAN: <span className="font-mono">{paymentInfo.iban}</span>
            </p>
          </div>
        )}
        <Link href="/" className="text-sm font-medium text-primary underline">
          {t("submit.backHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
        {t("submit.badge")}
      </p>
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        {t("submit.title")}
      </h1>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {t("submit.subtitle")}
      </p>

      <div className="rounded-lg border border-border bg-muted/40 p-4 mb-8 text-sm space-y-2">
        <p className="font-medium">{t("submit.legalReviewTitle")}</p>
        <p className="text-muted-foreground text-[13px] leading-relaxed">
          {t("submit.legalReviewText")}
        </p>
        <p className="text-xs text-muted-foreground">
          {t("submit.legalReviewTime")} · {t("submit.legalEvidenceNote")}
        </p>
      </div>

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
          <label className="block text-xs font-medium mb-1.5">
            {t("submit.titleLabel")}
          </label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder={t("submit.titlePlaceholder")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            {t("submit.titleHint")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5">
              {t("submit.subjectNameLabel")}
            </label>
            <input
              value={form.subjectName}
              onChange={(e) =>
                setForm({ ...form, subjectName: e.target.value })
              }
              placeholder={t("submit.subjectNamePlaceholder")}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">
              {t("submit.subjectTypeLabel")}
            </label>
            <select
              value={form.subjectType}
              onChange={(e) =>
                setForm({
                  ...form,
                  subjectType: e.target.value as "" | "PERSON" | "COMPANY",
                })
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">{t("submit.subjectTypeSelect")}</option>
              <option value="PERSON">{t("warnlist.filterPersons")}</option>
              <option value="COMPANY">{t("warnlist.filterCompanies")}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5">
            {t("submit.excerptLabel")}
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder={t("submit.excerptPlaceholder")}
            rows={2}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5">
            {t("submit.contentLabel")}
          </label>
          <textarea
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder={t("submit.contentPlaceholder")}
            rows={12}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono"
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            {t("submit.contentHint")}
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5">
            {t("submit.evidenceUrlsLabel")}
          </label>
          <textarea
            value={form.evidenceUrls}
            onChange={(e) =>
              setForm({ ...form, evidenceUrls: e.target.value })
            }
            placeholder={t("submit.evidenceUrlsPlaceholder")}
            rows={2}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5">
              {t("submit.contactEmailLabel")}
            </label>
            <input
              required
              type="email"
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">
              {t("submit.submitterNameLabel")}
            </label>
            <input
              value={form.submitterName}
              onChange={(e) =>
                setForm({ ...form, submitterName: e.target.value })
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <TurnstileField onToken={onToken} />

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {t("submit.disclaimer")}
        </p>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-black text-white text-sm font-medium disabled:opacity-50"
        >
          {submitting ? t("submit.submitting") : t("submit.submit")}
        </button>
      </form>
    </div>
  );
}
