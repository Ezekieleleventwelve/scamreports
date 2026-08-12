import AdBanner from "./AdBanner";

export default function InArticleAd() {
  return (
    <div className="my-8">
      <AdBanner slot="in-article" format="horizontal" className="min-h-[250px]" />
    </div>
  );
}
