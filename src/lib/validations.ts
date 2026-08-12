import { z } from "zod";

// --- Post schemas ---

export const createPostSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(300),
  content: z.string().trim().min(20, "Content must be at least 20 characters").max(100_000),
  excerpt: z.string().trim().max(500).optional().default(""),
  categoryId: z.string().max(50).optional().default(""),
  tags: z.string().trim().max(1000).optional().default(""),
  keywords: z.string().trim().max(2000).optional().default(""),
  featuredImage: z
    .string()
    .trim()
    .min(1, "Featured image (Anzeigebild) is required")
    .max(2000),
  image1: z.string().max(2000).optional().or(z.literal("")),
  image2: z.string().max(2000).optional().or(z.literal("")),
  image3: z.string().max(2000).optional().or(z.literal("")),
});

export const updatePostSchema = z.object({
  title: z.string().trim().min(5).max(300).optional(),
  content: z.string().trim().min(20).max(100_000).optional(),
  excerpt: z.string().trim().max(500).optional(),
  status: z.enum(["DRAFT", "PENDING", "PUBLISHED", "REJECTED"]).optional(),
  categoryId: z.string().max(50).optional().nullable(),
  tags: z.string().trim().max(1000).optional(),
  keywords: z.string().trim().max(2000).optional(),
  featuredImage: z.string().max(2000).optional().nullable().or(z.literal("")),
  image1: z.string().max(2000).optional().nullable().or(z.literal("")),
  image2: z.string().max(2000).optional().nullable().or(z.literal("")),
  image3: z.string().max(2000).optional().nullable().or(z.literal("")),
  metaTitle: z.string().trim().max(300).optional(),
  metaDescription: z.string().trim().max(500).optional(),
  translations: z.string().max(500_000).optional(),
});

// --- Comment schemas ---

export const createCommentSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z0-9\s.'-]+$/, "Name contains invalid characters"),
  content: z.string().trim().min(1, "Comment cannot be empty").max(5000),
  parentId: z.string().max(50).optional().nullable(),
  website: z.string().max(0).optional(),
  formOpenedAt: z.number().int().positive(),
  turnstileToken: z.string().max(2048).optional(),
});

// --- Claim schemas ---

const claimIdentityFields = {
  claimantName: z
    .string()
    .trim()
    .min(2, "Full legal name is required")
    .max(120, "Name is too long")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s.'-]+$/, "Name contains invalid characters"),
  contactEmail: z.string().trim().email("Invalid email address").max(254),
  contactPhone: z
    .string()
    .trim()
    .min(6, "Phone number is required")
    .max(40, "Phone number is too long")
    .regex(/^[+0-9\s().-]+$/, "Invalid phone number"),
  postalAddress: z
    .string()
    .trim()
    .min(10, "Full postal address is required")
    .max(500, "Address is too long"),
  relationship: z.enum([
    "SUBJECT",
    "LEGAL_REPRESENTATIVE",
    "AUTHORIZED_REPRESENTATIVE",
    "OTHER",
  ]),
  reason: z.string().trim().min(20, "Please describe your claim in detail").max(5000),
  identityConfirmed: z.literal(true, {
    message: "You must confirm your identity declaration",
  }),
  website: z.string().max(0).optional(),
  formOpenedAt: z.number().int().positive(),
  turnstileToken: z.string().max(2048).optional(),
  willingToPayVictimAmount: z.boolean().optional().default(false),
  requestDeletion: z.boolean().optional().default(false),
};

export const createClaimSchema = z
  .object({
    postId: z.string().min(1).max(50).optional(),
    warnlistEntryId: z.string().min(1).max(50).optional(),
    warnlistSlug: z.string().min(1).max(120).optional(),
    paymentReference: z.string().trim().min(4).max(140).optional(),
    ...claimIdentityFields,
  })
  .refine((d) => Boolean(d.postId) !== Boolean(d.warnlistEntryId || d.warnlistSlug), {
    message: "Claim must target either a post or a warnlist entry",
  });

export const updateClaimSchema = z.object({
  status: z.enum(["PENDING", "REVIEWING", "APPROVED", "DENIED", "FINED"]).optional(),
  adminNotes: z.string().trim().max(5000).optional().nullable(),
  fineAmount: z.number().min(0).max(1_000_000).optional().nullable(),
  paymentStatus: z.enum(["UNPAID", "SUBMITTED", "VERIFIED"]).optional().nullable(),
});

export const claimMessageSchema = z.object({
  content: z.string().trim().min(1, "Message cannot be empty").max(5000),
});

// --- Warnlist public submission ---

export const warnlistSubmissionSchema = z.object({
  type: z.enum(["PERSON", "COMPANY"]),
  name: z.string().trim().min(2, "Name is required").max(200),
  aliases: z.string().trim().max(500).optional().default(""),
  location: z.string().trim().max(300).optional().default(""),
  country: z.string().trim().max(120).optional().default(""),
  summary: z.string().trim().min(30, "Please describe the case in more detail").max(5000),
  amountOwed: z.number().min(0).max(1_000_000_000).optional().nullable(),
  amountOwedCurrency: z.enum(["CHF", "EUR", "USD", "GBP"]).optional().default("CHF"),
  contactEmail: z.string().trim().email("Invalid email address").max(254),
  submitterName: z.string().trim().max(120).optional().default(""),
  website: z.string().max(0).optional(),
  formOpenedAt: z.number().int().positive(),
  turnstileToken: z.string().max(2048).optional(),
});

export const reportSubmissionSchema = z.object({
  title: z.string().trim().min(8, "Title is required").max(300),
  content: z
    .string()
    .trim()
    .min(80, "Please describe the case in more detail")
    .max(50_000),
  excerpt: z.string().trim().max(500).optional().default(""),
  subjectName: z.string().trim().max(200).optional().default(""),
  subjectType: z.enum(["PERSON", "COMPANY"]).optional().nullable(),
  contactEmail: z.string().trim().email("Invalid email address").max(254),
  submitterName: z.string().trim().max(120).optional().default(""),
  evidenceUrls: z.string().trim().max(2000).optional().default(""),
  website: z.string().max(0).optional(),
  formOpenedAt: z.number().int().positive(),
  turnstileToken: z.string().max(2048).optional(),
});

export const updateReportSubmissionSchema = z.object({
  status: z
    .enum([
      "PENDING",
      "REVIEWING",
      "AWAITING_PAYMENT",
      "APPROVED",
      "REJECTED",
      "PUBLISHED",
    ])
    .optional(),
  adminNotes: z.string().trim().max(5000).optional().nullable(),
  paymentStatus: z.enum(["UNPAID", "SUBMITTED", "VERIFIED"]).optional().nullable(),
  paymentAmount: z.number().min(0).max(1_000_000).optional().nullable(),
  paymentReference: z.string().trim().max(140).optional().nullable(),
  publishedPostId: z.string().max(50).optional().nullable(),
});

// --- Admin user schemas ---

export const updateUserSchema = z.object({
  userId: z.string().min(1, "User ID is required").max(50),
  banned: z.boolean().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

// --- Admin posts filter ---

export const postStatusFilter = z.enum(["DRAFT", "PENDING", "PUBLISHED", "REJECTED"]).optional();

// --- Helper to parse and return error response ---

import { NextResponse } from "next/server";

export function parseBody<T>(schema: z.ZodSchema<T>, data: unknown):
  | { success: true; data: T }
  | { success: false; error: NextResponse } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Invalid input";
    return {
      success: false,
      error: NextResponse.json({ error: firstError }, { status: 400 }),
    };
  }
  return { success: true, data: result.data };
}
