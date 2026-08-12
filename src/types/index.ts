import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export interface PostWithAuthor {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  status: string;
  categoryId: string | null;
  tags: string;
  keywords: string;
  metaTitle: string | null;
  metaDescription: string | null;
  translations: string;
  authorId: string;
  viewCount: number;
  readingTime: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  _count?: {
    comments: number;
  };
}

export interface CommentWithUser {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentId: string | null;
  ipAddress: string | null;
  status: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  replies?: CommentWithUser[];
}

export interface ClaimWithDetails {
  id: string;
  postId: string;
  userId: string;
  reason: string;
  contactEmail: string;
  status: string;
  adminNotes: string | null;
  fineAmount: number | null;
  createdAt: Date;
  updatedAt: Date;
  post: {
    id: string;
    title: string;
    slug: string;
  };
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  messages: {
    id: string;
    content: string;
    senderId: string;
    createdAt: Date;
    sender: {
      name: string | null;
      role?: string;
    };
  }[];
}
