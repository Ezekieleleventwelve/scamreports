import Link from "next/link";
import { getLocale, getDictionary, t } from "@/lib/i18n";

export default async function WarnlistSubmitCta() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <p className="mt-6 text-[12px] text-muted-foreground">
      {t(dict, "warnlist.submitCtaHint")}{" "}
      <Link
        href="/scamreport/warnlist/submit"
        className="text-foreground/75 hover:text-foreground underline underline-offset-2"
      >
        {t(dict, "warnlist.submit.footerLink")}
      </Link>
    </p>
  );
}
