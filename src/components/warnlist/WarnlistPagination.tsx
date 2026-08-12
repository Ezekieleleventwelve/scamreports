import Link from "next/link";
import { warnlistHref, type WarnlistQuery } from "@/lib/warnlist-query";

interface WarnlistPaginationProps {
  page: number;
  totalPages: number;
  query: WarnlistQuery;
  labels: {
    previous: string;
    next: string;
    pageOf: string;
  };
}

export default function WarnlistPagination({
  page,
  totalPages,
  query,
  labels,
}: WarnlistPaginationProps) {
  if (totalPages <= 1) return null;

  const pageLabel = labels.pageOf
    .replace("{page}", String(page))
    .replace("{total}", String(totalPages));

  return (
    <nav
      className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      aria-label="Warning list pagination"
    >
      {page > 1 ? (
        <Link
          href={warnlistHref({ ...query, page: page - 1 })}
          className="w-full sm:w-auto text-center rounded-lg border border-border px-4 py-2.5 text-[13px] font-medium hover:bg-muted/50"
        >
          ← {labels.previous}
        </Link>
      ) : (
        <span className="w-full sm:w-auto text-center text-[13px] text-muted-foreground/50 px-4 py-2.5">
          ← {labels.previous}
        </span>
      )}

      <span className="text-[13px] text-muted-foreground tabular-nums">{pageLabel}</span>

      {page < totalPages ? (
        <Link
          href={warnlistHref({ ...query, page: page + 1 })}
          className="w-full sm:w-auto text-center rounded-lg border border-border px-4 py-2.5 text-[13px] font-medium hover:bg-muted/50"
        >
          {labels.next} →
        </Link>
      ) : (
        <span className="w-full sm:w-auto text-center text-[13px] text-muted-foreground/50 px-4 py-2.5">
          {labels.next} →
        </span>
      )}
    </nav>
  );
}
