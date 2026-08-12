"use client";

import { useEffect, useState } from "react";

interface WarnlistEntry {
  id: string;
  type: string;
  name: string;
  slug: string;
  summary: string;
  websites: string;
  status: string;
  listedAt: string;
  reportSlug: string | null;
  amountOwed: number | null;
  amountOwedCurrency: string;
}

const emptyForm = {
  type: "COMPANY",
  name: "",
  aliases: "",
  websites: "",
  country: "",
  location: "",
  summary: "",
  sourceLabel: "",
  sourceUrl: "",
  reportSlug: "",
  amountOwed: "",
  amountOwedCurrency: "CHF",
};

export default function AdminWarnlistPage() {
  const [entries, setEntries] = useState<WarnlistEntry[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/warnlist");
    const data = await res.json();
    setEntries(data.entries || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/warnlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amountOwed: form.amountOwed ? parseFloat(form.amountOwed) : null,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error ? JSON.stringify(data.error) : "Failed to save");
      return;
    }
    setForm(emptyForm);
    load();
  }

  async function toggleStatus(id: string, status: string) {
    await fetch(`/api/admin/warnlist/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status === "ACTIVE" ? "REMOVED" : "ACTIVE" }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this warnlist entry permanently?")) return;
    await fetch(`/api/admin/warnlist/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-muted-foreground">Loading warnlist…</p>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Warning list</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Add persons or companies to the public register at{" "}
        <a href="/scamreport/warnlist" className="underline" target="_blank" rel="noreferrer">
          /scamreport/warnlist
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="border border-border p-6 mb-10 space-y-4">
        <h2 className="font-bold text-sm uppercase tracking-wider">New entry</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-sm">
            Type
            <select
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="COMPANY">Company</option>
              <option value="PERSON">Person</option>
            </select>
          </label>
          <label className="block text-sm">
            Name *
            <input
              required
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
        </div>
        <label className="block text-sm">
          Summary * (shown on warnlist)
          <textarea
            required
            rows={4}
            className="mt-1 w-full border border-border bg-background px-3 py-2"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-sm">
            Websites (comma-separated)
            <input
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.websites}
              onChange={(e) => setForm({ ...form, websites: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            Aliases
            <input
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.aliases}
              onChange={(e) => setForm({ ...form, aliases: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            Location
            <input
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            Country
            <input
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            Geschuldeter Betrag (amount owed)
            <input
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 20000"
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.amountOwed}
              onChange={(e) => setForm({ ...form, amountOwed: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            Currency
            <input
              maxLength={3}
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.amountOwedCurrency}
              onChange={(e) => setForm({ ...form, amountOwedCurrency: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            Link to full report (slug only)
            <input
              placeholder="e.g. jonathan-wolpe-united-aviation-group-..."
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.reportSlug}
              onChange={(e) => setForm({ ...form, reportSlug: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            Source URL
            <input
              type="url"
              className="mt-1 w-full border border-border bg-background px-3 py-2"
              value={form.sourceUrl}
              onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
            />
          </label>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-foreground text-background text-sm font-bold uppercase tracking-wider disabled:opacity-50"
        >
          {saving ? "Saving…" : "Add to warnlist"}
        </button>
      </form>

      <h2 className="font-bold mb-4">All entries ({entries.length})</h2>
      <ul className="divide-y divide-border border border-border">
        {entries.map((e) => (
          <li key={e.id} className="px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {e.type} · {e.status}
              </span>
              <p className="font-bold">{e.name}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{e.summary}</p>
              {e.amountOwed != null && e.amountOwed > 0 && (
                <p className="text-xs font-bold mt-1">
                  {e.amountOwed.toLocaleString()} {e.amountOwedCurrency}
                </p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <a href={`/scamreport/warnlist/${e.slug}`} className="text-xs underline" target="_blank" rel="noreferrer">
                View
              </a>
              <button
                type="button"
                onClick={() => toggleStatus(e.id, e.status)}
                className="text-xs underline"
              >
                {e.status === "ACTIVE" ? "Hide" : "Restore"}
              </button>
              <button type="button" onClick={() => remove(e.id)} className="text-xs text-red-600 underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
