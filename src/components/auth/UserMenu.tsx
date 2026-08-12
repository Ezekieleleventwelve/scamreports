"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";

export default function UserMenu() {
  const { data: session } = useSession();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!session?.user) return null;

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 hover:bg-muted transition-colors border border-transparent hover:border-border"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="h-7 w-7"
          />
        ) : (
          <div className="h-7 w-7 bg-primary flex items-center justify-center text-primary-foreground text-[11px] font-bold">
            {session.user.name?.[0] || "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-52 border border-border bg-card shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <p className="text-[13px] font-bold truncate">
              {session.user.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-[13px] hover:bg-muted transition-colors"
            >
              {t("user.profile")}
            </Link>
            <Link
              href="/submit"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-[13px] hover:bg-muted transition-colors"
            >
              {t("user.submitReport")}
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-[13px] text-primary font-bold hover:bg-muted transition-colors"
              >
                {t("user.adminCRM")}
              </Link>
            )}
            <div className="border-t border-border mt-1 pt-1">
              <button
                onClick={() => signOut()}
                className="w-full text-left px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {t("user.signOut")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
