import { WARNLIST_INDEX_GRID } from "./warnlist-index-grid";

interface WarnlistIndexHeaderProps {
  labels: {
    category: string;
    country: string;
    place: string;
    name: string;
    cases: string;
    amount: string;
  };
}

export default function WarnlistIndexHeader({ labels }: WarnlistIndexHeaderProps) {
  return (
    <div
      className={`${WARNLIST_INDEX_GRID} px-3 sm:px-4 py-2.5 border-b border-border bg-muted/20 text-[11px] font-medium text-muted-foreground`}
      aria-hidden
    >
      <span>{labels.category}</span>
      <span>{labels.country}</span>
      <span className="truncate">{labels.place}</span>
      <span>{labels.name}</span>
      <span className="text-right">{labels.cases}</span>
      <span className="text-right">{labels.amount}</span>
      <span />
    </div>
  );
}
