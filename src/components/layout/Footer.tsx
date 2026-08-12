import Link from "next/link";
import { getLocale, getDictionary, t } from "@/lib/i18n";
import { SHELL_WIDTH } from "@/components/warnlist/warnlist-layout";

export default async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <footer className="border-t border-border mt-auto">
      <div
        className={`${SHELL_WIDTH} py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-muted-foreground leading-snug`}
      >
        <p>{t(dict, "footer.copyright", { year: "2024-2026" })}</p>
        <nav className="flex flex-wrap gap-x-3 gap-y-1">
          <Link href="/scamreport/warnlist" className="hover:text-foreground">
            {t(dict, "nav.warnlist")}
          </Link>
          <Link href="/submit" className="hover:text-foreground">
            {t(dict, "nav.submitReport")}
          </Link>
          <Link
            href="/scamreport/warnlist/claim"
            className="hover:text-foreground"
          >
            {t(dict, "nav.claim")}
          </Link>
          <Link
            href="/scamreport/warnlist/submit"
            className="hover:text-foreground"
          >
            {t(dict, "warnlist.submit.footerLink")}
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            {t(dict, "footer.privacy")}
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            {t(dict, "footer.terms")}
          </Link>
          <Link href="/disclaimer" className="hover:text-foreground">
            {t(dict, "footer.disclaimer")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
