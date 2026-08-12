import type { Prisma } from "@prisma/client";
import { WARNLIST_BASE } from "./warnlist-paths";

export type WarnlistFilter = "ALL" | "PERSON" | "COMPANY";

export type WarnlistQuery = {
  type?: WarnlistFilter;
  q?: string;
  page?: number;
};

export function parseWarnlistFilter(type?: string): WarnlistFilter {
  if (type === "PERSON" || type === "COMPANY") return type;
  return "ALL";
}

export function parseWarnlistQuery(searchParams: {
  type?: string;
  q?: string;
  page?: string;
}): WarnlistQuery {
  return {
    type: parseWarnlistFilter(searchParams.type),
    q: searchParams.q?.trim() ?? "",
    page: parseWarnlistPage(searchParams.page),
  };
}

export function buildWarnlistWhere(
  filter: WarnlistFilter,
  q?: string
): Prisma.WarnlistEntryWhereInput {
  const conditions: Prisma.WarnlistEntryWhereInput[] = [{ status: "ACTIVE" }];

  if (filter !== "ALL") {
    conditions.push({ type: filter });
  }

  const term = q?.trim();
  if (term) {
    conditions.push({
      OR: [
        { name: { contains: term } },
        { aliases: { contains: term } },
        { websites: { contains: term } },
        { summary: { contains: term } },
        { location: { contains: term } },
        { country: { contains: term } },
        { sourceLabel: { contains: term } },
      ],
    });
  }

  return conditions.length === 1 ? conditions[0] : { AND: conditions };
}

export function warnlistHref(query: WarnlistQuery = {}): string {
  const params = new URLSearchParams();
  const type = query.type ?? "ALL";
  if (type !== "ALL") params.set("type", type);
  if (query.q?.trim()) params.set("q", query.q.trim());
  if (query.page && query.page > 1) params.set("page", String(query.page));
  const qs = params.toString();
  return qs ? `${WARNLIST_BASE}?${qs}` : WARNLIST_BASE;
}

/** @deprecated Use warnlistHref({ type, q, page }) */
export function warnlistHrefLegacy(
  filter: WarnlistFilter,
  q?: string,
  page?: number
): string {
  return warnlistHref({ type: filter, q, page });
}

export function parseWarnlistPage(page?: string): number {
  const n = parseInt(page ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export function queryWithoutPage(query: WarnlistQuery): WarnlistQuery {
  return { ...query, page: undefined };
}
