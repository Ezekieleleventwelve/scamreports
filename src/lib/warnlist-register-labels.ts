import type { Dictionary } from "@/lib/i18n/types";
import { t } from "@/lib/i18n";
import type { WarnlistRegisterLabels } from "@/components/warnlist/WarnlistRegisterBlock";

export function getWarnlistRegisterLabels(dict: Dictionary): WarnlistRegisterLabels {
  return {
    title: t(dict, "warnlist.registerTitle"),
    intro: t(dict, "warnlist.registerIntro"),
    lookupTitle: t(dict, "warnlist.registerLookup"),
    zefixByName: t(dict, "warnlist.registerZefixName"),
    zefixByUid: t(dict, "warnlist.registerZefixUid"),
    shab: t(dict, "warnlist.registerShab"),
    uid: t(dict, "warnlist.registerUid"),
    sourcesTitle: t(dict, "warnlist.registerSources"),
  };
}
