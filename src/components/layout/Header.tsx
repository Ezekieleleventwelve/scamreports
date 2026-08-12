import Image from "next/image";
import Link from "next/link";
import { HeaderActions } from "./HeaderClient";
import { getDictionary, getLocale, t } from "@/lib/i18n";
import { SHELL_WIDTH } from "@/components/warnlist/warnlist-layout";

const AUTHORITY_LINKS = [
  {
    href: "https://www.interpol.int/",
    label: "Interpol",
  },
  {
    href: "https://afripol.africa-union.org/",
    label: "AFRIPOL",
    title: "African Union Mechanism for Police Cooperation",
  },
  {
    href: "https://www.fbi.gov/",
    label: "FBI",
  },
  {
    href: "https://www.europol.europa.eu/",
    label: "Europol",
  },
] as const;

export default async function Header() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className={SHELL_WIDTH}>
        <div className="flex items-center h-14 gap-3">
          <Link
            href="/scamreport/warnlist"
            className="shrink-0 flex items-center hover:opacity-80 transition-opacity"
            aria-label="scamreports"
          >
            <Image
              src="/images/logo.svg"
              alt="scamreports"
              width={160}
              height={28}
              priority
              unoptimized
              className="h-7 w-auto dark:invert"
            />
          </Link>

          <nav
            aria-label="Law enforcement"
            className="hidden md:flex items-center gap-0.5 min-w-0"
          >
            {AUTHORITY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={"title" in link ? link.title : link.label}
                className="shrink-0 px-2 py-1 rounded text-[11px] font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex-1 min-w-0" />

          <HeaderActions
            claimLabel={t(dict, "nav.claim")}
            reportLabel={t(dict, "nav.report")}
            reportAriaLabel={t(dict, "nav.reportAria")}
          />
        </div>
      </div>
    </header>
  );
}
