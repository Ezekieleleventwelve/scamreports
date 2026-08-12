"use client";

import { useState, useEffect, useRef } from "react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorName?: string | null;
  user: { name: string | null; image: string | null };
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

function CommentForm({
  postId,
  parentId,
  onSuccess,
  onCancel,
  placeholder,
  submitLabel,
}: {
  postId: string;
  parentId?: string;
  onSuccess: (message: string) => void;
  onCancel?: () => void;
  placeholder: string;
  submitLabel: string;
}) {
  const formOpenedAt = useRef(Date.now());
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName,
          content,
          parentId,
          website,
          formOpenedAt: formOpenedAt.current,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setContent("");
        if (!parentId) setAuthorName("");
        onSuccess(
          data.message ||
            "Thanks! Your comment was received and will appear after moderation."
        );
      } else {
        setError(data.error || "Could not post comment. Please try again.");
      }
    } catch {
      setError("Could not post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
      />
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Your name"
        maxLength={50}
        required
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={parentId ? 2 : 3}
        required
        maxLength={5000}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting || !content.trim() || !authorName.trim()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {submitting ? "Posting..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Comments are moderated before they appear. No account required.
      </p>
    </form>
  );
}

function CommentItem({
  comment,
  postId,
  depth = 0,
  onPendingMessage,
}: {
  comment: Comment;
  postId: string;
  depth?: number;
  onPendingMessage: (message: string) => void;
}) {
  const [replying, setReplying] = useState(false);
  const displayName = comment.user.name || comment.authorName || "Anonymous";

  return (
    <div className={`${depth > 0 ? "ml-8 border-l-2 border-border pl-4" : ""}`}>
      <div className="flex items-start gap-3 py-4">
        {comment.user.image ? (
          <img
            src={comment.user.image}
            alt=""
            className="h-8 w-8 rounded-full flex-shrink-0"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium">
              {displayName[0] || "?"}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">{displayName}</span>
            <span className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-foreground/90">{comment.content}</p>
          {depth < 3 && (
            <button
              onClick={() => setReplying(!replying)}
              className="mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Reply
            </button>
          )}
          {replying && (
            <div className="mt-3">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                placeholder="Write a reply..."
                submitLabel="Post Reply"
                onCancel={() => setReplying(false)}
                onSuccess={(message) => {
                  setReplying(false);
                  onPendingMessage(message);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
          depth={depth + 1}
          onPendingMessage={onPendingMessage}
        />
      ))}
    </div>
  );
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingMessage, setPendingMessage] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postId]);

  return (
    <section className="mt-12" id="comments">
      <h2 className="text-xl font-bold mb-6">
        Comments ({comments.length})
      </h2>

      {pendingMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 px-4 py-3 text-sm text-green-800 dark:text-green-200">
          {pendingMessage}
        </div>
      )}

      <div className="mb-8">
        <CommentForm
          postId={postId}
          placeholder="Share your thoughts or experience..."
          submitLabel="Post Comment"
          onSuccess={setPendingMessage}
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground text-sm">
          No comments yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="divide-y divide-border">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onPendingMessage={setPendingMessage}
            />
          ))}
        </div>
      )}
    </section>
  );
}
