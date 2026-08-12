"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  content: string;
  authorName: string | null;
  displayName: string;
  status: string;
  ipAddress: string | null;
  createdAt: string;
  user: { name: string | null; email: string | null } | null;
  post: { title: string; slug: string };
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING">("PENDING");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/comments")
      .then((r) => r.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;
    const res = await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const visible =
    filter === "PENDING"
      ? comments.filter((c) => c.status === "PENDING")
      : comments;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Comment Moderation</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("PENDING")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${
              filter === "PENDING"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            Pending ({comments.filter((c) => c.status === "PENDING").length})
          </button>
          <button
            onClick={() => setFilter("ALL")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${
              filter === "ALL" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading comments...</p>
      ) : visible.length === 0 ? (
        <p className="text-muted-foreground">No comments in this view.</p>
      ) : (
        <div className="space-y-3">
          {visible.map((comment) => (
            <div
              key={comment.id}
              className={`rounded-lg border p-4 ${
                comment.status === "PENDING"
                  ? "border-amber-300 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">
                      {comment.displayName}
                    </span>
                    <span className="text-xs rounded-full bg-muted px-2 py-0.5">
                      {comment.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      on &ldquo;{comment.post.title}&rdquo;
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 mb-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  {comment.status === "PENDING" && (
                    <button
                      onClick={() => updateStatus(comment.id, "VISIBLE")}
                      className="rounded-md px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-50 dark:hover:bg-green-900/10"
                    >
                      Approve
                    </button>
                  )}
                  {comment.status === "VISIBLE" && (
                    <button
                      onClick={() => updateStatus(comment.id, "HIDDEN")}
                      className="rounded-md px-2.5 py-1 text-xs font-medium text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/10"
                    >
                      Hide
                    </button>
                  )}
                  {comment.status !== "REJECTED" && (
                    <button
                      onClick={() => updateStatus(comment.id, "REJECTED")}
                      className="rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
