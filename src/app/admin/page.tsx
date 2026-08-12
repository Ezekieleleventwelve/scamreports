"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  pendingPosts: number;
  totalUsers: number;
  totalComments: number;
  pendingClaims: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/posts").then((r) => r.json()),
      fetch("/api/admin/users").then((r) => r.json()),
      fetch("/api/claims").then((r) => r.json()),
    ]).then(([postsData, usersData, claimsData]) => {
      const posts = postsData.posts || [];
      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter(
          (p: { status: string }) => p.status === "PUBLISHED"
        ).length,
        pendingPosts: posts.filter(
          (p: { status: string }) => p.status === "PENDING"
        ).length,
        totalUsers: (usersData.users || []).length,
        totalComments: posts.reduce(
          (acc: number, p: { _count?: { comments: number } }) =>
            acc + (p._count?.comments || 0),
          0
        ),
        pendingClaims: (claimsData.claims || []).filter(
          (c: { status: string }) => c.status === "PENDING"
        ).length,
      });
    });
  }, []);

  const cards = [
    {
      label: "Total Posts",
      value: stats?.totalPosts ?? "-",
      href: "/admin/posts",
      color: "text-blue-500",
    },
    {
      label: "Published",
      value: stats?.publishedPosts ?? "-",
      href: "/admin/posts?status=PUBLISHED",
      color: "text-green-500",
    },
    {
      label: "Pending Review",
      value: stats?.pendingPosts ?? "-",
      href: "/admin/posts?status=PENDING",
      color: "text-yellow-500",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers ?? "-",
      href: "/admin/users",
      color: "text-purple-500",
    },
    {
      label: "Comments",
      value: stats?.totalComments ?? "-",
      href: "/admin/comments",
      color: "text-cyan-500",
    },
    {
      label: "Pending Claims",
      value: stats?.pendingClaims ?? "-",
      href: "/admin/claims",
      color: "text-red-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-border p-5 hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border p-5">
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/posts/new"
              className="block rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground text-center hover:opacity-90 transition-opacity"
            >
              Create New Post
            </Link>
            <Link
              href="/admin/posts?status=PENDING"
              className="block rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-center hover:bg-muted transition-colors"
            >
              Review Pending Posts
            </Link>
            <Link
              href="/admin/claims"
              className="block rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-center hover:bg-muted transition-colors"
            >
              Manage Claims
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border p-5">
          <h2 className="font-semibold mb-3">Platform Info</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Platform</dt>
              <dd className="font-medium">scamreports</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Database</dt>
              <dd className="font-medium">SQLite</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Framework</dt>
              <dd className="font-medium">Next.js</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
