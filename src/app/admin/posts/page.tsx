"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Suspense } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  viewCount: number;
  author: { name: string | null; email: string | null };
  category: { name: string } | null;
  _count: { comments: number; claims: number };
}

function PostsContent() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = statusFilter
      ? `/api/admin/posts?status=${statusFilter}`
      : "/api/admin/posts";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [statusFilter]);

  const updateStatus = async (postId: string, status: string) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status } : p))
      );
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  const statusColors: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
    PUBLISHED: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Posts {statusFilter && `(${statusFilter})`}
        </h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          New Post
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "PUBLISHED", "PENDING", "DRAFT", "REJECTED"].map((s) => (
          <Link
            key={s}
            href={s === "All" ? "/admin/posts" : `/admin/posts?status=${s}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              (s === "All" && !statusFilter) || s === statusFilter
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[post.status] || ""}`}
                    >
                      {post.status}
                    </span>
                    {post.category && (
                      <span className="text-xs text-muted-foreground">
                        {post.category.name}
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-sm truncate">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>by {post.author.name || post.author.email}</span>
                    <span>{formatDate(post.createdAt)}</span>
                    <span>{post.viewCount} views</span>
                    <span>{post._count.comments} comments</span>
                    {post._count.claims > 0 && (
                      <span className="text-red-500">
                        {post._count.claims} claims
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {post.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(post.id, "PUBLISHED")}
                        className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(post.id, "REJECTED")}
                        className="rounded-md bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {post.status === "PUBLISHED" && (
                    <button
                      onClick={() => updateStatus(post.id, "DRAFT")}
                      className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium hover:bg-gray-200 dark:bg-gray-800"
                    >
                      Unpublish
                    </button>
                  )}
                  {post.status === "DRAFT" && (
                    <button
                      onClick={() => updateStatus(post.id, "PUBLISHED")}
                      className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Publish
                    </button>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
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

export default function PostsPage() {
  return (
    <Suspense>
      <PostsContent />
    </Suspense>
  );
}
