import { resolveFeaturedImage } from "@/lib/post-images";

interface PostCoverImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export default function PostCoverImage({
  src,
  alt,
  className = "w-full object-cover",
  loading = "lazy",
}: PostCoverImageProps) {
  return (
    <img
      src={resolveFeaturedImage(src)}
      alt={alt}
      className={className}
      loading={loading}
    />
  );
}
