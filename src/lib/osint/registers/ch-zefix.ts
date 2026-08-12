import {
  shabSearchByName,
  uidRegisterSearch,
  zefixSearchByName,
  zefixSearchByUid,
} from "@/lib/swiss-register";
import type { RegisterCompany } from "../types";

/**
 * Switzerland — ZEFIX / SHAB / UID.
 * Live officer extraction needs ZefixREST credentials (cantonal / eCH access).
 * This adapter always returns official deep links + optional UID parse from query.
 */
export async function searchSwissCompanies(query: string): Promise<RegisterCompany[]> {
  const q = query.trim();
  if (!q) return [];

  const uidMatch = q.toUpperCase().match(/CHE[\s.-]?\d{3}[\s.-]?\d{3}[\s.-]?\d{3}/);
  const uid = uidMatch?.[0]?.replace(/\s/g, "") ?? undefined;

  const persons: RegisterCompany["persons"] = [];
  // Placeholder: when ZEFIX_REST credentials exist, hydrate Verwaltungsrat here.
  if (process.env.ZEFIX_REST_USER && process.env.ZEFIX_REST_PASSWORD) {
    // Reserved for authenticated ZefixRESTPublic client — not all environments have access.
  }

  return [
    {
      jurisdiction: "CH",
      name: q,
      registryId: uid,
      source: "Swiss ZEFIX / SHAB / UID (deep links)",
      sourceUrl: uid ? zefixSearchByUid(uid) : zefixSearchByName(q),
      persons,
      raw: {
        links: {
          zefix: uid ? zefixSearchByUid(uid) : zefixSearchByName(q),
          shab: shabSearchByName(q),
          uid: uid ? uidRegisterSearch(uid) : "https://www.uid.admin.ch/",
          finmaWarnings:
            "https://www.finma.ch/en/finma-public/warnungen/warning-list/",
        },
        note:
          "Open ZEFIX for Verwaltungsrat / signatories. Set ZEFIX_REST_USER/PASSWORD if you have API access to auto-fill officers.",
      },
    },
  ];
}
