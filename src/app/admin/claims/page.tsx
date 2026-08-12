"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface ClaimMessage {
  id: string;
  content: string;
  createdAt: string;
  sender: { name: string | null };
}

interface Claim {
  id: string;
  reason: string;
  claimantName: string;
  contactEmail: string;
  contactPhone: string;
  postalAddress: string;
  relationship: string;
  identityConfirmed: boolean;
  ipAddress: string | null;
  status: string;
  adminNotes: string | null;
  fineAmount: number | null;
  createdAt: string;
  post: { id: string; title: string; slug: string } | null;
  warnlistEntry: {
    id: string;
    name: string;
    slug: string;
    amountOwed: number | null;
    amountOwedCurrency: string;
  } | null;
  paymentAmount: number | null;
  paymentReference: string | null;
  paymentStatus: string | null;
  user: { id: string; name: string | null; email: string | null } | null;
  messages: ClaimMessage[];
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  SUBJECT: "Subject of report",
  LEGAL_REPRESENTATIVE: "Legal representative",
  AUTHORIZED_REPRESENTATIVE: "Authorized representative",
  OTHER: "Other",
};

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [fineAmount, setFineAmount] = useState("");

  useEffect(() => {
    fetch("/api/claims")
      .then((r) => r.json())
      .then((data) => {
        setClaims(data.claims || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateClaim = async (
    claimId: string,
    data: {
      status?: string;
      adminNotes?: string;
      fineAmount?: number;
      paymentStatus?: string;
    }
  ) => {
    const res = await fetch(`/api/claims/${claimId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const updated = await res.json();
      setClaims((prev) =>
        prev.map((c) => (c.id === claimId ? { ...c, ...updated } : c))
      );
    }
  };

  const sendMessage = async (claimId: string) => {
    if (!messageContent.trim()) return;
    const res = await fetch(`/api/claims/${claimId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: messageContent }),
    });
    if (res.ok) {
      const msg = await res.json();
      setClaims((prev) =>
        prev.map((c) =>
          c.id === claimId
            ? { ...c, messages: [...c.messages, msg] }
            : c
        )
      );
      setMessageContent("");
    }
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
    REVIEWING: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    APPROVED: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    DENIED: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    FINED: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Claim Management</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading claims...</p>
      ) : claims.length === 0 ? (
        <p className="text-muted-foreground">No claims found.</p>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="rounded-lg border border-border overflow-hidden"
            >
              {/* Header */}
              <div
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setExpandedId(expandedId === claim.id ? null : claim.id)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[claim.status] || ""}`}
                      >
                        {claim.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(claim.createdAt)}
                      </span>
                    </div>
                    <p className="font-medium text-sm">
                      {claim.warnlistEntry
                        ? `Warnlist: ${claim.warnlistEntry.name}`
                        : claim.post
                          ? `Claim on: “${claim.post.title}”`
                          : "Claim"}
                    </p>
                    {claim.paymentAmount != null && claim.paymentAmount > 0 && (
                      <p className="text-xs font-bold mt-1">
                        Creditor payout: {claim.paymentAmount}{" "}
                        {claim.warnlistEntry?.amountOwedCurrency || "CHF"} ·{" "}
                        {claim.paymentStatus || "—"}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {claim.claimantName} · {claim.contactEmail}
                    </p>
                  </div>
                  <svg
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedId === claim.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Expanded content */}
              {expandedId === claim.id && (
                <div className="border-t border-border p-4 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Legal name
                      </h4>
                      <p>{claim.claimantName}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Relationship
                      </h4>
                      <p>
                        {RELATIONSHIP_LABELS[claim.relationship] ||
                          claim.relationship}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Email
                      </h4>
                      <p>{claim.contactEmail}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Phone
                      </h4>
                      <p>{claim.contactPhone}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Postal address
                      </h4>
                      <p className="whitespace-pre-wrap">{claim.postalAddress}</p>
                    </div>
      <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        Identity declared
                      </h4>
                      <p>{claim.identityConfirmed ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">
                      Statement
                    </h4>
                    <p className="text-sm bg-muted/50 rounded-lg p-3 whitespace-pre-wrap">
                      {claim.reason}
                    </p>
                  </div>

                  {claim.warnlistEntry && (
                    <div className="rounded-lg border border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 p-3 text-sm space-y-2">
                      <p>
                        <span className="font-medium">Payment ref:</span>{" "}
                        {claim.paymentReference || "—"}
                      </p>
                      <p>
                        <span className="font-medium">Amount for creditors:</span>{" "}
                        {claim.paymentAmount ?? "—"}{" "}
                        {claim.warnlistEntry.amountOwedCurrency}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateClaim(claim.id, { paymentStatus: "VERIFIED" })
                          }
                          className="rounded-md bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800"
                        >
                          Verify payout (creditors)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateClaim(claim.id, { paymentStatus: "UNPAID" })
                          }
                          className="rounded-md border border-border px-3 py-1.5 text-xs"
                        >
                          Mark unpaid
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        updateClaim(claim.id, { status: "REVIEWING" })
                      }
                      className="rounded-md bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      Mark Reviewing
                    </button>
                    <button
                      onClick={() =>
                        updateClaim(claim.id, { status: "APPROVED" })
                      }
                      className="rounded-md bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                    >
                      {claim.warnlistEntry ? "Approve (Remove from warnlist)" : "Approve (Remove Post)"}
                    </button>
                    <button
                      onClick={() =>
                        updateClaim(claim.id, { status: "DENIED" })
                      }
                      className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400"
                    >
                      Deny
                    </button>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        placeholder="Fine $"
                        value={fineAmount}
                        onChange={(e) => setFineAmount(e.target.value)}
                        className="w-24 rounded-md border border-border bg-background px-2 py-1.5 text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (fineAmount) {
                            updateClaim(claim.id, {
                              status: "FINED",
                              fineAmount: parseFloat(fineAmount),
                            });
                            setFineAmount("");
                          }
                        }}
                        className="rounded-md bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700 hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-400"
                      >
                        Set Fine
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      Messages ({claim.messages.length})
                    </h4>
                    <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
                      {claim.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="bg-muted/50 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">
                              {msg.sender.name || "Unknown"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(msg.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="Send a message to the claimant..."
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") sendMessage(claim.id);
                        }}
                      />
                      <button
                        onClick={() => sendMessage(claim.id)}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
