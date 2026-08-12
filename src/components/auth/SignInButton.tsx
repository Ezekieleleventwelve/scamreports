"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 border border-border bg-background px-4 py-2 text-[12px] font-bold text-foreground hover:bg-muted transition-colors uppercase tracking-wider"
    >
      Sign In
    </button>
  );
}
