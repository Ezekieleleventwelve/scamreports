/** Official Swiss register lookup helpers (ZEFIX, SHAB, UID). */

import type { WarnlistEntry } from "@/data/warnlist";
import { resolveCountryIso } from "@/lib/warnlist-origin";

const ZEFIX_BASE = "https://www.zefix.ch/en/search/entity/list";

export function zefixSearchByName(name: string): string {
  return `${ZEFIX_BASE}?name=${encodeURIComponent(name.trim())}`;
}

export function zefixSearchByUid(uid: string): string {
  const normalized = uid.trim().toUpperCase();
  return `${ZEFIX_BASE}?uid=${encodeURIComponent(normalized)}`;
}

export function shabSearchByName(name: string): string {
  return `https://www.shab.ch/shabforms/servlet/Search?search=${encodeURIComponent(name.trim())}`;
}

export function uidRegisterSearch(uid: string): string {
  return `https://www.uid.admin.ch/Search.aspx?search_term=${encodeURIComponent(uid.trim())}`;
}

/**
 * Swiss register links (ZEFIX / SHAB / UID / FINMA) only for CH-related entries.
 * Foreign entries (e.g. Dubai, Uganda) must not show Swiss company-register lookups.
 */
export function entryHasSwissRegisters(
  entry: Pick<WarnlistEntry, "country" | "location" | "address" | "uid">
): boolean {
  const uid = entry.uid?.trim().toUpperCase() ?? "";
  if (uid.startsWith("CHE") || /^CHE[\s.-]?\d/.test(uid)) return true;

  if (resolveCountryIso(entry.country, entry.location) === "CH") return true;

  const country = entry.country?.trim().toLowerCase() ?? "";
  if (
    country === "switzerland" ||
    country === "schweiz" ||
    country === "suisse" ||
    country === "svizzera" ||
    country === "ch"
  ) {
    return true;
  }

  return false;
}

export const SWISS_REGISTER_SOURCES = [
  {
    id: "zefix",
    label: "ZEFIX",
    description:
      "Central company index — legal name, UID, seat, purpose, board (Verwaltungsrat), management, signatories",
    href: "https://www.zefix.ch/en/search/entity/welcome",
  },
  {
    id: "shab",
    label: "SHAB",
    description: "Official Gazette of Commerce — mutations, appointments, address changes",
    href: "https://www.shab.ch/",
  },
  {
    id: "uid",
    label: "UID register",
    description: "Federal business identification (UID) lookup",
    href: "https://www.uid.admin.ch/",
  },
  {
    id: "finma",
    label: "FINMA",
    description: "Authorised institutions and public warnings",
    href: "https://www.finma.ch/en/finma-public/warnungen/warning-list/",
  },
] as const;
