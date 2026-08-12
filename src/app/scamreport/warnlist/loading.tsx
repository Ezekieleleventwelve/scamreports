import { WARNLIST_PAGE } from "@/components/warnlist/warnlist-layout";

export default function WarnlistLoading() {
  return (
    <div className={WARNLIST_PAGE}>
      <div className="h-7 w-48 bg-muted animate-pulse rounded mb-2" />
      <div className="h-4 w-full bg-muted/70 animate-pulse rounded mb-6" />
      <div className="h-11 bg-muted animate-pulse rounded-xl mb-4" />
      <div className="h-10 bg-muted/50 animate-pulse rounded-xl mb-4" />
      <ul className="rounded-xl border border-border overflow-hidden divide-y divide-border">
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="h-14 bg-muted/30 animate-pulse" />
        ))}
      </ul>
    </div>
  );
}
