import AdBanner from "./AdBanner";

export default function SidebarAd() {
  return (
    <div className="sticky top-20">
      <AdBanner slot="sidebar" format="vertical" className="min-h-[600px]" />
    </div>
  );
}
