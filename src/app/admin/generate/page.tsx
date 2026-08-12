"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export default function GeneratePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    id: string;
    title: string;
    slug: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/posts?categories=true")
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim() || topic.trim().length < 5) {
      setError("Topic must be at least 5 characters.");
      return;
    }
    setGenerating(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), context: context.trim(), categoryId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult(data.post);
      } else {
        setError(data.error || "Generation failed.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">AI Draft Generator</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Enter a topic, company name, or person — Claude will research and write an investigative draft article.
        The article is saved as <strong>DRAFT</strong> for your review before publishing.
      </p>

      {result && (
        <div className="mb-8 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/10 p-6">
          <h2 className="font-bold text-green-700 dark:text-green-400 mb-2">
            Draft Generated
          </h2>
          <p className="text-sm mb-4">&ldquo;{result.title}&rdquo;</p>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/admin/posts/${result.id}/edit`)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Review &amp; Edit
            </button>
            <button
              onClick={() => {
                setResult(null);
                setTopic("");
                setContext("");
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Generate Another
            </button>
          </div>
        </div>
      )}

      {!result && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Topic / Subject *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Savendis AG Zürich phone brokerage fraud, or a person/company name..."
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Be specific — include company names, locations, regulatory bodies involved.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Additional Context (optional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Any details, sources, quotes, or notes you want included in the article..."
              rows={6}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Paste in facts, URLs, quotes, or background info. The more context, the better the draft.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating draft... (30-60 seconds)
              </span>
            ) : (
              "Generate Draft with AI"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
