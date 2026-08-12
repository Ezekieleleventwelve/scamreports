import { stripHtml } from "@/lib/sanitize";

const MIN_FORM_MS = 3_000;
const MAX_LINKS = 3;

const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|porn|xxx)\b/i,
  /\b(click here|buy now|limited offer)\b/i,
  /(https?:\/\/[^\s]+){4,}/i,
];

export type CommentSpamInput = {
  content: string;
  authorName: string;
  website?: string;
  formOpenedAt?: number;
};

export type CommentSpamResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export function checkCommentSpam(input: CommentSpamInput): CommentSpamResult {
  if (input.website?.trim()) {
    return { ok: false, status: 400, error: "Invalid submission." };
  }

  const openedAt = input.formOpenedAt;
  if (typeof openedAt !== "number" || !Number.isFinite(openedAt)) {
    return { ok: false, status: 400, error: "Invalid submission." };
  }

  const elapsed = Date.now() - openedAt;
  if (elapsed < MIN_FORM_MS) {
    return { ok: false, status: 400, error: "Please wait a moment before submitting." };
  }

  const plain = stripHtml(input.content).trim();
  const linkCount = (plain.match(/https?:\/\//gi) || []).length;
  if (linkCount > MAX_LINKS) {
    return { ok: false, status: 400, error: "Too many links in your comment." };
  }

  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(plain) || pattern.test(input.authorName)) {
      return { ok: false, status: 400, error: "Comment could not be submitted." };
    }
  }

  return { ok: true };
}
