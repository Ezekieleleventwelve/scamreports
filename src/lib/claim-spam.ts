import { stripHtml } from "@/lib/sanitize";

const MIN_FORM_MS = 5_000;

export type ClaimSpamInput = {
  reason: string;
  claimantName: string;
  website?: string;
  formOpenedAt?: number;
};

export type ClaimSpamResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export function checkClaimSpam(input: ClaimSpamInput): ClaimSpamResult {
  if (input.website?.trim()) {
    return { ok: false, status: 400, error: "Invalid submission." };
  }

  const openedAt = input.formOpenedAt;
  if (typeof openedAt !== "number" || !Number.isFinite(openedAt)) {
    return { ok: false, status: 400, error: "Invalid submission." };
  }

  if (Date.now() - openedAt < MIN_FORM_MS) {
    return { ok: false, status: 400, error: "Please wait a moment before submitting." };
  }

  const plain = stripHtml(input.reason).trim();
  if (plain.length < 20) {
    return { ok: false, status: 400, error: "Please provide more detail in your claim." };
  }

  return { ok: true };
}
