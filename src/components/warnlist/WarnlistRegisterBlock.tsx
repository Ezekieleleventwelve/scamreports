import type { WarnlistEntry } from "@/data/warnlist";
import {
  SWISS_REGISTER_SOURCES,
  entryHasSwissRegisters,
  shabSearchByName,
  uidRegisterSearch,
  zefixSearchByName,
  zefixSearchByUid,
} from "@/lib/swiss-register";

export interface WarnlistRegisterLabels {
  title: string;
  intro: string;
  lookupTitle: string;
  zefixByName: string;
  zefixByUid: string;
  shab: string;
  uid: string;
  sourcesTitle: string;
}

interface WarnlistRegisterBlockProps {
  entry?: WarnlistEntry;
  labels: WarnlistRegisterLabels;
  variant?: "page" | "entry";
}

export default function WarnlistRegisterBlock({
  entry,
  labels,
  variant = "entry",
}: WarnlistRegisterBlockProps) {
  // Only show Swiss registers for Switzerland-related entries (UID CHE-*, country CH, etc.)
  if (entry && !entryHasSwissRegisters(entry)) {
    return null;
  }

  const isCompany = !entry || entry.type === "COMPANY";
  const showEntryLookup = Boolean(entry && isCompany && entryHasSwissRegisters(entry));

  return (
    <section
      className={
        variant === "page"
          ? "mb-5 rounded-xl border border-border bg-muted/20 p-4 text-[13px]"
          : "rounded-lg border border-border bg-muted/20 p-3 text-[12px]"
      }
    >
      <h2
        className={`font-semibold text-foreground ${
          variant === "page" ? "text-[14px] mb-1" : "text-[13px] mb-1"
        }`}
      >
        {labels.title}
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-3">{labels.intro}</p>

      {showEntryLookup && entry && (
        <div className="mb-3 pb-3 border-b border-border/60">
          <p className="text-[11px] font-medium text-foreground mb-2">{labels.lookupTitle}</p>
          <ul className="space-y-1.5">
            <li>
              <a
                href={zefixSearchByName(entry.name)}
                className="text-primary hover:underline font-medium"
                rel="noopener noreferrer"
                target="_blank"
              >
                {labels.zefixByName}: {entry.name}
              </a>
            </li>
            {entry.uid && (
              <>
                <li>
                  <a
                    href={zefixSearchByUid(entry.uid)}
                    className="text-primary hover:underline font-medium"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {labels.zefixByUid}: {entry.uid}
                  </a>
                </li>
                <li>
                  <a
                    href={uidRegisterSearch(entry.uid)}
                    className="text-primary hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {labels.uid}: {entry.uid}
                  </a>
                </li>
              </>
            )}
            <li>
              <a
                href={shabSearchByName(entry.name)}
                className="text-primary hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {labels.shab}: {entry.name}
              </a>
            </li>
          </ul>
        </div>
      )}

      <p className="text-[11px] font-medium text-foreground mb-2">{labels.sourcesTitle}</p>
      <ul className="space-y-2">
        {SWISS_REGISTER_SOURCES.map((src) => (
          <li key={src.id} className="leading-snug">
            <a
              href={src.href}
              className="font-medium text-primary hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {src.label}
            </a>
            <span className="text-muted-foreground"> — {src.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
