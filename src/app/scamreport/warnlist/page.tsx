import type { Metadata } from "next";
import WarnlistIndexView from "@/components/warnlist/WarnlistIndexView";
import { generateWarnlistIndexMetadata } from "@/lib/warnlist-seo";

export const metadata: Metadata = generateWarnlistIndexMetadata();

interface WarnlistPageProps {
  searchParams: Promise<{
    type?: string;
    q?: string;
    page?: string;
  }>;
}

/** Public register: /scamreport/warnlist */
export default async function WarnlistPage({ searchParams }: WarnlistPageProps) {
  const params = await searchParams;
  return <WarnlistIndexView searchParams={params} />;
}
