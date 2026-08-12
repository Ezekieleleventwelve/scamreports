import Image from "next/image";
import Link from "next/link";
import { HeaderActions } from "./HeaderClient";
import { getDictionary, getLocale, t } from "@/lib/i18n";
import { SHELL_WIDTH } from "@/components/warnlist/warnlist-layout";

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

          <span className="hidden sm:inline text-[12px] text-muted-foreground truncate">
            {t(dict, "warnlist.title")}
          </span>

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
