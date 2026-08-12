import { redirect } from "next/navigation";
import { WARNLIST_BASE } from "@/lib/warnlist-paths";

/** Home → public register at /scamreport/warnlist */
export default function HomePage() {
  redirect(WARNLIST_BASE);
}
