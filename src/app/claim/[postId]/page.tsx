"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface PostInfo {
  title: string;
  slug: string;
}

const RELATIONSHIP_OPTIONS = [
  { value: "SUBJECT", label: "I am the person named in this report" },
  { value: "LEGAL_REPRESENTATIVE", label: "I am their legal representative" },
  {
    value: "AUTHORIZED_REPRESENTATIVE",
    label: "I am an authorized representative (with proof)",
  },
  { value: "OTHER", label: "Other (explain in your statement)" },
] as const;

export default function ClaimPage() {
  const { postId } = useParams();
  const router = useRouter();
  const formOpenedAt = useRef(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [post, setPost] = useState<PostInfo | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const [form, setForm] = useState({
    claimantName: "",
    contactEmail: "",
    contactPhone: "",
    postalAddress: "",
    relationship: "SUBJECT" as (typeof RELATIONSHIP_OPTIONS)[number]["value"],
    reason: "",
    identityConfirmed: false,
    website: "",
  });

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/${postId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.title) setPost({ title: data.title, slug: data.slug });
          setLoadingPost(false);
        })
        .catch(() => setLoadingPost(false));
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identityConfirmed) {
      setError("You must confirm the identity declaration.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          claimantName: form.claimantName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          postalAddress: form.postalAddress,
          relationship: form.relationship,
          reason: form.reason,
          identityConfirmed: true,
          website: form.website,
          formOpenedAt: formOpenedAt.current,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Could not submit claim. Please try again.");
      }
    } catch {
      setError("Could not submit claim. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPost) {
    return (
      <div className="mx-auto max-w-[680px] px-5 lg:px-8 py-16 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-[680px] px-5 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Article not found</h1>
        <Link href="/" className="text-sm text-primary hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-[680px] px-5 lg:px-8 py-24 text-center">
        <h1 className="text-[30px] font-black tracking-[-0.015em] mb-3">
          Claim submitted
        </h1>
        <p className="text-[14px] text-muted-foreground mb-8 max-w-md mx-auto">
          We received your identification details and statement. Our team will
          review your claim and contact you at the email address you provided.
        </p>
        <Link
          href={`/${post.slug}`}
          className="inline-flex items-center border-2 border-foreground px-6 py-3 text-[12px] font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
        >
          Back to article
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[680px] px-5 lg:px-8 py-12">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
        Formal claim — identity required
      </p>
      <h1 className="text-[30px] sm:text-[38px] font-black tracking-[-0.015em] leading-[1.1] mb-2">
        File a claim
      </h1>
      <p className="text-[14px] text-muted-foreground mb-8">
        Regarding: <strong className="text-foreground">{post.title}</strong>
      </p>

      <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/30 px-4 py-3 text-sm">
        To process a correction or removal request, you must identify yourself
        with your full legal name, contact details, and postal address. False
        claims may have legal consequences. Your IP address is recorded.
      </div>

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

        <fieldset className="space-y-4 border border-border p-5">
          <legend className="px-2 text-[12px] font-bold uppercase tracking-wider">
            Your identity
          </legend>

          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              Full legal name *
            </label>
            <input
              type="text"
              required
              maxLength={120}
              value={form.claimantName}
              onChange={(e) =>
                setForm({ ...form, claimantName: e.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="As on official ID"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              Email address *
            </label>
            <input
              type="email"
              required
              maxLength={254}
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              Phone number *
            </label>
            <input
              type="tel"
              required
              maxLength={40}
              value={form.contactPhone}
              onChange={(e) =>
                setForm({ ...form, contactPhone: e.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="+41 79 000 00 00"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              Full postal address *
            </label>
            <textarea
              required
              rows={3}
              maxLength={500}
              value={form.postalAddress}
              onChange={(e) =>
                setForm({ ...form, postalAddress: e.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="Street, postal code, city, country"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium mb-1.5">
              Your relationship to this report *
            </label>
            <select
              required
              value={form.relationship}
              onChange={(e) =>
                setForm({
                  ...form,
                  relationship: e.target
                    .value as (typeof RELATIONSHIP_OPTIONS)[number]["value"],
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {RELATIONSHIP_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <div>
          <label className="block text-[12px] font-medium mb-1.5">
            Statement / reason for claim *
          </label>
          <textarea
            required
            rows={8}
            maxLength={5000}
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="Explain why this report should be reviewed, corrected, or removed. Include facts and any supporting references."
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.identityConfirmed}
            onChange={(e) =>
              setForm({ ...form, identityConfirmed: e.target.checked })
            }
            className="mt-1"
          />
          <span className="text-[13px] text-foreground/90 leading-relaxed">
            I declare that the identification information above is true and
            complete. I am the person described above, or I am legally authorized
            to act on their behalf. I understand that false or misleading claims
            may result in legal action.
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit claim with identification"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg px-6 py-3 text-[12px] font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
