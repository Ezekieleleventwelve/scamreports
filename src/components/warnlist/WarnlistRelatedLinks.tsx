import Link from "next/link";
import { getWarnlistEntry } from "@/lib/warnlist-data";
import { warnlistEntryPath } from "@/lib/warnlist-paths";

/** Cross-links between related warnlist profiles. */
export default function WarnlistRelatedLinks({
  slugs,
  label,
}: {
  slugs: string[];
  label: string;
}) {
  const related = slugs
    .map((slug) => getWarnlistEntry(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  if (related.length === 0) return null;

  return (
    <section className="mb-4">
      <h2 className="text-[13px] font-semibold text-foreground mb-2">{label}</h2>
      <ul className="flex flex-wrap gap-2">
        {related.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={warnlistEntryPath(entry.slug)}
              className="inline-flex items-center rounded-md border border-border bg-muted/30 px-2.5 py-1 text-[12px] font-medium text-primary hover:bg-muted hover:underline"
            >
              {entry.name}
              <span className="ml-1.5 text-[10px] uppercase text-muted-foreground">
                {entry.type === "PERSON" ? "P" : "C"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
