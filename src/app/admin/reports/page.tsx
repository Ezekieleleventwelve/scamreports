"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface Report {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  subjectName: string | null;
  subjectType: string | null;
  contactEmail: string;
  submitterName: string | null;
  evidenceUrls: string;
  status: string;
  adminNotes: string | null;
  paymentAmount: number | null;
  paymentReference: string | null;
  paymentStatus: string | null;
  publishedPostId: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUSES = [
  "PENDING",
  "REVIEWING",
  "AWAITING_PAYMENT",
  "APPROVED",
  "REJECTED",
  "PUBLISHED",
] as const;

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((r) => r.json())
      .then((data) => {
        setReports(data.reports || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateReport = async (
    id: string,
    data: {
      status?: string;
      adminNotes?: string;
      paymentStatus?: string;
    }
  ) => {
    const res = await fetch(`/api/admin/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
      );
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading reports…</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Report inbox</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Public submissions. Review individually. Confirm manual payment before
        publish. Never auto-publish.
      </p>

      {reports.length === 0 ? (
        <p className="text-muted-foreground">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const open = expandedId === report.id;
            return (
              <div
                key={report.id}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => {
                    setExpandedId(open ? null : report.id);
                    setNotes(report.adminNotes || "");
                  }}
                  className="w-full text-left px-4 py-3 flex flex-wrap items-center gap-3 hover:bg-muted/40"
                >
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted">
                    {report.status}
                  </span>
                  <span className="font-medium text-sm flex-1 min-w-0 truncate">
                    {report.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(new Date(report.createdAt))}
                  </span>
                </button>

                {open && (
                  <div className="px-4 pb-4 border-t border-border space-y-4 pt-3">
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <p>
                        <span className="text-muted-foreground">Contact: </span>
                        {report.contactEmail}
                        {report.submitterName
                          ? ` (${report.submitterName})`
                          : ""}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Subject: </span>
                        {report.subjectName || "—"}{" "}
                        {report.subjectType
                          ? `(${report.subjectType})`
                          : ""}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Payment: </span>
                        {report.paymentStatus || "—"}
                        {report.paymentReference
                          ? ` · ${report.paymentReference}`
                          : ""}
                        {report.paymentAmount != null
                          ? ` · ${report.paymentAmount}`
                          : ""}
                      </p>
                    </div>

                    {report.excerpt && (
                      <p className="text-sm text-muted-foreground">
                        {report.excerpt}
                      </p>
                    )}

                    <pre className="text-xs whitespace-pre-wrap bg-muted/50 rounded-md p-3 max-h-80 overflow-auto">
                      {report.content}
                    </pre>

                    {report.evidenceUrls && (
                      <p className="text-xs break-all">
                        Evidence: {report.evidenceUrls}
                      </p>
                    )}

                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Admin notes (internal)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        className="mt-2 text-xs px-3 py-1.5 rounded-md border border-border"
                        onClick={() =>
                          updateReport(report.id, { adminNotes: notes })
                        }
                      >
                        Save notes
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateReport(report.id, { status })}
                          className={`text-xs px-2.5 py-1 rounded-md border ${
                            report.status === status
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(["UNPAID", "SUBMITTED", "VERIFIED"] as const).map(
                        (ps) => (
                          <button
                            key={ps}
                            type="button"
                            onClick={() =>
                              updateReport(report.id, { paymentStatus: ps })
                            }
                            className={`text-xs px-2.5 py-1 rounded-md border ${
                              report.paymentStatus === ps
                                ? "bg-muted font-medium"
                                : "border-border"
                            }`}
                          >
                            Pay: {ps}
                          </button>
                        )
                      )}
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      After VERIFIED + APPROVED, publish via Posts (New Post)
                      using this content, then set status PUBLISHED and paste
                      the post id if needed.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
