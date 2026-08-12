"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || clientId.startsWith("ca-pub-XXXX")) return;
    try {
      const adsbygoogle = (window as unknown as Record<string, unknown>)
        .adsbygoogle as unknown[];
      if (adsbygoogle) {
        adsbygoogle.push({});
      }
    } catch {
      // AdSense not loaded
    }
  }, [clientId]);

  if (!clientId || clientId.startsWith("ca-pub-XXXX")) {
    return (
      <div className={`ad-container ${className}`}>
        <span className="ad-label">Advertisement</span>
        <div className="ad-slot">
          <span>Ad</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
