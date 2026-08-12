/** Resolve public video URLs to embed-safe iframe src (Streamable, YouTube). */
export function getWarnlistVideoEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const streamable = trimmed.match(
    /^https?:\/\/(?:www\.)?streamable\.com\/(?:e\/)?([a-z0-9]+)\/?$/i
  );
  if (streamable) {
    return `https://streamable.com/e/${streamable[1]}`;
  }

  const ytWatch = trimmed.match(
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i
  );
  if (ytWatch) {
    return `https://www.youtube-nocookie.com/embed/${ytWatch[1]}`;
  }

  const ytShort = trimmed.match(/^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (ytShort) {
    return `https://www.youtube-nocookie.com/embed/${ytShort[1]}`;
  }

  return null;
}
