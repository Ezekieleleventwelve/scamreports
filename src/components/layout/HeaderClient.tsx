"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchBar from "@/components/layout/SearchBar";
import { WARNLIST_BASE } from "@/lib/warnlist-paths";

export function HeaderWarnlistLink({ label }: { label: string }) {
  const pathname = usePathname();
  const active =
    pathname === WARNLIST_BASE ||
    (pathname.startsWith(`${WARNLIST_BASE}/`) &&
      !pathname.startsWith(`${WARNLIST_BASE}/submit`) &&
      !pathname.startsWith(`${WARNLIST_BASE}/claim`));

  return (
    <Link
      href={WARNLIST_BASE}
      className={`shrink-0 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      }`}
    >
      {label}
    </Link>
  );
}

export function HeaderClaimLink({ label }: { label: string }) {
  const pathname = usePathname();
  const active = pathname.startsWith(`${WARNLIST_BASE}/claim`);

  return (
    <Link
      href={`${WARNLIST_BASE}/claim`}
      className={`shrink-0 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
        active
          ? "bg-muted text-foreground ring-1 ring-border"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      }`}
    >
      {label}
    </Link>
  );
}

export function HeaderReportLink({
  label,
  ariaLabel,
}: {
  label: string;
  ariaLabel: string;
}) {
  const pathname = usePathname();
  const active = pathname === "/submit" || pathname === `${WARNLIST_BASE}/submit`;

  return (
    <Link
      href="/submit"
      aria-label={ariaLabel}
      className={`shrink-0 ml-1 px-3 py-1.5 rounded-md text-[13px] font-medium transition-opacity ${
        active
          ? "bg-black text-white ring-2 ring-black/20 dark:ring-white/30"
          : "bg-black text-white hover:opacity-90"
      }`}
    >
      {label}
    </Link>
  );
}

export function HeaderActions({
  claimLabel,
  reportLabel,
  reportAriaLabel,
}: {
  claimLabel: string;
  reportLabel: string;
  reportAriaLabel: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <SearchBar />
      <ThemeToggle />
      <HeaderClaimLink label={claimLabel} />
      <HeaderReportLink label={reportLabel} ariaLabel={reportAriaLabel} />
    </div>
  );
}
