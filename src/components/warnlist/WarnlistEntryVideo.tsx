import { getWarnlistVideoEmbedUrl } from "@/lib/warnlist-media";

interface WarnlistEntryVideoProps {
  videoUrl: string;
  title: string;
  label: string;
  watchLabel: string;
}

export default function WarnlistEntryVideo({
  videoUrl,
  title,
  label,
  watchLabel,
}: WarnlistEntryVideoProps) {
  const embedSrc = getWarnlistVideoEmbedUrl(videoUrl);
  if (!embedSrc) return null;

  return (
    <section className="mb-4">
      <h2 className="text-[13px] font-semibold text-foreground mb-2">{label}</h2>
      <div className="relative w-full max-w-xl aspect-video rounded-xl overflow-hidden bg-muted ring-1 ring-border">
        <iframe
          src={embedSrc}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-[12px] text-muted-foreground mt-2">
        <a
          href={videoUrl}
          className="text-primary underline"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          {watchLabel}
        </a>
      </p>
    </section>
  );
}
